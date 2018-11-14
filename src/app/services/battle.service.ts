import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  private yourHeroHP = new BehaviorSubject<number>( 100);
  private yourEnemyHP = new BehaviorSubject<number>(100);
  private readyForBattle = new BehaviorSubject<string>('no');

  readyForBattleState = this.readyForBattle.asObservable();
  yourCurrentHeroHP = this.yourHeroHP.asObservable();
  enemyCurrentHeroHP = this.yourEnemyHP.asObservable();

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
      this.yourEnemyHP.next(hp);
    }
  }

}
