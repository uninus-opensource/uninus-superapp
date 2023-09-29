"use client";
import { ReactElement, FC, useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { usePopularPrograms } from "@uninus/web/services";

ChartJS.register(ArcElement, Tooltip, Legend);

export const RekapProgram: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("bulanan");
  const { getPopularData } = usePopularPrograms();

  const popularData = useMemo(() => {
    return getPopularData;
  }, [getPopularData]);

  // const values = popularData?.data.map((items) => items.total);
  const labels = popularData?.data.map((items) => items.name);

  let dataset: number[] = [];

  if (chartType === "mingguan") {
    dataset = [10, 10, 3];
  } else if (chartType === "tahunan") {
    dataset = [7, 7, 9];
  } else {
    dataset = [17, 3, 3];
  }

  const dataDoughnut = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: dataset,
        backgroundColor: ["#02E56D", "#06753B", "#009647"],
        borderColor: ["#02E56D", "#06753B", "#009647"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="lg:w-[340px] md:w-full w-full h-[500px] rounded-md shadow-md p-6">
      <section>
        <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">
          Minat Program Pendidikan
        </h1>

        <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2 ">
          <section className="flex text-md gap-4 text-slate-5">
            <button
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "mingguan" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("mingguan")}
            >
              Mingguan
            </button>
            <button
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "bulanan" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("bulanan")}
            >
              Bulanan
            </button>
            <button
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "tahunan" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("tahunan")}
            >
              Tahunan
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
