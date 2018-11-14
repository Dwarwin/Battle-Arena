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

  constructor(
    public battleLogService: BattleLogService,
    public battleService: BattleService) {
  }

  ngOnInit() {
    this.readyForBattleState();
  }

  ngOnDestroy() {
    this.battleLogService.clear();
  }

  showLogToggle(): void {
    this.showLog = !this.showLog;
  }

  // TODO delete when finish battle service
  dealDmg(): void {
    this.battleService.changeHeroHp(Math.floor((Math.random() * 100) + 1), (() => Math.random() - 0.5 >= 0)());
  }

  readyForBattleState(): void {
    this.battleService.readyForBattle.subscribe(val => val !== 'yes' ? this.readyForBattle = true : this.readyForBattle = false);
  }

  startBattle(): void  {
    this.battleStarted = !this.battleStarted;
  }
}
