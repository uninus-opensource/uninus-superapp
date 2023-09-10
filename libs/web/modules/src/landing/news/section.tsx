import { CardImage } from "@uninus/web/components";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { TNews } from "./type";
import Link from "next/link";

export const NewsSection: FC = (): ReactElement => {
  const CardNews: TNews[] = [
    {
      image: "/illustrations/news2.webp",
      desc: "FKIP Uninus Menggelar Peringatan Dies Natalis ke-46 dan Reuni Akbar.",
      link: "/news/1",
    },
    {
      image: "/illustrations/news3.webp",
      desc: "FKIP Uninus Menggelar Peringatan Dies Natalis ke-46 dan Reuni Akbar.",
      link: "/news/2",
    },
    {
      image: "/illustrations/news4.webp",
      desc: "FKIP Uninus Menggelar Peringatan Dies Natalis ke-46 dan Reuni Akbar.",
      link: "/news/3",
    },
    {
      image: "/illustrations/news5.webp",
      desc: "Isi Kuliah Umum di Uninus, Prof M Nuh Nilai Uninus Reborn dan Bisa Jadi Universitas Unggul",
      link: "/news/4",
    },
  ];

  return (
    <section className="my-10  h-full w-full gap-3 lg:px-16 px-4 py-2 flex flex-col  ">
      <h1 className=" text-2xl text-center lg:text-4xl text-secondary-green-4 font-bold">
        Berita <span className="text-primary-green">Terkini</span>
      </h1>
      <h1 className="text-secondary-green-4  md:text-2xl text-md text-center">
        Cari tahu informasi terbaru dari Uninus disini
      </h1>
      <h1 className="text-secondary-green-4  md:text-2xl text-md text-right font-bold ">
        Lihat Semua
      </h1>

      <div className="flex flex-row gap-x-4">
        <div className="bigest w-1/2">
          <CardImage>
            <figure>
              <Image
                src="/illustrations/news1.webp"
                alt="news"
                width={300}
                height={300}
                className="w-full rounded-xl"
              />
            </figure>
            <figcaption>
              <div className="testimonial p-4 text-left md:text-md text-sm md:my-5 my-2 text-primary-black font-medium gap-3 flex flex-col mr-5">
                <p className="md:text-2xl text-xs font-bold">
                  Uninus Masuk 4 Besar Kampus Islam Terbaik di Bandung
                </p>
                <p className="text-xs line-clamp-2 md:line-clamp-4">
                  Universitas Islam Nusantara (Uninus) meraih peringkat empat Universitas Islam
                  terbaik di Jawa Barat Versi UniRank.
                </p>
                <Link
                  href="https://uninus.ac.id/uninus-masuk-4-besar-kampus-islam-terbaik-di-jawa-barat/"
                  target="_blank"
                >
                  <p className="text-[#175349]">selengkapnya....</p>
                </Link>
              </div>
            </figcaption>
          </CardImage>
        </div>
        <div className="w-1/2 smallest hidden md:grid md:grid-cols-2 grid-cols-1 gap-4">
          {CardNews.map((x, i) => (
            <CardImage>
              <figure>
                <Image src={x.image} alt="news" width={300} height={150} className="w-full" />
              </figure>
              <figcaption>
                {" "}
                <div className="testimonial p-4 text-left my-2 text-primary-black text-xs font-bold">
                  <p>{x.desc}</p>
                </div>
              </figcaption>
            </CardImage>
          ))}
        </div>
        <div className=" md:hidden smallest grid md:grid-cols-2 grid-cols-1 gap-4">
          {CardNews.map((x, i) => (
            <CardImage>
              <figure className="">
                <Image
                  src={x.image}
                  alt="news"
                  width={300}
                  height={70}
                  className="w-full  object-center object-cover"
                />
              </figure>
              <figcaption className="w1/2">
                {" "}
                <div className="testimonial p-2 text-left my-2 text-primary-black text-[9px] font-semibold ">
                  <p>{x.desc}</p>
                </div>
              </figcaption>
            </CardImage>
          )).slice(0, 2)}
        </div>
      </div>
    </section>
  );
};
