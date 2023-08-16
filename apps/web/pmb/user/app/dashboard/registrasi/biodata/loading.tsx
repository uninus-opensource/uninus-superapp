export default function Loading() {
  return (
    <section className="w-full h-screen flex bg-grayscale-1 gap-x-2">
      <div className=" w-full h-auto flex flex-col p-4 gap-y-4 animate-pulse">
        <div className="w-full h-auto flex justify-center lg:justify-start items-center lg:items-start flex-col gap-y-2">
          <span className="bg-grayscale-2 w-1/4 h-4 lg:h-7 rounded-lg"></span>
          <span className="bg-grayscale-2 w-1/6 h-4 lg:h-7 rounded-lg"></span>
        </div>
        <div className="w-full lg:px-4 lg:py-6 rounded-md h-[50vh] flex flex-col gap-y-2 lg:h-[80vh] bg-slate-3">
          <span className="bg-slate-4 w-full h-16 rounded-lg"></span>
          <span className="bg-slate-4 w-full h-16 rounded-lg"></span>
          <span className="bg-slate-4 w-full h-16 rounded-lg"></span>
          <span className="bg-slate-4 w-full h-16 rounded-lg"></span>
        </div>
      </div>
    </section>
  );
}
