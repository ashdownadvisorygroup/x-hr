import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PresenceDbService } from '../../../core/services/presence-db.service';

@Component({
  selector: 'ashrh-check-depart',
  templateUrl: './check-depart.component.html',
  styleUrls: ['./check-depart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckDepartComponent implements OnInit {
  PresenceDbService = PresenceDbService
  constructor() { }

  ngOnInit(): void {
  }

}
