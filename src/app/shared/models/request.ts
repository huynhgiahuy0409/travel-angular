import { stringify } from "querystring"
import { Uluru } from "./model"

export interface BaseResponse {
    id: number
}
export interface ProvincePlaceRequest extends BaseResponse {
    name?: string
    arrivedMemberCount?: number
    urulu: Uluru,
    address?: string
}
export interface DayJourneyRequest {
    day: string,
    provincePlaces: ProvincePlaceRequest[]
}
export interface ReviewPostRequest {
    title: string;
    bio: string
    content: string
    departureDay: Date
    tags: string[]
    totalDay: number
    cost: number
    participantNumber: number
}
export interface LoginRequest{
    email: string
    password: string
}
export interface RegisterRequest{
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: string
}
