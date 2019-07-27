import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { HereMapProvider } from '../../providers/here-map/here-map';
import { ZoneData } from '../../models/common';


/**
 * Generated class for the HereMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'here-map',
  templateUrl: 'here-map.html'
})
export class HereMapComponent implements OnInit {

  text: string;
  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  interactiveMap: boolean;

  @Input()
  currentLocMarkerRequired: boolean;

  @Input()
  mapControlsRequired: boolean;

  @Input()
  markers: ZoneData[];

  @Input()
  destination: ZoneData;

  @Input()
  transitMode: string;

  renderedMap: any;

  constructor(public hereMapProvider: HereMapProvider) {
  }

  public ngOnInit() { }

  public ngAfterViewInit() {

    this.hereMapProvider.init();
    this.renderedMap = this.hereMapProvider.renderMap(this.mapElement, this.lat, this.lng);

    if (this.interactiveMap) {
      this.hereMapProvider.setInteractive(this.renderedMap.map);
    }

    if (this.currentLocMarkerRequired) {
      this.hereMapProvider.addMarkerOnCurrentLocation(this.renderedMap.map, this.lat, this.lng);
    }

    if (this.mapControlsRequired) {
      this.hereMapProvider.setMapControls(this.renderedMap.map, this.renderedMap.defaultLayers);
    }

    if (!!this.markers && this.markers.length > 0) {
        this.hereMapProvider.plotMarkersOnMap(this.markers);        
    }

    if(!!this.destination){
      let source = {
        lat: this.lat,
        lng: this.lng
      }
      this.hereMapProvider.plotRouteFromAtoB(source, this.destination,this.transitMode);
    }
  }

}
