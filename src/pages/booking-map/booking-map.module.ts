import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingMapPage } from './booking-map';

@NgModule({
  declarations: [
    BookingMapPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingMapPage),
  ],
})
export class BookingMapPageModule {}
