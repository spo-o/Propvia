import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

type Props = {
  monthlyProfit: number;
}

export default function RevenueChart({ monthlyProfit }: Props) {
  const labels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
  const dataPoints = [1, 2, 3, 4, 5].map(
    year => monthlyProfit * 12 * (1 + year * 0.1)
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Projected Revenue",
        data: dataPoints,
        fill: false,
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} options={options} width={200} height={200} />;
};