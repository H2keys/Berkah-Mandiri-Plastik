# Berkah Mandiri Plastik - Website

Website promosi produk plastik dan layanan sablon custom Berkah Mandiri Plastik.

## 📋 Daftar Isi
- [Fitur](#fitur)
- [Struktur Folder](#struktur-folder)
- [Panduan Deployment ke Vercel](#panduan-deployment-ke-vercel)
- [Cara Melakukan Update](#cara-melakukan-update)
- [Troubleshooting](#troubleshooting)

## ✨ Fitur

- **Hero Section** - Perkenalan brand yang eye-catching
- **Koleksi Produk** - 6 produk unggulan dengan deskripsi detail
- **Sablon Custom** - Gallery showcase desain sablon
- **Why Choose Us** - 6 keunggulan kompetitif
- **WhatsApp Integration** - Nomor 082118145331 terintegrasi di semua section
- **Responsive Design** - Mobile-friendly & desktop optimized
- **Modern UI** - Desain elegan dengan warna navy, putih & biru
- **Floating WhatsApp Button** - Button WhatsApp yang selalu terlihat dengan animasi

## 📁 Struktur Folder

```
berkah-mandiri-plastik/
├── template/
│   └── index.html       # Markup halaman
├── static/
│   ├── css/
│   │   └── styles.css   # Style dan layout UI/UX
│   ├── js/
│   │   └── app.js       # Interaksi frontend
│   ├── img/             # Aset gambar produk dan logo
│   └── sablon-img/      # Aset showcase sablon cup
├── api/
│   └── health.js        # Endpoint health check Vercel
├── vercel.json         # Konfigurasi Vercel
├── .gitignore          # File yang tidak di-track git
└── README.md           # File dokumentasi ini
```

## Menjalankan Lokal

Jalankan server lokal dari root project:

```bash
npm run dev
```

Website tersedia di `http://localhost:3000/template/`.
Saat deploy ke Vercel, halaman utama tersedia langsung di URL root karena diatur oleh `vercel.json`.
Endpoint serverless tersedia melalui `/api/health` setelah deployment di Vercel.

## 🚀 Panduan Deployment ke Vercel

### Opsi 1: Menggunakan GitHub (Recommended)

#### Step 1: Setup GitHub Repository
1. Buat akun GitHub jika belum punya (https://github.com)
2. Buat repository baru:
   - Klik "New" di halaman utama GitHub
   - Nama repository: `berkah-mandiri-plastik`
   - Pilih "Public" atau "Private" sesuai preferensi
   - Jangan pilih opsi "Initialize this repository with"
   - Klik "Create repository"

#### Step 2: Upload File ke GitHub
1. Di terminal/command prompt, masuk ke folder project:
   ```bash
   cd path/to/berkah-mandiri-plastik
   ```

2. Inisialisasi git dan upload file:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Berkah Mandiri Plastik website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/berkah-mandiri-plastik.git
   git push -u origin main
   ```
   *Ganti USERNAME dengan username GitHub Anda*

3. Masukkan GitHub username dan personal access token jika diminta:
   - Username: (GitHub username Anda)
   - Password: (Gunakan Personal Access Token, bukan password)
   - Buat token di: Settings > Developer settings > Personal access tokens

#### Step 3: Deploy ke Vercel
1. Buka https://vercel.com
2. Klik "Sign Up" dan pilih "Continue with GitHub"
3. Izinkan Vercel akses GitHub
4. Klik "New Project"
5. Pilih repository `berkah-mandiri-plastik`
6. Konfigurasi project:
   - Framework Preset: **Other**
   - Root Directory: `.`
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan)
7. Klik "Deploy"
8. Tunggu hingga deployment selesai
9. Vercel akan memberikan URL publik (misal: https://berkah-mandiri-plastik.vercel.app)

### Opsi 2: Deploy Langsung dari Folder (Tanpa GitHub)

1. Buka https://vercel.com
2. Klik "Sign Up" atau "Log In"
3. Klik "New Project" atau "Deploy"
4. Pilih "Import Project" > "Import Git Repository"
5. Paste URL repository git atau drag-drop folder
6. Ikuti step 6-9 dari Opsi 1

### Opsi 3: Upload Manual Files

1. Buka https://vercel.com
2. Di halaman dashboard, scroll ke bawah
3. Cari section "Upload" atau "Drag and drop"
4. Upload semua file:
   - template/
   - static/
   - api/
   - vercel.json

## 🔧 Cara Melakukan Update

### Jika menggunakan GitHub:

1. Edit file lokal sesuai kebutuhan
2. Commit perubahan:
   ```bash
   git add .
   git commit -m "Deskripsi perubahan (contoh: Update harga produk)"
   git push origin main
   ```
3. Vercel otomatis deploy perubahan dalam beberapa menit

### Jika menggunakan Vercel Hobby Plan:

1. Edit file lokal
2. Buka dashboard Vercel
3. Klik project "berkah-mandiri-plastik"
4. Di tab "Deployments", klik "Redeploy"
5. Atau gunakan Vercel CLI:
   ```bash
   npm install -g vercel
   vercel
   ```

## 📝 Panduan Edit Konten Website

### Edit Nomor WhatsApp
Cari `082118145331` di dalam `template/index.html` dan ganti dengan nomor Anda.

### Edit Produk
Setiap produk terletak di section "Koleksi Produk Kami". Edit struktur:

```html
<div class="product-card">
    <div class="product-image">
        <span class="product-number">XX</span>
        <span>NAMA PRODUK</span>
    </div>
    <div class="product-content">
        <h3>NAMA PRODUK</h3>
        <p>DESKRIPSI PRODUK</p>
        <ul class="product-specs">
            <li><strong>Spek 1:</strong> Nilai</li>
            <li><strong>Spek 2:</strong> Nilai</li>
        </ul>
        <a href="https://wa.me/082118145331?text=PESAN%20CUSTOM" class="product-cta">Pesan Sekarang</a>
    </div>
</div>
```

### Menambah Produk Baru
1. Copy-paste struktur produk di atas
2. Ubah nomor urut (product-number)
3. Ubah nama, deskripsi, dan spesifikasi
4. Update link WhatsApp dengan pesan custom

### Edit Warna Brand
Cari section `:root` di bagian CSS dan ubah warna:
```css
:root {
    --primary: #1a1a1a;      /* Warna utama (hitam) */
    --secondary: #ffffff;     /* Warna sekunder (putih) */
   --accent: #2798F5;        /* Warna aksen biru */
    --light-gray: #f5f5f5;   /* Abu-abu terang */
    --dark-gray: #333333;     /* Abu-abu gelap */
    --border: #e0e0e0;        /* Warna border */
}
```

## 📸 Menambahkan Gambar Produk

Untuk menambahkan gambar asli di product card:

1. Simpan gambar di folder `static/img/`
2. Ubah struktur product-image dari:
```html
<div class="product-image">
    <span class="product-number">01</span>
    <span>Nama Produk</span>
</div>
```

Menjadi:
```html
<div class="product-image">
   <img src="/static/img/nama-gambar.jpg" alt="Gelas Injection 14 OZ" style="width: 100%; height: 100%; object-fit: cover;">
    <span class="product-number">01</span>
</div>
```

3. Upload gambar ke Vercel saat deployment

## 🌐 Custom Domain

Untuk menggunakan domain custom Anda:

1. Beli domain di registrar (GoDaddy, Niagahoster, etc)
2. Di dashboard Vercel, buka project "berkah-mandiri-plastik"
3. Klik tab "Settings" > "Domains"
4. Klik "Add"
5. Masukkan domain Anda
6. Ikuti instruksi untuk konfigurasi DNS di registrar

**Contoh konfigurasi DNS:**
- **Type:** A
- **Name:** @ (atau leave blank)
- **Value:** 76.76.19.21 (bisa berbeda, ikuti instruksi Vercel)

## 🆘 Troubleshooting

### Problem: Website tidak muncul setelah deploy
**Solusi:**
- Tunggu 2-3 menit untuk deployment selesai
- Refresh browser (Ctrl+F5 atau Cmd+Shift+R)
- Cek status deployment di dashboard Vercel

### Problem: Link WhatsApp tidak bekerja
**Solusi:**
- Pastikan format nomor benar: `62xxxxxxxxxx` atau `08xxxxxxxxxx`
- Atau gunakan: https://wa.me/62xxxxxxxxxx

### Problem: Gambar tidak muncul
**Solusi:**
- Pastikan path gambar benar
- Pastikan format gambar supported (JPG, PNG, WebP)
- Ukuran file jangan terlalu besar (max 5MB per gambar)

### Problem: Mobile view tidak responsive
**Solusi:**
- Clear cache browser
- Pastikan meta viewport tag ada di `<head>`
- Test di different devices

### Problem: Deploy gagal dari GitHub
**Solusi:**
- Pastikan GitHub repository public atau Vercel punya akses
- Cek branch name (harus "main" atau "master")
- Verifikasi GitHub personal access token

## 📞 Support & Bantuan

Jika ada pertanyaan atau butuh bantuan:
- Hubungi developer atau support tim Anda
- Check dokumentasi Vercel: https://vercel.com/docs
- Forum Vercel Community: https://github.com/vercel/next.js/discussions

## 📄 License

Website ini dibuat untuk Berkah Mandiri Plastik © 2024

---

**Versi:** 1.0  
**Last Updated:** September 2024
