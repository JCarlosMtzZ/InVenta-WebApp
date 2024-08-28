import { useState, useEffect, useRef } from "react";

import MetricCard from "../components/cards/MetricCard.jsx";
import DashboardTopBar from "../components/bars/DashboardTopBar.jsx";
import SummariesAreaChart from "../components/charts/SummariesChart.jsx";
import CategoriesPieChart from "../components/charts/CategoriesPieChart.jsx";
import TopProductsBarChart from "../components/charts/TopProductsBarChart.jsx";
  
import { MdOutlineInventory } from 'react-icons/md';
import { AiOutlineLoading } from "react-icons/ai";
import { AiOutlineStock } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiProfit } from "react-icons/gi";

import { getOrderItemsSummary, getOrderItemsMonthlySummaries } from '../services/orderItemsService.js';
import { getCategoriesSummaries } from "../services/categoriesService.js";
import { getTopProducts } from "../services/productsService.js";
import { checkAdmin, getAdminById, getAdminsSummaries, getAdminsMonthlySummaries } from "../services/adminsService.js";
import { getOrdersDateRange } from "../services/ordersService.js";

import { formatDatesToYearMonth } from "../utilities/dashboard.jsx";

function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);

  const [dateFilter, setDateFilter] = useState('');

  const [currentAdminData, setCurrentAdminData] = useState({})

  const [oiSummary, setOiSummary] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [oiSeparatedSummary, setOiSeparatedSummary] = useState([]);
  const [monthlySummaries, setMonthlySummaries] = useState([]);
  const [adminsSummaries, setAdminSummaries] = useState([]);
  const [adminsMonthlySummaries, setAdminsMonthlySummaries] = useState([]);
  const [categoriesSummaries, setCategoriesSummaries] = useState([]);
  const [topFirstProducts, setTopFirstProducts] = useState([]);
  const [topLastProducts, setTopLastProducts] = useState([]);

  const updateData = async (startDate = '', endDate = '') => {
    setIsLoading(true);
    try {

      const [ oiSummaryResult,
        monthlySummariesResult,
        adminsSummariesResult,
        adminsMonthlySummariesResult,
        categoriesSummariesResult,
        topFirstProductsResult,
        topLastProductsResult 
      ] = await Promise.all([
        getOrderItemsSummary(startDate, endDate),
        getOrderItemsMonthlySummaries(startDate, endDate),
        getAdminsSummaries(startDate, endDate),
        getAdminsMonthlySummaries(startDate, endDate),
        getCategoriesSummaries(startDate, endDate),
        getTopProducts(5, 'DESC', startDate, endDate),
        getTopProducts(5, 'ASC', startDate, endDate)
      ]);

      const formattedMonthlySummaries = formatDatesToYearMonth(monthlySummariesResult, '2-digit', 'short');
      
      const formattedAdminsMonthlySummaries = adminsMonthlySummariesResult.map(adminSummary => ({
        ...adminSummary,
        monthlySummary: formatDatesToYearMonth(adminSummary.monthlySummary, '2-digit', 'short')
      }));

      setOiSummary(oiSummaryResult);
      setDateRange([
        {
            minDate: startDate,
            maxDate: endDate
        }
      ]);
      setMonthlySummaries(formattedMonthlySummaries);
      setAdminSummaries(adminsSummariesResult);
      setAdminsMonthlySummaries(formattedAdminsMonthlySummaries);
      setCategoriesSummaries(categoriesSummariesResult);
      setTopFirstProducts(topFirstProductsResult); 
      setTopLastProducts(topLastProductsResult);

    } catch (error) {
      console.error('Error while fetching orders', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (startDate = '', endDate = '') => {
      if (!isMounted) return;
      setIsLoading(true);
      try {
  
        const adminIdResult = await checkAdmin();
  
        const [ oiSummaryResult,
          dateRangeResult,
          monthlySummariesResult,
          adminsSummariesResult,
          adminsMonthlySummariesResult,
          currentAdminDataResult,
          categoriesSummariesResult,
          topFirstProductsResult,
          topLastProductsResult 
        ] = await Promise.all([
          getOrderItemsSummary(startDate, endDate),
          getOrdersDateRange(),
          getOrderItemsMonthlySummaries(startDate, endDate),
          getAdminsSummaries(startDate, endDate),
          getAdminsMonthlySummaries(startDate, endDate),
          getAdminById(adminIdResult.adminId),
          getCategoriesSummaries(startDate, endDate),
          getTopProducts(5, 'DESC', startDate, endDate),
          getTopProducts(5, 'ASC', startDate, endDate)
        ]);
  
        if (!isMounted) return;
  
        const formattedMonthlySummaries = formatDatesToYearMonth(monthlySummariesResult, '2-digit', 'short');
        
        const formattedAdminsMonthlySummaries = adminsMonthlySummariesResult.map(adminSummary => ({
          ...adminSummary,
          monthlySummary: formatDatesToYearMonth(adminSummary.monthlySummary, '2-digit', 'short')
        }));
  
        setOiSummary(oiSummaryResult);
        setOiSeparatedSummary([
          {
            name: "subtotal",
            value: oiSummaryResult[0].subtotal,
            fill: "#605399"
          },
          {
            name: "total",
            value: oiSummaryResult[0].total,
            fill: "#d562be"
          }
        ]);
        setDateRange(dateRangeResult);
        setMonthlySummaries(formattedMonthlySummaries);
        setAdminSummaries(adminsSummariesResult);
        setAdminsMonthlySummaries(formattedAdminsMonthlySummaries);
        setCurrentAdminData(currentAdminDataResult)
        setCategoriesSummaries(categoriesSummariesResult);
        setTopFirstProducts(topFirstProductsResult); 
        setTopLastProducts(topLastProductsResult);
  
      } catch (error) {
        console.error('Error while fetching orders', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [])

  

  return (
    <div className={`${isLoading ? 'bg-white' : 'bg-purp-dark/50'} flex items-center justify-center w-full min-h-[89.8%]`}>
      {isLoading ? (
        <div className='w-fit h-fit animate-spin'>
          <AiOutlineLoading size='4rem' color='#605399' />
        </div>
      ) : (
        <div className={`p-3 flex flex-col rounded-lg w-full h-full`}>
          <div className="flex flex-col gap-3 w-full">
            <DashboardTopBar
              adminData={currentAdminData}
              dateData={dateRange[0]}
              updateData={updateData}
            />
            <div className="flex flex-wrap gap-3 md:gap-0 justify-between w-full">
              <div className="flex flex-col gap-3 w-full md:w-[49.5%]">
                <div className="flex flex-wrap min-[540px]:flex-nowrap gap-y-2 min-[540px]:gap-2 justify-between w-full">
                  <MetricCard 
                    bgColor='bg-mag/90'
                    icon={<MdOutlineInventory size='3.5rem' color="white" className="self-end" />}
                    text='Órdenes'
                    data={oiSummary[0].ordersCount}
                  />
                  <MetricCard 
                    bgColor='bg-purp-dark/90'
                    icon={<AiOutlineStock size='3.75rem' color="white" className="self-end" />}
                    text='Unidades'
                    data={oiSummary[0].totalUnits}
                  />
                  <MetricCard 
                    bgColor='bg-blue/90'
                    icon={<FaMoneyBillTrendUp size='2.8rem' color="white" className="self-end" />}
                    text='Ingresos brutos'
                    data={oiSummary[0].subtotal}
                  />
                  <MetricCard 
                    bgColor='bg-ok-green/90'
                    icon={<GiProfit size='3.25rem' color="white" className="self-end" />}
                    text='Ingresos netos'
                    data={oiSummary[0].total}
                  />  
                </div>
                <div className="flex flex-wrap min-[540px]:flex-nowrap gap-3 w-full">
                  <CategoriesPieChart
                    absTotalUnits={oiSummary[0].totalUnits}
                    data={categoriesSummaries}
                    dataKey='totalUnits'
                  />
                  <TopProductsBarChart 
                    firstData={topFirstProducts}
                    lastData={topLastProducts}
                  />
                </div>   
              </div>
              <div className="flex flex-col gap-3 w-full md:w-[49.5%]">
                <SummariesAreaChart
                  data={monthlySummaries}
                  adminsData={adminsMonthlySummaries}
                />
                <div className="w-full bg-white p-2 rounded-lg shadow-md h-[225px] overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className='border-b-2 border-purp-dark'>
                        <th className='text-wrap text-left p-2'>Vendedor</th>
                        <th className='text-wrap text-left p-2'>Unidades vendidas</th>
                        <th className='text-wrap text-left p-2'>Ingresos brutos</th>
                        <th className='text-wrap text-left p-2'>Ingresos netos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminsSummaries.map(summary => (
                        <tr key={summary.adminId} className='border-b-2 border-purp-dark/15'>
                          <td className='p-4 text-left'>
                            {summary.adminFullName}
                          </td>
                          <td className='p-4 text-center'>
                            {summary.totalUnits}
                          </td>
                          <td className='p-4 text-right text-blue'>
                            {`$${summary.subtotal}`}
                          </td>
                          <td className='p-4 text-right text-ok-green'>
                            {`$${summary.total}`}
                          </td>
                        </tr>
                      ))}
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;