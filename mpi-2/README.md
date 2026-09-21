# MPI 2 — Place, Quantity & Time

Rancangan aktivitas pembelajaran untuk media pembelajaran interaktif di folder ini.

**Tujuan pembelajaran:** mendeskripsikan lokasi, jumlah, dan waktu dengan struktur sederhana.

**Cakupan materi:** plural nouns reguler (-s / -es / -ies) · preposisi tempat (in, on, under, at) ·
preposisi waktu untuk jam, hari, tanggal, bulan, dan tahun · question words (what, where, when,
who, how many, what time).

**Model:** Discovery Learning · **Alokasi:** 2 × 45 menit (dapat dipecah menjadi dua pertemuan
pada batas Tahap 5).

---

## Prinsip yang dipegang

Aturan tata bahasa **tidak pernah diberikan lebih dulu**. Siswa mengumpulkan bukti (Tahap 2 dan
4), merumuskan aturannya sendiri (Tahap 5), baru mengujinya (Tahap 6). Tahap 5 terkunci sampai
tabel buktinya benar — sebuah aturan yang dibaca dari tabel yang salah akan mengajarkan pola yang
salah.

Tiga prinsip pembelajaran mendalam yang menjadi acuan:

- **Berkesadaran** — Tahap 3 meminta siswa menamai sendiri pertanyaan penyelidikannya, dan umpan
  baliknya memisahkan pertanyaan pola dari pertanyaan kosakata tanpa menyingkirkan yang kedua.
- **Bermakna** — seluruh modul berlangsung di satu ruang nyata: papan informasi Workshop 3 yang
  harus diisi Andi. Tahap 7 meminta siswa membuat papan informasi untuk ruang praktiknya sendiri.
- **Menggembirakan** — kartu bukti yang dipindah-pindah, tabel pola yang terbuka bertahap, dan
  progress dots membuat proses penemuan terlihat dan terasa maju.

---

## Alur tahap

| #   | Tahap                  | Sintaks Discovery Learning | Aktivitas siswa                                                                                                                                                                    | ± Menit |
| --- | ---------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | Orientation            | _apersepsi_                | Membaca tujuan, skenario "Workshop 3", dan cara kerja modul                                                                                                                        | 5       |
| 2   | Notice It              | **Stimulation**            | Membaca papan informasi bengkel, lalu **mengklik kata yang menandai jumlah, tempat, waktu, atau pertanyaan**. Belum ada benar–salah; minimal 10 tanda sebelum bisa memeriksa       | 10      |
| 3   | Your Questions         | **Problem Statement**      | Memilih minimal 3 pertanyaan penyelidikan dan menuliskan satu pertanyaan sendiri. Umpan balik membedakan _pertanyaan pola_ dari pertanyaan kosakata/pelafalan                      | 8       |
| 4   | Evidence Board         | **Data Collection**        | Menyortir 16 kalimat nyata ke 4 papan bukti (jumlah · tempat · waktu · kalimat tanya). Tombol "Sort again" hanya mengembalikan kartu yang salah                                    | 15      |
| 5   | Pattern Lab            | **Data Processing**        | Melengkapi 4 tabel pola dari bukti yang tadi disortir, lalu memilih pernyataan aturan yang cocok dengan tabel buatannya. Pilihan aturan baru terbuka setelah tabelnya benar        | 20      |
| 6   | Test Your Rules        | **Verification**           | 12 soal campur (pilihan ganda + isian) dengan petunjuk berjenjang, termasuk kasus yang sengaja mematahkan aturan yang dirumuskan terlalu longgar                                   | 20      |
| 7   | Describe Your Workshop | **Generalization**         | Menyusun 4 kalimat dari word bank, lalu menulis papan informasi untuk ruang praktiknya sendiri (jumlah + lokasi + waktu + satu kalimat tanya) dan self-check dengan rubrik 5 butir | 15      |
| 8   | Reflection             | _refleksi_                 | Meninjau daftar kesalahan yang terkumpul dari Tahap 6–7, menjawab 3 prompt refleksi, dan menilai kepercayaan diri                                                                  | 5       |
| 9   | Results                | _asesmen_                  | Skor per tahap, rule card hasil rumusan sendiri, checklist penyelesaian                                                                                                            | 2       |

Tahap terkunci berurutan: siswa tidak bisa melompat ke Tahap 6 tanpa menyelesaikan Tahap 5.

---

## Empat tabel pola (inti penemuan di Tahap 5)

