import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ash-list-presence',
  templateUrl: './list-presence.component.html',
  styleUrls: ['./list-presence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPresenceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale = 'en';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();
}
