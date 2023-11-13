"use client";
import { ReactElement, FC, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartPercent: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("bulanan");

  let dataset: number[] = [];
  const labels: string[] = [];

  if (chartType === "ganjil") {
    dataset = [10, 10, 3];
  } else {
    dataset = [17, 3, 3];
  }

  const dataDoughnut = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: dataset,
        backgroundColor: ["#02E56D", "#06753B"],
        borderColor: ["#02E56D", "#06753B"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="lg:w-[300px] md:w-full w-full h-[500px] rounded-md shadow-md p-6">
      <section>
        <h1 className="text-md font-bold text-secondary-green-4">
          Rekap Pengisian Kuisioner Mahasiswa
        </h1>

        <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2 ">
          <section className="flex text-md gap-4 text-slate-5">
            <button
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "mingguan" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("genap")}
            >
              Genap
            </button>
            <button
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "bulanan" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("ganjil")}
            >
              Ganjil
            </button>
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
