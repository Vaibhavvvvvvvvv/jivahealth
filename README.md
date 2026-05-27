# 🏥 Jiva Health User Management Dashboard

A modern healthcare admin dashboard built using **React.js, TypeScript, Zustand, and React Router**.  
This project was developed as a frontend assignment for Jiva Health and closely follows the provided Figma design and dashboard requirements.

The application includes complete user management workflows, responsive UI, CRUD functionality, order tracking, payment management, reusable components, and production-level frontend architecture.

---

# 🚀 Live Features

## 👥 User Management
- View all users in a responsive dashboard layout
- Search users by:
  - Name
  - Email
  - Phone Number
- Filter users by:
  - Status
  - Role
- Dynamic summary cards:
  - Total Users
  - Prime Users
  - Non-Prime Users
  - Total Family Members

---

## 🧑 User Detail Page
- Detailed user profile page
- User avatar with initials
- Prime membership upgrade
- User activity tracking
- Appointment statistics
- Dynamic user status update

---

## 🏠 Address Management
- Add Address
- Edit Address
- Delete Address
- Default address handling
- Automatic default address reassignment

---

## 👨‍👩‍👧 Family Member Management
- Add Family Member
- Edit Family Member
- Delete Family Member
- Dynamic family member updates

---

## 📦 Orders & Bookings
- Orders history table
- Medicine order tracking
- Detailed order page
- Shipping address details
- Itemized medicine list
- Dynamic order status badges

---

## 💳 Payment Management
- Payment history table
- Payment method display
- Payment status tracking
- Transaction details

---

# ✅ Form Validation
- Email validation
- Phone number validation
- Required field validation
- Address validation
- Family member validation

---

# 🌐 Routing
Implemented using **React Router DOM**
- Dynamic user routes
- Dynamic order routes
- Browser history support
- Route-based navigation
- Shareable URLs

---

# 🗂️ State Management
Implemented using **Zustand**
- Centralized global state
- Persistent local storage support
- Reduced prop drilling
- Cleaner architecture

---

# 🎨 UI / UX Features
- Fully responsive design
- Figma-inspired dashboard UI
- Reusable component architecture
- Interactive modals
- Empty states
- Modern dashboard experience
- Accessibility improvements

---

# 🛠️ Tech Stack

## Frontend
- React.js
- TypeScript
- Vite

## State Management
- Zustand
- Zustand Persist Middleware

## Routing
- React Router DOM

## Icons
- lucide-react

## Styling
- Custom CSS
- Responsive Flex/Grid Layouts

---

# 📁 Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── modals/
│   └── users/
│
├── data/
│
├── pages/
│
├── store/
│   └── useUserStore.ts
│
├── styles/
│
├── types/
│
├── utils/
│
├── App.tsx
└── main.tsx

🧠 Architecture Highlights
Clean component architecture
Reusable UI components
Zustand-based centralized store
React Router navigation architecture
Persistent state management
Reduced unnecessary prop drilling
Responsive-first design approach

⚙️ Installation

Clone the repository:
git clone https://github.com/Vaibhavvvvvvvvv/jivahealth

Move into the project directory:
cd jiva-health-dashboard

Install dependencies:

npm install

▶️ Run Development Server
npm run dev

Open in browser:
http://localhost:5173
