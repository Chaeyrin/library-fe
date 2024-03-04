import { AreaChart } from "@tremor/react";

export function AreaChartDashboardAdmin({ chartData, isLoading }: any) {
  if (isLoading) {
    return <p>Loading data...</p>;
  }

  return (
    <AreaChart
      className="h-72"
      data={chartData}
      index="date"
      categories={["Total borrowed book data"]}
      colors={["blue-700"]}
      yAxisWidth={30}
    />
  );
}
