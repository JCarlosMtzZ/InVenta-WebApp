import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

function IncomeRadialBarChart({ data }) {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="flex flex-col bg-white rounded-lg p-3 opacity-80 gap-1">
          <p className="font-semibold text-md">{`${name === 'subtotal' ? 'Ingresos brutos' : 'Ingresos netos'}`}</p>
          <p className="text-sm">{`$${value}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="absolute bottom-0 bg-ok-green w-full flex items-center justify-evenly gap-1">
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center gap-1">
              <div style={{ backgroundColor: entry.color }} className={`w-[10px] h-[10px] rounded-sm`}></div>
              <p className="text-sm">
                {`${entry.value === 'subtotal' ? 'Brutos' : 'Netos'}`}
              </p>
            </li>
          ))
        }
      </ul>
    );
  };

  return (
    <div className="relative flex flex-col p-2 rounded-lg shadow-sm">
      <p className="text-lg font-semibold border">Ingresos totales</p>
      <RadialBarChart
        width={200} 
        height={200} 
        cx="50%"
        cy="44%"
        innerRadius="40%"
        outerRadius="100%"
        barSize={18}
        data={data}
        className="bg-mag-light"
      >
        <Legend content={renderLegend} />
        <Tooltip content={<CustomTooltip />} />
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="value"
        />
    </RadialBarChart>
    </div>
  );
};

export default IncomeRadialBarChart;