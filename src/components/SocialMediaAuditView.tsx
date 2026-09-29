import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Share2,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  Heart,
  Bookmark,
  Printer
} from 'lucide-react';
import { SocialMediaAuditData } from '../types';

export const SocialMediaAuditView: React.FC = () => {
  const [data, setData] = useState<SocialMediaAuditData>({
    clientHandle: '@kopikenangan.id',
    clientBrand: 'Kopi Kenangan Mantan',
    platform: 'Instagram',
    followers: 840000,
    avgLikes: 14200,
    avgComments: 480,
    avgSharesSaves: 2100,
    postingFreqWeekly: 5,
    scores: {
      hookStrength: 8,
      visualConsistency: 9,
      captionQuality: 8,
      ctaEffectiveness: 7,
      storytelling: 8
    },
    notes: 'Kuat di branding visual & relatable humor. Potensi optimasi: perbanyak user-generated content (UGC) barista & CTA saveable menu resep.'
  });

  const [copied, setCopied] = useState(false);

  // Engagement Rate (ER%) Calculation
  const totalInteractions = data.avgLikes + data.avgComments + data.avgSharesSaves;
  const engagementRate = data.followers > 0 ? (totalInteractions / data.followers) * 100 : 0;

  // Average pillar score
  const avgPillarScore =
    (data.scores.hookStrength +
      data.scores.visualConsistency +
      data.scores.captionQuality +
      data.scores.ctaEffectiveness +
      data.scores.storytelling) /
    5;

  const getBenchmark = (er: number) => {
    if (er < 1.2) {
      return {
        label: 'Underperforming (<1.2%)',
        color: 'text-rose-400',
        badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
        advice: 'Tingkatkan retensi 3 detik awal video dan perbaiki relevansi konten dengan audiens target.'
      };
    }
    if (er <= 3.5) {
      return {
        label: 'Healthy & Standard (1.5% - 3.5%)',
        color: 'text-amber-400',
        badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        advice: 'Engagement stabil di atas rata-rata industri. Rekomendasi: tingkatkan shareable content untuk ekspansi reach organik.'
      };
    }
    return {
      label: 'High Performance / Viral (>3.5%)',
      color: 'text-emerald-400',
      badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      advice: 'Performa sangat tinggi! Momentum viral siap dimonetisasi untuk konversi penjualan langsung.'
    };
  };

  const benchmark = getBenchmark(engagementRate);

  const handleCopyReport = () => {
    const reportText = `HASIL AUDIT MEDIA SOSIAL - OBEECREATIVES AGENTS
Target Akun: ${data.clientHandle} (${data.clientBrand})
Platform: ${data.platform}
Total Pengikut: ${data.followers.toLocaleString('id-ID')}
Rata-rata Interaksi per Post: ${totalInteractions.toLocaleString('id-ID')}
Engagement Rate (ER%): ${engagementRate.toFixed(2)}% [${benchmark.label}]
Pilar Konten Score: ${avgPillarScore.toFixed(1)}/10
- Hook Strength: ${data.scores.hookStrength}/10
- Visual Consistency: ${data.scores.visualConsistency}/10
- Caption Quality: ${data.scores.captionQuality}/10
- CTA Effectiveness: ${data.scores.ctaEffectiveness}/10
- Storytelling: ${data.scores.storytelling}/10
Rekomendasi Strategis Agensi:
${benchmark.advice}
Catatan Tambahan: ${data.notes}
Audit Resmi oleh: Obeecreatives Social Media Lab`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100">
            Form Audit Media Sosial & Analisis Engagement Klien
          </h2>
          <p className="text-xs text-slate-400">
            Kalkulator ER%, benchmark industri, dan generator laporan strategi pitching
          </p>
        </div>

        <button
          onClick={handleCopyReport}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-red-600/30 self-start"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Audit Tersalin!' : 'Copy Ringkasan Audit Klien'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 text-xs border-l-4 border-l-red-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Username / Akun Medsos</label>
              <input
                type="text"
                value={data.clientHandle}
                onChange={(e) => setData({ ...data, clientHandle: e.target.value })}
                placeholder="@username"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Nama Brand Calon Klien</label>
              <input
                type="text"
                value={data.clientBrand}
                onChange={(e) => setData({ ...data, clientBrand: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Platform Utama</label>
              <select
                value={data.platform}
                onChange={(e) => setData({ ...data, platform: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              >
                <option value="Instagram">Instagram (@)</option>
                <option value="TikTok">TikTok (@)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Jumlah Pengikut (Followers)</label>
              <input
                type="number"
                value={data.followers}
                onChange={(e) => setData({ ...data, followers: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Interactions Breakdown */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <span className="font-bold text-slate-200 block">
              Metrik Interaksi Rata-Rata per Postingan (Sample 10 Konten Terakhir)
            </span>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Rata-rata Likes</label>
                <input
                  type="number"
                  value={data.avgLikes}
                  onChange={(e) => setData({ ...data, avgLikes: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Rata-rata Komentar</label>
                <input
                  type="number"
                  value={data.avgComments}
                  onChange={(e) => setData({ ...data, avgComments: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Shares & Saves</label>
                <input
                  type="number"
                  value={data.avgSharesSaves}
                  onChange={(e) => setData({ ...data, avgSharesSaves: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Content Pillar Health Sliders */}
          <div className="space-y-3 pt-2">
            <span className="font-bold text-slate-200 block">
              Skor Kualitas Pilar Konten (Skala 1 - 10)
            </span>

            {[
              { key: 'hookStrength', label: 'Hook & Visual Movement (3 Detik Awal)' },
              { key: 'visualConsistency', label: 'Konsistensi Estetika & Color Grading' },
              { key: 'captionQuality', label: 'Copywriting Caption & Relevansi Cerita' },
              { key: 'ctaEffectiveness', label: 'Kejelasan Call To Action (CTA)' },
              { key: 'storytelling', label: 'Kedalaman Emosi & Relatability Audiens' }
            ].map((pillar) => (
              <div key={pillar.key} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>{pillar.label}:</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {(data.scores as any)[pillar.key]}/10
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={(data.scores as any)[pillar.key]}
                  onChange={(e) =>
                    setData({
                      ...data,
                      scores: { ...data.scores, [pillar.key]: Number(e.target.value) }
                    })
                  }
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Catatan Diagnosa & Kesempatan Pertumbuhan (Opportunity)
            </label>
            <textarea
              rows={2}
              value={data.notes}
              onChange={(e) => setData({ ...data, notes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Right: Generated Audit Presentation Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  OBEECREATIVES AUDIT CARD
                </span>
                <h3 className="text-lg font-bold text-slate-100">{data.clientBrand}</h3>
                <p className="font-mono text-xs text-slate-400">{data.clientHandle} · {data.platform}</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                {data.followers.toLocaleString('id-ID')} Followers
              </span>
            </div>

            {/* Engagement Rate Hero Metric */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Calculated Engagement Rate</span>
                <div className="text-3xl font-black font-mono text-amber-400">
                  {engagementRate.toFixed(2)}%
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                  {totalInteractions.toLocaleString('id-ID')} interaksi / post
                </span>
              </div>

              <div className="text-right">
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${benchmark.badge}`}>
                  {benchmark.label}
                </span>
              </div>
            </div>

            {/* Pillar Breakdown Visual Progress */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-300 block">Indeks Kesehatan Konten</span>
              
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Hook & Retensi</span>
                  <span className="font-mono font-bold text-slate-100">{data.scores.hookStrength}/10</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Estetika Visual</span>
                  <span className="font-mono font-bold text-slate-100">{data.scores.visualConsistency}/10</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Copywriting</span>
                  <span className="font-mono font-bold text-slate-100">{data.scores.captionQuality}/10</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Call to Action</span>
                  <span className="font-mono font-bold text-slate-100">{data.scores.ctaEffectiveness}/10</span>
                </div>
              </div>
            </div>

            {/* Agency Strategic Recommendation */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Rekomendasi Tindakan Agensi Obeecreatives</span>
              </span>
              <p className="text-amber-200 leading-relaxed">{benchmark.advice}</p>
              {data.notes && <p className="text-slate-400 text-[11px] pt-1 border-t border-amber-500/20">{data.notes}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
