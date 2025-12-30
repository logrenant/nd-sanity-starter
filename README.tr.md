# Shopify Hydrogen + Sanity CMS Başlangıç Projesi

Shopify Hydrogen ve Sanity CMS ile oluşturulmuş modern, üretime hazır bir e-ticaret başlangıç projesi. Bu monorepo yapısı, esnek içerik yönetimi yetenekleriyle birlikte headless Shopify mağaza cephesi oluşturmak için güçlü bir temel sağlar.

[🇬🇧 English Documentation](./README.md)

## 🎯 Genel Bakış

Bu başlangıç projesi, iki güçlü platformu bir araya getiriyor:
- **Shopify Hydrogen**: Mükemmel performansla özel mağaza cepheleri oluşturmak için Shopify'ın React tabanlı framework'ü
- **Sanity CMS**: Ürün içeriği, sayfalar ve pazarlama materyallerini yönetmek için esnek, yapılandırılmış içerik platformu

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Proje Yapısı](#-proje-yapısı)
- [Gereksinimler](#-gereksinimler)
- [Başlangıç](#-başlangıç)
- [Ortam Değişkenleri](#-ortam-değişkenleri)
- [Geliştirme](#-geliştirme)
- [Dağıtım](#-dağıtım)
- [Mimari](#-mimari)
- [İçerik Tipleri](#-i̇çerik-tipleri)
- [Kullanılabilir Komutlar](#-kullanılabilir-komutlar)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [En İyi Uygulamalar](#-en-i̇yi-uygulamalar)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

### E-ticaret Özellikleri
- 🛒 Tam özellikli alışveriş sepeti
- 🔍 Gelişmiş ürün arama ve filtreleme
- 📦 Ürün koleksiyonları yönetimi
- 💳 Shopify ödeme entegrasyonu
- 👤 Müşteri hesap yönetimi
- 📱 Tailwind CSS ile responsive tasarım
- ⚡ Sunucu taraflı render (SSR) ve edge önbellekleme
- 🌐 Çoklu dil desteği

### İçerik Yönetimi
- 📝 Özel ürün açıklamaları ve SEO metadata
- 🖼️ Dinamik içerikli hero bölümleri
- 📄 Portable text ile esnek sayfa oluşturucu
- 🎨 Sanity Image URL ile görsel yönetimi
- 🔄 Gerçek zamanlı içerik önizleme
- 📊 Görsel içerik editörü

### Geliştirici Deneyimi
- 🚀 Baştan sona TypeScript
- 🎨 Vite plugin ile Tailwind CSS v4
- 📦 Monorepo yönetimi için pnpm workspace
- 🔧 Yapılandırılmış ESLint ve Prettier
- 🌊 Kod üretimi ile GraphQL
- 🔥 Hot Module Replacement (HMR)

## 📁 Proje Yapısı

```
nd-sanity-starter/
├── studio/                    # Sanity Studio (CMS)
│   ├── schemaTypes/          # İçerik tipi tanımlamaları
│   │   ├── collection.ts     # Koleksiyon şeması
│   │   ├── hero.ts          # Hero bölümü şeması
│   │   ├── page.ts          # Sayfa şeması
│   │   ├── product.ts       # Ürün şeması
│   │   └── index.ts         # Şema export'ları
│   ├── sanity.config.ts     # Sanity yapılandırması
│   ├── sanity.cli.ts        # CLI yapılandırması
│   └── package.json         # Studio bağımlılıkları
│
└── web/                      # Shopify Hydrogen Mağaza Cephesi
    ├── app/
    │   ├── components/       # React bileşenleri
    │   │   ├── AddToCartButton.tsx
    │   │   ├── CartMain.tsx
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ProductForm.tsx
    │   │   └── ...
    │   ├── lib/              # Yardımcı kütüphaneler
    │   │   ├── context.ts    # Uygulama context'i
    │   │   ├── sanity.ts     # Sanity client
    │   │   ├── sanity-queries.ts   # GROQ sorguları
    │   │   ├── sanity-types.ts     # Tip tanımlamaları
    │   │   ├── sanity-image.ts     # Görsel yardımcıları
    │   │   └── ...
    │   ├── routes/           # React Router rotaları
    │   │   ├── ($locale)._index.tsx      # Anasayfa
    │   │   ├── ($locale).products.$handle.tsx
    │   │   ├── ($locale).collections.$handle.tsx
    │   │   ├── ($locale).cart.tsx
    │   │   ├── ($locale).account.tsx
    │   │   └── ...
    │   ├── styles/           # Global stiller
    │   └── entry.server.tsx  # Sunucu giriş noktası
    ├── public/               # Statik dosyalar
    ├── vite.config.ts       # Vite yapılandırması
    └── package.json         # Web bağımlılıkları
```

## 🔧 Gereksinimler

Başlamadan önce, aşağıdakilerin yüklü olduğundan emin olun:

- **Node.js**: v18.0.0 veya üzeri
- **pnpm**: v8.0.0 veya üzeri (önerilen) veya npm/yarn
- **Shopify Partner Hesabı**: Geliştirme mağazası oluşturmak için
- **Sanity Hesabı**: CMS için ücretsiz hesap

## 🚀 Başlangıç

### 1. Repoyu Klonlayın

```bash
git clone git@github.com:logrenant/nd-sanity-starter.git
cd nd-sanity-starter
```

### 2. Bağımlılıkları Yükleyin

```bash
# Hem studio hem de web için bağımlılıkları yükle
pnpm install
```

### 3. Sanity Studio'yu Ayarlayın

```bash
cd studio

# Sanity'ye giriş yapın (sadece ilk seferde)
npx sanity login

# GraphQL API'yi başlatın ve dağıtın
pnpm run deploy-graphql
```

### 4. Ortam Değişkenlerini Yapılandırın

Hem `studio` hem de `web` dizinlerinde `.env` dosyaları oluşturun. Detaylar için [Ortam Değişkenleri](#-ortam-değişkenleri) bölümüne bakın.

### 5. Geliştirme Sunucularını Başlatın

```bash
# Terminal 1 - Sanity Studio'yu başlat
cd studio
pnpm dev

# Terminal 2 - Hydrogen mağaza cephesini başlat
cd web
pnpm dev
```

- **Sanity Studio**: http://localhost:3333
- **Hydrogen Mağaza Cephesi**: http://localhost:3000

## 🔐 Ortam Değişkenleri

### Studio (.env)

```env
# Sanity Yapılandırması
SANITY_STUDIO_PROJECT_ID=proje_id_niz
SANITY_STUDIO_DATASET=production
```

### Web (.env)

```env
# Shopify Yapılandırması
PUBLIC_STORE_DOMAIN=magazaniz.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=storefront_api_token_iniz
PUBLIC_STOREFRONT_API_VERSION=2024-10

# Sanity Yapılandırması
PUBLIC_SANITY_PROJECT_ID=sanity_proje_id_niz
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-12-25
SANITY_API_TOKEN=sanity_api_token_iniz

# Opsiyonel
SESSION_SECRET=oturum_gizli_anahtariniz
```

### Bu Değerleri Nasıl Alırsınız

#### Shopify Kimlik Bilgileri:
1. Shopify Partner Dashboard'unuza gidin
2. Yeni bir geliştirme mağazası oluşturun
3. Apps > Develop apps > Create an app
4. Storefront API erişimini yapılandırın
5. Storefront erişim token'ınızı alın

#### Sanity Kimlik Bilgileri:
1. [sanity.io/manage](https://sanity.io/manage) adresini ziyaret edin
2. Yeni bir proje oluşturun veya mevcut olanı seçin
3. Proje ID'nizi kopyalayın
4. Settings > API > Tokens > Add token

## 💻 Geliştirme

### Studio'yu Çalıştırma

```bash
cd studio
pnpm dev          # Geliştirme sunucusunu başlat
pnpm build        # Üretim için derle
pnpm deploy       # Sanity'nin hosting'ine dağıt
```

### Mağaza Cephesini Çalıştırma

```bash
cd web
pnpm dev          # Codegen ile geliştirme sunucusunu başlat
pnpm build        # Üretim için derle
pnpm preview      # Üretim derlemesini önizle
pnpm typecheck    # TypeScript tip kontrolü yap
pnpm lint         # ESLint çalıştır
```

### Kod Üretimi

Web uygulaması, tip güvenli Shopify API çağrıları için GraphQL kod üretimi kullanır:

```bash
cd web
pnpm codegen      # GraphQL şemalarından tipler üret
```

## 🚀 Dağıtım

### Sanity Studio'yu Dağıtma

Sanity, Studio için ücretsiz hosting sağlar:

```bash
cd studio
pnpm build
pnpm deploy
```

Studio'nuz `https://projeniz.sanity.studio` adresinde erişilebilir olacak

### Hydrogen Mağaza Cephesini Dağıtma

Hydrogen, çeşitli platformlarla harika çalışır:

#### Shopify Oxygen (Önerilen)
```bash
cd web
npx shopify hydrogen deploy
```

#### Vercel
1. Repo'nuzu Vercel'e bağlayın
2. Ortam değişkenlerini ayarlayın
3. Push yapınca otomatik dağıtım

#### Netlify
1. Repo'nuzu Netlify'e bağlayın
2. Build komutu: `cd web && npm run build`
3. Yayınlama dizini: `web/dist/client`

## 🏗️ Mimari

### Veri Akışı

```
┌─────────────────┐
│   Shopify API   │ ◄─── Ürün verisi, sepet, ödeme
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│ Hydrogen Web    │ ◄───►│  Sanity CMS  │
│ (Mağaza Cephesi)│      │   (İçerik)   │
└────────┬────────┘      └──────────────┘
         │
         ▼
┌─────────────────┐
│ Son Kullanıcılar│
└─────────────────┘
```

### Temel Kavramlar

1. **Hibrit Veri Yaklaşımı**: 
   - Shopify ticaret işlemlerini yönetir (ürünler, sepet, ödeme)
   - Sanity içeriği yönetir (açıklamalar, sayfalar, pazarlama)

2. **Sunucu Taraflı Render**:
   - İlk sayfa yüklemeleri performans için sunucu taraflı render edilir
   - Sonraki navigasyonlar istemci taraflı yönlendirme kullanır

3. **Edge Önbellekleme**:
   - Hydrogen, hızlı global teslimat için edge önbellekleme kullanır
   - Sanity'nin CDN'i içeriği optimal performansla sunar

## 📝 İçerik Tipleri

### Ürün (Product)

Shopify'ın varsayılan verisinin ötesinde gelişmiş ürün bilgisi:

```typescript
{
  title: string          // Shopify'dan
  shopifyId: string      // Shopify GID
  slug: slug             // URL dostu tanımlayıcı
  description?: text     // Özel açıklama
  seo?: {
    title: string
    description: text
  }
  images?: array         // Ek görseller
}
```

### Koleksiyon (Collection)

Koleksiyon özelleştirme ve içeriği:

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

### Hero Bölümü

Anasayfa hero bannerları:

```typescript
{
  title: string
  subtitle?: text
  image: image          // Hotspot ile
  ctaText?: string
  ctaLink?: string
  isActive: boolean     // Anasayfada göster
}
```

### Sayfa (Page)

Esnek içerik sayfaları:

```typescript
{
  title: string
  slug: slug
  content?: array       // Bloklar, görseller, referanslar ile portable text
  seo?: {
    title: string
    description: text
  }
}
```

## 📜 Kullanılabilir Komutlar

### Studio Komutları

| Komut | Açıklama |
|-------|----------|
| `pnpm dev` | Geliştirme sunucusunu başlat (port 3333) |
| `pnpm start` | dev için alias |
| `pnpm build` | Üretim için studio'yu derle |
| `pnpm deploy` | Studio'yu Sanity hosting'e dağıt |
| `pnpm deploy-graphql` | GraphQL API'yi dağıt |

### Web Komutları

| Komut | Açıklama |
|-------|----------|
| `pnpm dev` | Codegen ile dev sunucusunu başlat |
| `pnpm build` | Üretim için derle |
| `pnpm preview` | Üretim derlemesini önizle |
| `pnpm lint` | ESLint çalıştır |
| `pnpm typecheck` | TypeScript ile tip kontrolü |
| `pnpm codegen` | GraphQL tipleri üret |

## 🛠️ Teknoloji Yığını

### Frontend (Web)
- **Framework**: [Shopify Hydrogen](https://hydrogen.shopify.dev/) (React Router 7)
- **Dil**: TypeScript
- **Stil**: Tailwind CSS v4
- **Build Aracı**: Vite
- **API İstemcisi**: Kod üretimi ile GraphQL
- **Görsel Optimizasyonu**: Shopify CDN + Sanity Image URLs

### Backend (Studio)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Framework**: Sanity Studio (React)
- **Sorgu Dili**: GROQ
- **Eklentiler**:
  - Structure Tool
  - Vision (GROQ playground)
  - Media Library
  - Unsplash Asset Source

### Geliştirme Araçları
- **Paket Yöneticisi**: pnpm with workspaces
- **Linting**: ESLint
- **Formatlama**: Prettier
- **Tip Kontrolü**: TypeScript

## 📚 En İyi Uygulamalar

### İçerik Yönetimi

1. **Slug'ları Akıllıca Kullanın**: SEO dostu URL'ler için her zaman başlıklardan slug üretin
2. **SEO Öncelikli**: Tüm içerik tipleri için SEO metadata doldurun
3. **Görsel Optimizasyonu**: Uygun boyutlarla Sanity'nin görsel pipeline'ını kullanın
4. **İçerik Önizleme**: Yayınlamadan önce Sanity'nin önizleme özelliklerini kullanın

### Geliştirme

1. **Tip Güvenliği**: Şema değişikliklerinden sonra her zaman `pnpm codegen` çalıştırın
2. **Ortam Değişkenleri**: Asla `.env` dosyalarını commit etmeyin
3. **Kod Stili**: ESLint ve Prettier yapılandırmalarını kullanın
4. **Git İş Akışı**: Yeni özellikler için feature branch'ler oluşturun

### Performans

1. **Kritik Olmayan Veriyi Erteleyin**: Fold altı içerik için React Router'ın defer özelliğini kullanın
2. **Görsel Lazy Loading**: Görseller için lazy loading uygulayın
3. **Edge Önbellekleme**: Shopify'ın edge network'ünden yararlanın
4. **Bundle Optimizasyonu**: Düzenli bundle boyutu denetimleri

## 🤝 Katkıda Bulunma

1. Repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik ekle'`)
4. Branch'inizi push edin (`git push origin feature/harika-ozellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için LICENSE dosyasına bakın.

## 🆘 Destek & Kaynaklar

### Dokümantasyon
- [Shopify Hydrogen Dokümanları](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [Sanity Dokümantasyonu](https://www.sanity.io/docs)
- [React Router v7 Dokümanları](https://reactrouter.com/)
- [Tailwind CSS Dokümanları](https://tailwindcss.com/)

### Topluluk
- [Shopify Topluluğu](https://community.shopify.com/)
- [Sanity Slack](https://slack.sanity.io/)
- [GitHub Issues](../../issues)

## 🙏 Teşekkürler

- Harika Hydrogen framework'ü için Shopify'a
- Esnek CMS platformu için Sanity.io'ya
- Değerli araçlar ve kütüphaneler için açık kaynak topluluğuna

---

**İyi kodlamalar! 🚀**

Sorularınız veya sorunlarınız için lütfen GitHub'da issue açın.