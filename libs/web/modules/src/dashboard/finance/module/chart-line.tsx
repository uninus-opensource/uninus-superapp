"use client";
import { ReactElement, FC, useState, useEffect } from "react";
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
import { paymentSummary } from "./store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useGetPaymentSummary } from "./hook";
export const ChartRekap: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("bulanan");
  const paymentSummaryData = useRecoilValue(paymentSummary);
  const { control, watch } = useForm<FieldValues>({
    defaultValues: {},
  });
  const setPaymentData = useSetRecoilState(paymentSummary);

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
      __example: convertFilterChart,
    });
  }, [chartType]);

  const [registrationFilter, setRegistrationFilter] = useState({
    __example: "monthly",
  });
  const { data: paymentHistory } = useGetPaymentSummary(registrationFilter);
  useEffect(() => {
    setPaymentData(paymentHistory);
  }, [paymentHistory]);
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
  const labelsFilter = paymentSummaryData?.data?.map((item) => item.label) ?? [];

  let totalStudent: number[] = [];
  const totalStudentFilter = paymentSummaryData?.data?.map((item) => item.total_student) ?? [];

  let paids: number[] = [];
  const totalPaidsFilter = paymentSummaryData?.data?.map((item) => item.paid) ?? [];

  let unpaids: number[] = [];
  const totalUnpaidFilter = paymentSummaryData?.data?.map((item) => item.unpaid) ?? [];

  let installmentPayments: number[] = [];
  const installmentPaymentsFilter =
    paymentSummaryData?.data?.map((item) => item.installment_payment) ?? [];

  const isTotalStudent = rekap === "2" || rekap === "3" || rekap === "4";
  const isUnpaids = rekap === "1" || rekap === "3" || rekap === "4";
  const isPaids = rekap === "1" || rekap === "2" || rekap === "4";
  const isInstallmentPayment = rekap === "1" || rekap === "2" || rekap === "3";
  switch (chartType) {
    case "tahunan":
      labels = labelsFilter;
      totalStudent = totalStudentFilter;
      paids = totalPaidsFilter;
      unpaids = totalUnpaidFilter;
      installmentPayments = installmentPaymentsFilter;
      break;
    case "bulanan":
      labels = labelsFilter;
      totalStudent = totalStudentFilter;
      paids = totalPaidsFilter;
      unpaids = totalUnpaidFilter;
      installmentPayments = installmentPaymentsFilter;
      break;
    case "mingguan":
      labels = labelsFilter.reverse();
      totalStudent = totalStudentFilter.reverse();
      paids = totalPaidsFilter.reverse();
      unpaids = totalUnpaidFilter.reverse();
      installmentPayments = installmentPaymentsFilter.reverse();
      break;
    default:
      labels = [];
      totalStudent = [];
      paids = [];
      unpaids = [];
      installmentPayments = [];
      break;
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Total Mahasiswa",
        borderColor: "#009647",
        backgroundColor: "#009647",
        data: totalStudent,
        hidden: isTotalStudent,
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
        data: installmentPayments,
        hidden: isInstallmentPayment,
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
