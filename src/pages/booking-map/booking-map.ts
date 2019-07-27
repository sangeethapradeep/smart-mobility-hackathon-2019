import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { DestinationSelectModalPage } from '../destination-select-modal/destination-select-modal';
import { ZoneData } from '../../models/common';
import { NearestZonesMapPage } from '../nearest-zones-map/nearest-zones-map';
import { GlobalConstants } from '../../utils/global-constants';
import { BookingServiceProvider } from '../../providers/booking-service/booking-service';
import { VehicleListPage } from '../vehicle-list/vehicle-list';

/**
 * Generated class for the BookingMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-map',
  templateUrl: 'booking-map.html',
})
export class BookingMapPage {

  dest_zone: ZoneData = { id: 0,name:'', location:{lat:0.0,lng:0.0} };
  lat: string = GlobalConstants.CURRENT_LOC_LAT;
  lng: string = GlobalConstants.CURRENT_LOC_LNG;
  loader: any;
  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private modalCtrl: ModalController,
              private bookingServiceProvider: BookingServiceProvider,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingMapPage');
  }

  showDestinationZoneModal () {

    let modal = this.modalCtrl.create(DestinationSelectModalPage);
    modal.onDidDismiss( (selected_dest:ZoneData) =>{
      
      if(!selected_dest) return;
      this.dest_zone = selected_dest;

      this.bookingServiceProvider.getZones()
      .subscribe(zones => {
        this.navCtrl.push(NearestZonesMapPage, {zonesToPlot: zones, destZones: this.dest_zone});
        // this.navCtrl.push(VehicleListPage, {'dest_zone': this.dest_zone});
      })

     

      //When the user selects the destination, show the nearby zones
      // this.getNearBySourceZones(this.my_latlng);

    });
    modal.present();
  }

  private startLoader(){
    this.loader = this.loadingCtrl.create({
      content: "Fetching the nearest zone.."
    })
    this.loader.present();
  }

  private killLoader(){
    this.loader.dismiss();
  }

 

}
