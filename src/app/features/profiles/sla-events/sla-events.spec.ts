import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaEvents } from './sla-events';

describe('SlaEvents', () => {
  let component: SlaEvents;
  let fixture: ComponentFixture<SlaEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
