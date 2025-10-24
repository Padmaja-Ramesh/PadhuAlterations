const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME_2}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

export const getRecords = async () => {
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: { Authorization: token },
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      console.error('Airtable API error:', errorData);
      return [];
    }

    const data = await resp.json();
    return data.records || [];
  } catch (err) {
    console.error('Network or fetch error:', err);
    return [];
  }
};

export const getServices = async () => {
  const records = await getRecords();

  const grouped = {};

  records.forEach((record) => {
    const category = record.fields.category;
    const name = record.fields.serviceName;
    const price = record.fields.price;
    if (!category) return;

    if (!grouped[category]) grouped[category] = [];

    grouped[category].push({ name, price });
  });
  return Object.keys(grouped).map((category) => ({
    category,
    services: grouped[category],
  }));
};

export const updateCart = (cart) => {
  window.localStorage.setItem(
    'cart',
    typeof cart === 'string' ? cart : JSON.stringify(cart)
  );
  window.dispatchEvent(new Event('cartUpdated')); // <-- same event name as Header
};

export const getCart = () => {
  return window.localStorage.getItem('cartUpdated');
};
