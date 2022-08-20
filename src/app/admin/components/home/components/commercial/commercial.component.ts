import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { ReviewPostComponent } from 'src/app/user/components/creation/components/review-post/review-post.component';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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
    private fb: UntypedFormBuilder,
    private commercialPostService: CommercialPostService,
    private searchService: SearchService
  ) {
  }

  ngOnInit(): void {}
  /* infinite scroll */
  onScrollDown($event: any) {
    let currFilter = this.filterPostService.reviewPostFilterBSub.value;
    let pageable = currFilter.pageable;
    pageable!.pageIndex++;
    this.filterPostService.reviewPostFilterBSub.next(currFilter);
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
