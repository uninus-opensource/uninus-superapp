import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './index';
import { ConfigService } from '@nestjs/config';

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService,
        {
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
        }}
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
