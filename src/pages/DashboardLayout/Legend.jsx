import { Box, Typography, useTheme } from '@mui/material';
import { FiberManualRecord as DotIcon } from '@mui/icons-material';

export default function Legend({ items }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {items.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <DotIcon sx={{ color: item.color, fontSize: '1rem', mr: 1 }} />
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}