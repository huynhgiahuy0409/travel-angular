import { Injectable } from '@angular/core';
import { DIRECT_LINK_IMAGE, FEMALE_DEFAULT_AVATAR_URL, MALE_DEFAULT_AVATAR_URL, UNDEFINED_DEFAULT_AVATAR_URL } from 'src/app/shared/models/constant';

@Injectable({
  providedIn: 'root'
})
export class DirectLinkService {
  maleDefaultAvatarURL: string = MALE_DEFAULT_AVATAR_URL
  femaleDefaultAvatarURL: string = FEMALE_DEFAULT_AVATAR_URL
  undefinedDefaultAvatarURL: string = UNDEFINED_DEFAULT_AVATAR_URL
  directLinkImageURL = DIRECT_LINK_IMAGE
  constructor() { }
  getURLImage(email: string, imageName: string, ext: string){
    return this.directLinkImageURL + email + "/" + imageName + "." + ext
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
