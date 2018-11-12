import { Injectable } from '@angular/core';

import { Hero} from '../hero';
import { BattleLogService } from './battle-log.service';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  yourHero: Hero;
  enemyHero: Hero;
  yourHeroHP: number = this.yourHero.heroHP;
  enemyHeroHP: number = this.enemyHero.heroHP;

  constructor(
    public battleLogService: BattleLogService
  ) { }
}
