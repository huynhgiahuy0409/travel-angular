import { ReviewPostDetailComponent } from './components/post-detail/components/review-post-detail/review-post-detail.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'home'
        , loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
      },
    ],
  },
  { path: 'settings', loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'blog', loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule) },
  { path: 'creation', loadChildren: () => import('./components/creation/creation.module').then(m => m.CreationModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
