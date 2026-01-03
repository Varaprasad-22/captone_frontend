import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMyTicket } from './get-my-ticket';

describe('GetMyTicket', () => {
  let component: GetMyTicket;
  let fixture: ComponentFixture<GetMyTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMyTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMyTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
