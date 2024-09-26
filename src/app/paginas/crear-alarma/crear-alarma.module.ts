import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAlarmaPageRoutingModule } from './crear-alarma-routing.module';

import { CrearAlarmaPage } from './crear-alarma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAlarmaPageRoutingModule
  ],
  declarations: [CrearAlarmaPage]
})
export class CrearAlarmaPageModule {}
