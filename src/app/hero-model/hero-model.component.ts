import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Hero} from '../hero';
import {HeroParts, EnemyHeroParts, Parts} from '../heroParts';
import {BattleService} from '../services/battle.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-hero-model',
  templateUrl: './hero-model.component.html',
  styleUrls: ['./hero-model.component.sass']
})

export class HeroModelComponent implements OnInit, OnDestroy {

  @Input() enemy: boolean;
  @Input() battleEnded: boolean;
  hero: Hero;
  currentHP: number;
  partsSelected: boolean;
  heroParts: Parts[] = HeroParts;
  enemyParts: Parts[] = EnemyHeroParts;
  heroPartsSub: Subscription;
  enemyPartsSub: Subscription;
  yourHeroHP: Subscription;
  enemyHeroHP: Subscription;

  constructor(private battleService: BattleService) {
  }

  ngOnInit() {
    const heroSide = !this.enemy ? this.battleService.setYourHero$ : this.battleService.setEnemyHero$;
    heroSide.subscribe(val => this.hero = val);
    this.getHeroesParts();
    this.getCurrentHP();
  }

  ngOnDestroy(): void {
    if (!this.enemy) {
      this.heroPartsSub.unsubscribe();
      this.yourHeroHP.unsubscribe();
    } else {
      this.enemyPartsSub.unsubscribe();
      this.enemyHeroHP.unsubscribe();
    }
  }

  getHeroesParts(): void {
    !this.enemy ? this.heroPartsSub = this.battleService.blockedPoints$
        .subscribe(el => el.length < 2 ? this.partsSelected = false : this.partsSelected = true)
      : this.enemyPartsSub = this.battleService.attackedPoints$
        .subscribe(el => el.length < 2 ? this.partsSelected = false : this.partsSelected = true);
  }

  getCurrentHP(): void {
    !this.enemy
      ? this.yourHeroHP = this.battleService.yourHeroHP$.subscribe(hp => this.currentHP = hp)
      : this.enemyHeroHP = this.battleService.enemyHeroHP$.subscribe(hp => this.currentHP = hp);
  }

  choosePoint(point: Parts): void {
    this.battleService.selectedPoints(point, this.enemy);
  }

}
