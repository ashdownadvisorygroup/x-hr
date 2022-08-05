import { Directive, HostListener, Input } from '@angular/core';
import { TableComponent } from './table.component';

@Directive({
  selector: '[ashTableFilterToogle]'
})
export class TableFilterToogleDirective {

  @Input() ashTableFilterToogle: TableComponent

  @HostListener('click') onClick() {
    this.ashTableFilterToogle.toogle()
  }
  constructor(

  ) { }

}
