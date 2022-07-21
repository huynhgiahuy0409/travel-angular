import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.scss']
})
export class ReviewPostComponent implements OnInit {
  p = [1,2,3,4,5,6]
  constructor() { }

  ngOnInit(): void {
  }

}
