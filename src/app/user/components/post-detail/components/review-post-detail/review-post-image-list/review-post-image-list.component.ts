import { Component, Input, OnInit } from '@angular/core';
import { ReviewPostImageResponse } from 'src/app/shared/models/response';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';

@Component({
  selector: 'app-review-post-image-list',
  templateUrl: './review-post-image-list.component.html',
  styleUrls: ['./review-post-image-list.component.scss']
})
export class ReviewPostImageListComponent implements OnInit {
  @Input()
  reviewPostImages!:ReviewPostImageResponse[]
  @Input()
  postUserId!: number
  constructor(public directLinkService: DirectLinkService) { }

  ngOnInit(): void {
  }

}
