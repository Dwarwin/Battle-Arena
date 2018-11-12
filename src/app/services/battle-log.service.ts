import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BattleLogService {

  battleLog: string[] = [];

  add (massage: string): void {
    this.battleLog.push(massage);
  }

  clear(): void {
    this.battleLog = [];
  }
}
