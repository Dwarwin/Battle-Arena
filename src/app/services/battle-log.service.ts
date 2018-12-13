import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BattleLogService {

  roundLog: string[] = [];
  battleLog: string[] = [];

  add (massage: string): void {
    this.roundLog.push(massage);
  }

  addToLog (round: string[]): void {
    round.forEach(el => this.battleLog.push(el));
    console.log(this.battleLog);
  }

  clear(): void {
    this.addToLog(this.roundLog);
    this.roundLog = [];
  }

  clearLog(): void {
    this.battleLog = [];
  }
}
