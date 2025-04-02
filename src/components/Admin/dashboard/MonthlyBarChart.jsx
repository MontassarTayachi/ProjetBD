import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
 
  // Initialisation de l'état options avec des options par défaut
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 365,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false
    }
  });

  // État pour stocker les données de la série
  const [series, setSeries] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78]
    }
  ]);

  useEffect(() => {
    const fetchOverviews = async () => {
      try {
        const data =
          {
            series: [
              {
                day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                data: [80, 95, 70, 42, 65, 55, 78]
              }
            ]
          }
        
        setSeries([{ data: data?.series[0]?.data }]);
        // Mettre à jour les options du graphique avec les données
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: data?.series[0]?.day
          }
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchOverviews();
  }, []);

  useEffect(() => {
    // Mettre à jour les options du graphique avec les couleurs et thèmes
    setOptions((prevOptions) => ({
      ...prevOptions,
      colors: [info],
      xaxis: {
        ...prevOptions.xaxis,
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);

  return (
    <div id="chart">
      {/* Condition de rendu : Afficher le graphique si les données sont disponibles */}
      {series[0]?.data && <ReactApexChart  
      options={options} series={series} type="bar" height={400} />}
      {/* Condition de rendu : Afficher un message d'erreur si les données ne sont pas disponibles */}
      {!series[0]?.data && <p>Failed to fetch data. Please check your connection or try again later.</p>}
    </div>
  );
};

export default MonthlyBarChart;
