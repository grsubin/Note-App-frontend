import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarMonthViewDay,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import { colors } from './colors';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { NotesService } from '../core/_services/notes.service';
import {
  filter,
  first,
  map,
  merge,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { OnlineOfflineService } from '../core/_services/online-offline.service';
import {
  ActivatedRoute,
  ResolveEnd,
  ResolveStart,
  Router,
} from '@angular/router';
import { Note } from '../_models/note';
import { NONE_TYPE } from '@angular/compiler';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';

import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = false;

  show: boolean = false;

  start_date: Date;
  end_date: Date;

  noteList: [];

  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDayViewDate: Date;

  hourColumns: WeekViewHourColumn[];

  selectedDay: any;

  refresh = new Subject<void>();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  isLoading$: Observable<boolean>;
  private _showLoaderEvents$!: Observable<boolean>;
  private _hideLoaderEvents$!: Observable<boolean>;

  constructor(
    private notesService: NotesService,
    private onlineOfflineService: OnlineOfflineService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {}
  ngOnInit(): void {
    this.loadNotesAsEvents();
    this._showLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      map(() => true)
    );
    this._hideLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      map(() => false)
    );
    this.isLoading$ = merge(this._hideLoaderEvents$, this._showLoaderEvents$);
  }

  events: CalendarEvent[] = [];

  async loadNotesAsEvents() {
    // if (this.onlineOfflineService.isOnline) {
    //   this.route.data.subscribe((data) => {
    //     this.noteList = data.notes;
    //   });
    // } else {
    //   console.log('here');
    //   this.notesService.getAllIndexedNotes().then((result) => {
    //     if (result) {
    //       console.log(result);
    //       this.noteList = result.filter((note) => {
    //         return !note.isDeletedOffline;
    //       });
    //     }
    //   });
    // }
    // this.route.data.subscribe((data) => {
    //     this.noteList = data.notes;
    if (this.onlineOfflineService.isOnline) {
      this.route.data.subscribe((data) => {
        console.log('This is data:');
        console.log(data);
        this.noteList = data.notes;
      });
    } else {
      this.noteList = await this.notesService.getAllIndexedNotes();
    }
    if (!!this.noteList) {
      this.noteList.forEach((note: Note) => {
        console.log(note);
        console.log(this.events);
        this.events = [
          ...this.events,
          {
            title: note.title,
            body: note.body,
            color: colors.yellow,
            start: !note.start_date
              ? note.start_date
              : new Date(note.start_date),
            end: !note.end_date ? note.end_date : new Date(note.end_date),
          },
        ];
      });
    }
  }

  dayClicked(day: CalendarMonthViewDay): void {
    if (isSameMonth(day.date, this.viewDate)) {
      if (day.events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = day.date;
    }

    console.log(this.viewDate);

    this.selectedMonthViewDay = day;
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();

    //multiple days

    // const dateIndex = this.selectedDays.findIndex(
    //   (selectedDay) => selectedDay.date.getTime() === selectedDateTime
    // );
    // if (dateIndex > -1) {
    //   delete this.selectedMonthViewDay.cssClass;
    //   this.selectedDays.splice(dateIndex, 1);
    // } else {
    //   this.selectedDays.push(this.selectedMonthViewDay);
    //   day.cssClass = 'cal-day-selected';
    //   this.selectedMonthViewDay = day;
    // }
    // for single day

    if (!this.show) {
      if (
        !!this.selectedDay &&
        this.selectedDay.date.getTime() == selectedDateTime
      ) {
        // delete this.selectedMonthViewDay.cssClass;
        this.selectedDay = null;
      } else {
        this.selectedDay = this.selectedMonthViewDay;
        day.cssClass = 'cal-day-selected';
        this.selectedMonthViewDay = day;
        this.show = true;
        this.start_date = new Date(this.selectedDay.date);
        this.end_date = this.start_date;
      }
    } else {
      this.show = false;
      this.selectedDay = null;
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      //multiple day
      //   if (
      //     this.selectedDay.some(
      //       (selectedDay) => selectedDay.date.getTime() === day.date.getTime()
      //     )
      //   ) {
      //     day.cssClass = 'cal-day-selected';
      //   }
      //single day
      if (this.selectedDay?.date.getTime() === day.date.getTime()) {
        day.cssClass = 'cal-day-selected';
      }
    });
  }

  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          if (
            this.selectedDayViewDate &&
            segment.date.getTime() === this.selectedDayViewDate.getTime()
          ) {
            segment.cssClass = 'cal-day-selected';
          }
        });
      });
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  showAdd() {
    console.log(new Date().toJSON());
    if (!!this.selectedDay) {
      this.show = !this.show;
    }
  }

  closeAddBox() {
    this.show = false;
  }
}
