export default function Loading() {
  return (
    <section className="w-full bg-primary-white z-50 py-8">
      {/* Head */}
      <section className="w-full h-[53vh] md:h-[35vh] flex items-center md:flex animate-pulse mb-6">
        <div className="flex flex-col  gap-x-4 gap-y-5 md:mx-auto lg:w-[90%] w-full">
          <div className="flex gap-8 ml-5 justify-start">
            <span className="bg-grayscale-2 w-[7rem] h-7 rounded-lg mb-4"></span>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 lg:flex-nowrap lg:gap-3 justify-center">
            <span className="bg-grayscale-2 xl:w-[48%] w-[90%] md:w-[45%] lg:w-[12rem] h-10 rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-[48%] w-[90%] md:w-[45%] lg:w-[12rem] h-10 rounded-lg"></span>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-nowrap lg:gap-3 justify-center">
            <span className="bg-grayscale-2 xl:w-[48%] w-[90%] md:w-[45%] lg:w-[12rem] h-10 rounded-lg"></span>
            <span className="bg-grayscale-2 xl:w-[48%] w-[90%] md:w-[45%] lg:w-[12rem] h-10 rounded-lg"></span>
          </div>

          <div className="flex justify-center md:px-3">
            <span className="bg-grayscale-2 w-[90%] md:w-full mt-8 h-10 rounded-lg"></span>
          </div>
        </div>
        {/* Form */}
      </section>
    </section>
  );
}
