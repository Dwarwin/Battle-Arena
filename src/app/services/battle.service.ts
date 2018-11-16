import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Hero } from '../hero';
import { HeroParts, EnemyHeroParts } from '../heroParts';
import { BattleLogService } from './battle-log.service';

@Injectable({
  providedIn: 'root'
})

export class BattleService {

  yourHero: Hero;
  enemyHero: Hero;
  heroParts: string[] = HeroParts.map(obj => obj.part);
  enemyHeroParts: string[] = EnemyHeroParts.map(obj => obj.part);
  attackedPoints: string[];
  blockedPoints: string[];

  yourHeroHP = new BehaviorSubject<number>(100);
  enemyHeroHP = new BehaviorSubject<number>(100);
  readyForBattle = new BehaviorSubject<string>('no');

  constructor(
    public battleLogService: BattleLogService
  ) { }

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
    if (!enemy) {
      this.attackedPoints = points;
    } else {
      this.blockedPoints = points;
    }
  }

  newRound(): void {
    const enemyAttacks: string[] = this.shafflePoints(this.enemyHeroParts);
    const enemyBlocks: string[] = this.shafflePoints(this.heroParts);
    this.attackResult(this.attackedPoints, enemyBlocks, this.yourHero, false);
    this.attackResult(enemyAttacks, enemyBlocks, this.enemyHero, true);
  }

  attackResult(attacked: string[], blocked: string[], hero: Hero, enemy: boolean): void {
    const attackedPointsResult = attacked;
    blocked.forEach(elem => {
      attacked = this.attackedPoints.filter(_ => _ !== 'enemy' + elem);
      attacked.length < 2 ? this.battleLogService.add(
        !enemy ? 'Your attack was blocked' : 'You have successfully blocked ' + this.enemyHero.name + '`s attack')
        : console.log('succeeded');
    });
    attacked.forEach(attack => {
      let damage: number;
      let critical: boolean;
      const critHit: string = critical ? ' Critical hit!' : '.';
      if (Math.floor(Math.random() * 100) <= hero.evadeChance) {
        this.battleLogService.add(
          !enemy
            ? hero.name + 'has evaded your attack' : 'You have successfully evaded ' + this.enemyHero.name + '`s attack');
      } else {
        critical = Math.floor(Math.random() * 100) <= hero.criticalHitChance;
        damage = hero.heroDamage * (critical ? 1.5 : 1);
        enemy ? this.yourHeroHP.next(this.yourHeroHP.value - damage) : this.enemyHeroHP.next(this.enemyHeroHP.value - damage);
        this.battleLogService.add(
          !enemy
            ? 'You dealt ' + damage + ' to ' + this.enemyHero.name + critHit
            : this.enemyHero.name + ' dealt you ' + damage + critHit);
      }
    });
  }

  shafflePoints(arr: string[]): string[] {
    return arr.sort(_ => .5 - Math.random()).slice(0, 2);
  }
}
