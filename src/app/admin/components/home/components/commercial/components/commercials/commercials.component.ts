import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CommercialPostService } from 'src/app/admin/services/commercial-post.service';
import { FilterCommercialPost } from 'src/app/shared/models/model';
import { CommercialPostResponse } from 'src/app/shared/models/response';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { CriteriaOption, SearchService } from '../../services/search.service';

@Component({
  selector: 'app-commercials',
  templateUrl: './commercials.component.html',
  styleUrls: ['./commercials.component.scss'],
  providers: [FilterPostService]
})
export class CommercialsComponent implements OnInit, OnDestroy {
  commercialPosts$!: Observable<CommercialPostResponse[]>

  constructor(private filterPostService: FilterPostService, private commercialPostService: CommercialPostService, private searchService: SearchService) { }
  ngOnDestroy(): void {
    this.searchService.criteriaBSub.next(null)
  }

  ngOnInit(): void {
    let initFilter: FilterCommercialPost = this.filterPostService.initFilter
    this.commercialPosts$ = this.commercialPostService.findAll(initFilter)
    let initCriterialOptions: CriteriaOption[] = [
      {label: "Tiêu đề bài viết", value: "title"},
      {label: "Tag", value: "tag"},
    ]
    this.searchService.criteriaBSub.next(initCriterialOptions)
  }

}
