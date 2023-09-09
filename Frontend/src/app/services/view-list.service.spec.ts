import { TestBed } from '@angular/core/testing';

import { ViewListService } from './view-list.service';

describe('ViewListService', () => {
  let service: ViewListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
