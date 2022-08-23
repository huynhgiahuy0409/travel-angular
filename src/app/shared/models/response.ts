import { Geometry, Uluru, Prediction } from "./model";
export interface BaseResponse{
    id: number
    createdDate: Date
}
export interface GoongPlaceDetailResultResponse {
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    name: string
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
export interface GoongPlaceDetailResponse {
    result: GoongPlaceDetailResultResponse;
}
export interface GoongPlaceAutocompleteResponse{
    predictions: Prediction[]
}
export interface ProvincePlaceResponse extends BaseResponse{
    name: string
    arrivedMemberCount: number
    lat: number
    lng: number
    thumbnailFilename: string
    province: ProvinceResponse
    district: DistrictResponse
    ward: WardResponse
}   
export interface JWTResponse{
    refreshToken: string
    accessToken: string
}

export interface AuthenticationResponse{
    user: UserProfileResponse
    jwt: JWTResponse
}
export interface UploadFileResponse{
    id: number
    name: string
    ext: string
    contentType: string
    createDate: Date
    directLink: string
}
export interface RoleResponse{
    name: string
    label: string
}

export interface UserProfileResponse extends BaseResponse{
    username: string;
    fullName: string;
    email: string;
    bio: string;
    background: string;
    isFollowed: string;
    gender: string;
    reputation: number;
    avatar: UploadFileResponse;
    defaultAvatarURL: string
    coverImage: UploadFileResponse | null;
    role: RoleResponse;
    active: number;
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
    user: UserProfileResponse
    reviewPostTags: TagResponse[]
    province: ProvinceResponse
    district: DistrictResponse
    userReact: UserReactResponse
    status: string
    createdDate: Date
}
export interface CommercialPostResponse extends BaseResponse{
    title: string
    content: string
    commercialTags: TagResponse[]
    commercialCoverImage: UploadFileResponse
    commercialSrc: string
    user: UserProfileResponse
}
/* react */
export interface UserReactResponse{
    id: number
    react: number
    userFullName: string
} 
export interface PagingResponse<T>{
    data: T;
    totalLength: number
}
export interface PostReactResponse{
    totalReact: number
    pagingLikeReact: PagingResponse<UserReactResponse[]>
    pagingDislikeReact: PagingResponse<UserReactResponse[]>
}
/* local */
export interface ProvinceResponse extends BaseResponse {
    // domain: 'Bắc' | 'Trung' | 'Nam';
    name: string
    domain: string
  }
  export interface DistrictResponse extends BaseResponse {
    name: string
    prefix: string;
  }
  export interface WardResponse extends BaseResponse {
    name: string
    prefix: string;
  }
export interface JourneyPostResponse extends BaseResponse{
    coverImage: UploadFileResponse
    title: string
    departureDay: Date;
    totalCost: number;
    totalDay: number;
    totalParticipant: number;
    note: string;
    momoPhone: string,
    momoContent: string,
    journeyInfo: JourneyInfoResponse
    journeyDays: JourneyDayResponse[]
    departurePlace: GoongPlaceDetailResultResponse
    user: UserProfileResponse,
    participants: ParticipantResponse[]
    userReact: UserReactResponse
    status: string
}
export interface ParticipantResponse extends BaseResponse{
    status: number
    user: UserProfileResponse
}
export interface JourneyInfoResponse extends BaseResponse{
    description: number
    totalPayment: number
    journeyCostDetails: JourneyCostDetailResponse[]
    journeyDetails: JourneyDetailResponse[]
}
export interface JourneyCostDetailResponse extends BaseResponse{
    name: string,
    description: string,
    cost: number
}
export interface JourneyDetailResponse extends BaseResponse{
    title: string,
    description: string,
}
export interface JourneyDayResponse extends BaseResponse{
    day: number
    journeyDayPlaces: JourneyDayPlaceResponse[]
}
export interface JourneyDayPlaceResponse extends BaseResponse{
    provincePlace?: ProvincePlaceResponse
    goongPlaceDetailResult?: GoongPlaceDetailResultResponse
}
export interface GoongPlaceDetailResultResponse extends BaseResponse{
    lat: number,
    lng: number,
    formatAddress: string
    name: string
}