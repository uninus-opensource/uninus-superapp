export default function Loading() {
  return (
    <section className="w-screen bg-slate-2 h-screen z-50 ">
      {/*Start skeleton navbar */}
      <div className="w-full h-[100px] items-center justify-between px-7 lg:h-navbarlg lg:px-14 flex  overflow-x-hidden animate-pulse">
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
      <div className="w-full lg:h-[50vh] h-[35vh]  bg-slate-3 flex relative items-center px-7 pt-3  animate-pulse ">
        <div className="flex w-[70vw] md:w-[50vw] flex-col absolute  md:pl-9 gap-2">
          <span className=" h-14 bg-grayscale-2 rounded-3xl "></span>
        </div>
      </div>
      <div className="flex gap-x-4 mt-7 md:mt-8 items-center  px-7 bg-slate-3 w-[90vw] lg:h-32 h-20 mx-auto rounded-lg animate-pulse">
        <span className="w-full  md:w-24 lg:h-24 h-10   bg-grayscale-2 rounded-lg"></span>
        <span className="w-[50rem] lg:w-full h-10 lg:h-24 bg-grayscale-2 rounded-lg mx-auto"></span>
      </div>
      {/*Start skeleton body */}
    </section>
  );
}
