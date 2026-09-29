import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Eye,
  FileCheck,
  Building
} from 'lucide-react';
import { ProjectItem, ClientItem } from '../types';

interface ClientPortalViewProps {
  projects: ProjectItem[];
  clients: ClientItem[];
  onUpdateProject: (p: ProjectItem) => void;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  projects,
  clients,
  onUpdateProject
}) => {
  // Pick active client
  const [selectedBrandId, setSelectedBrandId] = useState(clients[0]?.id || '');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [revisionNote, setRevisionNote] = useState('');
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);

  const currentBrand = clients.find((c) => c.id === selectedBrandId) || clients[0];
  const brandProjects = projects.filter((p) => p.brandId === selectedBrandId);

  const pendingCount = brandProjects.filter((p) => p.clientApprovalStatus === 'pending').length;
  const approvedCount = brandProjects.filter((p) => p.clientApprovalStatus === 'approved').length;

  const handleApprove = (proj: ProjectItem) => {
    onUpdateProject({
      ...proj,
      clientApprovalStatus: 'approved',
      stage: proj.stage === 'review' ? 'approved' : proj.stage
    });
  };

  const handleRequestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    onUpdateProject({
      ...selectedProject,
      clientApprovalStatus: 'revision_requested',
      clientFeedback: revisionNote,
      stage: 'editing' // back to editing for team to address
    });

    setIsRevisionModalOpen(false);
    setRevisionNote('');
  };

  return (
    <div className="space-y-6">
      {/* Brand Selector & Client Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-red-600 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center font-bold">
            <Building size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100">{currentBrand?.company}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20 font-semibold">
                Client Portal
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Selamat datang di portal kurasi & persetujuan materi konten resmi Obeecreatives
            </p>
          </div>
        </div>

        {/* Brand Switcher for testing multiple client perspectives */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400">Pilih Brand:</span>
          <select
            value={selectedBrandId}
            onChange={(e) => setSelectedBrandId(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-red-500"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.company}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-red-600">
          <span className="text-xs text-slate-400 block mb-1">Menunggu Review Brand</span>
          <div className="text-2xl font-bold font-mono text-red-500">{pendingCount} Materi</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Siap ditinjau sebelum penayangan</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Materi Disetujui (Approved)</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">{approvedCount} Materi</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Telah masuk ke jadwal rilis otomatis</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Total Konten Bulan Ini</span>
          <div className="text-2xl font-bold font-mono text-slate-100">
            {brandProjects.length} Post
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Reels, Feed Carousel & Story</span>
        </div>
      </div>

      {/* Content Review Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider text-xs">
          Daftar Konten Siap Ditinjau ({brandProjects.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {brandProjects.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex justify-between items-start text-xs">
                  <span className="font-mono text-amber-400 font-semibold uppercase">
                    {p.format} · Rilis: {p.scheduledDate}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      p.clientApprovalStatus === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : p.clientApprovalStatus === 'revision_requested'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {p.clientApprovalStatus === 'approved'
                      ? 'Approved'
                      : p.clientApprovalStatus === 'revision_requested'
                      ? 'Revisi Diajukan'
                      : 'Menunggu Persetujuan'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100">{p.title}</h4>

                {/* Media preview */}
                {p.materiUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 max-h-44">
                    <img src={p.materiUrl} alt={p.title} className="w-full h-44 object-cover" />
                  </div>
                ) : (
                  <div className="h-20 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
                    Draft video tersimpan di server Google Drive
                  </div>
                )}

                {/* Caption preview */}
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs space-y-1.5">
                  <span className="font-semibold text-amber-400 block text-[11px]">
                    Draft Hook & Copywriting:
                  </span>
                  <p className="text-slate-200 line-clamp-3 leading-relaxed">{p.caption.body || p.caption.hook}</p>
                  <p className="text-slate-500 font-mono text-[10px] truncate">{p.caption.hashtags}</p>
                </div>

                {p.clientFeedback && (
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-300 text-xs">
                    <span className="font-bold block mb-0.5">Catatan Revisi Klien:</span>
                    <span>{p.clientFeedback}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
                {p.driveLink && (
                  <a
                    href={p.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-amber-400 flex items-center gap-1"
                  >
                    <ExternalLink size={13} />
                    <span>Lihat File Mentah</span>
                  </a>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProject(p);
                      setIsRevisionModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
                  >
                    Ajukan Revisi
                  </button>

                  <button
                    onClick={() => handleApprove(p)}
                    className="px-3 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 size={13} />
                    <span>Setujui (Approve)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVISION MODAL */}
      {isRevisionModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleRequestRevision}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">Catatan Revisi Materi Konten</h3>
              <button
                type="button"
                onClick={() => setIsRevisionModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Konten:</span>
              <span className="font-bold text-slate-200 text-xs">{selectedProject.title}</span>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Jelaskan Bagian yang Perlu Disesuaikan
              </label>
              <textarea
                required
                rows={4}
                value={revisionNote}
                onChange={(e) => setRevisionNote(e.target.value)}
                placeholder="Contoh: Logo di awal video tolong diperbesar sedikit & ganti kata 'mantan' di detik 04 ya..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Sesuai SOP, revisi minor akan dikerjakan maksimal 1x24 jam kerja oleh tim editor.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRevisionModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-lg transition-colors"
              >
                Kirim Revisi ke Tim Kreatif
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
