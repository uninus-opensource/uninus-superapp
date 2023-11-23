"use client";
import { SelectOption } from "@uninus/web/components";
import { administrationData, calendarAcademicData } from "./store";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
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

export const DashboardTataUsahaModule = () => {
  const [chartType, setChartType] = useState("bulanan");

  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
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
        position: "bottom" as const,
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "Mahasiswa Aktif",
        data: [85, 108, 87, 60, 80, 60, 50],
        borderColor: "#009647",
        backgroundColor: "#009647",
      },
      {
        label: "Dosen",
        data: [40, 20, 80, 20, 10, 20, 40],
        borderColor: "#F8BF02",
        backgroundColor: "#F8BF02",
      },
      {
        label: "Dosen Wali",
        data: [60, 80, 60, 40, 20, 40, 60],
        borderColor: "#E3642C",
        backgroundColor: "#E3642C",
      },
    ],
  };

  return (
    <section className="flex flex-col w-full h-auto">
      {/* header */}
      <div className="pl-5 flex flex-col justify-center w-full h-[4.5rem]">
        <h1 className="text-[1.5rem] lg:text-[1.2rem] text-grayscale-5 font-medium">
          TU <span className="text-secondary-green-4">/ Beranda</span>
        </h1>
        <h1 className="text-[1.5rem] lg:text-[1.2rem] text-secondary-green-4 font-bold">Beranda</h1>
      </div>

      {/* card section */}
      <div className="w-full h-auto flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 md:gap-5 lg:gap-3 py-5">
        {administrationData.map((item, index) => (
          <div
            className="w-5/6 md:w-[45%] lg:w-[23%] flex items-center h-[5.5rem] shadow-card rounded-md"
            key={index}
          >
            <div className={`${item.className} h-14 w-[5px] rounded-sm ml-5`}></div>
            <div className="flex flex-col ml-5 lg:ml-3">
              <h3
                className={`capitalize text-[1.3rem] ${
                  item.title === "mahasiswa non aktif" ? "lg:text-[0.85rem]" : "lg:text-[1.1rem]"
                } xl:text-[1.2rem] font-medium`}
              >
                {item.title}
              </h3>
              <h3 className="text-[1.5rem] font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-[98%] flex flex-col lg:flex-row items-center lg:items-start lg:gap-2 lg:justify-between">
        {/* chart line */}
        <div className="lg:w-45% w-5/6 md:w-[90%] lg:w-[55%] h-[520px] rounded-md shadow-md p-6 lg:ml-5">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">
              Rekapitulasi Data
            </h1>
            <div className="w-[35%]">
              <SelectOption
                name="rekap"
                options={[
                  {
                    value: "1",
                    label: "Mahasiswa Aktif",
                  },
                  {
                    value: "2",
                    label: "Dosen",
                  },
                  {
                    value: "3",
                    label: "Dosen Wali",
                  },
                ]}
                placeholder="Semua"
                required={false}
                control={control}
                className="w-full"
                isClearable={true}
              />
            </div>
          </div>

          <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2">
            <section className="flex text-md gap-4 text-slate-5">
              <button
                className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                  chartType === "mingguan"
                    ? "font-bold text-primary-green shadow-md rounded-md"
                    : ""
                }`}
                onClick={() => setChartType("mingguan")}
              >
                mingguan
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
          <div className="w-full h-[350px] pt-5 ">
            <Line options={options} data={data} />
          </div>
        </div>

        {/* academic calendear */}
        <div className="w-5/6 md:w-[90%] lg:w-[40%] shadow-md flex flex-col rounded-md gap-2 md:mt-3 pb-5">
          <div className="w-full ml-5">
            <h2 className="capitalize text-[1.2rem] md:text-[1.3rem] font-bold mt-10 lg:mt-4">
              kalendar akademik
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {calendarAcademicData.map((item, index) => (
              <div
                key={index}
                className="w-5/6 md:w-[90%] p-4 lg:p-5 md:pl-7 flex flex-col gap-2 ml-5 shadow-lg rounded-md"
              >
                <h3 className="capitalize text-dark-default font-medium text-base md:text-lg">
                  {item.title}
                </h3>
                <p className="text-slate-5 text-sm md:text-base">{item.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
