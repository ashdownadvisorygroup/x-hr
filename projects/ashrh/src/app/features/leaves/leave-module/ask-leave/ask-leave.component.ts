import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LeaveService } from '../../../../core/services/leave.service';
import { AppRoutes } from '../../../../modeles/app-routes';
import {
  LocalStorageService,
  NotificationService
} from '../../../../core/core.module';
import { ServerFormatDatePipe } from '../../../../core/pipes/server-format-date.pipe';
import { DialogAddLeavesComponent } from '../../Dialogue/dialog-add-leaves/dialog-add-leaves.component';

import { MatDialog } from '@angular/material/dialog';
import { validateEvents } from 'calendar-utils';
import { DialogLeaveInfoComponent } from '../../Dialogue/dialog-leave-info/dialog-leave-info.component';
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
import { Router } from '@angular/router';

@Component({
  selector: 'ash-ask-leave',
  templateUrl: './ask-leave.component.html',
  styleUrls: ['./ask-leave.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterExpand', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: '*' })),
      transition('false <=> true', [style({ display: '*' }), animate(1000)])
    ])
  ]
})
export class AskLeaveComponent implements OnInit, OnDestroy {
  @ViewChild('dialogTemplate') dialogTemplate: ElementRef;
  subcription = new Subscription();
  filterExpand = false;
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'selection',
    'name',
    'date_soumission',
    'start_date',
    'end_date',
    'state',
    'actions'
  ];
  displayedColumnsFilter: string[] = [
    'selection_filter',
    'name_filter',
    'date_soumission_filter',
    'start_date_filter',
    'end_date_filter',
    'state_filter',
    'actions_filter'
  ];
  // paginator
  pageSizeOption: number[] = [5, 10, 25, 50, 100];
  lengh = 0;
  pageSize: number = this.pageSizeOption[2];
  private paramSearch: any = {
    page_size: this.pageSize,
    page: 1
  };

  private Search: any[] = [
    {
      field: '',
      element: ''
    }
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private localser: LocalStorageService,
    public dialog: MatDialog,
    private LeaveServiceDB: LeaveService,
    private modalService: NgbModal,
    private notiSelect: NotificationService,
    public serverFormatDatePipe: ServerFormatDatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.query(this.paramSearch); //query renvoie les elements qui se trouve a un numero de page et un nombre d'element a recupere contenu dans paramSearch
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  //
  public setPage($event: PageEvent) {
    this.paramSearch.page_size = $event.pageSize;
    this.paramSearch.page = $event.pageIndex + 1;
    this.query(this.paramSearch);
  }

  setUser(element: any) {
    console.log('element when i check', element);
    this.LeaveServiceDB.updateLeaves(element.id, { activate: element.activate })
      .pipe(take(1))
      .subscribe(
        (resp) => {
          this.notiSelect.success('Updated succefully');
        },
        (err) => {}
      );
  }

  displayFilter() {
    this.filterExpand = !this.filterExpand;
    console.log('this.filterExpand', this.filterExpand);
    if (!this.filterExpand) {
      this.query(this.paramSearch);
      this.Search = [];
    }
  }

  queryFactory(params: string | string[], val: any) {
    let filterChoose = this.Search;
    filterChoose.push({
      field: params,
      element: val
    });

    // for (const param of params) {
    //   if (val) {
    //     this.paramSearch[param] = val;
    //   } else {
    //     delete this.paramSearch[param];
    //   }
    // }

    var tab = this.dataSource;
    filterChoose = filterChoose.filter((elt) => elt.field !== '');

    console.log('filterChoose -------------', filterChoose);
    console.log('TAB -------------', tab);

    // tab = tab.filter(function (elt) {
    //   for (let obj of filterChoose) {
    //     var val1 = `${elt[obj.field]}`.toLowerCase();
    //     var val2 = `${obj.element}`.toLowerCase();
    //     if (val1.trim().includes(val2.trim())) {
    //       return true;
    //     }
    //   }
    //   return false;
    // });

    for (let obj of filterChoose) {
      tab = tab.filter((elt) =>
        `${elt[obj.field]}`
          .trim()
          .toLowerCase()
          .includes(`${obj.element}`.trim().toLowerCase())
      );
      console.log(
        '*************************DATASOURCE***********************',
        tab
      );
    }

    this.dataSource = tab;

    // console.log('this.paramSearch[param] = val;', this.paramSearch);
    // this.query(this.paramSearch);
    // console.log('execution du filtre');
    // if (typeof params === 'string') {
    //   params = [params];
    // }
    //var field = `${params}`;
  }

  queryByPassFactory(params: string[], val: any) {
    // console.log('')
    for (const param of params) {
      this.paramSearch[param] = val;
    }
    this.query(this.paramSearch);
  }

  private query(params) {
    var tabul = [];
    console.log('that is params of query function', params);
    this.LeaveServiceDB.queryLeaves(params)
      .pipe(take(1))
      .subscribe((emp: any) => {
        console.log('these are the leaves: :( ):', emp);
        // console.log(emp);localStorage.getItem('ASHRH-TOKEN')
        // console.log(
        //   'voici les demandes faites par lemploye',
        //   JSON.parse(localStorage.getItem('ASHRH-employee/Rh_id'))
        // );
        console.log('emp ---------------', emp);

        tabul = emp.filter((elt) =>
          this.LeaveServiceDB.loadLeaves()
            .pipe(take(1))
            .subscribe((res) => {
              console.log('**************************************RES', res);

              this.dataSource = res as any[];
            })
        );
        console.log('emp +++++++++++++', tabul);
        this.dataSource = tabul.map((elt) => ({
          id: elt.id,
          name: elt.leaveType?.name,
          start_date: elt.start_date,
          end_date: elt.end_date,
          date_soumission: elt.created_at,
          state: elt.state,
          employee: elt.employee,
          select: false
        }));
        console.log(
          '**************************************>>>>>>>',
          this.dataSource
        );

        this.lengh = emp.total;
        console.log('that is total of data output !!!!!!!!!!!!!', emp?.results);
        this.cd.detectChanges();
      });
  }

  public watchAll() {
    return this.dataSource.every((elt) => elt.select);
  }
  public checkAll(event) {
    this.dataSource = this.dataSource.map((elt) => ({
      ...elt,
      select: event.checked
    }));

    console.log(
      '*****************************elements which is cehcked',
      this.dataSource
    );
    this.cd.detectChanges();
  }

  open(name: string) {}

  openDialog(name) {
    if (name === 'add') {
      const dialogRef = this.dialog.open(DialogAddLeavesComponent, {
        width: '50%',
        height: '75%'
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog after closing of dialog result: ${result}`);
        this.notiSelect.success('successful addition ');
        this.query(this.paramSearch);
        this.LeaveServiceDB.loadLeaves()
          .pipe(take(1))
          .subscribe((res) => {
            this.dataSource = res as any[];
          });
      });
    } else {
      // console.log('entrer !!!!!!!!!!!', name);
      const dialogRef = this.dialog.open(DialogLeaveInfoComponent, {
        width: '50%',
        height: '60%',
        data: {
          id: name
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog after closing of dialog result: ${result}`);
      });
    }
  }

  public deleteAll() {
    this.dataSource.map((elt) => {
      if (elt.select) {
        this.LeaveServiceDB.deleteLeaves(elt.id)
          .pipe(take(1))
          .subscribe(
            (resp) => {
              this.notiSelect.success('Suppression succefully');
              this.query(this.paramSearch);
            },
            (err) => {}
          );
      }
    });
  }

  private notiSelectBeforeAction() {
    this.notiSelect.info(
      'select at least one Leaves before applying the action'
    );
  }

  get moreOneSelect() {
    return this.dataSource.every((elt) => !elt.select);
  }
}
