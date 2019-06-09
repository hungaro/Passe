import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InsidePage } from './inside.page';
import { HereMapComponent } from 'src/app/here-map/here-map.component';
import { PagarComponent } from '../pagar/pagar.component';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

const routes: Routes = [
  {
    path: '',
    component: InsidePage
  },
  {
    path: 'pagar',
    component: PagarComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsidePage, HereMapComponent, PagarComponent],
  entryComponents: [HereMapComponent, PagarComponent],
  providers: [QRScanner]

})
export class InsidePageModule {}
