import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../services/-hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.sass']
})

export class HeroDetailsComponent implements OnInit {

  hero: Hero;
  changeNameStatus = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = new Hero(hero);
        console.log(this.hero);
      });
  }

  changeName(): void {
    this.changeNameStatus = !this.changeNameStatus;
  }

  saveNewName(name): void {
    this.heroService.getHeroes().subscribe(res => {
      if (!res.find((_) => _.name.toLowerCase() === name.toLowerCase())) {
        this.changeName();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (50 - this.hero.strength - this.hero.dexterity - this.hero.constitution - this.hero.luck >= 0) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}