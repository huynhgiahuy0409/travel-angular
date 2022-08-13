import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpsComponent } from './helps.component';
import { ReputationComponent } from './reputation/reputation.component';

const routes: Routes = [{ path: '', component: HelpsComponent, children: [
  {
    path: 'reputation', component: ReputationComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpsRoutingModule { }
