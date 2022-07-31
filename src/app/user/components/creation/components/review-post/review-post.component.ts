import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
  HostListener,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { map, startWith, switchMap, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { APIResponse } from 'src/app/shared/models/model';
import { UploadFileResponse } from 'src/app/shared/models/response';
interface ReviewMedia$ {
  coverMedia$?: Observable<APIResponse<UploadFileResponse>> | null;
  postMedias$?: Observable<APIResponse<UploadFileResponse>> | null;
}
@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.scss'],
})
export class ReviewPostComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // @ViewChild('coverImageInput')
  // coverImageInput!: ElementRef<HTMLInputElement>;
  imagesFiles: File[] = [];
  reviewImagesSrcs: any = [];
  coverImageFile?: File;
  coverImageSrc!: string | ArrayBuffer | null;
  filteredLocationTags!: Observable<string[]>;
  locationTagCtrl = new FormControl('');
  sltLocationTags: string[] = [];
  allLocations: string[] = [
    'India (Ấn độ)',
    'Austria (Áo)',
    'United Kingdom (Vương Quốc Anh)',
  ];
  /*  */
  @ViewChild('editCoverImageBtn', { read: ElementRef })
  editCoverImageBtn!: ElementRef;
  @ViewChild('coverImageActionSelect') coverImageActionSelect!: ElementRef;
  @ViewChild('locationTagInput')
  locationTagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('addImagesInput')
  addImagesInput!: ElementRef<HTMLInputElement>;
  /* form */
  reviewPostFromGroup!: FormGroup;
  constructor(
    private renderer: Renderer2,
    private reviewPostService: ReviewPostService,
    private fb: FormBuilder,
    private uploadFileService: UploadFileService
  ) {
    this.filteredLocationTags = this.locationTagCtrl.valueChanges.pipe(
      startWith(null),
      map((enteredTag) =>
        enteredTag ? this._filter(enteredTag) : this.allLocations.slice()
      )
    );
    /* init form */
    this.reviewPostFromGroup = this.fb.group({
      title: [''],
      bio: [''],
      content: [''],
      departureDay: [''],
      totalDay: [''],
      cost: [''],
      participantNumber: [''],
      tags: [''],
    });
    this.reviewPostFromGroup.valueChanges.subscribe((v) => {
      console.log(v);
    });
  }

  ngOnInit(): void {}
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allLocations.filter((location) =>
      location.toLowerCase().includes(filterValue)
    );
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.sltLocationTags.push(event.option.value);
    this.locationTagInput.nativeElement.value = '';
    this.locationTagCtrl.setValue('');
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
  onClickEditCoverImage() {
    this.coverImageActionSelect.nativeElement.classList.toggle('show');
  }
  @HostListener('click', ['$event'])
  clickOutEditCoverImageBtn(event: any) {
    if (this.editCoverImageBtn) {
      console.log(event.target);
      console.log(event.currentTarget);
      console.log(this.editCoverImageBtn.nativeElement);

      if (
        event.target != this.editCoverImageBtn.nativeElement &&
        event.target.parentElement != this.coverImageActionSelect.nativeElement
      ) {
        if (
          this.coverImageActionSelect.nativeElement.classList.contains('show')
        ) {
          this.coverImageActionSelect.nativeElement.classList.remove('show');
        }
      }
    }
  }
  changeListImages(addImagesInput: HTMLInputElement) {
    this.reviewImagesSrcs = [];
    const files: FileList | null = addImagesInput.files;
    console.log(files);
    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        this.imagesFiles.push(files[index]);
      }
      this.imagesFiles.forEach((file) => {
        const render = new FileReader();
        render.readAsArrayBuffer;
        render.readAsDataURL(file);
        render.onload = (event: ProgressEvent<FileReader>) => {
          this.reviewImagesSrcs!.push(render.result);
        };
      });
    }
  }
  clearImages() {
    this.imagesFiles = [];
    this.reviewImagesSrcs = [];
  }
  removeCoverImage() {
    this.coverImageFile = undefined;
    this.coverImageSrc = null;
  }
  createReviewPost() {
    let tagCtrl: AbstractControl = this.reviewPostFromGroup.controls.tags;
    tagCtrl.setValue(this.sltLocationTags);

    let medias$: Observable<APIResponse<UploadFileResponse[] | null>>[] = [];
    this.coverImageFile
      ? medias$.push(
          this.uploadFileService.multipleUpload([this.coverImageFile])
        )
      : of(null);
    this.imagesFiles && this.imagesFiles.length > 0
      ? medias$.push(this.uploadFileService.multipleUpload(this.imagesFiles))
      : of(null);
    console.log(medias$);
    if (medias$.length > 0) {
      forkJoin(medias$)
        .pipe(
          switchMap((response) => {
            let coverMediasData: UploadFileResponse[] | null = response[0]
              ? response[0].data
              : null;
            let postMediasData: UploadFileResponse[] | null = response[1]
              ? response[1].data
              : null;
            const coverIds: number[] | undefined = coverMediasData
              ? coverMediasData.map((i) => i.id)
              : undefined;
            const postIds: number[] | undefined = postMediasData
              ? postMediasData.map((i) => i.id)
              : undefined;
              console.log(coverIds![0]);
              console.log(postIds);
              
            return this.reviewPostService.createReviewPost(
              this.reviewPostFromGroup.value,
              coverIds![0],
              postIds
            );
          })
        )
        .subscribe((v) => {
          console.log(v);
        });
    } else {
      this.reviewPostService
        .createReviewPost(this.reviewPostFromGroup.value, undefined, undefined)
        .subscribe();
    }
  }
}
