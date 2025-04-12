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
          color: "#1f2937",
          padding: 2,
          borderRadius: 2,
          width: 700,
          height: 585,
          border: "1px solid #e5e7eb",
        }}
      >
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography sx={{ fontWeight: "bold", color: "#947ebc" }} variant="h6">Unique Visitor</Typography>
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
