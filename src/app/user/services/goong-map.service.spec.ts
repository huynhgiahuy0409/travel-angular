import { TestBed } from '@angular/core/testing';

import { GoongMapService } from './goong-map.service';

describe('GoongMapService', () => {
  let service: GoongMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoongMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
