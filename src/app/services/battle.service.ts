import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Hero } from '../hero';
import { HeroParts, EnemyHeroParts, Parts } from '../heroParts';
import { BattleLogService } from './battle-log.service';
import { BattleResultDialogComponent } from '../battle-result-dialog/battle-result-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class BattleService {

  battleResultDialogRef: MatDialogRef<BattleResultDialogComponent>;
  round = 0;

  constructor(
    private dialog: MatDialog,
    public battleLogService: BattleLogService
  ) { }

  yourHero: Hero;
  enemyHero: Hero;
  heroParts: Parts[] = HeroParts.map(obj => obj);
  enemyParts: Parts[] = EnemyHeroParts.map(obj => obj);

  attackedPoints = new BehaviorSubject<Parts[]>([]);
  blockedPoints = new BehaviorSubject<Parts[]>([]);
  yourHeroHP = new BehaviorSubject<number>(100);
  enemyHeroHP = new BehaviorSubject<number>(100);
  readyForBattle = new BehaviorSubject<string>('no');
  readyForRound = new BehaviorSubject<string>('no');
  battleEnded = new BehaviorSubject<string>('no');
  setYourHero = new BehaviorSubject<Hero>(this.yourHero);
  setEnemyHero = new BehaviorSubject<Hero>(this.enemyHero);

  yourHeroHP$ = this.yourHeroHP.asObservable();
  enemyHeroHP$ = this.enemyHeroHP.asObservable();
  readyForBattle$ = this.readyForBattle.asObservable();
  readyForRound$ = this.readyForRound.asObservable();
  battleEnded$ = this.battleEnded.asObservable();
  setYourHero$ = this.setYourHero.asObservable();
  setEnemyHero$ = this.setEnemyHero.asObservable();
  attackedPoints$ = this.attackedPoints.asObservable();
  blockedPoints$ = this.blockedPoints.asObservable();

  static shufflePoints(arr: Parts[]): Parts[] {
    const newArr: Parts[] = [];
    const tempIndex: number = Math.floor(Math.random() * (arr.length));
    newArr.push(arr[tempIndex]);
    while (newArr.length < 2) {
      const newTempIndex = Math.floor(Math.random() * (arr.length));
      if (newTempIndex !== tempIndex) {
        newArr.push(arr[newTempIndex]);
      }
    }
    return newArr;
  }

  getHero(hero: Hero, enemy: boolean): void {
    enemy ? this.enemyHero = hero : this.yourHero = hero;
    this.changeHeroHp(hero.heroHP, enemy);
    this.readyForBattle.next(this.yourHero && this.enemyHero ? 'yes' : 'no');
    !enemy ? this.setYourHero.next(this.yourHero) : this.setEnemyHero.next(this.enemyHero);
  }

  changeHeroHp(hp: number, enemy: boolean) {
    const HP = hp > 0 ? hp : 0;
    if (!enemy) {
      this.yourHeroHP.next(HP);
    } else {
      this.enemyHeroHP.next(HP);
    }
  }

  readyForRoundState(): void {
    const readyState = this.attackedPoints.value.length === 2 && this.blockedPoints.value.length;
    this.readyForRound.next(readyState === 2 ? 'yes' : 'no');
  }

  selectedPoints(point: Parts, enemy: boolean): void {
    const selectedPoints = (enemy ? this.attackedPoints : this.blockedPoints);
    const selectedPointsVal = (enemy ? this.attackedPoints.value : this.blockedPoints.value);
    if (selectedPointsVal.indexOf(point) === -1) {
      if (selectedPointsVal.length <= 1) {
        selectedPoints.value.push(point);
        selectedPoints.next(selectedPoints.value);
        point.checkStatus = true;
      }
    } else {
      enemy
        ? this.attackedPoints.next(selectedPointsVal.filter(_ => _ !== point))
        : this.blockedPoints.next(selectedPointsVal.filter(_ => _ !== point));
      point.checkStatus = false;
    }
    this.readyForRoundState();
  }

  newRound(): void {
    const enemyAttacks: Parts[] = BattleService.shufflePoints(this.heroParts);
    const enemyBlocks: Parts[] = BattleService.shufflePoints(this.enemyParts);

    this.battleLogService.clear();
    this.round ++;
    this.attackResult(this.attackedPoints.value, enemyBlocks, this.yourHero, this.enemyHero, false);
    this.attackResult(enemyAttacks, this.blockedPoints.value, this.enemyHero, this.yourHero, true);
    this.attackedPoints.next([]);
    this.blockedPoints.next([]);
    this.readyForRoundState();
    if (this.yourHeroHP.value <= 0 && this.enemyHeroHP.value <= 0) {
      this.battleEnd('Draw');
    } else if (this.yourHeroHP.value <= 0 ) {
      this.battleEnd('You Lose');
    } else if (this.enemyHeroHP.value <= 0 ) {
      this.battleEnd('You Win');
    }
  }

  battleEnd(result: string): void {
    this.battleEnded.next('yes');
    this.battleResultDialogRef = this.dialog.open(BattleResultDialogComponent, {data: result});
  }

  attackResult(attacked: Parts[], blocked: Parts[], hero: Hero, enemyHero: Hero, enemy: boolean): void {
    let notBlocked: Parts[] = attacked;

    this.log(!enemy ? `ROUND ${this.round}` : `\n`);
    attacked.forEach((_) => { _.checkStatus = false; });
    blocked.forEach(elem => {
      elem.checkStatus = false;
      attacked = attacked.filter(point => point !== elem);
      if (attacked.length !== notBlocked.length) {
        this.log(
          !enemy
            ? 'Your attack was blocked'
            : `You have successfully blocked ${this.enemyHero.name}\`s attack`);
        notBlocked = attacked;
      }
    });

    notBlocked.forEach(() => {
      const currentHp: number = enemy ? this.yourHeroHP.value : this.enemyHeroHP.value;
      let damage: number;
      let critical: boolean;

      if (Math.round(Math.random() * 100) <= enemyHero.evadeChance) {
        this.log(
          !enemy
            ? `${enemyHero.name} has evaded your attack` : `You have successfully evaded ${this.enemyHero.name}\`s attack`);
      } else {
        critical = Math.round(Math.random() * 100) <= hero.criticalHitChance;
        damage = hero.heroDamage * (critical ? 2 : 1);
        this.changeHeroHp(currentHp - damage, !enemy);
        this.log(
          !enemy
            ? `You dealt ${damage} damage to ${this.enemyHero.name}${critical ? '. Critical hit!' : '.'}`
            : `${this.enemyHero.name} dealt you ${damage} damage${critical ? '. Critical hit!' : '.'}`);
      }
    });
  }

  log(message: string) {
    this.battleLogService.add(message);
  }

  clearService(): void {
    this.battleEnded.next('no');
    this.readyForBattle.next('no');
    this.readyForRound.next('no');
    this.attackedPoints.value.forEach((elem) => elem.checkStatus = false);
    this.blockedPoints.value.forEach((elem) => elem.checkStatus = false);
    this.attackedPoints.next([]);
    this.blockedPoints.next([]);
    this.battleLogService.clearLog();
    this.round = 0;
    delete this.yourHero;
    delete this.enemyHero;
  }

  tryAgain(): void {
    this.readyForBattle.next('yes');
    this.battleEnded.next('no');
    this.readyForRound.next('no');
    this.attackedPoints.value.forEach((elem) => elem.checkStatus = false);
    this.blockedPoints.value.forEach((elem) => elem.checkStatus = false);
    this.attackedPoints.next([]);
    this.blockedPoints.next([]);
    this.yourHeroHP.next(this.yourHero.heroHP);
    this.enemyHeroHP.next(this.enemyHero.heroHP);
    this.battleLogService.clearLog();
    this.battleLogService.clear();
    this.round = 0;
  }

}
