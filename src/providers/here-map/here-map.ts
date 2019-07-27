import { Injectable, ElementRef } from "@angular/core";
import { GlobalConstants } from "../../utils/global-constants";
import { ZoneData, LatLngData } from "../../models/common";
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
  bubble: any;
  markers: any[] = [];
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
        zoom: 13,
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
        100,
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

  public plotRouteFromAtoB(source: LatLngData, destination: ZoneData, mode: string){
      var router = this.platform.getRoutingService(),
      routeRequestParams = {
        // mode: mode,
        mode: 'fastest;publicTransport',
        representation: 'display',
        routeattributes : 'waypoints,summary,shape,legs',
        maneuverattributes: 'direction,action',
        // waypoint0: '52.5160,13.3779', // Brandenburg Gate
        // waypoint1: '52.5206,13.3862',
        waypoint0: `${source.lat},${source.lng}`, // Brandenburg Gate
        waypoint1: `${destination.location.lat},${destination.location.lng}`  // Friedrichstraße Railway Station
      };
      router.calculateRoute(
        routeRequestParams,
        function(response){
          this.OnRouteSuccess(response);
        }.bind(this),        
        this.onError
      );
  }

  private onError(error) {
    alert('Can\'t reach the remote server');
  }

  public OnRouteSuccess(result){
    var route = result.response.route[0];
    this.addRouteShapeToMap(route);
    // this.addManueversToMap(route);

      // this.addWaypointsToPanel(route.waypoint);
      // this.addManueversToPanel(route);
      // this.addSummaryToPanel(route.summary);
  }

  public addRouteShapeToMap(route){
    var lineString = new H.geo.LineString(),
      routeShape = route.shape,
      polyline;
  
    routeShape.forEach(function(point) {
      var parts = point.split(',');
      lineString.pushLatLngAlt(parts[0], parts[1]);
    });
  
    polyline = new H.map.Polyline(lineString, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 128, 255, 0.7)'
      }
    });
    // Add the polyline to the map
    this.map.addObject(polyline);
    // And zoom to its bounding rectangle
    this.map.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox()
    });
    let plotZone: ZoneData[] = [{
      id: 0,
      name: "",
      location: {
        lat: route.waypoint[1].originalPosition.latitude,
        lng: route.waypoint[1].originalPosition.longitude
      }
    }];
    this.plotMarkersOnMap(plotZone);
    this.addMarkerOnCurrentLocation(this.map, route.waypoint[0].originalPosition.latitude, route.waypoint[0].originalPosition.longitude )
  } 
  

  // private addManueversToMap(route){
  //   var svgMarkup = '';
  //   var  dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}});
  //   var  group = new  H.map.Group();
  //   var  i;
  //   var  j;
  
  //   // Add a marker for each maneuver
  //   for (i = 0;  i < route.leg.length; i += 1) {
  //     for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
  //       // Get the next maneuver.
  //       let maneuver = route.leg[i].maneuver[j];
  //       // Add a marker to the maneuvers group
  //       var marker =  new H.map.Marker({
  //         lat: maneuver.position.latitude,
  //         lng: maneuver.position.longitude} ,
  //         {icon: dotIcon});
  //       marker.instruction = maneuver.instruction;
  //       group.addObject(marker);
  //     }
  //   }
  
  //   group.addEventListener('tap', function (evt) {
  //     this.map.setCenter(evt.target.getPosition());
  //     this.openBubble(
  //        evt.target.getPosition(), evt.target.instruction);
  //   }, false);
  
  //   // Add the maneuvers group to the map
  //   this.map.addObject(group);
  // }

  // private openBubble(position, text){
  //   if(!this.bubble){
  //      this.bubble =  new H.ui.InfoBubble(
  //        position,
  //        // The FO property holds the province name.
  //        {content: text});
  //      this.ui.addBubble(this.bubble);
  //    } else {
  //      this.bubble.setPosition(position);
  //      this.bubble.setContent(text);
  //      this.bubble.open();
  //    }
  //  }
  
  
  // /**
  //  * Creates a series of H.map.Marker points from the route and adds them to the map.
  //  * @param {Object} route  A route as received from the H.service.RoutingService
  //  */
  // private addWaypointsToPanel(waypoints){
  
  
  
  //   var nodeH3 = document.createElement('h3'),
  //     waypointLabels = [],
  //     i;
  
  
  //    for (i = 0;  i < waypoints.length; i += 1) {
  //     waypointLabels.push(waypoints[i].label)
  //    }
  
  //    nodeH3.textContent = waypointLabels.join(' - ');
  
  //   routeInstructionsContainer.innerHTML = '';
  //   routeInstructionsContainer.appendChild(nodeH3);
  // }
  
  // /**
  //  * Creates a series of H.map.Marker points from the route and adds them to the map.
  //  * @param {Object} route  A route as received from the H.service.RoutingService
  //  */
  // function addSummaryToPanel(summary){
  //   var summaryDiv = document.createElement('div'),
  //    content = '';
  //    content += 'Total distance: ' + summary.distance  + 'm. 
  // ';
  //    content += 'Travel Time: ' + summary.travelTime.toMMSS() + ' (in current traffic)';
  
  
  //   summaryDiv.style.fontSize = 'small';
  //   summaryDiv.style.marginLeft ='5%';
  //   summaryDiv.style.marginRight ='5%';
  //   summaryDiv.innerHTML = content;
  //   routeInstructionsContainer.appendChild(summaryDiv);
  // }
  
  // /**
  //  * Creates a series of H.map.Marker points from the route and adds them to the map.
  //  * @param {Object} route  A route as received from the H.service.RoutingService
  //  */
  // function addManueversToPanel(route){
  
  
  
  //   var nodeOL = document.createElement('ol'),
  //     i,
  //     j;
  
  //   nodeOL.style.fontSize = 'small';
  //   nodeOL.style.marginLeft ='5%';
  //   nodeOL.style.marginRight ='5%';
  //   nodeOL.className = 'directions';
  
  //      // Add a marker for each maneuver
  //   for (i = 0;  i < route.leg.length; i += 1) {
  //     for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
  //       // Get the next maneuver.
  //       maneuver = route.leg[i].maneuver[j];
  
  //       var li = document.createElement('li'),
  //         spanArrow = document.createElement('span'),
  //         spanInstruction = document.createElement('span');
  
  //       spanArrow.className = 'arrow '  + maneuver.action;
  //       spanInstruction.innerHTML = maneuver.instruction;
  //       li.appendChild(spanArrow);
  //       li.appendChild(spanInstruction);
  
  //       nodeOL.appendChild(li);
  //     }
  //   }
  
  //   routeInstructionsContainer.appendChild(nodeOL);
  // }

  public plotMarkersOnMap(markerDataList: ZoneData[]) {
    markerDataList.forEach(markerData => {
      let marker = new H.map.Marker({
        lat: markerData.location.lat,
        lng: markerData.location.lng
      });
      marker.setData(markerData);      
      this.markers.push(marker);     
    });
    this.map.addObject(new H.map.Group({
      objects : this.markers
    }));
  }

  public getMarkerObjects(){
    return this.markers;
  }

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
