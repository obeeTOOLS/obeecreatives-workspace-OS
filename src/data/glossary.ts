export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'ui_ux' | 'device_pwa' | 'operations' | 'finance_legal' | 'architecture_gas';
  categoryLabel: string;
  definition: string;
  implementationRule: string;
  exampleSnippet?: string;
  tags: string[];
}

export const GLOSSARY_CATEGORIES = [
  { id: 'all', label: 'Semua Istilah' },
  { id: 'ui_ux', label: '1. Desain & Antarmuka (UI/UX)' },
  { id: 'device_pwa', label: '2. Mobile, PWA & Layar' },
  { id: 'operations', label: '3. Operasional & Konten' },
  { id: 'finance_legal', label: '4. Finansial & Legalitas' },
  { id: 'architecture_gas', label: '5. Arsitektur Data & GAS' },
] as const;

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // 1. Desain & Antarmuka (UI/UX)
  {
    id: 'term-dual-nav',
    term: 'Dual Navigation (Rail Mode & Expanded Mode)',
    category: 'ui_ux',
    categoryLabel: 'Desain & Antarmuka (UI/UX)',
    definition: 'Sistem bilah navigasi samping dua mode: mode ciut (Rail 80px) dengan ikon dan tooltip melayang saat kursor didekatkan, serta mode perlebar (Expanded 256px) dengan teks modul lengkap.',
    implementationRule: 'Wajib digunakan sebagai shell layout utama desktop. Pengguna dapat beralih mode kapan saja dengan tombol chevron tanpa mengganggu status halaman aktif.',
    exampleSnippet: 'className={isCollapsed ? "w-20" : "w-64"}',
    tags: ['Sidebar', 'Layout', 'Navigasi', 'Desktop']
  },
  {
    id: 'term-left-stripe',
    term: 'Left Red Stripe Accent',
    category: 'ui_ux',
    categoryLabel: 'Desain & Antarmuka (UI/UX)',
    definition: 'Garis aksen vertikal berwarna merah signature di tepi paling kiri kartu, entri data, atau baris list dokumen untuk memberikan identitas visual tegas khas Obeecreatives.',
    implementationRule: 'Setiap kartu item, quick access, riwayat presensi, atau entri database surat wajib memiliki kelas pembatas kiri merah berketebalan 4px.',
    exampleSnippet: 'border-l-4 border-l-red-600',
    tags: ['Border', 'Aksen', 'Identitas Visual', 'Card']
  },
  {
    id: 'term-logo-lockup',
    term: 'Logo Wordmark Lockup',
    category: 'ui_ux',
    categoryLabel: 'Desain & Antarmuka (UI/UX)',
    definition: 'Format baku penulisan nama agensi: kata "obee" menggunakan font bold putih (atau hitam pada kanvas terang) dan langsung disambung dengan "creatives" berwarna merah menyala #DC2626.',
    implementationRule: 'Dilarang mengubah komposisi warna kedua kata ini menjadi monokrom total atau memisahkannya tanpa format resmi.',
    exampleSnippet: '<span className="text-white">obee</span><span className="text-red-600">creatives</span>',
    tags: ['Branding', 'Typography', 'Logo']
  },
  {
    id: 'term-design-tokens',
    term: 'Design Tokens (Color System)',
    category: 'ui_ux',
    categoryLabel: 'Desain & Antarmuka (UI/UX)',
    definition: 'Kumpulan variabel warna resmi agensi: Studio Obsidian (#090D16 - Base canvas), Structural Slate (#0F172A - Card/Sidebar), Obee Signature Red (#DC2626 - Primary CTA), Vibrant Red (#EF4444 - Hover/Highlight), dan Mint Green (#10B981 - Success badge).',
    implementationRule: 'Seluruh komponen turunan web apps dilarang memakai warna acak di luar palet token ini agar kesatuan visual terjaga 100%.',
    exampleSnippet: 'bg-slate-950, bg-slate-900, bg-red-600, text-emerald-400',
    tags: ['Palet', 'Token', 'Warna', 'Tailwind']
  },
  {
    id: 'term-command-palette',
    term: 'Command Palette (⌘K / Ctrl+K)',
    category: 'ui_ux',
    categoryLabel: 'Desain & Antarmuka (UI/UX)',
    definition: 'Modal pencarian instan global yang muncul saat pengguna menekan tombol ⌘K (Mac) atau Ctrl+K (Windows/Linux) untuk melompat cepat ke modul atau mencari klien dan project.',
    implementationRule: 'Wajib dipasang pada root layout aplikasi dan dapat diakses dari tombol search di header maupun keyboard shortcut.',
    exampleSnippet: 'useKeyboardShortcut(["metaKey", "k"], openPalette)',
    tags: ['Search', 'Shortcut', 'Quick Jump']
  },
  {
    id: 'term-tabular-nums',
    term: 'Tabular Monospace (tabular-nums)',
    category: 'ui_ux',
    categoryLabel: 'Desain & Antarmuka (UI/UX)',
    definition: 'Format tipografi angka dengan lebar karakter proporsional seragam (monospace) agar nominal mata uang, tanggal, dan persentase sejajar rapi secara vertikal.',
    implementationRule: 'Seluruh tampilan angka keuangan (Rp), koordinat GPS, dan rasio engagement wajib memakai kelas ini.',
    exampleSnippet: 'font-mono tabular-nums text-slate-100',
    tags: ['Typography', 'Finance', 'Angka']
  },

  // 2. Mobile, PWA & Layar
  {
    id: 'term-bottom-thumb-nav',
    term: 'Bottom Thumb Navigation Bar',
    category: 'device_pwa',
    categoryLabel: 'Mobile, PWA & Layar',
    definition: 'Bilah navigasi bawah khusus layar smartphone yang ditempatkan di zona jangkauan jempol satu tangan untuk membuka menu-menu terpenting.',
    implementationRule: 'Otomatis tampil pada viewport < 768px (md:hidden) dengan safe-area inset untuk ponsel berponi/gesture bar.',
    exampleSnippet: 'fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 safe-area-bottom',
    tags: ['Mobile', 'Jempol', 'Touch', 'Navigasi']
  },
  {
    id: 'term-slideover-drawer',
    term: 'Slide-Over Drawer',
    category: 'device_pwa',
    categoryLabel: 'Mobile, PWA & Layar',
    definition: 'Panel menu samping bergerak yang keluar dari sisi kiri layar saat tombol hamburger ditekan di smartphone, dilengkapi latar belakang redup (backdrop blur).',
    implementationRule: 'Menggantikan sidebar desktop pada layar ponsel agar area kerja tidak terjepit.',
    exampleSnippet: 'isMobileOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full"',
    tags: ['Drawer', 'Mobile', 'Overlay']
  },
  {
    id: 'term-pwa-standalone',
    term: 'Progressive Web App (PWA) & Standalone Mode',
    category: 'device_pwa',
    categoryLabel: 'Mobile, PWA & Layar',
    definition: 'Teknologi yang memungkinkan aplikasi web dipasang langsung ke layar beranda HP (Android & iOS) atau desktop (Windows & Mac) tanpa perantara toko aplikasi.',
    implementationRule: 'Wajib memiliki Web App Manifest lengkap, ikon 192px dan 512px maskable, serta display: "standalone" untuk menyembunyikan bilah URL browser.',
    exampleSnippet: 'manifest: { display: "standalone", theme_color: "#090D16" }',
    tags: ['PWA', 'Install', 'Homescreen', 'Standalone']
  },
  {
    id: 'term-fullscreen-mode',
    term: 'HTML5 Fullscreen API Mode',
    category: 'device_pwa',
    categoryLabel: 'Mobile, PWA & Layar',
    definition: 'Kemampuan aplikasi untuk memperluas tampilannya hingga memenuhi 100% monitor atau layar HP tanpa gangguan bilah peramban peramban.',
    implementationRule: 'Disediakan tombol Maximize di header dengan fallback tombol pintas F11 untuk kebutuhan pitch proposal, review video, dan monitoring.',
    exampleSnippet: 'document.documentElement.requestFullscreen()',
    tags: ['Fullscreen', 'Monitor', 'Presentasi']
  },
  {
    id: 'term-offline-indicator',
    term: 'Offline Mode Indicator & Local Cache',
    category: 'device_pwa',
    categoryLabel: 'Mobile, PWA & Layar',
    definition: 'Sistem deteksi koneksi yang memunculkan peringatan halus jika internet terputus dan beralih ke cache data tersimpan lokal tanpa memunculkan layar error.',
    implementationRule: 'Memantau event "online" dan "offline" browser dan mengamankan status input pengguna.',
    exampleSnippet: 'window.addEventListener("offline", handleOffline)',
    tags: ['Offline', 'PWA', 'Service Worker', 'Cache']
  },
  {
    id: 'term-dual-theme',
    term: 'Dual Theme Engine (Dark & Light Mode Switcher)',
    category: 'device_pwa',
    categoryLabel: 'Mobile, PWA & Layar',
    definition: 'Sistem pergantian tema tampilan dinamis antara Mode Gelap (Studio Obsidian #090D16 & Structural Slate #0F172A) untuk kenyamanan mata di malam hari, dan Mode Terang (Crisp Paper White #F8FAFC) untuk visibilitas tinggi di siang hari atau saat presentasi luar ruangan, dengan tetap mempertahankan aksen merah khas Obeecreatives (#DC2626).',
    implementationRule: 'Disimpan di localStorage ("obee_theme"), terintegrasi dengan tombol ikon Sun/Moon di header & drawer, dan menyinkronkan status bar PWA (<meta name="theme-color">).',
    exampleSnippet: 'const { theme, toggleTheme } = useTheme();',
    tags: ['Theme', 'Dark Mode', 'Light Mode', 'UI']
  },

  // 3. Operasional & Konten
  {
    id: 'term-project-kanban',
    term: 'Project Control Kanban Pipeline',
    category: 'operations',
    categoryLabel: 'Operasional & Konten',
    definition: 'Papan visual alur produksi konten kreatif bertahap: Ideation ➔ Scripting ➔ Shooting ➔ Editing ➔ Client Review ➔ Scheduled ➔ Published.',
    implementationRule: 'Setiap kartu project menyimpan data format konten (Reels, TikTok, Carousel), kreator penanggung jawab, tanggal tayang, dan link materi.',
    tags: ['Kanban', 'Produksi', 'Konten', 'Pipeline']
  },
  {
    id: 'term-hook-verification',
    term: 'Hook 3-Second Rule Verification',
    category: 'operations',
    categoryLabel: 'Operasional & Konten',
    definition: 'Standar evaluasi kurasi video: memastikan apakah 3 detik pertama video memiliki visual hook, text hook, atau audio hook yang memikat sebelum diserahkan ke klien.',
    implementationRule: 'Wajib diverifikasi oleh Creative Director / Editor sebelum konten berpindah ke tahap "Scheduled".',
    tags: ['Hook', 'Video', 'Kurasi', 'Quality Control']
  },
  {
    id: 'term-creator-ratecard',
    term: 'Creator Rate Card Matrix',
    category: 'operations',
    categoryLabel: 'Operasional & Konten',
    definition: 'Daftar tarif resmi imbalan jasa kreator per satuan konten yang terstandarisasi berdasarkan tipe (misal: Reels Rp 350.000, Feed Carousel Rp 250.000, dsb).',
    implementationRule: 'Menjadi acuan tunggal penghitungan fee kreator otomatis pada modul payroll dan mutasi kas keluar.',
    tags: ['Rate Card', 'Honor', 'Kreator', 'Biaya']
  },
  {
    id: 'term-payroll-export',
    term: 'Fee Payout & Monthly Payroll Export',
    category: 'operations',
    categoryLabel: 'Operasional & Konten',
    definition: 'Fitur penghitungan otomatis akumulasi honor seluruh kreator dalam satu bulan berdasarkan jumlah konten yang sudah disetujui dan berstatus tayang.',
    implementationRule: 'Dapat diekspor ke tabel Excel / Google Sheets untuk pencairan oleh divisi keuangan.',
    tags: ['Payroll', 'Gaji', 'Fee', 'Keuangan']
  },
  {
    id: 'term-crm-source-of-truth',
    term: 'CRM Clients Source of Truth',
    category: 'operations',
    categoryLabel: 'Operasional & Konten',
    definition: 'Basis data rujukan tunggal daftar klien resmi agensi yang disinkronkan dari Spreadsheet CRM.',
    implementationRule: 'Hanya menampilkan klien dengan divisi "Social Media Management" dan memprioritaskan nama perusahaan dibanding nama personal kontak.',
    tags: ['CRM', 'Klien', 'Retainer', 'Database']
  },
  {
    id: 'term-company-priority',
    term: 'Company Priority Fallback',
    category: 'operations',
    categoryLabel: 'Operasional & Konten',
    definition: 'Logika penampilan nama klien: jika kolom nama perusahaan ("company") terisi maka tampilkan nama perusahaan; jika kosong, fallback ke nama personal kontak ("name").',
    implementationRule: 'client.company ? client.company : client.name',
    tags: ['Algoritma', 'Client', 'Fallback']
  },
  {
    id: 'term-gps-geofencing',
    term: 'Presensi Geofencing GPS (Office Radius)',
    category: 'operations',
    categoryLabel: 'Operasional & Konten',
    definition: 'Sistem absensi berbasis koordinat satelit yang menghitung jarak fisik staf dari titik kantor (HQ Senopati: -6.2301, 106.8122) dengan radius toleransi 150 meter.',
    implementationRule: 'Hanya staf yang berada di dalam radius yang mendapat badge status "Di Kantor (WFO)". Mode "Shoot On-Location" dapat digunakan dengan menyertakan catatan nama klien.',
    tags: ['GPS', 'Geofence', 'Presensi', 'HR']
  },
  {
    id: 'term-multimode-presensi',
    term: 'Multi-Mode Presensi (WFO / WFH / Shoot)',
    category: 'operations',
    categoryLabel: 'Operasional & Konten',
    definition: 'Pilihan status kerja kehadiran staf kreatif: WFO (Work from Office), WFH (Work from Home), atau Shoot (Syuting di lokasi luar kantor/studio klien).',
    implementationRule: 'Menyertakan stempel waktu real-time dan foto selfie kamera sebagai bukti kehadiran valid.',
    tags: ['Presensi', 'Shift', 'Work Mode']
  },

  // 4. Finansial & Legalitas
  {
    id: 'term-official-numbering',
    term: 'Official Letter Numbering Syntax',
    category: 'finance_legal',
    categoryLabel: 'Finansial & Legalitas',
    definition: 'Standar penomoran surat resmi otomatis agensi: [Nomor Urut 3 Digit]/OC-[KODE_SURAT]/[BULAN_ROMAWI]/[TAHUN], contoh: 042/OC-MOU/IX/2026.',
    implementationRule: 'Nomor di-generate otomatis secara berurutan dan diarsipkan ke Database Surat untuk mencegah duplikasi nomor.',
    tags: ['Surat', 'Penomoran', 'Legal', 'MoU']
  },
  {
    id: 'term-cashflow-ledger',
    term: 'Cash Flow Ledger & Net Agency Profit',
    category: 'finance_legal',
    categoryLabel: 'Finansial & Legalitas',
    definition: 'Pencatatan mutasi kas masuk (pembayaran retainer/invoice) dan kas keluar (fee kreator, sewa studio, operasional) dengan kalkulasi otomatis margin laba bersih.',
    implementationRule: 'Khusus diakses oleh role Super Admin & Project Manager (Admin Only).',
    tags: ['Cash Flow', 'Kas', 'Margin', 'Laba']
  },
  {
    id: 'term-invoice-generator',
    term: 'Official Invoice Generator (PPN 11%)',
    category: 'finance_legal',
    categoryLabel: 'Finansial & Legalitas',
    definition: 'Modul pembuatan tagihan resmi agensi yang menghitung subtotal deliverable, tarif PPN 11%, terms of payment (Net 14/30), dan rekening resmi agensi.',
    implementationRule: 'Menghasilkan dokumen siap cetak atau ekspor PDF dengan nomor faktur dan tanda tangan digital.',
    tags: ['Invoice', 'Faktur', 'Pajak', 'PPN']
  },
  {
    id: 'term-equipment-tracker',
    term: 'Equipment Inventory & Loan Tracker',
    category: 'finance_legal',
    categoryLabel: 'Finansial & Legalitas',
    definition: 'Sistem pencatatan alat studio (kamera Sony FX3, lensa G-Master, lampu Aputure, mic nirkabel) lengkap dengan nomor seri, status ketersediaan, dan log peminjam.',
    implementationRule: 'Peminjaman wajib mencatat nama penanggung jawab dan project target; pengembalian wajib melalui verifikasi inspeksi fisik.',
    tags: ['Alat', 'Kamera', 'Inventory', 'Studio']
  },
  {
    id: 'term-packaging-dieline',
    term: 'Packaging Die-Line Spec 3D',
    category: 'finance_legal',
    categoryLabel: 'Finansial & Legalitas',
    definition: 'Template spesifikasi teknis kemasan (Panjang × Lebar × Tinggi mm) dengan simulasi isometrik 3D interaktif pada canvas dan kalkulasi volume ruang.',
    implementationRule: 'Digunakan oleh desainer kemasan sebelum mengirimkan file cetak jaring-jaring pisau die-line ke percetakan.',
    tags: ['Packaging', '3D', 'Kemasan', 'Die-line']
  },
  {
    id: 'term-er-benchmark',
    term: 'Social Media ER% (Engagement Rate) Calculator',
    category: 'finance_legal',
    categoryLabel: 'Finansial & Legalitas',
    definition: 'Formulir audit performa akun Instagram atau TikTok calon klien dengan kalkulasi instan rasio keterlibatan: (Likes + Comments + Shares) / Followers × 100%.',
    implementationRule: 'Membandingkan hasil audit dengan benchmark industri agensi (kategori: Rendah, Sehat, Sangat Tinggi) untuk bahan presentasi pitching.',
    tags: ['Audit', 'Engagement', 'ER', 'Instagram']
  },

  // 5. Arsitektur Data, GAS & Keamanan
  {
    id: 'term-rbac',
    term: 'RBAC (Role-Based Access Control)',
    category: 'architecture_gas',
    categoryLabel: 'Arsitektur Data & Keamanan',
    definition: 'Sistem penguncian hak akses aplikasi berdasarkan peran pengguna: Super Admin, Creator/Staff, Client Brand, dan Public Applicant.',
    implementationRule: 'Modul keuangan, surat resmi, peralatan, dan seleksi kandidat terkunci otomatis dari role Creator dan Client.',
    tags: ['RBAC', 'Keamanan', 'Hak Akses', 'Role']
  },
  {
    id: 'term-client-portal',
    term: 'Client Approval Portal (Brand Space)',
    category: 'architecture_gas',
    categoryLabel: 'Arsitektur Data & Keamanan',
    definition: 'Halaman privat khusus perwakilan brand klien untuk meninjau materi konten yang telah dijadwalkan, memberi persetujuan (Approve), atau menulis catatan revisi.',
    implementationRule: 'Bersifat read-only untuk data internal agensi; klien hanya dapat melihat konten yang diasosiasikan dengan brand mereka.',
    tags: ['Portal Klien', 'Approval', 'Revisi', 'Brand']
  },
  {
    id: 'term-single-router-gas',
    term: 'Single Router GAS V2 (Action Dispatcher)',
    category: 'architecture_gas',
    categoryLabel: 'Arsitektur Data & Keamanan',
    definition: 'Arsitektur integrasi Google Spreadsheet satu pintu menggunakan fungsi doPost(e) terpusat dengan mekanisme "action" switcher.',
    implementationRule: 'Mencegah penumpukan puluhan file skrip Google Apps Script yang terpisah; setiap web app baru cukup memanggil endpoint yang sama dengan payload action yang sesuai.',
    exampleSnippet: 'switch(payload.action) { case "syncProjects": return handleProjects(); }',
    tags: ['GAS', 'Spreadsheet', 'API', 'Router']
  },
  {
    id: 'term-cache-first',
    term: 'Cache-First Local Storage Persistence',
    category: 'architecture_gas',
    categoryLabel: 'Arsitektur Data & Keamanan',
    definition: 'Strategi penyimpanan data pada memori lokal peramban (localStorage) sebelum menyinkronkannya ke Google Spreadsheet.',
    implementationRule: 'Memastikan aplikasi tetap dapat dibuka instan dalam 0.1 detik dan tidak macet saat koneksi internet staf lambat di lapangan.',
    exampleSnippet: 'loadFromStorage("projects", INITIAL_PROJECTS)',
    tags: ['Cache', 'LocalStorage', 'Performa']
  },
  {
    id: 'term-json-snapshot',
    term: 'JSON Database Snapshot & Restore',
    category: 'architecture_gas',
    categoryLabel: 'Arsitektur Data & Keamanan',
    definition: 'Fitur ekspor seluruh data operasional (klien, project, staf, absensi, surat, kas) ke dalam satu file berkas .json yang dapat dipulihkan kapan saja.',
    implementationRule: 'Dapat diakses melalui modal GAS V2 Settings sebagai backup darurat bila spreadsheet terhapus.',
    tags: ['Backup', 'Snapshot', 'JSON', 'Restore']
  }
];
