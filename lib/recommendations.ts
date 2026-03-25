import {
  DimensionId,
  DimensionStatus,
  BudgetOption,
  ProfileTrack,
  AssessmentResult,
  RecommendationCard,
} from '@/types';

type BudgetGroup = 'none_low' | 'mid_high';

interface DimRecommendation {
  headline: string;
  insight: string;
  action: string;
  prerequisiteNote?: string;
  kbRecommendation: Record<BudgetGroup, string>;
}

type RecommendationMap = Record<
  DimensionId,
  Record<DimensionStatus, DimRecommendation>
>;

// ─── RECOMMENDATION COPY ─────────────────────────────────────────────────────

const recommendationMap: RecommendationMap = {
  kredibilitas: {
    kritis: {
      headline: 'Donatur belum punya alasan kuat untuk percaya',
      insight:
        'Tanpa kredibilitas yang jelas, setiap kampanye yang kamu jalankan dimulai dari posisi defisit kepercayaan. Donatur ragu bukan karena program kamu buruk, tapi karena mereka tidak bisa memverifikasi bahwa kamu nyata dan bisa dipercaya.',
      action:
        'Prioritas utama: selesaikan legalitas organisasi (Yayasan atau Perkumpulan), dokumentasikan setidaknya satu program yang sudah selesai dengan data penerima manfaat, dan terbitkan laporan penggunaan dana secara publik. Pastikan ada wajah nyata yang mewakili organisasi kamu secara online.',
      prerequisiteNote:
        'Ini adalah prasyarat. Tidak ada tools fundraising, termasuk KawanBantu, yang bisa menggantikan fondasi kredibilitas. Selesaikan ini terlebih dahulu.',
      kbRecommendation: {
        none_low:
          'Perbaikan ini membutuhkan waktu, bukan anggaran besar. Setelah selesai, mulai dengan paket Free KawanBantu untuk membangun kehadiran digital kamu.',
        mid_high:
          'BantuConsulting Fundraising (Rp4.9 juta — 5 pertemuan + strategy deck + 2 bulan execution support) bisa membantu kamu menyusun aset kredibilitas ini dalam format yang dioptimalkan untuk kepercayaan donatur.',
      },
    },
    berkembang: {
      headline: 'Kredibilitas ada, tapi belum cukup terlihat',
      insight:
        'Kamu punya beberapa penanda kredibilitas, tapi tidak konsisten atau tidak cukup mudah ditemukan. Donatur yang mau memverifikasi kamu mungkin menemukan celah.',
      action:
        'Standardisasi pelaporan akuntabilitas dan jadikan semua dokumentasi program bisa diakses publik. Pastikan status legalitas kamu terlihat jelas di semua halaman kampanye.',
      kbRecommendation: {
        none_low:
          'Fitur auto-email donatur dan analytics KawanBantu membangun rekam jejak transparansi secara otomatis setiap kampanye berjalan. Paket Free sudah cukup untuk memulai.',
        mid_high:
          'KawanBantu Starter (Rp299k/bulan) dengan custom domain memperkuat kesan profesional. BantuConsulting Platform Management (Rp299k/bulan) membantu menjaga konsistensi ini.',
      },
    },
    kuat: {
      headline: 'Kredibilitas kamu adalah aset terbesar yang sering diremehkan',
      insight:
        'Di antara 520.000+ NGO Indonesia, kredibilitas yang solid adalah pembeda yang sesungguhnya. Kebanyakan orang menyimpannya sebagai dokumen internal, bukan senjata pemasaran.',
      action:
        'Tampilkan bukti-bukti kredibilitas ini di setiap halaman kampanye. Biarkan legalitas, laporan dampak, dan rekam jejak program bekerja membangun kepercayaan sebelum donatur membaca cerita kamu.',
      kbRecommendation: {
        none_low:
          'Paket Pro KawanBantu memungkinkan kamu menampilkan branding yang profesional dan laporan kampanye otomatis yang memperkuat kepercayaan donatur.',
        mid_high:
          'Paket Pro atau Enterprise KawanBantu untuk fitur analytics dan branding lengkap. Kredibilitas kamu layak ditampilkan dengan infrastruktur yang sepadan.',
      },
    },
  },

  track_record: {
    kritis: {
      headline: 'Setiap kampanye dimulai dari nol karena tidak ada jejak yang bisa ditunjukkan',
      insight:
        'Donatur mempercayai apa yang bisa mereka verifikasi. Tanpa track record, kamu tidak punya bukti bahwa kamu bisa menerima dana dan menggunakannya dengan baik. Bukan soal niat, ini soal bukti.',
      action:
        'Jalankan satu kampanye kecil yang sangat spesifik. Dokumentasikan segalanya: berapa yang terkumpul, dari siapa, melalui channel apa, dalam berapa waktu. Data dari kampanye pertama itu adalah track record pertama kamu.',
      kbRecommendation: {
        none_low:
          'KawanBantu paket Free untuk meluncurkan kampanye pertama kamu. Dashboard analytics mencatat semua data otomatis sehingga track record kamu terbangun dari hari pertama.',
        mid_high:
          'BantuConsulting Fundraising (Rp4.9 juta — 5 pertemuan + strategy deck + 2 bulan execution support) untuk memastikan kampanye pertama kamu distrukturisasi dengan baik sehingga track record yang kamu bangun kuat sejak awal.',
      },
    },
    berkembang: {
      headline: 'Kamu sudah pernah berhasil, tapi belum tahu persis mengapa',
      insight:
        'Ada kampanye yang berjalan, ada hasil yang dicapai, tapi prosesnya belum cukup sistematis untuk diulang dan diperbaiki. Hasilnya bagus tapi tidak bisa diprediksi.',
      action:
        'Mulai perlakukan setiap kampanye sebagai eksperimen. Catat channel mana yang menghasilkan donatur terbanyak, pesan apa yang paling banyak direspons, dan data donatur mana yang bisa diaktivasi ulang.',
      kbRecommendation: {
        none_low:
          'Dashboard analytics dan fitur ekspor database donatur KawanBantu membuat setiap kampanye menghasilkan data yang bisa dipelajari. Paket Free sudah cukup.',
        mid_high:
          'KawanBantu Starter atau Pro dengan Meta Pixel untuk mulai melacak performa per channel secara detail. BantuConsulting Platform Management (Rp299k/bulan) membantu kamu membaca dan memanfaatkan data itu.',
      },
    },
    kuat: {
      headline: 'Track record kamu adalah bukti yang paling meyakinkan',
      insight:
        'Kamu sudah punya data nyata dan rekam jejak yang terbukti. Ini aset yang banyak NGO tidak punya dan tidak bisa dibuat-buat.',
      action:
        'Gunakan hasil kampanye sebelumnya secara agresif di kampanye berikutnya. Angka nyata dari kampanye yang sudah selesai jauh lebih meyakinkan dari janji program apapun.',
      kbRecommendation: {
        none_low:
          'KawanBantu Pro untuk fitur analytics lengkap dan Meta Pixel agar track record yang sudah terbukti bisa dimanfaatkan untuk optimasi kampanye berbayar.',
        mid_high:
          'KawanBantu Pro atau Enterprise dengan Meta Pixel dan Conversion API penuh. BantuAds untuk mengamplifikasi kampanye yang sudah terbukti konversinya.',
      },
    },
  },

  narasi: {
    kritis: {
      headline: 'Kampanye kamu menjelaskan program, bukan menggerakkan orang',
      insight:
        'Donatur tidak memberi karena programnya bagus. Mereka memberi karena merasa terlibat dalam sebuah cerita di mana mereka adalah pahlawan. Kalau kampanye kamu masih berbicara tentang apa yang organisasi kamu lakukan, kamu belum menjual donasi, kamu sedang presentasi.',
      action:
        'Pelajari dan terapkan framework GTOM: sebelum menulis satu kata pun, tentukan dulu Tujuan kampanye, profil Target donatur, Outcome yang kamu ingin mereka rasakan, baru tulis Pesan. Satu cerita tentang satu orang nyata lebih kuat dari seribu angka statistik.',
      kbRecommendation: {
        none_low:
          'BantuConsulting Content Consulting (Rp1.5 juta/bulan) untuk membantu kamu mengembangkan narasi yang tepat dan konten yang konsisten.',
        mid_high:
          'BantuConsulting Fundraising (Rp4.9 juta — 5 pertemuan + strategy deck + 2 bulan execution support) mencakup pengembangan strategi narasi lengkap sebagai bagian dari paket.',
      },
    },
    berkembang: {
      headline: 'Ceritanya ada, tapi belum konsisten menggerakkan donasi',
      insight:
        'Beberapa kampanye berhasil, beberapa tidak, dan perbedaannya belum jelas. Ini biasanya artinya narasi kamu kadang tepat sasaran, tapi prosesnya belum sistematis.',
      action:
        'Audit kampanye yang sudah berjalan. Kampanye yang berhasil, apa yang berbeda dari yang tidak? Biasanya jawabannya ada di kedekatan cerita dengan donatur, bukan di besarnya masalah yang diangkat. Terapkan GTOM secara konsisten di setiap kampanye.',
      kbRecommendation: {
        none_low:
          'BantuConsulting Content Consulting (Rp1.5 juta/bulan) untuk menyempurnakan narasi yang sudah ada.',
        mid_high:
          'BantuAds dengan pembuatan konten (Rp300 ribu/video, 3 variasi hook) untuk menguji angle narasi mana yang paling efektif di paid channel.',
      },
    },
    kuat: {
      headline: 'Storytelling kamu adalah keunggulan yang langka',
      insight:
        'Kemampuan bercerita yang kuat adalah hal yang paling susah diajarkan dan paling jarang ditemukan di antara NGO Indonesia. Kamu sudah punya ini.',
      action:
        'Konten terbaik kamu adalah materi iklan terbaik kamu. Jangan biarkan cerita yang sudah terbukti menggerakkan orang hanya hidup di feed organik.',
      kbRecommendation: {
        none_low:
          'BantuAds untuk mengamplifikasi konten terkuat kamu ke audiens yang lebih luas.',
        mid_high:
          'BantuAds dengan konten profesional (Rp300 ribu/video, 3 variasi hook) untuk membuat versi iklan dari cerita terbaik kamu dan menguji mana yang paling mengkonversi.',
      },
    },
  },

  tim: {
    kritis: {
      headline: 'Tim kamu tidak punya kapasitas untuk menjalankan kampanye secara konsisten',
      insight:
        'Fundraising yang konsisten butuh setidaknya tiga kemampuan: seseorang yang bisa bercerita, seseorang yang bisa mengelola operasional, dan seseorang yang bisa membaca data. Kalau satu orang harus mengerjakan semuanya, semuanya akan setengah-setengah.',
      action:
        'Petakan dulu apa yang tim kamu bisa dan tidak bisa lakukan. Identifikasi satu gap skill yang paling menghambat kampanye saat ini dan selesaikan itu dulu. Jangan coba perbaiki segalanya sekaligus.',
      kbRecommendation: {
        none_low:
          'BantuConsulting Platform Management (Rp299k/bulan) dan otomasi KawanBantu mengambil alih operasional seperti konfirmasi donatur, laporan, dan follow-up sehingga tim kecil kamu bisa fokus pada hal yang lebih penting.',
        mid_high:
          'BantuConsulting Fundraising (Rp4.9 juta — 5 pertemuan + strategy deck + 2 bulan execution support) menghadirkan lapisan keahlian eksternal selama 2 bulan untuk membangun kapasitas tim kamu sambil mengisi gap yang ada segera.',
      },
    },
    berkembang: {
      headline: 'Tim ada tapi ada satu titik lemah yang terus menghambat',
      insight:
        'Kamu punya orang, tapi ada satu area yang selalu jadi bottleneck, biasanya penulisan narasi atau analisis data kampanye. Selama gap ini ada, hasilnya akan terus tidak konsisten.',
      action:
        'Identifikasi satu gap skill yang paling menghambat saat ini dan tangani itu dulu. Jangan mencoba memperbaiki semua hal sekaligus.',
      kbRecommendation: {
        none_low:
          'BantuConsulting Platform Management (Rp299k/bulan) untuk mengurangi beban operasional dan memberi tim kamu ruang untuk fokus pada hal yang lebih bernilai.',
        mid_high:
          'BantuConsulting Content Consulting (Rp1.5 juta/bulan) kalau gap-nya di storytelling. Platform Management plus Fundraising Consulting kalau gap-nya di strategi dan operasional.',
      },
    },
    kuat: {
      headline: 'Tim kamu adalah mesin kampanye yang siap diakselerasi',
      insight:
        'Kemampuan tim yang solid adalah multiplier. Tools yang bagus di tangan tim yang kompeten menghasilkan hasil yang jauh lebih besar.',
      action:
        'Beri tim kamu data yang lebih baik dan tools yang lebih kuat. Mereka sudah siap, yang dibutuhkan sekarang adalah infrastruktur yang sebanding dengan kapabilitas mereka.',
      kbRecommendation: {
        none_low:
          'KawanBantu Pro untuk analytics lanjutan dan Meta Pixel agar tim kamu punya data lengkap untuk mengambil keputusan.',
        mid_high:
          'KawanBantu Pro atau Enterprise dengan full analytics dan Conversion API. BantuAds untuk mengamplifikasi apa yang sudah tim kamu bangun dengan baik.',
      },
    },
  },

  digital: {
    kritis: {
      headline: 'Kamu kehilangan donatur karena tidak ada infrastruktur untuk menangkap mereka',
      insight:
        'Setiap kampanye yang berjalan tanpa halaman donasi digital, tanpa database kontak, dan tanpa tracking adalah kampanye yang habis begitu selesai. Tidak ada yang tersisa untuk dimanfaatkan di kampanye berikutnya.',
      action:
        'Minimum yang kamu butuhkan sekarang: satu halaman donasi yang bisa diakses online, sistem untuk menyimpan kontak donatur, dan cara untuk melihat dari mana donasi datang. Itu sudah cukup untuk memulai.',
      kbRecommendation: {
        none_low:
          'KawanBantu paket Free. Halaman kampanye bisa aktif dalam 15 menit, payment gateway terintegrasi, dan data donatur langsung tersimpan otomatis. Tidak butuh keahlian teknis.',
        mid_high:
          'KawanBantu Starter (Rp299k/bulan) dengan custom domain dan branding untuk tampilan yang profesional sejak hari pertama. Tambahkan setup Meta Pixel untuk mulai membangun data audiens donatur kamu.',
      },
    },
    berkembang: {
      headline: 'Kamu sudah online tapi tools yang kamu pakai tidak saling terhubung',
      insight:
        'Halaman donasi di sini, kontak donatur di spreadsheet, update lewat WA manual. Semuanya berjalan tapi tidak ada yang terintegrasi. Setiap transisi antar tools adalah tempat di mana data hilang dan donatur terlewat.',
      action:
        'Konsolidasikan infrastruktur fundraising ke satu platform. Setiap kontak donatur yang hilang di antara tools yang tidak terhubung adalah peluang retensi yang terbuang.',
      kbRecommendation: {
        none_low:
          'KawanBantu Pro (Rp5 juta/bulan) untuk fitur lengkap: ekspor database donatur, analytics, anti-fraud, dan auto-email update donatur dalam satu platform terintegrasi.',
        mid_high:
          'KawanBantu Pro dengan Meta Conversion API untuk menghubungkan data donasi ke kampanye iklan. Semua data kamu bekerja bersama, bukan terpisah-pisah.',
      },
    },
    kuat: {
      headline: 'Infrastruktur digital kamu siap untuk diakselerasi dengan paid channel',
      insight:
        'Kamu punya fondasi yang kebanyakan NGO tidak punya: tracking yang berfungsi dan data yang terintegrasi. Ini artinya uang yang kamu keluarkan untuk iklan bisa bekerja jauh lebih efisien.',
      action:
        'Hubungkan infrastruktur digital yang sudah ada ke paid acquisition channel. Data yang kamu punya sekarang adalah bahan bakar untuk iklan yang efisien.',
      kbRecommendation: {
        none_low:
          'Meta Pixel dan Conversion API terintegrasi penuh dengan KawanBantu. BantuAds untuk mulai menjalankan kampanye berbayar dengan tracking konversi yang akurat.',
        mid_high:
          'BantuAds dengan budget yang memadai, Meta Pixel, dan Conversion API untuk ROAS yang teroptimasi. KawanBantu Pro atau Enterprise untuk analytics dan fitur lengkap.',
      },
    },
  },

  akses: {
    kritis: {
      headline: 'Setiap kampanye dimulai dari nol karena tidak ada audiens yang dimiliki',
      insight:
        'Tanpa channel yang dimiliki sendiri, kamu sepenuhnya bergantung pada algoritma atau iklan berbayar untuk menjangkau donatur. Kedua hal ini tidak bisa diandalkan sebagai satu-satunya sumber jangkauan.',
      action:
        'Tujuan pertama bukan mengumpulkan sebanyak mungkin donasi. Tujuan pertama adalah membangun daftar kontak yang bisa kamu hubungi kapan pun kamu mau. Mulai kumpulkan kontak dari setiap interaksi. Bangun komunitas WhatsApp. Post secara konsisten. Jaringan pribadi kamu adalah titik mulai yang sah.',
      kbRecommendation: {
        none_low:
          'Mulai organik dulu. Gunakan KawanBantu paket Free untuk menangkap dan menyimpan setiap kontak donatur yang datang. Database yang kamu bangun hari ini adalah aset jangkauan kamu di masa depan.',
        mid_high:
          'BantuAds dengan Meta Pixel untuk mulai membangun channel berbayar yang terukur. Konten (Rp300 ribu/video, 3 variasi hook) untuk membangun materi iklan yang kuat. KawanBantu Pro untuk mengelola dan mensegmentasi database donatur yang tumbuh.',
      },
    },
    berkembang: {
      headline: 'Jangkauan ada tapi terlalu bergantung pada satu atau dua channel',
      insight:
        'Kamu bisa menjangkau orang, tapi kalau satu channel mati atau satu KOL tidak aktif, kampanye kamu langsung melemah. Single point of failure di jangkauan adalah risiko besar.',
      action:
        'Diversifikasi channel jangkauan. Bangun email list. Hangatkan kembali kontak lama dengan laporan dampak sebelum meminta donasi lagi. Jangan biarkan satu channel menjadi satu-satunya andalanmu.',
      kbRecommendation: {
        none_low:
          'Ekspor database donatur KawanBantu untuk mensegmentasi kontak yang sudah ada. BantuAds untuk memperluas jangkauan melewati jaringan yang sudah ada.',
        mid_high:
          'BantuAds dengan Meta Pixel untuk ekspansi jangkauan yang terukur. KawanBantu Pro dengan analytics lengkap untuk melacak performa per channel dan mengoptimalkan alokasi.',
      },
    },
    kuat: {
      headline: 'Jangkauan kamu adalah fondasi yang siap untuk diskalakan',
      insight:
        'Kamu bisa menjangkau donatur secara andal dan punya channel yang tidak bergantung hanya pada satu sumber. Ini adalah posisi yang ideal untuk akselerasi.',
      action:
        'Saatnya memperbesar skala. Jangkauan yang sudah terbukti efektif secara organik akan jauh lebih efisien ketika diperkuat dengan paid channel yang tepat.',
      kbRecommendation: {
        none_low:
          'BantuAds untuk mengamplifikasi channel yang sudah terbukti. Meta Pixel dan Conversion API untuk ROAS yang teroptimasi.',
        mid_high:
          'BantuAds dengan anggaran yang lebih besar, Meta Pixel, dan Conversion API penuh. KawanBantu Pro atau Enterprise untuk analytics mendalam dan manajemen donatur yang skalabel.',
      },
    },
  },
};

