import {
  ProjectItem,
  ClientItem,
  StaffItem,
  AttendanceRecord,
  FinanceTransaction,
  OfficialLetter,
  EquipmentItem,
  EquipmentLoanLog,
  RecruitmentCandidate,
  GasSettings
} from '../types';

// Office Coordinates (Obeecreatives Creative HQ - Jl. Gunawarman / Senopati, Kebayoran Baru, Jakarta Selatan)
export const OFFICE_COORDS = {
  latitude: -6.233512,
  longitude: 106.809145,
  name: 'Obeecreatives Studio HQ, Kebayoran Baru, Jakarta Selatan',
  allowedRadiusMeters: 150 // geofence 150m
};

// Initial realistic data seed
export const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: 'cli-001',
    company: 'Kopi Kenangan Mantan',
    contactName: 'Rian Pratama',
    phone: '+62 812-9844-1290',
    email: 'rian@kopikenangan.id',
    division: 'Social Media Management',
    retainerMonthlyValue: 24500000,
    contractStart: '2026-01-01',
    contractEnd: '2026-12-31',
    quota: { reels: 16, carousels: 8, stories: 30 },
    brandColor: '#B91C1C',
    status: 'active',
    brandKitDriveUrl: 'https://drive.google.com/drive/folders/brandkit-kenangan',
    notes: 'Prioritas Reels POV barista, humor relatable kantor, tone hangat & energik.'
  },
  {
    id: 'cli-002',
    company: 'Somethinc Glow Lab',
    contactName: 'Vania Amanda',
    phone: '+62 811-2309-8712',
    email: 'vania.mkt@somethinc.com',
    division: 'Social Media Management',
    retainerMonthlyValue: 32000000,
    contractStart: '2026-02-01',
    contractEnd: '2026-11-30',
    quota: { reels: 20, carousels: 10, stories: 45 },
    brandColor: '#E11D48',
    status: 'active',
    brandKitDriveUrl: 'https://drive.google.com/drive/folders/brandkit-somethinc',
    notes: 'Tone clean aesthetic Gen-Z, swatch macro texture 4K, scientific ingredient breakdown.'
  },
  {
    id: 'cli-003',
    company: 'AeroStreet Official',
    contactName: 'Dimas Wicaksono',
    phone: '+62 857-4100-3329',
    email: 'dimas@aerostreet.co.id',
    division: 'Social Media Management',
    retainerMonthlyValue: 18500000,
    contractStart: '2026-03-01',
    contractEnd: '2026-09-30',
    quota: { reels: 12, carousels: 6, stories: 20 },
    brandColor: '#2563EB',
    status: 'active',
    brandKitDriveUrl: 'https://drive.google.com/drive/folders/brandkit-aero',
    notes: 'Streetwear culture, product drops, fast-paced transition video TikTok & Reels.'
  },
  {
    id: 'cli-004',
    company: 'Sate Khas Senayan Corp',
    contactName: 'Dewi Lestari',
    phone: '+62 813-7721-9044',
    email: 'dewi.sks@satasenayan.com',
    division: 'Social Media Management',
    retainerMonthlyValue: 22000000,
    contractStart: '2026-01-15',
    contractEnd: '2027-01-14',
    quota: { reels: 14, carousels: 8, stories: 25 },
    brandColor: '#D97706',
    status: 'active',
    brandKitDriveUrl: 'https://drive.google.com/drive/folders/brandkit-sks',
    notes: 'Culinary heritage, slow-mo boga sate sizzling, warmth traditional modern hospitality.'
  },
  {
    id: 'cli-005',
    company: 'Oatside Milk Nusantara',
    contactName: 'Kevin Halim',
    phone: '+62 819-3382-7109',
    email: 'kevin.id@oatside.com',
    division: 'Branding',
    retainerMonthlyValue: 45000000,
    contractStart: '2026-02-15',
    contractEnd: '2026-08-15',
    quota: { reels: 0, carousels: 0, stories: 0 },
    brandColor: '#F59E0B',
    status: 'active',
    brandKitDriveUrl: 'https://drive.google.com/drive/folders/brandkit-oatside',
    notes: 'Special division: Packaging redesign & brand visual identity campaign.'
  }
];

