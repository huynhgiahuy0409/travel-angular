import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowAvatarComponent } from '../show-avatar/show-avatar.component';

@Component({
  selector: 'app-show-cover',
  templateUrl: './show-cover.component.html',
  styleUrls: ['./show-cover.component.scss']
})
export class ShowCoverComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    
  }
}
