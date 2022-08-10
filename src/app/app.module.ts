import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';
import { AuthenticationService } from './core/_services/authentication.service';
import { NotesService } from './core/_services/notes.service';
import { JwtInterceptor } from './core/_helpers/jwt.interceptor';
import { UserService } from './core/_services/user.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OnlineOfflineService } from './core/_services/online-offline.service';
import { SelectedNoteService } from './core/_services/selected-note.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NpDatepickerModule } from 'angular-nepali-datepicker';

@NgModule({
  declarations: [AppComponent, CalendarComponent, CalendarHeaderComponent],
  imports: [
    BrowserModule,
    NgbModalModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    HttpClientModule,
    AuthenticationModule,
    UserModule,
    NotesModule,
    FormsModule,
    MatProgressBarModule,
    FlatpickrModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    AuthenticationService,
    NotesService,
    UserService,
    OnlineOfflineService,
    SelectedNoteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
