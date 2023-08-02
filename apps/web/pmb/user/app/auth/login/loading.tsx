export default function Loading() {
  return (
    <section className="w-full bg-primary-white z-50 py-8">
      {/* Head */}
      <section className="w-full h-[50vh] md:h-[38vh] flex items-start  md:flex animate-pulse mb-6  justify-center lg:p-4 ">
        <div className="flex flex-col  gap-x-4 mt-6 xl:mt-0 md:mx-auto lg:w-[90%] w-full">
          <div className="flex mb-5  md:mb-1 lg:ml-5 xl:ml-9 flex-col items-center gap-2 xl:gap-0 lg:items-start lg:mt-6 md:justify-center justify-center">
            <span className="bg-grayscale-2 w-[7rem] lg:mb-0 xl:mb-1  md:h-5 h-7 xl:w-[9rem] rounded-lg xl:h-10"></span>
            <span className="bg-grayscale-2 w-[15rem] h-5 md:h-3 rounded-lg   xl:h-5"></span>
          </div>

          <div className=" flex flex-col items-center lg:items-center justify-center mt-5 lg:mb-3 xl:mt-1 gap-y-1 lg:mt-2  lg:flex-nowrap lg:gap-1 md:gap-y-1 ">
            <span className="items1 self-start ml-8 lg:ml-5 xl:ml-9 bg-grayscale-2 mb-2 lg:mb-0 xl:mb-3 xl:w-[12rem] w-[27%] md:w-[20%] lg:w-[7rem] h-5 rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-[90%] w-[80%] md:w-[90%] lg:w-[90%] h-8  xl:h-9 rounded-lg"></span>
          </div>

          <div className=" flex flex-col items-center lg:items-center justify-center mt-5 xl:mt-1 lg:mb-3 gap-y-1 lg:mt-2  lg:flex-nowrap lg:gap-1 md:gap-y-1 ">
            <span className="items1 self-start ml-8 lg:ml-5 xl:ml-9 bg-grayscale-2 mb-2 lg:mb-0 xl:mb-3 xl:w-[12rem] w-[27%] md:w-[20%] lg:w-[7rem] h-5 rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-[90%] w-[80%] md:w-[90%] lg:w-[90%] h-8  xl:h-9 rounded-lg"></span>
          </div>

          <div className="flex flex-row items-center lg:px-6 mt-5 lg:mt-2 xl:flex   lg:gap-3 md:gap-y-8 justify-evenly xl:justify-between xl:px-10 lg:justify-between">
            <span className="bg-grayscale-2  xl:w-[20%] w-[27%] md:w-[20%] lg:w-[5rem]  h-5 rounded-lg"></span>
            <span className="bg-grayscale-2  xl:w-[30%] w-[40%] md:w-[30%] lg:w-[7rem] h-5 rounded-lg"></span>
          </div>
          <div className="flex justify-center mt-5 lg:mt-2 md:px-3">
            <span className="bg-grayscale-2 w-[80%] md:w-[93%]  h-14 md:h-12 rounded-lg xl:w-[92%] xl:h-14 lg:h-9"></span>
          </div>
        </div>
        {/* Form */}
      </section>
    </section>
  );
}
