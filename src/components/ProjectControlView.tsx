import React, { useState } from 'react';
import {
  Kanban,
  Table as TableIcon,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Filter,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Copy,
  Check,
  DollarSign,
  FileCheck2,
  ArrowRight,
  Eye,
  AlertCircle
} from 'lucide-react';
import { ProjectItem, ProjectStage, ContentFormat, ClientItem, StaffItem } from '../types';

interface ProjectControlViewProps {
  projects: ProjectItem[];
  clients: ClientItem[];
  staff: StaffItem[];
  onUpdateProject: (project: ProjectItem) => void;
  onCreateProject: (project: Omit<ProjectItem, 'id'>) => void;
  onOpenProjectDetail?: (project: ProjectItem) => void;
}

export const ProjectControlView: React.FC<ProjectControlViewProps> = ({
  projects,
  clients,
  staff,
  onUpdateProject,
  onCreateProject,
  onOpenProjectDetail
}) => {
  const [activeTab, setActiveTab] = useState<'kanban' | 'table' | 'calendar' | 'payroll'>('kanban');
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newBrandId, setNewBrandId] = useState(clients[0]?.id || '');
  const [newFormat, setNewFormat] = useState<ContentFormat>('Reels');
  const [newCreatorId, setNewCreatorId] = useState(staff[0]?.id || '');
  const [newScheduledDate, setNewScheduledDate] = useState('2026-10-05');
  const [newDeadlineDate, setNewDeadlineDate] = useState('2026-10-02');
  const [newHook, setNewHook] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCta, setNewCta] = useState('');
  const [newHashtags, setNewHashtags] = useState('#obeecreatives');

  const stages: { key: ProjectStage; label: string; dotColor: string }[] = [
    { key: 'ideation', label: 'Ideation & Scripting', dotColor: 'bg-purple-400' },
    { key: 'shooting', label: 'Produksi / Shooting', dotColor: 'bg-blue-400' },
    { key: 'editing', label: 'Editing & Post-Prod', dotColor: 'bg-amber-400' },
    { key: 'review', label: 'Review CD & Klien', dotColor: 'bg-orange-400' },
    { key: 'approved', label: 'Approved & Scheduled', dotColor: 'bg-emerald-400' },
    { key: 'published', label: 'Published / Live', dotColor: 'bg-slate-400' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filterBrand !== 'all' && p.brandId !== filterBrand) return false;
    if (filterFormat !== 'all' && p.format !== filterFormat) return false;
    return true;
  });

  const handleStageChange = (project: ProjectItem, newStage: ProjectStage) => {
    onUpdateProject({
      ...project,
      stage: newStage
    });
  };

  const handleCopyCaption = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === newBrandId);
    const creator = staff.find(s => s.id === newCreatorId);

    const fee = creator?.rateCards[newFormat] || 250000;

    onCreateProject({
      title: newTitle || 'Untitled Content',
      brandId: newBrandId,
      brandName: client?.company || 'Brand Client',
      division: client?.division || 'Social Media Management',
      format: newFormat,
      stage: 'ideation',
      scheduledDate: newScheduledDate,
      deadlineDate: newDeadlineDate,
      creatorId: newCreatorId,
      creatorName: creator?.name || 'Staff Creator',
      creatorRole: creator?.role || 'Creator',
      fee: fee,
      caption: {
        hook: newHook,
        body: newBody,
        cta: newCta,
        hashtags: newHashtags
      },
      clientApprovalStatus: 'pending',
      cdApprovalStatus: 'pending'
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewHook('');
    setNewBody('');
  };

  // Payroll calculation grouped by creator
  const payrollSummary = staff.map(member => {
    const creatorProjects = projects.filter(p => p.creatorId === member.id);
    const completedProjects = creatorProjects.filter(p => p.stage === 'approved' || p.stage === 'published');
    const totalFee = completedProjects.reduce((acc, curr) => acc + curr.fee, 0);
    const pendingFee = creatorProjects.filter(p => p.stage !== 'approved' && p.stage !== 'published')
      .reduce((acc, curr) => acc + curr.fee, 0);

    return {
      member,
      totalProjects: creatorProjects.length,
      completedCount: completedProjects.length,
      earnedFee: totalFee,
      pendingFee: pendingFee,
      items: completedProjects
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg self-start">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'kanban'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Kanban size={14} />
            <span>Kanban Board</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'table'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TableIcon size={14} />
            <span>Tabel Data</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'calendar'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalendarIcon size={14} />
            <span>Kalender Rilis</span>
          </button>

          <button
            onClick={() => setActiveTab('payroll')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'payroll'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign size={14} />
            <span>Perhitungan Fee & Payroll</span>
          </button>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex items-center gap-3">
          {/* Brand Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Klien:</span>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-red-500"
            >
              <option value="all">Semua Klien CRM</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company}
                </option>
              ))}
            </select>
          </div>

          {/* Format Filter */}
          <select
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">Semua Format</option>
            <option value="Reels">Reels</option>
            <option value="TikTok">TikTok</option>
            <option value="Feed Carousel">Feed Carousel</option>
            <option value="Story">Story</option>
            <option value="YouTube">YouTube</option>
          </select>

          {/* New Project Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-red-600/30"
          >
            <Plus size={15} />
            <span>Konten Baru</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
          {stages.map((stage) => {
            const stageProjects = filteredProjects.filter((p) => p.stage === stage.key);

            return (
              <div
                key={stage.key}
                className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col min-h-[500px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${stage.dotColor}`}></span>
                    <h3 className="text-xs font-bold text-slate-200 truncate">
                      {stage.label}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {stageProjects.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-2.5 flex-1">
                  {stageProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/50 p-3 rounded-lg cursor-pointer transition-all shadow-xs space-y-2 border-l-3 border-l-red-600"
                    >
                      {/* Brand & Format */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-red-400 truncate max-w-[120px]">
                          {project.brandName}
                        </span>
                        <span className="font-mono text-slate-400">{project.format}</span>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                        {project.title}
                      </h4>

                      {/* Materi Thumbnail preview if exists */}
                      {project.materiUrl && (
                        <div className="relative h-20 w-full rounded overflow-hidden bg-slate-950 border border-slate-800">
                          <img
                            src={project.materiUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}

                      {/* Creator & Approvals */}
                      <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate">{project.creatorName}</span>
                        <div className="flex items-center gap-1.5">
                          {project.clientApprovalStatus === 'approved' ? (
                            <span className="text-emerald-400 flex items-center gap-0.5" title="Disetujui Klien">
                              <CheckCircle2 size={12} />
                            </span>
                          ) : (
                            <span className="text-amber-400" title="Review Klien">
                              <Clock3 size={12} />
                            </span>
                          )}
                          <span className="font-mono text-slate-400">
                            {new Date(project.scheduledDate).getDate()}/{new Date(project.scheduledDate).getMonth() + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageProjects.length === 0 && (
                    <div className="h-28 border border-dashed border-slate-800/80 rounded-lg flex items-center justify-center text-[11px] text-slate-600">
                      Kosong
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: DATA TABLE */}
      {activeTab === 'table' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Konten / Ide</th>
                  <th className="py-3 px-4">Klien CRM</th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4">Status Produksi</th>
                  <th className="py-3 px-4">PIC Creator</th>
                  <th className="py-3 px-4">Fee Creator</th>
                  <th className="py-3 px-4">Jadwal Rilis</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-100 max-w-xs truncate">
                      {p.title}
                    </td>
                    <td className="py-3 px-4 text-red-400 font-semibold">{p.brandName}</td>
                    <td className="py-3 px-4 font-mono">{p.format}</td>
                    <td className="py-3 px-4">
                      <select
                        value={p.stage}
                        onChange={(e) => handleStageChange(p, e.target.value as ProjectStage)}
                        className="bg-slate-950 border border-slate-800 text-[11px] rounded px-2 py-1 text-slate-200 capitalize focus:outline-hidden"
                      >
                        {stages.map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">{p.creatorName}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">
                      Rp {p.fee.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{p.scheduledDate}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedProject(p)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-red-600 hover:text-white text-slate-200 text-xs rounded transition-colors inline-flex items-center gap-1"
                      >
                        <Eye size={12} />
                        <span>Verifikasi</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: CALENDAR VIEW */}
      {activeTab === 'calendar' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100">Kalender Rilis Konten - Oktober 2026</h3>
              <p className="text-xs text-slate-400">Jadwal penayangan postingan Reels, TikTok & Carousel per hari</p>
            </div>
            <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/20 font-semibold">
              Total {filteredProjects.length} Konten Terjadwal
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
              <div key={day} className="text-center py-2 text-xs font-semibold text-slate-400 border-b border-slate-800">
                {day}
              </div>
            ))}

            {/* October 2026 dates (1st is Thursday => 3 leading empty slots) */}
            {[...Array(3)].map((_, i) => (
              <div key={`empty-${i}`} className="h-28 bg-slate-950/30 rounded-lg p-2 opacity-30"></div>
            ))}

            {[...Array(31)].map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-10-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const dayProjects = filteredProjects.filter((p) => p.scheduledDate === dateStr);

              return (
                <div
                  key={dayNum}
                  className={`h-28 border rounded-lg p-2 overflow-y-auto space-y-1 transition-colors ${
                    dayProjects.length > 0
                      ? 'bg-slate-900/90 border-slate-700/80 hover:border-amber-400/50'
                      : 'bg-slate-950/50 border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-slate-300">{dayNum}</span>
                    {dayProjects.length > 0 && (
                      <span className="text-[10px] text-amber-400 font-semibold">{dayProjects.length}</span>
                    )}
                  </div>

                  {dayProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProject(p)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] cursor-pointer border border-slate-700/80 truncate space-y-0.5"
                    >
                      <div className="font-bold text-amber-300 truncate">{p.brandName}</div>
                      <div className="text-slate-300 truncate">{p.title}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: PAYROLL & FEE CREATOR SUMMARY */}
      {activeTab === 'payroll' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block mb-1">Total Fee Approved Siap Payout</span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                Rp {payrollSummary.reduce((acc, curr) => acc + curr.earnedFee, 0).toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Dari konten yang sudah di-approve & published</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block mb-1">Total Fee Dalam Pengerjaan (Pending)</span>
              <div className="text-xl font-bold font-mono text-amber-400">
                Rp {payrollSummary.reduce((acc, curr) => acc + curr.pendingFee, 0).toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Ideation, Shooting & Editing in progress</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block mb-1">Total Creator Aktif</span>
              <div className="text-xl font-bold font-mono text-slate-100">
                {staff.length} Creator
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Videographer, Editor, Designer, Copywriter</span>
            </div>
          </div>

          {/* Breakdown Table Per Creator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100">
                Rincian Fee Konten Per Creator (Payroll Periode Ini)
              </h3>
              <button
                onClick={() => alert('Batch Payroll Slip diexport ke CSV!')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 font-medium transition-colors"
              >
                Export Payroll Batch CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Nama Tim & Role</th>
                    <th className="py-3 px-4">Konten Selesai</th>
                    <th className="py-3 px-4">Fee Approved (Siap Bayar)</th>
                    <th className="py-3 px-4">Fee Pending</th>
                    <th className="py-3 px-4">Rate Card Utama</th>
                    <th className="py-3 px-4 text-right">Status Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {payrollSummary.map(({ member, completedCount, earnedFee, pendingFee }) => (
                    <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-100">{member.name}</div>
                        <div className="text-[11px] text-slate-400">{member.role}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-medium">{completedCount} konten</td>
                      <td className="py-3 px-4 font-mono text-emerald-400 font-bold">
                        Rp {earnedFee.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 font-mono text-amber-400">
                        Rp {pendingFee.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-[11px] font-mono text-slate-400">
                        Reels: Rp {(member.rateCards['Reels'] / 1000).toFixed(0)}k · TikTok: Rp {(member.rateCards['TikTok'] / 1000).toFixed(0)}k
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] rounded font-mono font-semibold">
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL & VERIFICATION MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">
                  {selectedProject.brandName} · {selectedProject.format}
                </span>
                <h2 className="text-base font-bold text-slate-100 leading-tight">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
              {/* Materi Visual & Assets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-200">Materi Visual & Media Draft</h3>
                  {selectedProject.driveLink && (
                    <a
                      href={selectedProject.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <ExternalLink size={12} />
                      <span>Buka Google Drive File</span>
                    </a>
                  )}
                </div>

                {selectedProject.materiUrl ? (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 max-h-56 flex items-center justify-center">
                    <img
                      src={selectedProject.materiUrl}
                      alt={selectedProject.title}
                      className="w-full h-56 object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-24 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                    Belum ada asset visual diupload. Buka link Drive untuk melihat draft mentah.
                  </div>
                )}
              </div>

              {/* Caption Verification Section */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-200">Verifikasi Caption & Copywriting</h3>
                  <button
                    onClick={() =>
                      handleCopyCaption(
                        `${selectedProject.caption.hook}\n\n${selectedProject.caption.body}\n\n${selectedProject.caption.cta}\n\n${selectedProject.caption.hashtags}`,
                        'all'
                      )
                    }
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] transition-colors"
                  >
                    {copiedField === 'all' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedField === 'all' ? 'Tersalin!' : 'Copy Seluruh Caption'}</span>
                  </button>
                </div>

                {/* Hook 3 Detik */}
                <div>
                  <span className="text-[11px] font-semibold text-red-400 uppercase tracking-wider block mb-1">
                    Hook (3 Detik Pertama):
                  </span>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-100 font-medium">
                    {selectedProject.caption.hook || 'Belum ada hook.'}
                  </div>
                </div>

                {/* Body Storytelling */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Body Copywriting:
                  </span>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200 whitespace-pre-line">
                    {selectedProject.caption.body || 'Belum ada body copy.'}
                  </div>
                </div>

                {/* CTA & Hashtags */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Call to Action (CTA):
                    </span>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-200">
                      {selectedProject.caption.cta || '-'}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Hashtags:
                    </span>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[11px] truncate">
                      {selectedProject.caption.hashtags || '-'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Checklist & Client Feedback */}
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
                <h3 className="font-bold text-slate-200">Status Approval & Review Internal</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Creative Director Approval */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div>
                      <span className="font-semibold text-slate-200 block">Creative Director (CD)</span>
                      <span className="text-[11px] text-slate-400">Verifikasi standar kualitas agensi</span>
                    </div>
                    <button
                      onClick={() =>
                        onUpdateProject({
                          ...selectedProject,
                          cdApprovalStatus: selectedProject.cdApprovalStatus === 'approved' ? 'pending' : 'approved'
                        })
                      }
                      className={`px-3 py-1 text-[11px] font-bold rounded transition-colors ${
                        selectedProject.cdApprovalStatus === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {selectedProject.cdApprovalStatus === 'approved' ? 'Approved' : 'Tandai Disetujui'}
                    </button>
                  </div>

                  {/* Client Approval */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div>
                      <span className="font-semibold text-slate-200 block">Approval Klien</span>
                      <span className="text-[11px] text-slate-400">Status persetujuan pihak brand</span>
                    </div>
                    <button
                      onClick={() =>
                        onUpdateProject({
                          ...selectedProject,
                          clientApprovalStatus: selectedProject.clientApprovalStatus === 'approved' ? 'pending' : 'approved'
                        })
                      }
                      className={`px-3 py-1 text-[11px] font-bold rounded transition-colors ${
                        selectedProject.clientApprovalStatus === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {selectedProject.clientApprovalStatus === 'approved' ? 'Disetujui Klien' : 'Menunggu Approval'}
                    </button>
                  </div>
                </div>

                {selectedProject.clientFeedback && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    <span className="font-bold block mb-0.5">Catatan Revisi dari Klien:</span>
                    <span>{selectedProject.clientFeedback}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
              <div className="text-slate-400 text-xs">
                Fee Konten: <span className="font-mono text-emerald-400 font-bold">Rp {selectedProject.fee.toLocaleString('id-ID')}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW PROJECT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleCreateSubmit}
            className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
              <h2 className="text-base font-bold text-slate-100">Buat Jadwal Konten Baru</h2>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Judul / Konsep Konten</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: POV: Barista Salah Denger Pesanan Mantan"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Klien Resmi CRM</label>
                  <select
                    value={newBrandId}
                    onChange={(e) => setNewBrandId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.company}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Format Konten</label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as ContentFormat)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  >
                    <option value="Reels">Reels</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Feed Carousel">Feed Carousel</option>
                    <option value="Story">Story</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Assign Creator</label>
                  <select
                    value={newCreatorId}
                    onChange={(e) => setNewCreatorId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Jadwal Rilis Post</label>
                  <input
                    type="date"
                    value={newScheduledDate}
                    onChange={(e) => setNewScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Hook 3 Detik</label>
                <input
                  type="text"
                  value={newHook}
                  onChange={(e) => setNewHook(e.target.value)}
                  placeholder="Kalimat pemikat di detik awal video"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Body Caption</label>
                <textarea
                  rows={3}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Isi storytelling / pesan utama yang ingin disampaikan..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-red-600/30"
              >
                Simpan & Jadwalkan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
