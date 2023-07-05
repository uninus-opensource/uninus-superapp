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
            <div className="flex items-center justify-center gap-3">
              <GlobalOutlined style={{ fontSize: 25, color: 'white' }} />
              <h3 className="font-bebasNeue font-bold text-2xl text-primary-white">
                SITUS RESMI UNINUS
              </h3>
            </div>
            <div className="flex items-center ml-[18%] gap-3">
              <FileTextOutlined style={{ fontSize: 25, color: 'white' }} />
              <h3 className="font-bebasNeue font-bold text-2xl text-primary-white">
                UNDUH BROSUR
              </h3>
            </div>
            <div className="flex items-center ml-[18%] gap-3">
              <EnvironmentOutlined style={{ fontSize: 25, color: 'white' }} />
              <h3 className="font-bebasNeue font-bold text-2xl text-primary-white">
                LOKASI KAMPUS
              </h3>
            </div>
            <div className="flex items-center ml-[18%] gap-3">
              <PhoneOutlined style={{ fontSize: 25, color: 'white' }} />
              <h3 className="font-bebasNeue font-bold text-2xl text-primary-white">
                HUBUNGI KAMI
              </h3>
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
            <div className="flex items-center ml-[18%] gap-3">
              <EnvironmentFilled style={{ fontSize: 25, color: 'white' }} />
              <h3 className="text-xs text-primary-white w-[178px] h-[45px]">
                Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu, Kota
                Bandung, Jawa Barat 40286
              </h3>
            </div>
            <div className="flex items-center ml-[18%] gap-3">
              <ContactsFilled style={{ fontSize: 25, color: 'white' }} />
              <h3 className="text-xs text-primary-white">0811-2161-530</h3>
            </div>
            <div className="flex items-center ml-[18%] gap-3">
              <MailFilled style={{ fontSize: 25, color: 'white' }} />
              <h3 className="text-xs text-primary-white">humas@uninus.ac.id</h3>
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
          <div className="flex gap-5">
            <FacebookFilled style={{ fontSize: 25, color: 'white' }} />
            <YoutubeFilled style={{ fontSize: 25, color: 'white' }} />
            <InstagramFilled style={{ fontSize: 25, color: 'white' }} />
          </div>
        </div>
      </section>
    </footer>
  );
};
