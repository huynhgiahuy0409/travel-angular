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
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
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
  id: number,
  user: {
    username: string;
    avatarUrl: string;
  };
  content: string;
  images: {
    url: string;
    type: string;
  }[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  posts: Post[] = [
    {
      id: 1,
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-1.png',
      },
      content: '',
      images: [
        {
          url: 'assets/image/feed-image-1.png',
          type: 'image',
        },
      ],
    },
    {
      id: 2,
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-2.png',
      },
      content: '',
      images: [
        {
          url: 'assets/video/mov_bbb.mp4',
          type: 'video',
        },
        {
          url: 'assets/video/mov_bbb.mp4',
          type: 'video',
        },
        {
          url: 'assets/video/mov_bbb.mp4',
          type: 'video',
        },
        {
          url: 'assets/image/feed-image-1.png',
          type: 'image',
        },
      ],
    },
    {
      id: 2,
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-2.png',
      },
      content: '',
      images: [
        {
          url: 'assets/video/mov_bbb.mp4',
          type: 'video',
        },
      ],
    },
    {
      id: 3,
      user: {
        username: 'Huynh Gia Huy',
        avatarUrl: 'assets/image/member-2.png',
      },
      content: '',
      images: [
        {
          url: 'assets/video/mov_bbb.mp4',
          type: 'video',
        },
      ],
    },
  ];
  isShowStoryFull: boolean = false;
  isShowPostFull: boolean = false;
  zoom: number = 15;
  title = 'travel';
  lat = 10.924067;
  lng = 106.713028;
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
  srcReactIcons = [
    { url: 'assets/react-image/like.svg', name: 'like' },
    { url: 'assets/react-image/love.svg', name: 'love' },
    { url: 'assets/react-image/care.svg', name: 'care' },
    { url: 'assets/react-image/haha.svg', name: 'haha' },
    { url: 'assets/react-image/wow.svg', name: 'wow' },
    { url: 'assets/react-image/sad.svg', name: 'sad' },
    { url: 'assets/react-image/angry.svg', name: 'angry' },
  ];
  commentTree: Comment[] = [
    {
      user: {
        name: '??o??n Trung H???i',
        url: '84c1252b0128cf769639 - Copy (2).jpg',
      },
      content: 'This is a comment',
      comments: [
        {
          user: {
            name: 'Thanh Tr??c',
            url: '84c1252b0128cf769639 - Copy (2).jpg',
          },
          content: 'This is a comment',
          comments: [],
        },
        {
          user: {
            name: 'Phi Ho??ng',
            url: '84c1252b0128cf769639 - Copy (2).jpg',
          },
          content: 'This is a comment',
          comments: [
            {
              user: {
                name: 'Thi??n Nguy???n',
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
        name: 'H??? Ng???c Huy???n',
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
  routerUrl!: string
  @ViewChild('firstElement') firstElement!: ElementRef;
  @ViewChild('coverImageList') coverImageList!: ElementRef
  constructor(
    private _uploadFileService: UploadFileService,
    private _dialog: MatDialog,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
     this.autoNextCover()
  }

  ngOnInit(): void {
    this.routerUrl = this.router.url
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event);

        this.routerUrl = event.url
      }
    })
  }
  autoNextCover() {
    let coverIdx = 0
    setInterval(() => {
      let list = this.coverImageList.nativeElement.childNodes
      let item: HTMLElement = list[coverIdx]
      let preItem: HTMLElement = list[coverIdx - 1]
      if(coverIdx == list.length){
        coverIdx = 0
        item = list[coverIdx]
      }else if(coverIdx == 0){
        preItem = list[list.length - 1]
      }
      this.renderer.setStyle(item, "opacity", 1)
      this.renderer.setStyle(preItem, "opacity", 0)
      coverIdx++
    }, 3000)
  }
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
    this._uploadFileService.getFiles().subscribe((files) => { });
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
  private saveSeenStoryIndex(post: Post | null) {
    if (post !== null) {
      let preStoryIndex = this.seenStory.get(post);
      if (preStoryIndex != undefined) {
        preStoryIndex === post.images.length - 1
          ? this.seenStory.set(post, preStoryIndex)
          : this.seenStory.set(post, preStoryIndex + 1);
      }
    }
  }
  getSeenStoryIndex(post: Post): number {
    if (post !== null) {
      if (this.seenStory.has(post)) {
        let preStoryIndex = this.seenStory.get(post);
        if (preStoryIndex != undefined) {
          return post.images.length - 1 === preStoryIndex
            ? preStoryIndex
            : preStoryIndex + 1;
        }
      } else return 0;
    }
    return 0;
  }
  sltPost!: Post | null;
  postSltImageIndex!: number;
  sltStory!: Post | null;
  storyIndex!: number;
  seenStory = new Map<Post, number>();
  @ViewChild('postImageDetailContainer', { static: true })
  postImageDetailContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('storyImageDetailContainer', { static: true })
  storyImageDetailContainer!: ElementRef<HTMLDivElement>;
  displayPost(idx: number, post: Post, type: 'story' | 'post') {
    let container!: ElementRef<HTMLDivElement>;
    if (type == 'post') {
      this.sltPost = post;
      this.sltStory = null;
      this.postSltImageIndex = idx;
      container = this.postImageDetailContainer;
    } else if (type === 'story') {
      this.sltStory = post;
      this.sltPost = null;
      this.storyIndex = idx;
      container = this.storyImageDetailContainer;
      if (this.sltStory) {
        if (this.seenStory.has(post)) {
          this.saveSeenStoryIndex(post);
        } else {
          this.seenStory.set(post, 0);
        }
        this.addStoryProgressBar(post);
      }
    }
    container.nativeElement.innerHTML = '';
    if (
      (type == 'post' && this.sltPost) ||
      (type == 'story' && this.sltStory)
    ) {
      post.images.forEach((src, index) => {
        let itemElement;
        if (src.type == 'image') {
          itemElement = this.renderer.createElement('img');
          this.renderer.setAttribute(itemElement, 'src', src.url);
        } else if (src.type == 'video') {
          itemElement = this.renderer.createElement('video');
          let sourceElement = this.renderer.createElement('source');
          this.renderer.setAttribute(sourceElement, 'src', src.url);
          this.renderer.setAttribute(sourceElement, 'type', 'video/mp4');
          this.renderer.appendChild(itemElement, sourceElement);
        }
        this.renderer.setAttribute(itemElement, 'id', `image-detail-${index}`);
        this.renderer.appendChild(container.nativeElement, itemElement);
        if (index === this.postSltImageIndex && type == 'post') {
          this.renderer.setAttribute(itemElement, 'controls', 'true');
          this.renderer.addClass(itemElement, 'visible');
          src.type === 'video' ? itemElement.play() : null;
        } else if (index === this.seenStory.get(post) && type == 'story') {
          this.renderer.addClass(itemElement, 'visible');
          this.renderer.setAttribute(itemElement, 'muted', 'true');
          src.type === 'video' ? itemElement.play() : null;
        }
      });
      if (type == 'story') {
        this.addStoryProgressBar(post);
      }
    }
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
    let seenStoryIndex = this.seenStory.get(post) || 0;
    let type = post.images[seenStoryIndex].type;
    let barLiveElement = this.renderer.createElement('div');
    this.renderer.addClass(barLiveElement, 'my-progress-bar__live');
    let barElement =
      this.progressBarContainer.nativeElement.childNodes.item(seenStoryIndex);
    if (type == 'image') {
      this.renderer.setProperty(barLiveElement, 'animation-duration', '15s');
    } else if (type == 'video') {
      this.renderer.setStyle(barLiveElement, 'animation-duration', `10s`);
    }
    this.renderer.appendChild(barElement, barLiveElement);
    this.renderer.addClass(barElement, 'active');
  }

  movePost(action: '+' | '-') {
    let imageElements;
    let movedImageElement;
    imageElements = this.postImageDetailContainer.nativeElement.childNodes;
    let imageElementsLength = imageElements.length;
    if (imageElements && imageElements.length > 1) {
      imageElements.forEach((e, index) => {
        const imageElement = document.getElementById(
          `image-detail-${index}`
        ) as HTMLElement;
        if (imageElement?.classList.contains('visible')) {
          this.renderer.removeClass(imageElement, 'visible');
          if (action == '+') {
            movedImageElement =
              index === imageElementsLength - 1
                ? document.getElementById(`image-detail-0`)
                : imageElement.nextSibling;
            if (movedImageElement!.nodeName === 'VIDEO') {
              const tempMovedImagElement =
                movedImageElement as HTMLVideoElement;
              this.renderer.setAttribute(tempMovedImagElement, 'controls', 'true')
              tempMovedImagElement.play();
            }
            if (imageElement.nodeName === 'VIDEO') {
              const tempImagElement = imageElement as HTMLVideoElement;
              tempImagElement.currentTime = 0;
              tempImagElement.pause();
            }
          } else {
            movedImageElement =
              index === 0
                ? document.getElementById(
                  `image-detail-${imageElementsLength - 1}`
                )
                : imageElement.previousSibling;
            if (movedImageElement!.nodeName === 'VIDEO') {
              const tempMovedImagElement =
                movedImageElement as HTMLVideoElement;
              this.renderer.setAttribute(tempMovedImagElement, 'controls', 'true')
              tempMovedImagElement.play();
            }
            if (imageElement.nodeName === 'VIDEO') {
              const tempImagElement = imageElement as HTMLVideoElement;
              tempImagElement.currentTime = 0;
              tempImagElement.pause();
            }
          }
        }
      });
      this.renderer.addClass(movedImageElement, 'visible');
    }
  }
  isPauseStory: boolean = false;
  moveStory(action: '+' | '-') {
    let movedImageElement!: HTMLElement;
    let imageElements = this.storyImageDetailContainer.nativeElement.childNodes;
    if (imageElements) {
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
              movedImageElement = imageElement.nextSibling as HTMLElement;
              this.moveBar(action, this.sltStory);
              this.saveSeenStoryIndex(this.sltStory);
              if (movedImageElement.nodeName === 'VIDEO') {
                const tempMovedImagElement =
                  movedImageElement as HTMLVideoElement;
                tempMovedImagElement.play();
              }
              if (imageElement.nodeName === 'VIDEO') {
                const tempImagElement = imageElement as HTMLVideoElement;
                tempImagElement.currentTime = 0;
                tempImagElement.pause();
              }
            }
          } else {
            if (index === 0) {
              idx = -1;
            } else {
              movedImageElement = imageElement.previousSibling as HTMLElement;
              this.moveBar(action, this.sltStory);
              this.saveSeenStoryIndex(this.sltStory);
              if (movedImageElement.nodeName === 'VIDEO') {
                const tempMovedImagElement =
                  movedImageElement as HTMLVideoElement;
                tempMovedImagElement.play();
              }
              if (imageElement.nodeName === 'VIDEO') {
                const tempImagElement = imageElement as HTMLVideoElement;
                tempImagElement.currentTime = 0;
                tempImagElement.pause();
              }
            }
          }
        }
      });
      if (idx === imageElements.length - 1 && action == '+') {
        this.displayPost(
          this.storyIndex + 1,
          this.posts[this.storyIndex + 1],
          'story'
        );
      } else if (idx === -1 && action == '-') {
        this.displayPost(
          this.storyIndex - 1,
          this.posts[this.storyIndex - 1],
          'story'
        );
      } else {
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
      this.postImageDetailContainer.nativeElement.innerHTML = '';
    } else if (type === 'story') {
      this.sltStory = null;
      this.storyImageDetailContainer.nativeElement.innerHTML = '';
    }
  }
  @ViewChild('storyVideoPlayBtnIcon', { static: true })
  storyVideoPlayBtnIcon!: ElementRef;
  storyPlayPause() {
    this.storyImageDetailContainer.nativeElement.childNodes.forEach((e, i) => {
      const temp = e as HTMLElement;
      if (temp.classList.contains('visible') && temp.nodeName === 'VIDEO') {
        const videoEl = temp as HTMLVideoElement;
        if (videoEl.paused) {
          videoEl.play();
          this.isPauseStory = false;
        } else {
          videoEl.pause();
          this.isPauseStory = true;
        }
      }
    });
  }
  isMutedStory: boolean = false
  storyMuteUnmute() {
    this.storyImageDetailContainer.nativeElement.childNodes.forEach((e, i) => {
      const temp = e as HTMLElement;
      if (temp.classList.contains('visible') && temp.nodeName === 'VIDEO') {
        const videoEl = temp as HTMLVideoElement;
        if (videoEl.muted) {
          this.isMutedStory = false;
          videoEl.muted = false
        } else {
          this.isMutedStory = true;
          videoEl.muted = true
        }
        console.log(this.isMutedStory)
      }
    });
  }
}
