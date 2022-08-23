import { Router } from '@angular/router';
import { Event } from '../../../models/event';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
  getDay
} from 'date-fns';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject, Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaveService } from '../../../../../core/services/leave.service';
//import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';

@Component({
  selector: 'ash-dash-calendar',
  templateUrl: './dash-calendar.component.html',
  styleUrls: ['./dash-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashCalendarComponent implements OnInit {
  view = 'month';
  viewDate: Date = new Date();

  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  excludeDays: number[] = [];
  events$: Observable<Array<CalendarEvent<{ events: Event }>>>;

  constructor(private _router: Router, private LeaveServiceDB: LeaveService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventClicked(currEvent: CalendarEvent<{ event: Event }>): void {
    console.log('Event clicked', currEvent.meta.event);
    const clickedEvent = currEvent.meta.event;
    // if (clickedEvent.eventType === 'leave') {
    //   console.log('This is leave event', clickedEvent.eventId);
    //   this._router.navigate([
    //     '/home/leaverequests/details/' + clickedEvent.eventId
    //   ]);
    // } else {
    //   console.log('This is a event', clickedEvent.eventId);
    //   this._router.navigate(['/home/event/details/' + clickedEvent.eventId]);
    // }
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];
    const getEnd: any = { month: endOfMonth, week: endOfWeek, day: endOfDay }[
      this.view
    ];
    const date1 = format(getStart(this.viewDate), 'YYYY-MM-DD');
    //console.log('format(getStart(this.viewDate) date1', date1);
    const date2 = format(getEnd(this.viewDate), 'YYYY-MM-DD');
    //console.log('format(getEnd(this.viewDate) date2', date2);
    var params = {
      start_date: `${date1}`,
      end_date: `${date2}`
    };
    this.events$ = this.LeaveServiceDB.getLeaveAndEventsBetweenDate({
      params: params
    }).pipe(
      map((results: any) => {
        console.log('results iss ', results);
        return results.map((event: Event) => {
          console.log('voici les donnees charges', event.leaveType['name']);
          return {
            title: event.leaveType['name'],
            start: startOfDay(new Date(event.start_date)),
            end: endOfDay(new Date(event.end_date)),
            allDay: true,
            color:
              event.state === 'PENDING'
                ? { primary: '#2f79ef' }
                : { primary: '#e21841' },
            meta: {
              event
            }
          };
        });
      })
    );
  }
}
