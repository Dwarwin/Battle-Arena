import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { Hero} from '../hero';
import { BattleLogService } from './battle-log.service';

@Injectable({
  providedIn: 'root'
})

export class BattleService {

  yourHero: Hero;
  enemyHero: Hero;
  attackedPoints: string[] = [];
  blockedPoints: string[] = [];

  yourHeroHP = new Subject<number>();
  enemyHeroHP = new Subject<number>();
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
      this.yourHeroHP.next(hp);
    } else {
      this.enemyHeroHP.next(hp);
    }
  }
}
