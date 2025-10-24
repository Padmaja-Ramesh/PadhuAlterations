const BASE_ID = import.meta.env.VITE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_TABLE_NAME_3;
const TOKEN = import.meta.env.VITE_PAT;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

export const getCartByUser = async (userEmail) => {
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula={userEmail}='${userEmail}'`,
    { headers }
  );
  const data = await res.json();
  return data.records || [];
};

export const addToCartDB = async (cartItems, userEmail) => {
  try {
    const existingResp = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula=({userEmail}='${userEmail}')`,
      { headers }
    );
    const existingData = await existingResp.json();
    const existingRecords = existingData.records || [];

    const recordsToUpdate = [];
    const recordsToCreate = [];

    cartItems.forEach((item) => {
      const existing = existingRecords.find(
        (rec) => rec.fields.service === item.name
      );

      if (existing) {
        recordsToUpdate.push({
          id: existing.id,
          fields: {
            price: item.price,
            category: item.category || '',
            addedAt: item.addedAt,
          },
        });
      } else {
        recordsToCreate.push({
          fields: {
            userEmail: item.userEmail,
            name: item.name,
            price: item.price,
            category: item.category || '',
            addedAt: item.addedAt,
          },
        });
      }
    });

    if (recordsToUpdate.length > 0) {
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ records: recordsToUpdate }),
      });
    }

    if (recordsToCreate.length > 0) {
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ records: recordsToCreate }),
      });
    }

    console.log('Cart synced to Airtable ');
  } catch (error) {
    console.error('Error syncing cart:', error);
  }
};

export const removeFromCartDB = async (recordId) => {
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${recordId}`,
    { method: 'DELETE', headers }
  );
  return await res.json();
};

export const syncCartToDB = async (cartItems) => {
  try {
    const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';
    const existingResp = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula=({userEmail}='${userEmail}')`,
      {
        headers,
      }
    );
    const existingData = await existingResp.json();
    const existingRecords = existingData.records || [];

    const recordsToCreate = [];
    const recordsToUpdate = [];

    cartItems.forEach((item) => {
      const existing = existingRecords.find(
        (rec) => rec.fields.service === item.name
      );

      if (existing) {
        recordsToUpdate.push({
          id: existing.id,
          fields: {
            addedAt: item.addedAt,
            price: item.price,
            category: item.category || '',
          },
        });
      } else {
        recordsToCreate.push({
          fields: {
            userEmail: item.userEmail,
            name: item.name,
            price: item.price,
            category: item.category || '',
            addedAt: item.addedAt,
          },
        });
      }
    });
    if (recordsToUpdate.length > 0) {
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ records: recordsToUpdate }),
      });
    }

    if (recordsToCreate.length > 0) {
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ records: recordsToCreate }),
      });
    }

    console.log('Cart synced to Airtable ');
  } catch (err) {
    console.error('Error syncing cart:', err);
  }
};
