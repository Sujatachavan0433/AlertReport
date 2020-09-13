import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAlertComponent } from './add-new-alert.component';

describe('AddNewAlertComponent', () => {
  let component: AddNewAlertComponent;
  let fixture: ComponentFixture<AddNewAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
