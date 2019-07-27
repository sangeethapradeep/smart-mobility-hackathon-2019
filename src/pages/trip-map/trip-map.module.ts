import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripMapPage } from './trip-map';

@NgModule({
  declarations: [
    TripMapPage,
  ],
  imports: [
    IonicPageModule.forChild(TripMapPage),
  ],
})
export class TripMapPageModule {}
