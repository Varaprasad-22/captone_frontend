import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllOpenTickets } from './get-all-open-tickets';

describe('GetAllOpenTickets', () => {
  let component: GetAllOpenTickets;
  let fixture: ComponentFixture<GetAllOpenTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllOpenTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllOpenTickets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
