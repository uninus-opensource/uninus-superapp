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

export const ChartRekap: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("bulanan");

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
          stepSize: 5,
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
    case "tahunan":
      labels = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      totalRegistrations = [9, 4, 4, 6, 14, 7, 8, 10, 22, 8, 5, 9];
      unpaids = [15, 2, 2, 11, 21, 19, 16, 9, 8, 5, 2, 3];
      paids = [9, 3, 6, 8, 8, 7, 4, 13, 15, 10, 19, 11];
      receiveds = [7, 5, 6, 2, 10, 11, 6, 8, 11, 2, 10, 8];
      break;
    case "bulanan":
      labels = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      totalRegistrations = [19, 24, 14, 26, 4, 17, 28, 9, 10, 8, 5, 7];
      unpaids = [9, 3, 6, 8, 8, 7, 4, 13, 15, 10, 19, 11];
      paids = [7, 5, 6, 2, 10, 11, 6, 8, 11, 2, 10, 8];
      receiveds = [15, 2, 2, 11, 21, 19, 16, 9, 8, 5, 2, 3];

      break;
    case "mingguan":
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
        label: "Total Pendaftar",
        borderColor: "#009647",
        backgroundColor: "#009647",
        data: totalRegistrations,
        hidden: isTotalRegistrations,
      },
      {
        label: "Belum Membayar",
        borderColor: "#BB2D3B",
        backgroundColor: "#BB2D3B",
        data: unpaids,
        hidden: isUnpaids,
      },
      {
        label: "Sudah Membayar",
        borderColor: "#085F33",
        backgroundColor: "#085F33",
        data: paids,
        hidden: isPaids,
      },
      {
        label: "Sudah Diterima",
        borderColor: "#00BF56",
        backgroundColor: "#00BF56",
        data: receiveds,
        hidden: isReceiveds,
      },
    ],
  };

  return (
    <div className="lg:w-45% w-full h-[500px] rounded-md shadow-md p-6">
      <section>
        <div className="w-full flex justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">Rekapitulasi Data</h1>
          <div className="w-[35%]">
            <SelectOption
              name="rekap"
              options={[
                {
                  value: "1",
                  label: "Total Pendaftar",
                },
                {
                  value: "2",
                  label: "Belum Membayar",
                },
                {
                  value: "3",
                  label: "Sudah Membayar",
                },
                {
                  value: "4",
                  label: "Sudah Diterima",
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
                chartType === "mingguan" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("mingguan")}
            >
              mingguan
            </div>
            <div
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "bulanan" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("bulanan")}
            >
              Bulanan
            </div>
            <div
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green ${
                chartType === "tahunan" ? "font-bold text-primary-green shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("tahunan")}
            >
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
