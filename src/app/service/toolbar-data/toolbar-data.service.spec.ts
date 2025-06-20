import { TestBed } from '@angular/core/testing';

import { ToolbarDataService } from './toolbar-data.service';

describe('ToolbarDataService', () => {
  let service: ToolbarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
