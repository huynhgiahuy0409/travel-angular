import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileResponse } from 'src/app/shared/models/response';
import { EditProfileComponent } from '../../edit-profile/componenets/edit-profile/edit-profile.component';

@Component({
  selector: 'app-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.scss']
})
export class SliderImageComponent implements OnInit {
  slt = 0
  
  constructor(
    public dialogRef: MatDialogRef<SliderImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.slt = this.data.sltIndex
  }
  previous(){
    if(this.slt === 0){
      this.slt = this.data.files.length - 1 
    }else{
      this.slt--
    }
  }
  next(){
    if(this.slt === this.data.files.length - 1){
      this.slt = 0
    }else{
      this.slt++
    }
  }
}
