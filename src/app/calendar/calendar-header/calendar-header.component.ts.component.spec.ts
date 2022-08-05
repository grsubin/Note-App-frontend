import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHeader.Component.TsComponent } from './calendar-header.component.ts.component';

describe('CalendarHeader.Component.TsComponent', () => {
  let component: CalendarHeader.Component.TsComponent;
  let fixture: ComponentFixture<CalendarHeader.Component.TsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarHeader.Component.TsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarHeader.Component.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
