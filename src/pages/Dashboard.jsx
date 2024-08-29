import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import MetricCard from "../components/cards/MetricCard.jsx";
import DashboardTopBar from "../components/bars/DashboardTopBar.jsx";
import SummariesChart from "../components/charts/SummariesChart.jsx";
import CategoriesPieChart from "../components/charts/CategoriesPieChart.jsx";
import TopProductsBarChart from "../components/charts/TopProductsBarChart.jsx";
import AdminsTable from "../components/tables/AdminsTable.jsx";
  
import { MdOutlineInventory } from 'react-icons/md';
import { AiOutlineLoading } from "react-icons/ai";
import { AiOutlineStock } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiProfit } from "react-icons/gi";

import { getOrderItemsSummary, getOrderItemsMonthlySummaries } from '../services/orderItemsService.js';
import { getCategoriesSummaries } from "../services/categoriesService.js";
import { getTopProducts } from "../services/productsService.js";
import { getAdminById, getAdminsSummaries, getAdminsMonthlySummaries } from "../services/adminsService.js";
import { getOrdersDateRange } from "../services/ordersService.js";

import { formatDatesToYearMonth } from "../utilities/dashboard.jsx";

function Dashboard({ adminId }) {

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [currentAdminData, setCurrentAdminData] = useState({})

  const [oiSummary, setOiSummary] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [monthlySummaries, setMonthlySummaries] = useState([]);
  const [adminsSummaries, setAdminSummaries] = useState([]);
  const [adminsMonthlySummaries, setAdminsMonthlySummaries] = useState([]);
  const [categoriesSummaries, setCategoriesSummaries] = useState([]);
  const [topFirstProducts, setTopFirstProducts] = useState([]);
  const [topLastProducts, setTopLastProducts] = useState([]);

  const fetchData = useCallback(async (abortController, hasDateFilter = false, startDate = '', endDate = '') => {
    setIsLoading(true);
    
    const promises = [
      getOrderItemsSummary(startDate, endDate),
      getOrderItemsMonthlySummaries(startDate, endDate),
      getAdminsSummaries(startDate, endDate),
      getAdminsMonthlySummaries(startDate, endDate),
      getCategoriesSummaries(startDate, endDate),
      getTopProducts(5, 'DESC', startDate, endDate),
      getTopProducts(5, 'ASC', startDate, endDate),
    ];

    try {
      let results;
      if (hasDateFilter) {
        results = await Promise.all(promises);
      } else {
        promises.push(getAdminById(adminId), getOrdersDateRange());
        results = await Promise.all(promises);
      }
      const [
        oiSummaryResult,
        monthlySummariesResult,
        adminsSummariesResult,
        adminsMonthlySummariesResult,
        categoriesSummariesResult,
        topFirstProductsResult,
        topLastProductsResult,
        currentAdminDataResult,
        dateRangeResult
      ] = results;

      const formattedMonthlySummaries = formatDatesToYearMonth(monthlySummariesResult, '2-digit', 'short');

      const formattedAdminsMonthlySummaries = adminsMonthlySummariesResult.map((adminSummary) => ({
        ...adminSummary,
        monthlySummary: formatDatesToYearMonth(adminSummary.monthlySummary, '2-digit', 'short'),
      }));

      if (!abortController.signal.aborted) {
        setOiSummary(oiSummaryResult);
        setMonthlySummaries(formattedMonthlySummaries);
        setAdminSummaries(adminsSummariesResult);
        setAdminsMonthlySummaries(formattedAdminsMonthlySummaries);
        setCategoriesSummaries(categoriesSummariesResult);
        setTopFirstProducts(topFirstProductsResult);
        setTopLastProducts(topLastProductsResult);

        if (hasDateFilter) {
          setDateRange([
            {
              minDate: startDate,
              maxDate: endDate
            }
          ]);
        } else {
          setDateRange(dateRangeResult);
          setCurrentAdminData(currentAdminDataResult);
        }
      }
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    } catch (error) {
      if (!abortController.signal.aborted) {
        console.error('Error while fetching data', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!adminId)
      navigate(`/inventory`);

    const abortController = new AbortController();

    fetchData(abortController);

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className={`${isLoading ? 'bg-white' : 'bg-purp-dark/10'} flex items-center justify-center w-full min-h-[calc(100%-65px)]`}>
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
              fetchData={fetchData}
            />
            <div className="flex flex-wrap gap-3 lg:gap-0 justify-between w-full">
              <div className="flex flex-col gap-3 w-full lg:w-[49.5%]">
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
              <div className="flex flex-col gap-3 w-full lg:w-[49.5%]">
                <SummariesChart
                  data={monthlySummaries}
                  adminsData={adminsMonthlySummaries}
                />
                <AdminsTable
                  data={adminsSummaries}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;