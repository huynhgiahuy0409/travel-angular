import { forkJoin, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';
import { ReviewPostService } from 'src/app/user/services/review-post.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  public pieChartData!: ChartData<'pie', number[], string | string[]>
  public pieChartOptions!: ChartConfiguration['options']
  public pieChartType: ChartType = 'pie';
  constructor(private reviewPostService: ReviewPostService, private journeyPostService: JourneyPostService) { }

  ngOnInit(): void {
    let totalReviewPost$: Observable<number> = this.reviewPostService.countAll()
    let totalJourneyPost$: Observable<number> = this.journeyPostService.countAll()
    forkJoin([totalReviewPost$, totalJourneyPost$]).subscribe(response => {
      this.pieChartData = {
        labels: [ "Bài đánh giá", "Bài tìm kiếm người đi cùng" ],
        datasets: [ {
          data: [ response[0], response[1] ]
        } ]
      };
      this.pieChartOptions = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `BIỂU ĐỒ TRÒN TỈ LỆ CÁC LOẠI BÀI VIẾT`
        }
        }
      };
    })
  }

}
