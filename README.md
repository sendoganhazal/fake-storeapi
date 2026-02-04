# Fake Store App 🛒

A simple e-commerce frontend built with **Next.js App Router**, using the Fake Store API.  
The project focuses on product listing, filtering, pagination, and a basic cart system.

---

## ✨ Features

- Product listing from Fake Store API
- Category filtering
- Search by product title
- Price sorting (ascending / descending)
- Client-side pagination
- Shopping cart (add, increase, decrease, remove)
- Cart overlay UI
- URL-based state (query params for filters & pagination)
- Responsive layout

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Styled Components**
- **Context API** (Cart & UI state)
- **Fake Store API**

---


## 📁 Project Structure

```text
src/
├── app/
│ ├── page.tsx
│ ├── layout.tsx
│ └── cart/
│ └── page.tsx
│
├── components/
│ ├── atoms/
│ ├── molecules/
│ └── organisms/
│
├── lib/
│ ├── context/
│ ├── fetcher/
│ └── types/
│
├── test-utils/
└── styles/
```


## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server
npm run dev


The app will be available at:

http://localhost:3000

---

## 🛒 Cart Behavior

- Products can be added to the cart

- Quantity can be increased or decreased

- Product is removed automatically when quantity reaches zero

- Cart state is managed via React Context

---

## 🔎 Filtering & Pagination

- Filters and pagination are synced with URL search params

- State is preserved on refresh and navigation

- Pagination is handled on the client side

---

## 🧪 Testing

- Unit tests were temporarily removed to focus on feature development and stability.
- The project structure supports adding tests later using Jest and React Testing Library.

---

## ⚠️ Notes

- This project is for learning and demonstration purposes

- Fake Store API is a public API and may have availability limitations

- No authentication or payment functionality is included

---

## 📌 Future Improvements

- Re-enable unit tests

- Add loading & error states

- Persist cart to localStorage

- Improve accessibility

- Add product detail page

---

## 📄 License

- This project is open-source and free to use for educational purposes.
