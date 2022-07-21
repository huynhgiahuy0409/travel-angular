import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent } from './messenger.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';


@NgModule({
  declarations: [
    MessengerComponent,
    UserListComponent,
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    MessengerRoutingModule
  ]
})
export class MessengerModule { }
