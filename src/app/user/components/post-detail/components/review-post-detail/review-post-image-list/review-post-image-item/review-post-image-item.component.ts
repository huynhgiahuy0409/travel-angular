import { Component, Input, OnInit } from '@angular/core';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';

@Component({
  selector: 'app-review-post-image-item',
  templateUrl: './review-post-image-item.component.html',
  styleUrls: ['./review-post-image-item.component.scss']
})
export class ReviewPostImageItemComponent implements OnInit {
  @Input()
  postUserId!: number
  @Input()
  imageFileName!: string
  @Input()
  imageFileExt!: string
  constructor(public directLinkService: DirectLinkService) { }

  ngOnInit(): void {
  }

}
