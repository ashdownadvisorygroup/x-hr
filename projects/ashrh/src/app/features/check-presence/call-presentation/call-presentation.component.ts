import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ashrh-call-presentation',
  templateUrl: './call-presentation.component.html',
  styleUrls: ['./call-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallPresentationComponent implements OnInit {
  @Input() call: any
  environment = environment.server
  constructor() { }

  ngOnInit(): void {
  }

}
