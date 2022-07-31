import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.scss'],
})
export class NotifyDialogComponent implements OnInit {
  i = [1];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      routerPaths: [string, string][];
    },
    private router: Router
  ) {}

  ngOnInit(): void {
  }
  navigate(routePath: string) {
    this.router.navigate([`${routePath}`])
  }
}
