'use client';
import { ReactElement } from 'react';
import { FaGraduationCap, FaAward, FaHandshake, FaAccessibleIcon } from 'react-icons/fa';
import { Navbar, Reveal } from '@uninus/components';

import type { NextPage } from "next";

const Beasiswa: NextPage = (): ReactElement => {
  return (
    <section className="w-full min-h-screen bg-no-repeat md:bg-[url('https://pmb.uninus.ac.id/wp-content/uploads/2023/02/home-bg1-1.jpg')]">
      <Navbar />
      {/*Hero Start*/}
      <header className="bg-center after  justify-center items-center md:top-56 top-[300px] relative object-center  w-full h-screen">
        <section className="px-4 mx-auto max-w-screen-xl text-center  -translate-y-14">

        <Reveal variantX={true} customX={'100%'} delay={0.5} duration={2}>
          <div className='py-[10px] w-full box-border flex justify-center'>
          <span className='h-[2px] bg-[#1C532A]  md:-translate-x-16 -translate-x-10 w-[25%] md:w-[10%] block' ></span>
          </div>
</Reveal>


          <Reveal duration={1} delay={1}>
            <h1 className="mb-2 py-1 text-xl font-semibold tracking-tight leading-none md:text-5xl lg:text-3xl">
              PILIHAN BERBAGAI BEASISWA TERSEDIA <br/>
              DI UNIVERSITAS ISLAM NUSANTARA
            </h1>
          </Reveal>
          <Reveal variantX={true} customX={'-100%'} duration={2} >
          <div className='pb-[10px] w-full box-border flex justify-center'>
          <span className='h-[2px] bg-[#1C532A] w-[34%] md:w-[17%] block' ></span>
          </div>
          </Reveal>
            <div className='text-center mb-5 flex md:px-[290px] md:py-[10px] justify-center md:text-center leading-none'>
              <Reveal>
            <article >
              <p className=' text-sm md:text-base font-normal text-center'>
            Beasiswa Nusantara adalah sebuah program beasiswa yang ditawarkan oleh Universitas Islam Nusantara untuk membantu mahasiswa berprestasi untuk melanjutkan studi ke jenjang yang lebih tinggi. Beasiswa ini bertujuan untuk memberikan kesempatan bagi mahasiswa untuk mencapai potensinya dan mengembangkan bakat dan minat mereka
              </p>
            </article>
              </Reveal>
            </div>
            {/* Nusantara Unggul Start  */}
            <Reveal variantX={true} duration={1} delay={1}>
            <div className='pt-11 pb-6 flex justify-center'>
              <div className='flex w-3/4 justify-around'>
              <FaGraduationCap size={50} style={{ color: '#1C532A' }} />
                <i>
              <h1 className='md:text-2xl text-xl font-bold'>Nusantara Unggul</h1>
              <p className='mt-2 text-sm md:text-base lg:text-normal block'>Beasiswa Ini diperuntukan untuk Siswa Berprestasi khususnya di Bidang Akademik</p>
                </i>
              </div>
            </div>
              </Reveal>
            {/* Nusantara Unggul End  */}

            {/* Nusantara Berprestasi Start  */}
            <Reveal variantX={true} customX={'100%'} duration={1} delay={1}>
            <div className='py-6 flex justify-center'>
              <div className='flex w-3/4 justify-around'>
                <i>
              <h1 className='md:text-2xl text-xl font-bold'>Nusantara Berprestasi</h1>
              <p className='mt-2 text-sm md:text-base lg:text-normal block'>Beasiswa ini diperuntukan untuk Siswa Berprestasi di Bidang Akademik maupun Non Akademik</p>
                </i>
              <FaAward size={50} style={{ color: '#1C532A' }}/>
              </div>
            </div>
              </Reveal>
            {/* Nusantara Berprestasi End  */}

            {/* Mitra Nusantara Start  */}
              <Reveal variantX={true} delay={1}>
            <div className='py-6 flex justify-center'>
              <div className='flex w-3/4 justify-around'>
              <FaHandshake size={50} style={{ color: '#1C532A' }} />
                <i>
              <h1 className='md:text-2xl text-xl font-bold'>Mitra Nusantara</h1>
              <p className='mt-2 text-sm md:text-base lg:text-normal block'>Beasiswa ini diperuntukan bagi Orang Tua Siswa salah satu anggota NU dan Orang Tua Berprofesi sebagai Guru SMA/SMK/MAN/PONPES</p>
                </i>
              </div>
            </div>
              </Reveal>
            {/* Mitra Nusantara End  */}

            {/* Nusantara Peduli Difabel Start  */}
              <Reveal variantX={true} customX={'100%'} duration={1} delay={1}>
            <div className='py-6 flex justify-center'>
              <div className='flex w-3/4 justify-around'>
                <i>
              <h1 className='md:text-2xl text-xl font-bold'>Nusantara Peduli Difabel</h1>
              <p className='mt-2 text-sm md:text-base lg:text-normal block'>Beasiswa Nusantara Peduli difabel merupakan bentuk kepedulian UNINUS kepada Siswa Penyandang Disabilitas</p>
                </i>
              <FaAccessibleIcon size={50} style={{ color: '#1C532A' }}/>
              </div>
            </div>
              </Reveal>
            {/* Nusantara Peduli Difabel End  */}

        </section>
      </header>
      {/*Hero */}

      
      <section className='w-full min-h-screen'>

      </section>
    </section>
  );
};

export default Beasiswa;
