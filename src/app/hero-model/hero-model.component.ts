import {Component, Input,  OnInit} from '@angular/core';

import { Hero } from '../hero';
import { HeroParts, EnemyHeroParts, Parts } from '../heroParts';
import { HeroService} from '../services/-hero.service';
import { BattleService } from '../services/battle.service';
import { BattleLogService } from '../services/battle-log.service';

@Component({
  selector: 'app-hero-model',
  templateUrl: './hero-model.component.html',
  styleUrls: ['./hero-model.component.sass']
})

export class HeroModelComponent implements OnInit {

  @Input() enemy: boolean;
  @Input() battleStarted: boolean;
  heroes: Hero[];
  hero: Hero;
  heroParts: Parts[] = HeroParts;
  enemyParts: Parts[] = EnemyHeroParts;
  selected: Hero;
  currentHP: number;
  selectedPoints: string[] = [];

  constructor(
    private heroService: HeroService,
    private battleService: BattleService,
    public battleLogService: BattleLogService
  ) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(res => this.heroes = res);
    this.getCurrentHP();
  }

  getHero(): void {
    const id = this.selected.id;
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = new Hero(hero);
        this.battleService.getHero(this.hero, this.enemy);
        this.log(`You selected ${this.hero.name}`);
      });
  }

  getCurrentHP(): void {
    this.enemy
      ? this.battleService.enemyHeroHP.subscribe(hp => this.currentHP = hp)
      : this.battleService.yourHeroHP.subscribe(hp => this.currentHP = hp);
  }

  log(message: string) {
    this.battleLogService.add(`${message}`);
  }

  choosePoint(point: Parts): void {
    this.battleService.selectedPoints(point, this.enemy);
  }

}
