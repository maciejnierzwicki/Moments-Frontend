import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NewPostService } from './newpost.service';

describe('NewPostService', () => {
  let service: NewPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(NewPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
