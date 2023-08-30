import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../../modeles/app-routes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../core/core.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ashrh-allmodules',
  templateUrl: './allmodules.component.html',
  styleUrls: ['./allmodules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllmodulesComponent implements OnInit {
  selectedFile: File | null = null;

  modules = [
    {
      name: 'Employés',
      image: '/assets/modules/employee.png',
      route: AppRoutes.employees,
      textBgColor: '#7F6CA1',
      description: 'Module de gestion des employés'
    },
    {
      name: 'Paiement',
      image: '/assets/modules/payment.png',
      route: AppRoutes.payment,
      textBgColor: '#3FABA5',
      description: 'Toute les payments '
    },
    {
      name: 'Configuration',
      image: '/assets/modules/config.png',
      route: AppRoutes.settings_employ,
      textBgColor: '#4E86BD',
      description: 'Toute les configuration'
    },
    // {
    //   name: 'Evolution générale',
    //   image: '/assets/modules/evolution.png',
    //   route: '',
    //   textBgColor: '#469A1F',
    //   description: ''
    // },
    {
      name: 'Controle de presence',
      image: '/assets/modules/check_presence.png',
      route: AppRoutes.check_presence,
      textBgColor: '#0F254B',
      description: "Marquer la presence d'un employé"
    },
    // {
    //   name: 'Fin de periode',
    //   image: '/assets/modules/end_off_period.png',
    //   route: AppRoutes.end_shift,
    //   textBgColor: '#E14E4F',
    //   description:
    //     "Module permettant de faire des comptes a la fin d'une periode de travail"
    // },
    {
      name: 'Permission',
      image: '/assets/modules/permissions.png',
      route: AppRoutes.leaves,
      textBgColor: '#0F254B',
      description: 'Module permettant aux employes de faire des demandes'
    }
    // {
    //   name: 'TOUTE Permission',
    //   image: '',
    //   route: AppRoutes.leaves_dashboard,
    //   textBgColor: '#0F254B',
    //   description:
    //     'Module permettant au rh de visualiser les demandes faites par les differents employes'
    // }
  ];
  constructor(
    private http: HttpClient,
    private notiservice: NotificationService,
    private trans: TranslateService
  ) {}

  ngOnInit(): void {}

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onFileSubmit(): void {
    if (this.selectedFile) {
      // Create the JSON data to send in the request
      const jsonData = {
        file: this.selectedFile,
        directory_path: 'storage', // Add other properties as needed
        sheets: ['Changed Sheet'],
        exercise: '2023'
      };

      // Set the headers for the JSON content
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      // Send the JSON data as a POST request
      this.http
        .post(
          environment.server + '/api/grh/import_employee_data/',
          jsonData,
          httpOptions
        )
        .subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
            // Optionally, display a success message to the user
          },
          (error) => {
            console.error('Error while uploading file:', error);
            // Display an error message to the user
          }
        );
    }
  }
}
