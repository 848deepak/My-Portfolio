# SEO Setup Guide

Your portfolio is now SEO-optimized with comprehensive metadata, structured data, and best practices. Here's what's been added:

## ✅ Implemented Features

### 1. **Metadata & Meta Tags**
- Comprehensive title and description tags
- OpenGraph tags for social media sharing (Facebook, LinkedIn)
- Twitter Card tags for better Twitter sharing
- Keywords for search engines
- Canonical URLs to prevent duplicate content
- Robots meta tags for crawler instructions

### 2. **Structured Data (JSON-LD)**
- Person schema with professional information
- Education credentials
- Skills and expertise
- Social profiles
- Location information

### 3. **SEO Files**
- **robots.txt** - Controls search engine crawlers
- **sitemap.xml** - Provides search engines a map of all pages

### 4. **Security Headers**
- X-Frame-Options - Prevents clickjacking
- X-Content-Type-Options - Prevents MIME type sniffing
- X-XSS-Protection - Enables browser XSS protection
- Referrer-Policy - Controls referrer information
- Permissions-Policy - Restricts browser features

### 5. **Page Optimization**
- Individual metadata for each route
- Proper heading hierarchy
- Image alt text for accessibility
- Internal linking structure

## 📋 TODO: Complete These Steps

### 1. Update SEO Config with Your Information
Edit `/src/lib/seoConfig.ts` and update:
- Replace `@deepakpandey` with your actual Twitter handle
- Update social profile URLs with your actual links
- Update email address

### 2. Add Profile Images
Add these images to `/public`:
- **og-image.jpg** (1200x630px) - Used for social sharing
- **profile-image.jpg** (400x400px) - Used in JSON-LD schema
- **apple-touch-icon.png** (180x180px) - iPhone home screen icon
- **favicon.ico** - Browser tab icon

### 3. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain property
3. Submit your sitemap: `https://yourdomain.com/sitemap.xml`
4. Verify ownership (DNS, HTML file, or Google Analytics)

### 4. Update sitemap.xml
Replace the placeholder domain:
- Change `https://deepakpandey.dev/` with your actual domain
- Update lastmod dates as you update your site
- Adjust priority values if needed

### 5. Google Analytics (Optional but Recommended)
Add Google Analytics to track visitors and behavior:
```bash
# Install analytics package
npm install @vercel/analytics
```

Then add to your layout.tsx:
```tsx
import { Analytics } from "@vercel/analytics/react";

// Inside your JSX
<Analytics />
```

### 6. Verify Social Links
Make sure these URLs in `seoConfig.ts` are correct:
- GitHub profile
- Twitter/X profile
- LinkedIn profile

### 7. Update Domain
In `seoConfig.ts` and `next.config.ts`:
- Change all instances of `deepakpandey.dev` to your actual domain
- Update `metadataBase` in layout.tsx

### 8. Test Your SEO
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Mobile Friendly Test**: https://search.google.com/mobile-friendly-test
3. **Lighthouse Audit**: Use Chrome DevTools → Lighthouse

## 🔍 How Search Engines Will Find You

1. **Direct Crawling**: Google bots will read your sitemap.xml
2. **Social Sharing**: OG tags will enhance sharing on Facebook/LinkedIn
3. **Schema Markup**: JSON-LD helps search engines understand your profile
4. **Keywords**: Your keywords will help in text-based searches
5. **Backlinks**: Share your portfolio on:
   - GitHub profile
   - LinkedIn
   - Dev.to
   - Twitter/X
   - Professional networks

## 📊 Expected Results

After implementation and indexing (1-4 weeks):
- Search for "Deepak Pandey developer" → Your site will appear
- Search for "full-stack developer Chandigarh" → Your site will appear
- Your portfolio will be shareable with rich previews on social media
- Search engines will understand your professional background

## 🎯 Important Notes

⚠️ **Domain Important**: Replace `deepakpandey.dev` with your actual domain everywhere
⚠️ **Images Important**: Add high-quality images to `/public` directory
⚠️ **Keep Updated**: Add new projects/experiences to stay fresh in search results
⚠️ **Build Deploy**: Run `npm run build` and deploy to enable these changes

## Quick Checklist

- [ ] Update domain in all config files
- [ ] Add profile images to /public
- [ ] Update social links in seoConfig.ts
- [ ] Verify sitemap.xml dates
- [ ] Submit to Google Search Console
- [ ] Test with Google Rich Results
- [ ] Add Google Analytics (optional)
- [ ] Deploy to production
- [ ] Monitor in Google Search Console

Happy searching! 🚀
