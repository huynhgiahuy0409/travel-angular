import { Geometry, Uluru, Prediction, PlaceDetailResult } from "./model";
export interface BaseResponse{
    id: number
}
    
    /* Response */
export interface ForwardGeocodingResponse {
    result: {
        formatted_address: string;
        geometry: Geometry;
        place_id: string;
        name: string
    }[];
} 
export interface PlaceDetailResponse {
    result: PlaceDetailResult;
}
export interface PlaceAutocompleteResponse{
    predictions: Prediction[]
}
export interface ProvincePlaceResponse extends BaseResponse{
    name: string
    arrivedMemberCount: number
    urulu: Uluru
    address?: String
}
export interface JWTResponse{
    refreshToken: string
    accessToken: string
}

export interface AuthenticationResponse{
    user: UserInfoResponse
    jwt: JWTResponse
}
export interface UploadFileResponse{
    id: number
    name: string
    ext: string
    contentType: string
    createDate: Date
}
export interface UserInfoResponse extends BaseResponse{
    username: string;
    fullName: string;
    avt: string;
    email: string;
    bio: string;
    background: string;
    isFollowed: string;
    gender: string
}
export interface ReviewPostImageResponse extends BaseResponse{
    id: number
    image: UploadFileResponse
    status:number
}
export interface TagResponse{
    name: string
}
export interface ReviewPostResponse extends BaseResponse{
    title: string
    bio: string
    departureDay: string
    totalDay: number
    cost: number
    content: string
    participantsNumber: number
    coverImage: UploadFileResponse
    images: ReviewPostImageResponse[]
    user: UserInfoResponse
    createdDate: Date;
    reviewPostTags: TagResponse[]
}