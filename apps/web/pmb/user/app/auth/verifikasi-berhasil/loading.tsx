export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full gap-4 p-12 lg:pt-20">
      <div className="rounded-full w-28 h-28 bg-grayscale-2 animate-pulse"></div>
      <div className="flex flex-col justify-center items-center gap-3 text-center">
        <div className="w-[11em] h-10 bg-grayscale-2 rounded-lg"></div>
        <div className="w-[70vw] md:w-[40vw] h-8 bg-grayscale-2 rounded-lg"></div>
        <div className="w-[30vw] h-8 bg-grayscale-2 rounded-lg"></div>
      </div>
      <div className="w-[7em] h-10 bg-grayscale-2 rounded-lg"></div>
    </section>
  );
}
