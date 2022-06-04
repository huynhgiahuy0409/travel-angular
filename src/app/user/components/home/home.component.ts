import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs/internal/Observable';
import { UploadFileService } from '../../services/upload-file.service';
import { CreatePostDialogComponent } from './dialog/create-post-dialog/create-post-dialog.component';
export interface User {
  name: string;
  url: string;
}
export interface Comment {
  user: User;
  content: string;
  comments?: Comment[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  postImageDetailContainer!: ElementRef;
  posts = [
    {
      content: '',
      images: ['assets/image/feed-image-1.png'],
    },
    {
      content: '',
      images: [
        'assets/image/feed-image-1.png',
        'assets/image/feed-image-2.png',
      ],
    },
    {
      content: '',
      images: [
        'assets/image/feed-image-1.png',
        'assets/image/feed-image-2.png',
        'assets/image/feed-image-3.png',
      ],
    },
    {
      content: '',
      images: [
        'assets/image/feed-image-1.png',
        'assets/image/feed-image-2.png',
        'assets/image/feed-image-3.png',
        'assets/image/feed-image-4.png',
      ],
    },
    {
      content: '',
      images: [
        'assets/image/feed-image-1.png',
        'assets/image/feed-image-2.png',
        'assets/image/feed-image-3.png',
        'assets/image/feed-image-4.png',
        'assets/image/feed-image-5.png',
      ],
    },
    {
      content: '',
      images: [
        'assets/image/feed-image-1.png',
        'assets/image/feed-image-2.png',
        'assets/image/feed-image-3.png',
        'assets/image/feed-image-4.png',
        'assets/image/feed-image-5.png',
        'assets/image/feed-image-1.png',
      ],
    },
  ];
  isShowStoryFull: boolean = false;
  isShowPostFull: boolean = false;
  zoom: number = 15;
  title = 'travel';
  lat = 10.924067;
  lng = 106.713028;
  srcReactIcons = [
    { url: 'assets/react-image/like.svg', name: 'like' },
    { url: 'assets/react-image/love.svg', name: 'love' },
    { url: 'assets/react-image/care.svg', name: 'care' },
    { url: 'assets/react-image/haha.svg', name: 'haha' },
    { url: 'assets/react-image/wow.svg', name: 'wow' },
    { url: 'assets/react-image/sad.svg', name: 'sad' },
    { url: 'assets/react-image/angry.svg', name: 'angry' },
  ];
  locations: any[] = [
    {
      lat: 10.8999964,
      lng: 106.7999968,
      label: { name: 'Di An', subName: 'Di An, Binh Duong Province, VietNam' },
    },
    {
      lat: 10.762622,
      lng: 106.660172,
      label: { name: 'Ho Chi Minh City', subName: 'Ho Chi Minh City, VietNam' },
    },
    {
      lat: 10.8999964,
      lng: 106.7999968,
      label: { name: 'Di An', subName: 'Di An, Binh Duong Province, VietNam' },
    },
    {
      lat: 10.762622,
      lng: 106.660172,
      label: { name: 'Ho Chi Minh City', subName: 'Ho Chi Minh City, VietNam' },
    },
  ];
  /*  */
  selectedFiles!: FileList;
  currentFile!: File | null;
  progress = 0;
  message!: string;
  fileInfos!: Observable<any> | undefined;
  /* img: any; */
  /* Customize Commend */
  commentTree: Comment[] = [
    {
      user: {
        name: 'Đoàn Trung Hải',
        url: '84c1252b0128cf769639 - Copy (2).jpg',
      },
      content: 'This is a comment',
      comments: [
        {
          user: {
            name: 'Thanh Trúc',
            url: '84c1252b0128cf769639 - Copy (2).jpg',
          },
          content: 'This is a comment',
          comments: [],
        },
        {
          user: {
            name: 'Phi Hoàng',
            url: '84c1252b0128cf769639 - Copy (2).jpg',
          },
          content: 'This is a comment',
          comments: [
            {
              user: {
                name: 'Thiên Nguyễn',
                url: '84c1252b0128cf769639 - Copy (2).jpg',
              },
              content: 'This is a comment',
            },
          ],
        },
      ],
    },
    {
      user: {
        name: 'Hạ Ngọc Huyền',
        url: '84c1252b0128cf769639 - Copy (2).jpg',
      },
      content: 'This is a comment',
      comments: [
        {
          user: {
            name: 'Huynh Gia Huy 1',
            url: '84c1252b0128cf769639 - Copy (2).jpg',
          },
          content: 'This is a comment',
          comments: [],
        },
      ],
    },
  ];
  isShowComments: boolean = false;
  @ViewChild('firstElement') firstElement!: ElementRef;
  constructor(
    private _uploadFileService: UploadFileService,
    private _dialog: MatDialog,
    private renderer: Renderer2,
    private ref: ElementRef
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
  selectedFile($event: any) {
    this.selectedFiles = $event.target.files;
  }
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    if (this.currentFile) {
      this._uploadFileService.upload(this.currentFile).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body ? event.body.message : '';
            this.fileInfos = this._uploadFileService.getFiles();
          }
        },
        (err) => {
          this.progress = 0;
          this.message = 'Could not upload the file';
          this.fileInfos = undefined;
        }
      );
    }
  }
  getFiles() {
    this._uploadFileService.getFiles().subscribe((files) => {
      console.log(files);
    });
  }
  showImage() {
    this._uploadFileService.showImage().subscribe((v) => {
      /* this.img = v; */
    });
  }
  openCreatePostDialog() {
    const dialogRef = this._dialog.open(CreatePostDialogComponent, {
      width: 'auto',
    });
  }
  navigateTo(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
    element.focus();
  }
  onClickRepUser(username: string, replyInputElement: HTMLInputElement) {
    replyInputElement.value = username + ` `;
    replyInputElement.focus();
    replyInputElement.select();
  }
  selectNewReact(oldEle: HTMLElement, newEle: HTMLElement) {
    const cloneNewEle = newEle.cloneNode(false);
    console.log(cloneNewEle);
    /* cloneNewEle.setAttribute(
      'style',
      `width: ${oldEle.offsetWidth}px; height: ${oldEle.offsetHeight}px`
    ); */
    oldEle.replaceWith(cloneNewEle);
  }
  focusReplyBox(event: MouseEvent) {
    const parentElement = document.querySelector('.story-react__reply-box');
    const siblingElement = document.querySelector('.story-react__react-box');
    const sendBtn = document.querySelector('.send-btn');
    siblingElement?.classList.add('hidden');
    parentElement?.classList.add('open');
    sendBtn?.classList.add('show');
    window.addEventListener('click', (e) => {
      if (e.target !== event.target) {
        siblingElement?.classList.remove('hidden');
        sendBtn?.classList.remove('show');
        siblingElement?.classList.add('story-react__react-box--fadeIn');
        parentElement?.classList.remove('open');
      }
    });
  }
  showStoryFull(storyFullElement: HTMLElement) {
    storyFullElement.style.display = 'block';
  }
  selectReactIcon(
    event: MouseEvent,
    reactIconTemplateRef: HTMLElement,
    name: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    const reactBtnWrap = reactIconTemplateRef.parentElement?.previousSibling;
    const reactName = this.renderer.createElement('p');
    const reactNameValue = this.renderer.createText(name);
    this.renderer.addClass(reactName, 'react-name');
    this.renderer.addClass(reactName, `react-name--${name}`);
    this.renderer.appendChild(reactName, reactNameValue);
    const reactIconClone = reactIconTemplateRef.cloneNode();
    this.renderer.setStyle(
      reactIconClone,
      'animation',
      'zoom-in-zoom-out 0.4s ease-out backwards'
    );
    reactBtnWrap?.childNodes.item(0).replaceWith(reactIconClone);
    reactBtnWrap?.childNodes.item(1).replaceWith(reactName);
    const reactBtnWrapHover = document.querySelector(
      '.react-btn__list .react-btn__item:hover .react-box'
    );
    this.renderer.addClass(reactBtnWrapHover, 'react-box--hidden');
    setTimeout(() => {
      this.renderer.removeClass(reactBtnWrapHover, 'react-box--hidden');
    }, 100);
  }
  unselectReact(reactBtnItem: HTMLElement) {
    const reactBtnWrap = reactBtnItem.firstChild;
    const reactIcon = reactBtnWrap?.firstChild;
    const likeBtnIcon = this.renderer.createElement('i');
    const reactNameValue = this.renderer.createText('Like');
    this.renderer.addClass(likeBtnIcon, 'like-btn-icon');
    const reactName = this.renderer.createElement('p');
    this.renderer.addClass(reactName, 'react-name');
    this.renderer.appendChild(reactName, reactNameValue);
    if (reactIcon) {
      reactBtnWrap?.childNodes.item(0).replaceWith(likeBtnIcon);
      reactBtnWrap?.childNodes.item(1).replaceWith(reactName);
    }
  }
  onClickImage(idx: number, srcList: string[], type: 'story' | 'post') {
    if (type === 'post') {
      this.isShowPostFull = true;
    }
    const el: HTMLElement = this.firstElement.nativeElement;
    console.log(el);
    const imageContainer = document.getElementById(
      'post-image-detail__container'
    );
    console.log(imageContainer);
    console.log(this.postImageDetailContainer);
    this.ref.nativeElement = document.getElementById(
      'post-image-detail__container'
    );
    srcList.forEach((src, index) => {
      const imgEle = this.renderer.createElement('img');
      this.renderer.setAttribute(imgEle, 'src', src);
      this.renderer.setStyle(imgEle, 'opacity', 0);
      this.renderer.appendChild(imageContainer, imgEle);
      this.renderer.setAttribute(imgEle, 'id', `image-detail-${index}`);
      if (idx === index) {
        this.renderer.setStyle(imgEle, 'opacity', 1);
      }
    });
  }
  moveImage(action: '+' | '-') {
    const imageContainer = document.getElementById('image-container');
    if (imageContainer!.childNodes.length > 1) {
      let imageDetail: HTMLElement | null = null;
      let movedImage = null;
      imageContainer?.childNodes.forEach((e, i) => {
        if (
          document.getElementById(`image-detail-${i}`)!.style!.opacity === '1'
        ) {
          imageDetail = document.getElementById(`image-detail-${i}`);
          if (action == '+') {
            if (i === imageContainer.childNodes.length - 1) {
              movedImage = document.getElementById(`image-detail-0`);
            } else {
              movedImage = imageDetail!.nextSibling;
            }
          } else {
            if (i === 0) {
              movedImage = document.getElementById(
                `image-detail-${imageContainer?.childNodes.length - 1}`
              );
            } else {
              movedImage = imageDetail!.previousSibling;
            }
          }
        }
      });
      this.renderer.setStyle(movedImage, 'opacity', 1);
      this.renderer.setStyle(imageDetail, 'opacity', 0);
    }
  }
}
