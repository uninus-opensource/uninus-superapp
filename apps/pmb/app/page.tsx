'use client';
import { ReactElement } from 'react';
import Image from 'next/image';
import {
  Ellipse,
  HalfEllipseYellow,
  HalfEllipseGreen,
  HeroBanner,
  Card,
  Rectangle,
  TabJalurSeleksi,
  Button,
  Reveal,
} from '@uninus/components';
import { NextPage } from 'next';
import figure1 from './illustrations/DJI_0609-scaled 2.png';
import talent1 from './illustrations/talent11.png';
import talent2 from './illustrations/foto-mahasiswa-bareng.png';
import {
  AiFillStar,
  AiFillSafetyCertificate,
  AiFillTags,
  AiFillEnvironment,
  AiFillTrophy,
} from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { ProgramPendidikanProps } from './type';

const LandingPage: NextPage = (): ReactElement => {
  const programPendidikanList: ProgramPendidikanProps[] = [
    {
      iconText: 'S1',
      title: 'sarjana',
      item: 'Bergabunglah dengan program sarjana di UNINUS Kami menawarkan pendidikan berkualitas, dosen berpengalaman Raih impianmu bersama kami.',
    },
    {
      iconText: 'S2',
      title: 'magister',
      item: 'Program Pendidikan di UNINUS Pendidikan tinggi berkualitas, fleksibel, dikelola oleh dosen berpengalaman, tingkatkan karier dan wawasan dalam bakat minat anda.',
    },
    {
      iconText: 'S3',
      title: 'doktor',
      item: 'Program Pendidikan Doktor memberikan pengetahuan dan keterampilan dalam bidang minat, dikelola oleh dosen berpengalaman dan ahli. bergabunglah bersama kami.',
    },
  ];

  return (
    <main className="w-full min-h-screen bg-slate-2">
      <HeroBanner
        subTitle={
          <p className="tracking-tighter">
            Get Your Future with{' '}
            <span className="text-primary-yellow">UNINUS</span>
          </p>
        }
        heroTitle="PENERIMAAN MAHASISWA BARU"
        heroTitle2="UNIVERSITAS ISLAM NUSANTARA"
        subTitle2="Tahun Akademik 2023/2024"
        heroImages="https://kelaskaryawan.org/wp-content/uploads/2023/02/2021-03-05-2-678x381.jpg"
        backgrounColor="bg-grayscale-9"
        isDownload
        blur
      />

      <figure className="absolute left-0">
        <Ellipse />
      </figure>

      <section className="px-16 w-full flex flex-col items-center mt-32 h-auto">
        {/* start welcome */}
        <Reveal>
          <section className="text-center w-full flex justify-between xl:justify-evenly xl:ml-10 ">
            <figure className="rounded-lg bg-secondary-green-4">
              <Image
                src={figure1}
                priority
                alt="gedung1"
                quality={100}
                className="rounded-lg bg-primary-white opacity-70"
              />
            </figure>
            <div className="flex flex-col items-start w-7/12 leading-normal font-bebasNeue pl-6">
              <h1 className="text-3xl text-left font-bebasNeue font-semibold text-secondary-green-4 mt-6">
                Selamat Datang
                <br />
                Calon Mahasiswa/Mahasiswi{' '}
                <span className="text-primary-green">Baru</span>
              </h1>
              <p className="text-left text-base xl:text-lg font-medium xl:font-normal lg:leading-6 text-grayscale-9 mt-16 xl:w-4/5">
                Selamat datang calon mahasiswa baru di Universitas Islam
                Nusantara.
                <br />
                Kami sangat senang Anda bergabung dengan kami dan yakin Anda
                akan menemukan banyak peluang belajar, berkembang, dan
                berkontribusi.
                <br />
                Kami memiliki fasilitas pendidikan terbaik, dosen berkualitas,
                dan komunitas mahasiswa inklusif. Kami sangat menantikan
                kerjasama kita dan membantu Anda mencapai impian Anda.
              </p>
            </div>
          </section>
        </Reveal>

        {/* 2 lingkaran */}
        <figure className="absolute z-30 mt-64 right-0">
          <HalfEllipseYellow />
        </figure>
      </section>
      <figure className="absolute right-0 mt-0.5">
        <HalfEllipseGreen />
      </figure>

      {/* end welcome  */}

      {/* start card section */}
      <section className="mt-40 h-auto w-full gap-4 my-16 px-16 py-2 flex flex-col items-center ">
        <h1 className="p-5 uppercase font-bebasNeue text-3xl font-extramedium text-secondary-green-4">
          Kenapa harus kuliah di uninus?
        </h1>
        <section className="grid grid-cols-3 gap-10 xl:gap-16">
          {/* Card 1 */}
          <Card icon={<AiFillStar />} cardTitle="Kampus pilihan">
            <span className="text-secondary-green-4 font-extramedium">
              Peringkat 6{' '}
            </span>
            Kampus NU terbaik se - Indonesia,{' '}
            <span className="text-secondary-green-4 font-extramedium">
              10 Terbaik{' '}
            </span>{' '}
            se - Kota Bandung dan{' '}
            <span className="text-secondary-green-4 font-extramedium">
              99 Kampus Terbaik{' '}
            </span>
            se - Indonesia
          </Card>

          {/* Card 2 */}
          <Card icon={<AiFillSafetyCertificate />} cardTitle="Terakreditasi">
            Seluruh Program Studi di UNINUS yang Terakreditasi BAN - PT
            mendapatkan Rata - rata Penilaian{' '}
            <span className="text-secondary-green-4 font-extramedium">
              {`"Baik Sekali"`}
            </span>
          </Card>

          {/* Card 3 */}
          <Card icon={<AiFillTags />} cardTitle="biaya terjangkau">
            <span className="text-secondary-green-4 font-extramedium">
              Biaya Kuliah Terjangkau{' '}
            </span>
            dengan{' '}
            <span className="text-secondary-green-4 font-extramedium">
              berbagai Kemudahan Pembiayaan
            </span>
          </Card>

          {/* Card 4 */}
          <Card icon={<AiFillEnvironment />} cardTitle="lokasi strategis">
            <span className="text-secondary-green-4 font-extramedium">
              Akses Transportasi mudah
            </span>{' '}
            dan lokasi kampus berada{' '}
            <span className="text-secondary-green-4 font-extramedium">
              pusat Kota Bandung
            </span>
          </Card>

          {/* Card 5 */}
          <Card icon={<AiFillTrophy />} cardTitle="pilihan beasiswa">
            <span className="text-secondary-green-4 font-extramedium">
              Terdapat berbagai Beasiswa Pilihan
            </span>{' '}
            Pilihan yang bisa diambil seperti , Nusantara Unggul, Nusantara
            Beprestasi, Mitra Nusantara dan Nusantara Peduli Difabel
          </Card>

          {/* Card 6 */}
          <Card icon={<BiSolidUser />} cardTitle="dosen berpengalaman">
            Dosen{' '}
            <span className="text-secondary-green-4 font-extramedium">
              Lulusan Universitas Terkemuka
            </span>{' '}
            di{' '}
            <span className="text-secondary-green-4 font-extramedium">
              Indonesia & Mancanegara
            </span>{' '}
            <figure className="flex w-auto h-auto absolute left-13 xl:left-0 xl:ml-20 mt-20 -z-30">
              <Rectangle
                fill="fill-secondary-green-4"
                className="relative left-7"
              />
              <Rectangle
                fill="fill-primary-green"
                className="mt-24 relative right-6"
              />
            </figure>
            yang sangat berpengalaman dalam bidangnya.
          </Card>
        </section>
      </section>

      {/* end card section */}

      {/* start jalur seleksi section */}
      <section className="my-32 h-auto w-full gap-4  px-16 py-2 flex justify-between xl:justify-evenly items-center ">
        {/* gambar mahsiswi */}
        <figure className="mt-4">
          <Image src={talent1} priority alt="mahasiswi-1" quality={100} />
        </figure>

        {/* section tabs */}
        <TabJalurSeleksi />
      </section>
      {/* end jalur seleksi section */}

      {/* start program pendidikan section */}
      <section className="my-32 h-auto w-full gap-4 px-16 py-2 flex flex-col">
        <h1 className="uppercase text-center text-3xl text-secondary-green-4 font-extramedium ">
          program <span className="text-primary-green">pendidikan</span>
        </h1>
        <section className="flex items-center justify-center gap-10 xl:gap-16 mt-10">
          {programPendidikanList.map((list, idx) => (
            <Card key={idx} iconText={list.iconText} cardTitle={list.title}>
              {list.item}
            </Card>
          ))}
        </section>
      </section>
      {/* end program pendidikan section */}

      {/* start tentang uninus */}
      <section className=" h-auto w-full gap-4 px-16 py-2 flex justify-between xl:justify-evenly items-center ">
        {/* Gambar */}
        <figure>
          <div className="w-18 h-18 rounded-lg bg-primary-green relative top-12 right-7"></div>
          <figure>
            <Image src={talent2} quality={100} priority alt="talent" />
          </figure>
          <div className="w-26 h-26 rounded-lg bg-primary-yellow relative bottom-20 right-12 "></div>
        </figure>

        {/* sesi text */}
        <section className="flex flex-col w-2/4 gap-4 xl:gap-8 mb-8">
          <h1 className="uppercase text-primary-green text-3xl font-semibold ">
            tentang <span className="text-secondary-green-4">uninus</span>
          </h1>
          <div className="flex flex-col gap-4 font-medium">
            <p>
              Universitas Islam Nusantara adalah Perguruan tinggi Islam
              Ahlussunnah Wal Jama`ah An-Nahdliyah di Kota Bandung. Universitas
              ini memiliki fasilitas pendidikan yang modern dan menawarkan
              berbagai program studi di bidang ilmu sosial, teknologi, bisnis,
              dan keislaman.
            </p>
            <p>
              Universitas Islam Nusantara juga memiliki komunitas mahasiswa yang
              aktif dan beragam, yang membantu membentuk lingkungan belajar yang
              berkualitas dan inklusif.
            </p>
          </div>
          <div>
            <Button
              variant="filled-tonal"
              styling="font-semibold rounded-md text-base"
              height="h-9"
              href="https://uninus.ac.id/"
            >
              Detail Uninus
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default LandingPage;
