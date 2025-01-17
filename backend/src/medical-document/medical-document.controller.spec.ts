import { Test, TestingModule } from '@nestjs/testing';
import { MedicalDocumentController } from './medical-document.controller';

describe('MedicalDocumentController', () => {
  let controller: MedicalDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalDocumentController],
    }).compile();

    controller = module.get<MedicalDocumentController>(MedicalDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
