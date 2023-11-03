import { FC, ReactElement } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { SelectOption } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";
export const BarChart: FC = (): ReactElement => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });
  const label = ["2018", "2019", "2020", "2021", "2022", "2023"];
  const dataValues = [130, 45, 83, 178, 32, 45];
  const data = {
    labels: label,
    datasets: [
      {
        label: "",
        data: dataValues,
        borderColor: "#71FFB4",
        backgroundColor: "#D6FFE9",
      },
    ],
  };

  const options = {
    indexAxis: "x" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-40%  lg:w-40% xl:w-45%  h-fit rounded-md shadow-md p-6">
      <section>
        <div className="flex justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">
            Rekapitulasi Data Lulusan
          </h1>
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
        <div className=" w-full lg:w-35% h-[400px] lg:h-[300px] xl:h-[450px] xl:w-40% flex justify-center items-center">
          <Bar options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
