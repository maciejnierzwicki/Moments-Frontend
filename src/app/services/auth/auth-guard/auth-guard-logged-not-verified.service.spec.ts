import { TestBed } from '@angular/core/testing';

import { AuthGuardLoggedNotVerifiedService } from './auth-guard-logged-not-verified.service';

describe('AuthGuardLoggedNotVerifiedService', () => {
  let service: AuthGuardLoggedNotVerifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardLoggedNotVerifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
