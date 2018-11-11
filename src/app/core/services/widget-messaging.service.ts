import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {WidgetMessage} from '../interfaces/widget-message';
import {BaseWidgetComponent} from '../common/base-widget.component';
import {NgElement, WithProperties} from '@angular/elements';
import {Subscription} from '../../../../node_modules/rxjs/src/internal/Subscription';

@Injectable({
  providedIn: 'root'
})

interface WidgetSubscription {
  subscription: Subscription;
  widget: NgElement;
}

export class WidgetMessagingService {

  private readonly _message: Subject<WidgetMessage>;
  private readonly _widgetSubscriptions: Array<WidgetSubscription>;

  constructor() {
    this._message = new Subject<WidgetMessage>();
    this._widgetSubscriptions = new Array<WidgetSubscription>();
  }

  public register(widget: NgElement & WithProperties<BaseWidgetComponent>): void {
    const subscription = this._message.subscribe(x => {
      widget.messageIn = x;
    });

    widget.addEventListener('messageOut', (x: CustomEvent<WidgetMessage>) => {
      // check for removed widgets from the DOM before messaging
      // this is a workaround for unfixed issue in Angular
      // https://github.com/angular/angular/issues/14252
      this.unregisterRemovedElements();
      this._message.next(x.detail);
    });

    this._widgetSubscriptions.push({widget: widget, subscription: subscription});
  }

  private unregister(widgetSubscription: WidgetSubscription): void {
    widgetSubscription.subscription.unsubscribe();
    widgetSubscription.widget.removeAllListeners();
    this.removeWidgetSubscription(widgetSubscription);
  }

  private unregisterRemovedElements(): void {
    // element has been removed from the DOM
    const removedElements = this._widgetSubscriptions.filter(x => x.widget.parentElement === null);
    removedElements.forEach(x => this.unregister(x));
  }

  private removeWidgetSubscription(widgetSubscription: WidgetSubscription) {
    const index = this._widgetSubscriptions.indexOf(widgetSubscription, 0);
    if (index > -1) {
      this._widgetSubscriptions.splice(index, 1);
    }
  }
}
