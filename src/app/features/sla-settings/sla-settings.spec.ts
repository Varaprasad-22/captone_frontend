import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaSettings } from './sla-settings';

describe('SlaSettings', () => {
  let component: SlaSettings;
  let fixture: ComponentFixture<SlaSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
