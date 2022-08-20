import { startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReviewPostResponse } from 'src/app/shared/models/response';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { FilterJourneyPost, FilterReviewPost } from 'src/app/shared/models/model';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  providers: [FilterPostService]
})
export class BarChartComponent implements OnInit {
  dateRangeGroup!: FormGroup
  reviewPosts!: ReviewPostResponse[]
  public barChartType: ChartType = 'bar';
  public barChartData!: ChartData<'bar'>;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  constructor(
    private fb: FormBuilder,
    private reviewPostService: ReviewPostService,
    private journeyPostService: JourneyPostService
    ){
    this.dateRangeGroup = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }
  ngOnInit(): void {
    this.dateRangeGroup.valueChanges.subscribe(v => {
      console.log(v);
      
      if(v.start && v.end){
        let sDate: Date = v.start
        let dDate: Date = v.end
        let initFilterPost: FilterReviewPost | FilterJourneyPost = {
          createDateRange: [sDate.getTime(),dDate.getTime()]
        }
        let reviewPosts$ = this.reviewPostService.findAll(initFilterPost)
        let journeyPost$ = this.journeyPostService.findAll(initFilterPost)
        forkJoin([reviewPosts$, journeyPost$]).subscribe(response => {
          console.log(response);
          
          let reviewPostData = []
          let journeyPostData = []
          for (let index = 0; index < 12; index++) {
            let reviewPostsByMonth = response[0].filter(reviewPost => {
              let postMonth =  new Date(reviewPost.createdDate).getMonth();
              return postMonth === index
            })
            let journeyPostsByMonth = response[1].filter(journeyPost => {
              let postMonth =  new Date(journeyPost.createdDate).getMonth();
              return postMonth === index
            })
            reviewPostData.push(reviewPostsByMonth.length)
            journeyPostData.push(journeyPostsByMonth.length)
          }
          this.barChartData = {
            labels: [ 'Tháng 1', 'Tháng 2', 'Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12',],
            datasets: [
              { data: reviewPostData, label: 'Bài viết đánh giá' },
              { data: journeyPostData, label: 'Bài viết tìm kiếm người đi cùng'}
            ]
          };
          this.barChartOptions = {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `BIỂU ĐỒ CỘT SO SÁNH SỐ BÀI VIẾT TỪ ${sDate.toLocaleDateString()} - ${dDate.toLocaleDateString()}`
            }
            }
          };

        })
      
      }
    })
    
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
