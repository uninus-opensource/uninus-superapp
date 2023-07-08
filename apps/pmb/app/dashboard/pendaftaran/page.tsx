'use client';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button, SelectField } from '@uninus/components';

const DashboardPendaftaran: NextPage = (): ReactElement => {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold pb-8">Pendaftaran</h1>
      <section className="w-full h-auto bg-primary-white p-8">
        <div className="flex flex-col gap-8">
          <SelectField
            name="program"
            label="Program"
            size="md"
            placeholder="Pilih Program Pendidikan"
            status="none"
            options={[
              'Program Sarjana(S1) 2023/2024',
              'Program Pascasarjana(S2) 2023/2024',
            ]}
            value="Pilihan Program"
          />
          <SelectField
            name="seleksi"
            label="Jalur Seleksi"
            size="md"
            placeholder="Pilih Jalur Seleksi"
            status="none"
            options={['Beasiswa KIP', 'Mandiri']}
            value="Jalur Seleksi"
          />
          <SelectField
            name="pembayaran"
            label="Metode Pembayaran"
            size="md"
            placeholder="Pilih Metode Pembayaran"
            status="none"
            options={['Transfer Antar Bank', 'Datang Langsung']}
            value="Metode Pembayaran"
          />
          <Button variant="elevated" size="sm" width="w-48" height="h-12">
            Daftar Sekarang
          </Button>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPendaftaran;
