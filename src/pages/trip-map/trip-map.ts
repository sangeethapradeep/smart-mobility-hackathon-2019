import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ZoneData } from '../../models/common';
import { GlobalConstants } from '../../utils/global-constants';
import { HereMapProvider } from '../../providers/here-map/here-map';

/**
 * Generated class for the TripMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-map',
  templateUrl: 'trip-map.html',
})
export class TripMapPage {

  rideStartZone: ZoneData;
  rideEndZone: ZoneData;
  transitMode: string;
  lat: string = GlobalConstants.CURRENT_LOC_LAT;
  lng: string = GlobalConstants.CURRENT_LOC_LNG;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public hereMapProvider: HereMapProvider) {

    this.rideStartZone = this.navParams.get('sourceZone');
    this.rideEndZone = this.navParams.get('destZone');
    this.transitMode = this.navParams.get('mode');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripMapPage');
    var _this = this;
    window["arrivedDestinationLocation"] = function(userId:number){
      _this.onArrivedDestinationLocation(userId);
    };
  }

  onArrivedDestinationLocation(userId){    
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'End Trip',
          icon: 'checkmark',
          handler: () => {  
            GlobalConstants.updateLatLng(this.rideEndZone.location.lat, this.rideEndZone.location.lng);  
            this.hereMapProvider.init();       
            this.hereMapProvider.addMarkerOnCurrentLocation(this.hereMapProvider.map, this.rideEndZone.location.lat, this.rideEndZone.location.lng)
          }
        }
      ]
    }).present();


  }
  

}
