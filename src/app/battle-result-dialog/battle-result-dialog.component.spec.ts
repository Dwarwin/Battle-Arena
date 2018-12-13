import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleResultDialogComponent } from './battle-result-dialog.component';

describe('BattleResultDialogComponent', () => {
  let component: BattleResultDialogComponent;
  let fixture: ComponentFixture<BattleResultDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleResultDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
