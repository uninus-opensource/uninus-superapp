"use client";
import { ReactElement, FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: [60, 80, 60, 40, 20, 40, 60],
      borderColor: "#71FFB4",
      backgroundColor: "#D6FFE9",
    },
  ],
};

export const ChartProgram: FC = (): ReactElement => {
  return (
    <div className="w-full h-auto rounded-md shadow-md p-6">
      <section>
        <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">Program Studi</h1>

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
        <div className="w-full h-[350px] pt-8">
          <Bar options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
