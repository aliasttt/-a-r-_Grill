# GitHub Pages ile Yayınlama

Bu site GitHub Pages'te sorunsuz çalışacak şekilde hazırlanmıştır.

## Adımlar

1. **Değişiklikleri push edin**
   ```bash
   git add .
   git commit -m "Premium dark theme - Çağrı Grill"
   git push origin main
   ```

2. **GitHub'da Pages'i açın**
   - Repo sayfasında **Settings** → **Pages**
   - **Source**: "Deploy from a branch" seçin
   - **Branch**: `main` (veya `master`), klasör: `/ (root)`
   - **Save** ile kaydedin

3. **Site adresi**
   - Repo adı `Ozetsa_restaurant` ise:  
     **https://[kullanici-adiniz].github.io/Ozetsa_restaurant/**
   - Repo adı `[kullanici-adiniz].github.io` ise (user site):  
     **https://[kullanici-adiniz].github.io/**

## Notlar

- Tüm yollar **relative** (css/style.css, js/main.js) olduğu için hem root hem alt klasörde çalışır.
- `.nojekyll` dosyası eklendi; Jekyll varsayılan davranışı devre dışı kalır.
- Son push'tan sonra birkaç dakika içinde güncel sürüm yayınlanır.
