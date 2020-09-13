import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationAlertsComponent } from './immunization-alerts.component';

describe('ImmunizationAlertsComponent', () => {
  let component: ImmunizationAlertsComponent;
  let fixture: ComponentFixture<ImmunizationAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmunizationAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunizationAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
