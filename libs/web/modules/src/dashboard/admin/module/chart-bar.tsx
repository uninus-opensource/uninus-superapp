"use client";
import { ReactElement, FC, useState, useMemo, useEffect } from "react";
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
import { useGetPopularDepartment } from "../hook";

export const ChartProgram: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("bulanan");

  const [registrationFilter, setRegistrationFilter] = useState<{
    filter_type: string;
    degree_program_id: string;
  }>({
    filter_type: "",
    degree_program_id: "1",
  });

  const { data: getPopularDepartment } = useGetPopularDepartment(registrationFilter);

  const popularData = useMemo(() => {
    return getPopularDepartment;
  }, [getPopularDepartment]);

  const { control, watch } = useForm<FieldValues>({
    defaultValues: {},
  });

  const rekap = watch("rekap");

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
      degree_program_id: rekap,
    });
  }, [chartType, rekap]);

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
  let dataValues: (number | undefined)[] = [];

  switch (chartType) {
    case "mingguan":
      dataValues = [
        popularData?.kpi,
        popularData?.pai,
        popularData?.pgmi,
        popularData?.pbs,
        popularData?.agrotek,
        popularData?.akuntansi,
        popularData?.manajemen,
        popularData?.iHukum,
        popularData?.iKomunikasi,
        popularData?.iPerpustakaan,
        popularData?.pba,
        popularData?.pbsi,
        popularData?.pbing,
        popularData?.pgpaud,
        popularData?.plb,
        popularData?.pls,
        popularData?.pmath,
        popularData?.ppkn,
        popularData?.te,
        popularData?.tif,
        popularData?.ti,
      ];
      break;
    case "bulanan":
      dataValues = [
        popularData?.kpi,
        popularData?.pai,
        popularData?.pgmi,
        popularData?.pbs,
        popularData?.agrotek,
        popularData?.akuntansi,
        popularData?.manajemen,
        popularData?.iHukum,
        popularData?.iKomunikasi,
        popularData?.iPerpustakaan,
        popularData?.pba,
        popularData?.pbsi,
        popularData?.pbing,
        popularData?.pgpaud,
        popularData?.plb,
        popularData?.pls,
        popularData?.pmath,
        popularData?.ppkn,
        popularData?.te,
        popularData?.tif,
        popularData?.ti,
      ];
      break;
    case "tahunan":
      dataValues = [
        popularData?.kpi,
        popularData?.pai,
        popularData?.pgmi,
        popularData?.pbs,
        popularData?.agrotek,
        popularData?.akuntansi,
        popularData?.manajemen,
        popularData?.iHukum,
        popularData?.iKomunikasi,
        popularData?.iPerpustakaan,
        popularData?.pba,
        popularData?.pbsi,
        popularData?.pbing,
        popularData?.pgpaud,
        popularData?.plb,
        popularData?.pls,
        popularData?.pmath,
        popularData?.ppkn,
        popularData?.te,
        popularData?.tif,
        popularData?.ti,
      ];
      break;
    default:
      dataValues = [];
  }

  if (rekap === "2") {
    labels = ["Administrasi Pendidikan (S2)", "Pendidikan Agama Islam (S2)", "Ilmu Hukum (S2)"];
    labelsDatasets = `Program studi S2 (${chartType})`;
    dataValues = [popularData?.mAdmPendidikan, popularData?.mPai, popularData?.mIHukum];
  } else if (rekap === "3") {
    labels = ["Ilmu Pendidikan (S3)"];
    labelsDatasets = `Program studi S3 (${chartType})`;
    dataValues = [popularData?.dIPendidikan];
  } else {
    labels = [
      "Komunikasi Penyiaran Islam",
      "Pendidikan Agama Islam",
      "Pendidikan Guru Madrasah ibtidaiyah",
      "Perbankan Syariah",
      "Agroteknologi",
      "Akuntansi",
      "Manajemen",
      "Ilmu Hukum",
      "Ilmu Komunikasi",
      "Ilmu perpustakaan",
      "Bahasa Arab",
      "Bahasa dan Sastra Indonesia",
      "Bahasa Inggris",
      "Pendidikan Guru Pendidikan Anak Usia Dini(PG-PAUD)",
      "Pendidikan Luar Biasa (PLB)",
      "Pendidikan Luar Sekolah (PLS)",
      "Matematika",
      "Pendidikan Pancasila dan Kewarganegaraan (PPKn)",
      "Teknik Elektronika",
      "Teknik Informatika",
      "Teknik Industri",
    ];
    labelsDatasets = `Program studi S1 (${chartType})`;
    dataValues = [
      popularData?.kpi,
      popularData?.pai,
      popularData?.pgmi,
      popularData?.pbs,
      popularData?.agrotek,
      popularData?.akuntansi,
      popularData?.manajemen,
      popularData?.iHukum,
      popularData?.iKomunikasi,
      popularData?.iPerpustakaan,
      popularData?.pba,
      popularData?.pbsi,
      popularData?.pbing,
      popularData?.pgpaud,
      popularData?.plb,
      popularData?.pls,
      popularData?.pmath,
      popularData?.ppkn,
      popularData?.te,
      popularData?.tif,
      popularData?.ti,
    ];
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
        <div className="w-full h-[550px] pt-8">
          <Bar options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
