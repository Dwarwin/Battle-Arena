import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Hero } from '../hero';
import { HeroParts, EnemyHeroParts, Parts } from '../heroParts';
import { BattleLogService } from './battle-log.service';

@Injectable({
  providedIn: 'root'
})

export class BattleService {

  constructor(
    public battleLogService: BattleLogService
  ) { }

  yourHero: Hero;
  enemyHero: Hero;
  heroParts: Parts[] = HeroParts.map(obj => obj);
  enemyParts: Parts[] = EnemyHeroParts.map(obj => obj);
  attackedPoints: Parts[] = [];
  blockedPoints: Parts[] = [];

  yourHeroHP = new BehaviorSubject<number>(100);
  enemyHeroHP = new BehaviorSubject<number>(100);
  readyForBattle = new BehaviorSubject<string>('no');
  readyForRound = new BehaviorSubject<string>('no');
  battleEnded = new BehaviorSubject<string>('no');

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
    const readyState = this.attackedPoints.length === 2 && this.blockedPoints.length;
    this.readyForRound.next(readyState === 2 ? 'yes' : 'no');
  }

  selectedPoints(point: Parts, enemy: boolean): void {
    const selectedPoints = (enemy ? this.attackedPoints : this.blockedPoints);
    if (selectedPoints.indexOf(point) === -1) {
      if (selectedPoints.length <= 1) {
        selectedPoints.push(point);
        point.checkStatus = true;
      }
    } else {
      enemy
        ? this.attackedPoints = selectedPoints.filter(_ => _ !== point)
        : this.blockedPoints = selectedPoints.filter(_ => _ !== point);
      point.checkStatus = false;
    }
    this.readyForRoundState();
  }

  newRound(): void {
    const enemyAttacks: Parts[] = BattleService.shufflePoints(this.heroParts);
    const enemyBlocks: Parts[] = BattleService.shufflePoints(this.enemyParts);

    this.battleLogService.clear();
    this.attackResult(this.attackedPoints, enemyBlocks, this.yourHero, this.enemyHero, false);
    this.attackResult(enemyAttacks, this.blockedPoints, this.enemyHero, this.yourHero, true);
    this.attackedPoints = [];
    this.blockedPoints = [];
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
    this.battleLogService.clear();
    this.battleEnded.next('yes');
    this.log(result);
    delete this.yourHero;
    delete this.enemyHero;
  }

  attackResult(attacked: Parts[], blocked: Parts[], hero: Hero, enemyHero: Hero, enemy: boolean): void {
    let notBlocked: Parts[] = attacked;

    this.log(!enemy ? '----Your turn----' : '----' + this.enemyHero.name + '`s turn----');
    attacked.forEach((_) => { _.checkStatus = false; });
    blocked.forEach(elem => {
      elem.checkStatus = false;
      attacked = attacked.filter(point => point !== elem);
      if (attacked.length !== notBlocked.length) {
        this.log(
          !enemy
            ? 'Your attack was blocked'
            : 'You have successfully blocked ' + this.enemyHero.name + '`s attack');
        notBlocked = attacked;
      }
    });

    notBlocked.forEach(() => {
      const currentHp: number = enemy ? this.yourHeroHP.value : this.enemyHeroHP.value;
      let damage: number;
      let critical = false;

      if (Math.round(Math.random() * 100) <= enemyHero.evadeChance) {
        this.log(
          !enemy
            ? enemyHero.name + ' has evaded your attack' : 'You have successfully evaded ' + this.enemyHero.name + '`s attack');
      } else {
        critical = Math.round(Math.random() * 100) <= hero.criticalHitChance;
        damage = hero.heroDamage * (critical ? 2 : 1);
        this.changeHeroHp(currentHp - damage, !enemy);
        this.log(
          !enemy
            ? 'You dealt ' + damage + ' damage to ' + this.enemyHero.name + (critical ? '. Critical hit!' : '.')
            : this.enemyHero.name + ' dealt you ' + damage + ' damage' + (critical ? '. Critical hit!' : '.'));
      }
    });
  }

  log(message: string) {
    this.battleLogService.add(`${message}`);
  }

}
