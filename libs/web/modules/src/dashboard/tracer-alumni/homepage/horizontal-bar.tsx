import { SelectOption } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
export const HorizontalBar: FC = (): ReactElement => {
  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });
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
        display: false,
      },
    },
  };
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  const label = ["TIF", "TE", "TI", "Agro", "Ilkom", "PBSI", "PBI"];
  const dataValues = [300, 700, 100, 50, 1042, 732, 857];

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
  return (
    <div className="md:w-[67vw] w-full h-fit rounded-md shadow-md p-6">
      <section className="flex flex-col gap-y-8">
        <div className="w-full flex justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4">
            Rekapitulasi Data Lulusan Fakultas
          </h1>
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

        <div className="w-full h-fit xl:h-[600px] p-6 ">
          <Bar options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
