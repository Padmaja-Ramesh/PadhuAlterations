const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME_2}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

export const getRecords = async () => {
  const resp = await fetch(url, {
    method: 'GET',
    headers: { Authorization: token },
  });
  const data = await resp.json();
  return data.records || [];
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
  window.localStorage.setItem('cart', cart);
  window.dispatchEvent(new Event('cart'));
};

export const getCart = () => {
  return window.localStorage.getItem('cart');
};
