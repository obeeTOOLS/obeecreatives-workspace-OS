import React from 'react';
import {
  LayoutDashboard,
  Users2,
  UserCheck,
  CircleDollarSign,
  FileText,
  FolderOpen,
  Camera,
  Box,
  BarChart3,
  UserPlus,
  Send,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  X,
  Maximize2,
  Minimize2,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { ModuleId, UserRole } from '../types';
import { useFullscreen } from '../hooks/useFullscreen';
import { PWAInstallButton } from './PWAInstallButton';

interface SidebarProps {
  currentModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userRole: UserRole;
  pendingApprovalsCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ElementType;
  adminOnly?: boolean;
  creatorAllowed?: boolean;
  clientAllowed?: boolean;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  isCollapsed,
  onToggleCollapse,
  userRole,
  pendingApprovalsCount,
  isMobileOpen = false,
  onCloseMobile,
  theme = 'dark',
  onToggleTheme
}) => {
  const { isFullscreen, toggleFullscreen, isSupported } = useFullscreen();

  const sections: NavSection[] = [
    {
      title: 'Core Operations',
      items: [
        {
          id: 'project_control',
          label: 'Project Control',
          icon: LayoutDashboard,
          creatorAllowed: true,
          badge: pendingApprovalsCount
        },
        {
          id: 'crm_clients',
          label: 'CRM Clients Hub',
          icon: Users2,
          creatorAllowed: false
        },
        {
          id: 'staff_hr',
          label: 'Staff & Presensi GPS',
          icon: UserCheck,
          creatorAllowed: true
        }
      ]
    },
    {
      title: 'Finance & Legal',
      items: [
        {
          id: 'finance',
          label: 'Laporan Keuangan',
          icon: CircleDollarSign,
          adminOnly: true
        },
        {
          id: 'surat',
          label: 'Database Surat',
          icon: FileText,
          adminOnly: true
        },
        {
          id: 'documents',
          label: 'Documents & SOP',
          icon: FolderOpen,
          creatorAllowed: true
        }
      ]
    },
    {
      title: 'Creative Assets',
      items: [
        {
          id: 'equipments',
          label: 'Equipments Hub',
          icon: Camera,
          adminOnly: true
        },
        {
          id: 'packaging',
          label: 'Logo & Packaging',
          icon: Box,
          creatorAllowed: true
        },
        {
          id: 'audit',
          label: 'Audit Media Sosial',
          icon: BarChart3,
          creatorAllowed: true
        }
      ]
    },
    {
      title: 'People & Talent',
      items: [
        {
          id: 'recruitment_admin',
          label: 'Recruitment - Admin',
          icon: UserPlus,
          adminOnly: true
        },
        {
          id: 'recruitment_public',
          label: 'Portal Karir Publik',
          icon: Send,
          creatorAllowed: true
        }
      ]
    },
    {
      title: 'Client Space',
      items: [
        {
          id: 'client_portal',
          label: 'Portal Review Klien',
          icon: Eye,
          clientAllowed: true,
          creatorAllowed: true
        }
      ]
    }
  ];

  const isAccessible = (item: NavItem): boolean => {
    if (userRole === 'admin') return true;
    if (userRole === 'creator') {
      return !item.adminOnly || Boolean(item.creatorAllowed);
    }
    if (userRole === 'client') {
      return item.id === 'client_portal' || item.id === 'documents';
    }
    if (userRole === 'public') {
      return item.id === 'recruitment_public';
    }
    return false;
  };

  const handleItemClick = (item: NavItem) => {
    if (isAccessible(item)) {
      onSelectModule(item.id);
      if (onCloseMobile) {
        onCloseMobile();
      }
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 md:z-30 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out select-none ${
          // Desktop collapsing width
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${
          // Mobile responsive slide-over drawer
          isMobileOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-red-600 after:via-red-500 after:to-slate-800">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-lg tracking-tighter shrink-0 shadow-md shadow-red-600/30">
              oc
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col truncate">
                <div className="text-base font-extrabold tracking-tight leading-none truncate">
                  <span className="text-white">obee</span>
                  <span className="text-red-500">creatives</span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase font-mono mt-0.5">
                  Workspace OS
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Button */}
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Perlebar Sidebar' : 'Ciutkan Sidebar'}
              className="hidden md:flex text-slate-400 hover:text-slate-100 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              title="Tutup Menu Navigasi"
              className="md:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Links Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {sections.map((section, idx) => {
            // If in Client role, hide other sections to keep focus
            if (userRole === 'client' && section.title !== 'Client Space' && section.title !== 'Finance & Legal') {
              return null;
            }
            if (userRole === 'public' && section.title !== 'People & Talent') {
              return null;
            }

            return (
              <div key={idx} className="space-y-1">
                {(!isCollapsed || isMobileOpen) && (
                  <div className="px-3 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                    <span>{section.title}</span>
                  </div>
                )}

                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const allowed = isAccessible(item);
                    const isActive = currentModule === item.id;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        disabled={!allowed}
                        title={!allowed ? `${item.label} (Khusus Admin)` : item.label}
                        className={`w-full group flex items-center gap-3 px-3 py-2.5 md:py-2 rounded-lg text-xs font-medium transition-all text-left relative ${
                          isActive
                            ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-600/25'
                            : allowed
                            ? 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                            : 'text-slate-500 cursor-not-allowed opacity-50'
                        } ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}`}
                      >
                        <Icon
                          size={18}
                          className={`shrink-0 transition-transform ${
                            isActive
                              ? 'text-white'
                              : allowed
                              ? 'text-slate-400 group-hover:text-slate-200'
                              : 'text-slate-600'
                          }`}
                        />

                        {(!isCollapsed || isMobileOpen) && (
                          <span className="truncate flex-1">{item.label}</span>
                        )}

                        {(!isCollapsed || isMobileOpen) && item.adminOnly && userRole !== 'admin' && (
                          <ShieldAlert size={13} className="text-slate-600 shrink-0" />
                        )}

                        {item.badge !== undefined && item.badge > 0 && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                              isActive
                                ? 'bg-white text-red-600'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Tooltip for rail mode */}
                        {isCollapsed && !isMobileOpen && (
                          <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-950 text-slate-200 text-xs rounded border border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                            {item.label} {item.adminOnly && userRole !== 'admin' ? '(Admin Only)' : ''}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Mobile Extra Controls (PWA Install, Theme Switcher & Fullscreen in Drawer) */}
          <div className="pt-4 border-t border-slate-800 md:hidden space-y-2">
            <PWAInstallButton variant="banner" />

            {/* Mobile Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Sun size={15} className="text-amber-400" />
                  ) : (
                    <Moon size={15} className="text-indigo-400" />
                  )}
                  <span>{theme === 'dark' ? 'Mode Terang (Light Mode)' : 'Mode Gelap (Dark Mode)'}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono capitalize">
                  {theme}
                </span>
              </button>
            )}

            {isSupported && (
              <button
                onClick={toggleFullscreen}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  {isFullscreen ? <Minimize2 size={15} className="text-red-400" /> : <Maximize2 size={15} className="text-red-400" />}
                  <span>{isFullscreen ? 'Keluar Mode Layar Penuh' : 'Mode Layar Penuh (Fullscreen)'}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {isFullscreen ? 'Active' : 'Toggle'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Footer / System Status */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 shrink-0">
          {!isCollapsed || isMobileOpen ? (
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-slate-300">GAS V2 Online</span>
              </div>
              <span className="font-mono text-slate-400">v2.4.0</span>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" title="GAS V2 Connected"></span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
