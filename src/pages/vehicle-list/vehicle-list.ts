import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleListPage');
  }

  bookVehicle(index: number){
     const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 3000
      });
      loader.present();

    }
  

}
