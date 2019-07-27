import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZoneData } from '../../models/common';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

/*
  Generated class for the BookingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingServiceProvider {
nearestZones: ZoneData[] =  [
  {
    id:1,
    name:'Dadar',
    location:{
      lat: 19.025039,
      lng: 72.838036
    }
  },
  {
    id:2,
    name:'Mahim',
    location:{
      lat: 19.039935,
      lng: 72.846718
    }
  },
  {
    id: 3 ,
    name:'Ghatkopar',
    location:{
      lat: 19.085398,
      lng: 72.909597
    }
  }
];
  constructor(public http: HttpClient) {
  }

  public getNearestZones(): Observable<ZoneData[]> {
  return of(this.nearestZones);
}

  public getZones(): Observable<ZoneData[]>{
    return of(this.nearestZones);
  }

}
