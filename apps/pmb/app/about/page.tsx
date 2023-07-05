'use client';
import { ReactElement } from 'react';
import { Button, Reveal, HeroBanner } from '@uninus/components';
import Image from 'next/image';
import type { NextPage } from 'next';

const About: NextPage = (): ReactElement => {
  return (
    <section className="w-full min-h-screen">
      {/*start jumbotron*/}
      <HeroBanner
        heroTitle="TENTANG UNIVERSITAS ISLAM NUSANTARA"
        heroImages="https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"
        backgrounColor="bg-gray-800"
        isDownload
      />
      {/*end jumbotron*/}

      <section className="w-full px-6 md:px-16 flex flex-col md:gap-y-6 gap-y-12">
        {/*start profile */}
        <div className="w-full h-screen">
          <div className=" text-xl md:text-2xl font-bold mt-4">
            <Reveal>
              <h1 className="underline underline-offset-8 decoration-green-800 decoration-2 md:decoration-4 my-8 md:text-start text-center">
                Profile Singkat
              </h1>
            </Reveal>
          </div>
          <div className="text-md font-normal flex flex-col  items-center w-full">
            <div className="w-full md:w-1/2 mb-8">
              <Reveal>
                <iframe
                  className="w-full h-full md:w-[560px] md:h-[315px]"
                  src="https://www.youtube.com/embed/917dBBxONh0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </Reveal>
            </div>
            <div className="text-justify md:text-center">
              <Reveal>
                <article>
                  Yayasan Pembina Universitas Islam Nusantara (UNINUS) Bandung
                  sebelumnya bernama Universitas Nahdlatul Ulama (UNNU) yang
                  didirikan di Kota Bandung tanggal 30 November 1959. Pada awal
                  berdirinya merupakan merger dari beberapa Sivitas akademika
                  UNNU dan beberapa Sivitas perguruan tinggi yang berbasis Agama
                  Islam lain di Bandung seperti Akademi Pendidikan Agama Islam,
                  Universitas lbnu Khaldun, Universitas Muhamamaddiyah maka
                  diputuskan untuk melanjutkan cita-cita UNNU menjadi UNINUS
                  dalam surat tertanggal 30 September 1969.
                </article>
              </Reveal>
            </div>
          </div>
        </div>
        {/*end profile */}

        {/* star visi misi*/}
        <div className="flex md:flex-row flex-col divide-y md:divide-x-2 md:divide-y-0 divide-gray-600 md:gap-x-2 gap-y-2 w-full md:h-auto h-screen">
          <div className="w-full md:w-1/2">
            <Reveal>
              <h1 className="font-bold text-4xl text-center mb-4">Visi</h1>
            </Reveal>
            <Reveal>
              <p className="text-justify leading-relaxed tracking-tight md:tracking-normal">
                Menjadi perguruan tinggi Islam Ahlussunnah wal Jama’ah
                An-Nahdliyah yang unggul di tingkat nasional dan internasional
                pada tahun 2030.
              </p>
            </Reveal>
          </div>
          <div className="w-full md:w-1/2 md:p-4">
            <Reveal>
              <h1 className="font-bold text-4xl text-center mb-4">Misi</h1>
            </Reveal>
            <div>
              <ul className="list-disc list-outside  px-4 leading-relaxed tracking-tight md:tracking-normal">
                <li className="text-green-800">
                  <Reveal>
                    <h3 className="text-black">
                      Menyelenggarakan pendidikan,penelitian, dan pengabdian
                      pada masyarakat yang unggul.
                    </h3>
                  </Reveal>
                </li>
                <li className="text-green-800">
                  <Reveal>
                    <h3 className="text-black">
                      Menyelenggarakan pembinaan dan pengembangan sumberdaya
                      manusia yang berakhlaqul karimah, profesional dan memiliki
                      wawasan kebangsaan serta rasa cinta tanah air.
                    </h3>
                  </Reveal>
                </li>
                <li className="text-green-800">
                  <Reveal>
                    <h3 className="text-black">
                      Mengintegrasikan dan mensyiarkan nilai-nilai Islam
                      Ahlussunnah wal Jama’ah An-Nahdliyah dalam kegiatan
                      pendidikan, penelitian, dan pengabdian kepada masyarakat,
                      serta kegiatan lainnya.
                    </h3>
                  </Reveal>
                </li>
                <li className="text-green-800">
                  <Reveal>
                    <h3 className="text-black">
                      Mengembangkan kerjasama dan kemitraan Tridharma Perguruan
                      Tinggi dengan berbagai pihak di dalam maupun di luar
                      negeri berdasarkan prinsip-prinsip kesetaraan.
                    </h3>
                  </Reveal>
                </li>
                <li className="text-green-800">
                  <Reveal>
                    <h3 className="text-black">
                      Menyelenggarakan tata kelola universitas sesuai dengan
                      prinsip-prinsip good university governance.
                    </h3>
                  </Reveal>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* end visi misi*/}

        {/* start logo detail*/}
        <div className="flex flex-col gap-y-4 md:gap-x-2 md:flex-row-reverse items-center w-full h-screen">
          <figure className="w-full md:w-1/2 mx-auto flex items-center justify-center">
            <Reveal>
              <Image
                src="/uninus-logo.png"
                alt="uninus-logo"
                className="w-40 h-40 md:w-80 md:h-80"
                width={400}
                height={400}
              />
            </Reveal>
          </figure>
          <div className="w-full md:w-1/2 text-justify pb-2">
            <Reveal>
              <h1 className="font-bold text-4xl text-center mb-4">Logo</h1>
            </Reveal>
            <Reveal>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam ex culpa corrupti quo ipsam id quam reiciendis neque
                illo, cupiditate voluptate, facilis laboriosam ea! Nemo
                laboriosam culpa consequatur deleniti consequuntur? Adipisci
                aperiam aliquid, laboriosam quaerat at ad a? Alias,
                perspiciatis! Facere at dolorum obcaecati necessitatibus
                suscipit? Eum, dignissimos? Omnis quasi inventore deleniti
                perspiciatis tempora cumque harum vero quod atque voluptas.
              </p>
            </Reveal>
          </div>
        </div>
        {/* end logo detail*/}
      </section>
      <Reveal w="w-full">
        <div className="w-full bg-yellow-500 md:h-32 px-16 py-4 grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-y-1">
          <Reveal w="w-full">
            <div className=" bg-yellow-400 flex gap-y-2 flex-col p-2 rounded items-center ">
              <h1 className="font-bold text-xl">Struktur Organisasi</h1>
              <Button
                href="#"
                variant="filled"
                size="sm"
                width="w-24"
                height="h-8"
              >
                Lanjut
              </Button>
            </div>
          </Reveal>
          <Reveal w="w-full">
            <div className=" bg-yellow-400 flex gap-y-2 flex-col p-2 rounded items-center ">
              <h1 className="font-bold text-xl">Sejarah </h1>
              <Button
                href="#"
                variant="filled"
                size="sm"
                width="w-24"
                height="h-8"
              >
                Lanjut
              </Button>
            </div>
          </Reveal>
          <Reveal w="w-full">
            <div className=" bg-yellow-400 flex gap-y-2 flex-col p-2 rounded items-center">
              <h1 className="font-bold text-xl">Unit </h1>
              <Button
                href="#"
                variant="filled"
                size="sm"
                width="w-24"
                height="h-8"
              >
                Lanjut
              </Button>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
};

export default About;
