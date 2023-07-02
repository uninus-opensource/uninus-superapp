'use client';
import { ReactElement } from 'react';
import Image from 'next/image';
import { FaStarHalfAlt, FaSearchLocation, FaMedal } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { HiCurrencyDollar } from 'react-icons/hi';
import { BiSolidBank } from 'react-icons/bi';
import { Button, HeroBanner } from '@uninus/components';
import { NextPage } from 'next';

const LandingPage: NextPage = (): ReactElement => {
  return (
    <section className="w-full min-h-screen">
      <HeroBanner
        subTitle="Get Your Future with UNINUS"
        heroTitles="PENERIMAAN MAHASISWA BARU UNIVERSITAS ISLAM NUSANTARA"
        heroImages="https://uninus.ac.id/wp-content/uploads/2022/11/DJI_0609-scaled.jpg"
        backgrounColor="bg-green-930"
        isDownload
      />
      <div className="px-16 w-full flex flex-col items-center my-16 gap-y-28">
        {/* start welcome */}
        <section className="text-center w-4/5 flex flex-col gap-y-8 px-12 ">
          <h1 className="text-5xl font-medium underline underline-offset-8 decoration-2 decoration-green-600">
            Selamat datang
          </h1>
          <p className="leading-loose px-4">
            Selamat datang calon mahasiswa baru di Universitas Islam Nusantara
            Kami sangat senang Anda bergabung dengan kami dan yakin Anda akan
            menemukan banyak peluang belajar, berkembang, dan berkontribusi.
            Kami memiliki fasilitas pendidikan terbaik, dosen berkualitas, dan
            komunitas mahasiswa inklusif. Kami sangat menantikan kerjasama kita
            dan membantu Anda mencapai impian Anda.
          </p>
          <div className="flex justify-center w-full ">
            <Button
              href="#"
              variant="primary"
              size="md"
              width="w-full"
              height="h-8"
            >
              Bergabung Bersama kami
            </Button>
          </div>
        </section>
        {/* end welcome  */}

        {/* start jalur seleksi */}
        <section className="text-center w-5/6 flex flex-col gap-y-24">
          <h1 className="text-5xl font-medium underline underline-offset-8 decoration-2 decoration-green-600">
            Informasi Jalur Seleksi PMB
          </h1>
          <div className="w-full flex text-sm items-center gap-x-8">
            <figure className="relative w-full">
              <Image src="/people1.png" width={800} height={600} alt="img" />
            </figure>
            <div className="flex flex-col gap-y-16">
              <h2 className="text-4xl folnt font-medium text-start">
                Informasi & Persyaratan
              </h2>
              <div className="grid grid-rows-3 gap-y-2 text-justify w-full">
                <div className="flex gap-x-8 text-start">
                  <p className="w-3/4 hover:bg-[#62D7AA] p-4 hover:text-white">
                    Jalur Seleksi Prestasi Akademik (JSPA)
                  </p>
                  <ol className="list-decimal leading-relaxed text-justify p-4">
                    <li>
                      Nilai Rapor Rata-rata ≥ 70 untuk 3 Mata Pelajaran
                      (Matematika, Bahasa Inggris & Bahasa Indonesia) semester 1
                      s.d semester 4 bagi siswa kelas XII Siswa Angkatan
                      2022/2023 dan semester 1 s.d semester 6 bagi siswa
                      Angkatan sebelumnya
                    </li>

<<<<<<< Updated upstream
        <CheckBox
          control={control}
          name={'checkboxField'}
          required
          variant="warning"
          size="lg"
          labelSize="lg"
          label="Setuju"
          message="Valid"
        />
        <h1 className="text-[2rem] font-bold">Tes Monserrat</h1>
        <div className="flex gap-2">
          <SelectField
            name="peran"
            label="Peran"
            size="sm"
            placeholder="pilih peran"
            status="none"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            value="Dosen"
          />
          <SelectField
            name="peran"
            label="Peran"
            size="sm"
            placeholder="pilih peran"
            status="warning"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="warning sample"
            value="Mahasiswa"
          />
        </div>
        <div className="flex gap-2">
          <SelectField
            name="peran"
            label="Peran"
            size="md"
            placeholder="pilih peran"
            status="error"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="error sample"
            value="Mahasiswa"
          />
          <SelectField
            name="peran"
            label="Peran"
            size="md"
            placeholder="pilih peran"
            status="success"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="success sample"
            value="Staff"
          />
        </div>
=======
                    <li>Nilai UTBK atau hasil SBMPTN/SNBT Rata-rata ≥ 450</li>
                  </ol>
                </div>
                <div className="flex gap-x-8 text-start">
                  <p className=" w-4/5 hover:bg-[#62D7AA] p-4 hover:text-white">
                    Jalur Seleksi Prestasi Non-Akademik (JSPNA)
                  </p>
                  <p className=" p-4">
                    Prestasi/Juara lomba dibidang akademik atau non akademik
                    yang pernah diraih oleh calon mahasiswa ketika duduk di
                    bangku SMA/SMK/MA atau setelah lulus, dengan standar
                    prestasi minimal Juara 3 di perlombaan tingkat
                    Kota/Kabupaten dan bagi penghapal alquran (Tahfidz)
                  </p>
                </div>
                <div className="flex gap-x-8 text-start full">
                  <p className="  hover:bg-[#62D7AA] p-4 hover:text-white">
                    Jalur Seleksi Test (JST)
                  </p>
                  <p className=" p-4">
                    Jalur seleksi berdasarkan hasil test, dengan standar
                    kelulusan passing grade sebesar 60
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end jalur seleksi */}
>>>>>>> Stashed changes

        {/* start sesi Pendidikan  */}
        <section className="text-center w-full flex flex-col gap-y-14 px-5 ">
          <h1 className="text-4xl font-medium underline underline-offset-8 decoration-2 decoration-green-600">
            Program Pendidikan
          </h1>
          <div className="grid grid-cols-3 gap-x-6">
            <div className="flex flex-col gap-y-2 p-2">
              <h4 className="text-2xl text-[#067600] ">Sarjana</h4>
              <p>
                Bergabunglah dengan program sarjana di UNINUS Kami menawarkan
                pendidikan berkualitas, dosen berpengalaman Raih impianmu
                bersama kami.
              </p>
            </div>
            <div className="flex flex-col gap-y-2 p-2">
              <h4 className="text-2xl text-[#067600] ">Magister</h4>
              <p>
                Program Pendidikan di UNINUS Pendidikan tinggi berkualitas,
                fleksibel, dikelola oleh dosen berpengalaman, tingkatkan karier
                dan wawasan dalam bakat minat anda
              </p>
            </div>
            <div className="flex flex-col gap-y-2 p-2">
              <h4 className="text-2xl text-[#067600] ">Doktor</h4>
              <p>
                Program Pendidikan Doktor memberikan pengetahuan dan
                keterampilan dalam bidang minat, dikelola oleh dosen
                berpengalaman dan ahli. bergabunglah bersama kami
              </p>
            </div>
          </div>
        </section>
        {/* end sesi Pendidikan  */}

        <section className="text-center w-full flex flex-col gap-y-20 px-5 ">
          <h1 className="text-4xl font-medium underline underline-offset-8 decoration-2 decoration-green-600">
            Kenapa harus Memilih Kami?
          </h1>
          <div className="grid grid-cols-3 gap-x-6 gap-y-12">
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <FaStarHalfAlt className="text-[#067600] text-center" size={40} />
              <h4 className="text-2xl text-[#067600] ">Kampus Pilihan</h4>
              <p className="leading-relaxed">
                Peringkat <strong>6 Kampus NU terbaik</strong> se - Indonesia,{' '}
                <strong>10 Besar Terbaik</strong>
                se - Kota Bandung dan <strong>99 Kampus Terbaik</strong> se -
                Indonesia
              </p>
            </div>
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <BsFillPeopleFill
                className="text-[#067600] text-center"
                size={40}
              />

              <h4 className="text-2xl text-[#067600] ">Dosen Berpengalaman</h4>
              <p className="leading-relaxed">
                Dosen dari berbagai Lulusan Universitas Terkemuka di Indonesia &
                Mancanegara yang sangat berpengalaman dalam bidangnya.
              </p>
            </div>
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <HiCurrencyDollar
                className="text-[#067600] text-center"
                size={40}
              />

              <h4 className="text-2xl text-[#067600] ">
                Biaya Kuliah Terjangkau
              </h4>
              <p className="leading-relaxed">
                Biaya Kuliah Terjangkau dengan berbagai Kemudahan Pembiayaan
              </p>
            </div>
            <div className="flex flex-col gap-y-2 p-2 items-center">
              <FaSearchLocation
                className="text-[#067600] text-center"
                size={40}
              />

              <h4 className="text-2xl text-[#067600] ">Sentral & Strategis</h4>
              <p className="leading-relaxed">
                Akses Transportasi mudah dan lokasi kampus berada di pusat Kota
                Bandung
              </p>
            </div>

            <div className="flex flex-col gap-y-2 p-2 items-center">
              <BiSolidBank className="text-[#067600] text-center" size={40} />

              <h4 className="text-2xl text-[#067600] ">
                Program Studi Baik Sekali
              </h4>
              <p className="leading-relaxed">
                Seluruh Program Studi di UNINUS yang Terakreditasi BAN - PT
                mendapatkan Rata - rata Penilaian "Baik Sekali"
              </p>
            </div>

            <div className="flex flex-col gap-y-2 p-2 items-center">
              <FaMedal className="text-[#067600] text-center" size={40} />

              <h4 className="text-2xl text-[#067600] ">
                Berbagai Beasiswa Pilihan
              </h4>
              <p className="leading-relaxed">
                Terdapat berbagai Beasiswa Pilihan yang bisa diambil seperti ,
                Nusantara Unggul, Nusantara Beprestasi, Mitra Nusantara dan
                Nusantara Peduli Difabel
              </p>
            </div>
          </div>
        </section>
      </div>
      <HeroBanner
        heroTitles="Silahkan Unduh Brosur PMB di Bawah ini"
        heroImages="https://uninus.ac.id/wp-content/uploads/2022/11/DJI_0609-scaled.jpg"
        backgrounColor="bg-gray-600"
      />
    </section>
  );
};

export default LandingPage;
