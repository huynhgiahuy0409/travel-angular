import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProfileComponent } from 'src/app/shared/modules/edit-profile/componenets/edit-profile/edit-profile.component';

@Component({
  selector: 'app-show-avatar',
  templateUrl: './show-avatar.component.html',
  styleUrls: ['./show-avatar.component.scss']
})
export class ShowAvatarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    
  }

}
