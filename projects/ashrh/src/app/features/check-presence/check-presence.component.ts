import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ashrh-check-presence',
  templateUrl: './check-presence.component.html',
  styleUrls: ['./check-presence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckPresenceComponent implements OnInit {

  sections: any[] = [
    {
      name: 'Arrival',
      image: '/assets/modules/employé.png',
      route: 'check-arrive',
      textBgColor: '#FFA500'
    },
    {
      name: 'Departure',
      image: '/assets/modules/employé.png',
      route: 'check-depart',
      textBgColor: '#2a2829'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }


}
