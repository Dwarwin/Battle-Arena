import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/-in-memory-data.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArenaComponent } from './arena/arena.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroModelComponent } from './hero-model/hero-model.component';
import { BattleLogComponent } from './battle-log/battle-log.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material';
import { CountAdvStatsPipe } from './pipes/count-adv-stats.pipe';
import { HeroSelectorComponent } from './hero-selector/hero-selector.component';
import { BattleResultDialogComponent } from './battle-result-dialog/battle-result-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ArenaComponent,
    HeroDetailsComponent,
    HeroesComponent,
    HeroModelComponent,
    BattleLogComponent,
    CountAdvStatsPipe,
    HeroSelectorComponent,
    BattleResultDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  entryComponents: [BattleResultDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
