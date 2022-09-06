import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EndShiftService } from '../../core/services/end-shift.service';
import { take } from 'rxjs/operators';
import { DbListService } from '../../core/services/db-list.service';
import { pipe } from 'rxjs';

export interface EndShiftData {
  employee: string;
  number_delivers?: number;
  good_delivers?: number;
  bad_delivers?: number;
}

@Component({
  selector: 'ashrh-end-shift',
  templateUrl: './end-shift.component.html',
  styleUrls: ['./end-shift.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterExpand', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: '*' })),
      transition('false <=> true', animate(1000))
    ])
  ]
})
export class EndShiftComponent implements OnInit {
  //to set date
  todayDate = Date.now();
  // paginator
  pageSizeOption: number[] = [5, 10, 25, 50, 100];
  lengh = 0;
  pageSize = this.pageSizeOption[0];
  private paramSearch: any = {
    page_size: this.pageSize,
    page: 1
  };
  //temporal controller data
  ateliers: any[] = [];
  dataSource2: any[] = [];
  dataSource: any[] = [
    //{ first_name: 'Bisi', daily_outputs: { number_delivers: 0 } },
    //just giving it some temporal data
    // {employee: 'Bisi', number_delivers: 0, good_delivers: 0, bad_delivers: 0},
    // {employee: 'Jodel', number_delivers: 0, good_delivers: 0, bad_delivers: 0},
    // {employee: 'Pimi', number_delivers: 0, good_delivers: 0, bad_delivers: 0},
    // {employee: 'Madina', number_delivers: 0, good_delivers: 0, bad_delivers: 0},
  ];
  colDistribution = [
    {
      header: 'Employee',
      distrib: (el) =>
        el.employee.first_name + ' ' + el.employee.last_name.toUpperCase()
    },
    {
      header: 'Number of masks',
      distrib: (el) => el.number_delivers,
      options: {
        key: 'number_delivers',
        type: 'number',
        setValue: (event, element) => {
          element.number_delivers = event;
        }
      }
    },
    {
      header: 'Good masks',
      distrib: (el) => el.good_delivers,
      options: {
        key: 'good_delivers',
        type: 'number',
        setValue: (event, element) => {
          element.good_delivers = event;
          element.bad_delivers =
            element.number_delivers - element.good_delivers;
        }
      }
    },
    {
      header: 'Bad masks',
      distrib: (el) => el.bad_delivers,
      options: {
        key: 'bad_delivers',
        type: 'number',
        setValue: (event, element) => {
          element.bad_delivers = event;
          element.good_delivers =
            element.number_delivers - element.bad_delivers;
        }
      }
    }

    // { header: 'Date', distrib: (el) => el.date, options: { key: 'date', type: 'date', placeholder: 'jj/mm/aaaa' } },
    //{ header: 'Products', distrib: (el) => el.daily_outputs[0]?.number_delivers, options: { key: 'products', type: 'number' } },
  ];
  colDistributionOutputs = [
    {
      header: 'Ateliers',
      distrib: (el) => el.daily_outputs[0]?.number_delivers,
      options: { key: 'number_delivers', type: 'number' }
    },
    {
      header: 'Total Output',
      distrib: (el) => el.daily_outputs[0]?.good_delivers,
      options: { key: 'good_delivers', type: 'number' }
    }

    // { header: 'Date', distrib: (el) => el.date, options: { key: 'date', type: 'date', placeholder: 'jj/mm/aaaa' } },
    //{ header: 'Products', distrib: (el) => el.daily_outputs[0]?.number_delivers, options: { key: 'products', type: 'number' } },
  ];

  constructor(
    private endShiftService: EndShiftService,
    private dbListService: DbListService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.query();
    // this.endShiftService.getDailyOutputSpecific('KLm50ojO3fVo185VS1HQ7grbncyTJ28o');

    this.dbListService
      .getWorkingGroups()
      .pipe(take(1))
      .subscribe((group: any[]) => {
        this.ateliers = group;
        // console.log(group);
        this.cd.detectChanges();
      });
    //  this.getEmployees(this!.ateliers);
    // console.log('that is resultat!!!!!!!!!!!!!!!!!!!!!!!!!!!.................',this.dataSource);
  }
  //used to sort employee by working group
  public getEmployees(atelier: string) {
    this.endShiftService
      .getEndShift()
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log('that is resultat1', res);
        this.dataSource = res.results.filter(
          (employee) => employee.working_group?.name == atelier
        );
        this.lengh = this.dataSource.length;
        this.cd.detectChanges();
      });
  }

  public setPage($event: PageEvent) {
    this.paramSearch.page_size = $event.pageSize;
    this.paramSearch.page = $event.pageIndex + 1;
    this.query();
  }
  searchChange(event: any): void {}
  private query() {
    this.endShiftService
      //.getEndShift(this.paramSearch)
      .getEndShift()
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          //console.log('tried to get a value');
          // console.log('tried to get a value',res);
          console.log('that is resultat2', res);
          this.dataSource = res;
          this.lengh = res.total;
          this.cd.detectChanges();
          console.log('that is resultat3', this.dataSource);
        },
        (err) => {
          console.warn(err);
        }
      );
  }
  //CRUD for end_shift
}
