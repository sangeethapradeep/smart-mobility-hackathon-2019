import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DestinationSelectModalPage } from './destination-select-modal';

@NgModule({
  declarations: [
    DestinationSelectModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DestinationSelectModalPage),
  ],
})
export class DestinationSelectModalPageModule {}
