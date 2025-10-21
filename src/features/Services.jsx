import { useEffect, useState } from 'react';
import { getServices } from '../utils/services';
import Box from '@mui/material/Box';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        console.log(data);
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {services.map((service) => (
        <Box
          component="section"
          sx={{ p: 2, border: '1px dashed grey' }}
          style={{ margin: '20px' }}
          key={service.category}
        >
          <h2>{service.category}</h2>
        </Box>
      ))}
    </div>
  );
}
