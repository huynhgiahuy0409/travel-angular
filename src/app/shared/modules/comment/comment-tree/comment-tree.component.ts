import { REVIEW_POST_TYPE } from './../../../models/constant';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostCommentResponse, UserProfileResponse } from 'src/app/shared/models/response';
import { CommentService } from 'src/app/user/services/comment.service';
import { FilterComment } from 'src/app/shared/models/model';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit {
  @Input()
  postComment!: PostCommentResponse
  currUser$!: Observable<UserProfileResponse>
  @Input()
  postType!: string
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  viewMorePostComments(postCommentId: number, postType: string){
    let currFilterComment: FilterComment = this.commentService.postCommentFilterBSub.value
    currFilterComment.postId  = postCommentId
    currFilterComment.pageable!.pageSize = 10
    this.commentService.postCommentFilterBSub.next(currFilterComment)
    this.commentService.findPostComment(currFilterComment, postType).subscribe(
      commentPost => {
        this.postComment.comments = this.postComment.comments.concat(commentPost.comments)
        this.postComment.postCommentTotal = commentPost.postCommentTotal
      }
    )
  }
}
