"use client";
import { ReactElement, FC, useState } from "react";
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
import { SelectOption } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";

export const ChartSkor: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("genap");

  const { control, watch } = useForm<FieldValues>({
    defaultValues: {},
  });

  const rekap = watch("rekap");

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 3,
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

  let labels: string[] = [];
  let totalRegistrations: number[] = [];
  let unpaids: number[] = [];
  let paids: number[] = [];
  let receiveds: number[] = [];

  switch (chartType) {
    case "ganjil":
      labels = ["September", "Oktober", "November", "Desemmber", "Januari", "Februari"];
      totalRegistrations = [9, 4, 4, 6, 14, 7];
      unpaids = [15, 2, 2, 11, 21, 19];
      paids = [9, 3, 6, 8, 8, 7];
      receiveds = [7, 5, 6, 2, 10, 11];
      break;
    case "genap":
      labels = ["Maret", "April", "Mei", "Juni", "Juli", "Agustus"];
      totalRegistrations = [19, 24, 14, 26, 4, 17];
      unpaids = [9, 3, 6, 8, 8, 7];
      paids = [7, 5, 6, 2, 10, 11];
      receiveds = [15, 2, 2, 11, 21, 19];

      break;

      labels = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      totalRegistrations = [14, 10, 32, 11, 20, 19, 16];
      unpaids = [1, 9, 21, 19, 1, 13, 4];
      paids = [19, 13, 15, 9, 6, 3, 4];
      receiveds = [11, 6, 4, 5, 20, 11, 1];
      break;
    default:
      labels = [];
      totalRegistrations = [];
      unpaids = [];
      paids = [];
      receiveds = [];
      break;
  }

  const isTotalRegistrations = rekap === "2" || rekap === "3" || rekap === "4";
  const isUnpaids = rekap === "1" || rekap === "3" || rekap === "4";
  const isPaids = rekap === "1" || rekap === "2" || rekap === "4";
  const isReceiveds = rekap === "1" || rekap === "2" || rekap === "3";

  const data = {
    labels,
    datasets: [
      {
        label: "Reability",
        borderColor: "#00BF56",
        backgroundColor: "#00BF56",
        data: totalRegistrations,
        hidden: isTotalRegistrations,
      },
      {
        label: "Responsive",
        borderColor: "#B0DEC6",
        backgroundColor: "#B0DEC6",
        data: unpaids,
        hidden: isUnpaids,
      },
      {
        label: "Assurance",
        borderColor: "#BB2D3B",
        backgroundColor: "#BB2D3B",
        data: paids,
        hidden: isPaids,
      },
      {
        label: "Empathy",
        borderColor: "#F8BF02",
        backgroundColor: "#F8BF02",
        data: receiveds,
        hidden: isReceiveds,
      },
      {
        label: "Tangible",
        borderColor: "#009647",
        backgroundColor: "#009647",
        data: receiveds,
        hidden: isReceiveds,
      },
    ],
  };

  return (
    <div className="lg:w-45% w-full h-[500px] rounded-md shadow-md p-6">
      <section>
        <div className="w-full flex justify-between">
          <h1 className="text-md py-2 font-bold text-secondary-green-4 ">
            Rekapitulasi Penilain Sesuai Kategori Soal
          </h1>
          <div className="w-[35%]">
            <SelectOption
              name="rekap"
              options={[
                {
                  value: "1",
                  label: "Reability",
                },
                {
                  value: "2",
                  label: "Responsive",
                },
                {
                  value: "3",
                  label: "Assurance",
                },
                {
                  value: "4",
                  label: "Empathy",
                },
                {
                  value: "5",
                  label: "Tangible",
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

        <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2 ">
          <section className="flex text-md gap-4 text-slate-5">
            <div
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "ganjil" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("ganjil")}
            >
              Ganjil
            </div>
            <div
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "genap" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("genap")}
            >
              Genap
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
