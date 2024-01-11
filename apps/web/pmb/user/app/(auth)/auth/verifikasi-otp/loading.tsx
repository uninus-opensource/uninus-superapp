export default function Loading() {
  return (
    <section className="w-full bg-primary-white z-50 py-8">
      {/* Head */}
      <section className="w-full h-fit flex items-start  md:flex animate-pulse mb-6 px-12 lg:px-6 xl:px-2  justify-center  ">
        <div className="flex flex-col  gap-y-6 md:gap-y-6 lg:gap-y-5 mt-6 xl:mt-6  lg:w-[90%] w-full">
          <div className="flex     flex-col items-start gap-2 xl:gap-0 lg:items-start xl:ml-0  md:justify-center justify-center">
            <span className="bg-grayscale-2 w-[13rem] lg:w-[70%] md:w-[40%] lg:mb-0 xl:mb-1 lg:h-10  md:h-7 h-6 xl:w-[50%] rounded-lg xl:h-10"></span>
            <span className="bg-grayscale-2 w-[9rem] md:hidden h-6  rounded-lg   xl:h-5"></span>
          </div>

          <div className=" flex flex-col items-start justify-center  xl:gap-y-3 xl:mt-0  gap-y-2 mt-4 lg:mt-2 md:mt-2 md:gap-y-2  lg:gap-y-5  ">
            <span className="bg-grayscale-2 xl:w-[60%] w-[13rem] md:w-[70%] lg:w-[90%] h-4 md:h-4  xl:h-5 rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-[50%] w-[13rem] lg:hidden md:w-[20%] lg:w-[90%] h-4 md:h-4  xl:h-5 rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-[50%] w-[9rem] md:hidden md:w-[50%] lg:w-[90%] h-4 md:h-4  xl:h-5 rounded-lg"></span>
          </div>

          <div className=" flex flex-row items-start justify-center gap-x-1  xl:gap-y-3  gap-y-5 lg:mt-2 md:gap-y-4  lg:gap-y-5  ">
            <span className="bg-grayscale-2 xl:w-full w-[5rem] md:w-[40%] lg:w-full h-10 lg:h-[4rem] md:h-10 xl:h-[4rem] rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-full w-[5rem] md:w-[40%] lg:w-full h-10 lg:h-[4rem] md:h-10 xl:h-[4rem] rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-full w-[5rem] md:w-[40%] lg:w-full h-10 lg:h-[4rem] md:h-10 xl:h-[4rem] rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-full w-[5rem] md:w-[40%] lg:w-full h-10 lg:h-[4rem] md:h-10 xl:h-[4rem] rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-full w-[5rem] md:w-[40%] lg:w-full h-10 lg:h-[4rem] md:h-10 xl:h-[4rem] rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-full w-[5rem] md:w-[40%] lg:w-full h-10 lg:h-[4rem] md:h-10 xl:h-[4rem] rounded-lg"></span>
          </div>

          <div className=" flex flex-col items-start justify-center  xl:gap-y-3  gap-y-1 lg:mt-2 md:gap-y-4  lg:gap-y-5  ">
            <span className="bg-grayscale-2 xl:w-[20%] w-[12rem] md:w-[50%] lg:w-[40%] h-4 md:h-4  xl:h-5 rounded-lg"></span>
          </div>
        </div>
        {/* Form */}
      </section>
    </section>
  );
}
