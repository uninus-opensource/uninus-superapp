'use client';
import { ReactElement } from 'react';
import { FaGraduationCap, FaAward, FaHandshake, FaAccessibleIcon } from 'react-icons/fa';
import { Navbar, Reveal } from '@uninus/components';

import type { NextPage } from "next";

const Beasiswa: NextPage = (): ReactElement => {
  return (
    <section className="w-full min-h-screen bg-no-repeat bg-[url('https://pmb.uninus.ac.id/wp-content/uploads/2023/02/home-bg1-1.jpg')]">
      <Navbar />
      {/*start jumbotron*/}
      <header className="bg-center after flex justify-center items-center top-64 relative object-center  w-full h-screen">
        <section className="px-4 mx-auto max-w-screen-xl text-center  -translate-y-14">

          <div className='py-[10px] w-full box-border flex justify-center'>
          <span className='h-[2px] bg-[#1C532A]  -translate-x-16 w-[10%] block' ></span>
          </div>

          <Reveal>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight leading-none md:text-5xl lg:text-3xl">
              PILIHAN BERBAGAI BEASISWA TERSEDIA <br/>
              DI UNIVERSITAS ISLAM NUSANTARA
            </h1>
          </Reveal>
          <div className='pb-[10px] w-full box-border flex justify-center'>
          <span className='h-[2px] bg-[#1C532A]  w-[17%] block' ></span>
          </div>
            <div className='text-center flex md:px-[290px] md:py-[10px] justify-center md:text-center leading-none'>
              <Reveal>
            <article >
              <p className=' text-base font-normal text-center'>
            Beasiswa Nusantara adalah sebuah program beasiswa yang ditawarkan oleh Universitas Islam Nusantara untuk membantu mahasiswa berprestasi untuk melanjutkan studi ke jenjang yang lebih tinggi. Beasiswa ini bertujuan untuk memberikan kesempatan bagi mahasiswa untuk mencapai potensinya dan mengembangkan bakat dan minat mereka
              </p>
            </article>
              </Reveal>
            </div>
            {/* Nusantara Unggul Start  */}
            <div className='pt-12 pb-6 flex justify-center'>
              <div className='flex w-3/4 justify-around'>
              <FaGraduationCap size={50} style={{ color: '#1C532A' }} />
                <i>
              <h1 className='text-2xl font-bold'>Nusantara Unggul</h1>
              <p className='block'>Beasiswa Ini diperuntukan untuk Siswa Berprestasi khususnya di Bidang Akademik</p>
                </i>
              </div>
            </div>
            {/* Nusantara Unggul End  */}

            {/* Nusantara Berprestasi Start  */}
            <div className='py-6 flex justify-center'>
              <div className='flex w-3/4 justify-around'>
                <i>
              <h1 className='text-2xl font-bold'>Nusantara Berprestasi</h1>
              <p className='block'>Beasiswa ini diperuntukan untuk Siswa Berprestasi di Bidang Akademik maupun Non Akademik</p>
                </i>
              <FaAward size={50} style={{ color: '#1C532A' }} className='animate-bounce' />
              </div>
            </div>
            {/* Nusantara Berprestasi End  */}

            {/* Mitra Nusantara Start  */}
            <div className='py-6 flex justify-center'>
              <div className='flex w-3/4 justify-around'>
              <FaHandshake size={50} style={{ color: '#1C532A' }} className='animate-bounce' />
                <i>
              <h1 className='text-2xl font-bold'>Mitra Nusantara</h1>
              <p className='block'>Beasiswa ini diperuntukan bagi Orang Tua Siswa salah satu anggota NU dan Orang Tua Berprofesi sebagai Guru SMA/SMK/MAN/PONPES</p>
                </i>
              </div>
            </div>
            {/* Mitra Nusantara End  */}

            {/* Mitra Nusantara Start  */}
            <div className='py-6 flex justify-center'>
              <div className='flex w-3/4 justify-around'>
                <i>
              <h1 className='text-2xl font-bold'>Mitra Nusantara</h1>
              <p className='block'>Beasiswa ini diperuntukan bagi Orang Tua Siswa salah satu anggota NU dan Orang Tua Berprofesi sebagai Guru SMA/SMK/MAN/PONPES</p>
                </i>
              <FaAccessibleIcon size={50} style={{ color: '#1C532A' }} className='animate-bounce' />
              </div>
            </div>
            {/* Mitra Nusantara End  */}

        </section>
      </header>
      {/*end jumbotron*/}

      
      <section className='w-full min-h-screen'>

      </section>
    </section>
  );
};

export default Beasiswa;
