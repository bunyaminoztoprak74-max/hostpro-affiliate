# Proje klasörlerini D:\Projects altına taşır
# Çalıştırma: PowerShell'i aç (Win tuşuna basıp "powershell" yaz, Enter'a bas)
# Sonra şu komutu çalıştır:
#   & "C:\Users\ASUS\OneDrive\Masaüstü\hostpro-affiliate\move-projects-to-d.ps1"

$dest = "D:\Projects"
if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest | Out-Null
    Write-Host "Oluşturuldu: $dest"
}

$projects = @(
    "C:\Users\ASUS\OneDrive\Masaüstü\hostpro-affiliate",
    "C:\aisaastoolkit",
    "C:\HomePilot",
    "C:\flydeal",
    "C:\oztoprakenerji2codex"
)

foreach ($src in $projects) {
    if (Test-Path $src) {
        $name = Split-Path $src -Leaf
        $target = Join-Path $dest $name
        Write-Host "Tasiniyor: $src -> $target"
        # robocopy /move: buyuk klasorler (node_modules dahil) icin guvenilir, kilitli dosyalarda tekrar dener
        robocopy $src $target /E /MOVE /R:3 /W:2 /NFL /NDL | Out-Null
        Write-Host "Tamamlandi: $name"
    } else {
        Write-Host "BULUNAMADI (atlandi): $src"
    }
}

Write-Host ""
Write-Host "Tum tasima islemleri bitti. D:\Projects icerigi:"
Get-ChildItem $dest | Select-Object Name
