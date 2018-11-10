import { Component, OnInit, Input } from '@angular/core';
import {BaseWidgetComponent} from '../core/common/base-widget.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-lazy-dashboard-tile',
  templateUrl: './lazy-dashboard-tile.component.html',
  styleUrls: ['./lazy-dashboard-tile.component.css']
})
export class LazyDashboardTileComponent extends BaseWidgetComponent implements OnInit {
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

    this.subscription = this.on('click').subscribe(x => {
      debugger;
      console.log(x);
    });
  }
}

