import { TestBed } from '@angular/core/testing';

import { MockRegisterService } from './mock-register.service';

describe('MockRegisterService', () => {
  let service: MockRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
