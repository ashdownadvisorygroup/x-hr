import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'ashrh-custom-form-field-control',
  templateUrl: './custom-form-field-control.component.html',
  styleUrls: ['./custom-form-field-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldControlComponent
    }
  ]
})
export class CustomFormFieldControlComponent implements OnInit, OnDestroy, MatFormFieldControl<any> {
  static nextId = 0;
  constructor() { }

  value: any;
  stateChanges = new Subject<void>();
  id: string = `${CustomFormFieldControlComponent.nextId++}`;
  placeholder: string;
  ngControl: NgControl;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string;
  autofilled?: boolean;
  setDescribedByIds(ids: string[]): void {
  }
  onContainerClick(event: MouseEvent): void {
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
