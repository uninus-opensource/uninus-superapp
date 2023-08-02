export default function Loading() {
  return (
    <section className="w-screen bg-slate-2 h-screen z-50">
      {/*Start skeleton navbar */}
      <div className="w-full h-[100px] items-center justify-between lg:h-navbarlg lg:px-14 flex top-0 animate-pulse">
        <div className="flex items-center gap-x-2">
          <div className="bg-grayscale-2 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-y-1">
            <span className="bg-grayscale-2 w-10 h-3 rounded-lg"></span>
            <span className="bg-grayscale-2 w-40 h-3 rounded-lg"></span>
            <span className="bg-grayscale-2 w-20 h-3 rounded-lg"></span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
          <span className="bg-grayscale-2 w-24 h-5 rounded-lg"></span>
        </div>
        <div className="bg-grayscale-2 w-32 h-8 rounded-lg"></div>
      </div>
      {/*End skeleton navbar */}
      {/*Start skeleton body */}
      <div className="w-full h-[60vh] bg-slate-3 flex relative animate-pulse ">
        <div className="flex flex-col absolute left-0 lg:left-24 bottom-52 gap-2">
          <span className="w-64 h-12 bg-grayscale-2 rounded-3xl"></span>
        </div>
      </div>
      <div className="flex gap-x-6 mt-4 items-center animate-pulse px-10 bg-slate-3 w-5/6 h-32 mx-auto rounded-lg">
        <span className="w-24 h-24 bg-grayscale-2 rounded-lg"></span>
        <span className="w-[50rem] h-8 bg-grayscale-2 rounded-lg mx-auto"></span>
      </div>
      {/*Start skeleton body */}
    </section>
  );
}
