# MPI 1 — To Be, Pronouns & There is/are

Rancangan aktivitas pembelajaran untuk media pembelajaran interaktif di folder ini.

**Tujuan pembelajaran:** menggunakan _to be_ dan kata ganti untuk menyatakan identitas dan
keberadaan benda/orang.

**Cakupan materi:** to be (am/is/are) · personal pronouns & possessive adjectives ·
this/that/these/those · there is/there are.

**Model:** Discovery Learning · **Alokasi:** 2 × 45 menit (dapat dipecah menjadi dua pertemuan
pada batas Tahap 5).

---

## Prinsip yang dipegang

Aturan tata bahasa **tidak pernah diberikan lebih dulu**. Siswa mengumpulkan bukti (Tahap 2 dan
4), merumuskan aturannya sendiri (Tahap 5), baru mengujinya (Tahap 6). Tahap 5 terkunci sampai
tabel buktinya benar — sebuah aturan yang dibaca dari tabel yang salah akan mengajarkan pola yang
salah.

Tiga prinsip pembelajaran mendalam yang menjadi acuan:

- **Berkesadaran** — Tahap 3 meminta siswa menamai sendiri pertanyaan yang ingin dijawabnya,
  bukan menerima pertanyaan dari guru.
- **Bermakna** — Tahap 7 memakai ruang nyata siswa (kelas, bengkel, dapur, kamar), bukan kalimat
  buku teks.
- **Menggembirakan** — kartu bukti yang dipindah-pindah, rule card, dan progress dots membuat
  proses penemuan terlihat dan terasa maju.

---

## Alur tahap

| #   | Tahap               | Sintaks Discovery Learning | Aktivitas siswa                                                                                                                                                                     | ± Menit |
| --- | ------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | Orientation         | _apersepsi_                | Membaca tujuan, skenario "Room 12", dan cara kerja modul                                                                                                                            | 5       |
| 2   | Notice It           | **Stimulation**            | Membaca deskripsi ruang kelas, lalu **meng-klik kata-kata yang berubah bentuk**. Tidak ada aturan, tidak ada benar–salah — hanya _noticing_. Minimal 10 kata sebelum bisa memeriksa | 10      |
| 3   | Your Questions      | **Problem Statement**      | Memilih minimal 3 pertanyaan penyelidikan dan menuliskan satu pertanyaan sendiri. Umpan balik membedakan _pertanyaan pola_ dari pertanyaan kosakata/pelafalan                       | 8       |
| 4   | Evidence Board      | **Data Collection**        | Menyortir 16 kalimat nyata ke 4 papan bukti (to be · kata pengganti nama · kata penunjuk · menyatakan keberadaan). Tombol "Sort again" hanya mengembalikan kartu yang salah         | 15      |
| 5   | Pattern Lab         | **Data Processing**        | Melengkapi 4 tabel pola dari bukti yang tadi disortir, lalu memilih pernyataan aturan yang cocok dengan tabel buatannya. Pilihan aturan baru terbuka setelah tabelnya benar         | 20      |
| 6   | Test Your Rules     | **Verification**           | 12 soal campur (pilihan ganda + isian) dengan petunjuk berjenjang, termasuk kasus yang sengaja mematahkan aturan yang dirumuskan terlalu sederhana                                  | 20      |
| 7   | Describe Your Space | **Generalization**         | Menyusun 4 kalimat dari word bank, lalu menulis 4–6 kalimat mendeskripsikan ruang nyata milik sendiri + self-check dengan rubrik 5 butir                                            | 15      |
| 8   | Reflection          | _refleksi_                 | Meninjau daftar kesalahan yang terkumpul dari Tahap 6–7, menjawab 3 prompt refleksi, dan menilai kepercayaan diri                                                                   | 5       |
| 9   | Results             | _asesmen_                  | Skor per tahap, rule card hasil rumusan sendiri, checklist penyelesaian                                                                                                             | 2       |

Tahap terkunci berurutan: siswa tidak bisa melompat ke Tahap 6 tanpa menyelesaikan Tahap 5.

---

## Kasus yang sengaja dipasang

Tiga butir di Tahap 6 ada untuk mematahkan aturan yang dirumuskan terlalu longgar:

- **v10** — _There **is** some water in the bottle._ Air itu banyak, tapi tidak bisa dihitung.
  Mematahkan "banyak berarti _are_".
- **v2** — _Rani and Dimas **are**…_ Dua nama yang digabung _and_ adalah subjek jamak, meskipun
  tidak ada akhiran _-s_.
- **v4 / v5** — _She is a nurse_ vs _His bag is under the table_. Penentunya bukan artinya,
  melainkan ada-tidaknya nomina tepat setelah kata itu.

---

## Peran guru

- **Tahap 2–3:** jangan menjawab "yang mana yang benar". Pertanyaan siswa di tahap ini adalah
  bahan bakar tahap berikutnya; menjawabnya sekarang membatalkan penemuan.
- **Tahap 4:** berkeliling. Kartu yang salah tempat menunjukkan siswa membaca _topik_ kalimat,
  bukan kata yang dicetak tebal — itulah yang perlu ditanyakan balik.
- **Tahap 5:** minta satu-dua siswa membacakan aturannya dengan kalimat sendiri sebelum lanjut.
- **Tahap 7:** tulisan bebas siswa adalah bukti asesmen yang paling berguna; rubriknya untuk
  siswa, bukan untuk nilai.

---

## Asesmen

Asesmen formatif berjalan di dalam modul: skor per tahap muncul di Tahap 9, dan daftar kesalahan
beserta aturan di baliknya muncul di Tahap 8.

| Komponen            | Butir | Sumber                                                |
| ------------------- | ----- | ----------------------------------------------------- |
| Notice It           | 18    | kata target yang berhasil ditandai                    |
| Evidence Board      | 16    | kartu yang tepat papan                                |
| Pattern Lab         | 25    | baris tabel (percobaan pertama) + 4 pernyataan aturan |
| Test Your Rules     | 12    | jawaban benar                                         |
| Describe Your Space | 4     | kalimat yang benar pada percobaan pertama             |

Tulisan bebas Tahap 7 **tidak diberi skor otomatis** — tulisan itu ditampilkan kembali di Tahap 9
untuk dinilai guru dengan rubrik yang sama yang dipakai siswa untuk self-check.

---

## Berkas

| Berkas       | Isi                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| `data.js`    | seluruh konten pembelajaran: teks, kartu bukti, tabel pola, soal, rubrik, prompt refleksi               |
| `app.js`     | logika tiap tahap; utilitas bersama diambil dari `../shared/engine.js`                                  |
| `styles.css` | hanya gaya khas modul ini; komponen umum dari `../shared/base.css`                                      |
| `index.html` | **di-generate** oleh `npm run build:pages` dari `shared/page-template.html` — jangan disunting langsung |

Progress siswa tersimpan di `localStorage` dengan kunci `eng-tobe-pronouns-v1`.
