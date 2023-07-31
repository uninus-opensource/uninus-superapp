export default function Loading() {
  return (
    <section className="w-full bg-primary-white z-50">
      {/* Head */}
      <section className="w-full h-[50vh] md:h-[35vh] flex items-center md:flex animate-pulse mb-6">
        <div className="flex flex-col gap-x-5 gap-y-4 md:mx-auto lg:w-[90%] w-full">
          <span className="bg-grayscale-2 mx-2 w-[7rem] h-7 rounded-lg"></span>

          <div className="flex flex-col justify-center md:px-3">
            <span className="bg-grayscale-2 lg:w-[30%] md:w-full w-full mt-2 h-6 rounded-lg"></span>
            <span className="bg-grayscale-2 w-[90%] md:w-full mt-8 h-10 rounded-lg"></span>
          </div>
          <div className="flex justify-center md:px-3">
            <span className="bg-grayscale-2 w-[90%] md:w-full mt-4 h-10 rounded-lg"></span>
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
