export type ProdiProps = {
  name: string;
  img: string;
  visi?: string;
  prodi: { prod: string; akreditasi: string; about?: string; specials?: { special: string }[] }[];
};
