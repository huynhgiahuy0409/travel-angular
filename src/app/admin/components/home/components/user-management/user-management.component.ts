import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { ADMIN_ROLE, CENSOR_ROLE } from 'src/app/shared/models/constant';
import { FilterUser } from 'src/app/shared/models/model';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { UserService } from 'src/app/user/services/user.service';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
 
}
