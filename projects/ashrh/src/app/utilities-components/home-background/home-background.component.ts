import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { routeAnimations } from '../../core/core.module';

@Component({
  selector: 'ash-home-background',
  template: `
   <div class="content h-100 w-100" [@routeAnimations]="o.isActivated && o.activatedRoute.routeConfig.data && o.activatedRoute.routeConfig.data.title">
      <router-outlet #o="outlet">
      </router-outlet>
    </div>

  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
        background: transparent linear-gradient(120deg, #4e86bd 0%, #3faba5 100%) 0%
    0% no-repeat padding-box;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimations]
})
export class HomeBackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
