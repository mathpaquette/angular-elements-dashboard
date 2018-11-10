import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {BaseWidgetComponent} from '../../core/common/base-widget.component';
import {Subscription} from 'rxjs';

@Component({
  // selector: 'app-dashboard-tile',
  templateUrl: './dashboard-tile.component.html',
  styleUrls: ['./dashboard-tile.component.css']
})
export class DashboardTileComponent extends BaseWidgetComponent implements OnInit, OnDestroy {
  @Input() a: number;
  @Input() b: number;
  @Input() c: number;

  data: object = {};

  private subscription: Subscription;

  ngOnInit() {
    this.data = [
      {
        name: 'a',
        value: this.a
      },
      {
        name: 'b',
        value: this.b
      },
      {
        name: 'c',
        value: this.c
      }
    ];

    this.subscription = this.on('lazy-click').subscribe(x => {
      debugger;
      console.log(x);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
