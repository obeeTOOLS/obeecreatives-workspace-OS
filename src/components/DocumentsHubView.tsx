import React, { useState } from 'react';
import {
  FolderOpen,
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  Copy,
  Check,
  ShieldCheck,
  Search,
  Plus,
  HelpCircle,
  Link as LinkIcon,
  Upload,
  Lock,
  ArrowUpRight,
  BookMarked,
  Tag
} from 'lucide-react';
import { ModuleId } from '../types';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from '../data/glossary';

interface DocumentsHubViewProps {
  onNavigate?: (module: ModuleId) => void;
  onOpenSpecPdf?: () => void;
}

interface QuickAccessItem {
  id: string;
  name: string;
  moduleId: ModuleId;
  status: 'Aktif' | 'Pending';
  tags: string[];
  isAdminOnly?: boolean;
  author: string;
  timestamp: string;
}

export const DocumentsHubView: React.FC<DocumentsHubViewProps> = ({ onNavigate, onOpenSpecPdf }) => {
  const [activeCategory, setActiveCategory] = useState<
    'quick_access' | 'sop' | 'pitch' | 'brand_guidelines' | 'kamus_istilah'
  >('quick_access');
  const [searchDoc, setSearchDoc] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua Kategori');
  const [filterDivision, setFilterDivision] = useState('Semua Divisi');
  const [filterStatus, setFilterStatus] = useState('Aktif');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Glossary filter states
  const [glossarySearch, setGlossarySearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);

  // Exact Quick Access modules list matching user's obeecreatives style reference
  const quickAccessList: QuickAccessItem[] = [
    {
      id: 'qa-01',
      name: 'CRM',
      moduleId: 'crm_clients',
      status: 'Aktif',
      tags: ['Web App'],
      author: 'Lalu Mahendra',
      timestamp: '16/08/2026 08:00'
    },
    {
      id: 'qa-02',
      name: 'Database Staff',
      moduleId: 'staff_hr',
      status: 'Aktif',
      tags: ['Web App'],
      author: 'Lalu Mahendra',
      timestamp: '16/08/2026 08:00'
    },
    {
      id: 'qa-03',
      name: 'Project Control',
      moduleId: 'project_control',
      status: 'Aktif',
      tags: ['Web App'],
      author: 'Lalu Mahendra',
      timestamp: '16/08/2026 08:00'
    },
    {
      id: 'qa-04',
      name: 'Laporan Keuangan',
      moduleId: 'finance',
      status: 'Aktif',
      tags: ['Web App'],
      isAdminOnly: true,
      author: 'Lalu Mahendra',
      timestamp: '16/08/2026 08:00'
    },
    {
      id: 'qa-05',
      name: 'Equipments Hub',
      moduleId: 'equipments',
      status: 'Aktif',
      tags: ['General', 'Web App'],
      isAdminOnly: true,
      author: 'Lalu Mahendra',
      timestamp: '16/09/2026 10:48'
    },
    {
      id: 'qa-06',
      name: 'Documents Hub',
      moduleId: 'documents',
      status: 'Aktif',
      tags: ['General', 'Web App'],
      isAdminOnly: true,
      author: 'Lalu Mahendra',
      timestamp: '01/08/2026 15:42'
    },
    {
      id: 'qa-07',
      name: 'DATABASE SURAT',
      moduleId: 'surat',
      status: 'Aktif',
      tags: ['General', 'Web App'],
      author: 'Lalu Mahendra',
      timestamp: '07/08/2026 05:12'
    },
    {
      id: 'qa-08',
      name: 'Logo & Packaging Builder',
      moduleId: 'packaging',
      status: 'Aktif',
      tags: ['General', 'Web App'],
      author: 'Lalu Mahendra',
      timestamp: '16/09/2026 10:44'
    },
    {
      id: 'qa-09',
      name: 'Recruitment - Admin',
      moduleId: 'recruitment_admin',
      status: 'Aktif',
      tags: ['General', 'Web App'],
      isAdminOnly: true,
      author: 'Admin',
      timestamp: '16/09/2026 10:50'
    },
    {
      id: 'qa-10',
      name: 'RECRUITMENT OBEECREATIVES',
      moduleId: 'recruitment_public',
      status: 'Aktif',
      tags: ['General', 'Web App'],
      author: 'Lalu Mahendra',
      timestamp: '08/09/2026 11:21'
    },
    {
      id: 'qa-11',
      name: 'Form Audit Media Sosial',
      moduleId: 'audit',
      status: 'Aktif',
      tags: ['General', 'Web App'],
      author: 'Lalu Mahendra',
      timestamp: '18/09/2026 14:15'
    }
  ];

  const filteredQuickAccess = quickAccessList.filter((item) => {
    if (searchDoc && !item.name.toLowerCase().includes(searchDoc.toLowerCase())) {
      return false;
    }
    return true;
  });

  const sops = [
    {
      id: 'sop-01',
      title: 'SOP 01: Siklus Produksi Konten Media Sosial',
      category: 'Produksi',
      revised: 'September 2026',
      content: `1. Tahap Ideation & Hook:
- Setiap konten wajib memiliki hook 3 detik awal dengan visual movement atau statement pemikat.
- Scripting dibuat dengan format Hook -> Story/Body -> CTA yang jelas.

2. Shooting & Gear Check:
- Format video wajib 4K 60fps untuk scene slow-motion, 4K 24fps untuk dialogue/talking-head.
- Lighting minimal 2-point lighting (Key light + Rim/hair light).
- Audio menggunakan wireless mic lavalier dengan safety track -6dB.

3. Post-Production & Color Grading:
- Editing ritme cepat mengikuti beat music viral / trending audio tanpa copyright issues.
- Format text subtitle: font sans-serif bold dengan background highlight untuk retensi penonton.`
    },
    {
      id: 'sop-02',
      title: 'SOP 02: Handling Revisi Klien & Batasan Scope',
      category: 'Client Relations',
      revised: 'Agustus 2026',
      content: `1. Batasan Revisi:
- Klien berhak atas maksimal 2x putaran revisi minor (perubahan subtitle, typo copy, cut durasi <2 detik).
- Perubahan konsep fundamental atau pengambilan ulang video (re-shoot) setelah script disetujui dikenakan biaya add-on production.

2. Timeline Feedback Klien:
- Klien diharapkan memberikan masukan maksimal 2x24 jam sejak draft materi diunggah ke Portal Review Klien.
- Bila tidak ada respon dalam 3 hari kalender, konten dianggap disetujui untuk jadwal tayang.`
    },
    {
      id: 'sop-03',
      title: 'SOP 03: Peminjaman & Pemeliharaan Alat Studio',
      category: 'Studio & Gear',
      revised: 'September 2026',
      content: `1. Prosedur Peminjaman (Check-Out):
- Tim wajib mencatat peminjaman kamera, lensa, dan lighting di modul "Equipments Hub".
- Pemeriksaan sensor kamera & elemen lensa harus dilakukan sebelum meninggalkan studio.

2. Prosedur Pengembalian (Check-In):
- Baterai harus di-charge penuh kembali sebelum dimasukkan ke charging case.
- Kartu SD harus di-backup ke Master Server Drive / NAS sebelum diformat.`
    },
    {
      id: 'sop-04',
      title: 'SOP 04: Penggajian & Payout Fee Creator',
      category: 'Finance',
      revised: 'September 2026',
      content: `1. Perhitungan Fee:
- Fee creator dihitung otomatis berdasarkan kuota konten yang berstatus "Approved" atau "Published" di Project Control.
- Payout ditransfer via transfer bank BCA/Mandiri setiap tanggal 5 awal bulan.`
    }
  ];

  const pitchDecks = [
    {
      title: 'Obeecreatives Agency Credentials Deck 2026',
      desc: 'Presentasi portofolio agensi, studi kasus F&B dan skincare, serta rekam jejak viralitas 12 juta views.',
      slides: 28,
      format: 'PDF / Keynote',
      url: 'https://drive.google.com/credentials-2026'
    },
    {
      title: 'Social Media Management Retainer Proposal Template',
      desc: 'Template proposal standar berisi paket Starter, Growth, dan Scale Retainer dengan kalkulasi ROI.',
      slides: 16,
      format: 'Google Slides',
      url: 'https://slides.google.com/retainer-template'
    },
    {
      title: 'Brand Visual Identity & Packaging Pitch Deck',
      desc: 'Deck spesifikasi perancangan logo, brand book, dan packaging box siap cetak.',
      slides: 22,
      format: 'PDF',
      url: 'https://drive.google.com/packaging-pitch'
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Brand Banner Header inspired by reference */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-gradient-to-r after:from-red-600 after:via-red-500 after:to-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight leading-none">
                <span className="text-white">obee</span>
                <span className="text-red-600">creatives</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Document Hub — Pusat Navigasi Dokumen & Sistem
            </p>
          </div>

          {/* Action buttons from reference */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenSpecPdf && (
              <button
                onClick={onOpenSpecPdf}
                className="px-3.5 py-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-red-600/20"
              >
                <FileText size={14} />
                <span>Unduh PDF Standar Agensi</span>
              </button>
            )}

            <button
              onClick={() => alert('Daftar tools ekosistem obeecreatives terhubung!')}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <LinkIcon size={13} className="text-red-500" />
              <span>Tools Lain</span>
            </button>

            <button
              onClick={() => setActiveCategory('sop')}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle size={13} className="text-slate-400" />
              <span>Bantuan</span>
            </button>

            <button
              onClick={() => alert('Import massal dokumen diaktifkan')}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Upload size={13} className="text-slate-400" />
              <span>Import Massal</span>
            </button>

            <button
              onClick={() => alert('Buka dialog tambah dokumen')}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-red-600/30"
            >
              <Plus size={15} />
              <span>+ Tambah Dokumen</span>
            </button>
          </div>
        </div>

        {/* Filter bar from reference */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 text-xs">
          <div className="lg:col-span-6 relative">
            <input
              type="text"
              value={searchDoc}
              onChange={(e) => setSearchDoc(e.target.value)}
              placeholder="Cari nama dokumen..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 hover:border-red-500/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-red-500"
            />
          </div>

          <div className="lg:col-span-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-hidden"
            >
              <option>Semua Kategori</option>
              <option>Core Operations</option>
              <option>Finance & Legal</option>
              <option>Creative Assets</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={filterDivision}
              onChange={(e) => setFilterDivision(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-hidden"
            >
              <option>Semua Divisi</option>
              <option>Social Media Management</option>
              <option>Branding & Visual</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-hidden"
            >
              <option>Aktif</option>
              <option>Semua Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Switcher Tab */}
      <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg self-start">
        <button
          onClick={() => setActiveCategory('quick_access')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeCategory === 'quick_access'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderOpen size={14} />
          <span>Quick Access Modul</span>
        </button>

        <button
          onClick={() => setActiveCategory('sop')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeCategory === 'sop'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen size={14} />
          <span>SOP Operasional Agensi</span>
        </button>

        <button
          onClick={() => setActiveCategory('pitch')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeCategory === 'pitch'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers size={14} />
          <span>Pitch Decks & Proposal</span>
        </button>

        <button
          onClick={() => setActiveCategory('brand_guidelines')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeCategory === 'brand_guidelines'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles size={14} />
          <span>Brand Guidelines Obeecreatives</span>
        </button>

        <button
          onClick={() => setActiveCategory('kamus_istilah')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeCategory === 'kamus_istilah'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookMarked size={14} />
          <span>Kamus Istilah & Glosarium</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-red-950 text-red-300 border border-red-500/30">
            {GLOSSARY_TERMS.length}
          </span>
        </button>
      </div>

      {/* CATEGORY: QUICK ACCESS (Exact styling from user reference image) */}
      {activeCategory === 'quick_access' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          {/* Header indicator */}
          <div className="flex items-center gap-2 pb-2">
            <span className="h-4 w-1 bg-red-600 rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              QUICK ACCESS
            </span>
          </div>

          {/* List items with signature curved red left border */}
          <div className="space-y-3">
            {filteredQuickAccess.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(item.moduleId);
                  }
                }}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800/80 hover:border-red-500/50 rounded-xl transition-all cursor-pointer shadow-xs border-l-4 border-l-red-600"
              >
                {/* Title & Tags */}
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-red-400 transition-colors">
                    {item.name}
                  </h4>

                  {/* Status pill (Mint green as in reference) */}
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                    {item.status}
                  </span>

                  {/* Other tags */}
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}

                  {/* Admin Only Badge (Red with lock) */}
                  {item.isAdminOnly && (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold flex items-center gap-1">
                      <Lock size={10} />
                      <span>Admin Only</span>
                    </span>
                  )}
                </div>

                {/* Author and Date metadata */}
                <div className="mt-2 sm:mt-0 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>{item.author}</span>
                  <span>·</span>
                  <span>{item.timestamp}</span>
                  <ArrowUpRight size={13} className="text-slate-600 group-hover:text-red-400 transition-colors shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY: SOP REPOSITORY */}
      {activeCategory === 'sop' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sops.map((sop) => (
            <div
              key={sop.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between border-l-4 border-l-red-600"
            >
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                    {sop.category} · Rev: {sop.revised}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{sop.id}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">{sop.title}</h3>
                <div className="mt-3 p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg text-slate-300 text-xs whitespace-pre-line leading-relaxed">
                  {sop.content}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleCopy(sop.content, sop.id)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors"
                >
                  {copiedCode === sop.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedCode === sop.id ? 'Tersalin' : 'Copy Panduan'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORY: PITCH DECKS & TEMPLATES */}
      {activeCategory === 'pitch' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pitchDecks.map((deck, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between border-l-4 border-l-red-600"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{deck.format}</span>
                  <span>{deck.slides} Slides</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100 leading-snug">{deck.title}</h3>
                <p className="text-xs text-slate-400 leading-normal">{deck.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <a
                  href={deck.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold"
                >
                  <Download size={13} />
                  <span>Download Deck</span>
                </a>
                <span className="text-[11px] text-slate-500 font-mono">Ver 2.4</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORY: BRAND GUIDELINES */}
      {activeCategory === 'brand_guidelines' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 border-l-4 border-l-red-600">
          <div>
            <h3 className="text-base font-bold text-slate-100">Pedoman Identitas Brand Obeecreatives</h3>
            <p className="text-xs text-slate-400">
              Standar visual gelap dipadukan dengan aksen merah khas obeecreatives
            </p>
          </div>

          {/* Color Palette Grid */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Official Color Palette
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                <div className="h-10 rounded bg-[#090D16] border border-slate-700"></div>
                <div className="font-bold text-slate-200">Studio Obsidian</div>
                <div className="font-mono text-slate-400 text-[11px]">#090D16 (Canvas)</div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                <div className="h-10 rounded bg-red-600 shadow-md shadow-red-600/30"></div>
                <div className="font-bold text-slate-200">Obee Signature Red</div>
                <div className="font-mono text-red-400 text-[11px]">#DC2626 / #EF4444 (Accent)</div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                <div className="h-10 rounded bg-slate-900 border border-slate-700"></div>
                <div className="font-bold text-slate-200">Structural Slate</div>
                <div className="font-mono text-slate-400 text-[11px]">#0F172A (Surfaces)</div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                <div className="h-10 rounded bg-slate-100"></div>
                <div className="font-bold text-slate-200">Paper White</div>
                <div className="font-mono text-slate-400 text-[11px]">#F8FAFC (Typography)</div>
              </div>
            </div>
          </div>

          {/* Typography & Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-slate-200 block text-sm">Prinsip Tipografi Agensi</span>
              <p className="text-slate-400 leading-relaxed">
                Display & Body Typography menggunakan <strong>Plus Jakarta Sans</strong> untuk kesan modern, profesional, dan tajam. Seluruh angka finansial, kuota, dan timestamp wajib menggunakan font tabular monospace <strong>JetBrains Mono</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-slate-200 block text-sm">Identitas Khas Obeecreatives</span>
              <p className="text-slate-400 leading-relaxed">
                Kombinasi kanvas gelap pekat (Studio Obsidian) dengan aksen merah menyala (Obee Signature Red) serta curved vertical red border indicator pada setiap kartu dokumen dan modul.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY: KAMUS ISTILAH & GLOSARIUM PENGEMBANGAN WEB APPS */}
      {activeCategory === 'kamus_istilah' && (
        <div className="space-y-6">
          {/* Top Overview & Action Banner */}
          <div className="p-5 bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-500/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 bg-red-600 rounded-full"></span>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Kamus & Glosarium Istilah Web Apps Obeecreatives</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                    Standar Resmi Agensi
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Kamus rujukan baku penamaan fitur, istilah teknis, dan standar arsitektur sistem. Setiap modul atau web apps baru yang dibangun untuk ekosistem Obeecreatives wajib merujuk pada kamus ini.
              </p>
            </div>

            <button
              onClick={onOpenSpecPdf}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all shrink-0 hover:scale-105 active:scale-95"
            >
              <FileText size={15} />
              <span>Ekspor Kamus ke PDF Standar</span>
            </button>
          </div>

          {/* Search and Category Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari istilah, akronim, atau konsep (contoh: PWA, Hook, Geofencing, GAS V2)..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              {/* Counter */}
              <div className="text-xs font-mono text-slate-400 shrink-0 self-center">
                Menampilkan <strong className="text-red-400">{
                  GLOSSARY_TERMS.filter((item) => {
                    const matchCat = glossaryCategory === 'all' || item.category === glossaryCategory;
                    const matchSearch =
                      glossarySearch === '' ||
                      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                      item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                      item.tags.some((t) => t.toLowerCase().includes(glossarySearch.toLowerCase()));
                    return matchCat && matchSearch;
                  }).length
                }</strong> dari {GLOSSARY_TERMS.length} istilah
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {GLOSSARY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setGlossaryCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    glossaryCategory === cat.id
                      ? 'bg-red-600 text-white font-bold shadow-xs'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Glossary Terms Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GLOSSARY_TERMS.filter((item) => {
              const matchCat = glossaryCategory === 'all' || item.category === glossaryCategory;
              const matchSearch =
                glossarySearch === '' ||
                item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                item.tags.some((t) => t.toLowerCase().includes(glossarySearch.toLowerCase()));
              return matchCat && matchSearch;
            }).map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3.5 transition-all border-l-4 border-l-red-600 group"
              >
                <div>
                  {/* Category Pill and Copy button */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1">
                      <Tag size={10} className="text-red-400" />
                      <span>{item.categoryLabel}</span>
                    </span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.term);
                        setCopiedTermId(item.id);
                        setTimeout(() => setCopiedTermId(null), 2000);
                      }}
                      title="Salin Nama Istilah"
                      className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors text-[11px] flex items-center gap-1"
                    >
                      {copiedTermId === item.id ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-mono">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span className="text-[10px] font-mono hidden sm:inline">Salin</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Term Name */}
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {item.term}
                  </h4>

                  {/* Definition */}
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {/* Implementation Rule */}
                  <div className="text-[11px] text-slate-400 leading-normal">
                    <strong className="text-red-400 block text-[10px] uppercase font-mono tracking-wider">
                      Aturan Implementasi di Web Apps:
                    </strong>
                    <span>{item.implementationRule}</span>
                  </div>

                  {/* Code snippet if any */}
                  {item.exampleSnippet && (
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[10px] text-emerald-400 overflow-x-auto">
                      <code>{item.exampleSnippet}</code>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800/70"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
