export const AIRTABLE_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
export const AIRTABLE_TOKEN = `Bearer ${import.meta.env.VITE_PAT}`;

// Generic GET all records
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

// Create a new record
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

// Find a user by email (optional helper)
export const findUserByEmail = async (email) => {
  const records = await getRecords();
  return records.find(
    (r) => r.fields.email?.toLowerCase() === email.toLowerCase()
  )?.fields;
};

export const signupUser = async (name, email, password) => {
  // check if email exists
  const existing = await findUserByEmail(email);
  if (existing) return { error: 'Email already exists' };

  // create new user
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
