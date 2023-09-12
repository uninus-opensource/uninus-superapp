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
      link: "https://uninus.ac.id/fkip-uninus-gelar-dies-natalis-ke-46-dan-reuni-akbar-rektor-uninus-kita-targetkan-2024-berpredikat-universitas-unggul/",
    },
    {
      image: "/illustrations/news3.webp",
      desc: "Program Studi S3 Jurusan Pendidikan Agama Islam Uninus",
      link: "https://uninus.ac.id/program-studi-s3-jurusan-pendidikan-agama-islam-uninus/",
    },
    {
      image: "/illustrations/news4.webp",
      desc: "Tausyiah dan Istighosah Rutin Uninus Bersama Syaikh Nashiruddin Isham At-Tamadi Al-Azhary.",
      link: "https://uninus.ac.id/tausyiah-dan-istighosah-rutin-uninus-bersama-syaikh-nashiruddin-isham-at-tamadi-al-azhary/",
    },
    {
      image: "/illustrations/news5.webp",
      desc: "Isi Kuliah Umum di Uninus, Prof M Nuh Nilai Uninus Reborn dan Bisa Jadi Universitas Unggul",
      link: "https://uninus.ac.id/isi-kuliah-umum-di-uninus-prof-m-nuh-nilai-uninus-reborn-dan-bisa-jadi-universitas-unggul/",
    },
  ];

  return (
    <section className="my-10  h-full w-full     gap-3 lg:px-14 px-4 py-2 flex flex-col  xl:px-32">
      <h1 className=" text-2xl text-center lg:text-4xl text-secondary-green-4 font-bold">
        Berita <span className="text-primary-green">Terkini</span>
      </h1>
      <h1 className="text-secondary-green-4  md:text-2xl text-md text-center">
        Cari tahu informasi terbaru dari Uninus disini
      </h1>
      <Link
        href="https://uninus.ac.id/category/berita/"
        target="_blank"
        className="flex justify-end items-end place-content-end"
      >
        <h1 className="text-secondary-green-4  md:text-xl text-md text-right font-bold ">
          Lihat Semua
        </h1>
      </Link>

      <div className="flex flex-row gap-x-4 justify-between xl:justify-center">
        <div className="bigest w-[47%] xl:w-30%">
          <Link
            href="https://uninus.ac.id/uninus-masuk-4-besar-kampus-islam-terbaik-di-jawa-barat/"
            target="_blank"
          >
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
                  <p className="text-base line-clamp-2 md:line-clamp-4">
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
          </Link>
        </div>
        <div className="w-1/2 xl:w-30% smallest hidden md:grid md:grid-cols-2 grid-cols-1 gap-4">
          {CardNews.map((x, i) => (
            <Link href={x.link} target="_blank">
              <CardImage>
                <figure>
                  <Image src={x.image} alt="news" width={300} height={150} className="w-full" />
                </figure>
                <figcaption>
                  {" "}
                  <div className="testimonial p-4 text-left  text-primary-black text-xs font-bold">
                    <p>{x.desc}</p>
                  </div>
                </figcaption>
              </CardImage>
            </Link>
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
