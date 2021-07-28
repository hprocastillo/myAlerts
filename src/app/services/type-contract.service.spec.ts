import { TestBed } from '@angular/core/testing';

import { TypeContractService } from './type-contract.service';

describe('TypeContractService', () => {
  let service: TypeContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
