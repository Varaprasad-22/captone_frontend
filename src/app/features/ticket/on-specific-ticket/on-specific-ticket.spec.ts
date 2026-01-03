import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSpecificTicket } from './on-specific-ticket';

describe('OnSpecificTicket', () => {
  let component: OnSpecificTicket;
  let fixture: ComponentFixture<OnSpecificTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnSpecificTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnSpecificTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
