import {EventEmitter, Input} from '@angular/core';
import {Output} from '@angular/core';
import {WidgetMessage} from '../interfaces/widget-message';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

export class BaseWidgetComponent {
  private readonly _message: Subject<WidgetMessage>;

  constructor() {
    this._message = new Subject<WidgetMessage>();
    this.messageOut = new EventEmitter<WidgetMessage>();
  }

  @Input()
  set messageIn(message: WidgetMessage) {
    this._message.next(message);
  }

  @Output() messageOut: EventEmitter<WidgetMessage>;

  protected on(messageType: string): Observable<WidgetMessage> {
    return this._message.pipe(filter(x => x.type === messageType));
  }

  protected publish(messageType: string, payload: string): void {
    this.messageOut.emit({sender: this, type: messageType, payload: payload});
  }
}
