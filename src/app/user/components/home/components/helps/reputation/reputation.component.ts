import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-reputation',
  templateUrl: './reputation.component.html',
  styleUrls: ['./reputation.component.scss']
})
export class ReputationComponent implements OnInit {
  sltContent: number = 0
  tableOfContents: string[] = ["Reputation là gì?", "Chỉ số Reputation được tính toán như thế nào?"]
  @ViewChild('content1') content1!: ElementRef<HTMLElement>
  @ViewChild('content2') content2!: ElementRef<HTMLElement>
  constructor() { }

  ngOnInit(): void {
  }
  selectContent(idx: number){
    this.sltContent = idx
    if(idx == 0){
      this.content1.nativeElement.scrollIntoView({behavior: 'smooth'})
    }else if(idx == 1){
      this.content2.nativeElement.scrollIntoView({behavior: 'smooth'})
    }
  }
}
