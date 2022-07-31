import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifyDialogComponent } from 'src/app/shared/modules/shared-dialog/notify-dialog/notify-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotifyDialogService {

  constructor(private dialog: MatDialog) { }

  open(title: string, content: string, routerPaths: [string, string][]){
    let dialogRef = this.dialog.open(NotifyDialogComponent, {
      data: {
        title: title,
        content: content,
        routerPaths!: routerPaths
      }
    });
    return dialogRef
  }
}
