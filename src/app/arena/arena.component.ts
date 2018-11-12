import {Component, OnDestroy, OnInit} from '@angular/core';
import {BattleLogService} from '../services/battle-log.service';
import {BattleService} from '../services/battle.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.sass']
})
export class ArenaComponent implements OnInit, OnDestroy {

  showLog: boolean;

  constructor(
    public battleLogService: BattleLogService,
    public battleService: BattleService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.battleLogService.clear();
  }

  showLogToggle(): void {
    this.showLog = !this.showLog;
  }

  dealDmg(): void {
    this.battleService.changeHeroHp(Math.floor((Math.random() * 100) + 1), (() => Math.random() - 0.5 >= 0)());
  }
}
