import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SimpleInputComponent } from '../simple-input/simple-input.component';

@Component({
  selector: 'ashrh-simple-date-picker',
  templateUrl: './simple-date-picker.component.html',
  styleUrls: ['./simple-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleDatePickerComponent extends SimpleInputComponent implements OnInit {

  constructor(
  ) { super() }

  ngOnInit(): void {
    super.ngOnInit()
  }

}
