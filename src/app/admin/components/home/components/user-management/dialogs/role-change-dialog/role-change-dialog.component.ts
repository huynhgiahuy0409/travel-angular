import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-role-change-dialog',
  templateUrl: './role-change-dialog.component.html',
  styleUrls: ['./role-change-dialog.component.scss']
})
export class RoleChangeDialogComponent implements OnInit {
  sltRoleCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  constructor(
    public dialogRef: MatDialogRef<RoleChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  confirmChangeRole(role: string, userId: number){
    this.userService.updateRole(role,userId).subscribe(response => {
      this.dialogRef.close({
        userResponse: response
      })
    })
  }
}
