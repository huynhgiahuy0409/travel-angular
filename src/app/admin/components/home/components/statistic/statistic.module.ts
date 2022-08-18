import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '', component: StatisticComponent, children: [
      {
        path: '', redirectTo: 'bar-chart', pathMatch: "full"
      },
      {
        path: 'bar-chart', component: BarChartComponent
      },
    ]
  }
]
@NgModule({
  declarations: [
    StatisticComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),
    NgChartsModule
  ]
})
export class StatisticModule { }
