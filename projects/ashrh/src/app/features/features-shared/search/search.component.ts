import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ashrh-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit , OnDestroy{
  formControl = new FormControl('')
  subsc = new Subscription()
  @Input() placeholder = 'First name...'
  @Output() searchValueChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(val => {
      this.searchValueChange.emit(val)
    })
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe()
  }

}
