import {Component, OnDestroy, OnInit} from '@angular/core';
import {BattleLogService} from '../services/battle-log.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.sass']
})
export class ArenaComponent implements OnInit, OnDestroy {

  showLog: boolean;

  constructor(
    public battleLogService: BattleLogService) {
  }

  ngOnInit() {
  }

  showLogToggle(): void {
    this.showLog = !this.showLog;
  }

  ngOnDestroy() {
    this.battleLogService.clear();
  }
}
