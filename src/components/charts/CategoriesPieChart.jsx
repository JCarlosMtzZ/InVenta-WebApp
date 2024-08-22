import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

function CategoriesPieChart({ absTotalUnits, data, dataKey }) {

  const COLORS = [
    '#605399', '#ada1e6', '#e4def9', '#ebc1ee', '#d562be'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { categoryName, totalUnits, total } = payload[0].payload;
      const percent = (100 / absTotalUnits * totalUnits).toFixed(2);
      return (
        <div className="flex flex-col bg-white rounded-lg p-3 opacity-80 gap-1">
          <p className="font-semibold text-md">{`${categoryName} (${percent}%)`}</p>
          <p className="text-sm">{`Unidades vendidas: ${totalUnits}`}</p>
          <p className="font-semibold text-sm text-ok-green">{`Ingresos netos: $${total}`}</p>
          </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="absolute bottom-[25px] right-0 bg-ok-green w-[150px] h-[150px] flex flex-col justify-center gap-1">
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center gap-1">
              <div style={{ backgroundColor: entry.color }} className={`w-[10px] h-[10px] rounded-sm`}></div>
              <p className="text-sm">
                {`${entry.payload.categoryName} (${(entry.payload.percent * 100).toFixed(2)}%)`}
              </p>
            </li>
          ))
        }
      </ul>
    );
  };

  return (
    <div className="flex flex-col p-2 shadow-md rounded-lg">
      <p className=" border font-semibold text-lg">Ventas por categoría</p>
      <PieChart key={Math.random()} width={340} height={200} className='relative bg-purp-light'>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
        <Pie
          data={data}
          cx="26%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey={dataKey}
          animationDuration={1500}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} stroke={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default CategoriesPieChart;