import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { LineChart } from '@mui/x-charts/LineChart';

function Legend({ items, onToggle }) {
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center', justifyContent: 'center', mt: 2.5, mb: 1.5 }}>
      {items.map((item) => (
        <Stack
          key={item.label}
          direction="row"
          sx={{ gap: 1.25, alignItems: 'center', cursor: 'pointer' }}
          onClick={() => onToggle(item.label)}
        >
          <Box sx={{ width: 12, height: 12, bgcolor: item.visible ? item.color : 'grey.500', borderRadius: '50%' }} />
          <Typography variant="body2" color="text.primary">
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart({ view, chartData }) {
  const theme = useTheme();

  const [visibility, setVisibility] = useState({
    'Normal': true,
    'High': true
  });

  const toggleVisibility = (label) => {
    setVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Get labels and data based on view
  const labels = view === 'monthly' ? chartData.monthly.labels : chartData.daily.labels;
  const normalData = view === 'monthly' ? chartData.monthly.data : chartData.daily.data;
  const highData = view === 'monthly' ? chartData.highMonthly.data : chartData.highDaily.data;

  const line = theme.palette.divider;

  const visibleSeries = [
    {
      data: normalData,
      label: 'Normal',
      showMark: false,
      area: true,
      id: 'Normal',
      color: theme.palette.primary.main || '',
      visible: visibility['Normal']
    },
    {
      data: highData,
      label: 'High',
      showMark: false,
      area: true,
      id: 'High',
      color: theme.palette.primary[700] || '',
      visible: visibility['High']
    }
  ];

  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };

  return (
    <>
      <LineChart
        grid={{ horizontal: true }}
        xAxis={[{ 
          scaleType: 'point', 
          data: labels, 
          disableLine: true, 
          tickLabelStyle: axisFonstyle,
          // Format daily dates to be more readable if needed
          valueFormatter: (value) => view === 'daily' ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : value
        }]}
        yAxis={[{ disableLine: true, disableTicks: true, tickLabelStyle: axisFonstyle }]}
        height={450}
        margin={{ top: 40, bottom: 20, right: 20 }}
        series={visibleSeries
          .filter((series) => series.visible)
          .map((series) => ({
            type: 'line',
            data: series.data,
            label: series.label,
            showMark: series.showMark,
            area: series.area,
            id: series.id,
            color: series.color,
            stroke: series.color,
            strokeWidth: 2
          }))}
        slotProps={{ legend: { hidden: true } }}
        sx={{
          '& .MuiAreaElement-series-Normal': { fill: "url('#myGradient1')", strokeWidth: 2, opacity: 0.8 },
          '& .MuiAreaElement-series-High': { fill: "url('#myGradient2')", strokeWidth: 2, opacity: 0.8 },
          '& .MuiChartsAxis-directionX .MuiChartsAxis-tick': { stroke: line }
        }}
      >
        <defs>
          <linearGradient id="myGradient1" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={alpha(theme.palette.primary.main, 0.4)} />
            <stop offset="90%" stopColor={alpha(theme.palette.background.default, 0.4)} />
          </linearGradient>
          <linearGradient id="myGradient2" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={alpha(theme.palette.primary[700], 0.4)} />
            <stop offset="90%" stopColor={alpha(theme.palette.background.default, 0.4)} />
          </linearGradient>
        </defs>
      </LineChart>
      <Legend items={visibleSeries} onToggle={toggleVisibility} />
    </>
  );
}

Legend.propTypes = { 
  items: PropTypes.array, 
  onToggle: PropTypes.func 
};

IncomeAreaChart.propTypes = { 
  view: PropTypes.oneOf(['monthly', 'daily']),
  chartData: PropTypes.object.isRequired
};