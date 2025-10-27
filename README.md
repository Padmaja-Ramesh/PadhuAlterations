# Padhu's Alteration Service

**Padhu’s Alteration Service** is a modern web application designed to help customers easily browse, book, and manage clothing alteration services online.
It provides a professional, responsive interface where users can explore categories, request services, and manage their cart — all backed by a simple Airtable-powered backend.

---

## Project Description

Padhu’s Alteration Service brings a traditional tailoring business into the digital world.
Users can:

- Browse alteration categories (e.g., Pants, Shirts, Skirts, Leather, Custom, etc.)
- Add or remove services from a shopping cart
- Register and log in securely
- Submit alteration requests via Airtable API integration

The app is lightweight, easy to maintain, and ideal for small tailoring or alteration businesses wanting an online presence.

---

## Tech Stack

**Frontend:**

- React.js
- React Router
- Material UI (MUI)

**Backend / Database:**

- Hosted Airtable base for users and service details

---

## Added Dependencies

| Dependency         | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `react-router-dom` | Handles routing between pages               |
| `@mui/material`    | UI component library for responsive styling |
| `dotenv`           | Environment variable management             |

---

##  Installation & Setup

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Airtable account and base setup

### 1. Clone the repository

```bash
git clone https://https://github.com/Padmaja-Ramesh/PadhuAlterations.git
cd padhu-alterations
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

In the root of the project, create a `.env` file with the following:

```bash
VITE_AIRTABLE_API_KEY=your_airtable_api_key
VITE_AIRTABLE_BASE_ID=your_base_id
VITE_TABLE_NAME_1=users
VITE_TABLE_NAME_2=alterationservices
VITE_TABLE_NAME_3=carts
```

### Airtable Base Structure

Below is a recommended structure for your Airtable base to match the app’s functionality.

1. Users Table (users)
   
   | Field Name         |             Type                            |
   | ------------------ | ------------------------------------------- |
   | id                 |    Single Line Text.                        |
   | name               |    Single Line Text.                        |
   | email              |    Email.                                   |
   | password           |    Single Line Text                         |
   | reset_token        |    Single Line Text                         |


3. Alteration Services Table (alterationservices)


   | Field Name         |                   Type                                                 |
   | ------------------ | -----------------------------------------------------------------------|
   | serviceName        |          Single Line Text.                                             |
   | category           |          Single Select Category                                        |
   |                    | (Pant alterations, Skirts alterations, Shirts alteration, etc.)        |
   | price              |          Email.                                                        |

4. Carts Table (carts)

   | Field Name         |                Type                         |
   | ------------------ | ------------------------------------------- |
   | userEmail          |          Email                              |
   | name               |          Single Line Text.                  |
   | price              |          Currency                           |
   | catergory          |          Single Line Text                   |
   | addedAt            |          Date LocalFormat(mm/dd/yyyy)       |

### 4. Start the development server

```bash
npm run dev
```

App runs locally on:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## API Connection Details

The app communicates directly with Airtable’s REST API for CRUD operations on your `users`, `services`, `carts` and `enquires` tables.

---

##  Project Structure

```
padhu-alteration-service/
│
├── src/
│   ├── assets/
│   ├── features/
│   ├── pages/
│   ├── shared/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
├── README.md
└── vite.config.js
```

---

## Future Enhancements

- Add appointment booking calendar
- Include image uploads for alteration references
- Enable payment processing (Stripe integration)
- Add admin dashboard for managing service requests
- Email notifications for bookings and updates

---

##  Author

**Padmaja Ramesh**
Full Stack Developer | Software Engineer
📧 [[padmajaramesh1205@example.com](padmajaramesh1205@example.com)]
🔗 [LinkedIn Profile](www.linkedin.com/in/padmaja-ramesh)

