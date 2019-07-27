import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ComponentsModule } from "../components/components.module";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HereMapProvider } from '../providers/here-map/here-map';
import { BookingMapPage } from '../pages/booking-map/booking-map';
import { DestinationSelectModalPage } from '../pages/destination-select-modal/destination-select-modal';
import { NearestZonesMapPage } from '../pages/nearest-zones-map/nearest-zones-map';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { BookingServiceProvider } from '../providers/booking-service/booking-service';
import { HttpClientModule } from '@angular/common/http';
import { VehicleListPage } from '../pages/vehicle-list/vehicle-list';
import { FirstMileResoltutionPage } from '../pages/first-mile-resoltution/first-mile-resoltution';
import { TripMapPage } from '../pages/trip-map/trip-map';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookingMapPage,
    DestinationSelectModalPage,
    NearestZonesMapPage,
    VehicleListPage,
    FirstMileResoltutionPage,
    TripMapPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookingMapPage,
    DestinationSelectModalPage,
    NearestZonesMapPage,
    VehicleListPage,
    FirstMileResoltutionPage,
    TripMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HereMapProvider,
    RestApiProvider,
    BookingServiceProvider
  ]
})
export class AppModule {}
