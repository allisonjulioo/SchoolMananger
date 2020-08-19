import { TestBed } from '@angular/core/testing';
import { HttpUtilsServiceService } from './http-util-service.service';

describe('HttpUtilServiceService', () => {
  let service: HttpUtilsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUtilsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
