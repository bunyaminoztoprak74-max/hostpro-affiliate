# hostpro-affiliate — Git Push Helper
# Kullanim: .\push.ps1 "commit mesaji"
# Ornek:    .\push.ps1 "feat: yeni karsilastirma sayfalari"

param(
    [Parameter(Mandatory=$false)]
    [string]$Message = "chore: update"
)

Write-Host "Lock dosyalari temizleniyor..." -ForegroundColor Yellow
Get-ChildItem ".git" -Filter "*.lock" -Recurse -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem ".git\refs" -Filter "*.lock" -Recurse -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue

Write-Host "Degisiklikler stage'e ekleniyor..." -ForegroundColor Yellow
git add -A

Write-Host "Commit olusturuluyor: $Message" -ForegroundColor Yellow
git commit -m $Message

Write-Host "GitHub'a push ediliyor..." -ForegroundColor Yellow
git push

Write-Host "Tamamlandi!" -ForegroundColor Green
