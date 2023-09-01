"use client";
import { ReactElement, FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  aspectRatio: 1,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Belum Membayar",
      borderColor: "#BB2D3B",
      data: [85, 108, 87, 60, 80, 60, 50],
      backgroundColor: "#BB2D3B",
      tension: 0.1,
    },
    {
      label: "Sudah Membayar",
      data: [40, 20, 80, 20, 10, 20, 40],
      borderColor: "#085F33",
      backgroundColor: "#085F33",
    },
    {
      label: "Total Pendaftar",
      data: [60, 80, 60, 40, 20, 40, 60],
      borderColor: "#00BF56",
      backgroundColor: "#00BF56",
    },
    {
      label: "Total Pendaftar",
      data: [80, 100, 40, 20, 50, 100, 80],
      borderColor: "#009647",
      backgroundColor: "#009647",
    },
  ],
};

export const ChartRekap: FC = (): ReactElement => {
  return (
    <div className="lg:w-45% w-full h-[500px] rounded-md shadow-md p-6">
      <section>
        <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">Rekapitulasi Data</h1>

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
          <Line options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
