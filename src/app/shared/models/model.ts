export interface BaseResponse{
    id: number
}
export interface APIResponse<T>{
    message: string,
    data: T,
    status: number,
    statusText: string
}
export interface Uluru {
    lat: number;
    lng: number;
}
export interface Geometry {
    location: Uluru;
}
export interface Prediction {
    description: string
    place_id: string
}
export interface PlaceDetailResult {
        formatted_address: string;
        geometry: Geometry;
        place_id: string;
}

export interface ProvinceResponse extends BaseResponse{
    name: string
    code: string
    domain: string
}
export interface Pageable{
    pageIndex: number
    pageSize: number
}
export interface FilterPost{
    pageable: Pageable
}