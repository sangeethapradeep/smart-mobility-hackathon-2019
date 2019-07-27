import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleListPage } from './vehicle-list';

@NgModule({
  declarations: [
    VehicleListPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleListPage),
  ],
})
export class VehicleListPageModule {}
