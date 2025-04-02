import { useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './OrderTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from './MainCard';
import AnalyticEcommerce from './AnalyticEcommerce';
// sales report status
const status = [
  {
    value: 'this_week',
    label: 'This Week'
  },
  {
    value: 'this_month',
    label: 'This Month'
  },
  {
    value: 'this_year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [value, setValue] = useState('this_week');
  const [slot, setSlot] = useState('week');
  const[overviews, setOverviews] = useState({
    total_page_views:0,
    total_users:0,
    total_orders:0,
    total_sales:0,
    week_total_sales:0,
    growth_rate:0,
    sales_last_year:0,
    sales_current_year:0
  
  })
  useEffect(() => {
    const fetchOverviews = async () => {
      setOverviews({
        total_page_views:15,
        total_users:250,
        total_orders:100,
        total_sales:1000,
        week_total_sales:1000,
        growth_rate:10,
        sales_last_year:25000,
        sales_current_year:30000
      })
    }
    fetchOverviews()
  }, [])
 
  return (
    <div className='DashboardDefaultssq789889' style={{padding:'1em'}}>
        <Typography variant="h5" 
        style={{display:'block !important'}}
        >Overview</Typography>
       <div className='DashbordHader'>
            <div className='sisjojiq'>
            <AnalyticEcommerce title="Total Page Views" count={overviews.total_page_views} percentage={59.3} extra="35,000" />
          </div>
          <div className='sisjojiq'>
            <AnalyticEcommerce title="Total Users" count={overviews.total_users} percentage={70.5} extra="8,900" />
          </div>
          <div  className='sisjojiq'>
            <AnalyticEcommerce title="Total Order" count={overviews.total_orders} percentage={27.4} isLoss color="warning" extra="1,943" />
          </div>
         
        <div  className='sisjojiq'>
          <AnalyticEcommerce title="Total Sales" count={`TND ${overviews?.total_sales?.toFixed(3)}`} percentage={27.4} isLoss color="warning" extra="$20,395" />
        </div>

       </div>



      {/* row 2 */}
      <div className='DashbordHader'>
        <div className='sisjojiq' >
          <div container alignItems="center" justifyContent="space-between">
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
           <div item>
              <Typography variant="h5">Order Statistics</Typography>
            </div>
            <div item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setSlot('month')}
                  color={slot === 'month' ? 'primary' : 'secondary'}
                  variant={slot === 'month' ? 'outlined' : 'text'}
                >
                  Month
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot('week')}
                  color={slot === 'week' ? 'primary' : 'secondary'}
                  variant={slot === 'week' ? 'outlined' : 'text'}
                >
                  Week
                </Button>
              </Stack>
            </div>
           </div>
          </div>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={slot} />
            </Box>
          </MainCard>
        </div>
        <div  className='sisjojiq525'>
        <div >
          <div item>
            <Typography variant="h5">Income Overview</Typography>
          </div>
          <div item />
        </div>
        <MainCard sx={{ mt: 2.5 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">TND{overviews.week_total_sales?.toFixed(3)}</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </div>
      </div>
      
      

      {/* row 3 */}
      <div className='DashbordHader'>
      <div className='sisjojiq'>
        <div container alignItems="center" justifyContent="space-between">
          <div item>
            <Typography variant="h5">Top products</Typography>
          </div>
          <div item />
        </div>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </div>
      <div className='sisjojiq525'>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div item>
            <Typography variant="h5">Analytics Report</Typography>
          </div>
          <div item />
        </div>
        <MainCard sx={{ mt: 2,ml:1 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Sales Finance Growth" />
              <Typography variant="h5">{overviews.growth_rate}%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Sales in the same period for the previous year  " />
              <Typography variant="h5">TND{overviews.sales_last_year}</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Sales in this year" />
              <Typography variant="h5">TND{overviews.sales_current_year}</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </div>
       </div> 
    
      

      {/* row 4 */}
      <div  item xs={12} md={7} lg={12}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div item>
            <Typography variant="h5">Sales by Category</Typography>
          </div>
          <div item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -2 }}>
            <Typography variant="h6" color="secondary">
              Total Sales
            </Typography>
            <Typography variant="h4">TND{overviews.total_sales?.toFixed(3)}</Typography>
          </Stack>
          <SalesColumnChart value={value}/>
        </MainCard>
      </div>
    </div>

  );
};

export default DashboardDefault;
