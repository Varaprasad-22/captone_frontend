import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllTickets } from './get-all-tickets';

describe('GetAllTickets', () => {
  let component: GetAllTickets;
  let fixture: ComponentFixture<GetAllTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllTickets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
