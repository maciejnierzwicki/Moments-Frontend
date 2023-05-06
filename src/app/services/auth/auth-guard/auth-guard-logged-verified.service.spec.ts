import { TestBed } from '@angular/core/testing';

import { AuthGuardLoggedVerifiedService } from './auth-guard-logged-verified.service';

describe('AuthGuardLoggedVerifiedService', () => {
  let service: AuthGuardLoggedVerifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardLoggedVerifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
