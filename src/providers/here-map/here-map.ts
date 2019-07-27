import { Injectable, ElementRef } from "@angular/core";
import { GlobalConstants } from "../../utils/global-constants";
import { ZoneData } from "../../models/common";
declare var H: any;
/*
  Generated class for the HereMapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HereMapProvider {
  platform: any;
  map: any;
  ui: any;
  behavior: any;
  constructor() {}

  public init() {
    this.platform = new H.service.Platform({
      apikey: GlobalConstants.API_KEY
    });
  }

  public renderMap(mapElement: ElementRef, lat, lng) {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 15,
        center: { lat: lat, lng: lng },
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener("resize", () => this.map.getViewPort().resize());

    this.behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );
    // Create the UI with default map controls:
    // this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    return {
      map: this.map,
      defaultLayers: defaultLayers
    };
  }

  public setMapControls(map, defaultLayers) {
    // Create the UI with default map controls:
    this.ui = H.ui.UI.createDefault(map, defaultLayers);
  }

  public setInteractive(map: any) {
    // get the vector provider from the base layer
    let provider = map.getBaseLayer().getProvider();

    // get the style object for the base layer
    let style = provider.getStyle();

    let mapInteractionListener = event => {
      if (style.getState() === H.map.Style.State.READY) {
        style.removeEventListener("change", mapInteractionListener);

        // enable interactions for the desired map features
        style.setInteractive(["places", "places.populated-places"], true);

        // add an event listener that is responsible for catching the
        // 'tap' event on the feature and showing the infobubble
        provider.addEventListener("tap", (e: Event) => this.onTap(e, this));
      }
    };
    style.addEventListener("change", mapInteractionListener);
  }

  private onTap(event, provider) {
    var bubble;
    // calculate infobubble position from the cursor screen coordinates
    let position = provider.map.screenToGeo(
      event.currentPointer.viewportX,
      event.currentPointer.viewportY
    );
    // read the properties associated with the map feature that triggered the event
    let props = event.target.getData().properties;

    // create a content for the infobubble
    let content = `It is a ${props.kind} ${props.kind_detail || ""}
      ${props.population ? "Population: " + props.population : ""}         
       Local Name: ${props.name} ${
      props["name:en"] ? "Name in English: " + props["name:en"] : ""
    }`;

    // Create a bubble, if not created yet
    if (!bubble) {
      bubble = new H.ui.InfoBubble(position, {
        content: content
      });
      provider.ui.addBubble(bubble);
    } else {
      // Reuse existing bubble object
      bubble.setPosition(position);
      bubble.setContent(content);
      bubble.open();
    }
  }

  public addMarkerOnCurrentLocation(map: any, latitude, longitude) {
    map.addObject(
      new H.map.Circle(
        // The central point of the circle
        { lat: latitude, lng: longitude },
        // The radius of the circle in meters
        25,
        {
          style: {
            strokeColor: "rgba(255, 255, 255, 1.0)", // Color of the perimeter
            lineWidth: 2,
            fillColor: "rgba(0, 0, 255, 0.7)" // Color of the circle
          }
        }
      )
    );
  }

  public plotMarkersOnMap(markerDataList: ZoneData[]) {
    markerDataList.forEach(markerData => {
      let marker = new H.map.Marker({
        lat: markerData.location.lat,
        lng: markerData.location.lng
      });
      marker.setData(markerData);
      this.map.addObject(marker);
    });

    // var domElement = document.createElement('div');
    // domElement.style.width = '20px';
    // domElement.style.height = '20px';
    // domElement.style.backgroundColor = 'blue';

    // function changeOpacity(evt) {
    //   evt.target.style.opacity = 0.8;
    // };

    // var domIcon = new H.map.DomIcon(domElement, {
    //   onAttach: function (clonedElement, domIcon, domMarker) {
    //     clonedElement.addEventListener('mouseover', changeOpacity);
    //   },
    //   onDetach: function (clonedElement, domIcon, domMarker) {
    //     clonedElement.removeEventListener('mouseover', changeOpacity);
    //   }
    // });

    // markerDataList.forEach(markerData => {
    //   let domMarker = new H.map.DomMarker(
    //     { lat: markerData.location.lat, lng: markerData.location.lng },
    //     { icon: domIcon },
    //     { data: markerData }
    //   );
    //   this.map.addObject(domMarker);
    // });
  }
}