export const INITIAL_STAFF: StaffItem[] = [
  {
    id: 'stf-001',
    name: 'Bima Satria',
    role: 'Videographer',
    email: 'bima@obeecreatives.com',
    phone: '+62 812-4091-2291',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rateCards: {
      Reels: 350000,
      TikTok: 300000,
      'Feed Carousel': 0,
      Story: 100000,
      YouTube: 900000,
      'Photo Product': 250000
    },
    status: 'active'
  },
  {
    id: 'stf-002',
    name: 'Alika Putri',
    role: 'Senior Editor',
    email: 'alika@obeecreatives.com',
    phone: '+62 813-8821-4993',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rateCards: {
      Reels: 250000,
      TikTok: 250000,
      'Feed Carousel': 0,
      Story: 75000,
      YouTube: 650000,
      'Photo Product': 0
    },
    status: 'active'
  },
  {
    id: 'stf-003',
    name: 'Rizky Ramadhan',
    role: 'Graphic Designer',
    email: 'rizky@obeecreatives.com',
    phone: '+62 858-9902-1455',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rateCards: {
      Reels: 0,
      TikTok: 0,
      'Feed Carousel': 250000,
      Story: 80000,
      YouTube: 0,
      'Photo Product': 200000
    },
    status: 'active'
  },
  {
    id: 'stf-004',
    name: 'Nadia Safitri',
    role: 'Copywriter',
    email: 'nadia@obeecreatives.com',
    phone: '+62 811-7290-6311',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rateCards: {
      Reels: 100000,
      TikTok: 100000,
      'Feed Carousel': 100000,
      Story: 50000,
      YouTube: 250000,
      'Photo Product': 0
    },
    status: 'active'
  },
  {
    id: 'stf-005',
    name: 'Fajar Nugraha',
    role: 'Creative Director',
    email: 'fajar@obeecreatives.com',
    phone: '+62 812-1002-3990',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rateCards: {
      Reels: 400000,
      TikTok: 350000,
      'Feed Carousel': 300000,
      Story: 100000,
      YouTube: 1200000,
      'Photo Product': 350000
    },
    status: 'active'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'prj-101',
    title: 'POV: Niat Healing Malah Diingetin Mantan',
    brandId: 'cli-001',
    brandName: 'Kopi Kenangan Mantan',
    division: 'Social Media Management',
    format: 'Reels',
    stage: 'review',
    scheduledDate: '2026-10-02',
    deadlineDate: '2026-09-30',
    creatorId: 'stf-001',
    creatorName: 'Bima Satria',
    creatorRole: 'Videographer',
    fee: 350000,
    materiUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    driveLink: 'https://drive.google.com/open?id=kenangan-reels-101',
    caption: {
      hook: 'Lagi enak-enak ngopi sore, tiba-tiba nama menu mengingatkan pada masa lalu... 💔☕️',
      body: 'Siapa yang relate? Mau pesen Kopi Kenangan Mantan tapi takut teringat janji manis yang belum usai. Tenang, rasanya manis legit pake gula aren asli, gak bikin overthinking!',
      cta: 'Tag temen kamu yang gagal move on dan wajib ditraktir Kenangan Mantan hari ini! 👇',
      hashtags: '#KopiKenangan #KenanganMantan #KopiGulaAren #RelatableOffice #Obeecreatives'
    },
    clientFeedback: 'Visual warm tone udah pas! Mohon perjelas logo cup di detik 03 ya Bima.',
    clientApprovalStatus: 'pending',
    cdApprovalStatus: 'approved'
  },
  {
    id: 'prj-102',
    title: 'Texture Swatch Macro: Niacinamide 10% Barrier Serum',
    brandId: 'cli-002',
    brandName: 'Somethinc Glow Lab',
    division: 'Social Media Management',
    format: 'Reels',
    stage: 'editing',
    scheduledDate: '2026-10-04',
    deadlineDate: '2026-10-01',
    creatorId: 'stf-002',
    creatorName: 'Alika Putri',
    creatorRole: 'Senior Editor',
    fee: 250000,
    materiUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    driveLink: 'https://drive.google.com/open?id=somethinc-serum-102',
    caption: {
      hook: 'Watery texture yang langsung menyerap tanpa rasa lengket dalam 5 detik! ✨💧',
      body: 'Formula terbaru dengan triple brightening peptide untuk memudarkan bekas jerawat PIE & PIH. Bebas alkohol, aman dipakai bareng layering retinol.',
      cta: 'Checkout sekarang di official store & dapatkan free mini pouch!',
      hashtags: '#Somethinc #SkincareReview #SkinBarrier #GlowLab #Obeecreatives'
    },
    clientApprovalStatus: 'pending',
    cdApprovalStatus: 'pending'
  },
  {
    id: 'prj-103',
    title: 'Carousel Edukasi: 4 Cara Styling Sneaker Retro',
    brandId: 'cli-003',
    brandName: 'AeroStreet Official',
    division: 'Social Media Management',
    format: 'Feed Carousel',
    stage: 'approved',
    scheduledDate: '2026-10-01',
    deadlineDate: '2026-09-28',
    creatorId: 'stf-003',
    creatorName: 'Rizky Ramadhan',
    creatorRole: 'Graphic Designer',
    fee: 250000,
    materiUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
    driveLink: 'https://drive.google.com/open?id=aerostreet-carousel-103',
    caption: {
      hook: 'Beli sepatu keren tapi bingung mix & match celananya? Slide sampe abis! 👟🔥',
      body: 'Dari baggy pants 90-an sampai ankle chinos semi-formal, AeroStreet Retro cocok buat daily commuter maupun nongkrong malam minggu.',
      cta: 'Outfit slide ke berapa yang paling gaya lu banget? Komen nomornya!',
      hashtags: '#AeroStreet #LokalKeren #SneakerIndo #OOTDCowok #FashionGuide'
    },
    clientApprovalStatus: 'approved',
    cdApprovalStatus: 'approved'
  },
  {
    id: 'prj-104',
    title: 'Cinematic ASMR: Bakar Sate Kambing Bumbu Ketumbar',
    brandId: 'cli-004',
    brandName: 'Sate Khas Senayan Corp',
    division: 'Social Media Management',
    format: 'TikTok',
    stage: 'shooting',
    scheduledDate: '2026-10-06',
    deadlineDate: '2026-10-03',
    creatorId: 'stf-001',
    creatorName: 'Bima Satria',
    creatorRole: 'Videographer',
    fee: 300000,
    materiUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    driveLink: 'https://drive.google.com/open?id=senayan-asmr-104',
    caption: {
      hook: 'Dengerin suara desis arang batok kelapa & tetesan bumbu kacang legendaris... 🥩🔥',
      body: 'Resep warisan sejak 1974. Daging kambing muda empuk tanpa aroma prengus, dicelup kecap manis bumbu rempah pilihan.',
      cta: 'Ajak keluarga weekend ini mampir ke outlet Sate Khas Senayan terdekat.',
      hashtags: '#SateKhasSenayan #KulinerNusantara #ASMRFood #IndonesianFood'
    },
    clientApprovalStatus: 'pending',
    cdApprovalStatus: 'pending'
  },
  {
    id: 'prj-105',
    title: 'Ideation: Campaign Kolaborasi Musik & Kopi Senja',
    brandId: 'cli-001',
    brandName: 'Kopi Kenangan Mantan',
    division: 'Social Media Management',
    format: 'Reels',
    stage: 'ideation',
    scheduledDate: '2026-10-10',
    deadlineDate: '2026-10-05',
    creatorId: 'stf-004',
    creatorName: 'Nadia Safitri',
    creatorRole: 'Copywriter',
    fee: 100000,
    caption: {
      hook: 'Ketika playlist indie berpadu dengan segelas cold brew...',
      body: 'Draft skrip micro-movie 30 detik: Dua musisi muda bertemu di coffee shop saat hujan.',
      cta: 'Vote judul lagu yang paling cocok buat campaign ini!',
      hashtags: '#KopiKenangan #MusikDanKopi #CreativeCampaign'
    },
    clientApprovalStatus: 'pending',
    cdApprovalStatus: 'pending'
  },
  {
    id: 'prj-106',
    title: 'Story Q&A: Mitos vs Fakta Double Cleansing',
    brandId: 'cli-002',
    brandName: 'Somethinc Glow Lab',
    division: 'Social Media Management',
    format: 'Story',
    stage: 'published',
    scheduledDate: '2026-09-28',
    deadlineDate: '2026-09-27',
    creatorId: 'stf-003',
    creatorName: 'Rizky Ramadhan',
    creatorRole: 'Graphic Designer',
    fee: 80000,
    materiUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    caption: {
      hook: 'Beneran gak sih pake cleansing oil bikin pori-pori tersumbat?',
      body: 'Swipe up buat cek interactive poll & rahasia emulsifikasi yang benar!',
      cta: 'Drop pertanyaan kulit kamu di stiker question box!',
      hashtags: '#SomethincStory #SkincareMyth #BeautyTips'
    },
    clientApprovalStatus: 'approved',
    cdApprovalStatus: 'approved'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    staffId: 'stf-001',
    staffName: 'Bima Satria',
    date: '2026-09-29',
    checkInTime: '08:45:12',
    workMode: 'WFO',
    latitude: -6.233520,
    longitude: 106.809150,
    distanceMeters: 4,
    isWithinRadius: true,
    notes: 'Shooting set up gear lighting untuk Kopi Kenangan batch video.',
    selfieUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'att-02',
    staffId: 'stf-002',
    staffName: 'Alika Putri',
    date: '2026-09-29',
    checkInTime: '09:02:40',
    workMode: 'WFO',
    latitude: -6.233480,
    longitude: 106.809130,
    distanceMeters: 12,
    isWithinRadius: true,
    notes: 'Color grading footage Somethinc & cut down draft Reels.',
    selfieUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'att-03',
    staffId: 'stf-004',
    staffName: 'Nadia Safitri',
    date: '2026-09-29',
    checkInTime: '09:15:00',
    workMode: 'WFH',
    latitude: -6.289120,
    longitude: 106.821900,
    distanceMeters: 6420,
    isWithinRadius: false,
    notes: 'Riset copywriting campaign Q4 Sate Khas Senayan dari rumah.',
    selfieUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_TRANSACTIONS: FinanceTransaction[] = [
  {
    id: 'trx-001',
    type: 'income',
    category: 'Client Retainer',
    description: 'Monthly Retainer SMM September 2026 - Somethinc Glow Lab',
    amount: 32000000,
    date: '2026-09-05',
    referenceNo: 'INV/202609/001',
    status: 'completed',
    clientOrStaffName: 'Somethinc Glow Lab'
  },
  {
    id: 'trx-002',
    type: 'income',
    category: 'Client Retainer',
    description: 'Monthly Retainer SMM September 2026 - Kopi Kenangan Mantan',
    amount: 24500000,
    date: '2026-09-08',
    referenceNo: 'INV/202609/002',
    status: 'completed',
    clientOrStaffName: 'Kopi Kenangan Mantan'
  },
  {
    id: 'trx-003',
    type: 'expense',
    category: 'Creator Fee Payout',
    description: 'Fee Payroll Produksi Konten Batch Agustus - Bima Satria (Videographer)',
    amount: 4200000,
    date: '2026-09-10',
    referenceNo: 'PAY/202609/014',
    status: 'completed',
    clientOrStaffName: 'Bima Satria'
  },
  {
    id: 'trx-004',
    type: 'expense',
    category: 'Creator Fee Payout',
    description: 'Fee Payroll Editing Konten Batch Agustus - Alika Putri',
    amount: 3500000,
    date: '2026-09-10',
    referenceNo: 'PAY/202609/015',
    status: 'completed',
    clientOrStaffName: 'Alika Putri'
  },
  {
    id: 'trx-005',
    type: 'expense',
    category: 'Studio & Gear Rental',
    description: 'Sewa Lensa Macro Sony 90mm f/2.8 OSS (3 Hari Shooting Somethinc)',
    amount: 750000,
    date: '2026-09-15',
    referenceNo: 'EXP/202609/081',
    status: 'completed',
    clientOrStaffName: 'SewaKamera Jkt'
  },
  {
    id: 'trx-006',
    type: 'income',
    category: 'Client Retainer',
    description: 'Monthly Retainer SMM September 2026 - AeroStreet Official',
    amount: 18500000,
    date: '2026-09-18',
    referenceNo: 'INV/202609/003',
    status: 'completed',
    clientOrStaffName: 'AeroStreet Official'
  },
  {
    id: 'trx-007',
    type: 'expense',
    category: 'Operational & Utilities',
    description: 'Internet High-Speed Fiber 300Mbps & Listrik Studio Senopati',
    amount: 2850000,
    date: '2026-09-20',
    referenceNo: 'EXP/202609/090',
    status: 'completed'
  }
];

export const INITIAL_LETTERS: OfficialLetter[] = [
  {
    id: 'let-001',
    letterNumber: '038/OC-MOU/VIII/2026',
    category: 'MOU',
    title: 'MoU Kerjasama Konten Social Media Management & Creative Production',
    recipientName: 'Rian Pratama',
    recipientCompany: 'PT Bumi Berkah Boga (Kopi Kenangan)',
    dateCreated: '2026-08-20',
    effectiveDate: '2026-09-01',
    expiryDate: '2027-08-31',
    status: 'Signed',
    contractValue: 294000000,
    scopeSummary: 'Produksi 16 Reels, 8 Carousel per bulan, talent & wardrobe included, monthly reporting.',
    generatedBy: 'Fajar Nugraha'
  },
  {
    id: 'let-002',
    letterNumber: '039/OC-NDA/IX/2026',
    category: 'NDA',
    title: 'Non-Disclosure Agreement: Peluncuran Produk Rahasia Q4 Somethinc',
    recipientName: 'Vania Amanda',
    recipientCompany: 'PT Royal Pesona Indonesia (Somethinc)',
    dateCreated: '2026-09-02',
    effectiveDate: '2026-09-02',
    expiryDate: '2028-09-02',
    status: 'Signed',
    contractValue: 0,
    scopeSummary: 'Kerahasiaan bahan uji klinis, formula skincare rahasia sebelum tanggal rilis resmi nasional.',
    generatedBy: 'Fajar Nugraha'
  },
  {
    id: 'let-003',
    letterNumber: '040/OC-SPK/IX/2026',
    category: 'SPK',
    title: 'Surat Perintah Kerja: Shooting Video Iklan Komersial AeroStreet Jakarta',
    recipientName: 'Dimas Wicaksono',
    recipientCompany: 'PT AeroStreet Nusantara',
    dateCreated: '2026-09-12',
    effectiveDate: '2026-09-15',
    expiryDate: '2026-10-15',
    status: 'Signed',
    contractValue: 35000000,
    scopeSummary: 'Jasa produksi 3 TVC pendek, model streetwear talent, 2 hari shooting studio & outdoor GBK.',
    generatedBy: 'Fajar Nugraha'
  },
  {
    id: 'let-004',
    letterNumber: '041/OC-PFW/IX/2026',
    category: 'PFW',
    title: 'Surat Penawaran: Retainer Branding & Social Media Revamp Oatside',
    recipientName: 'Kevin Halim',
    recipientCompany: 'Oatside Milk Nusantara',
    dateCreated: '2026-09-25',
    effectiveDate: '2026-10-01',
    expiryDate: '2026-10-31',
    status: 'Sent',
    contractValue: 540000000,
    scopeSummary: 'Paket 12 bulan Full-scale Social Media Growth, Brand Identity Toolkit, 3D CGI Product Showcase.',
    generatedBy: 'Fajar Nugraha'
  }
];

export const INITIAL_EQUIPMENTS: EquipmentItem[] = [
  {
    id: 'eq-001',
    name: 'Sony Cinema Line FX3 Camera Body',
    category: 'Camera',
    serialNumber: 'SN-FX3-998124',
    condition: 'Good',
    status: 'borrowed',
    currentBorrower: 'Bima Satria',
    currentProject: 'Shooting Kopi Kenangan',
    returnExpectedDate: '2026-09-30'
  },
  {
    id: 'eq-002',
    name: 'Sony Alpha 7 IV (A7M4) Mirrorless Body',
    category: 'Camera',
    serialNumber: 'SN-A74-124981',
    condition: 'Good',
    status: 'available'
  },
  {
    id: 'eq-003',
    name: 'Sony FE 24-70mm f/2.8 GM II Zoom Lens',
    category: 'Lens',
    serialNumber: 'SN-GM-771239',
    condition: 'Good',
    status: 'borrowed',
    currentBorrower: 'Bima Satria',
    currentProject: 'Shooting Kopi Kenangan',
    returnExpectedDate: '2026-09-30'
  },
  {
    id: 'eq-004',
    name: 'Sony FE 50mm f/1.2 GM Prime Lens',
    category: 'Lens',
    serialNumber: 'SN-GM-440182',
    condition: 'Good',
    status: 'available'
  },
  {
    id: 'eq-005',
    name: 'Aputure Light Storm 300d Mark II + Light Dome',
    category: 'Lighting',
    serialNumber: 'SN-AP-300D-01',
    condition: 'Good',
    status: 'available'
  },
  {
    id: 'eq-006',
    name: 'Amaran 200x Bi-Color LED Studio Spotlight',
    category: 'Lighting',
    serialNumber: 'SN-AM-200X-04',
    condition: 'Fair',
    status: 'maintenance'
  },
  {
    id: 'eq-007',
    name: 'DJI Mic 2 Wireless System (2 TX + 1 RX + Charging Case)',
    category: 'Audio',
    serialNumber: 'SN-DJI-MIC2-881',
    condition: 'Good',
    status: 'available'
  },
  {
    id: 'eq-008',
    name: 'DJI RS 3 Pro Gimbal Stabilizer Combo',
    category: 'Grip & Drone',
    serialNumber: 'SN-RS3P-00293',
    condition: 'Good',
    status: 'available'
  }
];

export const INITIAL_EQUIPMENT_LOGS: EquipmentLoanLog[] = [
  {
    id: 'log-001',
    equipmentId: 'eq-001',
    equipmentName: 'Sony Cinema Line FX3 Camera Body',
    borrowerName: 'Bima Satria',
    projectName: 'Kopi Kenangan Reels Shooting',
    borrowDate: '2026-09-28',
    conditionNotes: 'Kamera bersih, sensor clean, 2 baterai NP-FZ100 disertakan.',
    status: 'active'
  },
  {
    id: 'log-002',
    equipmentId: 'eq-003',
    equipmentName: 'Sony FE 24-70mm f/2.8 GM II Zoom Lens',
    borrowerName: 'Bima Satria',
    projectName: 'Kopi Kenangan Reels Shooting',
    borrowDate: '2026-09-28',
    conditionNotes: 'Elemen optik depan belakang bebas jamur & scratch.',
    status: 'active'
  }
];

export const INITIAL_CANDIDATES: RecruitmentCandidate[] = [
  {
    id: 'cnd-001',
    fullName: 'Arga Mahardika',
    email: 'arga.creative@gmail.com',
    phone: '+62 813-1120-4491',
    appliedRole: 'Senior Video Editor',
    portfolioUrl: 'https://behance.net/argamahardika',
    experienceYears: 4,
    expectedSalary: 8500000,
    stage: 'Interview',
    scores: { aesthetic: 9, technical: 9, culture: 8 },
    interviewDate: '2026-10-02 14:00',
    meetLink: 'https://meet.google.com/obee-arga-edit',
    notes: 'Kuat di pacing editing TikTok & Reels high-retention, fasih Premiere Pro & DaVinci Resolve.',
    appliedDate: '2026-09-22'
  },
  {
    id: 'cnd-002',
    fullName: 'Clara Anindya',
    email: 'clara.anindya@gmail.com',
    phone: '+62 856-7819-2231',
    appliedRole: 'Social Media Strategist & Copywriter',
    portfolioUrl: 'https://notion.so/clara-copywriting-vault',
    experienceYears: 3,
    expectedSalary: 7000000,
    stage: 'Portfolio Review',
    scores: { aesthetic: 8, technical: 8, culture: 9 },
    notes: 'Pernah handle akun F&B dengan viralitas 3.2M impressions. Gaya penulisan adaptif.',
    appliedDate: '2026-09-25'
  },
  {
    id: 'cnd-003',
    fullName: 'Reno Wicaksono',
    email: 'reno.cinematics@gmail.com',
    phone: '+62 812-9901-8843',
    appliedRole: 'Videographer & Lighting Specialist',
    portfolioUrl: 'https://youtube.com/@renowicaksono_reel',
    experienceYears: 5,
    expectedSalary: 9000000,
    stage: 'Applied',
    scores: { aesthetic: 8, technical: 9, culture: 7 },
    notes: 'Showreel lighting studio tajam, punya pengalaman commercial carousels & beauty.',
    appliedDate: '2026-09-28'
  }
];

// Helper: Haversine distance calculator in meters
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Local Storage Keys
const STORAGE_PREFIX = 'obee_workspace_os_v2_';

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading localStorage for key ${key}:`, e);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing to localStorage for key ${key}:`, e);
  }
}

// Export all state data to JSON format
export function exportAllDataAsJson(): string {
  const data = {
    clients: loadFromStorage('clients', INITIAL_CLIENTS),
    projects: loadFromStorage('projects', INITIAL_PROJECTS),
    staff: loadFromStorage('staff', INITIAL_STAFF),
    attendance: loadFromStorage('attendance', INITIAL_ATTENDANCE),
    transactions: loadFromStorage('transactions', INITIAL_TRANSACTIONS),
    letters: loadFromStorage('letters', INITIAL_LETTERS),
    equipments: loadFromStorage('equipments', INITIAL_EQUIPMENTS),
    equipmentLogs: loadFromStorage('equipment_logs', INITIAL_EQUIPMENT_LOGS),
    candidates: loadFromStorage('candidates', INITIAL_CANDIDATES),
    exportedAt: new Date().toISOString(),
    system: 'Obeecreatives Workspace OS (GAS V2 Ready)'
  };
  return JSON.stringify(data, null, 2);
}
