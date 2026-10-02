# Pelan Induk Bandar Pintar Negeri Sembilan 2040

**NOGORI PINTAR 2040**  
*“Memacu Inovasi, Menjamin Kelestarian”*

Aplikasi portal dan papan pemuka digital interaktif rasmi untuk **Pelan Induk Bandar Pintar Negeri Sembilan 2040**. Dibangunkan khusus untuk pembentangan pengurusan, taklimat pihak berkepentingan, penerokaan geospatial interaktif, dan maklumat awam mengenai kesemua 85 inisiatif bandar pintar Negeri Sembilan.

---

## Ciri-Ciri Utama

1. **7 Komponen Bandar Pintar**: Smart Government, Smart Economy, Smart Environment, Smart Mobility, Smart People, Smart Digital Infrastruktur, dan Smart Living.
2. **10 Inisiatif Fast Track**: Sorotan khusus inisiatif berkeutamaan tinggi untuk impak pantas.
3. **Smart Map Geospatial**: Pemetaan interaktif OpenStreetMap yang memaparkan 76 titik koordinat sebenar merentasi daerah-daerah Negeri Sembilan.
4. **Penjelajah Inisiatif Berkuasa**: Carian pantas, penapisan pelbagai kriteria (komponen, agensi, fasa, penarafan, status) serta laci butiran terperinci.
5. **Analitik Interaktif**: Carta pecahan inisiatif, status pelaksanaan, agensi pelaksana dan anggaran bajet USP Fund.
6. **Penjelajah Agensi**: Analisis keterlibatan agensi utama dan sokongan kerajaan negeri.
7. **Jadual Data Komprehensif**: Paparan data lengkap dengan susunan, penapisan dan fungsi eksport CSV.
8. **Nogori Pintar AI Insights**: Enjin analisis cerdas tempatan dalam Bahasa Melayu yang menjawab pertanyaan fakta secara serta-merta tanpa memerlukan kunci API luar.
9. **Mod Pembentangan Eksekutif**: Paparan skrin penuh dengan saiz statistik diperbesarkan untuk kegunaan mesyuarat pengurusan.

---

## Pembangunan Tempatan

Untuk menjalankan aplikasi ini di komputer anda:

```bash
# 1. Pasang dependensi
npm install

# 2. Mulakan pelayan pembangunan
npm run dev
```

Buka pelayar web anda di `http://localhost:3000`.

---

## Membina Aplikasi (Build)

Untuk menghasilkan fail statik sedia-edar (`dist/`):

```bash
npm run build
```

---

## Penerbitan ke GitHub Pages (Untuk Pengguna Awam)

Aplikasi ini telah dikonfigurasi sepenuhnya untuk diterbitkan ke GitHub Pages tanpa memerlukan sebarang pelayan belakang (backend) atau pangkalan data luar:

1. **Eksport atau Tolak (Push)** repositori ini ke akaun GitHub anda.
2. Di repositori GitHub anda, klik tab **Settings** (Tetapan).
3. Di menu sebelah kiri, klik **Pages**.
4. Di bawah bahagian **Build and deployment** > **Source**, pilih:  
   👉 **GitHub Actions**
5. Aliran kerja `.github/workflows/deploy.yml` akan membina dan menerbitkan laman web secara automatik setiap kali terdapat kemas kini di cawangan `main`.
6. Selepas 1-2 minit, anda akan mendapat pautan laman web awam yang sedia digunakan (contohnya: `https://NAMA-PENGGUNA.github.io/NAMA-REPOSITORI/`).

---

**Sumber Data**: Pelan Induk Bandar Pintar Negeri Sembilan 2040  
**Penyelaras**: PLANMalaysia Negeri Sembilan (Jabatan Perancangan Bandar dan Desa Negeri Sembilan)
