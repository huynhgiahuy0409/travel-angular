import { GoongPlaceDetailResultResponse, ProvincePlaceResponse } from "./response";

export interface Base{
    id: number
}
export interface BaseFilter{
    pageable: Pageable
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

export interface Sortable{
    dir: "ASC" | "DESC",
    order: string
}
export interface Pageable{
    pageIndex: number
    pageSize: number,
    sortable?: Sortable
} 
export interface FilterJourneyPost{
    pageable?: Pageable
    title?: string
    totalDay?: number
    totalCost?: number
    totalParticipant?: number
    departurePlace?: string
    createDateRange?: [number,number]
    status?: string
    postUserId?: number
} 
export interface FilterReviewPost{
    pageable?: Pageable
    title?: string
    tag?: string
    cost?: number
    provinceName?: string
    status?: string;
    createDateRange?: [number,number]
    provinceId?: number;
    postUserId?: number
}
export interface FilterCommercialPost{
    pageable?: Pageable
    title?: string
    tag?: string
}
export interface FilterUser extends BaseFilter{
    role?: string
    active?: number,
    fullName?: string
}
export interface FilterFileUpload{
    pageable?: Pageable
    userId?: number
    specie?: string
}
/* journey day */
export interface JourneyDay{
    day: number,
    journeyDayPlaces: JourneyDayPlace[]
}
export interface JourneyDayPlace{
    provincePlace?: ProvincePlaceResponse;
    goongPlaceDetailResult?: GoongPlaceDetailResultResponse;
  }

export interface JourneyInfo{
    description: string,
    journeyCostDetails: JourneyCostDetail[]
    journeyDetails: JourneyDetail[]
}
export interface JourneyCostDetail{
    name: string,
    description: string
    cost: number
}
export interface JourneyDetail{
    title: string,
    description: string,
}