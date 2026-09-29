import React, { useState, useEffect } from 'react';
import { Search, X, LayoutDashboard, Users2, UserCheck, CircleDollarSign, FileText, FolderOpen, Camera, Box, BarChart3, UserPlus, Eye, Send } from 'lucide-react';
import { ModuleId, ProjectItem, ClientItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: ModuleId) => void;
  projects: ProjectItem[];
  clients: ClientItem[];
  onSelectProject?: (proj: ProjectItem) => void;
  onSelectClient?: (client: ClientItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  projects,
  clients,
  onSelectProject,
  onSelectClient
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modules = [
    { id: 'project_control' as ModuleId, label: 'Project Control (Kanban, Table, Payroll)', icon: LayoutDashboard, category: 'Operations' },
    { id: 'crm_clients' as ModuleId, label: 'CRM Clients Hub (Social Media Retainers)', icon: Users2, category: 'Operations' },
    { id: 'staff_hr' as ModuleId, label: 'Staff Directory & Presensi GPS', icon: UserCheck, category: 'Operations' },
    { id: 'finance' as ModuleId, label: 'Laporan Keuangan & Arus Kas', icon: CircleDollarSign, category: 'Finance' },
    { id: 'surat' as ModuleId, label: 'Database Surat & Nomor Otomatis', icon: FileText, category: 'Finance' },
    { id: 'documents' as ModuleId, label: 'Documents Hub & SOP Agensi', icon: FolderOpen, category: 'Finance' },
    { id: 'equipments' as ModuleId, label: 'Equipments Hub & Studio Gear Log', icon: Camera, category: 'Creative' },
    { id: 'packaging' as ModuleId, label: 'Logo & Packaging Spec Builder', icon: Box, category: 'Creative' },
    { id: 'audit' as ModuleId, label: 'Form Audit Media Sosial Klien', icon: BarChart3, category: 'Creative' },
    { id: 'recruitment_admin' as ModuleId, label: 'Recruitment - Admin Talent Pipeline', icon: UserPlus, category: 'HR' },
    { id: 'recruitment_public' as ModuleId, label: 'Portal Karir Publik Obeecreatives', icon: Send, category: 'HR' },
    { id: 'client_portal' as ModuleId, label: 'Portal Approval Klien (Review Draft)', icon: Eye, category: 'Client' },
  ];

  const filteredModules = modules.filter(m =>
    m.label.toLowerCase().includes(query.toLowerCase()) || m.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) || p.brandName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredClients = clients.filter(c =>
    c.company.toLowerCase().includes(query.toLowerCase()) || c.contactName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search size={18} className="text-slate-400 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari navigasi modul, project, klien, atau aksi..."
            className="w-full py-3.5 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3 text-xs">
          {/* Modules */}
          {filteredModules.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Navigasi Modul
              </div>
              <div className="space-y-0.5">
                {filteredModules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        onNavigate(m.id);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-red-400 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className="text-red-500" />
                        <span>{m.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{m.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Project Konten
              </div>
              <div className="space-y-0.5">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate('project_control');
                      if (onSelectProject) onSelectProject(p);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors text-left"
                  >
                    <div className="truncate">
                      <span className="font-medium text-slate-100">{p.title}</span>
                      <span className="text-slate-400 text-[11px] ml-2 font-mono">({p.brandName} · {p.format})</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 capitalize">{p.stage}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Clients */}
          {filteredClients.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Klien Resmi (CRM)
              </div>
              <div className="space-y-0.5">
                {filteredClients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onNavigate('crm_clients');
                      if (onSelectClient) onSelectClient(c);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors text-left"
                  >
                    <div>
                      <span className="font-medium text-slate-100">{c.company}</span>
                      <span className="text-slate-400 text-[11px] ml-2">PIC: {c.contactName}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">
                      Rp {(c.retainerMonthlyValue / 1000000).toFixed(1)}M/bln
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredModules.length === 0 && filteredProjects.length === 0 && filteredClients.length === 0 && (
            <div className="py-8 text-center text-slate-500">
              Tidak ada hasil ditemukan untuk &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Gunakan panah untuk navigasi</span>
          <span>ESC untuk keluar</span>
        </div>
      </div>
    </div>
  );
};
