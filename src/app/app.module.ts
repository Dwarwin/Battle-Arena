import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArenaComponent } from './arena/arena.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroModelComponent } from './hero-model/hero-model.component';
import { BattleLogComponent } from './battle-log/battle-log.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ArenaComponent,
    HeroDetailsComponent,
    HeroesComponent,
    HeroModelComponent,
    BattleLogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