// ─── PRIORITY SUMMARY GENERATOR ──────────────────────────────────────────────

export function generatePrioritySummary(result: AssessmentResult): string {
  const { profileTrack, rootBottleneck, secondaryBottleneck, leveragePoint, dimensions } =
    result;

  const dimLabel = (id: DimensionId | null): string => {
    if (!id) return '';
    const dim = dimensions.find((d) => d.id === id);
    return dim?.label ?? id;
  };

  if (profileTrack === 'fix') {
    const criticalCount = result.criticalDimensions.length;
    const rootLabel = dimLabel(rootBottleneck);
    const secondaryLabel = secondaryBottleneck
      ? dimLabel(secondaryBottleneck)
      : null;
    const leverageLabel = leveragePoint ? dimLabel(leveragePoint) : null;

    let summary = `Ada ${criticalCount} area yang perlu diperbaiki sebelum fundraising kamu bisa berkembang secara konsisten. Mulai dari ${rootLabel} terlebih dahulu karena ini yang paling mendasar, semua area lain bergantung pada ini.`;

    if (secondaryLabel) {
      summary += ` Setelah itu, fokus ke ${secondaryLabel}.`;
    }

    if (leverageLabel) {
      summary += ` Kabar baiknya, ${leverageLabel} adalah kekuatan terbesar kamu saat ini. Gunakan ini sebagai titik tolak saat kamu mulai memperbaiki area lainnya.`;
    }

    return summary;
  }

  if (profileTrack === 'optimize') {
    const weakest = [...dimensions].sort((a, b) => a.score - b.score)[0];
    const leverageLabel = leveragePoint ? dimLabel(leveragePoint) : null;

    let summary = `Fondasi fundraising kamu sudah cukup kuat. Sekarang saatnya fokus pada optimasi. Area yang paling perlu perhatian adalah ${weakest.label}.`;

    if (leverageLabel) {
      summary += ` Kekuatan terbesarmu ada di ${leverageLabel}, dan itu bisa jadi titik tolak untuk mempercepat area yang masih berkembang.`;
    }

    return summary;
  }

  return 'Kamu sudah melewati tahap membangun. Prioritasmu sekarang adalah memperbesar skala dan mengoptimalkan efisiensi. KawanBantu bisa membantu kamu di level ini dengan tools dan layanan yang tepat.';
}

