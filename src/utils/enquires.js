// src/utils/db.js
const baseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

// Function to create a new enquiry record
export async function createEnquiry({ name, email, message }) {
  const url = `${baseUrl}/Enquiries`;

  const body = {
    fields: {
      name: name,
      email: email,
      message: message,
      date: new Date().toISOString(),
      status: 'Open',
    },
  };

  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    console.error('Airtable Error:', data);
    throw new Error('Failed to create enquiry');
  }
}
