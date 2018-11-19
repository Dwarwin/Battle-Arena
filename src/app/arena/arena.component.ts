import { Component, OnDestroy, OnInit } from '@angular/core';
import { BattleLogService } from '../services/battle-log.service';
import { BattleService } from '../services/battle.service';

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

  constructor(
    public battleLogService: BattleLogService,
    public battleService: BattleService) {
  }

  ngOnInit() {
    this.readyForBattleState();
    this.readyForRoundState();
  }

  ngOnDestroy() {
    this.battleLogService.clear();
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

  startBattle(): void  {
    this.battleStarted = !this.battleStarted;
  }
}
