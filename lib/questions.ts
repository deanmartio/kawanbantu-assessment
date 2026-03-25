import { Question } from '@/types';

export const questions: Question[] = [
  // ─── DIMENSI 1: KREDIBILITAS ORGANISASI ───
  {
    id: 1,
    dimensionId: 'kredibilitas',
    isScored: true,
    text: 'Saat seseorang bertanya "organisasi kamu sudah resmi belum?", apa yang biasanya kamu jawab?',
    options: [
      { value: 1, label: '"Kami masih dalam tahap awal, legalitas sedang kami urus"' },
      { value: 2, label: '"Sudah ada tapi dokumennya belum semua lengkap"' },
      { value: 3, label: '"Sudah terdaftar, tapi saya perlu cek dulu mana yang masih aktif"' },
      { value: 4, label: '"Sudah lengkap semua, mau lihat dokumennya sekarang?"' },
    ],
  },
  {
    id: 2,
    dimensionId: 'kredibilitas',
    isScored: true,
    text: 'Setelah kampanye selesai, apa yang biasanya organisasi kamu lakukan soal pelaporan?',
    options: [
      { value: 1, label: 'Fokus langsung ke program berikutnya, pelaporan formal belum jadi kebiasaan rutin' },
      { value: 2, label: 'Membuat ringkasan singkat untuk keperluan internal saja' },
      { value: 3, label: 'Membuat laporan yang cukup detail tapi hanya dikirim ke donatur yang aktif bertanya' },
      { value: 4, label: 'Mempublikasikan laporan penggunaan dana secara terbuka setelah setiap kampanye selesai' },
    ],
  },
  {
    id: 3,
    dimensionId: 'kredibilitas',
    isScored: true,
    text: 'Kalau ada calon mitra atau donatur institusi yang minta dokumentasi program kamu hari ini, apa yang terjadi?',
    options: [
      { value: 1, label: 'Butuh beberapa waktu untuk menyusunnya karena belum ada yang siap dalam format yang bisa langsung dikirim' },
      { value: 2, label: 'Ada beberapa dokumen tapi perlu dirakit dulu sebelum bisa dikirim' },
      { value: 3, label: 'Ada dokumentasi yang cukup rapi tapi data dampak konkretnya masih terbatas' },
      { value: 4, label: 'Bisa mengirimkan dokumen lengkap beserta data dampak terukur dalam waktu singkat' },
    ],
  },
  {
    id: 4,
    dimensionId: 'kredibilitas',
    isScored: true,
    text: 'Kalau seseorang ingin menghubungi "orang yang bertanggung jawab" di organisasi kamu, apa yang terjadi?',
    options: [
      { value: 1, label: 'Tidak ada satu orang spesifik yang bisa dihubungi, semua bersifat kolektif' },
      { value: 2, label: 'Ada tapi orang tersebut tidak mudah ditemukan di luar lingkaran internal' },
      { value: 3, label: 'Ada dan bisa ditemukan, tapi profilnya belum dikenal luas di luar komunitas sendiri' },
      { value: 4, label: 'Ada figur yang mudah ditemukan secara online dan rekam jejaknya mendukung kepercayaan' },
    ],
  },

  // ─── DIMENSI 2: TRACK RECORD KAMPANYE ───
  {
    id: 5,
    dimensionId: 'track_record',
    isScored: true,
    text: 'Kapan terakhir kali organisasi kamu menjalankan kampanye penggalangan dana?',
    options: [
      { value: 1, label: 'Belum pernah menjalankan kampanye sama sekali' },
      { value: 2, label: 'Lebih dari satu tahun yang lalu' },
      { value: 3, label: 'Antara 6 sampai 12 bulan yang lalu' },
      { value: 4, label: 'Dalam 3 bulan terakhir' },
    ],
  },
  {
    id: 6,
    dimensionId: 'track_record',
    isScored: true,
    text: 'Kampanye terbesar yang pernah kamu jalankan menghasilkan berapa total donasi?',
    options: [
      { value: 1, label: 'Belum pernah menjalankan kampanye' },
      { value: 2, label: 'Di bawah Rp10 juta' },
      { value: 3, label: 'Rp10 juta sampai Rp100 juta' },
      { value: 4, label: 'Di atas Rp100 juta' },
    ],
  },
  {
    id: 7,
    dimensionId: 'track_record',
    isScored: true,
    text: 'Dari kampanye terakhir yang kamu jalankan, kira-kira berapa persen donaturnya adalah orang yang belum pernah berdonasi ke organisasi kamu sebelumnya?',
    options: [
      { value: 1, label: 'Hampir semua adalah orang yang sudah kenal secara personal' },
      { value: 2, label: 'Sekitar 10–25% adalah donatur baru dari luar jaringan pribadi' },
      { value: 3, label: 'Sekitar 25–50% adalah donatur yang baru pertama kali berdonasi ke kami' },
      { value: 4, label: 'Lebih dari 50% adalah donatur baru yang datang dari channel digital atau rekomendasi' },
    ],
  },
  {
    id: 8,
    dimensionId: 'track_record',
    isScored: true,
    text: 'Setelah kampanye terakhir kamu selesai, apa yang terjadi dengan kontak donatur yang sudah berdonasi?',
    options: [
      { value: 1, label: 'Tidak ada yang dilakukan secara khusus dengan data kontak mereka' },
      { value: 2, label: 'Disimpan tapi belum pernah dihubungi lagi setelah kampanye selesai' },
      { value: 3, label: 'Beberapa dihubungi lagi tapi tidak semua dan tidak ada sistem yang konsisten' },
      { value: 4, label: 'Semua masuk ke database dan dihubungi kembali untuk update atau kampanye berikutnya' },
    ],
  },
  {
    id: 9,
    dimensionId: 'track_record',
    isScored: true,
    text: 'Bagaimana kamu tahu kampanye mana yang berhasil dan mana yang tidak?',
    options: [
      { value: 1, label: 'Dari total donasi yang masuk, tidak ada analisis lebih dalam dari itu' },
      { value: 2, label: 'Dari perasaan dan feedback yang masuk secara organik' },
      { value: 3, label: 'Membandingkan hasil antar kampanye tapi belum sampai ke level analisis per channel' },
      { value: 4, label: 'Dari data per channel yang dilacak secara aktif sejak awal kampanye berjalan' },
    ],
  },

  // ─── DIMENSI 3: NARASI KAMPANYE DAN KONTEN ───
  {
    id: 10,
    dimensionId: 'narasi',
    isScored: true,
    text: 'Bagaimana kamu biasanya memulai proses membuat kampanye?',
    options: [
      { value: 1, label: 'Langsung memikirkan konten atau visual yang ingin dibuat' },
      { value: 2, label: 'Menentukan target donasi yang ingin dicapai, lalu membuat konten' },
      { value: 3, label: 'Menentukan siapa yang ingin dijangkau dan pesan apa yang ingin disampaikan terlebih dahulu' },
      { value: 4, label: 'Melalui proses perencanaan: tujuan, profil donatur, respons yang diharapkan, baru pesan' },
    ],
  },
  {
    id: 11,
    dimensionId: 'narasi',
    isScored: true,
    text: 'Cerita seperti apa yang biasanya jadi inti dari kampanye kamu?',
    options: [
      { value: 1, label: 'Penjelasan tentang apa yang organisasi kami lakukan dan program yang sedang berjalan' },
      { value: 2, label: 'Masalah sosial yang ingin kami selesaikan, dilengkapi dengan data dan fakta' },
      { value: 3, label: 'Situasi nyata di lapangan, tapi cerita masih berpusat pada apa yang kami lakukan sebagai organisasi' },
      { value: 4, label: 'Satu orang atau satu momen spesifik yang membuat pembaca merasa terlibat langsung sebagai bagian dari solusi' },
    ],
  },
  {
    id: 12,
    dimensionId: 'narasi',
    isScored: true,
    text: 'Dalam 30 hari terakhir, berapa konten yang kamu posting untuk mendukung kampanye atau membangun kepercayaan audiens?',
    options: [
      { value: 1, label: 'Tidak ada atau hanya 1–2 konten' },
      { value: 2, label: '3–5 konten' },
      { value: 3, label: '6–10 konten' },
      { value: 4, label: 'Lebih dari 10 konten dengan variasi jenis yang berbeda' },
    ],
  },
  {
    id: 13,
    dimensionId: 'narasi',
    isScored: true,
    text: 'Dari konten kampanye yang pernah kamu buat, mana yang paling sering terjadi?',
    options: [
      { value: 1, label: 'Kami belum bisa memprediksi konten mana yang akan jalan dan mana yang tidak' },
      { value: 2, label: 'Ada interaksi tapi kami belum bisa menghubungkannya langsung ke donasi yang masuk' },
      { value: 3, label: 'Beberapa konten jelas-jelas menggerakkan donasi, tapi belum semua konten sekuat itu' },
      { value: 4, label: 'Kami sudah cukup bisa memprediksi jenis konten apa yang akan menghasilkan donasi' },
    ],
  },
  {
    id: 14,
    dimensionId: 'narasi',
    isScored: true,
    text: 'Ketika membuat pesan kampanye, dari mana kamu tahu cara berbicara kepada audiens kamu?',
    options: [
      { value: 1, label: 'Dari intuisi dan pengalaman tim, belum pernah melakukan riset khusus soal donatur' },
      { value: 2, label: 'Dari observasi umum tentang siapa yang biasanya peduli dengan isu yang kami angkat' },
      { value: 3, label: 'Dari data demografis donatur yang sudah ada seperti usia dan lokasi' },
      { value: 4, label: 'Dari profil donatur yang detail termasuk apa yang mereka pedulikan dan apa yang mendorong mereka berdonasi' },
    ],
  },

  // ─── DIMENSI 4: KAPABILITAS TIM ───
  {
    id: 15,
    dimensionId: 'tim',
    isScored: true,
    text: 'Berapa orang yang secara aktif terlibat dalam menjalankan kampanye penggalangan dana?',
    options: [
      { value: 1, label: 'Hanya saya sendiri' },
      { value: 2, label: '2–3 orang dengan peran yang belum terbagi jelas' },
      { value: 3, label: '2–4 orang dengan pembagian peran yang cukup jelas' },
      { value: 4, label: '4 orang atau lebih dengan struktur dan peran yang terdefinisi' },
    ],
  },
  {
    id: 16,
    dimensionId: 'tim',
    isScored: true,
    text: 'Siapa yang biasanya membuat konten untuk kampanye kamu dan bagaimana prosesnya?',
    options: [
      { value: 1, label: 'Tidak ada orang khusus, konten dibuat seadanya saat dibutuhkan' },
      { value: 2, label: 'Salah satu anggota tim mengerjakannya di sela-sela pekerjaan lain' },
      { value: 3, label: 'Ada yang fokus ke konten tapi kapasitasnya terbatas dan hasilnya tidak selalu konsisten' },
      { value: 4, label: 'Ada orang atau tim khusus yang menangani konten dengan standar dan jadwal yang jelas' },
    ],
  },
  {
    id: 17,
    dimensionId: 'tim',
    isScored: true,
    text: 'Setelah kampanye selesai, apa yang biasanya tim kamu lakukan dengan angka-angka hasilnya?',
    options: [
      { value: 1, label: 'Mencatat total yang masuk, lalu fokus ke hal berikutnya' },
      { value: 2, label: 'Membahasnya sekilas di internal tapi tidak sampai ke kesimpulan yang bisa dipakai' },
      { value: 3, label: 'Mengevaluasi apa yang berjalan dan tidak, tapi hasilnya belum selalu mempengaruhi kampanye berikutnya' },
      { value: 4, label: 'Menganalisis secara mendalam dan keputusan untuk kampanye berikutnya selalu berbasis dari temuan itu' },
    ],
  },
  {
    id: 18,
    dimensionId: 'tim',
    isScored: true,
    text: 'Bagaimana donatur biasanya mendapatkan update setelah mereka berdonasi?',
    options: [
      { value: 1, label: 'Tidak ada update yang dikirimkan secara sistematis' },
      { value: 2, label: 'Diinfokan kalau ada yang bertanya, tapi tidak proaktif menghubungi semua donatur' },
      { value: 3, label: 'Ada update yang dikirim tapi prosesnya masih manual dan tidak selalu konsisten' },
      { value: 4, label: 'Semua donatur otomatis mendapat update rutin tanpa perlu diproses satu per satu secara manual' },
    ],
  },

  // ─── DIMENSI 5: KESIAPAN DIGITAL DAN TEKNOLOGI ───
  {
    id: 19,
    dimensionId: 'digital',
    isScored: true,
    text: 'Kalau seseorang ingin berdonasi ke kampanye kamu sekarang, bagaimana prosesnya?',
    options: [
      { value: 1, label: 'Transfer ke rekening dengan konfirmasi manual lewat WhatsApp atau chat' },
      { value: 2, label: 'Ada link pembayaran tapi tidak ada halaman kampanye khusus' },
      { value: 3, label: 'Ada halaman donasi tapi tampilan dan brandingnya masih standar atau belum optimal' },
      { value: 4, label: 'Ada halaman kampanye yang terbranding lengkap dengan payment gateway dan konfirmasi otomatis' },
    ],
  },
  {
    id: 20,
    dimensionId: 'digital',
    isScored: true,
    text: 'Setelah kampanye berjalan beberapa hari, angka pertama apa yang kamu cek untuk tahu apakah kampanye berjalan baik?',
    options: [
      { value: 1, label: 'Total donasi yang sudah masuk' },
      { value: 2, label: 'Jumlah like, share, atau reach di media sosial' },
      { value: 3, label: 'Jumlah pengunjung halaman kampanye atau klik di link' },
      { value: 4, label: 'Konversi dari pengunjung ke donatur dan dari mana traffic terbesar datang' },
    ],
  },
  {
    id: 21,
    dimensionId: 'digital',
    isScored: true,
    text: 'Apakah iklan digital yang kamu jalankan saat ini terhubung ke data donasi yang masuk?',
    options: [
      { value: 1, label: 'Belum pernah menjalankan iklan digital sama sekali' },
      { value: 2, label: 'Pernah menjalankan iklan tapi tidak tahu apakah iklannya yang menghasilkan donasi' },
      { value: 3, label: 'Ada tracking tapi tidak sempurna, masih ada donasi yang tidak bisa dilacak sumbernya' },
      { value: 4, label: 'Setiap iklan terhubung langsung ke data donasi sehingga tahu persis hasilnya' },
    ],
  },
  {
    id: 22,
    dimensionId: 'digital',
    isScored: true,
    text: 'Kalau kamu perlu mengirim pesan ke semua orang yang pernah berdonasi tahun lalu, seberapa cepat itu bisa dilakukan?',
    options: [
      { value: 1, label: 'Tidak bisa, kontak mereka tidak tersimpan di satu tempat' },
      { value: 2, label: 'Bisa tapi butuh waktu lama untuk mengumpulkan kontaknya dari berbagai sumber dulu' },
      { value: 3, label: 'Bisa, kontaknya sudah tersimpan tapi prosesnya masih manual dan tidak bisa disegmentasi' },
      { value: 4, label: 'Bisa dilakukan dalam beberapa menit karena semua kontak tersimpan rapi di satu sistem' },
    ],
  },
  {
    id: 23,
    dimensionId: 'digital',
    isScored: true,
    text: 'Tools apa yang saat ini kamu gunakan untuk menjalankan kampanye dari awal sampai akhir?',
    options: [
      { value: 1, label: 'WhatsApp dan media sosial, tidak ada tools khusus lainnya' },
      { value: 2, label: 'Tambahan Google Form atau link donasi dari platform crowdfunding umum' },
      { value: 3, label: 'Beberapa tools berbeda untuk halaman donasi, pembayaran, dan komunikasi, tapi belum terintegrasi' },
      { value: 4, label: 'Platform terintegrasi yang mengelola halaman donasi, pembayaran, dan data donatur dalam satu tempat' },
    ],
  },

  // ─── DIMENSI 6: AKSES DAN JANGKAUAN DONATUR ───
  {
    id: 24,
    dimensionId: 'akses',
    isScored: true,
    text: 'Kalau kamu mulai kampanye hari ini tanpa iklan berbayar, berapa orang yang kira-kira bisa melihatnya dalam 48 jam pertama?',
    options: [
      { value: 1, label: 'Kurang dari 100 orang' },
      { value: 2, label: '100 sampai 1.000 orang' },
      { value: 3, label: '1.000 sampai 10.000 orang' },
      { value: 4, label: 'Lebih dari 10.000 orang' },
    ],
  },
  {
    id: 25,
    dimensionId: 'akses',
    isScored: true,
    text: 'Ketika kamu ingin mengumumkan kampanye baru, apa yang biasanya kamu lakukan pertama kali?',
    options: [
      { value: 1, label: 'Posting di media sosial dan menunggu respons' },
      { value: 2, label: 'Posting di media sosial dan menghubungi orang-orang terdekat secara personal' },
      { value: 3, label: 'Posting di media sosial, blast ke kontak yang ada, dan mengaktifkan beberapa channel sekaligus' },
      { value: 4, label: 'Menjalankan strategi multi-channel yang sudah disiapkan sebelum kampanye diluncurkan' },
    ],
  },
  {
    id: 26,
    dimensionId: 'akses',
    isScored: true,
    text: 'Apa yang terjadi terakhir kali kamu mencoba menjangkau audiens di luar jaringan pribadi kamu?',
    options: [
      { value: 1, label: 'Belum pernah mencoba secara terstruktur' },
      { value: 2, label: 'Pernah mencoba tapi hasilnya tidak signifikan dan belum tahu apa yang perlu diperbaiki' },
      { value: 3, label: 'Ada beberapa pendekatan yang cukup berhasil tapi belum bisa diulang secara konsisten' },
      { value: 4, label: 'Punya pendekatan yang sudah terbukti dan bisa diaktifkan kapan pun dibutuhkan' },
    ],
  },
  {
    id: 27,
    dimensionId: 'akses',
    isScored: true,
    text: 'Apa yang biasanya terjadi dalam satu bulan setelah sebuah kampanye kamu selesai?',
    options: [
      { value: 1, label: 'Tidak ada komunikasi khusus ke donatur, fokus sudah beralih ke hal berikutnya' },
      { value: 2, label: 'Mengirim ucapan terima kasih tapi tidak ada follow-up lebih lanjut setelah itu' },
      { value: 3, label: 'Mengirimkan laporan penggunaan dana tapi belum ada ajakan untuk terlibat lagi' },
      { value: 4, label: 'Mengirim laporan dampak dan secara aktif mengajak donatur untuk terlibat di kampanye berikutnya' },
    ],
  },

  // ─── BUDGET QUESTION (UNSCORED) ───
  {
    id: 28,
    dimensionId: 'budget',
    isScored: false,
    text: 'Berapa anggaran yang tersedia untuk kegiatan penggalangan dana per bulan?',
    options: [
      { value: 1, label: 'Belum ada anggaran khusus untuk fundraising' },
      { value: 2, label: 'Kurang dari Rp1 juta per bulan' },
      { value: 3, label: 'Rp1 juta sampai Rp5 juta per bulan' },
      { value: 4, label: 'Lebih dari Rp5 juta per bulan' },
    ],
  },
];

