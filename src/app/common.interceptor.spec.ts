import { TestBed } from '@angular/core/testing';

import { commonInterceptor } from './common.interceptor';

describe('commonInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      commonInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: commonInterceptor = TestBed.inject(commonInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
