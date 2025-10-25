import { useEffect, useState } from 'react';
import { getServices } from '../utils/services';
import Box from '@mui/material/Box';

import { useNavigate, Link } from 'react-router-dom';

export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {services.map((service) => (
        <Box
          component="section"
          sx={{ p: 2, border: '1px dashed grey' }}
          style={{ margin: '5px' }}
          key={service.category}
          onClick={() =>
            navigate(
              `/services/${encodeURIComponent(service.category.trim().replaceAll(' ', '-'))}`
            )
          }
        >
          <h4>{service.category}</h4>
        </Box>
      ))}
    </div>
  );
}
