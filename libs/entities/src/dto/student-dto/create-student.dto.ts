import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ each: true, message: 'NIM tidak boleh kosong' })
  @IsString({ each: true, message: 'NIM harus bertipe string' })
  nim!: string;

  @IsNotEmpty({ each: true, message: 'NISN tidak boleh kosong' })
  @IsString({ each: true, message: 'NISN harus bertipe string' })
  nisn!: string;

  @IsNotEmpty({ each: true, message: 'Jenis Kartu tidak boleh kosong' })
  @IsIn(['KTP', 'SIM', 'Kartu Pelajar'], {
    message: 'Jenis Kartu harus salah satu dari KTP, SIM atau Kartu_Pelajar',
  })
  identification_type!: 'KTP' | 'SIM' | 'Kartu_Pelajar';

  @IsNotEmpty({ each: true, message: 'Nomor Kartu tidak boleh kosong' })
  @IsString({ each: true, message: 'Nomor Kartu harus bertipe string' })
  identification_number!: string;

  @IsNotEmpty({ each: true, message: 'Tempat lahir tidak boleh kosong' })
  @IsString({ each: true, message: 'Tempat lahir harus bertipe string' })
  birth_place!: string;

  @IsNotEmpty({ each: true, message: 'Tanggal lahir tidak boleh kosong' })
  @IsDate({
    each: true,
    message: 'Tanggal lahir harus berupa format tanggal yang valid',
  })
  birth_date!: Date;

  @IsNotEmpty({ each: true, message: 'Gender tidak boleh kosong' })
  @IsIn(['Male', 'Female'], {
    message: 'Gender harus salah satu dari Male atau Female',
  })
  gender!: 'Male' | 'Female';

  @IsNotEmpty({ each: true, message: 'Agama tidak boleh kosong' })
  @IsIn(['Islam', 'Kristen', "Katholik", "Konghucu"], {
    message:
      'Agama harus salah satu dari Islam, Kristen, Katholik, Konghucu, Hindu atau Budha',
  })
  religion!: 'Islam' | 'Kristen' | 'Katholik' | 'Konghucu' | 'Hindu' | 'Budha';

  @IsNotEmpty({ each: true, message: 'Kewarganegaraan tidak boleh kosong' })
  @IsIn(['WNI', 'WNA'], {
    message:
      'Kewagar harus Islam, Kristen, Katholik, Konghucu, Hindu atau Budha',
  })
  citizenship!: 'WNI' | 'WNA';

  @IsNotEmpty()
  @IsString()
  marital_status!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  rt!: string;

  @IsNotEmpty()
  @IsString()
  rw!: string;

  @IsNotEmpty()
  @IsString()
  postal_code!: string;

  @IsNotEmpty()
  @IsString()
  subdistrict!: string;

  @IsNotEmpty()
  @IsString()
  province!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  phone_number!: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsNotEmpty()
  @IsString()
  kk_number!: string;

  @IsNotEmpty()
  @IsString()
  school_type!: string;

  @IsNotEmpty()
  @IsString()
  school_major!: string;

  @IsNotEmpty()
  @IsString()
  school_name!: string;

  @IsNotEmpty()
  @IsString()
  school_address!: string;

  @IsNotEmpty()
  @IsString()
  school_postal_code!: string;

  @IsNotEmpty()
  @IsString()
  school_subdistrict!: string;

  @IsNotEmpty()
  @IsString()
  school_province!: string;

  @IsNotEmpty()
  @IsString()
  school_city!: string;

  @IsNotEmpty()
  @IsString()
  school_phone_number!: string;

  @IsNotEmpty()
  @IsString()
  graduation_year!: string;

  @IsNotEmpty()
  @IsString()
  father_name!: string;

  @IsNotEmpty()
  @IsString()
  mother_name!: string;

  @IsNotEmpty()
  @IsString()
  guardian_name!: string;

  @IsNotEmpty()
  @IsString()
  parent_address!: string;

  @IsNotEmpty()
  @IsString()
  parent_rt!: string;

  @IsNotEmpty()
  @IsString()
  parent_rw!: string;

  @IsNotEmpty()
  @IsString()
  parent_postal_code!: string;

  @IsNotEmpty()
  @IsString()
  parent_subdistrict!: string;

  @IsNotEmpty()
  @IsString()
  parent_province!: string;

  @IsNotEmpty()
  @IsString()
  parent_phone_number!: string;

  @IsNotEmpty()
  @IsString()
  father_education!: string;

  @IsNotEmpty()
  @IsString()
  mother_education!: string;

  @IsOptional()
  @IsString()
  guardian_education?: string;

  @IsNotEmpty()
  @IsString()
  father_occupation!: string;

  @IsNotEmpty()
  @IsString()
  mother_occupation!: string;

  @IsOptional()
  @IsString()
  guardian_occupation?: string;

  @IsNotEmpty()
  @IsString()
  father_income!: string;

  @IsNotEmpty()
  @IsString()
  mother_income!: string;

  @IsOptional()
  @IsString()
  guardian_income?: string;

  @IsNotEmpty()
  @IsString()
  selection_type!: string;

  @IsNotEmpty()
  @IsString()
  program!: string;

  @IsNotEmpty()
  @IsString()
  academic_year!: string;

  @IsNotEmpty()
  @IsString()
  registration_wave!: string;
}
