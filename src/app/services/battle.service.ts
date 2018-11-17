import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Hero } from '../hero';
import { HeroParts, EnemyHeroParts } from '../heroParts';
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
  heroParts: string[] = HeroParts.map(obj => obj.part);
  enemyParts: string[] = EnemyHeroParts.map(obj => obj.part);
  attackedPoints: string[];
  blockedPoints: string[];

  yourHeroHP = new BehaviorSubject<number>(100);
  enemyHeroHP = new BehaviorSubject<number>(100);
  readyForBattle = new BehaviorSubject<string>('no');

  static shufflePoints(arr: string[]): string[] {
    const newArr: string[] = [];
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
    if (!enemy) {
      this.yourHeroHP.next(hp > 0 ? hp : 0);
    } else {
      this.enemyHeroHP.next(hp > 0 ? hp : 0);
    }
  }

  selectedPoints(points: string[], enemy: boolean): void {
    if (enemy) {
      this.attackedPoints = points;
    } else {
      this.blockedPoints = points;
    }
  }

  newRound(): void {
    const enemyAttacks: string[] = BattleService.shufflePoints(this.heroParts);
    const enemyBlocks: string[] = BattleService.shufflePoints(this.enemyParts);
    this.attackResult(this.attackedPoints, enemyBlocks, this.yourHero, this.enemyHero, false);
    this.attackResult(enemyAttacks, this.blockedPoints, this.enemyHero, this.yourHero , true);
    this.attackedPoints = [];
    this.blockedPoints = [];
  }

  attackResult(attacked: string[], blocked: string[], hero: Hero, enemyHero: Hero, enemy: boolean): void {
    this.battleLogService.add(!enemy ? '----Your turn----' : '----' + this.enemyHero.name + '`s turn----');
    let blocks: string[] = attacked;
    console.log(attacked, blocked);
    blocked.forEach(elem => {
      attacked = attacked.filter(point => point !== elem);
      console.log(attacked, blocked, blocks);
      if (attacked.length !== blocks.length) {
        this.battleLogService.add(
          !enemy
            ? 'Your attack was blocked'
            : 'You have successfully blocked ' + this.enemyHero.name + '`s attack');
        blocks = attacked;
      }
    });
    blocks.forEach(() => {
      let damage: number;
      let critical = false;
      if (Math.round(Math.random() * 100) <= enemyHero.evadeChance) {
        this.battleLogService.add(
          !enemy
            ? enemyHero.name + ' has evaded your attack' : 'You have successfully evaded ' + this.enemyHero.name + '`s attack');
      } else {
        critical = Math.round(Math.random() * 100) <= hero.criticalHitChance;
        damage = hero.heroDamage * (critical ? 2 : 1);
        enemy ? this.yourHeroHP.next(this.yourHeroHP.value - damage) : this.enemyHeroHP.next(this.enemyHeroHP.value - damage);
        this.battleLogService.add(
          !enemy
            ? 'You dealt ' + damage + ' damage to ' + this.enemyHero.name + (critical ? '. Critical hit!' : '.')
            : this.enemyHero.name + ' dealt you ' + damage + ' damage' + (critical ? '. Critical hit!' : '.'));
      }
    });
  }
}
