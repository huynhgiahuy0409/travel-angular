import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { CommercialPostService } from 'src/app/admin/services/commercial-post.service';
import { APIResponse } from 'src/app/shared/models/model';
import { CommercialPostRequest } from 'src/app/shared/models/request';
import { UploadFileResponse } from 'src/app/shared/models/response';
import { LocalService } from 'src/app/user/services/local.service';
import { NotifyDialogService } from 'src/app/user/services/notify-dialog.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';

@Component({
  selector: 'app-commercial-dialog',
  templateUrl: './commercial-dialog.component.html',
  styleUrls: ['./commercial-dialog.component.scss']
})
export class CommercialDialogComponent implements OnInit {
  /* form */
  commercialPostFromGroup!: FormGroup;
  /* file */
  coverImageFile!: File | null;
  coverImageSrc!: string | ArrayBuffer | null;
  /* view child */
  @ViewChild('editCoverImageBtn', { read: ElementRef })
  editCoverImageBtn!: ElementRef;
  @ViewChild('coverImageActionSelect') coverImageActionSelect!: ElementRef;
  @ViewChild('locationTagInput')
  locationTagInput!: ElementRef<HTMLInputElement>;
  /* tag */
  filteredLocationTags!: Observable<string[]>;
  locationTagCtrl = new FormControl('');
  sltLocationTags: string[] = [];
  allLocations: string[] = [
    'India (Ấn độ)',
    'Austria (Áo)',
    'United Kingdom (Vương Quốc Anh)',
  ];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor( private renderer: Renderer2,
    private fb: FormBuilder,
    private uploadFileService: UploadFileService,
    private commercialPostService: CommercialPostService,
    private localService: LocalService,
    private notifyDialogService: NotifyDialogService,
    public dialogRef: MatDialogRef<CommercialDialogComponent>) {
     /* init form */
     this.commercialPostFromGroup = this.fb.group({
      title: [''],
      content: [''],
      tags: [''],
      commercialSrc: [''],
    });
  }

  ngOnInit(): void {
  }
  onClickEditCoverImage() {
    this.coverImageActionSelect.nativeElement.classList.toggle('show');
  }
  removeCoverImage() {
    this.coverImageFile = null;
    this.coverImageSrc = null;
  }
  remove(chipValue: string): void {
    const index = this.sltLocationTags.indexOf(chipValue);
    if (index >= 0) {
      this.sltLocationTags.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.sltLocationTags.push(value);
    }

    event.chipInput!.clear();

    this.locationTagCtrl.setValue(null);
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.sltLocationTags.push(event.option.value);
    this.locationTagInput.nativeElement.value = '';
    this.locationTagCtrl.setValue('');
  }
  coverImageChange(coverImageInput: HTMLInputElement) {
    const fileList: FileList | null = coverImageInput.files;
    if (fileList && fileList.length > 0) {
      const sltFile = fileList[0];
      this.coverImageFile = sltFile;
      const render = new FileReader();
      render.readAsDataURL(sltFile);
      render.onload = (event: ProgressEvent<FileReader>) => {
        this.coverImageSrc = render.result;
      };
    }
  }
  createCommercialPost() {
    let commercialPostRequest: CommercialPostRequest = this.commercialPostFromGroup.value
    commercialPostRequest.tags = this.sltLocationTags 
    if(this.coverImageFile){
      console.log(this.coverImageFile)
      this.uploadFileService.multipleUpload([this.coverImageFile]).pipe(
        concatMap(response => {
          let coverImageId = response.data[0].id
          return this.commercialPostService.createCommercialPost(commercialPostRequest, coverImageId)
        })
      ).subscribe(response => {
      },
      errorResponse => {
        console.log(errorResponse)
      })
    }
  }
}
