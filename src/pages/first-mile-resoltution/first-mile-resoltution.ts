import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { GlobalConstants } from '../../utils/global-constants';
import { ZoneData } from '../../models/common';
import { TripMapPage } from '../trip-map/trip-map';

/**
 * Generated class for the FirstMileResoltutionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-mile-resoltution',
  templateUrl: 'first-mile-resoltution.html',
})
export class FirstMileResoltutionPage {
  
  rideStartZone: ZoneData;
  rideEndZone: ZoneData;
  transitMode: string;
  lat: string = GlobalConstants.CURRENT_LOC_LAT;
  lng: string = GlobalConstants.CURRENT_LOC_LNG;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController) {
    this.rideStartZone = this.navParams.get('sourceZone');
    this.rideEndZone = this.navParams.get('destZone');
    this.transitMode = this.navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstMileResoltutionPage');
    var _this = this;
    window["arrivedPickUpLocation"] = function(userId:number){
      _this.onArrivedPickUpLocation(userId);
    };
  }

  onArrivedPickUpLocation(userId){    
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Start Trip',
          icon: 'checkmark',
          handler: () => {  
            GlobalConstants.updateLatLng(this.rideStartZone.location.lat, this.rideStartZone.location.lng);
            this.navCtrl.push(TripMapPage, {'sourceZone': this.rideStartZone, 'destZone': this.rideEndZone, 'mode': 'fastest;car'})
            .then(()=> {
              this.navCtrl.remove(this.navCtrl.length()-2);
            });
            
          }
        }
      ]
    }).present();


    this.listenToSharedBookingRequest();
  }

  private listenToSharedBookingRequest() {

  }

}
