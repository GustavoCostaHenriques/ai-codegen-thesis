import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksOverviewComponent } from './weeks-overview.component';

describe('WeeksOverviewComponent', () => {
  let component: WeeksOverviewComponent;
  let fixture: ComponentFixture<WeeksOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeksOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeksOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
