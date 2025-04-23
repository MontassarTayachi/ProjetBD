import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { trainingbycategory, valueFormatter } from './webUsageStats';
import { Button, Grid, Paper, Stack, Typography } from '@mui/material';

export default function PieActiveArc() {
  return (
    <Paper
    elevation={3}
    sx={{
      backgroundColor: "#ffffff",
                padding: 3,
                borderRadius: 4,
      width: 300,
      height: "auto",
      overflow: "hidden",
      border: "1px solid #f3f4f6",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",  
    }}
  >
    <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
      <Grid item>
        <Typography sx={{ fontWeight: "bold", color: "#947ebc" }} variant="h6">Training by category</Typography>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
          >
            View Details
          </Button>
        </Stack>
        </Grid>
    </Grid>
    <PieChart
      series={[
        {
          data: trainingbycategory,
          highlightScope: { fade: 'global', highlight: 'item' },
          innerRadius: 90,

          
        },
      ]}

      height={450}
      margin={{ top: 20, right: 20, bottom: 120, left: 20 }}
      title='Training by category'
    
      slotProps={{
        legend: {
          direction: 'row',       // ➜ légende à l’horizontale
          position: {
            vertical: 'bottom',   // ➜ position verticale en bas
            horizontal: 'middle'  // ➜ centrée horizontalement
          },
         
          padding: 10,
          itemGap: 12,
        }
      }}  
    />
    </Paper>
  );
}