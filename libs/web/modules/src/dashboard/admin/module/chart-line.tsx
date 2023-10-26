"use client";
import { ReactElement, FC, useState, useEffect, useMemo } from "react";
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
import { useGetRegistrans } from "../hook";

export const ChartRekap: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("bulanan");

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
      start_date: "",
      end_date: "",
    });
  }, [chartType]);

  const [registrationFilter, setRegistrationFilter] = useState({
    filter_type: "monthly",
    start_date: "",
    end_date: "",
  });

  const { data: registrationData } = useGetRegistrans(registrationFilter);

  const getRegistraionData = useMemo(() => {
    return registrationData?.data;
  }, [registrationData?.data]);

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
  const labelsFilter = getRegistraionData?.map((item) => item.label) ?? [];

  let totalInterest: number[] = [];
  const totalInterestFilter = getRegistraionData?.map((item) => item.total_interest) ?? [];

  let totalRegistrations: number[] = [];
  const totalRegistrationsFilter = getRegistraionData?.map((item) => item.total_registrans) ?? [];

  let paidsForm: number[] = [];
  const totalPaidsFormFilter = getRegistraionData?.map((item) => item.paids_form) ?? [];

  let receiveds: number[] = [];
  const totalReceivedsFilter = getRegistraionData?.map((item) => item.accepted_registrans) ?? [];

  let paidsUKT: number[] = [];
  const totalPaidsUKT = getRegistraionData?.map((item) => item.paids_ukt) ?? [];

  switch (chartType) {
    case "tahunan":
      labels = labelsFilter.reverse();
      totalInterest = totalInterestFilter.reverse();
      totalRegistrations = totalRegistrationsFilter.reverse();
      paidsForm = totalPaidsFormFilter.reverse();
      receiveds = totalReceivedsFilter.reverse();
      paidsUKT = totalPaidsUKT.reverse();
      break;
    case "bulanan":
      labels = labelsFilter;
      totalInterest = totalInterestFilter;
      totalRegistrations = totalRegistrationsFilter;
      paidsForm = totalPaidsFormFilter;
      receiveds = totalReceivedsFilter;
      paidsUKT = totalPaidsUKT;
      break;
    case "mingguan":
      labels = labelsFilter.reverse();
      totalInterest = totalInterestFilter.reverse();
      totalRegistrations = totalRegistrationsFilter.reverse();
      paidsForm = totalPaidsFormFilter.reverse();
      receiveds = totalReceivedsFilter.reverse();
      paidsUKT = totalPaidsUKT.reverse();
      break;
    default:
      labels = [];
      totalInterest = [];
      totalRegistrations = [];
      paidsForm = [];
      receiveds = [];
      paidsUKT = [];
      break;
  }

  const isTotalInterest = rekap === "2" || rekap === "3" || rekap === "4" || rekap === "5";
  const isTotalRegistrations = rekap === "1" || rekap === "3" || rekap === "4" || rekap === "5";
  const isPaidForm = rekap === "1" || rekap === "2" || rekap === "4" || rekap === "5";
  const isReceiveds = rekap === "1" || rekap === "2" || rekap === "3" || rekap === "5";
  const isPaidUKT = rekap === "1" || rekap === "2" || rekap === "3" || rekap === "4";

  const data = {
    labels,
    datasets: [
      {
        label: "Total Peminat",
        borderColor: "#BB2D3B",
        backgroundColor: "#BB2D3B",
        data: totalInterest,
        hidden: isTotalInterest,
      },
      {
        label: "Total Pendaftar",
        borderColor: "#0CA3D2",
        backgroundColor: "#0CA3D2",
        data: totalRegistrations,
        hidden: isTotalRegistrations,
      },
      {
        label: "Membayar Formulir",
        borderColor: "#F89602",
        backgroundColor: "#F89602",
        data: paidsForm,
        hidden: isPaidForm,
      },
      {
        label: "Lulus",
        borderColor: "#009647",
        backgroundColor: "#009647",
        data: receiveds,
        hidden: isReceiveds,
      },
      {
        label: "Membayar UKT",
        borderColor: "#60FFAB",
        backgroundColor: "#60FFAB",
        data: paidsUKT,
        hidden: isPaidUKT,
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
                  label: "Total Peminat",
                },
                {
                  value: "2",
                  label: "Total Pendaftar",
                },
                {
                  value: "3",
                  label: "Membayar Formulir",
                },
                {
                  value: "4",
                  label: "Lulus",
                },
                {
                  value: "5",
                  label: "Membayar UKT",
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
        <div className="w-full h-[350px] pt-8">
          <Line options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
