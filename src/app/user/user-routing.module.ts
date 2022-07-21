import { ReviewPostDetailComponent } from './components/review-post-detail/review-post-detail.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { LoginComponent } from './components/login';
import { IdentifyComponent } from './components/identify/identify.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'home'
        , loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
      },
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'login/identify',
        component: IdentifyComponent,
      },

    ],
  },
  { path: 'settings', loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'blog', loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule) },
  { path: 'blog/:id/post/:id', component: ReviewPostDetailComponent, pathMatch: 'full' },
  { path: 'creation', loadChildren: () => import('./components/creation/creation.module').then(m => m.CreationModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
