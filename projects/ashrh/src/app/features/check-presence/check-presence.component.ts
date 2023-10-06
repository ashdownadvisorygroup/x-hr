import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { EmployeeDbService } from '../../core/states/employees/employee-db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NotificationService,
  ServerFormatDatePipe
} from '../../core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';
import { map, take } from 'rxjs/operators';
import * as d3 from 'd3';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import {
  CalendarEvent,
  CalendarView,
  CalendarEventAction
} from 'angular-calendar';
import { LeaveService } from '../../core/services/leave.service';
import { MatDialog } from '@angular/material/dialog';
import { Events } from '../leaves/models/event';
import { PresenceDbService } from '../../core/services/presence-db.service';
import { DialogPresenceInfoComponent } from './dialog-presence-info/dialog-presence-info.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ashrh-check-presence',
  templateUrl: './check-presence.component.html',
  styleUrls: ['./check-presence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckPresenceComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate: ElementRef;
  subcription = new Subscription();
  filterExpand = false;
  dataSource: any[] = [];
  displayedColumns: string[] = ['name'];
  // displayedColumnsFilter: string[] = ['name_filter'];
  pageSizeOption: number[] = [5, 10, 25, 50, 100];
  lengh = 0;
  id;
  pageSize: number = this.pageSizeOption[2];
  private paramSearch: any = {
    page_size: this.pageSize,
    page: 1
  };
  selectedEmployee: any; // Variable pour stocker l'employé sélectionné
  employee: any;
  activeEmployee: any;
  view = 'month';
  viewDate: Date = new Date();
  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  excludeDays: number[] = [];
  events$: Observable<Array<CalendarEvent<{ events: Event }>>>;
  actions: CalendarEventAction[] = [
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
  isEmployeeSelected = false;
  totalWorkDays: number = 0;
  // totalHours: any;

  selectEmployee(event: Event, employee: any) {
    event.preventDefault(); // Empêcher la redirection du lien
    // console.log('------------------------', employee);

    this.selectedEmployee = employee; // Mettre à jour l'employé sélectionné
    this.activeEmployee = employee;
    this.isEmployeeSelected = true;
    this.totalWorkDays = 0;
    // this.totalHours = 0;

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
      employee_id: `${employee.id}`,
      start_date: `${date1}`,
      end_date: `${date2}`
    };
    this.events$ = this.presenceServiceDb
      .getPresenceListBetweenDate({
        params: params
      })
      .pipe(
        map((results: any) => {
          console.log('results iss ', results);
          console.log('Type of results:', typeof results);
          return results.map((event: any) => {
            console.log('voici les donnees charges', event);
            this.totalWorkDays = results.length;
            // this.totalHours = event.total;
            console.log('TEST++++++++++', this.totalWorkDays);

            const formattedArrive = formatDate(event.date, 'yyyy-MM-dd', 'en');
            const formattedDepart = formatDate(event.date, 'yyyy-MM-dd', 'en');
            return {
              title: `Presence of ${employee?.person.first_name?.toUpperCase()} ${employee?.person.last_name?.toUpperCase()}`,
              // `${event.reason} by ${event.employee?.person.first_name?.toUpperCase()} ${event.employee?.person.last_name?.toUpperCase()}`,
              start: startOfDay(new Date(formattedArrive)),
              end: endOfDay(new Date(formattedDepart)),
              totalWorkDays: this.totalWorkDays,
              // totalHours: this.totalHours,
              allDay: true,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              draggable: true,
              actions: this.actions,
              color: { primary: 'green' },
              meta: {
                event: {
                  arrive: formattedArrive,
                  depart: formattedDepart,
                  total_hours: event.total,
                  id: employee.id
                }
              }
            };
          });
        })
      );

    this.events$.subscribe((result: any) => {
      // console.log('pppppppppppppppppppppppppppppppppppp', result);
    });
  }

  // sections: any[] = [
  //   {
  //     name: 'Arrival',
  //     image: '/assets/modules/employé.png',
  //     route: 'check-arrive',
  //     textBgColor: '#FFA500'
  //   },
  //   {
  //     name: 'Departure',
  //     image: '/assets/modules/employé.png',
  //     route: 'check-depart',
  //     textBgColor: '#2a2829'
  //   }
  // ];

  constructor(
    private cd: ChangeDetectorRef,
    private employeeDbService: EmployeeDbService,
    private modalService: NgbModal,
    private notiSelect: NotificationService,
    public serverFormatDatePipe: ServerFormatDatePipe,
    private notiservice: NotificationService,
    private trans: TranslateService,
    private LeaveServiceDB: LeaveService,
    public dialog: MatDialog,
    public presenceServiceDb: PresenceDbService
  ) {}

  ngOnInit(): void {
    this.query(this.paramSearch); //query renvoie les elements qui se trouve a un numero de page et un nombre d'element a recupere contenu dans paramSearch
    this.fetchEvents();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  public setPage($event: PageEvent) {
    this.paramSearch.page_size = $event.pageSize;
    this.paramSearch.page = $event.pageIndex + 1;
    this.query(this.paramSearch);
  }

  searchChange(event: any) {
    if (event) {
      this.paramSearch.first_name = event;
      this.paramSearch.last_name = event;
      this.paramSearch.email = event;
    } else {
      delete this.paramSearch.first_name;
      delete this.paramSearch.last_name;
      delete this.paramSearch.email;
    }
    this.query(this.paramSearch);
  }

  queryFactory(params: string | string[], val: any) {
    if (typeof params === 'string') {
      params = [params];
    }
    for (const param of params) {
      if (val) {
        this.paramSearch[param] = val;
      } else {
        delete this.paramSearch[param];
      }
    }
    console.log('this.paramSearch[param] = val;', this.paramSearch);
    this.query(this.paramSearch);
  }
  queryByPassFactory(params: string[], val: any) {
    // console.log('')
    for (const param of params) {
      this.paramSearch[param] = val;
    }
    this.query(this.paramSearch);
  }

  private query(params) {
    console.log('that is params of query function', params);
    this.employeeDbService
      .queryEmployees(params)
      .pipe(take(1))
      .subscribe((emp: any) => {
        console.log('these are the employees: :( ):', emp);
        // console.log(emp);
        this.dataSource = emp?.results.map((elt) => ({
          ...elt
        }));

        this.lengh = emp.total;
        console.log('that is total', emp);
        this.cd.detectChanges();
      });
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

  openDialog(data) {
    console.log('entrer !!!!!!!!!!!', name);
    const dialogRef = this.dialog.open(DialogPresenceInfoComponent, {
      width: '50%',
      height: '65%',
      disableClose: false,
      data
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog after closing of dialog result: ${result}`);
    });
  }

  eventClicked(currEvent: CalendarEvent<{ event: Events }>): void {
    console.log('Event clicked', currEvent.meta.event);
    const clickedEvent = currEvent.meta.event;

    console.log('.......................................', currEvent);

    this.openDialog(clickedEvent);

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
    this.events$ = this.presenceServiceDb
      .getPresenceListBetweenDate({
        params: params
      })
      .pipe(
        map((results: any) => {
          console.log('results iss ', results);
          console.log('Type of results:', typeof results);
          return results.map((event: Events) => {
            console.log('voici les donnees charges', event);
            return {
              title: `${
                event.type?.['type']
              } by ${event.employee?.person.first_name?.toUpperCase()} ${event.employee?.person.last_name?.toUpperCase()}`,
              // `${event.reason} by ${event.employee?.person.first_name?.toUpperCase()} ${event.employee?.person.last_name?.toUpperCase()}`,
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
