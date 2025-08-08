import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  sqft: number;
  renovationCost: number;
};

export default function ExpensesPieChart({ sqft, renovationCost }: Props) {
  const expenses = [
    { label: "Rent", value: renovationCost * 0.008 },
    { label: "Utilities", value: sqft * 1.5 },
    { label: "Insurance", value: renovationCost * 0.002 },
    { label: "Maintenance", value: sqft * 0.75 },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };


  const data = {
    labels: expenses.map(e => e.label),
    datasets: [
      {
        data: expenses.map(e => e.value),
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
      },
    ],
  };

  return <Pie data={data} options={options} width={200} height={200} />;
}
