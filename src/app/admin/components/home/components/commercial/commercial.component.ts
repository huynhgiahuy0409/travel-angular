import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { ReviewPostComponent } from 'src/app/user/components/creation/components/review-post/review-post.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommercialDialogComponent } from './creation/commercial-dialog/commercial-dialog.component';
import { CommercialPostService } from 'src/app/admin/services/commercial-post.service';
import { CriteriaOption, SearchService } from './services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss'],
})
export class CommercialComponent implements OnInit {
  slt = 0
  /* fg */
  searchFormGroup!: FormGroup;
  /* data */
  criteriaOptions$!: Observable<CriteriaOption[] | null>
  constructor(
    private filterPostService: FilterPostService,
    private _dialog: MatDialog,
    private fb: FormBuilder,
    private commercialPostService: CommercialPostService,
    private searchService: SearchService
  ) {
    /* init search fg */
    this.searchFormGroup = this.fb.group({
      order: this.fb.control(''),
      search: this.fb.control(''),
    });
    this.criteriaOptions$ = this.searchService.criteria$
  }

  ngOnInit(): void {}
  /* infinite scroll */
  onScrollDown($event: any) {
    let currFilter = this.filterPostService.filterPostBSub.value;
    let pageable = currFilter.pageable;
    pageable.pageIndex++;
    this.filterPostService.filterPostBSub.next(currFilter);
  }
  openCreateCommercialDialog() {
    const dialogRef = this._dialog.open(CommercialDialogComponent, {
      width: 'auto',
    });
  }
  openCreateServiceDialog() {
    const dialogRef = this._dialog.open(CommercialDialogComponent, {
      width: 'auto',
    });
  }
}
