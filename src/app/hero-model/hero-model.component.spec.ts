import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroModelComponent } from './hero-model.component';

describe('HeroModelComponent', () => {
  let component: HeroModelComponent;
  let fixture: ComponentFixture<HeroModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
