export default function Loading() {
  return (
    <section className="w-screen bg-slate-2 h-screen z-50">
      {/*Start skeleton navbar */}
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
      {/*End skeleton navbar */}
      {/*Start skeleton body */}
      <div className="w-full h-[40vh] md:h-[30vh] lg:h-[60vh] bg-slate-3 flex relative animate-pulse ">
        <div className="flex flex-col absolute left-4 lg:left-24 bottom-20 md:bottom-24 lg:bottom-52 gap-2">
          <span className="w-48 md:w-52 lg:w-64 h-12 bg-grayscale-2 rounded-3xl"></span>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 lg:gap-y-6 mt-16 lg:mt-4 items-center justify-center animate-pulse">
        <span className="w-[18rem] md:w-[30rem] lg:w-[40rem] h-8 bg-grayscale-2 rounded-3xl"></span>
        <span className="w-[20rem] lg:w-[40rem] h-8 bg-grayscale-2 rounded-3xl block lg:hidden"></span>
        <span className="w-[10rem] lg:w-[40rem] h-8 bg-grayscale-2 rounded-3xl block md:hidden"></span>
        <span className="w-[20rem] lg:w-[30rem] h-2 lg:h-8 bg-grayscale-2 rounded-3xl mt-20 lg:mt-0"></span>
        <span className="w-[17rem] lg:w-[40rem] h-2 bg-grayscale-2 rounded-3xl block lg:hidden"></span>
        <span className="w-[13rem] lg:w-[40rem] h-2 bg-grayscale-2 rounded-3xl block lg:hidden"></span>
      </div>
      {/*Start skeleton body */}
    </section>
  );
}
