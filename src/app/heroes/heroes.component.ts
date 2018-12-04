import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../services/-hero.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  hero: Hero;
  name: FormControl;
  heroAdded: boolean;
  showDetail: number;

  constructor(private heroService: HeroService,
              private router: Router) {
  }

  ngOnInit() {
    this.getHeroes();
    this.name = new FormControl('', Validators.pattern(/^[a-zA-Z0-9_.-]*$/));
  }

  getErrorMessage() {
    return this.name.hasError('pattern') ? 'Not a valid name' : '';
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    this.heroAdded = true;
    name = name.trim();
    if (!name || this.heroes.find((_) => _.name.toLowerCase() === name.toLowerCase())) {
      this.heroAdded = false;
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
    this.goTo(name);
  }

  goTo(name: string): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.hero = heroes.find(el => el.name === name);
      this.router.navigateByUrl(`detail/${this.hero.id}`);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  showDetails(hero): void {
    this.showDetail = hero;
  }
}