| Tabel | Yang ditemukan siswa                                                                                                         |
| ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Huruf terakhir nomina** yang menentukan akhiran jamak: `s · x · ch · sh` → `-es`; konsonan + `y` → `-ies`; selebihnya `-s` |
| 2     | **Bentuk ruangnya** yang menentukan kata tempat: di dalam → `in`; di permukaan → `on`; di bawah → `under`; satu titik → `at` |
| 3     | **Ukuran satuan waktunya** yang menentukan kata waktu: jam → `at`; hari/tanggal → `on`; bulan/tahun → `in`                   |
| 4     | **Informasi yang dicari** yang menentukan kata tanya — dan `how many` selalu diikuti nomina jamak                            |

Tabel 2 dan 3 sengaja berurutan: siswa menemukan sendiri bahwa `in`, `on`, dan `at` yang sama
bekerja untuk ruang maupun waktu, dan yang berubah hanyalah ukuran satuannya.

---

## Kasus yang sengaja dipasang

Empat butir di Tahap 6 ada untuk mematahkan aturan yang dirumuskan terlalu longgar:

- **v3 / v4** — _keys_ vs _batteries_. Mematahkan "semua nomina berakhiran -y menjadi -ies";
  penentunya huruf **sebelum** -y.
- **v7** — _at the door_. Pintu bukan ruang yang bisa dimasuki, melainkan satu titik. Mematahkan
  "ruangan berarti _in_".
- **v11** — _How many **students**_. Mematahkan "kata tanya tidak memengaruhi kata sesudahnya".
- **v12** — _What time_ vs _When_. Keduanya benar secara tata bahasa; konteks yang memilih.

---

## Pengacakan pilihan jawaban

Setiap daftar yang dijawab siswa diacak (Fisher–Yates dengan `crypto.getRandomValues`), lalu
**urutannya disimpan** di `localStorage` — agar pilihan tidak melompat saat re-render atau reload,
tetapi teracak ulang untuk sesi baru dan setelah tombol Reset.

| Tahap | Yang diacak                                              |
| ----- | -------------------------------------------------------- |
| 3     | urutan kandidat pertanyaan penyelidikan                  |
| 4     | urutan kartu bukti di tray                               |
| 5     | isi dropdown tiap tabel **dan** urutan pernyataan aturan |
| 6     | urutan opsi tiap soal pilihan ganda                      |
| 7     | urutan chip pada word bank                               |

Yang **tidak** diacak karena urutannya bermakna: butir rubrik self-check, skala kepercayaan diri,
baris tabel pola, dan langkah orientasi.

---

## Peran guru

- **Tahap 2–3:** jangan menjawab "yang mana yang benar". Pertanyaan siswa di tahap ini adalah
  bahan bakar tahap berikutnya; menjawabnya sekarang membatalkan penemuan.
- **Tahap 4:** berkeliling. Dua kartu memakai kata yang sama (_at the door_ dan _at 07.15_) untuk
  papan yang berbeda — kartu yang salah tempat menunjukkan siswa menyortir berdasarkan kata, bukan
  berdasarkan apa yang ditunjuk kata itu.
- **Tahap 5:** minta satu-dua siswa membacakan aturannya dengan kalimat sendiri sebelum lanjut,
  terutama hubungan Tabel 2 dengan Tabel 3.
- **Tahap 7:** tulisan bebas siswa adalah bukti asesmen yang paling berguna; rubriknya untuk
  siswa, bukan untuk nilai.

---

## Asesmen

Asesmen formatif berjalan di dalam modul: skor per tahap muncul di Tahap 9, dan daftar kesalahan
beserta aturan di baliknya muncul di Tahap 8.

| Komponen               | Butir | Sumber                                                |
| ---------------------- | ----- | ----------------------------------------------------- |
| Notice It              | 20    | kata target yang berhasil ditandai                    |
| Evidence Board         | 16    | kartu yang tepat papan                                |
| Pattern Lab            | 26    | baris tabel (percobaan pertama) + 4 pernyataan aturan |
| Test Your Rules        | 12    | jawaban benar                                         |
| Describe Your Workshop | 4     | kalimat yang benar pada percobaan pertama             |

Tulisan bebas Tahap 7 **tidak diberi skor otomatis** — tulisan itu ditampilkan kembali di Tahap 9
untuk dinilai guru dengan rubrik yang sama yang dipakai siswa untuk self-check.

---

## Berkas

| Berkas       | Isi                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| `data.js`    | seluruh konten pembelajaran: teks, kartu bukti, tabel pola, soal, rubrik, prompt refleksi               |
| `app.js`     | logika tiap tahap; utilitas bersama diambil dari `../shared/engine.js`                                  |
| `styles.css` | hanya gaya khas modul ini (papan informasi Tahap 2); komponen umum dari `../shared/base.css`            |
| `index.html` | **di-generate** oleh `npm run build:pages` dari `shared/page-template.html` — jangan disunting langsung |

Progress siswa tersimpan di `localStorage` dengan kunci `eng-place-quantity-time-v1`.
