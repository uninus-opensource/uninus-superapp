import { FC, ReactElement } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export const DoughnutChart: FC = (): ReactElement => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const dataValues = [500, 400, 300, 200, 100];
  const total = dataValues.reduce((acc, value) => acc + value, 0);
  const percentageValues = dataValues.map((value) => ((value / total) * 100).toFixed(2) + "%");

  const dataDoughnut = {
    labels: [
      `${percentageValues[0]}% Reability`,
      `${percentageValues[1]}% Responsiveness`,
      `${percentageValues[2]}% Assurance`,
      `${percentageValues[3]}% Empathy`,
      `${percentageValues[4]}% Tangible`,
    ],
    datasets: [
      {
        label: "",
        data: dataValues,
        percentageValues: percentageValues,
        backgroundColor: ["#0F6C41", "#3EEA99", "#14D379", "#0BBC69", "#0C894F"],
        borderColor: ["#0F6C41", "#3EEA99", "#14D379", "#0BBC69", "#0C894F"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      options={{
        maintainAspectRatio: false, // Mengizinkan penyesuaian ukuran
        aspectRatio: 0.5,
        plugins: {
          legend: {
            position: "right", // Set legenda ke sisi kanan
            textDirection: "center",
            align: "center",
          },
        },
        responsive: true,
      }}
      data={dataDoughnut}
    />
  );
};
