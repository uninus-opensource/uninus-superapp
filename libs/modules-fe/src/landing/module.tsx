'use client';
import { ReactElement, FC } from 'react';
import Image from 'next/image';
import {
  Ellipse,
  HalfEllipseYellow,
  HalfEllipseGreen,
  HeroBanner,
  Card,
  TabJalurSeleksi,
  Button,
  Reveal,
} from '@uninus/components';
import {
  AiFillStar,
  AiFillSafetyCertificate,
  AiFillTags,
  AiFillEnvironment,
  AiFillTrophy,
} from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { ProgramPendidikanProps } from './type';
import { MainLayout } from '../layouts';

export const LandingModule: FC = (): ReactElement => {
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
    <MainLayout>
      <main className="w-full min-h-screen overflow-x-hidden bg-slate-2">
        <HeroBanner
          subTitle={
            <p>
              Get Your Future with{' '}
              <span className="text-primary-yellow">UNINUS</span>
            </p>
          }
          heroTitle="PENERIMAAN MAHASISWA BARU"
          heroTitle2="UNIVERSITAS ISLAM NUSANTARA"
          subTitle2="Tahun Akademik 2023/2024"
          heroImages="/illustrations/gedung.png"
          backgrounColor="bg-grayscale-9"
          isDownload
          blur
        />

        <figure className="absolute left-0">
          <Ellipse />
        </figure>

        <Reveal>
          <section className="xl:px-24 mx-auto px-4 lg:w-full md:w-full w-auto flex 2xl:justify-center xl:justify-evenly lg:justify-around lg:flex-row md:flex-row flex-col gap-8 items-center mt-32 h-auto">
            <Image
              src={'/illustrations/gerbang-uninus.png'}
              priority
              alt="gedung1"
              quality={100}
              width={400}
              height={400}
              className="rounded-lg bg-primary-white "
            />
            <div className="flex flex-col items-start lg:w-7/12 w-full px-2 leading-normal font-semibold lg:pl-6">
              <h1 className="lg:text-4xl text-3xl text-left font-semibold text-secondary-green-4 mt-6">
                Selamat Datang Calon
                <br />
                Mahasiswa/Mahasiswi{' '}
                <span className="text-primary-green">Baru</span>
              </h1>
              <p className="text-left text-base xl:text-lg font-semibold xl:font-normal lg:leading-6 text-grayscale-9 lg:mt-12 mt-8 xl:w-4/5">
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
        <figure className="absolute lg:flex hidden z-30 mt-16 right-0">
          <HalfEllipseYellow />
        </figure>
        <figure className="absolute right-0 lg:flex hidden mt-0.5">
          <HalfEllipseGreen />
        </figure>

        <section className="mt-40 h-auto w-full gap-4 my-16 lg:px-16 px-4 py-2 flex flex-col items-center ">
          <h1 className="p-5 text-2xl text-center lg:text-4xl text-secondary-green-4 font-bold">
            Kenapa Harus Kuliah di{' '}
            <span className="text-primary-yellow">UNINUS?</span>
          </h1>
          <section className="grid grid-cols-2 lg:grid-cols-3  lg:gap-10 gap-4 xl:gap-16">
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
              Nusantara Unggul, Nusantara Beprestasi, Mitra Nusantara dan
              Nusantara Peduli Difabel
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
              yang sangat berpengalaman dalam bidangnya.
            </Card>
          </section>
        </section>

        {/* end card section */}

        {/* start jalur seleksi section */}
        <section className="my-32 h-auto w-full gap-4 lg:px-16 px-8 py-2 flex lg:flex-row  flex-col justify-between xl:justify-evenly items-center ">
          {/* gambar mahsiswi */}
          <figure className="mt-4 mx-8 lg:mx-0">
            <Image
              src={'/illustrations/talent11.png'}
              priority
              alt="mahasiswi-1"
              width={400}
              height={400}
              quality={100}
            />
          </figure>

          {/* section tabs */}
          <TabJalurSeleksi />
        </section>
        {/* end jalur seleksi section */}

        {/* start program pendidikan section */}
        <section className="mt-32 mb-20 h-auto lg:w-full w-auto gap-4 lg:px-16 px-8 py-2 flex flex-col">
          <h1 className="uppercase text-left lg:ml-8 ml-4 w-full text-3xl text-secondary-green-4 font-extramedium ">
            program <span className="text-primary-green">pendidikan</span>
          </h1>
          <section className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 items-center gap-10 xl:flex xl:justify-center xl:gap-8 px-8 mt-10">
            {programPendidikanList.map((list, idx) => (
              <Card key={idx} iconText={list.iconText} cardTitle={list.title}>
                {list.item}
              </Card>
            ))}
          </section>
        </section>
        {/* end program pendidikan section */}

        {/* start tentang uninus */}

        <section className="flex flex-col lg:flex-row h-auto w-full gap-14 lg:gap-0 justify-center items-center mb-24">
          <section className="h-auto gap-4 px-16 py-2">
            {/* Gambar */}
            <figure>
              <Image
                src={'/illustrations/foto-mahasiswa-bareng-reactangle.png'}
                width={500}
                height={500}
                quality={100}
                priority
                alt="talent"
              />
            </figure>
          </section>
          {/* sesi text */}
          <section className="flex flex-col lg:w-2/4 w-full px-6 gap-4 xl:gap-8">
            <h1 className="uppercase text-primary-green text-3xl font-extramedium ">
              tentang <span className="text-secondary-green-4">uninus</span>
            </h1>
            <div className="flex flex-col gap-4 font-medium">
              <p>
                Universitas Islam Nusantara adalah Perguruan tinggi Islam
                Ahlussunnah Wal Jama`ah An-Nahdliyah di Kota Bandung.
                Universitas ini memiliki fasilitas pendidikan yang modern dan
                menawarkan berbagai program studi di bidang ilmu sosial,
                teknologi, bisnis, dan keislaman.
              </p>
              <p>
                Universitas Islam Nusantara juga memiliki komunitas mahasiswa
                yang aktif dan beragam, yang membantu membentuk lingkungan
                belajar yang berkualitas dan inklusif.
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
    </MainLayout>
  );
};
function componentDidMount() {
  throw new Error('Function not implemented.');
}
