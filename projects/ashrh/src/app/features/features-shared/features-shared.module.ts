import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../../shared/shared.module';
import { SimpleInputComponent } from './simple-input/simple-input.component';
import { SimpleDatePickerComponent } from './simple-date-picker/simple-date-picker.component';
import { CustomFormFieldComponent } from './custom-form-field/custom-form-field.component';
import { CustomFormFieldControlComponent } from './custom-form-field-control/custom-form-field-control.component';
import { SearchFormFieldContainerComponent } from './search-form-field-container/search-form-field-container.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { TableComponent } from './table/table.component';
import { TableFilterToogleDirective } from './table/table-filter-toogle.directive';
import { TableEditableComponent } from './table-editable/table-editable.component';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';



@NgModule({
  declarations: [
    SearchComponent,
    SimpleInputComponent,
    SimpleDatePickerComponent,
    CustomFormFieldComponent,
    CustomFormFieldControlComponent,
    SearchFormFieldContainerComponent,
    TableComponent,
    TableFilterToogleDirective,
    TableEditableComponent,
    QrCodeScannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ZXingScannerModule
  ],
  exports: [
    SearchComponent,
    SimpleInputComponent,
    SimpleDatePickerComponent,
    SearchFormFieldContainerComponent,
    TableComponent,
    TableFilterToogleDirective,
    TableEditableComponent,
    QrCodeScannerComponent,
  ]
})
export class FeaturesSharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faCaretDown
    );
  }
}
