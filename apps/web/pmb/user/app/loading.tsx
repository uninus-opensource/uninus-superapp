export default function Loading() {
  return (
    <section key="root-loading" className="w-screen bg-slate-2 h-screen z-50 overflow-x-hidden">
      <div className="w-full h-[100px] items-center justify-between px-7 lg:h-navbarlg lg:px-14 flex animate-pulse overflow-x-hidden">
        <div className="flex items-center gap-x-2">
          <div className="bg-grayscale-2 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-y-1">
            <span className="bg-grayscale-2 w-10 h-3 rounded-lg"></span>
            <span className="bg-grayscale-2 w-32 lg:w-40 h-3 rounded-lg"></span>
            <span className="bg-grayscale-2 w-20 h-3 rounded-lg"></span>
          </div>
        </div>
        <div className="items-center gap-x-4 hidden lg:flex">
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
        </div>
        <div className="bg-grayscale-2 w-32 h-8 rounded-lg hidden lg:block"></div>
        <div className="bg-grayscale-2 w-9 h-9 rounded-lg mr-4 lg:hidden block"></div>
      </div>
      <section className="w-full h-auto lg:h-[70vh] flex items-center bg-slate-3 animate-pulse py-5 sm:py-8 ">
        <div className="flex flex-col mx-auto gap-y-4 items-center md:py-12">
          <span className="bg-grayscale-2 w-[65vw] sm:w-[70vw] lg:w-[50rem] h-4 sm:h-6 lg:h-10 rounded-lg"></span>
          <span className="bg-grayscale-2 w-[70vw] sm:w-[60vw] lg:w-[35rem] h-4 sm:h-5 lg:h-7 rounded-lg"></span>
          <span className="bg-grayscale-2 w-[75vw] sm:w-[70vw] lg:w-[50rem] h-5 sm:h-6 lg:h-10 rounded-lg"></span>
          <span className="bg-grayscale-2 w-[60vw] sm:w-[40vw] lg:w-[20rem] h-7 rounded-lg"></span>
          <div className="flex w-full gap-x-10 lg:gap-x-6 justify-center lg:mt-8">
            <span className="bg-grayscale-2 w-32 h-10 lg:h-14 rounded-lg"></span>
            <span className="bg-grayscale-2 w-32 h-10 lg:h-14 rounded-lg"></span>
          </div>
        </div>
      </section>

      <section className="w-[20rem] md:w-[50rem] h-64 block lg:hidden lg:h-[70vh] mx-auto rounded-lg bg-slate-3 animate-pulse mt-32"></section>
    </section>
  );
}