export const dimensions = [
  {
    id: 'kredibilitas' as const,
    label: 'Kredibilitas Organisasi',
    shortLabel: 'Kredibilitas',
    weight: 0.15,
    questionIds: [1, 2, 3, 4],
    dependencyOrder: 1,
  },
  {
    id: 'track_record' as const,
    label: 'Track Record Kampanye',
    shortLabel: 'Track Record',
    weight: 0.18,
    questionIds: [5, 6, 7, 8, 9],
    dependencyOrder: 2,
  },
  {
    id: 'narasi' as const,
    label: 'Narasi Kampanye & Konten',
    shortLabel: 'Narasi & Konten',
    weight: 0.17,
    questionIds: [10, 11, 12, 13, 14],
    dependencyOrder: 3,
  },
  {
    id: 'tim' as const,
    label: 'Kapabilitas Tim',
    shortLabel: 'Tim',
    weight: 0.15,
    questionIds: [15, 16, 17, 18],
    dependencyOrder: 4,
  },
  {
    id: 'digital' as const,
    label: 'Kesiapan Digital & Teknologi',
    shortLabel: 'Digital & Tech',
    weight: 0.15,
    questionIds: [19, 20, 21, 22, 23],
    dependencyOrder: 5,
  },
  {
    id: 'akses' as const,
    label: 'Akses & Jangkauan Donatur',
    shortLabel: 'Jangkauan',
    weight: 0.20,
    questionIds: [24, 25, 26, 27],
    dependencyOrder: 6,
  },
];

export const budgetLabels: Record<string, string> = {
  '1': 'Belum ada anggaran khusus',
  '2': 'Kurang dari Rp1 juta/bulan',
  '3': 'Rp1 juta – Rp5 juta/bulan',
  '4': 'Lebih dari Rp5 juta/bulan',
};
