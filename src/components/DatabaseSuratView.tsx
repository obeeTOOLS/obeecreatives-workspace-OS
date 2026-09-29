import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Printer,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  Building,
  User,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { OfficialLetter, LetterCategory, ClientItem } from '../types';

interface DatabaseSuratViewProps {
  letters: OfficialLetter[];
  clients: ClientItem[];
  onAddLetter: (letter: OfficialLetter) => void;
  onUpdateLetter: (letter: OfficialLetter) => void;
}

export const DatabaseSuratView: React.FC<DatabaseSuratViewProps> = ({
  letters,
  clients,
  onAddLetter,
  onUpdateLetter
}) => {
  const [activeTab, setActiveTab] = useState<'archive' | 'generator'>('archive');
  const [selectedLetter, setSelectedLetter] = useState<OfficialLetter | null>(letters[0] || null);

  // Generator form
  const [genCategory, setGenCategory] = useState<LetterCategory>('MOU');
  const [genTitle, setGenTitle] = useState('MoU Kerjasama Pembuatan Konten Media Sosial');
  const [genClientName, setGenClientName] = useState(clients[0]?.contactName || 'Rian Pratama');
  const [genClientCompany, setGenClientCompany] = useState(clients[0]?.company || 'PT Bumi Berkah Boga');
  const [genEffectiveDate, setGenEffectiveDate] = useState('2026-10-01');
  const [genExpiryDate, setGenExpiryDate] = useState('2027-09-30');
  const [genContractValue, setGenContractValue] = useState(294000000);
  const [genScope, setGenScope] = useState('Produksi rutin 16 video Reels, 8 carousel, konsep ideation, shooting, dan reporting bulanan.');
  const [genCreatorSigner, setGenCreatorSigner] = useState('Fajar Nugraha (Creative Director & Founder)');

  // Roman month helper
  const getRomanMonth = (monthIndex: number): string => {
    const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    return romanMonths[monthIndex] || 'IX';
  };

  const currentYear = new Date().getFullYear();
  const currentMonthRoman = getRomanMonth(new Date().getMonth());

  // Generate next auto-number
  const nextSeq = String(letters.length + 1).padStart(3, '0');
  const previewLetterNumber = `${nextSeq}/OC-${genCategory}/${currentMonthRoman}/${currentYear}`;

  const handleGenerateLetter = (e: React.FormEvent) => {
    e.preventDefault();
    const newLetter: OfficialLetter = {
      id: `let-${Date.now().toString().slice(-4)}`,
      letterNumber: previewLetterNumber,
      category: genCategory,
      title: genTitle,
      recipientName: genClientName,
      recipientCompany: genClientCompany,
      dateCreated: new Date().toISOString().slice(0, 10),
      effectiveDate: genEffectiveDate,
      expiryDate: genExpiryDate,
      status: 'Signed',
      contractValue: genContractValue,
      scopeSummary: genScope,
      generatedBy: genCreatorSigner
    };

    onAddLetter(newLetter);
    setSelectedLetter(newLetter);
    setActiveTab('archive');
  };

  return (
    <div className="space-y-6">
      {/* Switcher Tab */}
      <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg self-start">
        <button
          onClick={() => setActiveTab('archive')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'archive'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText size={14} />
          <span>Arsip Surat & Kontrak ({letters.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'generator'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Plus size={14} />
          <span>Buat Nomor & Dokumen Baru</span>
        </button>
      </div>

      {activeTab === 'archive' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Letters Table */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xs">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">Database Penomoran Surat Resmi</h3>
                <p className="text-xs text-slate-400">MoU, NDA, SPK & Perjanjian Kerjasama Agensi</p>
              </div>
              <button
                onClick={() => setActiveTab('generator')}
                className="flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded transition-colors shadow-md shadow-red-600/30"
              >
                <Plus size={13} />
                <span>Surat Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Nomor Surat</th>
                    <th className="py-3 px-4">Tipe</th>
                    <th className="py-3 px-4">Klien / Lembaga</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {letters.map((letItem) => {
                    const isSelected = selectedLetter?.id === letItem.id;
                    return (
                      <tr
                        key={letItem.id}
                        onClick={() => setSelectedLetter(letItem)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-red-600/10' : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-bold text-red-500">
                          {letItem.letterNumber}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                          {letItem.category}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-100 truncate max-w-[180px]">
                            {letItem.recipientCompany}
                          </div>
                          <div className="text-[11px] text-slate-400">{letItem.recipientName}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                              letItem.status === 'Signed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {letItem.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLetter(letItem);
                            }}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded"
                          >
                            Buka
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Live Official Document Preview Sheet */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-xl p-6 shadow-xl border border-slate-200 text-xs space-y-4">
            {selectedLetter ? (
              <>
                {/* Official Letterhead */}
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
                  <div>
                    <h2 className="text-base font-black tracking-tight text-slate-950 uppercase">
                      obeecreatives
                    </h2>
                    <p className="text-[10px] text-slate-600 font-medium">
                      PT OBEE REKACIPTA NUSANTARA
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Jl. Gunawarman No. 24, Kebayoran Baru, Jakarta Selatan 12180
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-amber-600 font-mono">
                      OFFICIAL CONTRACT
                    </span>
                    <p className="font-mono text-[10px] text-slate-700 font-bold">
                      {selectedLetter.letterNumber}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center py-1">
                  <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900 underline">
                    {selectedLetter.title}
                  </h3>
                  <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                    Nomor: {selectedLetter.letterNumber}
                  </p>
                </div>

                {/* Opening statement */}
                <p className="text-[11px] leading-relaxed text-slate-700">
                  Pada hari ini, disepakati perjanjian kemitraan operasional dan produksi kreatif antara{' '}
                  <strong>PT OBEE REKACIPTA NUSANTARA</strong> (&ldquo;Pihak Pertama&rdquo;) dengan:{' '}
                  <strong>{selectedLetter.recipientCompany}</strong> diwakili oleh Sdr/i.{' '}
                  <strong>{selectedLetter.recipientName}</strong> (&ldquo;Pihak Kedua&rdquo;).
                </p>

                {/* Scope of Work */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-[11px] space-y-1">
                  <strong className="block text-slate-800 text-[10px] uppercase tracking-wider">
                    Ruang Lingkup Pekerjaan (Scope of Work):
                  </strong>
                  <p className="text-slate-600 leading-normal">{selectedLetter.scopeSummary}</p>
                  {selectedLetter.contractValue ? (
                    <div className="pt-1.5 border-t border-slate-200 text-slate-800 font-semibold font-mono">
                      Nilai Kontrak: Rp {selectedLetter.contractValue.toLocaleString('id-ID')}
                    </div>
                  ) : null}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600">
                  <div>
                    Mulai Berlaku:{' '}
                    <span className="font-bold text-slate-800">{selectedLetter.effectiveDate}</span>
                  </div>
                  <div>
                    Berakhir:{' '}
                    <span className="font-bold text-slate-800">
                      {selectedLetter.expiryDate || 'Hingga selesai'}
                    </span>
                  </div>
                </div>

                {/* Signatures */}
                <div className="pt-4 grid grid-cols-2 gap-4 text-center text-[10px] border-t border-slate-200">
                  <div>
                    <p className="font-bold text-slate-800">Pihak Pertama (Agensi)</p>
                    <div className="h-12 flex items-center justify-center text-amber-700 font-mono text-[9px]">
                      [SIGNED DIGITALLY - OBEE]
                    </div>
                    <p className="font-semibold text-slate-900 border-t border-slate-300 pt-1">
                      {selectedLetter.generatedBy}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Pihak Kedua (Klien)</p>
                    <div className="h-12 flex items-center justify-center text-emerald-700 font-mono text-[9px]">
                      [SIGNED DIGITALLY - CLIENT]
                    </div>
                    <p className="font-semibold text-slate-900 border-t border-slate-300 pt-1">
                      {selectedLetter.recipientName}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400">Pilih surat untuk melihat preview</div>
            )}
          </div>
        </div>
      ) : (
        /* GENERATOR FORM VIEW */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-100">Generator Penomoran & Surat Resmi</h3>
            <p className="text-xs text-slate-400">
              Sistem akan membuat nomor otomatis terstandarisasi format agensi Obeecreatives
            </p>
          </div>

          <form onSubmit={handleGenerateLetter} className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-between">
              <div>
                <span className="text-[11px] block text-amber-400 font-medium">Nomor Surat Otomatis Berikutnya:</span>
                <span className="text-base font-bold font-mono text-amber-300">{previewLetterNumber}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 bg-amber-400/20 rounded font-semibold uppercase">
                Format V2
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Kategori Dokumen Surat</label>
                <select
                  value={genCategory}
                  onChange={(e) => setGenCategory(e.target.value as LetterCategory)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                >
                  <option value="MOU">MoU (Memorandum of Understanding)</option>
                  <option value="NDA">NDA (Non-Disclosure Agreement)</option>
                  <option value="SPK">SPK (Surat Perintah Kerja)</option>
                  <option value="KTR">Kontrak Kerjasama Retainer</option>
                  <option value="PFW">Surat Penawaran / Proposal</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Judul Dokumen Resmi</label>
                <input
                  required
                  type="text"
                  value={genTitle}
                  onChange={(e) => setGenTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Perusahaan Klien (Pihak Kedua)</label>
                <input
                  required
                  type="text"
                  value={genClientCompany}
                  onChange={(e) => setGenClientCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Perwakilan PIC</label>
                <input
                  required
                  type="text"
                  value={genClientName}
                  onChange={(e) => setGenClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Tanggal Mulai</label>
                <input
                  type="date"
                  value={genEffectiveDate}
                  onChange={(e) => setGenEffectiveDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Tanggal Selesai</label>
                <input
                  type="date"
                  value={genExpiryDate}
                  onChange={(e) => setGenExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nilai Kontrak (IDR)</label>
                <input
                  type="number"
                  value={genContractValue}
                  onChange={(e) => setGenContractValue(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Ringkasan Ruang Lingkup (Scope of Work)</label>
              <textarea
                rows={3}
                value={genScope}
                onChange={(e) => setGenScope(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <CheckCircle2 size={16} />
              <span>Simpan ke Database Surat & Terbitkan Nomor</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
