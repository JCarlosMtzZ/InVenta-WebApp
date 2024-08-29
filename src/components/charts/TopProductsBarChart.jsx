import { useState } from "react";

import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import SwitchArrowsButton from "../buttons/SwitchArrowsButton";

import { addShortProductName } from "../../utilities/dashboard";

function TopProductsBarChart({ firstData, lastData }) {

  const [isFirst, setIsFirst] = useState(true);

  const handleIsFirst = () => {
    setIsFirst(!isFirst);
  };

  const formattedFirstData = addShortProductName(firstData);
  const formattedLastData = addShortProductName(lastData);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col bg-white rounded-lg p-3 opacity-90 gap-1">
          <p className="font-semibold text-md">{`${payload[0].payload.productName}`}</p>
          <p className="text-sm">{`Unidades vendidas: ${payload[0].payload.totalUnits}`}</p>
          <p className="text-sm text-blue">{`Ingresos brutos: $${payload[0].payload.subtotal}`}</p>
          <p className="font-semibold text-sm text-ok-green">{`Ingresos netos: $${payload[0].payload.total}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-[540px]:w-[60%] flex flex-col p-2 rounded-lg shadow-md bg-white">
      <div className="py-1 px-2 flex justify-between">
        <p className="font-semibold text-lg">{`${isFirst ? 'Mejores productos' : 'Peores productos'}`}</p>
        <SwitchArrowsButton
          onClick={handleIsFirst}
        />
      </div>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart
          layout="vertical"
          data={isFirst ? formattedFirstData : formattedLastData}
          margin={{
            top: 10,
            right: 15,
            left: 35,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            label={{ value: 'Unidades vendidas', position: 'insideRight', dy: 25, dx: 8 }}
            />
          <YAxis type="category" dataKey="shortProductName" />
          <Tooltip content={<CustomTooltip />} />
          <Bar barSize={25} dataKey="totalUnits" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProductsBarChart;