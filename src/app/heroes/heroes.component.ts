import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../services/-hero.service';
import { Router} from '@angular/router';
import { ExistingNameValidator} from '../validators/existing-name';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  hero: Hero;
  name: FormControl;
  showDetail: number;

  constructor(private heroService: HeroService,
              private router: Router) {
  }

  ngOnInit() {
    this.getHeroes();
    this.name = new FormControl('', Validators.pattern(/^[a-zA-Z0-9_.-]*$/), ExistingNameValidator.validate(this.heroService));
  }

  getErrorMessage() {
    return this.name.hasError('pattern') ? 'Not a valid name' :
      'Name has been already taken';
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    if (!name) {
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

