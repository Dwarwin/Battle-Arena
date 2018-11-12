import {Component, Input, OnInit} from '@angular/core';

import { Hero } from '../hero';
import { HeroService} from '../services/-hero.service';
import {BattleService} from '../services/battle.service';
import {BattleLogService} from '../services/battle-log.service';

@Component({
  selector: 'app-hero-model',
  templateUrl: './hero-model.component.html',
  styleUrls: ['./hero-model.component.sass']
})

export class HeroModelComponent implements OnInit {

  @Input() enemy: boolean;
  heroes: Hero[];
  hero: Hero;
  selected: Hero;
  currentHP: number;

  selectedHero: any = (enemy: boolean) =>  enemy ? this.battleService.enemyHero : this.battleService.yourHero;

  constructor(
    public heroService: HeroService,
    public battleService: BattleService,
    public battleLogService: BattleLogService) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(res => this.heroes = res);
    this.getCurrentHP();
  }

  getHero(): void {
    const id = this.selected.id;
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = new Hero(hero);
        this.selectedHero = this.hero;
        this.log(`You selected ${this.hero.name}`);
      });
  }

  getCurrentHP(): void {
    this.enemy ? this.currentHP = this.battleService.enemyHeroHP : this.currentHP = this.battleService.yourHeroHP;
  }

  log(message: string) {
    this.battleLogService.add(`${message}`);
  }
}
