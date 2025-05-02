import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import Legend from './Legend'; // You'll need to create this component (see below)

export default function PieActiveArc({ data }) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          padding: 3,
          borderRadius: 4,
          width: 300,
          height: "auto",
          border: "1px solid #f3f4f6",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          No training category data available
        </Typography>
      </Paper>
    );
  }

  // More professional color palette
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    '#FF6384', // Fallback colors if needed
    '#36A2EB',
    '#FFCE56'
  ];

  const pieData = data.map((item, index) => ({
    id: index,
    value: item.count,
    label: `${item.domaine} (${item.count})`,
    color: colors[index % colors.length]
  }));

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        padding: 3,
        borderRadius: 4,
        width: '100%',
        maxWidth: 420,
        height: "auto",
        overflow: "hidden",
        border: "1px solid #f3f4f6",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.5px",
          mb: 2
        }}
      >
        Training by Category
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <PieChart
            series={[
              {
                data: pieData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { additionalRadius: -5, color: 'gray' },
                innerRadius: 30,
                outerRadius: 80,
                paddingAngle: 2,
                cornerRadius: 5,
                cx: 120,
                cy: 100,
              },
            ]}
            width={300}
            height={220}
            colors={pieData.map(item => item.color)}
            slotProps={{
              legend: { hidden: true } // We'll use our custom legend
            }}
          />
        </Box>
        
        <Box sx={{ flex: 1, ml: { sm: 2 }, mt: { xs: 2, sm: 0 } }}>
          <Legend items={pieData} />
        </Box>
      </Box>
    </Paper>
  );
}