import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  countSlide: number = 0;
  token: string | undefined;
  constructor() {}

  ngOnInit(): void {
    this.runSlideShow(3000);
  }
  runSlideShow(ms: number) {
    setInterval(() => {
      this.countSlide++;
      let nameOld = `hinh${this.countSlide}`;
      let nameNew = `hinh${this.countSlide + 1}`;
      if (this.countSlide == 5) {
        nameNew = `hinh${1}`;
        this.countSlide = 0;
      }
      let nameOldObject = document.getElementById(nameOld);
      if (nameOldObject != null) {
        nameOldObject.style.opacity = '0';
      }
      let nameNewObject = document.getElementById(nameNew);
      if (nameNewObject != null) {
        nameNewObject.style.opacity = '1';
      }
      let child = document.getElementById('child');
      if (child != null) {
        child.style.left = `${this.countSlide * 20}%`;
      }
      let content_child = document.getElementById('left-content__progress-bar');
      if (content_child != null) {
        content_child.innerText = `0${this.countSlide + 1}`;
      }
    }, ms);
  }
  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }
}
