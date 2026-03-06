import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTournamentComponent } from './cancel-tournament.component';

describe('CancelTournamentComponent', () => {
  let component: CancelTournamentComponent;
  let fixture: ComponentFixture<CancelTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelTournamentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
