export const AIRTABLE_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME_1}`;
export const AIRTABLE_TOKEN = `Bearer ${import.meta.env.VITE_PAT}`;

export const getRecords = async () => {
  const resp = await fetch(AIRTABLE_URL, {
    method: 'GET',
    headers: {
      Authorization: AIRTABLE_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  const data = await resp.json();
  console.log(data);
  return data.records || [];
};

export const createRecord = async (fields) => {
  const resp = await fetch(AIRTABLE_URL, {
    method: 'POST',
    headers: {
      Authorization: AIRTABLE_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [{ fields }] }),
  });
  const data = await resp.json();
  return data.records[0].fields;
};

export const findUserByEmail = async (email) => {
  const records = await getRecords();
  return records.find(
    (r) => r.fields.email?.toLowerCase() === email.toLowerCase()
  )?.fields;
};

export const signupUser = async (name, email, password) => {
  const existing = await findUserByEmail(email);
  if (existing) return { error: 'Email already exists' };

  const resp = await fetch(AIRTABLE_URL, {
    method: 'POST',
    headers: {
      Authorization: AIRTABLE_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      records: [{ fields: { username: name, email, password } }],
    }),
  });
  const data = await resp.json();
  return data.records[0].fields;
};
