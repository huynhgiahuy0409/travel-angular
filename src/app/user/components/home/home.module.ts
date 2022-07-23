import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedHeaderModule, SharedMaterialModule } from 'src/app/shared/modules';
import { ReviewPostsComponent } from './components/review-posts/review-posts.component';
import { UserPostComponent } from './components/user-post/user-post.component';



@NgModule({
    declarations: [HomeComponent, ReviewPostsComponent, UserPostComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        SharedHeaderModule
    ]
})
export class HomeModule { }
