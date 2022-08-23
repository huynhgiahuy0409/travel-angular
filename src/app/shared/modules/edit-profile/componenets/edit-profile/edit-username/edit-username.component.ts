import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-edit-username',
  templateUrl: './edit-username.component.html',
  styleUrls: ['./edit-username.component.scss'],
})
export class EditUsernameComponent implements OnInit {
  fullNameCtrl: FormControl = new FormControl('');
  constructor(
    public dialogRef: MatDialogRef<EditUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService
  ) {}
  ngOnInit(): void {
    this.fullNameCtrl.setValue(this.data.currUsername);
  }
  updateFullName(fullName: string, userId: number) {
    this.userService.updateFullName(fullName, userId).subscribe(response => {
      if(response){
        this.userService.userBSub.next(response)
        this.dialogRef.close()
      }
    })
  }
}
