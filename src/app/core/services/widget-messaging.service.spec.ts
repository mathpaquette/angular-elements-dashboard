import { TestBed, inject } from '@angular/core/testing';

import { WidgetMessagingService } from './widget-messaging.service';

describe('WidgetMessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetMessagingService]
    });
  });

  it('should be created', inject([WidgetMessagingService], (service: WidgetMessagingService) => {
    expect(service).toBeTruthy();
  }));
});
