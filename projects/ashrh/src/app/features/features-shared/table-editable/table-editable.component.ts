import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'ash-table-editable',
  templateUrl: './table-editable.component.html',
  styleUrls: ['./table-editable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableEditableComponent extends TableComponent implements OnInit {
  @Input() actionText = 'Delete';
  //

  private _element = null;
  private _col = -1;
  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  canEdit(element: any, col: number) {
    return this._element === element && this._col === col;
  }
  edit(element: any, col: number) {
    this._element = element;
    this._col = col;
    this.cd.detectChanges();
  }
  endEdit() {
    this._element = null;
    this._col = -1;
    this.cd.detectChanges();
  }

  contriSetValue(contri, $event, element) {
    if (contri.options?.setValue)
      contri.options?.setValue($event, element);
  }
}
