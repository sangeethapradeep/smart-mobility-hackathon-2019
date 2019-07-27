import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearestZonesMapPage } from './nearest-zones-map';

@NgModule({
  declarations: [
    NearestZonesMapPage,
  ],
  imports: [
    IonicPageModule.forChild(NearestZonesMapPage),
  ],
})
export class NearestZonesMapPageModule {}
