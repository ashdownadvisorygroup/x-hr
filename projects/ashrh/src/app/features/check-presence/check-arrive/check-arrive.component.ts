import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PresenceDbService } from '../../../core/services/presence-db.service';

@Component({
  selector: 'ashrh-check-arrive',
  templateUrl: './check-arrive.component.html',
  styleUrls: ['./check-arrive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckArriveComponent implements OnInit {
  @Input() type = PresenceDbService.TYPE_ARRIVE;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  onResult = false;

  employer: any;

  constructor(
    private presenceDbService: PresenceDbService,
    private notiService: NotificationService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  // setSpinner: boolean = true;
  reset: boolean = true;

  onCamerasFound(event): void {
    // this.setSpinner = false;
    console.warn(event);
    this.cd.detectChanges();
  }

  private decode(ash: number) {
    return (ash - 2) / 4;
  }

  onCodeResult(resultString: string) {
    let qrResultString = parseInt(resultString);
    // if (qrResultString) {
    if (!isNaN(qrResultString)) {
      qrResultString = this.decode(qrResultString);
      this.onResult = true;
      this.reset = true;
      this.cd.detectChanges();
      this.presenceDbService
        .arrive(qrResultString + '', this.type)
        .pipe(take(1))
        .subscribe(
          (emp) => {
            this.employer = emp;
            console.log(emp);
            console.log(this.employer.id);
            this.cd.detectChanges();
          },
          (error) => {
            this.notiService.error('This check has not been considered');
          }
        );
    } else {
      this.notiService.error('Value not known');
    }
  }

  // onDeviceSelectChange(selected: string) {
  //   const device = this.availableDevices.find((x) => x.deviceId === selected);
  //   this.currentDevice = device || null;
  // }
}
