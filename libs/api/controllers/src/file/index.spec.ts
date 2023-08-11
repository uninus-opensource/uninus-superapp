import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './index';

describe('FileController', () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [{
        provide: 'FILE_SERVICE',
        useValue:{
          send: jest.fn(()=>{
            return
          })
        }
      }]
    }).compile();

    controller = module.get<FileController>(FileController);
  });
  // MUST TEST BY END 2 END TEST
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
