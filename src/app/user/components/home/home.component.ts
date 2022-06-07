import { filter } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
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
export interface Post {
  user: {
    username: string;
    avatarUrl: string;
  };
  content: string;
  images: string[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  posts: Post[] = [
    {
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-1.png',
      },
      content: '',
      images: ['assets/image/feed-image-1.png'],
    },
    {
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-1.png',
      },
      content: '',
      images: [
        'assets/image/feed-image-1.png',
        'assets/image/feed-image-2.png',
      ],
    },
    {
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-1.png',
      },
      content: '',
      images: [
        'assets/image/feed-image-1.png',
        'assets/image/feed-image-2.png',
        'assets/image/feed-image-3.png',
      ],
    },
    {
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-1.png',
      },
      content: '',
      images: [
        'assets/image/feed-image-1.png',
        'assets/image/feed-image-2.png',
        'assets/image/feed-image-3.png',
        'assets/image/feed-image-4.png',
      ],
    },
    {
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-1.png',
      },
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
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-1.png',
      },
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
    private renderer: Renderer2
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
    this._uploadFileService.getFiles().subscribe((files) => {});
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
  private setNewStoryIndex(post: Post | null) {
    if (post !== null) {
      let preStoryIndex = this.seenStory.get(post);
      if (preStoryIndex != undefined) {
        this.seenStory.set(post, preStoryIndex + 1);
      }
    }
  }
  sltPost!: Post | null;
  postSltImageIndex!: number;
  storyIndex!: number;
  sltStory!: Post | null;
  storySltImageIndex!: number;
  seenStory = new Map<Post, number>();
  @ViewChild('postImageDetailContainer', { static: true })
  postImageDetailContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('storyImageDetailContainer', { static: true })
  storyImageDetailContainer!: ElementRef<HTMLDivElement>;
  displayPost(idx: number, post: Post, type: 'story' | 'post') {
    let container!: ElementRef<HTMLDivElement>;
    if (type == 'post') {
      this.sltPost = post;
      this.postSltImageIndex = idx;
      container = this.postImageDetailContainer;
    } else if (type === 'story') {
      this.sltStory = post;
      console.log(this.sltStory);
      this.storyIndex = idx;
      container = this.storyImageDetailContainer;
      if (this.seenStory.has(post)) {
        this.setNewStoryIndex(post);
      } else {
        this.seenStory.set(post, 0);
      }
    }
    container.nativeElement.innerHTML = '';
    post.images.forEach((src, index) => {
      const imgEle = this.renderer.createElement('img');
      this.renderer.setAttribute(imgEle, 'src', src);
      this.renderer.appendChild(container.nativeElement, imgEle);
      this.renderer.setAttribute(imgEle, 'id', `image-detail-${index}`);
      if (index === this.postSltImageIndex && type == 'post') {
        this.renderer.addClass(imgEle, 'visible');
      } else if (index === this.seenStory.get(post) && type == 'story') {
        this.renderer.addClass(imgEle, 'visible');
      }
    });
    this.addStoryProgressBar(post);
  }
  @ViewChild('progressBarContainer', { static: true })
  progressBarContainer!: ElementRef<HTMLElement>;
  private addStoryProgressBar(post: Post) {
    this.progressBarContainer.nativeElement.innerHTML = '';
    post.images.forEach((src, index) => {
      const barElement = this.renderer.createElement('div');
      this.renderer.addClass(barElement, 'my-progress-bar__item');
      this.renderer.setAttribute(barElement, 'id', `bar-${index}`);
      this.renderer.appendChild(
        this.progressBarContainer.nativeElement,
        barElement
      );
    });
    let barLiveElement = this.renderer.createElement('div');
    this.renderer.addClass(barLiveElement, 'my-progress-bar__live');
    let currentBar = this.progressBarContainer.nativeElement.childNodes.item(
      this.seenStory.get(post) || 0
    );
    this.renderer.appendChild(currentBar, barLiveElement);
    this.renderer.addClass(currentBar, 'active');
  }
  moveImage(action: '+' | '-', type: 'story' | 'post') {
    let imageElements;
    let movedImageElement;
    if (type == 'post') {
      imageElements = this.postImageDetailContainer.nativeElement.childNodes;
    } else if (type === 'story') {
      imageElements = this.storyImageDetailContainer.nativeElement.childNodes;
    }
    if (imageElements && imageElements.length > 1) {
      let idx: number = -1;
      imageElements.forEach((e, index) => {
        const imageElement = document.getElementById(`image-detail-${index}`);
        if (imageElement?.classList.contains('visible')) {
          this.renderer.removeClass(imageElement, 'visible');
          idx = index;
          if (action == '+') {
            if (index === imageElements.length - 1) {
              idx = imageElements.length - 1;
            } else {
              movedImageElement = imageElement.nextSibling;
              this.moveBar(action, this.sltStory);
              this.setNewStoryIndex(this.sltStory);
            }
          } else if (action == '-') {
            if (index === 0) {
              idx = -1;
            } else {
              movedImageElement = imageElement.previousSibling;
              this.moveBar(action, this.sltStory);
              this.setNewStoryIndex(this.sltStory);
            }
          }
        }
      });
     
      if(idx === imageElements.length - 1 && action == '+'){
        this.displayPost(
          this.storyIndex + 1,
          this.posts[this.storyIndex + 1],
          'story'
        );
      }else if(idx === -1 && action == '-'){
        this.displayPost(
          this.storyIndex - 1,
          this.posts[this.storyIndex - 1],
          'story'
        );
      }else {
        this.renderer.addClass(movedImageElement, 'visible');
      }
    }
  }
  private moveBar(action: '+' | '-', post: Post | null) {
    let currentBar;
    let movedBar;
    if (post != null) {
      this.progressBarContainer.nativeElement.childNodes.forEach((e) => {
        if (e.hasChildNodes()) {
          currentBar = e;
          currentBar!.textContent = '';
          if (action == '+') {
            movedBar = currentBar.nextSibling;
          } else {
            movedBar = currentBar.previousSibling;
          }
        }
      });
      let barLiveElement = this.renderer.createElement('div');
      this.renderer.addClass(barLiveElement, 'my-progress-bar__live');
      this.renderer.appendChild(movedBar, barLiveElement);
    }
  }
  closePost(type: 'post' | 'story') {
    if (type == 'post') {
      this.sltPost = null;
    } else if (type === 'story') {
      this.sltStory = null;
    }
  }
}
