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
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item, idx) => (
          <Box
            key={idx}
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
          >
            <div>
              <strong>{item.name}</strong> — ${item.price} <br />
              <small>{new Date(item.addedAt).toLocaleString()}</small>
            </div>
            <Button variant="outlined" onClick={() => removeFromCart(idx)}>
              Remove
            </Button>
          </Box>
        ))
      )}

      <h3>Total: ${total}</h3>
    </div>
  );
}
