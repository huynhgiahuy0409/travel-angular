import { Geometry, Prediction } from "./model";

/* Response */
export interface ForwardGeocodingResponse {
    results: {
        formatted_address: string;
        geometry: Geometry;
        place_id: string;
    }[];
}
export interface PlaceAutocompleteResponse{
    predictions: Prediction[]
}
