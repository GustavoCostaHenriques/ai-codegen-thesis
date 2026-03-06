import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTournamentComponent } from './details-tournament.component';

describe('DetailsTournamentComponent', () => {
  let component: DetailsTournamentComponent;
  let fixture: ComponentFixture<DetailsTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTournamentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
