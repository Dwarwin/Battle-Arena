import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSelectorComponent } from './hero-selector.component';

describe('HeroSelectorComponent', () => {
  let component: HeroSelectorComponent;
  let fixture: ComponentFixture<HeroSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
