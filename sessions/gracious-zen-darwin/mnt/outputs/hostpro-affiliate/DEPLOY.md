# HostPro Reviews — Deploy Guide

## 1. Affiliate Linklerini Güncelle

Tüm dosyalarda `OFMBZTOPRZSU` yazan yerleri kendi affiliate kodunla değiştir:

- `app/page.tsx` → hostingPlans içindeki affiliateUrl'ler
- `components/Navbar.tsx` → "Best Deal" butonu
- `components/Footer.tsx` → hosting linkleri
- `app/blog/[slug]/page.tsx` → sidebar CTA
- `lib/posts/*.md` → makale içindeki linkler

## 2. Domain Adını Güncelle

`app/layout.tsx` ve `app/sitemap.ts` içinde:
```
https://hostpro-reviews.com
```
→ kendi domain adınla değiştir.

## 3. GitHub'a Yükle

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADIN.git
git push -u origin main
```

## 4. Vercel'e Deploy Et

1. vercel.com'a git ve GitHub hesabınla giriş yap
2. "Add New Project" → GitHub reponuzu seç
3. Framework: Next.js (otomatik algılar)
4. "Deploy" butonuna bas
5. ~2 dakika bekle — siteniz canlıya geçer!

## 5. Domain Bağla (Opsiyonel)

Vercel Dashboard → Settings → Domains → Add Domain

## Yerel Geliştirme

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Yeni Makale Eklemek

`lib/posts/` klasörüne yeni bir `.md` dosyası ekle:

```markdown
---
title: "Makale Başlığı"
excerpt: "Kısa açıklama"
date: "2026-05-18"
category: "Review"
readTime: "5 min read"
categoryColor: "bg-indigo-100 text-indigo-700"
---

Makale içeriği buraya...
```

Git'e push ettikten sonra Vercel otomatik olarak yeniden deploy eder.

