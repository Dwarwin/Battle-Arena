import {Component, Input, OnInit} from '@angular/core';

import { Hero } from '../hero';
import { HeroParts, EnemyHeroParts, Parts } from '../heroParts';
import { BattleService } from '../services/battle.service';
import { Subscription } from 'rxjs';

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
  heroParts$: Subscription;
  enemyParts$: Subscription;
  partsSelected: boolean;

  constructor( private battleService: BattleService ) {}

  ngOnInit() {
    const heroSide = !this.enemy ? this.battleService.setYourHero$ : this.battleService.setEnemyHero$;
    heroSide.subscribe(val => this.hero = val);
    !this.enemy ? this.heroParts$ = this.battleService.blockedPoints
        .subscribe(el => el.length < 2 ? this.partsSelected = false : this.partsSelected = true)
      : this.enemyParts$ = this.battleService.attackedPoints
        .subscribe(el => el.length < 2 ? this.partsSelected = false : this.partsSelected = true);
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
