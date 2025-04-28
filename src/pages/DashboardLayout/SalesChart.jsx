import { useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { BarChart } from '@mui/x-charts';
import { Paper } from '@mui/material';

// ==============================|| FORMATIONS BY DOMAIN CHART ||============================== //

export default function SalesChart({ formationCounts = [] }) {
  const theme = useTheme();

  // State for toggling domain visibility
  const [showFormations, setShowFormations] = useState(true);

  // Prepare data for the chart
  const domains = formationCounts.map(item => item.domaine);
  const counts = formationCounts.map(item => item.count);

  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const axisFontStyle = { fontSize: 10, fill: theme.palette.text.secondary };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#ffffff",
        padding: 3,
        borderRadius: 4,
        height: "auto",
        overflow: "hidden",
        border: "1px solid #f3f4f6",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",  
      }}
    >
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Formations by Domain
            </Typography>
            <Typography variant="h4">
              {formationCounts.reduce((sum, item) => sum + item.count, 0)} Total
            </Typography>
          </Box>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showFormations}
                  onChange={() => setShowFormations(!showFormations)}
                  sx={{ 
                    '&.Mui-checked': { color: primaryColor }, 
                    '&:hover': { backgroundColor: alpha(primaryColor, 0.08) } 
                  }}
                />
              }
              label="Show Formations"
            />
          </FormGroup>
        </Stack>

        {showFormations && (
          <BarChart
            height={380}
            grid={{ horizontal: true }}
            xAxis={[{ 
              data: domains, 
              scaleType: 'band', 
              tickLabelStyle: { ...axisFontStyle, fontSize: 12 },
              // Rotate labels if they're too long
              tickLabelRotation: domains.some(d => d.length > 10) ? -45 : 0
            }]}
            yAxis={[{ 
              disableLine: true, 
              disableTicks: true, 
              tickLabelStyle: axisFontStyle 
            }]}
            series={[{
              data: counts,
              color: primaryColor,
              label: 'Formations Count',
              type: 'bar'
            }]}
            slotProps={{ 
              legend: { hidden: true }, 
              bar: { rx: 5, ry: 5 } 
            }}
            axisHighlight={{ x: 'none' }}
            margin={{ 
              top: 30, 
              left: 40, 
              right: 10,
              bottom: domains.some(d => d.length > 10) ? 100 : 30 // Extra space for rotated labels
            }}
            tooltip={{ trigger: 'item' }}
            sx={{
              '& .MuiBarElement-root:hover': { opacity: 0.6 },
              '& .MuiChartsAxis-directionX .MuiChartsAxis-tick, & .MuiChartsAxis-root line': { 
                stroke: theme.palette.divider 
              }
            }}
          />
        )}
      </Box>
    </Paper>
  );
}