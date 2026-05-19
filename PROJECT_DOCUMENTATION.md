# E-Commerce Application - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Key Concepts](#key-concepts)
6. [Components](#components)
7. [Services](#services)
8. [Models & Interfaces](#models--interfaces)
9. [Routing System](#routing-system)
10. [Layouts](#layouts)
11. [Guards](#guards)
12. [Backend](#backend)
13. [Database](#database)
14. [Data Flow](#data-flow)
15. [Features](#features)
16. [Configuration & Environment](#configuration--environment)
17. [Development Guide](#development-guide)
18. [Important Notes for Feature Development](#important-notes-for-feature-development)

---

## Project Overview

**E-Commerce Application** is a modern, full-stack e-commerce platform built with Angular 21.2.0. It provides a complete shopping experience including product browsing, user authentication, shopping cart management, and payment processing through Stripe.

### Key Features:
- Product catalog with categories and search
- User authentication (Login/Signup)
- Shopping cart with persistent storage
- Stripe payment integration
- Product reviews and ratings
- User support and chat integration
- Responsive Bootstrap-based design
- Firebase authentication support

---

## Architecture

### Frontend Architecture (Angular Standalone Components)
- **Framework**: Angular 21.2.0 (Latest version with standalone components)
- **Component Structure**: Standalone components (no NgModule required)
- **State Management**: Angular Signals for reactive state
- **HTTP Client**: HttpClient for API calls
- **Routing**: Standalone routing with Guards
- **Styling**: Bootstrap 5 + Custom CSS + Tailwind CSS

### Backend Architecture
- **Server**: Express.js (Node.js)
- **Database**: JSON Server (db.json) - Mock database
- **Payment Processing**: Stripe API
- **AI Integration**: Gemini API (for chatbot)
- **Authentication**: Firebase + Local authentication

---

## Tech Stack

### Frontend Dependencies
```json
{
  "@angular/common": "^21.2.0",
  "@angular/compiler": "^21.2.0",
  "@angular/core": "^21.2.0",
  "@angular/fire": "^20.0.1",
  "@angular/forms": "^21.2.0",
  "@angular/platform-browser": "^21.2.0",
  "@angular/router": "^21.2.0",
  "@stripe/stripe-js": "^9.4.0",
  "bootstrap": "^5.3.8",
  "bootstrap-icons": "^1.13.1",
  "firebase": "^11.10.0",
  "json-server": "^1.0.0-beta.15",
  "rxjs": "~7.8.0",
  "uuid": "^14.0.0"
}
```

### Backend Dependencies
```json
{
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "stripe": "^22.1.1"
}
```

### DevDependencies
```json
{
  "@angular/build": "^21.2.8",
  "@angular/cli": "^21.2.8",
  "@tailwindcss/postcss": "^4.3.0",
  "tailwindcss": "^4.3.0",
  "typescript": "~5.9.2",
  "vitest": "^4.0.8"
}
```

---

## Project Structure

```
ecommerce-app/
├── src/
│   ├── app/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── carousel/
│   │   │   ├── cart/
│   │   │   ├── categoriesgrid/
│   │   │   ├── chat-bot/
│   │   │   ├── contact-us/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   ├── login/
│   │   │   ├── offersbar/
│   │   │   ├── offerstrip/
│   │   │   ├── privacy-policy/
│   │   │   ├── product-list/
│   │   │   ├── productcard/
│   │   │   ├── productdetails/
│   │   │   ├── shop-main-content/
│   │   │   ├── sidebar/
│   │   │   ├── signup/
│   │   │   ├── support/
│   │   │   ├── terms-of-use/
│   │   │   └── [Each has: .ts, .html, .css]
│   │   ├── guards/
│   │   │   └── authguard-guard.ts   # Route protection
│   │   ├── layouts/
│   │   │   ├── auth-layout/         # Auth pages layout
│   │   │   ├── home-layout/         # Main layout with header/footer
│   │   │   ├── not-found-layout/    # 404 page
│   │   │   └── shop-layout/         # Shop page layout
│   │   ├── pages/
│   │   │   ├── landing-page-layout/
│   │   │   ├── checkout-success/
│   │   │   └── notfound/
│   │   ├── services/
│   │   │   ├── auth-google.ts       # Google authentication
│   │   │   ├── authservice.ts       # User authentication
│   │   │   ├── cart-service.ts      # Cart management
│   │   │   ├── chat-bot.ts          # Chatbot integration
│   │   │   ├── product-service.ts   # Product data
│   │   │   └── stripe.ts            # Payment processing
│   │   ├── Models/
│   │   │   ├── api.ts               # API endpoints
│   │   │   └── IProduct.ts          # Interfaces
│   │   ├── app.ts                   # Root component
│   │   ├── app.routes.ts            # Routing configuration
│   │   ├── app.config.ts            # App configuration
│   │   ├── app.html                 # Root template
│   │   ├── app.css                  # Root styles
│   │   └── app.spec.ts              # Root tests
│   ├── environments/
│   │   └── environment.ts           # Environment variables
│   ├── index.html
│   ├── main.ts                      # Bootstrap
│   └── styles.css                   # Global styles
├── backend/
│   ├── server.js                    # Express server
│   └── package.json
├── public/
│   └── images/
├── db.json                          # Database (JSON Server)
├── angular.json                     # Angular CLI config
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── README.md
```

---

## Key Concepts

### 1. Standalone Components
All components use Angular's standalone API. No NgModules are used.
```typescript
@Component({
  selector: 'app-example',
  imports: [CommonModule, FormsModule],  // Direct imports
  templateUrl: './example.html',
  styleUrl: './example.css'
})
export class ExampleComponent { }
```

### 2. Angular Signals
Used for reactive state management throughout the application.
```typescript
// Define signals
products = signal<Product[]>([]);
currentUser = signal<any | null>(null);

// Computed properties (derived state)
filteredProducts = computed(() => {
  const query = this.search().toLowerCase();
  return this.products().filter(p => 
    p.title.toLowerCase().includes(query)
  );
});

// Update signals
this.products.set(data);
```

### 3. Dependency Injection
Services are injected using Angular's `inject()` function:
```typescript
cartService = inject(CartService);
productService = inject(ProductService);
authService = inject(Authservice);
```

### 4. Reactive Programming
Uses RxJS observables for HTTP calls:
```typescript
GetAllProducts() {
  return this.http.get<Product[]>(url).pipe(
    map(data => data.map(prod => ({ /* transform */ })))
  );
}
```

---

## Components

### **Layout Components**

#### 1. **HomeLayout** (`src/app/layouts/home-layout/`)
- **Purpose**: Main layout for authenticated users
- **Features**: 
  - Contains Header and Footer
  - Loads products and user's cart on init
  - Uses RouterOutlet for nested routes
- **Imports**: Header, Footer, RouterOutlet
- **Services**: CartService, ProductService

#### 2. **AuthLayout** (`src/app/layouts/auth-layout/`)
- **Purpose**: Layout for authentication pages (Login/Signup)
- **Routes**: `/auth/login`, `/auth/signup`

#### 3. **ShopLayout** (`src/app/layouts/shop-layout/`)
- **Purpose**: Shop page layout
- **Features**: Product grid, sidebar filters, categories

#### 4. **NotFoundLayout** (`src/app/layouts/not-found-layout/`)
- **Purpose**: 404 error page

---

### **Major Components**

#### 1. **Header** (`src/app/components/header/`)
- Displays navigation links
- Shows cart count
- Logout button
- **Services**: CartService, Authservice

#### 2. **Cart** (`src/app/components/cart/`)
- Displays cart items
- Quantity management
- Subtotal, shipping, total calculation
- Checkout with Stripe
- **Services**: CartService, StripeService, Router
- **Features**:
  - Add/remove items
  - Update quantities
  - Stripe payment integration

#### 3. **ProductList** (`src/app/components/product-list/`)
- Displays all products
- **Services**: ProductService
- **Features**: 
  - Fetches products from API
  - Uses ProductCard for each item

#### 4. **ProductCard** (`src/app/components/productcard/`)
- Individual product display
- Add to cart button
- Navigate to product details

#### 5. **ProductDetails** (`src/app/components/productdetails/`)
- Full product information
- Reviews and ratings
- Add to cart
- Product images gallery

#### 6. **CategoriesGrid** (`src/app/components/categoriesgrid/`)
- Category browsing
- Category filtering

#### 7. **Login** (`src/app/components/login/`)
- Email/password authentication
- **Services**: Authservice, Router
- **Features**:
  - Credentials validation
  - User session storage

#### 8. **Signup** (`src/app/components/signup/`)
- New user registration
- **Services**: Authservice
- **Features**:
  - Form validation
  - User data persistence

#### 9. **ChatBot** (`src/app/components/chat-bot/`)
- AI-powered product recommendations
- **Services**: Chat service integration

#### 10. **Support** (`src/app/components/support/`)
- Customer support page
- Help and FAQ

#### 11. **ContactUs** (`src/app/components/contact-us/`)
- Contact form
- Support information

#### 12. **TermsOfUse** (`src/app/components/terms-of-use/`)
- Legal terms page

#### 13. **PrivacyPolicy** (`src/app/components/privacy-policy/`)
- Privacy policy document

#### 14. **Footer** (`src/app/components/footer/`)
- Footer navigation
- Links to policies and social media

#### 15. **Sidebar** (`src/app/components/sidebar/`)
- Shop sidebar
- Filters (price, category, etc.)

#### 16. **Carousel** (`src/app/components/carousel/`)
- Image carousel/slider
- Featured products display

#### 17. **OffersBar** & **OfferStrip** (`src/app/components/offersbar/`, `offerstrip/`)
- Promotional banners
- Discount displays

---

## Services

### **1. ProductService** (`src/app/services/product-service.ts`)
**Purpose**: Manage product data and filtering

**Key Methods:**
```typescript
// Get all products
GetAllProducts(): Observable<Product[]>

// Get product by ID
GetProductById(id: number): Observable<Product>

// Get products by category
GetProductByCategory(category: string | null): Observable<Product[]>
```

**State:**
- `products`: Signal storing all products
- `search`: Signal for search query
- `filteredProducts`: Computed filtered list based on search

**Features:**
- Product search by title, category, price
- Product mapping with reviews

---

### **2. AuthService** (`src/app/services/authservice.ts`)
**Purpose**: Handle user authentication

**Key Methods:**
```typescript
// User registration
signup(user: any): Observable<any>

// User login
login(email: string, password: string): Observable<any[]>

// Get user by email
getUserByEmail(email: string): Observable<any[]>

// Set current user
setUser(user: any): void

// User logout
logout(): void
```

**State:**
- `currentUser`: Signal storing logged-in user
- `isLoggedIn`: Computed boolean flag

**Features:**
- Local storage persistence
- Email/password authentication
- User session management

---

### **3. CartService** (`src/app/services/cart-service.ts`)
**Purpose**: Manage shopping cart

**Key Methods:**
```typescript
// Load user's cart from database
loadCart(userId: string, products: Product[]): void

// Add item to cart
addToCart(userId: string, product: Product): void

// Update item quantity
updateQuantity(userId: string, itemId: string, newQuantity: number): void

// Remove item from cart
removeFromCart(userId: string, itemId: string): void

// Save cart to database
saveCart(userId: string): void
```

**State:**
- `cartItems`: Signal of cart items
- `itemCount`: Computed total item count
- `subtotal`: Computed subtotal
- `shipping`: Fixed shipping cost ($10)
- `total`: Computed total (subtotal + shipping)

**Features:**
- UUID-based item IDs
- Quantity management
- Cart persistence to backend
- Computed pricing calculations

---

### **4. StripeService** (`src/app/services/stripe.ts`)
**Purpose**: Handle payment processing

**Key Methods:**
```typescript
// Initiate Stripe checkout
checkout(cart: any[]): Promise<void>
```

**Backend Connection:**
- Calls `http://localhost:4242/create-checkout-session`
- Sends cart items with name, price, quantity, image
- Redirects to Stripe checkout on success

---

### **5. ChatBotService** (`src/app/services/chat-bot.ts`)
**Purpose**: AI chatbot integration

**Features:**
- Product recommendations
- Customer support via Gemini API

---

### **6. GoogleAuthService** (`src/app/services/auth-google.ts`)
**Purpose**: Firebase Google authentication

---

## Models & Interfaces

### **Product Interface** (`src/app/Models/IProduct.ts`)
```typescript
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  reviews: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface CartItem {
  id: string;              // UUID
  productId: string;       // Product ID
  quantity: number;        // Item quantity
  product?: Product;       // Full product object (optional)
}
```

### **API Base URL** (`src/app/Models/api.ts`)
```typescript
export const baseURL = 'http://localhost:3000';
```

---

## Routing System

### **Route Structure**

```
/ (root)
├── /main (HomeLayout - authenticated users)
│   ├── /home (LandingPageLayout)
│   ├── /shop (ShopLayout)
│   ├── /shop/:id (ProductDetails)
│   └── /cart (Cart - protected by authguardGuard)
├── /auth (AuthLayout)
│   ├── /login (Login)
│   └── /signup (Signup)
├── /termsofuse (TermsOfUse)
├── /privacypolicy (PrivacyPolicy)
├── /contactus (ContactUs)
├── /support (Support)
├── /checkout/success (CheckoutSuccess)
└── ** (NotFoundLayout - 404)
```

### **Route Configuration** (`src/app/app.routes.ts`)
- Root redirects to `/main/home`
- Cart route is protected by `authguardGuard`
- Wildcard route handles 404s

---

## Layouts

### **HomeLayout Structure**
```html
<app-header></app-header>
<router-outlet></router-outlet>
<app-footer></app-footer>
```

### **AuthLayout Structure**
- Login/Signup pages without header/footer

### **ShopLayout Structure**
- Sidebar (filters)
- Main content (product grid)
- Categories

---

## Guards

### **AuthGuard** (`src/app/guards/authguard-guard.ts`)
**Purpose**: Protect routes that require authentication

**Implementation:**
```typescript
export const authguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authservice);
  const router = inject(Router);
  
  if (authService.currentUser()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
```

**Protected Routes:**
- `/main/cart`

---

## Backend

### **Express Server** (`backend/server.js`)
**Purpose**: Handle API calls and payment processing

**Key Endpoints:**

#### 1. **Stripe Checkout** `POST /create-checkout-session`
```javascript
// Request body:
{
  cart: [
    { name: string, price: number, quantity: number, image?: string }
  ]
}

// Response: { url: string }
// Redirects user to Stripe checkout page
```

#### 2. **Gemini Chatbot** `POST /api/chat`
```javascript
// Request body:
{
  message: string,
  products: Product[]
}

// Response: AI-generated product recommendations
```

**Features:**
- CORS enabled for frontend communication
- Express middleware for JSON parsing
- Stripe integration for payments
- Gemini API integration for chatbot

**Server Configuration:**
- Port: 4242 (default)
- Stripe API key from environment variables

---

## Database

### **JSON Server** (`db.json`)
**Purpose**: Mock backend database

**Collections:**

#### 1. **Users Collection**
```json
{
  "users": [
    {
      "id": "unique_id",
      "name": "John Doe",
      "email": "john@example.com",
      "password": "hashed_password",
      "cart": [
        {
          "id": "uuid",
          "productId": "product_id",
          "quantity": 2
        }
      ]
    }
  ]
}
```

#### 2. **Products Collection**
```json
{
  "products": [
    {
      "id": 1,
      "title": "Product Name",
      "description": "Description",
      "price": 99.99,
      "category": "electronics",
      "images": ["url1", "url2"],
      "reviews": [
        {
          "rating": 5,
          "comment": "Great product!",
          "date": "2024-01-15",
          "reviewerName": "John"
        }
      ]
    }
  ]
}
```

---

## Data Flow

### **Product Browsing Flow**
```
1. User visits /main/home
2. HomeLayout initializes
3. ProductService.GetAllProducts() is called
4. Data is stored in productService.products signal
5. ProductList component subscribes to products
6. ProductCard components render each product
7. User can click to see ProductDetails
```

### **Shopping Cart Flow**
```
1. User adds product to cart from ProductCard/ProductDetails
2. CartService.addToCart(userId, product) is called
3. Item is added to cartItems signal (or quantity increased)
4. CartService.saveCart(userId) persists to backend
5. Cart count updates in Header automatically (computed)
6. User navigates to /main/cart
7. Cart component displays items with quantities
8. User can update quantities or remove items
9. User clicks Checkout
10. StripeService.checkout() is called
11. Redirects to Stripe payment page
12. After success, redirects to /checkout/success
```

### **Authentication Flow**
```
1. User visits /auth/login
2. Enters email and password
3. AuthService.login(email, password) calls API
4. Backend returns user data if credentials match
5. AuthService.setUser(user) stores user in:
   - localStorage (persistence)
   - currentUser signal (reactive)
6. User is redirected to /main/home
7. When accessing protected routes (/cart):
   - authguardGuard checks currentUser()
   - If not logged in, redirects to /auth/login
8. On logout:
   - localStorage is cleared
   - currentUser is set to null
   - User is redirected to login
```

### **Search/Filter Flow**
```
1. User enters search query
2. ProductService.search signal is updated
3. computed filteredProducts automatically recalculates
4. Components that use filteredProducts() update reactively
5. No manual change detection needed (Signals handle it)
```

---

## Features

### **Implemented Features**
1. ✅ Product Catalog
   - Browse all products
   - Filter by category
   - Search by title/price
   - Product reviews and ratings
   - Product images gallery

2. ✅ User Authentication
   - Signup/Login with email/password
   - Session persistence
   - Protected routes
   - Logout functionality

3. ✅ Shopping Cart
   - Add/remove items
   - Update quantities
   - Persistent cart storage
   - Real-time calculations (subtotal, tax, total)

4. ✅ Payment Processing
   - Stripe integration
   - Secure checkout
   - Success page

5. ✅ UI/UX
   - Bootstrap responsive design
   - Bootstrap icons
   - Product carousel
   - Category grid
   - Offers/promotions banners

6. ✅ Additional Pages
   - Terms of Use
   - Privacy Policy
   - Contact Us
   - Support
   - 404 Not Found

7. ✅ Chatbot
   - AI-powered product recommendations
   - Gemini API integration

### **Potential Features to Add**
- User profiles and order history
- Product wishlist
- Advanced filtering (price range, rating)
- Product recommendations
- Email notifications
- Multi-language support
- Dark mode
- Admin dashboard
- Inventory management
- User reviews submission
- Rating system UI
- Product comparison
- Social sharing
- Guest checkout
- Multiple payment methods

---

## Configuration & Environment

### **Environment Configuration** (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  },
  stripePublicKey: 'pk_test_...'
};
```

### **Angular Configuration** (`angular.json`)
- **Builder**: @angular/build:application (new unified builder)
- **Assets**: 
  - Bootstrap CSS
  - Bootstrap Icons
  - Custom CSS
  - Public folder images
- **Scripts**: Bootstrap bundle JS
- **Schematics Configuration**:
  - Components → `/src/app/components`
  - Services → `/src/app/services`
  - Guards → `/src/app/guards`
  - Skip tests by default

### **Backend Environment** (`.env` - Backend)
```
STRIPE_SECRET_KEY=sk_test_...
GEMINI_API_KEY=...
```

---

## Development Guide

### **Running the Application**

#### **Frontend Development Server**
```bash
npm start
# Runs on http://localhost:4200
```

#### **Backend Development Server**
```bash
# Terminal 1: JSON Server (mock database)
npx json-server --watch db.json --port 3000

# Terminal 2: Express server
cd backend
node server.js
# Runs on http://localhost:4242
```

### **Building**
```bash
npm run build
# Output in dist/ folder
```

### **Testing**
```bash
npm test
# Run tests with Vitest
```

### **Development Commands**
```bash
# Generate new component
ng generate component components/my-component

# Generate new service
ng generate service services/my-service

# Generate new guard
ng generate guard guards/my-guard

# Build watch mode
npm run watch
```

### **Code Style**
- Uses Prettier for formatting
- Follows Angular best practices
- Components use standalone API
- Services use dependency injection with `inject()`
- Signals for state management

---

## Important Notes for Feature Development

### **1. Working with Signals**
Always use signals for state that needs to be reactive:
```typescript
// Define
myData = signal<any[]>([]);

// Update
this.myData.set(newData);

// Use in template
{{ myData() }}

// Computed derived state
filteredData = computed(() => 
  this.myData().filter(/* condition */)
);
```

### **2. Component Imports**
All components must import their dependencies:
```typescript
@Component({
  selector: 'app-example',
  imports: [CommonModule, FormsModule, OtherComponent],
  templateUrl: './example.html',
  styleUrl: './example.css'
})
```

### **3. Service Injection**
Always use the `inject()` function:
```typescript
export class MyComponent {
  private myService = inject(MyService);
  private router = inject(Router);
}
```

### **4. API Calls**
- Base URL: `http://localhost:3000`
- Use HttpClient with RxJS operators
- Map responses to typed interfaces
- Handle errors appropriately

### **5. Authentication Flow**
- Check `authService.currentUser()` to see if user is logged in
- Use `authguardGuard` to protect routes
- Store user data in both localStorage and currentUser signal
- Clear both on logout

### **6. Shopping Cart Persistence**
- Cart is stored in backend under user.cart array
- Each cart item has:
  - `id`: UUID
  - `productId`: Product reference
  - `quantity`: Item count
  - `product`: Full product object (loaded from service)
- Cart persists across sessions via localStorage + backend

### **7. Route Protection**
```typescript
// In routes config
{
  path: 'protected-route',
  canActivate: [authguardGuard],
  component: ProtectedComponent
}
```

### **8. Styling**
- Bootstrap 5 classes available
- Bootstrap Icons available
- Global styles in `src/styles.css`
- Component-specific styles in `.css` files
- Tailwind CSS configured (can use utility classes)

### **9. Responsive Design**
- Use Bootstrap grid system
- Bootstrap breakpoints: xs, sm, md, lg, xl, xxl
- Mobile-first approach

### **10. Component Communication**
- Use **Inputs** for parent-to-child
- Use **Services** for sibling/global communication
- Use **Signals** for state that needs reactivity
- Route parameters for data passed via URL

### **11. Best Practices**
- Keep components focused on single responsibility
- Extract logic to services
- Use typed interfaces for all data
- Always handle errors in HTTP calls
- Use `OnInit` lifecycle for initialization
- Inject services over using constructors
- Use computed properties for derived state
- Avoid unnecessary signal updates

### **12. File Structure Convention**
Each component folder contains:
```
component-name/
├── component-name.ts        # Logic
├── component-name.html      # Template
├── component-name.css       # Styles
└── [component-name.spec.ts] # Tests (if not skipped)
```

### **13. Backend Integration Points**
- **Products API**: `GET /products`, `GET /products/:id`, `GET /products?category=xxx`
- **Users API**: `POST /users` (signup), `GET /users?email=x&password=y` (login), `GET /users/:id` (get user)
- **Stripe**: `POST /create-checkout-session`
- **Chatbot**: `POST /api/chat`

### **14. Common Pitfalls to Avoid**
- ❌ Forgetting to import components in standalone imports
- ❌ Using `@Input()` without importing InputSignal functions
- ❌ Not injecting services with `inject()`
- ❌ Directly mutating arrays instead of using `signal.set()`
- ❌ Not handling observable subscriptions (unsubscribe)
- ❌ Mixing old NgModule style with standalone components
- ❌ Forgetting `canActivate` guard on protected routes
- ❌ Not clearing localStorage on logout

---

## Summary

This e-commerce application is built with modern Angular 21.2.0 practices:
- **Standalone components** (no NgModules)
- **Angular Signals** for reactive state
- **Dependency injection** via `inject()`
- **Routing with guards** for protected routes
- **Services** for business logic
- **Express backend** with JSON Server database
- **Stripe payment** integration
- **Bootstrap** for responsive UI

The architecture is clean, modular, and easy to extend. All components are self-contained, services manage business logic, and the routing system is clear and protected where necessary.

---

## File Reference Summary

| Component/Service | File Location | Purpose |
|---|---|---|
| Root Component | `src/app/app.ts` | Entry point |
| Routes Config | `src/app/app.routes.ts` | All routing |
| App Config | `src/app/app.config.ts` | Firebase & provider setup |
| ProductService | `src/app/services/product-service.ts` | Product data |
| AuthService | `src/app/services/authservice.ts` | Authentication |
| CartService | `src/app/services/cart-service.ts` | Cart management |
| StripeService | `src/app/services/stripe.ts` | Payment processing |
| AuthGuard | `src/app/guards/authguard-guard.ts` | Route protection |
| Product Model | `src/app/Models/IProduct.ts` | Data interfaces |
| API Config | `src/app/Models/api.ts` | Base URLs |
| Backend Server | `backend/server.js` | Express API |
| Database | `db.json` | Mock data |
| Environment | `src/environments/environment.ts` | Config variables |

---

## Next Steps for New Feature Development

1. **Understand the current architecture** - refer to this document
2. **Identify which services/components to modify** - check the Data Flow section
3. **Follow the established patterns** - use signals, services, guards consistently
4. **Test thoroughly** - especially cart and authentication flows
5. **Update this document** - if adding significant new features
6. **Keep components small** - extract logic to services
7. **Use TypeScript types** - ensure type safety

---

*Document Generated: May 2026*
*Angular Version: 21.2.0*
*Project: E-Commerce Application*
