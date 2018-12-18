import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BattleLogService } from '../services/battle-log.service';
import { BattleService } from '../services/battle.service';
import {debounceTime, startWith, map} from 'rxjs/operators';
import {fromEvent, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.sass']
})
export class ArenaComponent implements OnInit, OnDestroy {

  showLog: boolean;
  readyForBattle = false;
  battleStarted: boolean;
  readyForRound: boolean;
  battleEnded: boolean;
  isMobile: boolean;
  attackedPartsSelected: boolean;
  blockedPartsSelected: boolean;
  tabIndex = 2;

  isMobile$: Observable<boolean>;
  subscribes: Subscription[] = [];
  isMobileState: Subscription;
  readyForBattleState: Subscription;
  readyForRoundState: Subscription;
  endBattleState: Subscription;
  heroParts: Subscription;
  enemyParts: Subscription;

  constructor(
    public battleLogService: BattleLogService,
    private router: Router,
    private battleService: BattleService) {
  }

  ngOnInit() {
    this.checkIfMobile();
    this.externalSubscriptions();

  }

  ngOnDestroy() {
    this.battleLogService.clear();
    this.battleService.clearService();
    this.subscribes.forEach(val => val.unsubscribe());
  }

  showLogToggle(): void {
    this.showLog = !this.showLog;
  }

  // TODO delete when finish battle service
  dealDmg(): void {
    this.battleService.newRound();
    this.showLog = false;
  }

  checkIfMobile(): void {
    const checkScreenSize = () => document.body.offsetWidth < 900;
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500)).pipe(map(checkScreenSize));
    this.isMobile$ = screenSizeChanged$.pipe(startWith(checkScreenSize()));
    this.isMobileState = this.isMobile$.subscribe(val => this.isMobile = val);
    this.subscribes.push(this.isMobileState);
  }

  externalSubscriptions(): void {
    this.readyForBattleState = this.battleService.readyForBattle$
      .subscribe(val => val !== 'yes' ? this.readyForBattle = true : this.readyForBattle = false);
    this.readyForRoundState = this.battleService.readyForRound$
      .subscribe(val => val !== 'yes' ? this.readyForRound = true : this.readyForRound = false);
    this.endBattleState = this.battleService.battleEnded$
      .subscribe(val => val !== 'yes' ? this.battleEnded = true : this.battleEnded = false);

    this.heroParts = this.battleService.blockedPoints$
      .subscribe(el => el.length < 2 ? this.blockedPartsSelected = false : this.blockedPartsSelected = true);
    this.enemyParts = this.battleService.attackedPoints$
      .subscribe(el => el.length < 2 ? this.attackedPartsSelected = false : this.attackedPartsSelected = true);

    this.subscribes.push(this.readyForBattleState, this.readyForRoundState, this.endBattleState, this.heroParts, this.enemyParts);
  }

  startBattle(): void  {
    this.battleStarted = !this.battleStarted;
  }

  endBattle(): void {
    this.router.navigate(['/dashboard']);
  }

  tryAgain(): void {
    this.battleService.tryAgain();
  }
}
