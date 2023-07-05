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
      <section>
        <div className="bg-secondary-green-4 z-10 absolute w-full h-[300px] opacity-95 flex">
          <section className="w-[33.3%] flex justify-center items-center">
            <Image
              src={NeoUninusIcon}
              alt="neo uninus"
              className="object-cover"
              width={270}
              height={78}
            />
          </section>

          {/* line */}
          <div className="bg-primary-white w-1 h-56 rounded-md mt-10"></div>
          {/* line */}

          <section className="w-[33.3%] flex flex-col justify-center gap-5">
            {/* Situs resmi uninus */}
            <div className="group hover:cursor-pointer">
              <Link href="https://uninus.ac.id/" target="_blank">
                <div className="flex items-center justify-center gap-3 group-hover:scale-95 duration-300 ease-in-out">
                  <GlobalOutlined style={{ fontSize: 25, color: 'white' }} />
                  <h3 className="font-bebasNeue font-bold text-2xl text-primary-white ">
                    SITUS RESMI UNINUS
                  </h3>
                </div>
              </Link>
            </div>

            {/* Unduh Brosur */}
            <div className="group hover:cursor-pointer">
              <div
                className="flex items-center ml-[17.7%] gap-3 group-hover:scale-95 duration-300 ease-in-out"
                onClick={() => alert('Brosurnya belum ada')}
              >
                <FileTextOutlined style={{ fontSize: 25, color: 'white' }} />
                <h3 className="font-bebasNeue font-bold text-2xl text-primary-white">
                  UNDUH BROSUR
                </h3>
              </div>
            </div>

            {/* Lokasi Kampus */}
            <div className="group hover:cursor-pointer">
              <Link
                href="https://goo.gl/maps/pdvgVFaFmzLhUeSs5"
                target="_blank"
              >
                <div className="flex items-center ml-[17.7%] gap-3 group-hover:scale-95 duration-300 ease-in-out">
                  <EnvironmentOutlined
                    style={{ fontSize: 25, color: 'white' }}
                  />
                  <h3 className="font-bebasNeue font-bold text-2xl text-primary-white">
                    LOKASI KAMPUS
                  </h3>
                </div>
              </Link>
            </div>

            {/* Hubungi Kami */}
            <div className="group hover:cursor-pointer">
              <Link href="tel:+628112161530" target="_blank">
                <div className="flex items-center ml-[17.7%] gap-3 group-hover:scale-95 duration-300 ease-in-out">
                  <PhoneOutlined style={{ fontSize: 25, color: 'white' }} />
                  <h3 className="font-bebasNeue font-bold text-2xl text-primary-white">
                    HUBUNGI KAMI
                  </h3>
                </div>
              </Link>
            </div>
          </section>

          {/* line */}
          <div className="bg-primary-white w-1 h-56 rounded-md mt-10"></div>
          {/* line */}

          <section className="w-[33.3%] flex flex-col justify-center gap-5">
            <div className="ml-[18%]">
              <Image
                src={hybridUniversity}
                alt="hybrid university"
                width={148}
                height={53}
              />
            </div>

            {/* Alamat */}
            <div className="group hover:cursor-pointer">
              <Link
                href="https://goo.gl/maps/pdvgVFaFmzLhUeSs5"
                target="_blank"
              >
                <div className="flex items-center ml-[18.7%] gap-3 group-hover:scale-95 duration-300 ease-in-out">
                  <EnvironmentFilled style={{ fontSize: 25, color: 'white' }} />
                  <h3 className="text-xs text-primary-white w-[178px] h-[45px]">
                    Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu, Kota
                    Bandung, Jawa Barat 40286
                  </h3>
                </div>
              </Link>
            </div>

            {/* Kontak */}
            <div className="group hover:cursor-pointer">
              <Link href="tel:+628112161530" target="_blank">
                <div className="flex items-center ml-[18.7%] gap-3 group-hover:scale-95 duration-300 ease-in-out">
                  <ContactsFilled style={{ fontSize: 25, color: 'white' }} />
                  <h3 className="text-xs text-primary-white">0811-2161-530</h3>
                </div>
              </Link>
            </div>

            {/* Email */}
            <div className="group hover:cursor-pointer">
              <Link href="mailto:humas@uninus.ac.id" target="_blank">
                <div className="flex items-center ml-[18.7%] gap-3 group-hover:scale-95 duration-300 ease-in-out">
                  <MailFilled style={{ fontSize: 25, color: 'white' }} />
                  <h3 className="text-xs text-primary-white">
                    humas@uninus.ac.id
                  </h3>
                </div>
              </Link>
            </div>
          </section>
        </div>

        {/* backgroundImage */}
        <div className="z-0 relative">
          <Image
            src={uninusImage}
            alt="uninus"
            className="w-screen object-cover h-[300px]"
          />
        </div>
      </section>

      {/* frame2 */}
      <section>
        <div className="w-full h-[60px] bg-primary-green flex items-center justify-between px-[52px]">
          <p className="font-bebasNeue text-xl leading-6 text-grayscale-1 font-extrabold">
            © NEO UNIVERSITAS ISLAM NUSANTARA 2023
          </p>

          {/* Facebook */}
          <div className="flex gap-5">
            <div className="group cursor-pointer">
              <div className="group-hover:scale-90 duration-300 ease-in-out">
                <Link
                  href="https://www.facebook.com/uninusbandung"
                  target="_blank"
                >
                  <FacebookFilled style={{ fontSize: 25, color: 'white' }} />
                </Link>
              </div>
            </div>

            {/* Youtube */}
            <div className="group cursor-pointer">
              <div className="group-hover:scale-90 duration-300 ease-in-out">
                <Link
                  href="https://www.youtube.com/@uninusbandung"
                  target="_blank"
                >
                  <YoutubeFilled style={{ fontSize: 25, color: 'white' }} />
                </Link>
              </div>
            </div>

            {/* Instagram */}
            <div className="group cursor-pointer">
              <div className="group-hover:scale-90 duration-300 ease-in-out">
                <Link
                  href="https://instagram.com/uninusbandung"
                  target="_blank"
                >
                  <InstagramFilled style={{ fontSize: 25, color: 'white' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
