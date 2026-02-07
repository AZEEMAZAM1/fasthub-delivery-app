# FastHub Delivery App

A full-stack food delivery application built with React Native and Node.js, inspired by platforms like Deliveroo. Order food from local restaurants, track deliveries in real-time, and manage your food business.

## Features

### Customer App
- Browse restaurants by cuisine, rating, and distance
- Search for restaurants and menu items
- View restaurant menus with categories
- Add items to cart with customization options
- Real-time order tracking with live map
- Multiple payment methods (Card, Apple Pay, Google Pay)
- Order history and reordering
- Save favorite restaurants
- Address management with GPS detection
- Push notifications for order updates
- Promo codes and discounts
- Rate and review restaurants

### Restaurant Dashboard
- Manage menu items, categories, and pricing
- Accept/reject incoming orders
- Set availability and opening hours
- View analytics and sales reports
- Manage promotions and offers

### Rider App
- Accept delivery requests
- GPS navigation to restaurant and customer
- Earnings tracker
- Availability toggle

## Tech Stack

### Frontend (Mobile)
- **React Native** - Cross-platform mobile development
- **React Navigation** - Screen navigation
- **Redux Toolkit** - State management
- **React Native Maps** - Map integration
- **Socket.IO Client** - Real-time updates
- **Stripe React Native** - Payment processing
- **React Native Reanimated** - Animations
- **Expo** - Development tooling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Firebase** - Push notifications & image storage
- **Redis** - Caching

## Project Structure

```
fasthub-delivery-app/
├── mobile/                    # React Native mobile app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── screens/           # App screens
│   │   │   ├── Auth/          # Login, Register, OTP
│   │   │   ├── Home/          # Home, Search, Categories
│   │   │   ├── Restaurant/    # Restaurant detail, Menu
│   │   │   ├── Cart/          # Cart, Checkout
│   │   │   ├── Orders/        # Order tracking, History
│   │   │   └── Profile/       # Profile, Settings, Addresses
│   │   ├── navigation/        # Navigation configuration
│   │   ├── store/             # Redux store & slices
│   │   ├── services/          # API services
│   │   ├── utils/             # Helper functions
│   │   ├── hooks/             # Custom hooks
│   │   ├── constants/         # App constants & theme
│   │   └── assets/            # Images, fonts, icons
│   ├── App.js
│   ├── app.json
│   └── package.json
├── backend/                   # Node.js API server
│   ├── src/
│   │   ├── config/            # Database & app config
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth & validation middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utilities
│   │   └── sockets/           # Socket.IO handlers
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB
- Expo CLI (`npm install -g expo-cli`)
- Stripe account
- Firebase project

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AZEEMAZAM1/fasthub-delivery-app.git
cd fasthub-delivery-app
```

2. **Install mobile app dependencies**
```bash
cd mobile
npm install
```

3. **Install backend dependencies**
```bash
cd ../backend
npm install
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys
```

5. **Start the backend server**
```bash
cd backend
npm run dev
```

6. **Start the mobile app**
```bash
cd mobile
npx expo start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/refresh-token` - Refresh JWT token

### Restaurants
- `GET /api/restaurants` - List restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/restaurants/:id/menu` - Get restaurant menu
- `GET /api/restaurants/search` - Search restaurants

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/history` - Get order history
- `PATCH /api/orders/:id/status` - Update order status

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/addresses` - Get saved addresses
- `POST /api/user/addresses` - Add new address

## License

MIT License

## Author

Built by [AZEEMAZAM1](https://github.com/AZEEMAZAM1) - FastHub
