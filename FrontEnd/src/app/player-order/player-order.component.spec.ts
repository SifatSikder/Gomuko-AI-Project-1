import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOrderComponent } from './player-order.component';

describe('PlayerOrderComponent', () => {
  let component: PlayerOrderComponent;
  let fixture: ComponentFixture<PlayerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
