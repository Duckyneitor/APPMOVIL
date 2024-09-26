import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionCuentaPageRoutingModule } from './informacion-cuenta-routing.module';

import { InformacionCuentaPage } from './informacion-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionCuentaPageRoutingModule
  ],
  declarations: [InformacionCuentaPage]
})
export class InformacionCuentaPageModule {}
