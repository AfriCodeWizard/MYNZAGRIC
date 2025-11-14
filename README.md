# 🌱 Mynzagric - Premium Fruit Seedlings E-Commerce Platform

A modern, responsive e-commerce website for Mynzagric, a Kenyan nursery specializing in premium grafted and tissue-culture fruit seedlings. Built with Next.js 16, React 19, and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38b2ac)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🛍️ E-Commerce Functionality
- **55+ Seedling Varieties**: Comprehensive catalog of fruit seedlings including mangoes, citrus, avocados, berries, and tropical fruits
- **Shopping Cart**: Add multiple seedlings to cart with quantity management
- **WhatsApp Integration**: Direct order placement via WhatsApp with pre-filled messages
- **Search & Filtering**: Search by name and filter by category (Mangoes, Citrus, Avocados, Berries, Tropical)
- **Curated Collections**: Pre-configured seedling collections for specific growing needs

### 📚 Plant Care Guides
- **Dynamic Care Pages**: Detailed care guides for each seedling variety
- **Comprehensive Information**: Watering, sunlight, soil requirements, temperature, fertilizer, spacing, time to fruit, and pest management
- **Growing Timeline**: Visual timeline showing planting phases
- **Common Issues & Solutions**: Troubleshooting guide for common growing problems

### 🎨 User Experience
- **Responsive Design**: Fully responsive design optimized for mobile, tablet, and desktop
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dark Mode Support**: Theme provider ready for dark mode implementation
- **Smooth Animations**: Polished animations and transitions
- **Fast Performance**: Optimized for speed with Next.js App Router

### 📱 Additional Features
- **Hero Section**: Video background with compelling call-to-action
- **About Section**: Company values and features
- **Testimonials**: Customer success stories
- **Contact Form**: Order form with WhatsApp integration
- **Footer**: Complete site navigation and contact information

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.0** - Type safety

### Styling
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Additional Libraries
- **Vercel Analytics** - Web analytics
- **next-themes** - Theme management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date utilities
- **recharts** - Chart library

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **pnpm**, or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MINZAGRIC
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

   > **Note**: If you encounter peer dependency issues, use `npm install --legacy-peer-deps`

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
MINZAGRIC/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   └── plant-care/
│       └── [id]/
│           └── page.tsx     # Dynamic plant care guide pages
│
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── about.tsx           # About section
│   ├── care-guides.tsx     # Care guides section
│   ├── contact.tsx         # Contact form
│   ├── featured-collections.tsx  # Collections section
│   ├── footer.tsx          # Footer component
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section
│   ├── product-card.tsx    # Product card component
│   ├── product-grid.tsx    # Product grid with cart
│   ├── testimonials.tsx    # Testimonials section
│   └── theme-provider.tsx  # Theme provider
│
├── lib/                    # Utility functions and data
│   ├── seedlings-data.ts   # Seedling catalog data
│   ├── care-guides-data.ts # Care guides data
│   └── utils.ts            # Utility functions (cn helper)
│
├── hooks/                  # Custom React hooks
│   ├── use-mobile.ts       # Mobile detection hook
│   └── use-toast.ts        # Toast notification hook
│
├── public/                 # Static assets
│   ├── icons/              # App icons
│   └── images/             # Images and placeholders
│
├── styles/                 # Additional styles
│   └── globals.css         # Global styles
│
├── components.json         # shadcn/ui configuration
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 💻 Usage

### Adding New Seedlings

Edit `lib/seedlings-data.ts` to add new seedling varieties:

```typescript
{
  id: "unique-id",
  name: "Seedling Name",
  price: 200,
  icon: "🍎",
  category: "tropical",
  careGuide: {
    watering: "Watering instructions...",
    sunlight: "Sunlight requirements...",
    // ... other care guide fields
  }
}
```

### Customizing Colors

Edit `app/globals.css` to modify the color theme:

```css
:root {
  --primary: oklch(0.42 0.16 142.5); /* Deep Green */
  --secondary: oklch(0.92 0.03 160); /* Soft Green */
  /* ... other color variables */
}
```

### Adding New Components

1. Create component in `components/` directory
2. Import and use in `app/page.tsx` or other pages
3. Use Tailwind CSS for styling
4. Follow existing component patterns

### Updating WhatsApp Number

Update the WhatsApp number in the following files:
- `components/hero.tsx`
- `components/product-grid.tsx`
- `components/contact.tsx`
- `components/footer.tsx`
- `app/plant-care/[id]/page.tsx`

Replace `254700000000` with your actual WhatsApp number.

## 🔧 Environment Variables

Currently, the project doesn't require environment variables. However, you can add them for:

- API endpoints
- Analytics keys
- Payment gateway keys
- Email service configuration

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=254700000000
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure settings
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **DigitalOcean App Platform**

### Build Configuration

The project is configured for static export if needed. Update `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component structure consistency
- Write clean, readable code
- Test your changes thoroughly

## 📝 License

This project is private and proprietary. All rights reserved.

## 📞 Contact

**Mynzagric**
- **Website**: [Your Website URL]
- **Email**: info@mynzagric.com
- **Phone**: +254 700 000 000
- **Location**: Nairobi, Kenya

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

## 📊 Project Status

✅ **Active Development** - The project is actively maintained and updated.

### Recent Updates
- Fixed Next.js 16 async params issue
- Implemented shopping cart functionality
- Added dynamic plant care guide pages
- Enhanced mobile responsiveness
- Improved SEO metadata

---

**Built with ❤️ for Kenyan farmers** 🌾

