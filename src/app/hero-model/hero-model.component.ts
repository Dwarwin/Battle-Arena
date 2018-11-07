import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService} from '../services/-hero.service';

@Component({
  selector: 'app-hero-model',
  templateUrl: './hero-model.component.html',
  styleUrls: ['./hero-model.component.sass']
})
export class HeroModelComponent implements OnInit {

  heroes: Hero[];
  hero: Hero;
  selected: number;

  constructor( private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(res => this.heroes = res);
  }

  getHero(): void {
    const id = this.selected;
    this.heroService.getHero(id)
      .subscribe(hero =>
        this.hero = new Hero(hero)
      );
  }

}