import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BattleLogService {

  roundLog: string[] = [];
  battleLog: string[] = [];

  add (massage: string): void {
    this.roundLog.push(massage);
    this.battleLog.push(massage);
  }

  clear(): void {
    this.roundLog = [];
  }

  clearLog(): void {
    this.battleLog = [];
  }
}
