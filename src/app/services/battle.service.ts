import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Hero} from '../hero';
import { BattleLogService } from './battle-log.service';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  heroHP: number;
  enemyHP: number;
  yourHero: Hero;
  enemyHero: Hero;
  attackedPoints: string[] = [];
  blockedPoints: string[] = [];

  private yourHeroHP = new BehaviorSubject(50);
  private yourEnemyHP = new BehaviorSubject(10);

  yourCurrentHeroHP = this.yourHeroHP.asObservable();
  enemyCurrentHeroHP = this.yourEnemyHP.asObservable();

  constructor(
    public battleLogService: BattleLogService
  ) { }

  getHero(hero: Hero, enemy: boolean): void {
    if (enemy) {
      this.enemyHero = hero;
      this.enemyHP = hero.heroHP;
    } else {
      this.yourHero = hero;
      this.heroHP = hero.heroHP;
    }
  }

  changeHeroHp(hp: number, enemy: boolean) {
    if (!enemy) {
      this.yourHeroHP.next(hp);
    } else {
      this.yourEnemyHP.next(hp);
    }
  }

}
