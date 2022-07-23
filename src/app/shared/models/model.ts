export interface Location {
    lat: number;
    lng: number;
}
export interface Geometry {
    location: Location;
}
export interface Prediction {
    description: string
    place_id: string
}