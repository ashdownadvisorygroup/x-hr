import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ashrh-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleInputComponent implements OnInit {
  @Input() optionSelect = {};
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = null;
  @Input() actionText = 'Delete';
  @Input() formControl = new FormControl(null);
  @Output() valueChange = new EventEmitter();
  @Output() enterPress = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.formControl.setValue(this.value);
    this.formControl.valueChanges
      .pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe((val) => {
        this.valueChange.emit(val);
      });
  }
}
