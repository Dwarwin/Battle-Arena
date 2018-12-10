import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from '../services/-hero.service';
import {BattleService} from '../services/battle.service';
import {Hero} from '../hero';

@Component({
  selector: 'app-hero-selector',
  templateUrl: './hero-selector.component.html',
  styleUrls: ['./hero-selector.component.sass']
})
export class HeroSelectorComponent implements OnInit {

  @Input() enemy: boolean;
  @Input() battleStarted: boolean;
  hero: Hero;
  heroes: Hero[];
  selectedHero: Hero;
  selectedEnemy: Hero;
  selected: Hero;

  constructor(
    private heroService: HeroService,
    private battleService: BattleService
  ) {}

  ngOnInit() {
    this.heroService.getHeroes().subscribe(res => this.heroes = res);
  }

  getHero(): void {
    const id = this.selected.id;
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = new Hero(hero);
        !this.enemy ? this.selectedHero = hero : this.selectedEnemy = hero;
        this.battleService.getHero(this.hero, this.enemy);
      });
  }
}
