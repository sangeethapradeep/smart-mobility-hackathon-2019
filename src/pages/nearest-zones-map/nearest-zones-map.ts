import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingServiceProvider } from '../../providers/booking-service/booking-service';
import { ZoneData } from '../../models/common';
import { GlobalConstants } from '../../utils/global-constants';

/**
 * Generated class for the NearestZonesMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nearest-zones-map',
  templateUrl: 'nearest-zones-map.html',
})
export class NearestZonesMapPage{
  zonesToPlot: ZoneData[];
  lat: string = GlobalConstants.CURRENT_LOC_LAT;
  lng: string = GlobalConstants.CURRENT_LOC_LNG;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public bookingServiceProvider: BookingServiceProvider) {
        this.zonesToPlot = this.navParams.get('zonesToPlot') || [];    
  }

  ionViewDidLoad() {
    
  }

  
}
