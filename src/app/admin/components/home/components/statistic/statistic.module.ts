import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

const routes: Routes = [
  {
    path: '', component: StatisticComponent, children: [
      {
        path: '', redirectTo: 'bar-chart', pathMatch: "full"
      },
      {
        path: 'bar-chart', component: BarChartComponent
      },
      {
        path: 'pie-chart', component: PieChartComponent
      },
    ]
  }
]
@NgModule({
  declarations: [
    StatisticComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StatisticModule { }
 