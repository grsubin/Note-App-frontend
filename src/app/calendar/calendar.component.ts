import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
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

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = false;

  noteList: [];

  isLoading$: Observable<boolean>;
  private _showLoaderEvents$!: Observable<boolean>;
  private _hideLoaderEvents$!: Observable<boolean>;

  constructor(
    private notesService: NotesService,
    private onlineOfflineService: OnlineOfflineService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._showLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      map(() => true)
    );
    this._hideLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      map(() => false)
    );
    this.isLoading$ = merge(this._hideLoaderEvents$, this._showLoaderEvents$);
    this.loadNotesAsEvents();
  }

  events: CalendarEvent[] = [];

  loadNotesAsEvents() {
    if (this.onlineOfflineService.isOnline) {
      this.route.data.subscribe((data) => {
        this.noteList = data.notes;
      });
    } else {
      this.notesService.getAllIndexedNotes().then((result) => {
        if (result) {
          this.noteList = result.filter((note) => {
            return !note.isDeletedOffline;
          });
        }
      });
    }
    if (!!this.noteList) {
      this.noteList.forEach((note: Note) => {
        this.events = [
          ...this.events,
          {
            title: note.title,
            color: colors.yellow,
            start: new Date(note.created_at),
          },
        ];
      });
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}
