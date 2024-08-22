import { useState, useEffect, useRef } from "react";

import {
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,

  RadialBarChart,
  RadialBar,

  LineChart,
  Legend,
  Line,

  PieChart, Pie, Sector,

  ResponsiveContainer } from 'recharts';

import DashboardTopBar from "../components/bars/DashboardTopBar.jsx";
import SummariesAreaChart from "../components/charts/SummariesAreaChart.jsx";
import CategoriesPieChart from "../components/charts/CategoriesPieChart.jsx";
import IncomeRadialBarChart from "../components/charts/IncomeRadialBarChart.jsx";

import { AiOutlineLoading } from "react-icons/ai";

import { getOrderItemsSummary, getOrderItemsMonthlySummaries } from '../services/orderItemsService.js';
import { getCategoriesSummaries } from "../services/categoriesService.js";
import { getTopProducts } from "../services/productsService.js";
import { getAdminsMonthlySummaries } from "../services/adminsService.js";

import { 
  formatDatesToYearMonth,
  formatDateToYearMonthDay
  //getRandomHexColor 
  } from "../utilities/dashboard.jsx";

function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);

  const [dateFilter, setDateFilter] = useState('');

  const [oiSummary, setOiSummary] = useState([]);
  const [oiSeparatedSummary, setOiSeparatedSummary] = useState([]);
  const [monthlySummaries, setMonthlySummaries] = useState([]);
  const [adminsMonthlySummaries, setAdminsMonthlySummaries] = useState([]);
  const [categoriesSummaries, setCategoriesSummaries] = useState([]);
  const [topFirstProducts, setTopFirstProducts] = useState([]);
  const [topLastProducts, setTopLastProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      try {
        const [ oiSummaryResult,
         monthlySummariesResult,
         adminsMonthlySummariesResult,
         categoriesSummariesResult,
         topFirstProductsResult,
         topLastProductsResult 
        ] = await Promise.all([
          getOrderItemsSummary(),
          getOrderItemsMonthlySummaries(),
          getAdminsMonthlySummaries(),
          getCategoriesSummaries(),
          getTopProducts(5, 'DESC'),
          getTopProducts(5, 'ASC')
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
        setMonthlySummaries(formattedMonthlySummaries);
        setAdminsMonthlySummaries(formattedAdminsMonthlySummaries);
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
    <div className={`bg-purp-dark/5 py-4 px-4 sm:px-14 flex ${isLoading && 'items-center'} justify-center w-full min-h-[89.8%]`}>
      {isLoading ? (
        <div className='w-fit h-fit animate-spin'>
          <AiOutlineLoading size='4rem' color='#605399' />
        </div>
      ) : (
        <div className={`flex flex-col bg-white rounded-lg shadow-md w-full h-full`}>
          <div className="flex flex-col">
            <DashboardTopBar
              data={oiSummary[0]}
            />
            <div className="flex">
              <div className="flex flex-col">
                <SummariesAreaChart
                  data={monthlySummaries}
                  adminsData={adminsMonthlySummaries}
                />
              </div>
              <div className="flex flex-col">
                <CategoriesPieChart
                  absTotalUnits={oiSummary[0].totalUnits}
                  data={categoriesSummaries}
                  dataKey='totalUnits'
                />

              </div>

            </div>
          </div>
          <div>
            <div className="flex">
              
              
            
            </div>
            <div>
           
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;