// ─── CARD GENERATOR ──────────────────────────────────────────────────────────

export function generateRecommendationCards(
  result: AssessmentResult
): RecommendationCard[] {
  const budgetGroup: BudgetGroup =
    result.budgetTier === 'mid' || result.budgetTier === 'high'
      ? 'mid_high'
      : 'none_low';

  // Sort: Kritis first (by dependency order), then Berkembang, then Kuat
  const dependencyOrder: DimensionId[] = [
    'kredibilitas',
    'track_record',
    'narasi',
    'tim',
    'digital',
    'akses',
  ];

  const sorted = [...result.dimensions].sort((a, b) => {
    const statusPriority = { kritis: 0, berkembang: 1, kuat: 2 };
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[a.status] - statusPriority[b.status];
    }
    return dependencyOrder.indexOf(a.id) - dependencyOrder.indexOf(b.id);
  });

  return sorted.map((dim) => {
    const rec = recommendationMap[dim.id][dim.status];
    return {
      dimensionId: dim.id,
      label: dim.label,
      score: dim.score,
      status: dim.status,
      headline: rec.headline,
      insight: rec.insight,
      action: rec.action,
      prerequisiteNote: rec.prerequisiteNote,
      kbRecommendation: rec.kbRecommendation[budgetGroup],
    };
  });
}

