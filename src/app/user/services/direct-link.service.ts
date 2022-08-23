import { Injectable } from '@angular/core';
import { DEFAULT_PROVINCE_PLACE_URL, DIRECT_LINK_IMAGE, FEMALE_DEFAULT_AVATAR_URL, MALE_DEFAULT_AVATAR_URL, UNDEFINED_DEFAULT_AVATAR_URL } from 'src/app/shared/models/constant';

@Injectable({
  providedIn: 'root'
})
export class DirectLinkService {
  maleDefaultAvatarURL: string = MALE_DEFAULT_AVATAR_URL
  femaleDefaultAvatarURL: string = FEMALE_DEFAULT_AVATAR_URL
  undefinedDefaultAvatarURL: string = UNDEFINED_DEFAULT_AVATAR_URL
  directLinkImageURL = DIRECT_LINK_IMAGE
  defaultProvincePlaceURL: string = DEFAULT_PROVINCE_PLACE_URL;
  constructor() { }
  getDirectLinkImage(userId: number, imageName: string, ext: string){
    return this.directLinkImageURL + userId + "/" + imageName + "." + ext
  }
  getDirectLinkCoverImage(userId: number, imageName: string, ext: string){
    return this.directLinkImageURL + userId + "/cover-image/" + imageName + "." + ext
  }
  getDirectLinkAvatar(userId: number, imageName: string, ext: string){
    return this.directLinkImageURL + userId + "/avatar/" + imageName + "." + ext
  }
  
  getURLProvincePlace(imageName: string){
    return this.defaultProvincePlaceURL + imageName
  }
  getDefaultAvatarURL(gender: string){
    if(gender === "MALE"){
      return this.maleDefaultAvatarURL
    }else if(gender === "FEMALE"){
      return this.femaleDefaultAvatarURL
    } else if (gender === "UNDEFINED") {
      return this.undefinedDefaultAvatarURL
    }
    return ""
  }
}
