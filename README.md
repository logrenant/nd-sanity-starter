# Shopify Hydrogen + Sanity CMS Starter

A modern, production-ready e-commerce starter built with Shopify Hydrogen and Sanity CMS. This monorepo provides a powerful foundation for building headless Shopify storefronts with flexible content management capabilities.

[🇹🇷 Türkçe Dokümantasyon](./README.tr.md)

## 🎯 Overview

This starter combines the best of both worlds:
- **Shopify Hydrogen**: Shopify's React-based framework for building custom storefronts with excellent performance
- **Sanity CMS**: Flexible, structured content platform for managing product content, pages, and marketing materials

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [Architecture](#-architecture)
- [Content Types](#-content-types)
- [Available Scripts](#-available-scripts)
- [Tech Stack](#-tech-stack)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### E-commerce Features
- 🛒 Full-featured shopping cart
- 🔍 Advanced product search and filtering
- 📦 Product collections management
- 💳 Shopify checkout integration
- 👤 Customer account management
- 📱 Responsive design with Tailwind CSS
- ⚡ Server-side rendering (SSR) and edge caching
- 🌐 Multi-language support

### Content Management
- 📝 Custom product descriptions and SEO metadata
- 🖼️ Hero sections with dynamic content
- 📄 Flexible page builder with portable text
- 🎨 Image management with Sanity Image URL
- 🔄 Real-time content preview
- 📊 Visual content editor

### Developer Experience
- 🚀 TypeScript throughout
- 🎨 Tailwind CSS v4 with Vite plugin
- 📦 pnpm workspace for monorepo management
- 🔧 ESLint and Prettier configured
- 🌊 GraphQL with code generation
- 🔥 Hot module replacement (HMR)

## 📁 Project Structure

```
nd-sanity-starter/
├── studio/                    # Sanity Studio (CMS)
│   ├── schemaTypes/          # Content type definitions
│   │   ├── collection.ts     # Collection schema
│   │   ├── hero.ts          # Hero section schema
│   │   ├── page.ts          # Page schema
│   │   ├── product.ts       # Product schema
│   │   └── index.ts         # Schema exports
│   ├── sanity.config.ts     # Sanity configuration
│   ├── sanity.cli.ts        # CLI configuration
│   └── package.json         # Studio dependencies
│
└── web/                      # Shopify Hydrogen Storefront
    ├── app/
    │   ├── components/       # React components
    │   │   ├── AddToCartButton.tsx
    │   │   ├── CartMain.tsx
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ProductForm.tsx
    │   │   └── ...
    │   ├── lib/              # Utility libraries
    │   │   ├── context.ts    # App context
    │   │   ├── sanity.ts     # Sanity client
    │   │   ├── sanity-queries.ts   # GROQ queries
    │   │   ├── sanity-types.ts     # Type definitions
    │   │   ├── sanity-image.ts     # Image utilities
    │   │   └── ...
    │   ├── routes/           # React Router routes
    │   │   ├── ($locale)._index.tsx      # Homepage
    │   │   ├── ($locale).products.$handle.tsx
    │   │   ├── ($locale).collections.$handle.tsx
    │   │   ├── ($locale).cart.tsx
    │   │   ├── ($locale).account.tsx
    │   │   └── ...
    │   ├── styles/           # Global styles
    │   └── entry.server.tsx  # Server entry point
    ├── public/               # Static assets
    ├── vite.config.ts       # Vite configuration
    └── package.json         # Web dependencies
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **pnpm**: v8.0.0 or higher (recommended) or npm/yarn
- **Shopify Partner Account**: For creating a development store
- **Sanity Account**: Free account for CMS

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:logrenant/nd-sanity-starter.git
cd nd-sanity-starter
```

### 2. Install Dependencies

```bash
# Install dependencies for both studio and web
pnpm install
```

### 3. Set Up Sanity Studio

```bash
cd studio

# Login to Sanity (first time only)
npx sanity login

# Initialize and deploy the GraphQL API
pnpm run deploy-graphql
```

### 4. Configure Environment Variables

Create `.env` files in both `studio` and `web` directories. See [Environment Variables](#-environment-variables) section for details.

### 5. Start Development Servers

```bash
# Terminal 1 - Start Sanity Studio
cd studio
pnpm dev

# Terminal 2 - Start Hydrogen storefront
cd web
pnpm dev
```

- **Sanity Studio**: http://localhost:3333
- **Hydrogen Storefront**: http://localhost:3000

## 🔐 Environment Variables

### Studio (.env)

```env
# Sanity Configuration
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

### Web (.env)

```env
# Shopify Configuration
PUBLIC_STORE_DOMAIN=your-store.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=your_storefront_api_token
PUBLIC_STOREFRONT_API_VERSION=2024-10

# Sanity Configuration
PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-12-25
SANITY_API_TOKEN=your_sanity_api_token

# Optional
SESSION_SECRET=your_session_secret
```

### How to Get These Values

#### Shopify Credentials:
1. Go to your Shopify Partner Dashboard
2. Create a new development store
3. Apps > Develop apps > Create an app
4. Configure Storefront API access
5. Get your storefront access token

#### Sanity Credentials:
1. Visit [sanity.io/manage](https://sanity.io/manage)
2. Create a new project or select existing
3. Copy your Project ID
4. Settings > API > Tokens > Add token

## 💻 Development

### Running the Studio

```bash
cd studio
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm deploy       # Deploy to Sanity's hosting
```

### Running the Storefront

```bash
cd web
pnpm dev          # Start development server with codegen
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm typecheck    # Run TypeScript type checking
pnpm lint         # Run ESLint
```

### Code Generation

The web app uses GraphQL code generation for type-safe Shopify API calls:

```bash
cd web
pnpm codegen      # Generate types from GraphQL schemas
```

## 🚀 Deployment

### Deploy Sanity Studio

Sanity provides free hosting for the Studio:

```bash
cd studio
pnpm build
pnpm deploy
```

Your studio will be available at `https://your-project.sanity.studio`

### Deploy Hydrogen Storefront

Hydrogen works great with various platforms:

#### Shopify Oxygen (Recommended)
```bash
cd web
npx shopify hydrogen deploy
```

#### Vercel
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push

#### Netlify
1. Connect your repository to Netlify
2. Build command: `cd web && npm run build`
3. Publish directory: `web/dist/client`

## 🏗️ Architecture

### Data Flow

```
┌─────────────────┐
│   Shopify API   │ ◄─── Product data, cart, checkout
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│ Hydrogen Web    │ ◄───►│  Sanity CMS  │
│   (Storefront)  │      │   (Content)  │
└────────┬────────┘      └──────────────┘
         │
         ▼
┌─────────────────┐
│   End Users     │
└─────────────────┘
```

### Key Concepts

1. **Hybrid Data Approach**: 
   - Shopify handles commerce (products, cart, checkout)
   - Sanity manages content (descriptions, pages, marketing)

2. **Server-Side Rendering**:
   - Initial page loads are server-rendered for performance
   - Subsequent navigation uses client-side routing

3. **Edge Caching**:
   - Hydrogen leverages edge caching for fast global delivery
   - Sanity's CDN delivers content with optimal performance

## 📝 Content Types

### Product

Enhanced product information beyond Shopify's default data:

```typescript
{
  title: string          // From Shopify
  shopifyId: string      // Shopify GID
  slug: slug             // URL-friendly identifier
  description?: text     // Custom description
  seo?: {
    title: string
    description: text
  }
  images?: array         // Additional images
}
```

### Collection

Collection customization and content:

```typescript
{
  title: string
  shopifyId: string
  slug: slug
  description?: text
  image?: image
  seo?: {
    title: string
    description: text
  }
}
```

### Hero Section

Homepage hero banners:

```typescript
{
  title: string
  subtitle?: text
  image: image          // With hotspot
  ctaText?: string
  ctaLink?: string
  isActive: boolean     // Show on homepage
}
```

### Page

Flexible content pages:

```typescript
{
  title: string
  slug: slug
  content?: array       // Portable text with blocks, images, references
  seo?: {
    title: string
    description: text
  }
}
```

## 📜 Available Scripts

### Studio Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (port 3333) |
| `pnpm start` | Alias for dev |
| `pnpm build` | Build studio for production |
| `pnpm deploy` | Deploy studio to Sanity hosting |
| `pnpm deploy-graphql` | Deploy GraphQL API |

### Web Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with codegen |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Type check with TypeScript |
| `pnpm codegen` | Generate GraphQL types |

## 🛠️ Tech Stack

### Frontend (Web)
- **Framework**: [Shopify Hydrogen](https://hydrogen.shopify.dev/) (React Router 7)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **API Client**: GraphQL with code generation
- **Image Optimization**: Shopify CDN + Sanity Image URLs

### Backend (Studio)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Framework**: Sanity Studio (React)
- **Query Language**: GROQ
- **Plugins**:
  - Structure Tool
  - Vision (GROQ playground)
  - Media Library
  - Unsplash Asset Source

### Development Tools
- **Package Manager**: pnpm with workspaces
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

## 📚 Best Practices

### Content Management

1. **Use Slugs Wisely**: Always generate slugs from titles for SEO-friendly URLs
2. **SEO First**: Fill out SEO metadata for all content types
3. **Image Optimization**: Use Sanity's image pipeline with proper dimensions
4. **Content Preview**: Use Sanity's preview features before publishing

### Development

1. **Type Safety**: Always run `pnpm codegen` after schema changes
2. **Environment Variables**: Never commit `.env` files
3. **Code Style**: Use ESLint and Prettier configurations
4. **Git Workflow**: Create feature branches for new features

### Performance

1. **Defer Non-Critical Data**: Use React Router's defer for below-fold content
2. **Image Lazy Loading**: Implement lazy loading for images
3. **Edge Caching**: Leverage Shopify's edge network
4. **Bundle Optimization**: Regular bundle size audits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Resources

### Documentation
- [Shopify Hydrogen Docs](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [Sanity Documentation](https://www.sanity.io/docs)
- [React Router v7 Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

### Community
- [Shopify Community](https://community.shopify.com/)
- [Sanity Slack](https://slack.sanity.io/)
- [GitHub Issues](../../issues)

## 🙏 Acknowledgments

- Shopify for the amazing Hydrogen framework
- Sanity.io for the flexible CMS platform
- The open-source community for invaluable tools and libraries

---

**Happy coding! 🚀**

For questions or issues, please open an issue on GitHub.