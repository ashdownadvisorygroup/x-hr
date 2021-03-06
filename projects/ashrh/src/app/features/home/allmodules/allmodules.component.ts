import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../../modeles/app-routes';

@Component({
  selector: 'ashrh-allmodules',
  templateUrl: './allmodules.component.html',
  styleUrls: ['./allmodules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllmodulesComponent implements OnInit {



  modules = [
    {
      name: 'Employées',
      image: '/assets/modules/employee.png',
      route: AppRoutes.employees,
      textBgColor: '#7F6CA1',
      description: 'Module de gestion des employés'
    },
    {
      name: 'Payement',
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
    {
      name: 'Evolution générale',
      image: '/assets/modules/evolution.png',
      route: '',
      textBgColor: '#469A1F',
      description: ''
    },
    {
      name: 'Controle de presence',
      image: '/assets/modules/check_presence.png',
      route: AppRoutes.check_presence,
      textBgColor: '#0F254B',
      description: 'Marquer la presence d\'un employé'
    },
    {
      name: 'Fin de periode',
      image: '/assets/modules/end_off_period.png',
      route: AppRoutes.end_shift,
      textBgColor: '#E14E4F',
      description: 'Module permettant de faire des comptes a la fin d\'une periode de travail'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
