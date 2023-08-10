export default function Loading() {
  return (
    <section className="w-full bg-primary-white z-50 py-8">
      {/* Head */}
      <section className="w-full h-fit flex items-start  md:flex animate-pulse mb-6 px-12 lg:px-2 xl:px-0 justify-center  ">
        <div className="flex flex-col  gap-y-6 md:gapy-4 lg:gap-y-5 mt-6 xl:mt-0  lg:w-[90%] w-full">
          <div className="flex   md:mb-1   flex-col items-start gap-2 xl:gap-0 lg:items-start xl:ml-0  md:justify-center justify-center">
            <span className="bg-grayscale-2 w-[7rem] lg:w-[13rem] md:w-[40%] lg:mb-0 xl:mb-1 lg:h-8  md:h-7 h-7 xl:w-[40%] rounded-lg xl:h-10"></span>
            <span className="bg-grayscale-2 w-[9rem] md:hidden h-7  rounded-lg   xl:h-5"></span>
          </div>

          <div className=" flex flex-col items-start justify-center    gap-y-9 lg:mt-2 md:gap-y-8 lg:flex-nowrap lg:gap-y-8  ">
            <span className="bg-grayscale-2 xl:w-[50%] w-full md:w-[50%] lg:w-[90%] h-6 md:h-4  xl:h-5 rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-full w-full  lg:w-[90%] h-9 lg:h-8 md:h-7 xl:h-10 rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-full w-full  lg:w-[90%] h-10  xl:h-12 rounded-lg"></span>
          </div>
        </div>
        {/* Form */}
      </section>
    </section>
  );
}
