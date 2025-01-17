import { Test, TestingModule } from '@nestjs/testing';
import { MedicalDocumentService } from './medical-document.service';

describe('MedicalDocumentService', () => {
  let service: MedicalDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalDocumentService],
    }).compile();

    service = module.get<MedicalDocumentService>(MedicalDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
