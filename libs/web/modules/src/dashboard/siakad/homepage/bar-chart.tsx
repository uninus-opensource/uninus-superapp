import { FC, ReactElement } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
export const BarChart: FC = (): ReactElement => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  const label = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const ips = [3, 3.6, 3.5, 3.7, 3.5, 3.5, 3.5];
  const ipk = [3.2, 3.2, 3, 3.5, 3.1, 3, 3];

  const data = {
    labels: label,
    datasets: [
      {
        label: "IPS",
        data: ips,
        borderColor: "#02E56D",
        backgroundColor: "#02E56D",
      },
      {
        label: "IPK",
        data: ipk,
        borderColor: "#009647",
        backgroundColor: "#009647",
      },
    ],
  };
  const options = {
    indexAxis: "x" as const,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 4,
        ticks: {
          // forces step size to be 50 units
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Semester",
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="w-full bg-primary-white lg:w-40% xl:w-45%  h-auto rounded-md shadow-md p-6">
      <section>
        <div className="flex justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">Grafik Studi</h1>
        </div>
        <div className="lg:pt-11 pt-0 w-full lg:w-35% h-full  xl:h-[400px] xl:w-40% flex justify-center items-center">
          <Bar options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
