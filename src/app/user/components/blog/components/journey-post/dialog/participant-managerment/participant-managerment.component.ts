import { ParticipantResponse } from './../../../../../../../shared/models/response';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JourneyPostResponse } from 'src/app/shared/models/response';
import {
  MALE_DEFAULT_AVATAR_URL,
  FEMALE_DEFAULT_AVATAR_URL,
  UNDEFINED_DEFAULT_AVATAR_URL,
} from 'src/app/shared/models/constant';
import { ParticipantService } from 'src/app/user/services/participant.service';
import { Observable } from 'rxjs/internal/Observable';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';

@Component({
  selector: 'app-participant-managerment',
  templateUrl: './participant-managerment.component.html',
  styleUrls: ['./participant-managerment.component.scss'],
})
export class ParticipantManagermentComponent implements OnInit {
  maleDefaultAvatarURL: string = MALE_DEFAULT_AVATAR_URL;
  femaleDefaultAvatarURL: string = FEMALE_DEFAULT_AVATAR_URL;
  undefinedDefaultAvatarURL: string = UNDEFINED_DEFAULT_AVATAR_URL;
  waitingParticipants!: ParticipantResponse[];
  approvedParticipants!: ParticipantResponse[];
  denyParticipants!: ParticipantResponse[];
  journeyPost$!: Observable<JourneyPostResponse>
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {journeyPostId: number},
    private participantService: ParticipantService,
    private journeyPostService: JourneyPostService
  ) {}

  ngOnInit(): void {
    this.journeyPostService.findById(this.data.journeyPostId).subscribe(response => {
      this.waitingParticipants = response.participants.filter(
        (participant) => participant.status == 1
      );
      this.approvedParticipants = response.participants.filter(
        (participant) => participant.status == 2
      );
      this.denyParticipants = response.participants.filter(
        (participant) => participant.status == -1
      );
    })
  }
  updateParticipant(participant: ParticipantResponse, action: -1 | 0 | 1 | 2) {
    this.participantService.updateJourneyPostParticipant(
      participant.user.id,
      this.data.journeyPostId,
      action
    ).subscribe(response => {
      if(response){
        this.waitingParticipants = this.waitingParticipants.filter(p => p.id != response.id)
        if(action == 2){
          this.approvedParticipants.push(response)
        }else if(action == -1){
          this.denyParticipants.push(response)
        }
      }
    })
  }
}
