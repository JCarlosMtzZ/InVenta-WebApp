import { useState } from 'react';

import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { getRandomHexColor } from '../../utilities/dashboard';

import { CgArrowsExchange } from "react-icons/cg";

function SummariesAreaChart({ data, adminsData }) {

  const [isGlobal, setIsGlobal] = useState(true);

  const handleIsGlobal = () => {
    setIsGlobal(!isGlobal);
  };

  const ChartComponent = isGlobal ? AreaChart : LineChart;

  const GlobalTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col bg-white rounded-lg p-3 opacity-80 gap-1">
          <p className="font-semibold text-md">{`${payload[0].payload.month}`}</p>
          <p className="text-sm">{`Unidades vendidas: ${payload[0].payload.totalUnits}`}</p>
          <p className="text-sm text-blue">{`Ingresos brutos: $${payload[0].payload.subtotal}`}</p>
          <p className="font-semibold text-sm text-ok-green">{`Ingresos netos: $${payload[0].payload.total}`}</p>
        </div>
      );
    }
    return null;
  };

  const AdminsTooltip = ({ active, payload, label}) => {
    if (active && payload && payload.length) {
      return (
        <div className='flex flex-col bg-white rounded-lg p-3 opacity-80 gap-2'>
          <p className="font-semibold text-md">{label}</p>
          {payload.map((admin, index) => (
            <div key={index}>
              <p className='font-medium text-sm'>{admin.name}</p>
              <p className='font-normal text-sm'>{`Unidades vendidas: ${admin.payload.totalUnits}`}</p>
              <p className='font-normal text-sm text-blue'>{`Ingresos brutos: $${admin.payload.subtotal}`}</p>
              <p className='font-normal text-sm text-ok-green'>{`Ingresos netos: $${admin.payload.total}`}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='w-full z-10 rounded-lg shadow-md flex flex-col p-2 bg-white'>
      <div className='flex items-center justify-between py-1 px-2'>
        <p className='text-lg font-semibold'>Ventas</p>
        <button
          onClick={handleIsGlobal}
          className='flex gap-1 group hover:drop-shadow-lg transition'
        >
          <CgArrowsExchange size='1.75rem' className='group-hover:rotate-180 transition' />
          <p>{isGlobal ? 'Globales' : 'Por vendedor'}</p>
        </button>
      </div>
      <ResponsiveContainer width='100%' height={270}>
        <ChartComponent key={Math.random()} data={isGlobal ? data : null}
          margin={{
            top: 20,
            right: 35,
            left: 5,
            bottom: 10,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" type="category" allowDuplicatedCategory={false} />
          <YAxis
            label={{ value: 'Unidades vendidas', angle: -90, position: 'insideLeft', dy: 50, dx: 10 }}
            type="number"
            dataKey="totalUnits"
            domain={[0, (dataMax) => Math.ceil(dataMax / 1000 * 100) / 100 * 1000]}
            />
          <Tooltip content={isGlobal ? <GlobalTooltip /> : <AdminsTooltip /> } />
          {isGlobal ? (
            <Area animationDuration={1500} type="monotone" dataKey="totalUnits" stroke="#ada1e6" fill="#ada1e6" opacity={0.7} />
          ) : (
            adminsData.map((admin) => (
              <Line
              key={admin.id}
              animationDuration={1500}
              strokeWidth={1.25}
              stroke={getRandomHexColor()}
              type="monotone" dataKey="totalUnits"
              data={admin.monthlySummary}
              name={admin.firstName + ' ' + admin.lastName}
              />
            ))
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>

  );
};

export default SummariesAreaChart;