import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ash-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrCodeScannerComponent implements OnInit {
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE
  ];

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: number;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  @Output() camerasFound = new EventEmitter<boolean>()
  @Output() result = new EventEmitter<string>();

  //scan border
  scanBorder_width = 150;
  scanBorder_height = 25;
  scanBorder_fill = 'fill:rgb(66 165 245)';
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }


  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    this.camerasFound.emit(true)
  }
  onCodeResult(resultString: string) {
    console.warn(resultString);
    this.result.emit(resultString)
  }
  onHasPermission(has: boolean) {
    this.hasPermission = has;
    console.warn("permission ", this.hasPermission);
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}
