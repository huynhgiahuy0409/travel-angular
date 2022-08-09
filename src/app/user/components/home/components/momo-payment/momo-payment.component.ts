import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyPostResponse } from 'src/app/shared/models/response';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';

@Component({
  selector: 'app-momo-payment',
  templateUrl: './momo-payment.component.html',
  styleUrls: ['./momo-payment.component.scss']
})
export class MomoPaymentComponent implements OnInit {
  myAngularxQrCode = `2|99|0776425942|0|0|0|0|20000|"Thanh toan hoa don"`;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private journeyPostService: JourneyPostService) { }
  journeyPost!: JourneyPostResponse
  ngOnInit(): void {
    let journeyPostId = this.activatedRoute.snapshot.params.id
    this.journeyPostService.findById(journeyPostId).subscribe(response => {
      this.journeyPost = response
      this.myAngularxQrCode = `2|99|${response.momoPhone}|0|0|0|0|${response.journeyInfo.totalPayment}|${response.momoContent}`;
    }, error => {
      console.log("lỗi");
    })
  }

}
