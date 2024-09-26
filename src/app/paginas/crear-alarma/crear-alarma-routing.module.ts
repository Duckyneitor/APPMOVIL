import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAlarmaPage } from './crear-alarma.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAlarmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAlarmaPageRoutingModule {}
