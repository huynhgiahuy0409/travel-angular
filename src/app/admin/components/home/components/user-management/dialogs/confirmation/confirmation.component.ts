import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  changeUserRole(role: string, userId: number) {
    this.userService.updateRole(role, userId).subscribe(response => {
      this.dialogRef.close({
          userResponse: response
      })
    })
  }
  changeActiveUser(active: number, userId: number){
    this.userService.updateActive(active,userId).subscribe(response => {
      this.dialogRef.close({
        userResponse: response
      })
    })
  }
}
