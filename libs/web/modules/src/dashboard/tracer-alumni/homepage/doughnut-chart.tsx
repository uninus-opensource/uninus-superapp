import { FC, ReactElement } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
export const DoughnutChart: FC = (): ReactElement => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const label = ["Bekerja", "Studi Lanjut", "Belum Bekerja"];
  // const labelsDatasets = ["Bekerja", "Studi Lanjut", "Belum Bekerja", "2019", "2018", "2017"];
  const dataValues = [500, 400, 300];
  const dataDoughnut = {
    labels: label,
    datasets: [
      {
        label: "",
        data: dataValues,
        backgroundColor: ["#02E56D", "#F9CC35", "#E3642C"],
        borderColor: ["#02E56D", "#F9CC35", "#E3642C"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="lg:w-25% xl:w-20% md:w-full w-full h-[500px] xl:h-[535px] lg:h-[400px] rounded-md shadow-md p-6 flex flex-col lg:gap-y-1 xl:gap-y-[3rem] items-center">
      <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4 text-center">
        Statistik Karir Alumni
      </h1>
      <div className="pt-6 lg:w-25% xl:w-15% xl:h-[300px] md:w-full w-full h-[500px] lg:h-[400px] flex justify-center items-center">
        <Doughnut
          options={{
            plugins: {
              legend: {
                position: "bottom",
                textDirection: "center",
                align: "center",
                labels: {
                  textAlign: "center",
                },
              },
            },
            responsive: true,
          }}
          data={dataDoughnut}
        />
      </div>
    </div>
  );
};
