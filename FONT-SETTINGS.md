# Font Settings Kullanım Kılavuzu

## Genel Bakış

Sanity Studio'da site ayarlarınızı yönetebilir, özel fontlarınızı TTF/OTF/WOFF dosyaları olarak yükleyebilir ve her font için birden fazla ağırlık ekleyerek web sitenize otomatik olarak CSS variables olarak entegre edebilirsiniz.

## Site Ayarları

Site Settings bölümünde aşağıdaki ayarları yapabilirsiniz:

- **Site Title**: Sitenizin başlığı (zorunlu)
- **Site Description**: Sitenizin açıklaması
- **Site Logo**: Ana logo görseli
- **Favicon**: Tarayıcı sekmesi ikonu (önerilen: 32x32px veya 48x48px)
- **Default Social Share Image**: Sosyal medya paylaşımları için varsayılan görsel (önerilen: 1200x630px)
- **Custom Fonts**: Özel font dosyalarınız

## Sanity Studio'da Font Ekleme

1. **Sanity Studio'ya giriş yapın** ve `Settings > Site Settings` bölümüne gidin
2. **Custom Fonts** alanına yeni bir font ekleyin

### Font Alanları

- **Font Name**: Fontun adı (örn: "Inter", "Roboto", "Poppins")
- **CSS Variable Name**: CSS'de kullanılacak değişken adı (örn: "font-primary", "font-heading")
  - Bu alan otomatik olarak `--` prefix'i ile kullanılır
- **Fallback Fonts**: Yedek fontlar (örn: "sans-serif, Arial, Helvetica")

### Font Weights (Ağırlıklar)

Her font için birden fazla ağırlık dosyası yükleyebilirsiniz:

- **Font Weight**: Ağırlık değeri (100-900 arası)
- **Font File**: Font dosyasını yükleyin (.ttf, .otf, .woff, .woff2)
- **Font Style**: Normal veya Italic

## Örnek Kullanım

### Font Dosyalarını Yükleme

```
Font Name: Inter
CSS Variable Name: font-primary
Fallback: sans-serif

Weights:
  1. Weight: 400, Style: Normal
     File: Inter-Regular.ttf
  
  2. Weight: 500, Style: Normal
     File: Inter-Medium.ttf
  
  3. Weight: 700, Style: Normal
     File: Inter-Bold.ttf
```

### Desteklenen Font Formatları

- **TTF** (TrueType Font)
- **OTF** (OpenType Font)
- **WOFF** (Web Open Font Format)
- **WOFF2** (Web Open Font Format 2) - En optimize format

### CSS'de Kullanım

Sanity'de eklediğiniz fontlar otomatik olarak CSS variables olarak kullanılabilir hale gelir:

```css
/* Örnek: font-primary değişkenini kullanma */
body {
  font-family: var(--font-primary);
}

h1, h2, h3 {
  font-family: var(--font-heading);
}

.button {
  font-family: var(--font-secondary);
}
```

### Tailwind CSS ile Kullanım

`tailwind.config.js` dosyanızı güncelleyerek CSS variables'ı kullanabilirsiniz:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        primary: 'var(--font-primary)',
    Font dosyaları Sanity'de barındırılır**
✅ **TTF, OTF, WOFF, WOFF2 formatları desteklenir**
✅ **@font-face kuralları otomatik oluşturulur**
✅ **CSS variables otomatik olarak :root'a eklenir**
✅ **Body'ye otomatik olarak --font-primary uygulanır**
✅ **Tailwind CSS ile tam entegrasyon**
✅ **Font ağırlıkları Tailwind class'ları ile kusursuz çalışır**
✅ **font-display: swap ile optimize edilmiş yükleme**
✅ **Fallback fontlar otomatik eklenir**
✅ **Site metadata yönetimi (title, description, logo, favicon, og:image)
Ardından Tailwind class'larında kullanın:

```jsx
<h1 className="font-heading">Başlık</h1>
<p className="font-primary">Paragraf metni</p>
<button className="font-secondary">Buton</button>
```

## Otomatik Özellikler

✅ **@font-face kuralları otomatik oluşturulur**
✅ **CSS variables otomatik olarak :root'a eklenir**
✅ **Body'ye otomatik olarak --font-primary uygulanır**
✅ **Tailwind CSS ile tam entegrasyon**
✅ **Font ağırlıkları Tailwind class'ları ile kusursuz çalışır**
✅ **Font ağırlıkları ayrı ayrı yüklenir (performans için)**
✅ **font-display: swap ile optimize edilmiş yükleme**
✅ **Fallback fontlar otomatik eklenir**