// ─── PRODUCT STACK GENERATOR ─────────────────────────────────────────────────

export interface ProductItem {
  name: string;
  price: string;
  reason: string;
  category: 'platform' | 'ads' | 'consulting';
  priority: 'utama' | 'disarankan';
}

export function generateProductStack(result: AssessmentResult): ProductItem[] {
  const products: ProductItem[] = [];
  const { dimensions, budgetTier, overallTier, profileTrack } = result;

  const dim = (id: DimensionId) => dimensions.find((d) => d.id === id)!;
  const isKritis = (id: DimensionId) => dim(id).status === 'kritis';
  const isBerkembang = (id: DimensionId) => dim(id).status === 'berkembang';
  const isKuat = (id: DimensionId) => dim(id).status === 'kuat';
  const highBudget = budgetTier === 'mid' || budgetTier === 'high';
  const hasNoBudget = budgetTier === 'none';

  // ── PLATFORM TIER ─────────────────────────────────────────────────────────
  if (overallTier === 'pemula' || (isKritis('digital') && hasNoBudget)) {
    products.push({ name: 'KawanBantu Free', price: 'Gratis', reason: 'Mulai membangun infrastruktur digital fundraising kamu tanpa biaya', category: 'platform', priority: 'utama' });
  } else if (isKritis('digital') || isBerkembang('digital') || overallTier === 'berkembang') {
    products.push({ name: 'KawanBantu Starter', price: 'Rp299k/bulan', reason: 'Custom domain, branding, dan fitur dasar untuk fundraising yang lebih profesional', category: 'platform', priority: 'utama' });
  } else if (overallTier === 'siap' || isKuat('digital')) {
    products.push({ name: 'KawanBantu Pro', price: 'Rp5 juta/bulan', reason: 'Analytics lengkap, ekspor donor database, anti-fraud, dan fitur penuh untuk skala lebih besar', category: 'platform', priority: 'utama' });
  } else {
    products.push({ name: 'KawanBantu Enterprise', price: 'Rp10.9 juta/bulan', reason: 'Fitur enterprise penuh untuk organisasi yang sudah siap scaling besar', category: 'platform', priority: 'utama' });
  }

  // ── META PIXEL ────────────────────────────────────────────────────────────
  if (!isKritis('digital') && !isKritis('kredibilitas')) {
    products.push({ name: 'Meta Pixel & Conversion API', price: 'Inklusif di platform', reason: 'Tanpa ini, Meta mengoptimalkan iklan untuk klik, bukan donasi. Wajib sebelum BantuAds.', category: 'platform', priority: isKuat('digital') ? 'utama' : 'disarankan' });
  }

  // ── BANTUADS ──────────────────────────────────────────────────────────────
  if (highBudget && !isKritis('kredibilitas') && !isKritis('narasi') && !isKritis('digital')) {
    products.push({ name: 'BantuAds', price: 'Budget upfront atau potong hasil kampanye', reason: 'Jangkau donatur baru di luar jaringan pribadi kamu dengan iklan Meta yang dikelola tim kami', category: 'ads', priority: isKritis('akses') ? 'utama' : 'disarankan' });
    if (!isKritis('narasi')) {
      products.push({ name: 'Pembuatan Konten Iklan', price: 'Rp300k/video (3 variasi hook)', reason: 'Konten iklan yang kuat adalah penentu utama ROAS. Versi ad-ready dari cerita terbaik kamu.', category: 'ads', priority: 'disarankan' });
    }
  } else if (!highBudget && isKuat('narasi') && !isKritis('digital')) {
    products.push({ name: 'BantuAds', price: 'Budget upfront atau potong hasil kampanye', reason: 'Ketika anggaran tersedia, narasi kamu yang kuat siap diamplifikasi dengan iklan berbayar', category: 'ads', priority: 'disarankan' });
  }

  // ── CONSULTING ────────────────────────────────────────────────────────────
  if (isKritis('tim') || (isBerkembang('tim') && !highBudget)) {
    products.push({ name: 'BantuConsulting: Platform Management', price: 'Rp299k/bulan', reason: 'Operasional platform kamu kami kelola agar tim kecil bisa fokus pada hal yang lebih penting', category: 'consulting', priority: isKritis('tim') ? 'utama' : 'disarankan' });
  }
  if (isKritis('narasi') && !highBudget) {
    products.push({ name: 'BantuConsulting: Content Consulting', price: 'Rp1.5 juta/bulan', reason: 'Bantu kamu membangun narasi kampanye yang menggerakkan donatur, bukan sekadar menjelaskan program', category: 'consulting', priority: 'utama' });
  } else if (isBerkembang('narasi')) {
    products.push({ name: 'BantuConsulting: Content Consulting', price: 'Rp1.5 juta/bulan', reason: 'Sempurnakan narasi kampanye kamu agar lebih konsisten menghasilkan donasi', category: 'consulting', priority: 'disarankan' });
  }
  if (highBudget && (isKritis('kredibilitas') || isKritis('narasi') || isKritis('tim') || profileTrack === 'fix')) {
    products.push({ name: 'BantuConsulting: Fundraising Consulting', price: 'Rp4.9 juta (5 sesi + strategy deck + 2 bulan execution support)', reason: 'Bangun strategi fundraising yang solid dari fondasi sampai eksekusi bersama tim kami', category: 'consulting', priority: 'utama' });
  } else if (highBudget && profileTrack === 'optimize') {
    products.push({ name: 'BantuConsulting: Fundraising Consulting', price: 'Rp4.9 juta (5 sesi + strategy deck + 2 bulan execution support)', reason: 'Akselerasi optimasi fundraising kamu dengan panduan strategis dari tim kami', category: 'consulting', priority: 'disarankan' });
  }

  // Deduplicate
  const seen = new Set<string>();
  return products.filter((p) => { if (seen.has(p.name)) return false; seen.add(p.name); return true; });
}
