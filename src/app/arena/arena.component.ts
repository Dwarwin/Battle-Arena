import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BattleLogService } from '../services/battle-log.service';
import { BattleService } from '../services/battle.service';
import {debounceTime, startWith, map} from 'rxjs/operators';
import {fromEvent, Observable} from 'rxjs';

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
  isMobile$: Observable<any>;
  isMobile: boolean;

  constructor(
    public battleLogService: BattleLogService,
    private router: Router,
    private battleService: BattleService) {
  }

  ngOnInit() {
    const checkScreenSize = () => document.body.offsetWidth < 900;
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500)).pipe(map(checkScreenSize));
    this.isMobile$ = screenSizeChanged$.pipe(startWith(checkScreenSize()));
    this.isMobile$.subscribe(val => this.isMobile = val);
    this.readyForBattleState();
    this.readyForRoundState();
    this.endBattleState();
  }

  ngOnDestroy() {
    this.battleLogService.clear();
    this.battleService.clearService();
  }

  showLogToggle(): void {
    this.showLog = !this.showLog;
  }

  // TODO delete when finish battle service
  dealDmg(): void {
    this.battleService.newRound();
  }

  readyForBattleState(): void {
    this.battleService.readyForBattle.subscribe(val => val !== 'yes' ? this.readyForBattle = true : this.readyForBattle = false);
  }

  readyForRoundState(): void {
    this.battleService.readyForRound.subscribe(val => val !== 'yes' ? this.readyForRound = true : this.readyForRound = false);
  }

  endBattleState(): void {
    this.battleService.battleEnded.subscribe(val => val !== 'yes' ? this.battleEnded = true : this.battleEnded = false);
  }

  startBattle(): void  {
    this.battleStarted = !this.battleStarted;
  }

  endBattle(): void {
    this.router.navigate(['/dashboard']);
  }

}
