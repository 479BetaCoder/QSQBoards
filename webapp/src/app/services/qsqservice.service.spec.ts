import { TestBed } from '@angular/core/testing';

import { QsqserviceService } from './qsqservice.service';

describe('QsqserviceService', () => {
  let service: QsqserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QsqserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
