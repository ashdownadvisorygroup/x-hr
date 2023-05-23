import { Router } from '@angular/router';
import { Event } from '../../../models/event';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
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

import {
  CalendarEvent,
  CalendarView,
  CalendarEventAction
} from 'angular-calendar';

import { Subject, Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaveService } from '../../../../../core/services/leave.service';
//import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { MatDialog } from '@angular/material/dialog';
import { DialogLeaveInfoComponent } from '../../../Dialogue/dialog-leave-info/dialog-leave-info.component';

@Component({
  selector: 'ash-dash-calendar',
  templateUrl: './dash-calendar.component.html',
  styleUrls: ['./dash-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterExpand', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: '*' })),
      transition('false <=> true', [style({ display: '*' }), animate(1000)])
    ])
  ]
})
export class DashCalendarComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate: ElementRef;

  view = 'month';
  viewDate: Date = new Date();

  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  excludeDays: number[] = [];
  events$: Observable<Array<CalendarEvent<{ events: Event }>>>;

  actions: CalendarEventAction[] = [
    // {
    //   label: '<i class="fas fa-fw fa-pencil-alt"></i>',
    //   a11yLabel: 'Edit',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.handleEvent('Edited', event);
    //   },
    // },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.events = this.events.filter((iEvent) => iEvent !== event);
        // this.handleEvent('Deleted', event);

        console.log('event: CalendarEvent', event);
      }
    }
  ];

  constructor(
    private _router: Router,
    private LeaveServiceDB: LeaveService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private modalService: NgbModal
  ) {}

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
    console.log('*************dayClicked*************', this.dayClicked);
  }

  openDialog(id) {
    // console.log('entrer !!!!!!!!!!!', name);
    const dialogRef = this.dialog.open(DialogLeaveInfoComponent, {
      width: '50%',
      height: '65%',
      disableClose: false,
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog after closing of dialog result: ${result}`);
    });
  }

  eventClicked(currEvent: CalendarEvent<{ event: Event }>): void {
    console.log('Event clicked', currEvent.meta.event);
    const clickedEvent = currEvent.meta.event;

    this.openDialog(clickedEvent.id);
    console.log('*******************EVENT****************');

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
          // console.log('voici les donnees charges', event.leaveType['name']);
          return {
            title:
              event.leaveType['name'] +
              ` by ${event.employee.person.first_name?.toUpperCase()} ${event.employee.person.last_name?.toUpperCase()}`,
            start: startOfDay(new Date(event.start_date)),
            end: endOfDay(new Date(event.end_date)),
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true,
            actions: this.actions,
            color:
              event.state === 'PENDING'
                ? { primary: '#1e90ff' }
                : event.state === 'APPROVED'
                ? { primary: 'green' }
                : { primary: '#ad2121' },
            meta: {
              event
            }
          };
        });
      })
    );
    console.log('this.events$ ++++++++++++++++++++++++++', this.events$);
  }
}
//#2f79ef
//#e21841
