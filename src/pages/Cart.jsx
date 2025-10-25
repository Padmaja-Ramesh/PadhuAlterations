import { useEffect, useState } from 'react';
import { updateCart } from '../utils/services';
import { getCartByUser, removeFromCartDB } from '../utils/carts';
import { Box, Button } from '@mui/material';

export default function Cart() {
  const [cart, setCart] = useState([]);

  const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const records = await getCartByUser(userEmail);
        const items = records.map((rec) => ({
          id: rec.id,
          name: rec.fields.name,
          price: rec.fields.price,
          category: rec.fields.category,
          addedAt: rec.fields.addedAt,
          userEmail: rec.fields.userEmail,
        }));
        setCart(items);
        updateCart(JSON.stringify(items)); // Keep localStorage in sync
      } catch (err) {
        console.error('Error fetching cart from Airtable:', err);
      }
    };

    fetchCart();
  }, [userEmail]);

  const removeFromCart = async (index) => {
    const itemToRemove = cart[index];

    if (itemToRemove.id) {
      await removeFromCartDB(itemToRemove.id);
    }

    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    updateCart(JSON.stringify(updated));
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Your Cart</h3>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item, idx) => (
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
            <div style={{ textAlign: 'left', display: 'block' }}>
              <strong>{item.name}</strong> — ${item.price}
              <small style={{ display: 'block' }}>
                {new Date(item.addedAt).toLocaleString()}
              </small>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => removeFromCart(idx)}
              >
                Remove
              </Button>
            </div>
          </Box>
        ))
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          mb: 2,
          border: '1px solid #ddd',
          p: 2,
          borderRadius: '8px',
        }}
      >
        <strong style={{ textAlign: 'right' }}>Total: ${total}</strong>
      </Box>
    </div>
  );
}
