import {Component, Input, OnInit} from '@angular/core';

import { Hero } from '../hero';
import { HeroParts, EnemyHeroParts, Parts } from '../heroParts';
import { BattleService } from '../services/battle.service';

@Component({
  selector: 'app-hero-model',
  templateUrl: './hero-model.component.html',
  styleUrls: ['./hero-model.component.sass']
})

export class HeroModelComponent implements OnInit {

  @Input() enemy: boolean;
  @Input() battleEnded: boolean;
  hero: Hero;
  currentHP: number;
  heroParts: Parts[] = HeroParts;
  enemyParts: Parts[] = EnemyHeroParts;

  constructor( private battleService: BattleService ) {}

  ngOnInit() {
    const heroSide = !this.enemy ? this.battleService.setYourHero$ : this.battleService.setEnemyHero$;
    heroSide.subscribe(val => this.hero = val);
    this.getCurrentHP();
  }

  getCurrentHP(): void {
    this.enemy
      ? this.battleService.enemyHeroHP$.subscribe(hp => this.currentHP = hp)
      : this.battleService.yourHeroHP$.subscribe(hp => this.currentHP = hp);
  }

  choosePoint(point: Parts): void {
    this.battleService.selectedPoints(point, this.enemy);
  }

}
