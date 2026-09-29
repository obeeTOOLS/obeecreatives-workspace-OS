import React from 'react';
import {
  LayoutDashboard,
  Users2,
  UserCheck,
  FolderOpen,
  Menu,
  Eye,
  Send,
  Sparkles
} from 'lucide-react';
import { ModuleId, UserRole } from '../types';

interface MobileBottomNavProps {
  currentModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  onOpenMobileMenu: () => void;
  userRole: UserRole;
  pendingApprovalsCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentModule,
  onSelectModule,
  onOpenMobileMenu,
  userRole,
  pendingApprovalsCount
}) => {
  // If Client role
  if (userRole === 'client') {
    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-around px-2 py-1.5 safe-area-inset-bottom">
        <button
          onClick={() => onSelectModule('client_portal')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentModule === 'client_portal'
              ? 'text-red-500 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye size={18} />
          <span>Approval Brand</span>
        </button>

        <button
          onClick={() => onSelectModule('documents')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentModule === 'documents'
              ? 'text-red-500 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderOpen size={18} />
          <span>SOP & Dokumen</span>
        </button>

        <button
          onClick={onOpenMobileMenu}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium text-slate-400 hover:text-slate-200"
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>
      </nav>
    );
  }

  // If Public role
  if (userRole === 'public') {
    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-around px-2 py-1.5 safe-area-inset-bottom">
        <button
          onClick={() => onSelectModule('recruitment_public')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-lg text-[10px] font-medium transition-colors ${
            currentModule === 'recruitment_public'
              ? 'text-red-500 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Send size={18} />
          <span>Form Pendaftaran</span>
        </button>

        <button
          onClick={onOpenMobileMenu}
          className="flex flex-col items-center gap-1 py-1 px-4 rounded-lg text-[10px] font-medium text-slate-400 hover:text-slate-200"
        >
          <Menu size={18} />
          <span>Ganti Role</span>
        </button>
      </nav>
    );
  }

  // Default Admin & Creator Navigation
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-around px-2 py-1 safe-area-inset-bottom">
      {/* Project Control */}
      <button
        onClick={() => onSelectModule('project_control')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] transition-colors relative ${
          currentModule === 'project_control'
            ? 'text-red-500 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className="relative">
          <LayoutDashboard size={18} />
          {pendingApprovalsCount > 0 && (
            <span className="absolute -top-1 -right-2 h-3.5 min-w-[14px] px-1 bg-red-600 text-white rounded-full text-[9px] font-bold font-mono flex items-center justify-center">
              {pendingApprovalsCount}
            </span>
          )}
        </div>
        <span>Project</span>
      </button>

      {/* CRM Clients */}
      {userRole === 'admin' && (
        <button
          onClick={() => onSelectModule('crm_clients')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] transition-colors ${
            currentModule === 'crm_clients'
              ? 'text-red-500 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users2 size={18} />
          <span>CRM</span>
        </button>
      )}

      {/* Presensi GPS */}
      <button
        onClick={() => onSelectModule('staff_hr')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] transition-colors ${
          currentModule === 'staff_hr'
            ? 'text-red-500 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <UserCheck size={18} />
        <span>Presensi</span>
      </button>

      {/* Documents Hub */}
      <button
        onClick={() => onSelectModule('documents')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] transition-colors ${
          currentModule === 'documents'
            ? 'text-red-500 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <FolderOpen size={18} />
        <span>Hub</span>
      </button>

      {/* Menu Drawer Toggle */}
      <button
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] text-slate-400 hover:text-white transition-colors"
      >
        <Menu size={18} />
        <span>Menu</span>
      </button>
    </nav>
  );
};
