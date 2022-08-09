import { Router } from '@angular/router';
import { filter, concatMap, debounceTime } from 'rxjs/operators';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
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
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { CreatePostDialogComponent } from '../../dialog/create-post-dialog';
import { ReviewPostComponent } from '../../../creation/components/review-post/review-post.component';
import { JourneyComponent } from '../../../creation/components/journey/journey.component';
import { FilterJourneyPost } from 'src/app/shared/models/model';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import {
  JourneyPostResponse,
  ParticipantResponse,
} from 'src/app/shared/models/response';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';
import { ParticipantService } from 'src/app/user/services/participant.service';
import { UserService } from 'src/app/user/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
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
  id: number;
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
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss'],
  providers: [FilterPostService],
})
export class JourneysComponent implements OnInit {
  currUser = this.userService.userBSub.value;
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
  /* data */
  journeyPosts: JourneyPostResponse[] = [];
  /* fg */
  searchFormGroup!: FormGroup;
  constructor(
    private _uploadFileService: UploadFileService,
    private _dialog: MatDialog,
    private renderer: Renderer2,
    private filterPostService: FilterPostService,
    public directLinkService: DirectLinkService,
    private journeyPostSerivce: JourneyPostService,
    private router: Router,
    private participantService: ParticipantService,
    private userService: UserService,
    private fb: FormBuilder,
    private progressBarService: ProgressBarService
  ) {
    this.searchFormGroup = this.fb.group({
      order: this.fb.control('title'),
      search: this.fb.control(''),
    });
    this.filterPostService.filterPost$
      .pipe(
        concatMap((filterPost) => {
          return this.journeyPostSerivce.findAll(filterPost);
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.journeyPosts = this.journeyPosts.concat(response);
        console.log(this.journeyPosts);
        setTimeout(() => {
          this.progressBarService.progressBarBSub.next(false)
        }, 500);
      }, error => {
        this.progressBarService.progressBarBSub.next(false)
      });
    this.searchFormGroup.get('search')!.valueChanges.pipe(debounceTime(1000)).subscribe((term) => {
      this.progressBarService.progressBarBSub.next(true)
      this.journeyPosts = [];
      let order = this.searchFormGroup.get('order')?.value;
      let filter: FilterJourneyPost = {
        pageable: {
          pageIndex: 0,
          pageSize: 1,
          sortable: {
            dir: "DESC",
            order: "createdDate"
          }
        }
      }
      /* customize filter */
      if(term){
        if (order == 'title') {
          filter.title = term;
        }else if (order == 'totalDay') {
          filter.totalDay = term;
        }else if (order == 'totalCost') {
          filter.totalCost = term;
        }else if (order == 'totalParticipant') {
          filter.totalParticipant = term;
        }else if (order == 'departurePlace') {
          filter.departurePlace = term;
        }
      }
      this.filterPostService.filterPostBSub.next(filter);
    });
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
  selectedFile($event: any) {
    this.selectedFiles = $event.target.files;
  }
  checkRequestJoinJourneyPost(journeyPost: JourneyPostResponse): boolean {
    let currUserId: number = this.userService.userBSub.value!.id;
    let particiPant = journeyPost.participants.find(
      (participant) => participant.user.id == currUserId
    );
    if (particiPant && particiPant.status == 1) {
      return true;
    } else if (!particiPant || particiPant.status == 0) {
      return false;
    }
    return false;
  }
  updateJourneyPostParticipant(journeyPostId: number, action: 0 | 1) {
    let requestUserId = this.userService.userBSub.value?.id;
    if (requestUserId) {
      this.participantService
        .updateJourneyPostParticipant(requestUserId, journeyPostId, action)
        .subscribe((response) => {
          if(response){
            console.log(response);
            let updatedPost = this.journeyPosts.find(
              (journeyPost) => journeyPost.id == journeyPostId
            );
            if(updatedPost){
              let participants = updatedPost.participants
              let foundParticipant = participants.find(p => p.id === response.id)
              if(foundParticipant){
                foundParticipant.status = response.status
              }else{
                participants.push(response)
              }
            }
          }else{
            console.log("not participant");

          }
        });
    }
  }
  
  upload() {
    // this.progress = 0;
    // this.currentFile = this.selectedFiles.item(0);
    // if (this.currentFile) {
    //   this._uploadFileService.upload([this.currentFile]).subscribe(
    //     (event) => {
    //       if (event.type === HttpEventType.UploadProgress && event.total) {
    //         this.progress = Math.round((100 * event.loaded) / event.total);
    //       } else if (event instanceof HttpResponse) {
    //         this.message = event.body ? event.body.message : '';
    //         this.fileInfos = this._uploadFileService.getFiles();
    //       }
    //     },
    //     (err) => {
    //       this.progress = 0;
    //       this.message = 'Could not upload the file';
    //       this.fileInfos = undefined;
    //     }
    //   );
    // }
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
    const dialogRef = this._dialog.open(JourneyComponent, {
      width: 'auto',
      height: '90vh',
    });
    dialogRef.afterClosed().subscribe((response) => {
      this.journeyPosts.unshift(response.createdJourneyPost);
      this.journeyPosts = this.journeyPosts;
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
              this.renderer.setAttribute(
                tempMovedImagElement,
                'controls',
                'true'
              );
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
              this.renderer.setAttribute(
                tempMovedImagElement,
                'controls',
                'true'
              );
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
  isMutedStory: boolean = false;
  storyMuteUnmute() {
    console.log('ok');
    this.storyImageDetailContainer.nativeElement.childNodes.forEach((e, i) => {
      const temp = e as HTMLElement;
      if (temp.classList.contains('visible') && temp.nodeName === 'VIDEO') {
        const videoEl = temp as HTMLVideoElement;
        if (videoEl.muted) {
          this.isMutedStory = false;
          videoEl.muted = false;
        } else {
          this.isMutedStory = true;
          videoEl.muted = true;
        }
        console.log(this.isMutedStory);
      }
    });
  }
  onScrollDown($event: any) {
    let currFilter: FilterJourneyPost = this.filterPostService.filterPostBSub.value;
    let pageable = currFilter.pageable;
    pageable.pageIndex++;
    this.filterPostService.filterPostBSub.next(currFilter);
  }
  dateTimeFormula(timestamp: Date) {
    return new Date(timestamp).toLocaleString();
  }
  openJourneyDetail(journeyPostId: number) {
    this.router.navigate([`/home/journey-posts/${journeyPostId}`]);
  }
  
}
