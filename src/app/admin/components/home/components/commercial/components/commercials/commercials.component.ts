import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, debounceTime, tap } from 'rxjs/operators';
import { CommercialPostService } from 'src/app/admin/services/commercial-post.service';
import { FilterCommercialPost } from 'src/app/shared/models/model';
import { CommercialPostResponse } from 'src/app/shared/models/response';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { CommercialDialogComponent } from '../../creation/commercial-dialog/commercial-dialog.component';
import { CriteriaOption, SearchService } from '../../services/search.service';

@Component({
  selector: 'app-commercials',
  templateUrl: './commercials.component.html',
  styleUrls: ['./commercials.component.scss'],
  providers: [FilterPostService],
})
export class CommercialsComponent implements OnInit{
  commercialPosts: CommercialPostResponse[] = []
  /* fg */
  searchFormGroup!: FormGroup;
  constructor(
    private filterPostService: FilterPostService,
    private commercialPostService: CommercialPostService,
    private searchService: SearchService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
  ) {
     /* init search fg */
     this.searchFormGroup = this.fb.group({
      order: this.fb.control('title'),
      search: this.fb.control(''),
    });
  }
  ngOnInit(): void {
    this.filterPostService.commercialFilter$.pipe(concatMap(filter => {
      console.log(filter);
      return  this.commercialPostService.findAll(filter)
    })).subscribe(posts => {
      this.commercialPosts = this.commercialPosts.concat(posts)
      console.log(this.commercialPosts);
      
    })
   
    this.searchFormGroup.get('search')!.valueChanges.pipe(debounceTime(500), tap(
      term => {
        this.commercialPosts = []
        let currFilter: FilterCommercialPost = this.filterPostService.commercialFilterBSub.value
        currFilter.pageable!.pageIndex = 0
        currFilter.tag = undefined
        currFilter.title = undefined
        let order = this.searchFormGroup.get('order')!.value
        if(term){
          if(order === 'title'){
            currFilter.title = term
          }else if(order === 'tag'){
            currFilter.tag = term
          }
        }else{
          currFilter = {
            ...currFilter,
          }
        }
        console.log(currFilter);
        this.filterPostService.commercialFilterBSub.next(currFilter)
      }
    )).subscribe(
    )
  }
  openCreateCommercialDialog() {
    const dialogRef = this._dialog.open(CommercialDialogComponent, {
      width: 'auto',
    });
  }
  onScrollDown($event: any) {
    let currFilter = this.filterPostService.commercialFilterBSub.value
    let pageable = currFilter.pageable;
    pageable!.pageIndex++;
    this.filterPostService.commercialFilterBSub.next(currFilter);
  }
}
