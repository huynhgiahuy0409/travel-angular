import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-translate-dialog',
  templateUrl: './translate-dialog.component.html',
  styleUrls: ['./translate-dialog.component.scss']
})
export class TranslateDialogComponent implements OnInit {
  sltLanguageCtrl: FormControl = new FormControl("", Validators.required)
  constructor() { }

  ngOnInit(): void {
    this.sltLanguageCtrl.setValue(localStorage.getItem('lang') || 'vn')
  }

  changeLang(lang: string){
    localStorage.setItem('lang', lang)
    window.location.reload()
  }
}
