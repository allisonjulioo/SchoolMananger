import { TestBed } from '@angular/core/testing';

import { HttpUtilServiceService } from './http-util-service.service';

describe('HttpUtilServiceService', () => {
  let service: HttpUtilServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUtilServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
