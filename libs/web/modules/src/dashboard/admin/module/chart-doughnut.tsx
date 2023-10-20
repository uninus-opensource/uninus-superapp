"use client";
import { ReactElement, FC, useMemo, useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetPopularProgram } from "../hook";

ChartJS.register(ArcElement, Tooltip, Legend);

export const RekapProgram: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("bulanan");

  const [registrationFilter, setRegistrationFilter] = useState({
    filter_type: "monthly",
  });

  const { data: getPopularData } = useGetPopularProgram(registrationFilter);

  const popularData = useMemo(() => {
    return getPopularData?.data;
  }, [getPopularData?.data]);

  const label = popularData?.map((item) => item.name);

  let dataset: number[] = [];

  if (chartType === "mingguan") {
    dataset = popularData?.map((item) => item.total) ?? [];
  } else if (chartType === "tahunan") {
    dataset = popularData?.map((item) => item.total) ?? [];
  } else {
    dataset = popularData?.map((item) => item.total) ?? [];
  }

  useEffect(() => {
    let convertFilterChart;

    if (chartType === "mingguan") {
      convertFilterChart = "weekly";
    } else if (chartType === "tahunan") {
      convertFilterChart = "yearly";
    } else {
      convertFilterChart = "monthly";
    }

    setRegistrationFilter({
      filter_type: convertFilterChart,
    });
  }, [chartType]);

  const dataDoughnut = {
    labels: label,
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
              onClick={() => {
                setChartType("mingguan");
              }}
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
