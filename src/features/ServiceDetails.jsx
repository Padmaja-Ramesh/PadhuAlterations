import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getServices, updateCart } from '../utils/services';
import { Box, Button } from '@mui/material';

export default function ServiceDetails() {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState(0);

  const addToCart = () => {
    setCart(cart + 1);
  };

  useEffect(() => {
    updateCart(cart);
  }, [cart]);

  useEffect(() => {
    const fetchData = async () => {
      const all = await getServices();
      const selected = all.find(
        (item) => item.category === decodeURIComponent(category)
      );
      if (selected) setServices(selected.services);
    };
    fetchData();
  }, [category]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>{category}</h2>

      {services.map((s, idx) => (
        <Box key={idx}>
          <h4>{s.name}</h4>
          <Button onClick={addToCart}>${s.price}</Button>
        </Box>
      ))}
    </div>
  );
}
