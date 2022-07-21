import { Component, ElementRef, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.scss'],
})
export class ReviewPostComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('locationTagInput')
  locationTagInput!: ElementRef<HTMLInputElement>;
  filteredLocationTags!: Observable<string[]>;
  locationTagCtrl = new FormControl('');
  sltLocationTags: string[] = [];
  allLocations: string[] = ['#India (Ấn độ)', '#Austria (Áo)', '#United Kingdom (Vương Quốc Anh)'];
  coverImageSrc!: string | ArrayBuffer | null
  /*  */
  @ViewChild('editCoverImageBtn', { read: ElementRef }) editCoverImageBtn!: ElementRef
  @ViewChild('coverImageActionSelect') coverImageActionSelect!: ElementRef

  constructor(private renderer: Renderer2) {
    this.filteredLocationTags = this.locationTagCtrl.valueChanges.pipe(
      startWith(null),
      map((enteredTag) =>
        enteredTag ? this._filter(enteredTag) : this.allLocations.slice()
      )
    );
  }

  ngOnInit(): void { }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allLocations.filter((location) =>
      location.toLowerCase().includes(filterValue)
    );
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.sltLocationTags.push(event.option.viewValue);
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
  reviewSltImage($event: any) {
    const fileList: FileList = $event.target.files
    const sltFile = fileList[0]
    const render = new FileReader()
    render.readAsDataURL(sltFile)
    render.onload = (event: ProgressEvent<FileReader>) => {
      this.coverImageSrc = render.result
      console.log(this.coverImageSrc);

    }
  }
  onClickEditCoverImage() {
    this.coverImageActionSelect.nativeElement.classList.toggle('show')
  }
  @HostListener('click', ['$event'])
  clickOutEditCoverImageBtn(event: any) {
    if(this.editCoverImageBtn){
      console.log(event.target);
      console.log(event.currentTarget);
      console.log(this.editCoverImageBtn.nativeElement);
      
      if (event.target != this.editCoverImageBtn.nativeElement && event.target.parentElement != this.coverImageActionSelect.nativeElement) {
        if (this.coverImageActionSelect.nativeElement.classList.contains("show")) {
          this.coverImageActionSelect.nativeElement.classList.remove("show")
        }
      }
    }

  }
}
