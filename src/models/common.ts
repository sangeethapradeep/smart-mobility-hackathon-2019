export class LatLngData{
    lat: number;
    lng: number;
}


//Common to destination-select-modal & booking-map
export class ZoneData{
    id:number;
    name: string;
    location:LatLngData;
}