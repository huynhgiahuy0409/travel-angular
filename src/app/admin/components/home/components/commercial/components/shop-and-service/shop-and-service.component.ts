import { Component, OnInit, OnDestroy } from '@angular/core';
import { CriteriaOption, SearchService } from '../../services/search.service';

@Component({
  selector: 'app-shop-and-service',
  templateUrl: './shop-and-service.component.html',
  styleUrls: ['./shop-and-service.component.scss']
})
export class ShopAndServiceComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchService) { }
  
  ngOnInit(): void {
    let initCriterialOptions: CriteriaOption[] = [
      {label: "Tên sản phẩm", value: "productName"},
    ]
    this.searchService.criteriaBSub.next(initCriterialOptions)
  }
  ngOnDestroy(): void {
    this.searchService.criteriaBSub.next(null)
  }
  
}
