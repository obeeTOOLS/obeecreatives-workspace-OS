import React, { useState } from 'react';
import {
  UserPlus,
  ExternalLink,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  Video,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { RecruitmentCandidate } from '../types';

interface RecruitmentAdminViewProps {
  candidates: RecruitmentCandidate[];
  onUpdateCandidate: (c: RecruitmentCandidate) => void;
}

export const RecruitmentAdminView: React.FC<RecruitmentAdminViewProps> = ({
  candidates,
  onUpdateCandidate
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<RecruitmentCandidate | null>(
    candidates[0] || null
  );
  const [stageFilter, setStageFilter] = useState<string>('all');

  const stages = ['Applied', 'Portfolio Review', 'Interview', 'Offered', 'Rejected'] as const;

  const filtered = candidates.filter((c) => {
    if (stageFilter !== 'all' && c.stage !== stageFilter) return false;
    return true;
  });

  const handleStageChange = (newStage: RecruitmentCandidate['stage']) => {
    if (!selectedCandidate) return;
    const updated = { ...selectedCandidate, stage: newStage };
    onUpdateCandidate(updated);
    setSelectedCandidate(updated);
  };

  const handleScoreChange = (type: 'aesthetic' | 'technical' | 'culture', value: number) => {
    if (!selectedCandidate) return;
    const updated = {
      ...selectedCandidate,
      scores: {
        ...selectedCandidate.scores,
        [type]: value
      }
    };
    onUpdateCandidate(updated);
    setSelectedCandidate(updated);
  };

  const handleScheduleInterview = (date: string, meetLink: string) => {
    if (!selectedCandidate) return;
    const updated = {
      ...selectedCandidate,
      interviewDate: date,
      meetLink: meetLink,
      stage: 'Interview' as const
    };
    onUpdateCandidate(updated);
    setSelectedCandidate(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100">
            Recruitment Admin & Talent Pipeline
          </h2>
          <p className="text-xs text-slate-400">
            Seleksi kurasi portofolio, scoring matrix, dan penjadwalan interview kreator baru
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Filter Tahap:</span>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="all">Semua Tahap ({candidates.length})</option>
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Candidates Pipeline Cards */}
        <div className="lg:col-span-6 space-y-3">
          {filtered.map((c) => {
            const isSelected = selectedCandidate?.id === c.id;
            const avgScore = ((c.scores.aesthetic + c.scores.technical + c.scores.culture) / 3).toFixed(1);

            return (
              <div
                key={c.id}
                onClick={() => setSelectedCandidate(c)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400/80 shadow-md shadow-amber-400/5'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{c.fullName}</h4>
                    <p className="text-xs text-amber-400 font-semibold">{c.appliedRole}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Pengalaman: {c.experienceYears} Thn · Harapan Fee: Rp {(c.expectedSalary / 1000000).toFixed(1)}M
                    </p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      c.stage === 'Offered'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : c.stage === 'Interview'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : c.stage === 'Rejected'
                        ? 'bg-rose-500/10 text-rose-400'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {c.stage}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={13} className="fill-amber-400" />
                    <span className="font-mono font-bold text-[11px]">{avgScore} / 10</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[10px]">{c.appliedDate}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Candidate Detail & Scoring Matrix */}
        {selectedCandidate ? (
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5 text-xs">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100">{selectedCandidate.fullName}</h3>
                <p className="text-xs text-amber-400 font-semibold">{selectedCandidate.appliedRole}</p>
                <div className="flex items-center gap-3 text-slate-400 text-[11px] mt-1">
                  <span>{selectedCandidate.email}</span>
                  <span>·</span>
                  <span>{selectedCandidate.phone}</span>
                </div>
              </div>

              {selectedCandidate.portfolioUrl && (
                <a
                  href={selectedCandidate.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg border border-slate-700 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>Buka Portofolio</span>
                </a>
              )}
            </div>

            {/* Stage Selector Pills */}
            <div>
              <span className="text-slate-400 font-medium block mb-1.5">Ubah Status Pipeline</span>
              <div className="flex flex-wrap gap-1.5">
                {stages.map((stg) => (
                  <button
                    key={stg}
                    onClick={() => handleStageChange(stg)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      selectedCandidate.stage === stg
                        ? 'bg-red-600 text-white font-bold shadow-xs'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            </div>

            {/* Scoring Matrix */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="font-bold text-slate-200 block">
                Matrix Scoring Portofolio Kreator (1 - 10)
              </span>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Estetika & Taste Visual (Pacing, Grading):</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {selectedCandidate.scores.aesthetic}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={selectedCandidate.scores.aesthetic}
                    onChange={(e) => handleScoreChange('aesthetic', Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Technical Skill & Tool Mastery (Premiere, DaVinci):</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {selectedCandidate.scores.technical}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={selectedCandidate.scores.technical}
                    onChange={(e) => handleScoreChange('technical', Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Work Ethic & Culture Fit Agensi:</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {selectedCandidate.scores.culture}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={selectedCandidate.scores.culture}
                    onChange={(e) => handleScoreChange('culture', Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Interview Scheduler */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Video size={14} className="text-blue-400" />
                <span>Jadwal Wawancara (Google Meet)</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Tanggal & Waktu</label>
                  <input
                    type="text"
                    defaultValue={selectedCandidate.interviewDate || '2026-10-02 14:00 WIB'}
                    onBlur={(e) =>
                      handleScheduleInterview(e.target.value, selectedCandidate.meetLink || 'https://meet.google.com/obee-interview')
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Link Google Meet</label>
                  <input
                    type="text"
                    defaultValue={selectedCandidate.meetLink || 'https://meet.google.com/obee-interview'}
                    onBlur={(e) =>
                      handleScheduleInterview(selectedCandidate.interviewDate || '2026-10-02 14:00', e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <span className="font-bold text-slate-300 block mb-1">Catatan Interviewer</span>
              <p className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                {selectedCandidate.notes}
              </p>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-xs">
            Pilih kandidat dari daftar untuk melihat portfolio & scoring matrix
          </div>
        )}
      </div>
    </div>
  );
};
