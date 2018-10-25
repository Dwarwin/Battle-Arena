import { TestBed } from '@angular/core/testing';

import { BattleLogService } from './battle-log.service';

describe('BattleLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BattleLogService = TestBed.get(BattleLogService);
    expect(service).toBeTruthy();
  });
});
