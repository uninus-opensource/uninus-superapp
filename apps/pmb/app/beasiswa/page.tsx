'use client';
import { ReactElement } from 'react';
import { FaGraduationCap, FaAward, FaHandshake, FaAccessibleIcon } from 'react-icons/fa';
import { Reveal, AccordionTab} from '@uninus/components';
// import AccordionTab from './AccordionTab';


import type { NextPage } from "next";

const Beasiswa: NextPage = (): ReactElement => {
  const titles = ['Potongan', 'Metode Seleksi', 'Persyaratan Umum', 'Persyaratan Khusus', 'Periode'];
  const nusantaraUnggul = [
    ['50 % UKT Semester 1'],
    ['UTBK ( Ujian Tulis Berbasis Komputer) Nilai Rapot'],
    ['Siswa Lulusan 2021, 2022 dan 2023'],
    ['Rata - rata > 575', 'Rata - Rata > 85', 'Total 3 Mata Pelajaran :', 'Matematika, Bahasa Inggris dan Bahasa Indonesia'],
    ['Januari 2023 s.d Maret 2023'],
];
  const nusantaraMitra = [
    ['20 % UKT Semester 1'],
    ['Banom NU', 'Anak Guru SMA/SMK/MAN/PONPES'],
    ['Siswa Lulusan 2021, 2022 dan 2023'],
    ['Anak Kandung Anggota NU', 'Anak Kandung Guru SMA/SMK/MAN/PONPES'],
    ['Januari 2023 s.d Maret 2023'],
];
  const nusantaraBerpestrasi = [
    ['25 % UKT Semester 1'],
    ['UTBK ( Ujian Tulis Berbasis Komputer)', 'Nilai Rapot', 'Tahfidz Qur"an', 'Prestasi non Akademik'],
    ['Siswa Lulusan 2021, 2022 dan 2023'],
    ['Rata - rata > 500',
    'Rata - Rata > 80',
    'Total 3 Mata Pelajaran :',
    'Matematika, Bahasa Inggris dan Bahasa Indonesia',
    'Minimal 3 Juz',
    'Juara Perlombaan? Pertandingan di Bidang Pendidikan, Olah Raga atau Seni Budaya, minimal 3 pada Kejuaraan Tingkat Daerah/ Provinsi baik perorangan atau Tim'],
    ['Januari 2023 s.d Maret 2023'],
];
  const nusantaraPeduli = [
    ['20 % UKT Semester 1'],
    ['Penyandang Disabilitas'],
    ['Siswa Lulusan 2021, 2022 dan 2023'],
    [' '],
    ['Januari 2023 s.d Maret 2023'],
];
  
  // <AccordionTab titles={titles} contents={nusa} />
  
  return (
    <section className="w-full flex flex-col min-h-screen bg-no-repeat md:bg-[url('https://pmb.uninus.ac.id/wp-content/uploads/2023/02/home-bg1-1.jpg')]">
      {/* <Navbar /> */}
      {/*Hero Start*/}
      <header className="bg-center after flex justify-center items-center lg:top-[220px] md:top-[270px] top-[300px] relative object-center  w-full h-screen">
        <section className="px-4 mb-9 mx-auto max-w-screen-xl text-center  -translate-y-14">

            <div className='py-[10px] w-full  flex justify-center'>
          <Reveal variantX={true} customX={'-100%'} delay={1} duration={2}>
              <span className='h-[2px] bg-[#1C532A]  md:-translate-x-16 -translate-x-10 w-[25%] md:w-[10%]' ></span>
          </Reveal>
            </div>

          <Reveal duration={1} delay={1}>
            <h1 className="mb-2 py-1 text-xl text-center font-semibold tracking-tight leading-none md:text-5xl lg:text-3xl">
              PILIHAN BERBAGAI BEASISWA TERSEDIA <br/>
              DI UNIVERSITAS ISLAM NUSANTARA
            </h1>
          </Reveal>
            <div className='pb-[10px] w-full box-border flex justify-center'>
          <Reveal variantX={true} customX={'-100%'} duration={2} >
              <span className='h-[2px] bg-[#1C532A] w-[34%] md:w-[17%] block' ></span>
          </Reveal>
            </div>
          <div className='text-center mb-5 flex md:px-[20px] lg:px-[290px] sm:px-20 md:py-[10px] justify-center md:text-center leading-none'>
            <article >
              <Reveal>
                <p className=' text-sm md:text-base lg:text-lg font-normal text-center'>
                  Beasiswa Nusantara adalah sebuah program beasiswa yang ditawarkan oleh Universitas Islam Nusantara untuk membantu mahasiswa berprestasi untuk melanjutkan studi ke jenjang yang lebih tinggi. Beasiswa ini bertujuan untuk memberikan kesempatan bagi mahasiswa untuk mencapai potensinya dan mengembangkan bakat dan minat mereka
                </p>
              </Reveal>
            </article>
          </div>
          <section>
            {/* Nusantara Unggul Start  */}
            <div className='pt-11 pb-6 flex justify-center'>
              <Reveal variantX={true} duration={1} delay={1}>
                <div className='flex gap-10 justify-between'>
                  <FaGraduationCap size={50} style={{ color: '#1C532A' }} />
                  <i>
                    <h1 className='md:text-2xl text-xl font-bold'>Nusantara Unggul</h1>
                    <p className='mt-2 text-sm md:text-base lg:text-normal block'>Beasiswa Ini diperuntukan untuk Siswa Berprestasi khususnya di Bidang Akademik</p>
                  </i>
                </div>
              </Reveal>
            </div>
              {/* </Reveal> */}
            {/* Nusantara Unggul End  */}

            {/* Nusantara Berprestasi Start  */}
            <div className='py-5 flex justify-center'>
              <Reveal variantX={true} customX={'100%'} duration={1} delay={1}>
                <div className='flex gap-10 justify-between'>
                  <i>
                    <h1 className='md:text-2xl text-xl font-bold'>Nusantara Berprestasi</h1>
                    <p className='mt-2 text-sm md:text-base lg:text-normal block'>Beasiswa ini diperuntukan untuk Siswa Berprestasi di Bidang Akademik maupun Non Akademik</p>
                  </i>
                  <FaAward size={50} style={{ color: '#1C532A' }} />
                </div>
              </Reveal>
            </div>
              {/* </Reveal> */}
            {/* Nusantara Berprestasi End  */}

            {/* Mitra Nusantara Start  */}
            <div className='py-5 flex justify-center'>
              <Reveal variantX={true} duration={1} delay={1}>
                <div className='flex gap-10justify-around'>
                  <FaHandshake size={50} style={{ color: '#1C532A' }} />
                  <i>
                    <h1 className='md:text-2xl text-xl font-bold'>Mitra Nusantara</h1>
                    <p className='mt-2 text-sm md:text-base lg:text-normal block'>Beasiswa ini diperuntukan bagi Orang Tua Siswa salah satu anggota NU dan Orang Tua Berprofesi sebagai Guru SMA/SMK/MAN/PONPES</p>
                  </i>
                </div>
              </Reveal>
            </div>
              {/* </Reveal> */}
            {/* Mitra Nusantara End  */}
          </section>

          {/* Nusantara Peduli Difabel Start  */}
          <div className='py-5 flex justify-center'>
            <Reveal variantX={true} customX={'100%'} duration={1} >
              <div className='flex gap-10 justify-around'>
                <i>
                  <h1 className='md:text-2xl text-xl font-bold'>Nusantara Peduli Difabel</h1>
                  <p className='mt-2 text-sm md:text-base lg:text-normal block'>Beasiswa Nusantara Peduli difabel merupakan bentuk kepedulian UNINUS kepada Siswa Penyandang Disabilitas</p>
                </i>
                <FaAccessibleIcon size={50} style={{ color: '#1C532A' }} />
              </div>
            </Reveal>
          </div>
          {/* Nusantara Peduli Difabel End  */}

        </section>
      </header>
      {/*Hero */}
      {/*Hero */}


      <section className='w-full mt-64 mb-10 relative bg-gray-100 min-h-screen'>
        <Reveal duration={1}>
          <h1 className='md:text-2xl mb-4 text-lg pt-4 text-center font-semibold'>INFORMASI DETAIL TENTANG BEASISWA NUSANTARA</h1>
        </Reveal>
        <section className="md:grid grid-cols-2 ">
          <div className='md:pl-11 px-5'>
              <Reveal>
            <div className='py-4'>
              <h1 className='md:text-[27px] text-xl mb-4 font-medium'>Nusantara Unggul</h1>
              <AccordionTab titles={titles} contents={nusantaraUnggul} />            
              </div>
              </Reveal>
              <Reveal>
            <div className='py-4'>
            <h1 className='md:text-[27px] text-xl mb-4 font-medium'>Nusantara Berprestasi</h1>
            <AccordionTab titles={titles} contents={nusantaraBerpestrasi} />            
            </div>
              </Reveal>
          </div>
          <div className='md:pr-11 px-5'>
              <Reveal>
            <div className='py-4'>
            <h1 className='md:text-[27px] text-xl mb-4 font-medium'>Mitra Nusantara</h1>
            <AccordionTab titles={titles} contents={nusantaraMitra} />            
            </div>
              </Reveal>
              <Reveal>
            <div className='py-4'>
            <h1 className='md:text-[27px] text-xl mb-4 font-medium'>Nusantara Peduli Difabel</h1>
            <AccordionTab titles={titles} contents={nusantaraPeduli} />            
            </div>
              </Reveal>
          </div>
        </section>

      </section>
    </section>
  );
};

export default Beasiswa;