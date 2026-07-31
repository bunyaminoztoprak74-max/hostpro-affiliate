@echo off
cd /d D:\Projects\hostpro-affiliate
echo === Sucuri Affiliate Integration — hostproreviews.com ===
echo.
echo Committing 5 new website security posts with CJ affiliate links...
git add lib/posts/sucuri-review-2026.md
git add lib/posts/sucuri-vs-cloudflare.md
git add lib/posts/best-website-security-services.md
git add lib/posts/best-wordpress-security-solutions.md
git add lib/posts/how-to-protect-website-from-malware.md
git commit -m "feat: add Sucuri affiliate content cluster (5 security posts)

New posts targeting website security / malware protection keywords:
- sucuri-review-2026 (pillar review, WAF + malware removal, 4.6/5)
- sucuri-vs-cloudflare (head-to-head comparison, pricing table)
- best-website-security-services (7-service roundup, ranked)
- best-wordpress-security-solutions (WordPress security stack guide)
- how-to-protect-website-from-malware (complete how-to guide)

CJ Affiliate link: https://www.anrdoezrs.net/click-101761541-13942202
All posts: affiliate disclosure, FAQ schema, comparison tables, internal links"
echo.
echo === Pushing to remote (triggers Vercel deploy) ===
git push
echo.
echo === Waiting 45 seconds for Vercel deploy ===
timeout /t 45 /nobreak >nul
echo.
echo === Verifying live URLs ===
curl -o nul -s -w "Sucuri Review:          %%{http_code}\n" https://hostproreviews.com/blog/sucuri-review-2026
curl -o nul -s -w "Sucuri vs Cloudflare:   %%{http_code}\n" https://hostproreviews.com/blog/sucuri-vs-cloudflare
curl -o nul -s -w "Best Security Services: %%{http_code}\n" https://hostproreviews.com/blog/best-website-security-services
curl -o nul -s -w "WP Security Solutions:  %%{http_code}\n" https://hostproreviews.com/blog/best-wordpress-security-solutions
curl -o nul -s -w "Malware Protection:     %%{http_code}\n" https://hostproreviews.com/blog/how-to-protect-website-from-malware
echo.
echo === Done! ===
echo New URLs:
echo   https://hostproreviews.com/blog/sucuri-review-2026
echo   https://hostproreviews.com/blog/sucuri-vs-cloudflare
echo   https://hostproreviews.com/blog/best-website-security-services
echo   https://hostproreviews.com/blog/best-wordpress-security-solutions
echo   https://hostproreviews.com/blog/how-to-protect-website-from-malware
pause
