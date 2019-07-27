import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ZoneData } from '../../models/common';
import { BookingServiceProvider } from '../../providers/booking-service/booking-service';

/**
 * Generated class for the DestinationSelectModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-destination-select-modal',
  templateUrl: 'destination-select-modal.html',
})
export class DestinationSelectModalPage {

  available_zones: ZoneData[];

  constructor (public viewCtrl: ViewController,
              public bookingServiceProvider: BookingServiceProvider) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DestinationSelectModalPage');
  }

  chooseZone(zone: ZoneData) {
    this.viewCtrl.dismiss(zone);
  }

  getZones(event: any) {
    this.initializeItems();

    const search_term = event.target.value;

    if (search_term && search_term.trim() != '') {
      this.available_zones = this.available_zones.filter((zone) => {
        return (zone.name.toLowerCase().indexOf(search_term.toLowerCase()) > -1);
      })
    }
  }

  initializeItems() {
   this.bookingServiceProvider.getZones()
   .subscribe(zones => {
     this.available_zones = zones;
   });
   
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  

}
