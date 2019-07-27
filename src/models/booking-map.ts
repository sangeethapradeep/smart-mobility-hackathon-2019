import { LatLngData, ZoneData } from "./common";

export interface markerData{
    id: number;
    location:LatLngData;
    type: string;
}

export class geoCircleData{
  center:LatLngData;
	radius: number;
} 

export class bookingRequestData{
  userId: number;
	sourceZoneId: number;
	destZoneId: number;
}

export class bookingResponseData{
  userId:number;
  pickup_location: ZoneData;
  cost:number;
}

export class sharedBookingRequest{
  userId: number;
	sourceZoneId: number;
	destZoneId: number;
}