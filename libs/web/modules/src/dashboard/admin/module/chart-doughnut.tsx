"use client";
import { ReactElement, FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const dataDoughnut = {
  labels: ["Program Sarjana(S1)", "Program Pascarsarjana(S2)", "Program Pascasarjana(S3)"],
  datasets: [
    {
      label: "",
      data: [60, 15, 25],
      backgroundColor: ["#02E56D", "#06753B", "#009647"],
      borderColor: ["#02E56D", "#06753B", "#009647"],
      borderWidth: 1,
    },
  ],
};

export const RekapProgram: FC = (): ReactElement => {
  return (
    <div className="lg:w-[340px] md:w-full w-full h-[500px] rounded-md shadow-md p-6">
      <section>
        <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">
          Minat Program Pendidikan
        </h1>

        <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2 ">
          <section className="flex text-md gap-4 text-slate-5">
            <div className="p-1 hover:shadow-md hover:rounded-md hover:text-primary-green">
              Mingguan
            </div>
            <div className="p-1 hover:shadow-md hover:rounded-md hover:text-primary-green">
              Bulanan
            </div>
            <div className="p-1 hover:shadow-md hover:rounded-md hover:text-primary-green">
              Tahunan
            </div>
          </section>
        </div>
        <div className="pt-8">
          <Doughnut
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                  textDirection: "left",
                },
              },
            }}
            data={dataDoughnut}
          />
        </div>
      </section>
    </div>
  );
};
