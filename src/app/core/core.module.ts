import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidgetMessagingService} from './services/widget-messaging.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    WidgetMessagingService
  ]
})
export class CoreModule { }
