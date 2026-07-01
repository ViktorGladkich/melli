# MILLY | Premium Modest Fashion 🕊️

![MILLY Banner](public/about/heroabout-mobile.jpg)

> **MILLY** is a high-end, headless e-commerce storefront dedicated to premium Modest Fashion. Designed with modern aesthetics and built for performance, it delivers a seamless, immersive, and lightning-fast shopping experience.

---

## 🌟 Overview

MILLY represents the intersection of timeless elegance and modern web technology. By leveraging a **Headless Shopify** architecture alongside **Next.js**, this storefront separates the backend inventory management from the frontend presentation, allowing for unparalleled design freedom, ultra-fast page loads, and highly interactive UI components.

Whether browsing curated collections, watching shoppable video reels, or utilizing the instant "Quick Add" drawer, every interaction is crafted to feel premium, responsive, and intuitive.

---

## ⚡️ Key Features

- 🛍️ **Headless Commerce**: Fully integrated with the **Shopify Storefront API** for real-time inventory, cart management, and checkout.
- 🚀 **Next.js App Router**: Utilizes React Server Components (RSC) and advanced caching strategies for optimal SEO and sub-second page loads.
- 🎨 **Bespoke UI/UX**: Custom-built with **Tailwind CSS** and **Framer Motion**. Features include smooth page transitions, micro-interactions, parallax scrolling, and animated text reveals.
- 📱 **Mobile-First Design**: A responsive architecture ensuring the experience is just as premium on a smartphone as it is on a desktop.
- 🛒 **Frictionless Shopping**: Includes a dynamic Cart Drawer and a "Quick Add" product modal for seamless add-to-cart flows without leaving the current page.
- 🎥 **Shoppable Video Reels**: An Instagram-style video reel section allowing users to watch product showcases and add items to their cart directly from the video.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Backend/E-commerce**: [Shopify Storefront API](https://shopify.dev/docs/api/storefront) (GraphQL)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/milly-storefront.git
cd milly-storefront
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Shopify Storefront API credentials:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Architecture & Performance

This project implements aggressive caching and static generation techniques. 
- **Static Generation**: Pages are pre-rendered at build time wherever possible.
- **Dynamic Fetching**: Cart data and specific product availability bypass the cache to ensure users always see real-time data (`cache: 'no-store'`).
- **Image Optimization**: Next.js Image component is utilized to automatically serve WebP/AVIF formats directly from Shopify's CDN (`cdn.shopify.com`), dramatically reducing payload sizes.

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Designed & Engineered for the modern web.*
