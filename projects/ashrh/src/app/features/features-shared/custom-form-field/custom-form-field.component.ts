import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ashrh-custom-form-field',
  templateUrl: './custom-form-field.component.html',
  styleUrls: ['./custom-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormFieldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
