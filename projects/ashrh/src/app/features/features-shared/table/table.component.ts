import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export interface Options {
  key?: string;
  type?: string;
  placeholder?: string;
  setValue?: Function;
}
export interface TemplateTable {
  header: string;
  distrib: Function;
  options?: Options;
}

@Component({
  selector: 'ash-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterInOut', [
      state('false', style({ opacity: 0, display: 'None' })),
      state('true', style({})),
      transition('true <=> false', [style({ display: '*' }), animate(500)])
    ])
  ]
})
export class TableComponent implements OnInit {
  @Input() dataSource = [];
  displayedColumns = [];
  displayedColumnsFilter = [];
  @Input() colDistribution: TemplateTable[] = [
    // { header: 'col1', distrib: (element) => element },
    // { header: 'col1', distrib: (element) => element },
    // { header: 'col1', distrib: (element) => element },
    // { header: 'col1', distrib: (element) => element },
    // { header: 'col1', distrib: (element) => element },
  ];
  //Filter
  @Input() filter = false;
  PREFIX_FILTER = 'filter_';
  @Input() filterToogle = false;
  @Output() filterChange = new EventEmitter<any>();

  constructor(protected cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.displayedColumns = Array.from(
      Array(this.colDistribution.length),
      (v, k) => k + ''
    );
    this.displayedColumnsFilter = this.displayedColumns.map(
      (elt) => this.PREFIX_FILTER + elt
    );
  }

  toogle() {
    this.filterToogle = !this.filterToogle;
    this.cd.detectChanges();
  }
}
