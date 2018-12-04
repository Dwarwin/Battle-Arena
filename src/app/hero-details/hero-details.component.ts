import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

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
  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]*$/)]);

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' :
      this.name.hasError('pattern') ? 'Not a valid name' :
        '';
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = new Hero(hero);
      });
  }

  changeName(): void {
    this.changeNameStatus = !this.changeNameStatus;
  }

  saveNewName(): void {
    if (this.hero.name === this.name.value) {
      this.changeName();
    } else {
      this.hero.name = this.name.value;
      this.heroService.getHeroes().subscribe(res => {
        if (!res.find((_) => _.name.toLowerCase() === this.hero.name.toLowerCase())) {
          this.changeName();
        }
      });
    }
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
