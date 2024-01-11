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
        <div className="flex w-[70vw] md:w-[50vw] flex-col absolute  pb-14 md:pl-9  gap-2">
          <span className=" h-14 bg-grayscale-2 rounded-3xl"></span>
        </div>
      </div>
      <span className="flex gap-x-4 mt-4 md:mt-8 items-center  px-7 bg-grayscale-2  w-2/3 lg:w-2/4 lg:h-32 h-16 mx-auto rounded-lg animate-pulse"></span>
      <div className="w-full flex flex-wrap px-7 gap-9 animate-pulse justify-center items-center pt-16">
        <span className="w-[15rem] h-[15rem] bg-grayscale-2 rounded-lg lg:hidden"></span>
        <span className="w-[15rem] h-[15rem] bg-grayscale-2 rounded-lg hidden md:block lg:hidden"></span>
      </div>
      {/*Start skeleton body */}
    </section>
  );
}
