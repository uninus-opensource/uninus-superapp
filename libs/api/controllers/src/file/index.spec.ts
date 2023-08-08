import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './index';
import { FileService } from '@uninus/api/services';
import { ConfigService } from '@nestjs/config';

describe('FileController', () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [FileService, {
        provide: ConfigService,
        useValue:{
          getOrThrow: jest.fn((key:string)=>{
            if(key=="BUCKET"){
              return "bucket-test"
            }else if(key=="REGION"){
              return "region"
            }else if(key=="AWS_ACCESS_SECRET_KEY"){
              return "secret_key"
            }else if(key=="AWS_ACCESS_KEY"){
              return "access_key"
            }

            return
          })
        }
      }]
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
