import { useState } from 'react';

// material-ui
import { Grid, Paper, Button, Stack, Typography, Box } from '@mui/material';
import ThemeCustomization from '../DashboardLayout/themes';
// project imports
import IncomeAreaChart from './IncomeAreaChart';

// ==============================|| UNIQUE VISITOR CARD ||============================== //

export default function UniqueVisitorCard() {
  const [view, setView] = useState('monthly'); // 'monthly' or 'weekly'

  return (
    <>
     <Paper
        elevation={3}
        sx={{
          backgroundColor: "#ffffff",
                padding: 3,
                borderRadius: 4,
          width: 700,
          height: 585,
          height: "auto",
          overflow: "hidden",
          border: "1px solid #f3f4f6",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",        }}
      >
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography sx={{  fontWeight: 700, 
                    color: "#1f2937",
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: "0.5px" }} variant="h6">Unique Visitor</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              onClick={() => setView('monthly')}
              color={view === 'monthly' ? 'primary' : 'secondary'}
              variant={view === 'monthly' ? 'outlined' : 'text'}
            >
              Month
            </Button>
            <Button
              size="small"
              onClick={() => setView('weekly')}
              color={view === 'weekly' ? 'primary' : 'secondary'}
              variant={view === 'weekly' ? 'outlined' : 'text'}
            >
              Week
            </Button>
          </Stack>
        </Grid>
      </Grid>

        <Box sx={{ pt: 1, pr: 2 }}>
        <ThemeCustomization> <IncomeAreaChart view={view} /></ThemeCustomization>
        </Box>
      </Paper>
    </>
  );
}
