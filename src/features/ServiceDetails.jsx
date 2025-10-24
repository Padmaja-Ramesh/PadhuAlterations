import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getServices, getCart } from '../utils/services';
import { addToCartDB } from '../utils/carts';
import { Box, Button } from '@mui/material';

export default function ServiceDetails() {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';
    const date = new Date();
    const timestamp = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    const itemWithMeta = {
      ...item,
      userEmail,
      addedAt: timestamp,
      category: item.category || '',
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, itemWithMeta];

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));

    addToCartDB([itemWithMeta], userEmail);
  };

  useEffect(() => {
    const savedCart = getCart();
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

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
        <Box
          key={idx}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            border: '1px solid #ddd',
            p: 2,
            borderRadius: '8px',
          }}
        >
          <div>
            <h4>{s.name}</h4>
            <p>${s.price}</p>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToCart(s)}
          >
            Add to Cart
          </Button>
        </Box>
      ))}

      <div style={{ marginTop: '20px' }}>
        <strong>Items in cart:</strong> {cart.length}
      </div>
    </div>
  );
}
