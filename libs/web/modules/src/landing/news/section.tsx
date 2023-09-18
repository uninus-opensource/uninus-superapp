import { CardImage } from "@uninus/web/components";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { TNews } from "./type";
import Link from "next/link";

export const NewsSection: FC = (): ReactElement => {
  const CardNews: TNews[] = [
    {
      image: "/illustrations/news2.webp",
      heading: "FKIP Uninus Menggelar Peringatan Dies Natalis ke-46 dan Reuni Akbar.",
      desc: "FKIP Uninus merayakan ulang tahunnya yang ke-46 dengan peringatan Dies Natalis dan mengadakan Reuni Akbar",
      link: "https://uninus.ac.id/fkip-uninus-gelar-dies-natalis-ke-46-dan-reuni-akbar-rektor-uninus-kita-targetkan-2024-berpredikat-universitas-unggul/",
    },
    {
      image: "/illustrations/news3.webp",
      heading: "Program Studi S3 Jurusan Pendidikan Agama Islam Uninus",
      desc: "Program Studi S3 Jurusan Pendidikan Agama Islam di Universitas Negeri Islam (Uninus).",
      link: "https://uninus.ac.id/program-studi-s3-jurusan-pendidikan-agama-islam-uninus/",
    },
    {
      image: "/illustrations/news4.webp",
      heading:
        "Tausyiah dan Istighosah Rutin Uninus Bersama Syaikh Nashiruddin Isham At-Tamadi Al-Azhary.",
      desc: "Uninus secara rutin mengadakan acara Tausyiah dan Istighosah bersama Syaikh Nashiruddin Isham At-Tamadi Al-Azhary.",
      link: "https://uninus.ac.id/tausyiah-dan-istighosah-rutin-uninus-bersama-syaikh-nashiruddin-isham-at-tamadi-al-azhary/",
    },
    {
      image: "/illustrations/news5.webp",
      heading:
        "Isi Kuliah Umum di Uninus, Prof M Nuh Nilai Uninus Reborn dan Bisa Jadi Universitas Unggul",
      desc: "Profesor M. Nuh memberikan penilaian positif terhadap perkembangan Uninus yang disebut &quot;Uninus Reborn&quot; dan potensinya untuk menjadi universitas unggul.",
      link: "https://uninus.ac.id/isi-kuliah-umum-di-uninus-prof-m-nuh-nilai-uninus-reborn-dan-bisa-jadi-universitas-unggul/",
    },
  ];

  return (
    <section
      key="news-section"
      className="my-10  h-full w-full gap-3 lg:px-14 px-4 py-2 flex flex-col  xl:px-32"
    >
      <h1 className=" text-2xl text-center lg:text-4xl text-secondary-green-4 font-bold">
        Berita <span className="text-primary-green">Terkini</span>
      </h1>
      <h1 className="text-secondary-green-4  md:text-2xl text-md text-center">
        Cari tahu informasi terbaru dari Uninus disini
      </h1>
      <Link
        href="https://uninus.ac.id/category/berita/"
        target="_blank"
        className="flex justify-end items-end place-content-end lg:mr-[6.5vw]"
      >
        <h1 className="text-secondary-green-4  md:text-lg text-md text-right font-bold ">
          Lihat Semua
        </h1>
      </Link>

      <div className="flex flex-col gap-10 md:flex-row md:gap-x-4 mx-[5vw] md:mx-0 justify-between xl:justify-evenly">
        <div className="bigest w-full md:w-[47%] xl:w-30%">
          <Link
            href="https://uninus.ac.id/uninus-masuk-4-besar-kampus-islam-terbaik-di-jawa-barat/"
            target="_blank"
          >
            <CardImage height="h-auto">
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
                  <p className="md:text-2xl text-xl font-bold">
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
                    <p>{x.heading}</p>
                  </div>
                </figcaption>
              </CardImage>
            </Link>
          ))}
        </div>
        <div className=" md:hidden smallest grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-10">
          {CardNews.map((x, i) => (
            <CardImage>
              <figure className="h-1/2 md:h-0">
                <Image
                  src={x.image}
                  alt="news"
                  width={300}
                  height={70}
                  className="rounded-xl md:rounded-none w-full h-full md:h-0 object-center object-cover"
                />
              </figure>
              <figcaption className="w1/2 h-1/2  md:h-0">
                {" "}
                <div className="testimonial p-4 md:p-2 text-xl md:text-base text-left my-2 text-primary-black text-[9px] md:font-semibold flex flex-col md:flex-row gap-2">
                  <p className="font-bold text-xl">{x.heading}</p>
                  <p className="text-base ">{x.desc}</p>
                </div>
              </figcaption>
            </CardImage>
          )).slice(0, 2)}
        </div>
      </div>
    </section>
  );
};
