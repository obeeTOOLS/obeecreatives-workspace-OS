import React from 'react';
import {
  Search,
  RefreshCw,
  Bell,
  Shield,
  User,
  Building,
  Globe,
  Database,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  Menu,
  Sun,
  Moon
} from 'lucide-react';
import { UserRole, ModuleId } from '../types';
import { useFullscreen } from '../hooks/useFullscreen';
import { PWAInstallButton } from './PWAInstallButton';

interface TopHeaderProps {
  currentModule: ModuleId;
  userRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onOpenCommandPalette: () => void;
  onOpenGasModal: () => void;
  onOpenSpecPdf?: () => void;
  onSyncGas: () => void;
  isSyncing: boolean;
  lastSyncTime?: string;
  isSidebarCollapsed: boolean;
  onToggleMobileMenu?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentModule,
  userRole,
  onChangeUserRole,
  onOpenCommandPalette,
  onOpenGasModal,
  onOpenSpecPdf,
  onSyncGas,
  isSyncing,
  lastSyncTime,
  isSidebarCollapsed,
  onToggleMobileMenu,
  theme = 'dark',
  onToggleTheme
}) => {
  const { isFullscreen, toggleFullscreen, isSupported: isFullscreenSupported } = useFullscreen();

  const getModuleTitle = (mod: ModuleId): { title: string; category: string } => {
    switch (mod) {
      case 'project_control':
        return { title: 'Project Control & Produksi', category: 'Core Operations' };
      case 'crm_clients':
        return { title: 'CRM Clients Hub', category: 'Core Operations' };
      case 'staff_hr':
        return { title: 'Database Staff & Presensi GPS', category: 'Core Operations' };
      case 'finance':
        return { title: 'Laporan Keuangan & Arus Kas', category: 'Finance & Legal' };
      case 'surat':
        return { title: 'Database Surat & Penomoran', category: 'Finance & Legal' };
      case 'documents':
        return { title: 'Documents Hub & SOP', category: 'Finance & Legal' };
      case 'equipments':
        return { title: 'Equipments Hub & Studio Gear', category: 'Creative Assets' };
      case 'packaging':
        return { title: 'Logo & Packaging Builder', category: 'Creative Assets' };
      case 'audit':
        return { title: 'Form Audit Media Sosial', category: 'Creative Assets' };
      case 'recruitment_admin':
        return { title: 'Recruitment - Admin Panel', category: 'People & Talent' };
      case 'recruitment_public':
        return { title: 'Portal Karir Kreatif', category: 'People & Talent' };
      case 'client_portal':
        return { title: 'Portal Approval Brand', category: 'Client Space' };
      default:
        return { title: 'Workspace OS', category: 'Operations' };
    }
  };

  const currentMeta = getModuleTitle(currentModule);

  return (
    <header
      className={`fixed top-0 right-0 z-20 h-16 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-all duration-300 flex items-center justify-between px-3 md:px-6 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-red-600 left-0 ${
        isSidebarCollapsed ? 'md:left-20' : 'md:left-64'
      }`}
    >
      {/* Zone 1: Mobile Hamburger + Contextual Breadcrumb & Logo */}
      <div className="flex items-center gap-2.5 md:gap-4 min-w-0">
        {/* Mobile Menu Hamburger */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
          title="Buka Menu"
        >
          <Menu size={20} className="text-red-500" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-sm md:text-base font-extrabold tracking-tight leading-none shrink-0">
              <span className="text-white">obee</span>
              <span className="text-red-600">creatives</span>
            </span>
            <span className="text-slate-600 text-xs hidden sm:inline">/</span>
            <span className="text-xs font-semibold text-slate-300 truncate hidden sm:inline">
              {currentMeta.title}
            </span>
          </div>
          <p className="text-[10px] md:text-[11px] text-slate-400 truncate mt-0.5 max-w-[170px] sm:max-w-xs md:max-w-sm">
            {currentMeta.title} — {currentMeta.category}
          </p>
        </div>
      </div>

      {/* Zone 2: Command Search Affordance (Tablet & Desktop) */}
      <div className="hidden lg:flex items-center">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-3 py-1.5 text-xs text-slate-400 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-red-500/50 rounded-lg transition-colors w-56 xl:w-64 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search size={14} className="text-red-500" />
            <span className="truncate">Cari project, klien, SOP...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-700 text-slate-400 rounded">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions, PWA Install, Fullscreen, GAS V2, & RBAC Switcher */}
      <div className="flex items-center gap-1.5 md:gap-2.5">
        {/* Theme Mode Switcher (Dark / Light) */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
            className="p-2 rounded-lg border text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 border-slate-800 transition-all hover:scale-105 active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={15} className="text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={15} className="text-indigo-400 hover:-rotate-12 transition-transform" />
            )}
          </button>
        )}

        {/* Fullscreen Toggle Button */}
        {isFullscreenSupported && (
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Keluar Layar Penuh (Esc / F11)' : 'Mode Layar Penuh / Fullscreen (F11)'}
            className={`p-2 rounded-lg border transition-all ${
              isFullscreen
                ? 'bg-red-600/20 text-red-400 border-red-500/40 shadow-sm shadow-red-600/20'
                : 'text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 border-slate-800'
            }`}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        )}

        {/* PWA Install Button (Responsive) */}
        <div className="hidden sm:block">
          <PWAInstallButton variant="compact" />
        </div>

        {/* PDF Standar Button */}
        <button
          onClick={onOpenSpecPdf}
          title="Download Dokumen Standar Pengembangan Web Apps (PDF)"
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
        >
          <FileText size={13} className="text-red-400" />
          <span className="font-mono text-xs">PDF Standar</span>
        </button>

        {/* GAS V2 Sync Button */}
        <button
          onClick={onSyncGas}
          disabled={isSyncing}
          title="Sinkronisasi Google Spreadsheet (GAS V2)"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 rounded-lg transition-colors"
        >
          <RefreshCw size={13} className={isSyncing ? 'animate-spin text-red-500' : 'text-slate-400'} />
          <span className="hidden xl:inline text-xs font-mono">
            {isSyncing ? 'Syncing...' : 'GAS V2 Sync'}
          </span>
        </button>

        {/* GAS Settings Link */}
        <button
          onClick={onOpenGasModal}
          title="Google Apps Script V2 Settings"
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
        >
          <Database size={15} />
        </button>

        {/* Role Switcher Pill Dropdown */}
        <div className="flex items-center gap-0.5 bg-slate-950 border border-slate-800 p-0.5 rounded-lg">
          <button
            onClick={() => onChangeUserRole('admin')}
            className={`flex items-center gap-1 px-1.5 md:px-2 py-1 text-xs rounded transition-colors ${
              userRole === 'admin'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Super Admin & PM"
          >
            <Shield size={12} />
            <span className="hidden sm:inline">Admin</span>
          </button>

          <button
            onClick={() => onChangeUserRole('creator')}
            className={`flex items-center gap-1 px-1.5 md:px-2 py-1 text-xs rounded transition-colors ${
              userRole === 'creator'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Creator / Staff"
          >
            <User size={12} />
            <span className="hidden sm:inline">Creator</span>
          </button>

          <button
            onClick={() => onChangeUserRole('client')}
            className={`flex items-center gap-1 px-1.5 md:px-2 py-1 text-xs rounded transition-colors ${
              userRole === 'client'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Client Approval Portal"
          >
            <Building size={12} />
            <span className="hidden sm:inline">Client</span>
          </button>

          <button
            onClick={() => onChangeUserRole('public')}
            className={`flex items-center gap-1 px-1.5 md:px-2 py-1 text-xs rounded transition-colors ${
              userRole === 'public'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Public Recruitment"
          >
            <Globe size={12} />
            <span className="hidden sm:inline">Public</span>
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
          <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-red-600/30">
            {userRole === 'admin' ? 'AD' : userRole === 'creator' ? 'BS' : userRole === 'client' ? 'KK' : 'HR'}
          </div>
        </div>
      </div>
    </header>
  );
};
