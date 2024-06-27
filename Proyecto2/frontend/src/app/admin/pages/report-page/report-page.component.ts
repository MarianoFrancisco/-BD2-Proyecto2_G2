import { Component, OnInit, inject } from '@angular/core';
import { Subscription, switchMap, take } from 'rxjs';
import { TopService } from '../../service/top.service';
import { ColorHelper, LegendPosition } from '@swimlane/ngx-charts';

interface TopData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styles: ``
})
export class ReportPageComponent implements OnInit {

  private topService = inject(TopService);

  private topSub?: Subscription;

  public isReady: boolean = false;
  public lp: LegendPosition = LegendPosition.Below;
  public data: TopData[] = [];

  ngOnInit(): void {
    this.topSub = this.topService.getTop().pipe(
      switchMap(() => this.topService.top5()),
      take(1)
    ).subscribe({
      next: (top) => {
        this.isReady = true;
        top.forEach((value) => {
          this.data.push({ name: value.titulo, value: value.totalCantidad });
        });
      }
    });
  }

}
