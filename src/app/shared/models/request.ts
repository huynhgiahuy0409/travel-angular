import { stringify } from 'querystring';
import { JourneyDay, JourneyInfo, Uluru } from './model';

export interface BaseResponse {
    id: number;
}
export interface ProvincePlaceRequest extends BaseResponse {
    name?: string;
    arrivedMemberCount?: number;
    urulu: Uluru;
    address?: string;
}
export interface DayJourneyRequest {
    day: string;
    provincePlaces: ProvincePlaceRequest[];
}
export interface ReviewPostRequest {
    title: string;
    bio: string;
    content: string;
    departureDay: Date;
    tags: string[];
    totalDay: number;
    cost: number;
    participantNumber: number;
    provinceId: number;
    districtId: number;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
}
/* journey post */
export interface JourneyPostRequest extends BaseResponse {
    title: string
    departureDay: Date;
    totalCost: number;
    totalDay: number;
    totalParticipant: number;
    vehicle: string;
    note: string;
    momoPhone: string;
    momoContent: string;
    journeyDays: JourneyDayRequest[]
    journeyInfo: JourneyInfoRequest
    departurePlace: GoongPlaceDetailResultRequest
}
export interface JourneyDayRequest {
    day: number
    journeyDayPlaces: JourneyDayPlaceRequest[]
}
export interface JourneyDayPlaceRequest {
    provincePlaceId?: number,
    goongPlaceDetailResult?: GoongPlaceDetailResultRequest
} 
export interface GoongPlaceDetailResultRequest {
    lat: number,
    lng: number,
    formatAddress: string
    name: string
}
export interface JourneyInfoRequest {
    description: number
    totalPayment: number
    journeyCostDetails: JourneyCostDetailRequest[]
    journeyDetails: JourneyDetailRequest[]
}
export interface JourneyCostDetailRequest {
    name: string,
    description: string,
    cost: number
}
export interface JourneyDetailRequest {
    title: string,
    description: string,
}