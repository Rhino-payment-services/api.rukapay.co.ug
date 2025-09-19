# Rukapay API Documentation Portal

A comprehensive, modern API documentation portal for Rukapay payment platform, built with Next.js and inspired by the Temenos developer portal.

## 🎯 Overview

This project provides a professional, developer-friendly documentation site for Rukapay's APIs, featuring:

- **Comprehensive API Documentation** - Detailed guides for Partner API, Core Banking, and Webhook APIs
- **Transaction Types Guide** - Complete reference for all supported transaction types with mandatory fields
- **Interactive Code Examples** - Copy-paste ready examples in multiple languages
- **Real-time Status Monitoring** - System status page with incident tracking
- **Modern Design** - Clean, responsive design with Rukapay branding (#08163D)

## 🚀 Features

### 📚 Documentation
- **Partner API** - Wallet management, transaction processing, bulk operations
- **Core Banking API** - Account management, user onboarding, KYC verification
- **Webhook API** - Real-time event notifications
- **Mobile Money Integration** - MTN, Airtel, and other MNO support

### 💳 Transaction Types
- **Wallet to Wallet** - Instant transfers between Rukapay wallets
- **Mobile Money** - Send/receive funds via mobile money accounts
- **Bank Transfer** - Direct bank account transfers
- **Merchant Payment** - Pay merchants and service providers
- **Wallet Top-up** - Add funds from external payment methods

### 🔧 Developer Experience
- **Interactive Code Examples** - Copy-paste ready cURL commands
- **SDK Support** - Official SDKs for Node.js, Python, PHP
- **Sandbox Environment** - Test integration safely
- **Status Monitoring** - Real-time API status and incident tracking

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Language**: TypeScript for type safety
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Static export ready for any hosting platform

## 📁 Project Structure

```
api.rukapay.co.ug/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── apis/                     # API documentation pages
│   │   └── partner/              # Partner API docs
│   ├── transaction-types/         # Transaction types guide
│   ├── status/                   # System status page
│   └── get-started/              # Getting started guide
├── components/                   # Reusable components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Site footer
│   ├── ApiCard.tsx               # API category cards
│   ├── StatusIndicator.tsx       # Service status indicators
│   ├── CodeExample.tsx           # Interactive code examples
│   └── EndpointCard.tsx         # API endpoint documentation
├── public/                       # Static assets
│   └── logo.png                  # Rukapay logo
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: #08163D (Rukapay brand color)
- **Secondary**: Green accent colors for success states
- **Gray Scale**: Comprehensive gray palette for text and backgrounds

### Typography
- **Font Family**: Inter (primary), JetBrains Mono (code)
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Consistent card design with hover effects
- **Buttons**: Primary and secondary button styles
- **Status Badges**: Color-coded status indicators
- **Code Blocks**: Syntax-highlighted code examples

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api.rukapay.co.ug
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run start
```

## 📖 Content Management

### Adding New API Endpoints

1. **Update the endpoint data** in the relevant page component
2. **Add new endpoint cards** using the `EndpointCard` component
3. **Include code examples** using the `CodeExample` component

### Adding New Transaction Types

1. **Update the transaction types array** in `/app/transaction-types/page.tsx`
2. **Include mandatory and optional fields** with descriptions
3. **Add request/response examples** for each transaction type

### Updating Status Information

1. **Modify service status** in `/app/status/page.tsx`
2. **Add new incidents** to the incidents array
3. **Update uptime and response time** metrics

## 🌐 Deployment

### Static Export
The project is configured for static export and can be deployed to any static hosting platform:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Any CDN**

### Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.rukapay.co.ug
NEXT_PUBLIC_PARTNER_API_BASE_URL=https://api.rukapay.co.ug/partner/v1
```

## 📱 Responsive Design

The site is fully responsive and optimized for:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔧 Customization

### Branding
- Update colors in `tailwind.config.js`
- Replace logo in `/public/logo.png`
- Modify company information in components

### Content
- Update API endpoints and examples
- Modify transaction types and fields
- Customize status information

### Styling
- Extend Tailwind configuration
- Add custom CSS in `globals.css`
- Modify component styles

## 📞 Support

For questions or support regarding this documentation portal:

- **Email**: dev-team@rukapay.com
- **Documentation**: [Internal Wiki]
- **Issues**: [GitHub Issues]

## 📄 License

This project is proprietary to Rukapay. All rights reserved.

---

**Built with ❤️ by the Rukapay Development Team**