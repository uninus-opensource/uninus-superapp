export default function Loading() {
  return (
    <section className="w-screen bg-slate-2 h-screen z-50">
      <div className="w-full h-[100px] items-center justify-between lg:h-navbarlg lg:px-14 flex top-0 animate-pulse">
        <div className="flex items-center gap-x-2">
          <div className="bg-grayscale-2 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-y-1">
            <span className="bg-grayscale-2 w-10 h-3 rounded-lg"></span>
            <span className="bg-grayscale-2 w-40 h-3 rounded-lg"></span>
            <span className="bg-grayscale-2 w-20 h-3 rounded-lg"></span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
        </div>
        <div className="bg-grayscale-2 w-32 h-8 rounded-lg"></div>
      </div>
      <section className="w-full h-[70vh] flex items-center animate-pulse">
        <div className="flex flex-col mx-auto gap-y-4 items-center">
          <span className="bg-grayscale-2 w-[50rem] h-10 rounded-lg"></span>
          <span className="bg-grayscale-2 w-[35rem] h-7 rounded-lg"></span>
          <span className="bg-grayscale-2 w-[50rem]  h-10 rounded-lg"></span>
          <span className="bg-grayscale-2 w-[20rem]  h-7 rounded-lg"></span>
          <div className="flex w-full gap-x-6 justify-center mt-8">
            <span className="bg-grayscale-2 w-32 h-14 rounded-lg"></span>
            <span className="bg-grayscale-2 w-32 h-14 rounded-lg"></span>
          </div>
        </div>
      </section>
    </section>
  );
}
