import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@uninus/models';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getLocation(province: string, city: string) {
    const queryOptions: any = {};

    if (province && parseInt(province)) {
      queryOptions.where = { id: parseInt(province) };
      queryOptions.include = { cities: {} };
    }

    if (city && parseInt(city)) {
      queryOptions.include.cities.where = { id: parseInt(city) };
      queryOptions.include.cities.include = { sub_district: {} };
    }
    const location = await this.prisma.province.findMany(queryOptions);

    if (!location) {
      throw new BadRequestException('Data tidak ditemukan', {
        cause: new Error(),
      });
    }

    return {
      province: location,
    };
  }

  async createProvince(province: string) {
    const createdProvince = await this.prisma.province.create({
      data: {
        name: province,
      },
    });

    if (!createdProvince) {
      throw new BadRequestException('Data Gagal Ditambahkan!', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Berhasil Ditambahkan!',
    };
  }

  async updateProvince(id: string, province: string) {
    const updatedProvince = await this.prisma.province.update({
      where: { id: parseInt(id) },
      data: {
        name: province,
      },
    });

    if (!updatedProvince) {
      throw new BadRequestException('Data Provinsi tidak ditemukan', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Berhasil Diubah!',
    };
  }

  async deleteProvince(id: string) {
    const deletedProvince = await this.prisma.province.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedProvince) {
      throw new BadRequestException('Data Provinsi tidak ditemukan', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Berhasil Dihapus !',
    };
  }

  async createCity(city: string, province_id: number) {
    const createdCity = await this.prisma.city.create({
      data: {
        name: city,
        province_id,
      },
    });

    if (!createdCity) {
      throw new BadRequestException('Data Gagal Ditambahkan!', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Berhasil Ditambahkan!',
    };
  }

  async updateCity(id: string, city: string) {
    const updatedCity = await this.prisma.city.update({
      where: { id: parseInt(id) },
      data: {
        name: city,
      },
    });

    if (!updatedCity) {
      throw new BadRequestException('Data City tidak ditemukan!', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Berhasil Diubah!',
    };
  }

  async deleteCity(id: string) {
    const deletedCity = await this.prisma.city.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedCity) {
      throw new BadRequestException('Data City tidak ditemukan!', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Berhasil Dihapus!',
    };
  }

  async createSubDistrict(subDistrict: string, city_id: number) {
    const createdSubDistrict = await this.prisma.subDistrict.create({
      data: {
        name: subDistrict,
        city_id,
      },
    });

    if (!createdSubDistrict) {
      throw new BadRequestException('Data Gagal Ditambahkan!', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Sub District Berhasil Ditambahkan!',
    };
  }

  async updateSubDistrict(id: string, subDistrict: string) {
    const updateSubDistrict = await this.prisma.subDistrict.update({
      where: { id: parseInt(id) },
      data: { name: subDistrict },
    });

    if (!updateSubDistrict) {
      throw new BadRequestException('Data Sub District tidak ditemukan!', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Berhasil Dirubah!',
    };
  }

  async deleteSubDistrict(id: string) {
    const deleteSubDistrict = await this.prisma.subDistrict.delete({
      where: { id: parseInt(id) },
    });

    if (!deleteSubDistrict) {
      throw new BadRequestException('Data Sub District tidak ditemukan!', {
        cause: new Error(),
      });
    }

    return {
      message: 'Data Sub District Berhasil Dihapus!',
    };
  }
}
