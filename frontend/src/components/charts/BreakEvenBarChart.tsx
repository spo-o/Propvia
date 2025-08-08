import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

type Props = {
  breakevenMonths: number;
  maxMonths?: number;
};

export default function BreakEvenBarChart({
  breakevenMonths,
  maxMonths = 36,
}: Props) {
  const data = {
    labels: ["Break-Even Timeline"],
    datasets: [
      {
        label: "Reached",
        data: [breakevenMonths],
        backgroundColor: "#3B82F6",
      },
      {
        label: "Remaining",
        data: [Math.max(maxMonths - breakevenMonths, 0)],
        backgroundColor: "#E5E7EB",
      },
    ],
  };


  const options = {
    maintainAspectRatio: false,
    indexAxis: "x" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        max: maxMonths,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} width={200} height={200} />;
}