## Tailwind Font Weight Kullanımı

Sanity'de eklediğiniz font ağırlıkları Tailwind CSS class'ları ile otomatik olarak eşleşir:

| Sanity Weight | Tailwind Class | Açıklama |
|---------------|----------------|----------|
| 100 | `font-thin` | Thin |
| 200 | `font-extralight` | Extra Light |
| 300 | `font-light` | Light |
| 400 | `font-normal` | Normal/Regular |
| 500 | `font-medium` | Medium |
| 600 | `font-semibold` | Semi Bold |
| 700 | `font-bold` | Bold |
| 800 | `font-extrabold` | Extra Bold |
| 900 | `font-black` | Black |

### Örnek Kullanım

```jsx
{/* Body otomatik olarak font-primary kullanır */}
<body>
  {/* Normal ağırlık (400) */}
  <p className="font-normal">Normal metin</p>
  
  {/* Medium ağırlık (500) - Sanity'de eklediğiniz 500 weight kullanılır */}
  <p className="font-medium">Medium metin</p>
  
  {/* Bold ağırlık (700) - Sanity'de eklediğiniz 700 weight kullanılır */}
  <h1 className="font-bold">Kalın başlık</h1>
</body>
```

**Önemli:** Tailwind'de kullandığınız font-weight class'larının karşılığı olan ağırlıkları Sanity'de eklemeyi unutmayın. Örneğin, `font-medium` kullanacaksanız, Sanity'de weight 500 eklemeniz gerekir.

## Teknik Detaylar

### Oluşturulan CSS Yapısı

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: url('...') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  src: url('...') format('woff2');
  font-display: swap;
}

:root {
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Poppins', sans-serif;
}
```

## İpWOFF2 formatı tercih edin**: En iyi sıkıştırma ve tarayıcı desteği
2. **Font dosyalarını optimize edin**: Gereksiz karakterleri kaldırın (subsetting)
3. **Performans**: Sadece kullandığınız ağırlıkları ekleyin
4. **Fallback**: Her zaman uygun bir fallback font belirleyin
5. **Değişken adları**: Anlamlı ve tutarlı isimler kullanın (örn: font-primary, font-heading, font-body)
6. **Dosya boyutları**: Font dosyalarınızı mümkünse 100KB altında tutun
7. **Lisans**: Kullandığınız fontların web kullanımı için lisanslı olduğundan emin olun

## Font Dosyası Nasıl Edinilir?

### Ücrdosyalarının doğru yüklendiğinden emin olun
- Tarayıcı console'unda hata var mı kontrol edin
- CSS variables doğru yazılmış mı kontrol edin
- Font dosyasının format'ını kontrol edin (TTF, OTF, WOFF, WOFF2)

**Font dosyası yüklenmiyor:**
- Dosya boyutunun Sanity limitlerini aşmadığından emin olun
- Dosya formatının desteklenen formatlarda olduğunu kontrol edin (.ttf, .otf, .woff, .woff2)
- Dosyanın bozuk olmadığından emin olun

**Performans sorunları:**
- Font dosyalarınızı optimize edin (subsetting)
- WOFF2 formatı kullanın (en iyi sıkıştırma)
- Gereksiz font ağırlıklarını kaldıreliği ile
- **MyFonts**: Ücretli premium fontlar
- **Fonts.com**: Profesyonel font marketi

### Font Formatını Dönüştürme
Eğer farklı bir formatta font dosyanız varsa:
- **Font Squirrel Webfont Generator**: TTF/OTF'yi WOFF/WOFF2'ye dönüştürün
- **CloudConvert**: Online format dönüştürücü
4. **Değişken adları**: Anlamlı ve tutarlı isimler kullanın (örn: font-primary, font-heading, font-body)
5. **Test**: Fontları ekledikten sonra sitenizin yüklenmesini kontrol edin

## Sorun Giderme

**Fontlar görünmüyorsa:**
- Sanity Studio'da settings dokümanı oluşturulmuş mu kontrol edin
- Font URL'lerinin geçerli olduğundan emin olun
- Tarayıcı console'unda hata var mı kontrol edin
- CSS variables doğru yazılmış mı kontrol edin

**CORS hatası alıyorsanız:**
- Font URL'lerinin CORS header'larına izin verdiğinden emin olun
- Google Fonts gibi güvenilir CDN'ler kullanın
