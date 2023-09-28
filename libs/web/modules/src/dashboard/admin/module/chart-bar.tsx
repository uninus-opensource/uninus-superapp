"use client";
import { ReactElement, FC, useState } from "react";
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
import { SelectOption } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";

export const ChartProgram: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("bulanan");

  const { control, watch } = useForm<FieldValues>({
    defaultValues: {},
  });

  const rekap = watch("rekap");

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
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

  let labels = [];
  let labelsDatasets: string;
  let dataValues: number[] = [];

  switch (chartType) {
    case "mingguan":
      dataValues = [
        35, 42, 28, 56, 48, 60, 72, 90, 44, 62, 75, 68, 45, 50, 38, 55, 40, 55, 62, 78, 50,
      ];
      break;
    case "bulanan":
      dataValues = [
        60, 80, 60, 40, 20, 40, 60, 60, 80, 60, 40, 20, 40, 60, 60, 80, 60, 40, 20, 40, 60,
      ];
      break;
    case "tahunan":
      dataValues = [
        50, 65, 70, 80, 60, 42, 55, 35, 48, 60, 38, 65, 60, 68, 75, 50, 55, 40, 70, 72, 90, 4,
      ];
      break;
    default:
      dataValues = [];
  }

  if (rekap === "2") {
    labels = ["Administrasi Pendidikan (S2)", "Pendidikan Agama Islam (S2)", "Ilmu Hukum (S2)"];
    labelsDatasets = `Program studi S2 (${chartType})`;
  } else if (rekap === "3") {
    labels = ["Ilmu Pendidikan (S3)"];
    labelsDatasets = `Program studi S3 (${chartType})`;
  } else {
    labels = [
      "Pendidikan Agama Islam",
      "Perbankan Syariah",
      "Pendidikan Guru Madrasah ibtidaiyah",
      "Komunikasi Penyiaran Islam",
      "Pendidikan Luar Biasa (PLB)",
      "Pendidikan Luar Sekolah (PLS)",
      "Pendidikan Guru Pendidikan Anak Usia Dini(PG-PAUD)",
      "Bahasa dan Sastra Indonesia",
      "Bahasa Inggris",
      "Bahasa Arab",
      "Matematika",
      "Pendidikan Pancasila dan Kewarganegaraan (PPKn)",
      "Teknik Elektronika",
      "Teknik Informatika",
      "Teknik Industri",
      "Ilmu Komunikasi",
      "Ilmu perpustakaan",
      "Akuntansi",
      "Manajemen",
      "Ilmu Hukum",
      "Agroteknologi",
    ];
    labelsDatasets = `Program studi S1 (${chartType})`;
  }

  const data = {
    labels,
    datasets: [
      {
        label: labelsDatasets,
        data: dataValues,
        borderColor: "#71FFB4",
        backgroundColor: "#D6FFE9",
      },
    ],
  };

  return (
    <div className="w-full h-auto rounded-md shadow-md p-6">
      <section>
        <div className="w-full flex justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">Program Studi</h1>
          <div className="w-[35%]">
            <SelectOption
              name="rekap"
              options={[
                {
                  value: "1",
                  label: "Program Sarjana(S1)",
                },
                {
                  value: "2",
                  label: "Program Pascasarjana(S2)",
                },
                {
                  value: "3",
                  label: "Program Pascasarjana(S3)",
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
              Mingguan
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
        <div className="w-full h-[550px] pt-8">
          <Bar options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
