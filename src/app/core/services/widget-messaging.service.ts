import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {WidgetMessage} from '../interfaces/widget-message';
import {BaseWidgetComponent} from '../common/base-widget.component';
import {NgElement, WithProperties} from '@angular/elements';

@Injectable({
  providedIn: 'root'
})
export class WidgetMessagingService {

  private readonly _message: Subject<WidgetMessage>;

  constructor() {
    this._message = new Subject<WidgetMessage>();
  }

  public register(widget: NgElement & WithProperties<BaseWidgetComponent>): void {
    this._message.subscribe(x => {
      widget.messageIn = x;
    });

    widget.addEventListener('messageOut', (x: CustomEvent<WidgetMessage>) => {
      this._message.next(x.detail);
    });

    // TODO: what to do here
    widget.addEventListener('onDestroy', x => {
      this.unregister(widget);
    });
  }

  private unregister(widget: NgElement & WithProperties<BaseWidgetComponent>): void {
    // release resources to avoid memory leaks
  }
}
