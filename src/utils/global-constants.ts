export class GlobalConstants{
    public static APP_ID : string = "VIHpYIuaOsqgUIh6xZoI";
    public static APP_CODE : string = "QsXEF1UoH94HKKdQKCpoCg";
    public static API_KEY : string = "aabR2UUFpHYR4mJbbKxY3TinAYyn65kAF6ormrKugjE";
    public static CURRENT_LOC_LAT : string = "19.007859";
    public static CURRENT_LOC_LNG : string = "72.833965";

    public static updateLatLng(lat, lng){
        this.CURRENT_LOC_LAT = lat;
        this.CURRENT_LOC_LNG = lng;
    }
}