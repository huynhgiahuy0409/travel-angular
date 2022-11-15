import { concatMap, filter } from 'rxjs/operators';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, concat } from 'rxjs';
import { CommentResponse, UserProfileResponse } from 'src/app/shared/models/response';
import { UserService } from 'src/app/user/services/user.service';
import { CommentService } from 'src/app/user/services/comment.service';
import { CommentRequest } from 'src/app/shared/models/request';
import { FormControl } from '@angular/forms';
import { FilterComment } from 'src/app/shared/models/model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input()
  comment!: CommentResponse
  currUser$!: Observable<UserProfileResponse | null>
  isReply = false
  @Input()
  isRoot = false
  /* $ */
  filterChildCommentBSub: BehaviorSubject<FilterComment> = new BehaviorSubject<FilterComment>({
    pageable: {
      pageIndex: 0,
      pageSize: 5,
      sortable: {
        dir: "DESC",
        order: 'createdDate'
      }
    },
  })
  filterChildComment$ = this.filterChildCommentBSub.asObservable()
  constructor(private userService: UserService, public directLinkService: DirectLinkService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.currUser$ = this.userService.user$
    const {user} = this.comment
    const {avatar} = user
    let currFilterChildComment: FilterComment = this.filterChildCommentBSub.value
    currFilterChildComment.parentCommentId = this.comment.id
    this.filterChildCommentBSub.next(currFilterChildComment)
    this.filterChildComment$.pipe(
      concatMap(filter => {
        return this.commentService.findChildComments(filter)
      })
    ).subscribe(response => {
      this.comment.comments = this.comment.comments? this.comment.comments.concat(response) : response
      console.log(this.comment);
    }) 
  }
  onClickReply(){
    this.isReply = true
  }
  findChildComments(){
    if(this.isReply === true){
      let currFilterChildComment: FilterComment = this.filterChildCommentBSub.value
      currFilterChildComment.pageable!.pageIndex++
      this.filterChildCommentBSub.next(currFilterChildComment)
    }else{
      this.isReply = true
    }
  }
  getAvatarDirectLink(user: UserProfileResponse){
    let directLink = ''
    if(user){
      if(user.avatar){
        directLink = this.directLinkService.getDirectLinkAvatar(user.id, user.avatar.name, user.avatar.ext)
      }else{
        directLink = this.directLinkService.getDefaultAvatarURL(user.gender)
      }
    }
    return directLink
  }
  commentContentCtrl: FormControl = new FormControl('')
  replyAComment(userId: number, parentComment: CommentResponse){
    console.log(parentComment);
    let commentRequest: CommentRequest = {
      byUserId: userId,
      content: this.commentContentCtrl.value
    }
    this.commentService.updateParentComment(commentRequest, parentComment.id).subscribe(
      commentResponse => {
        if(parentComment.comments){
          parentComment.comments.unshift(commentResponse)
        }else{
          parentComment.comments = [commentResponse]
        }
        this.commentContentCtrl.reset()
      }
    )
  }
}
