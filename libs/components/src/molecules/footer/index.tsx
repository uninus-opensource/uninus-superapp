import { NextPage } from 'next';
import { ReactElement } from 'react';
import Image from 'next/image';
import uninusImage from '../../atoms/illustrations/uninus/uninus.png';
import {
  ContactsFilled,
  EnvironmentFilled,
  EnvironmentOutlined,
  FacebookFilled,
  FileTextOutlined,
  GlobalOutlined,
  InstagramFilled,
  MailFilled,
  PhoneOutlined,
  YoutubeFilled,
} from '@ant-design/icons';
import NeoUninusIcon from '../../atoms/illustrations/neouninus/Neo-Uninus.png';
import hybridUniversity from '../../atoms/illustrations/hybriduniversity/hybrid-university.png';
import Link from 'next/link';

export const Footer: NextPage = (): ReactElement => {
  return (
    <footer className="w-full h-footerHeight">
      {/* frame1 */}
      <section className="h-[300px] bg-secondary-green-4 z-10 flex flex-col">
        {/* backgroundImage */}
        <div className="z-0 relative h-[300px]">
          <Image
            src={uninusImage}
            alt="uninus"
            className="w-screen object-cover h-full lg:opacity-5 opacity-0"
          />

          <div className="w-full h-full absolute top-0 flex flex-col md:flex-row lg:justify-center">
            <div className="md:w-[49.5%] lg:w-[32.5%] h-[40%] md:h-[75%] lg:h-full flex md:flex-col justify-between md:justify-center items-center md:items-start lg:items-center px-[10vw] md:px-0 md:ml-[7vw] lg:ml-0 md:gap-10">
              <Image
                src={NeoUninusIcon}
                alt="neo uninus"
                className="object-cover w-[170px] md:w-[210px] lg:w-[250px]"
              />
              <Image
                src={hybridUniversity}
                alt="neo uninus"
                className="object-cover w-[110px] mt-[1rem] md:w-[130px] lg:hidden"
              />
            </div>

            {/* Line */}
            <div className="md:w-[0.5%] lg:w-[0.3%] md:h-[47%] lg:h-[75%] hidden md:flex md:bg-primary-white md:rounded-md md:mt-[3rem] lg:mt-[1.8rem]"></div>

            <div className="h-[75%] md:w-[50%] lg:w-[32.5%] lg:h-full flex">
              {/* Situs Resmi Uninus */}
              <div className="w-[38%] flex flex-col gap-4 lg:gap-6 md:justify-center items-start ml-[12vw] lg:ml-[6vw]">
                <div className="group hover:cursor-pointer">
                  <Link href="https://uninus.ac.id/" target="_blank">
                    <div className="flex items-center justify-center gap-2 group-hover:scale-95 duration-300 ease-in-out">
                      <div className="md:hidden flex justify-center items-center">
                        <GlobalOutlined
                          style={{ fontSize: 13, color: 'white' }}
                        />
                      </div>

                      <div className="hidden md:flex">
                        <GlobalOutlined
                          style={{ fontSize: 23, color: 'white' }}
                        />
                      </div>

                      <div className="md:w-[25vw]">
                        <h3 className="font-bebasNeue font-bold text-[10px] md:text-[15px] text-primary-white">
                          SITUS RESMI UNINUS
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Unduh Brosur */}
                <div className="group hover:cursor-pointer">
                  <Link
                    href="https://pmb.uninus.ac.id/wp-content/uploads/2023/03/Brosur-Program-Sarjana.pdf"
                    target="_blank"
                    className="flex items-center justify-center gap-2 md:gap-[10px] group-hover:scale-95 duration-300 ease-in-out"
                  >
                    <div className="md:hidden flex justify-center items-center">
                      <FileTextOutlined
                        style={{ fontSize: 13, color: 'white' }}
                      />
                    </div>

                    <div className="hidden md:flex">
                      <FileTextOutlined
                        style={{ fontSize: 23, color: 'white' }}
                      />
                    </div>

                    <div className="md:w-[20vw]">
                      <h3 className="font-bebasNeue font-bold text-[10px] md:text-[15px] text-primary-white">
                        UNDUH BROSUR
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* Lokasi Kampus */}
                <div className="group hover:cursor-pointer">
                  <Link
                    href="https://goo.gl/maps/pdvgVFaFmzLhUeSs5"
                    target="_blank"
                  >
                    <div className="flex items-center justify-center gap-2 group-hover:scale-95 duration-300 ease-in-out">
                      <div className="md:hidden flex justify-center items-center">
                        <EnvironmentOutlined
                          style={{ fontSize: 13, color: 'white' }}
                        />
                      </div>

                      <div className="hidden md:flex">
                        <EnvironmentFilled
                          style={{ fontSize: 23, color: 'white' }}
                        />
                      </div>

                      <div className="md:w-[20vw]">
                        <h3 className="font-bebasNeue font-bold text-[10px] md:text-[15px] text-primary-white">
                          LOKASI KAMPUS
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Hubungi Kami */}
                <div className="group hover:cursor-pointer">
                  <Link href="tel:+628112161530" target="_blank">
                    <div className="flex items-center justify-center gap-2 group-hover:scale-95 duration-300 ease-in-out">
                      <div className="md:hidden flex justify-center items-center">
                        <PhoneOutlined
                          style={{ fontSize: 13, color: 'white' }}
                        />
                      </div>

                      <div className="hidden md:flex">
                        <PhoneOutlined
                          style={{ fontSize: 23, color: 'white' }}
                        />
                      </div>

                      <div className="md:w-[20vw]">
                        <h3 className="font-bebasNeue font-bold text-[10px] md:text-[15px] text-primary-white">
                          HUBUNGI KAMI
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="w-[50%] flex flex-col gap-2 items-start md:hidden">
                {' '}
                {/* Alamat */}
                <div>
                  <Link
                    href="https://goo.gl/maps/pdvgVFaFmzLhUeSs5"
                    target="_blank"
                  >
                    <div className="flex justify-center gap-2 duration-300 ease-in-out">
                      <EnvironmentFilled
                        style={{ fontSize: 13, color: 'white' }}
                      />
                      <div className="w-[40vw]">
                        <h3 className="text-[9px] text-primary-white">
                          Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu,
                          Kota Bandung, Jawa Barat 40286
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Kontak */}
                <div>
                  <div>
                    <div className="flex justify-center gap-2 duration-300 ease-in-out md:hidden">
                      <ContactsFilled
                        style={{ fontSize: 13, color: 'white' }}
                      />
                      <h3 className="text-[10px] text-primary-white">
                        0811-2161-530
                      </h3>
                    </div>
                  </div>
                </div>
                {/* Email */}
                <div>
                  <div>
                    <div className="flex justify-center gap-2 duration-300 ease-in-out md:hidden">
                      <MailFilled style={{ fontSize: 13, color: 'white' }} />
                      <h3 className="text-[10px] text-primary-white">
                        humas@uninus.ac.id
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Line */}
            <div className="md:w-[0.5%] lg:w-[0.3%] md:h-[47%] lg:h-[75%] hidden md:flex md:bg-primary-white md:rounded-md md:mt-[3rem] lg:mt-[1.8rem]"></div>

            <div className="h-[75%] md:w-[50%] lg:w-[32.5%] lg:h-full lg:flex lg:flex-col lg:justify-center lg:gap-6 hidden">
              <div className="lg:ml-[4vw] lg:flex lg:flex-col lg:gap-6">
                <Image
                  src={hybridUniversity}
                  alt="neo uninus"
                  className="object-cover w-[110px] mt-[1rem] md:w-[130px] lg:w-[150px]"
                />
                <div className="lg:flex lg:gap-2 lg:w-[18vw]">
                  <EnvironmentFilled style={{ fontSize: 20, color: 'white' }} />
                  <p className="lg:text-primary-white lg:text-[10px]">
                    Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu, Kota
                    Bandung, Jawa Barat 40286
                  </p>
                </div>
                <div className="lg:flex lg:items-center lg:gap-2 lg:w-[18vw]">
                  <ContactsFilled style={{ fontSize: 20, color: 'white' }} />
                  <p className="lg:text-primary-white lg:text-[10px]">
                    0811-2161-530
                  </p>
                </div>
                <div className="lg:flex lg:items-center lg:gap-2 lg:w-[18vw]">
                  <MailFilled style={{ fontSize: 20, color: 'white' }} />
                  <p className="lg:text-primary-white lg:text-[10px]">
                    humas@uninus.ac.id
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:w-full md:h-[25%] md:absolute md:bottom-0 lg:hidden">
              <div className="md:w-[33.3%] md:flex md:justify-center md:items-center">
                <div className="md:flex md:justify-center md:items-center md:gap-2">
                  <EnvironmentFilled style={{ fontSize: 23, color: 'white' }} />
                  <div className="md:w-[14vw]">
                    {' '}
                    <p className="md:text-[8px] md:text-primary-white">
                      Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu, Kota
                      Bandung, Jawa Barat 40286
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-[33.3%] md:flex md:justify-center md:items-center md:gap-2">
                <ContactsFilled style={{ fontSize: 23, color: 'white' }} />
                <h3 className="md:text-sm md:text-primary-white">
                  0811-2161-530
                </h3>
              </div>
              <div className="md:w-[33.3%] md:flex md:justify-center md:items-center md:gap-2">
                <MailFilled style={{ fontSize: 23, color: 'white' }} />
                <h3 className="md:text-sm text-primary-white">
                  humas@uninus.ac.id
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* frame2 */}
      <section className="h-[60px] bg-primary-green flex items-center justify-between md:justify-start">
        <div className="w-[65%] md:w-[55%] flex justify-center lg:justify-start lg:ml-[2vw] items-center h-full">
          <p className="text-[10px] md:text-sm text-primary-white font-bold tracking-tight">
            © NEO UNIVERSITAS ISLAM NUSANTARA 2023
          </p>
        </div>
        <div className="w-[35%] md:w-[39%] flex gap-2 md:gap-8 justify-evenly md:justify-end h-full items-center">
          {/* Facebook */}
          <div className="group cursor-pointer">
            <div className="group-hover:scale-90 duration-300 ease-in-out">
              <Link
                href="https://www.facebook.com/uninusbandung"
                target="_blank"
                className="flex items-center"
              >
                <FacebookFilled style={{ fontSize: 20, color: 'white' }} />
              </Link>
            </div>
          </div>

          {/* Youtube */}
          <div className="group cursor-pointer">
            <div className="group-hover:scale-90 duration-300 ease-in-out">
              <Link
                href="https://www.youtube.com/@uninusbandung"
                target="_blank"
                className="flex items-center"
              >
                <YoutubeFilled style={{ fontSize: 20, color: 'white' }} />
              </Link>
            </div>
          </div>

          {/* Instagram */}
          <div className="group cursor-pointer">
            <div className="group-hover:scale-90 duration-300 ease-in-out">
              <Link
                href="https://instagram.com/uninusbandung"
                target="_blank"
                className="flex items-center"
              >
                <InstagramFilled style={{ fontSize: 20, color: 'white' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
