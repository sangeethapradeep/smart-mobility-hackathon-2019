import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { FirstMileResoltutionPage } from '../first-mile-resoltution/first-mile-resoltution';
import { ZoneData } from '../../models/common';

/**
 * Generated class for the VehicleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicle-list',
  templateUrl: 'vehicle-list.html',
})
export class VehicleListPage {
  items = [1,2,3];
  destZone: ZoneData;
  sourceZone: ZoneData;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController) {
     this.sourceZone = this.navParams.get('sourceZone');
     this.destZone = this.navParams.get('destZone');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleListPage');
  }

  bookSelectedVehicle(index: number){
     const loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this.showFirstMileBookingActionSheet(loader);
      // loader.dismiss().then(() => {
      //   this.navCtrl.push(FirstMileResoltutionPage);
      // });
      // loader.onDidDismiss((dismiss)=>{
      //   this.navCtrl.push(FirstMileResoltutionPage, {'sourceZone': this.sourceZone, 'destZone': this.destZone});
      // })
    }
  
  private showFirstMileBookingActionSheet(loader: any) {

      this.actionSheetCtrl.create({
        title: 'Choose your mode of transport to the Pick up zone',
        buttons: [
          {
            text: 'Walk (20 mins)',
            icon: 'walk',
            handler: () => {
              loader.dismiss();
              loader.onDidDismiss((dismiss)=>{
                this.navCtrl.push(FirstMileResoltutionPage, {'sourceZone': this.sourceZone, 'destZone': this.destZone, 'mode': 'shortest;pedestrian'});
              })
            }
          },          
          {
            text: 'Bus (10 mins, + Rs 20)',
            icon: 'bus',
            handler: () => {
              // this.travel_cost+=20;
              // this.showAgmDirectionRoute(this.my_latlng, pickup_point,"BUS");
              loader.dismiss();
              loader.onDidDismiss((dismiss)=>{
                this.navCtrl.push(FirstMileResoltutionPage, {'sourceZone': this.sourceZone, 'destZone': this.destZone, 'mode': 'fastest;publicTransport'});
              })
            }
          }
          
        ]
      }).present();
    }  

}
