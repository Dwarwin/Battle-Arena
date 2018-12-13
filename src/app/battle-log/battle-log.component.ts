import { Component, Input, OnInit } from '@angular/core';
import { BattleLogService } from '../services/battle-log.service';

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.sass']
})
export class BattleLogComponent implements OnInit {

  @Input() round: boolean;

  constructor(
    public battleLogService: BattleLogService) { }

  ngOnInit() { }

}
