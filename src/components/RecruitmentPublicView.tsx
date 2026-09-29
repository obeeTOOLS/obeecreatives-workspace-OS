import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  CheckCircle2,
  Briefcase,
  ExternalLink,
  Upload,
  ArrowRight,
  Globe
} from 'lucide-react';
import { RecruitmentCandidate } from '../types';

interface RecruitmentPublicViewProps {
  onSubmitApplication: (candidate: Omit<RecruitmentCandidate, 'id' | 'stage' | 'scores' | 'appliedDate'>) => void;
}

export const RecruitmentPublicView: React.FC<RecruitmentPublicViewProps> = ({
  onSubmitApplication
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+62 ');
  const [appliedRole, setAppliedRole] = useState('Senior Video Editor');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [experienceYears, setExperienceYears] = useState(2);
  const [expectedSalary, setExpectedSalary] = useState(7500000);
  const [notes, setNotes] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const roles = [
    {
      title: 'Senior Video Editor',
      type: 'Full-time / Freelance',
      desc: 'Menguasai pacing dinamis Reels/TikTok, DaVinci Resolve, motion graphics sound design.'
    },
    {
      title: 'Videographer & Lighting Specialist',
      type: 'Full-time (Jakarta HQ)',
      desc: 'Berpengalaman mengoperasikan Sony FX3 / A7S3, studio lighting C-stand, dan food/beauty macro.'
    },
    {
      title: 'Social Media Strategist & Copywriter',
      type: 'Full-time',
      desc: 'Merancang hook 3 detik, riset tren audio, storytelling F&B, dan content calendar bulanan.'
    },
    {
      title: 'Graphic & Packaging Designer',
      type: 'Project-based / Retainer',
      desc: 'Mendesain carousel edukasi, mockup packaging cetak, ilustrasi vektor, dan branding toolkit.'
    },
    {
      title: 'On-Camera Talent / Creator Host',
      type: 'Freelance per Konten',
      desc: 'Percaya diri di depan kamera, artikulasi luwes, pembawaan ceria dan relatable anak muda.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `OC-APP-${Date.now().toString().slice(-4)}`;
    onSubmitApplication({
      fullName,
      email,
      phone,
      appliedRole,
      portfolioUrl,
      experienceYears: Number(experienceYears),
      expectedSalary: Number(expectedSalary),
      notes: notes || 'Pendaftaran tim baru via portal publik Obeecreatives.'
    });

    setSubmittedRef(refCode);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Brand Hero Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-mono font-semibold">
          <Sparkles size={13} />
          <span>Obeecreatives Creative Talent Network</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          Bergabung Bersama Agensi Kreatif <span className="text-white">obee</span><span className="text-red-600">creatives</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Kami memproduksi konten media sosial, video komersial, dan perancangan kemasan untuk brand terdepan di Indonesia. Tunjukkan portofolio terbaikmu!
        </p>
      </div>

      {submittedRef ? (
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 shadow-xl">
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Aplikasi Pendaftaran Berhasil Dikirim!
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Terima kasih telah mendaftar, <strong>{fullName}</strong>. Tim kurator kreatif kami akan mereview portofoliomu. Kode referensi aplikasi pendaftaranmu:
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 inline-block font-mono text-amber-400 font-bold text-sm">
            {submittedRef}
          </div>
          <div className="pt-4">
            <button
              onClick={() => {
                setSubmittedRef(null);
                setFullName('');
                setPortfolioUrl('');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
            >
              Kirim Aplikasi Lainnya
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Open Roles */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider text-xs">
                Posisi Terbuka Saat Ini
              </h3>
              <span className="text-[11px] font-mono text-amber-400">{roles.length} Posisi</span>
            </div>

            <div className="space-y-2.5">
              {roles.map((r, i) => (
                <div
                  key={i}
                  onClick={() => setAppliedRole(r.title)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    appliedRole === r.title
                      ? 'bg-slate-900 border-red-500 shadow-md shadow-red-500/10 border-l-4 border-l-red-600'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-100">{r.title}</h4>
                    <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                      {r.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Application Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs shadow-xl space-y-5 border-l-4 border-l-red-600">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Formulir Pendaftaran Tim Kreatif</h3>
              <p className="text-[11px] text-slate-400">
                Lengkapi tautan portofolio (Google Drive, Behance, TikTok, atau YouTube)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Lengkap</label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama sesuai KTP / Portofolio"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Aktif</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@gmail.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nomor WhatsApp</label>
                  <input
                    required
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Posisi yang Dilamar</label>
                <select
                  value={appliedRole}
                  onChange={(e) => setAppliedRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                >
                  {roles.map((r, i) => (
                    <option key={i} value={r.title}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Link Portofolio Utama (Wajib)
                </label>
                <input
                  required
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://behance.net/username atau link Google Drive video"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400 font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Pastikan akses link Google Drive / Notion diset ke &ldquo;Anyone with the link can view&rdquo;
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Pengalaman (Tahun)</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Ekspektasi Fee / Gaji (IDR)</label>
                  <input
                    type="number"
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Kenapa kamu tertarik bergabung dengan obeecreatives?
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ceritakan passion kreatifmu & gaya kerja tim yang kamu sukai..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <Send size={15} />
                <span>Kirimkan Aplikasi Portofolio</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
