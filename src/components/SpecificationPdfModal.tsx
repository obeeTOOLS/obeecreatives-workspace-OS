import React, { useRef } from 'react';
import {
  Printer,
  Download,
  X,
  FileText,
  CheckCircle2,
  Code,
  Palette,
  Shield,
  Layers,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';

interface SpecificationPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecificationPdfModal: React.FC<SpecificationPdfModalProps> = ({
  isOpen,
  onClose
}) => {
  const printAreaRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    if (!printAreaRef.current) return;
    const content = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Obeecreatives Workspace OS - Standar Pengembangan Web Apps</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #1e293b; line-height: 1.6; }
    h1, h2, h3 { color: #0f172a; }
    .brand-red { color: #dc2626; font-weight: 800; }
    .brand-white { color: #0f172a; font-weight: 800; }
    .header-bar { border-bottom: 3px solid #dc2626; padding-bottom: 15px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
    .tag { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; margin-right: 6px; }
    .tag-red { background: #fee2e2; color: #dc2626; }
    .tag-green { background: #dcfce7; color: #16a34a; }
    .tag-gray { background: #f1f5f9; color: #475569; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 13px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; }
    th { background: #f8fafc; font-weight: 700; }
    pre { background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 8px; font-size: 12px; overflow-x: auto; font-family: monospace; }
    .callout { border-left: 4px solid #dc2626; background: #fff1f2; padding: 12px 16px; border-radius: 4px; margin: 15px 0; font-size: 13px; }
    @media print {
      body { margin: 15mm; font-size: 11pt; }
      .no-print { display: none; }
      .page-break { page-break-before: always; }
    }
  </style>
</head>
<body>
  ${printAreaRef.current.innerHTML}
</body>
</html>`;

    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Obeecreatives_Web_Apps_Standard_Spec_${new Date().toISOString().slice(0, 10)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Top Control Bar (Screen Only) */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 print:hidden shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Dokumen Standar Pengembangan Web Apps Obeecreatives</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600/10 text-red-400 border border-red-500/20">
                  PDF Export Ready
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Pilih Cetak / Simpan sebagai PDF pada dialog printer browser
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadHtml}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Download dokumen HTML mandiri"
            >
              <Download size={13} className="text-red-400" />
              <span>Download File HTML</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-colors"
            >
              <Printer size={14} />
              <span>Cetak / Unduh PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document View Container */}
        <div className="overflow-y-auto flex-1 p-6 md:p-10 bg-slate-950 text-slate-200 text-xs print:p-0 print:bg-white print:text-slate-900">
          <div
            ref={printAreaRef}
            className="max-w-3xl mx-auto bg-slate-900 print:bg-white p-8 md:p-12 rounded-2xl border border-slate-800 print:border-none print:p-0 shadow-lg space-y-8"
          >
            {/* Document Header */}
            <div className="border-b-2 border-red-600 pb-5 flex justify-between items-start">
              <div>
                <div className="text-2xl font-black tracking-tight leading-none">
                  <span className="text-white print:text-slate-950">obee</span>
                  <span className="text-red-600">creatives</span>
                </div>
                <div className="text-xs font-medium text-slate-400 print:text-slate-600 mt-1">
                  PT OBEE REKACIPTA NUSANTARA — WORKSPACE OS
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Jl. Gunawarman No. 24, Kebayoran Baru, Jakarta Selatan 12180
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase font-bold text-red-500 bg-red-500/10 print:bg-red-100 px-2 py-0.5 rounded">
                  DOC-STD-2026/OC-DEV-V2
                </span>
                <p className="text-[10px] text-slate-400 print:text-slate-600 font-mono mt-1">
                  Versi 2.4.0 · September 2026
                </p>
                <p className="text-[10px] text-emerald-400 print:text-emerald-700 font-semibold font-mono">
                  STATUS: RESMI & TERVERIFIKASI
                </p>
              </div>
            </div>

            {/* Document Title Banner */}
            <div className="text-center py-2 space-y-1">
              <h1 className="text-lg md:text-xl font-black text-white print:text-slate-950 uppercase tracking-wide">
                BUKU PANDUAN & STANDAR PENGEMBANGAN WEB APPS (WORKSPACE OS)
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600 max-w-xl mx-auto">
                Spesifikasi Arsitektur Ekosistem, Standar Identitas Visual Desain (Design Tokens), Manajemen Hak Akses (RBAC), dan Protokol Integrasi Google Apps Script V2 (GAS V2)
              </p>
            </div>

            {/* Section 1: Overview & Ekosistem 11 Modul */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white print:text-slate-950 uppercase tracking-wider border-b border-slate-800 print:border-slate-300 pb-1">
                <span className="h-4 w-1.5 bg-red-600 rounded-full"></span>
                <span>1. Struktur Arsitektur & Hirarki 11 Modul</span>
              </div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Obeecreatives Workspace OS menggantikan tautan spreadsheet terpisah menjadi satu portal web terpadu dengan navigasi dual (*Rail Mode* 72px & *Expanded* 260px). Setiap aplikasi baru yang dibangun wajib masuk ke dalam salah satu dari 4 pilar operasional berikut:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-slate-950/70 print:bg-slate-50 border border-slate-800 print:border-slate-200 border-l-4 border-l-red-600">
                  <strong className="text-white print:text-slate-900 block text-xs mb-1">
                    A. Core Operations (Operasional Inti)
                  </strong>
                  <ul className="text-[11px] text-slate-400 print:text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>Project Control</strong>: Produksi konten, 4 view (Kanban, Tabel, Kalender, Timeline), verifikasi Hook 3s & caption, perhitungan fee kreator & export payroll.</li>
                    <li><strong>CRM Clients Hub</strong>: Source of truth klien, filter default divisi *Social Media Management*, prioritas nama perusahaan, kuota retainers.</li>
                    <li><strong>Database Staff & HR</strong>: Direktori tim, matriks rate card per format, sistem Presensi GPS (geofence HQ Senopati radius 150m, mode WFO/WFH/Shoot, selfie).</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 print:bg-slate-50 border border-slate-800 print:border-slate-200 border-l-4 border-l-red-600">
                  <strong className="text-white print:text-slate-900 block text-xs mb-1">
                    B. Finance & Legal (Admin Only)
                  </strong>
                  <ul className="text-[11px] text-slate-400 print:text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>Laporan Keuangan</strong>: Arus kas (Inflow/Outflow), mutasi kas, net margin agensi, dan Generator Invoice resmi ber-PPN 11%.</li>
                    <li><strong>Database Surat</strong>: Penomoran otomatis format <code>[No]/OC-[KODE]/[BULAN]/[TAHUN]</code>, arsip digital MoU, NDA, SPK & SPK.</li>
                    <li><strong>Documents Hub</strong>: Pusat navigasi SOP agensi, pitch decks, dan portal Quick Access seluruh tautan sistem.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 print:bg-slate-50 border border-slate-800 print:border-slate-200 border-l-4 border-l-red-600">
                  <strong className="text-white print:text-slate-900 block text-xs mb-1">
                    C. Creative Assets & Tools
                  </strong>
                  <ul className="text-[11px] text-slate-400 print:text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>Equipments Hub</strong>: Inventaris kamera Sony FX3, lensa GM, lighting, mic; log peminjaman & inspeksi fisik pengembalian.</li>
                    <li><strong>Logo & Packaging Builder</strong>: Kalkulator ukuran die-line (W×D×H mm), material kertas, simulasi wireframe 3D isometric box di canvas.</li>
                    <li><strong>Form Audit Media Sosial</strong>: Kalkulator ER% instan, benchmark industri, evaluasi 5 pilar konten, generate kartu audit untuk klien.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 print:bg-slate-50 border border-slate-800 print:border-slate-200 border-l-4 border-l-red-600">
                  <strong className="text-white print:text-slate-900 block text-xs mb-1">
                    D. People, Talent & Client Space
                  </strong>
                  <ul className="text-[11px] text-slate-400 print:text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>Recruitment Admin</strong>: Pipeline seleksi (Applied ➔ Portfolio ➔ Interview ➔ Offered), scoring rubric (1-10), jadwal Google Meet.</li>
                    <li><strong>Recruitment Obee</strong>: Portal pendaftaran publik untuk pelamar freelance dan full-time dengan konfirmasi nomor registrasi.</li>
                    <li><strong>Portal Approval Klien</strong>: Ruang review privat pihak brand untuk approve draft atau mengirim catatan revisi minor.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: Standar Identitas Warna & Design Tokens */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white print:text-slate-950 uppercase tracking-wider border-b border-slate-800 print:border-slate-300 pb-1">
                <span className="h-4 w-1.5 bg-red-600 rounded-full"></span>
                <span>2. Standar Identitas Warna (Design Tokens)</span>
              </div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Seluruh antarmuka web apps turunan obeecreatives <strong>wajib</strong> menggunakan aturan token warna berikut secara seragam tanpa modifikasi:
              </p>

              <table className="w-full text-left text-xs border border-slate-800 print:border-slate-300">
                <thead className="bg-slate-950 print:bg-slate-100 text-slate-400 print:text-slate-700">
                  <tr>
                    <th className="p-2 border border-slate-800 print:border-slate-300">Token Desain</th>
                    <th className="p-2 border border-slate-800 print:border-slate-300">Kode HEX</th>
                    <th className="p-2 border border-slate-800 print:border-slate-300">Tailwind Class</th>
                    <th className="p-2 border border-slate-800 print:border-slate-300">Aturan Penggunaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-200">
                  <tr>
                    <td className="p-2 font-bold text-white print:text-slate-950">Studio Obsidian</td>
                    <td className="p-2 font-mono">#090D16</td>
                    <td className="p-2 font-mono text-[11px]">bg-slate-950</td>
                    <td className="p-2 text-slate-400 print:text-slate-600">Background kanvas dasar seluruh aplikasi</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white print:text-slate-950">Structural Slate</td>
                    <td className="p-2 font-mono">#0F172A</td>
                    <td className="p-2 font-mono text-[11px]">bg-slate-900</td>
                    <td className="p-2 text-slate-400 print:text-slate-600">Background kartu, sidebar, dan container data</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-red-500">Obee Signature Red</td>
                    <td className="p-2 font-mono text-red-500">#DC2626</td>
                    <td className="p-2 font-mono text-[11px]">bg-red-600 / border-red-600</td>
                    <td className="p-2 text-slate-400 print:text-slate-600">Tombol CTA utama, tab aktif, dan left border kartu</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-red-400">Vibrant Red Accent</td>
                    <td className="p-2 font-mono text-red-400">#EF4444</td>
                    <td className="p-2 font-mono text-[11px]">hover:bg-red-500 / text-red-500</td>
                    <td className="p-2 text-slate-400 print:text-slate-600">Hover states, focus outline input, notification tag</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-emerald-400 print:text-emerald-700">Status Mint Green</td>
                    <td className="p-2 font-mono">#10B981</td>
                    <td className="p-2 font-mono text-[11px]">text-emerald-400</td>
                    <td className="p-2 text-slate-400 print:text-slate-600">Badge 'Aktif', indikator verifikasi presensi & approval</td>
                  </tr>
                </tbody>
              </table>

              {/* 3 Core Rules */}
              <div className="p-4 bg-slate-950/80 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-300 space-y-2 text-xs">
                <strong className="text-white print:text-slate-900 block font-bold">
                  3 Aturan Wajib Komponen UI Obeecreatives:
                </strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-400 print:text-slate-700 leading-normal">
                  <li><strong>Logo Lockup</strong>: Teks <code>obee</code> berwarna putih/hitam tegas, diikuti <code>creatives</code> berwarna merah menyala <code>#DC2626</code>.</li>
                  <li><strong>Left Red Accent Stripe</strong>: Setiap kartu modul, entri dokumen, atau baris pipeline wajib memakai kelas <code>border-l-4 border-l-red-600</code>.</li>
                  <li><strong>Tipografi Tabular Numerik</strong>: Seluruh angka keuangan (Rp), tanggal, jam presensi GPS, dan persentase wajib memakai font monospace <code>JetBrains Mono</code> dengan kelas <code>tabular-nums</code>.</li>
                </ol>
              </div>
            </div>

            {/* Section 3: Manajemen Hak Akses (RBAC) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white print:text-slate-950 uppercase tracking-wider border-b border-slate-800 print:border-slate-300 pb-1">
                <span className="h-4 w-1.5 bg-red-600 rounded-full"></span>
                <span>3. Matriks Hak Akses (Role-Based Access Control)</span>
              </div>
              
              <table className="w-full text-left text-xs border border-slate-800 print:border-slate-300">
                <thead className="bg-slate-950 print:bg-slate-100 text-slate-400 print:text-slate-700">
                  <tr>
                    <th className="p-2 border border-slate-800 print:border-slate-300">Modul Operasional</th>
                    <th className="p-2 border border-slate-800 print:border-slate-300 text-center">Super Admin</th>
                    <th className="p-2 border border-slate-800 print:border-slate-300 text-center">Creator / Staff</th>
                    <th className="p-2 border border-slate-800 print:border-slate-300 text-center">Client Portal</th>
                    <th className="p-2 border border-slate-800 print:border-slate-300 text-center">Public Applicant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-200 text-center">
                  <tr>
                    <td className="p-2 text-left font-medium">Project Control & Kanban</td>
                    <td className="p-2 text-emerald-400 font-bold">FULL</td>
                    <td className="p-2 text-emerald-400 font-bold">FULL</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-slate-500">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-medium">CRM Clients Hub</td>
                    <td className="p-2 text-emerald-400 font-bold">FULL</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-slate-500">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-medium">Staff & Presensi GPS</td>
                    <td className="p-2 text-emerald-400 font-bold">FULL</td>
                    <td className="p-2 text-emerald-400 font-bold">CHECK-IN</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-slate-500">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-medium">Laporan Keuangan & Invoice</td>
                    <td className="p-2 text-emerald-400 font-bold">FULL</td>
                    <td className="p-2 text-rose-500 font-bold">LOCKED</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-slate-500">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-medium">Database Surat & Penomoran</td>
                    <td className="p-2 text-emerald-400 font-bold">FULL</td>
                    <td className="p-2 text-rose-500 font-bold">LOCKED</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-slate-500">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-medium">Equipments Hub (Studio Gear)</td>
                    <td className="p-2 text-emerald-400 font-bold">FULL</td>
                    <td className="p-2 text-rose-500 font-bold">LOCKED</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-slate-500">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-medium">Portal Approval Klien</td>
                    <td className="p-2 text-emerald-400 font-bold">VIEW</td>
                    <td className="p-2 text-emerald-400 font-bold">VIEW</td>
                    <td className="p-2 text-emerald-400 font-bold">APPROVE</td>
                    <td className="p-2 text-slate-500">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-medium">Portal Karir Publik</td>
                    <td className="p-2 text-emerald-400 font-bold">VIEW</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-slate-500">—</td>
                    <td className="p-2 text-emerald-400 font-bold">SUBMIT</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 4: Blueprint Integrasi Web Apps & GAS V2 Router */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white print:text-slate-950 uppercase tracking-wider border-b border-slate-800 print:border-slate-300 pb-1">
                <span className="h-4 w-1.5 bg-red-600 rounded-full"></span>
                <span>4. Blueprint Integrasi Google Apps Script (GAS V2)</span>
              </div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Untuk mencegah skrip menumpuk pada Google Spreadsheet, semua komunikasi data wajib menggunakan arsitektur <strong>Single Router V2</strong> dengan standar action-dispatching sebagai berikut:
              </p>

              <pre className="p-4 bg-slate-950 print:bg-slate-900 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto">
{`// STANDAR ROUTER GAS V2 (Google Apps Script Web App Endpoint)
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var action = payload.action;
    var data = payload.data;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    switch(action) {
      case 'syncProjects':
        return handleProjectsSync(ss, data);
      case 'recordAttendance':
        return handleAttendanceLog(ss, data);
      case 'generateInvoice':
        return handleInvoiceCreation(ss, data);
      case 'registerLetter':
        return handleLetterNumber(ss, data);
      default:
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Aksi "' + action + '" tidak terdaftar di Router V2'
        })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`}
              </pre>

              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300 print:text-red-800 space-y-1">
                <strong className="block font-bold">Protokol Penambahan Web App Baru:</strong>
                <p>1. Daftarkan entri baru di array <code>quickAccessList</code> pada file <code>src/components/DocumentsHubView.tsx</code>.</p>
                <p>2. Tambahkan navigasi pada kategori sidebar di <code>src/components/Sidebar.tsx</code>.</p>
                <p>3. Sambungkan endpoint GAS V2 via tombol ikon Database di Top Header.</p>
              </div>
            </div>

            {/* Section 5: Standar Responsif HP, Layar Penuh & PWA */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white print:text-slate-950 uppercase tracking-wider border-b border-slate-800 print:border-slate-300 pb-1">
                <span className="h-4 w-1.5 bg-red-600 rounded-full"></span>
                <span>5. Standar Mobile-First, Fullscreen Mode & PWA Installability</span>
              </div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Seluruh aplikasi dalam ekosistem obeecreatives dirancang agar nyaman digunakan di lapangan lewat smartphone (terutama saat presensi GPS dan review konten), laptop, maupun monitor studio:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-950/70 print:bg-slate-50 border border-slate-800 print:border-slate-200 border-l-4 border-l-red-600">
                  <strong className="text-white print:text-slate-900 block text-xs mb-1">
                    A. Mobile-First Navigation
                  </strong>
                  <p className="text-[11px] text-slate-400 print:text-slate-600 leading-normal">
                    Navigasi bawah <em>(Bottom Thumb Bar)</em> memudahkan perpindahan modul dengan jempol satu tangan. Sidebar desktop otomatis berubah menjadi <em>Slide-over Drawer</em> dengan overlay gelap pada layar &lt; 768px.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 print:bg-slate-50 border border-slate-800 print:border-slate-200 border-l-4 border-l-red-600">
                  <strong className="text-white print:text-slate-900 block text-xs mb-1">
                    B. Mode Layar Penuh (Fullscreen)
                  </strong>
                  <p className="text-[11px] text-slate-400 print:text-slate-600 leading-normal">
                    Dukungan HTML5 Fullscreen API pada tombol Maximize di header. Menghilangkan distraction bilah peramban untuk kebutuhan presentasi pitch deck klien, review video timeline, dan monitoring live status.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 print:bg-slate-50 border border-slate-800 print:border-slate-200 border-l-4 border-l-red-600">
                  <strong className="text-white print:text-slate-900 block text-xs mb-1">
                    C. PWA Installability (HP & PC)
                  </strong>
                  <p className="text-[11px] text-slate-400 print:text-slate-600 leading-normal">
                    Aplikasi memenuhi standar Progressive Web App dengan Web App Manifest (192px & 512px maskable icon), Service Worker precaching, prompt install in-app, serta panduan Add to Home Screen untuk iOS Safari.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6: Kamus & Glosarium Standar Istilah Pengembangan Web Apps */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white print:text-slate-950 uppercase tracking-wider border-b border-slate-800 print:border-slate-300 pb-1">
                <span className="h-4 w-1.5 bg-red-600 rounded-full"></span>
                <span>6. Kamus & Glosarium Standar Istilah Pengembangan Web Apps</span>
              </div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Daftar rujukan istilah teknis, nama fitur, dan konsep arsitektur yang <strong>wajib dipedomani</strong> pada pengembangan seluruh aplikasi di lingkungan ekosistem Obeecreatives:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 print:border-slate-300">
                  <thead className="bg-slate-950 print:bg-slate-100 text-slate-400 print:text-slate-700">
                    <tr>
                      <th className="p-2 border border-slate-800 print:border-slate-300 w-1/4">Nama Istilah / Fitur</th>
                      <th className="p-2 border border-slate-800 print:border-slate-300 w-1/6">Kategori</th>
                      <th className="p-2 border border-slate-800 print:border-slate-300">Definisi & Aturan Standar Implementasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 print:divide-slate-200">
                    {GLOSSARY_TERMS.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-950/40 print:hover:bg-transparent">
                        <td className="p-2 align-top font-bold text-white print:text-slate-900">
                          <div className="text-red-400 print:text-red-700 font-semibold">{item.term}</div>
                          {item.exampleSnippet && (
                            <code className="text-[10px] font-mono text-emerald-400 print:text-slate-600 block mt-1">
                              {item.exampleSnippet}
                            </code>
                          )}
                        </td>
                        <td className="p-2 align-top font-mono text-[10px] text-slate-400 print:text-slate-600">
                          {item.categoryLabel}
                        </td>
                        <td className="p-2 align-top space-y-1">
                          <p className="text-slate-300 print:text-slate-700 text-xs leading-relaxed">
                            {item.definition}
                          </p>
                          <p className="text-[11px] text-slate-400 print:text-slate-600">
                            <strong className="text-red-400 print:text-red-700">Aturan Standar: </strong>
                            {item.implementationRule}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Document Signatory Block */}
            <div className="pt-8 border-t border-slate-800 print:border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <p className="font-bold text-slate-400 print:text-slate-600">Disusun & Distandarisasi Oleh:</p>
                <div className="h-14 flex items-center justify-center font-mono text-red-500 font-bold text-sm">
                  OBEECREATIVES TECH LAB
                </div>
                <p className="font-bold text-white print:text-slate-900 border-t border-slate-800 print:border-slate-300 pt-1">
                  Lalu Mahendra / Lead Engineer
                </p>
                <p className="text-[10px] text-slate-500">PT Obee Rekacipta Nusantara</p>
              </div>

              <div>
                <p className="font-bold text-slate-400 print:text-slate-600">Disetujui Oleh:</p>
                <div className="h-14 flex items-center justify-center font-mono text-emerald-500 font-bold text-sm">
                  APPROVED DIGITAL SIGNATURE
                </div>
                <p className="font-bold text-white print:text-slate-900 border-t border-slate-800 print:border-slate-300 pt-1">
                  Fajar Nugraha / Creative Director
                </p>
                <p className="text-[10px] text-slate-500">Obeecreatives Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
