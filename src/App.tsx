import React, { useState, useEffect } from 'react';
import {
  ModuleId,
  UserRole,
  ProjectItem,
  ClientItem,
  StaffItem,
  AttendanceRecord,
  FinanceTransaction,
  OfficialLetter,
  EquipmentItem,
  EquipmentLoanLog,
  RecruitmentCandidate,
  GasSettings
} from './types';
import {
  loadFromStorage,
  saveToStorage,
  INITIAL_CLIENTS,
  INITIAL_STAFF,
  INITIAL_PROJECTS,
  INITIAL_ATTENDANCE,
  INITIAL_TRANSACTIONS,
  INITIAL_LETTERS,
  INITIAL_EQUIPMENTS,
  INITIAL_EQUIPMENT_LOGS,
  INITIAL_CANDIDATES
} from './services/storage';

import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CommandPalette } from './components/CommandPalette';
import { GasConfigModal } from './components/GasConfigModal';
import { SpecificationPdfModal } from './components/SpecificationPdfModal';
import { useTheme } from './hooks/useTheme';

import { ProjectControlView } from './components/ProjectControlView';
import { CrmClientsView } from './components/CrmClientsView';
import { StaffHrView } from './components/StaffHrView';
import { FinanceView } from './components/FinanceView';
import { DatabaseSuratView } from './components/DatabaseSuratView';
import { DocumentsHubView } from './components/DocumentsHubView';
import { EquipmentsHubView } from './components/EquipmentsHubView';
import { PackagingBuilderView } from './components/PackagingBuilderView';
import { SocialMediaAuditView } from './components/SocialMediaAuditView';
import { RecruitmentAdminView } from './components/RecruitmentAdminView';
import { RecruitmentPublicView } from './components/RecruitmentPublicView';
import { ClientPortalView } from './components/ClientPortalView';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Navigation & Role State
  const [currentModule, setCurrentModule] = useState<ModuleId>('project_control');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isGasModalOpen, setIsGasModalOpen] = useState(false);
  const [isSpecPdfModalOpen, setIsSpecPdfModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSyncingGas, setIsSyncingGas] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Baru saja');

  // Persistence State
  const [clients, setClients] = useState<ClientItem[]>(() =>
    loadFromStorage('clients', INITIAL_CLIENTS)
  );
  const [staff, setStaff] = useState<StaffItem[]>(() =>
    loadFromStorage('staff', INITIAL_STAFF)
  );
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    loadFromStorage('projects', INITIAL_PROJECTS)
  );
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() =>
    loadFromStorage('attendance', INITIAL_ATTENDANCE)
  );
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(() =>
    loadFromStorage('transactions', INITIAL_TRANSACTIONS)
  );
  const [letters, setLetters] = useState<OfficialLetter[]>(() =>
    loadFromStorage('letters', INITIAL_LETTERS)
  );
  const [equipments, setEquipments] = useState<EquipmentItem[]>(() =>
    loadFromStorage('equipments', INITIAL_EQUIPMENTS)
  );
  const [equipmentLogs, setEquipmentLogs] = useState<EquipmentLoanLog[]>(() =>
    loadFromStorage('equipment_logs', INITIAL_EQUIPMENT_LOGS)
  );
  const [candidates, setCandidates] = useState<RecruitmentCandidate[]>(() =>
    loadFromStorage('candidates', INITIAL_CANDIDATES)
  );
  const [gasSettings, setGasSettings] = useState<GasSettings>(() =>
    loadFromStorage('gas_settings', {
      enabled: true,
      webhookUrl: 'https://script.google.com/macros/s/AKfycbz_obeecreatives_v2/exec',
      sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      autoSync: true,
      lastSyncedAt: new Date().toISOString()
    })
  );

  // Sync back to local storage whenever state changes
  useEffect(() => {
    saveToStorage('clients', clients);
  }, [clients]);

  useEffect(() => {
    saveToStorage('staff', staff);
  }, [staff]);

  useEffect(() => {
    saveToStorage('projects', projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage('attendance', attendance);
  }, [attendance]);

  useEffect(() => {
    saveToStorage('transactions', transactions);
  }, [transactions]);

  useEffect(() => {
    saveToStorage('letters', letters);
  }, [letters]);

  useEffect(() => {
    saveToStorage('equipments', equipments);
  }, [equipments]);

  useEffect(() => {
    saveToStorage('equipment_logs', equipmentLogs);
  }, [equipmentLogs]);

  useEffect(() => {
    saveToStorage('candidates', candidates);
  }, [candidates]);

  useEffect(() => {
    saveToStorage('gas_settings', gasSettings);
  }, [gasSettings]);

  // Adjust default view when role switches
  const handleChangeRole = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'client') {
      setCurrentModule('client_portal');
    } else if (newRole === 'public') {
      setCurrentModule('recruitment_public');
    } else if (newRole === 'creator') {
      if (['finance', 'surat', 'equipments', 'recruitment_admin'].includes(currentModule)) {
        setCurrentModule('project_control');
      }
    }
  };

  // Handler functions
  const handleUpdateProject = (updated: ProjectItem) => {
    setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleCreateProject = (newProj: Omit<ProjectItem, 'id'>) => {
    const item: ProjectItem = {
      ...newProj,
      id: `prj-${Date.now().toString().slice(-4)}`
    };
    setProjects([item, ...projects]);
  };

  const handleAddClient = (newClient: ClientItem) => {
    setClients([newClient, ...clients]);
  };

  const handleUpdateClient = (updated: ClientItem) => {
    setClients(clients.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleRecordAttendance = (record: AttendanceRecord) => {
    setAttendance([record, ...attendance]);
  };

  const handleUpdateStaff = (updated: StaffItem) => {
    setStaff(staff.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleAddTransaction = (trx: FinanceTransaction) => {
    setTransactions([trx, ...transactions]);
  };

  const handleAddLetter = (letter: OfficialLetter) => {
    setLetters([letter, ...letters]);
  };

  const handleUpdateLetter = (letter: OfficialLetter) => {
    setLetters(letters.map((l) => (l.id === letter.id ? letter : l)));
  };

  const handleAddEquipment = (eq: EquipmentItem) => {
    setEquipments([eq, ...equipments]);
  };

  const handleLoanEquipment = (
    eqId: string,
    borrower: string,
    project: string,
    returnDate: string
  ) => {
    const targetEq = equipments.find((e) => e.id === eqId);
    if (!targetEq) return;

    setEquipments(
      equipments.map((e) =>
        e.id === eqId
          ? {
              ...e,
              status: 'borrowed',
              currentBorrower: borrower,
              currentProject: project,
              returnExpectedDate: returnDate
            }
          : e
      )
    );

    const newLog: EquipmentLoanLog = {
      id: `log-${Date.now().toString().slice(-4)}`,
      equipmentId: eqId,
      equipmentName: targetEq.name,
      borrowerName: borrower,
      projectName: project,
      borrowDate: new Date().toISOString().slice(0, 10),
      conditionNotes: 'Kondisi dicek sebelum berangkat shooting.',
      status: 'active'
    };
    setEquipmentLogs([newLog, ...equipmentLogs]);
  };

  const handleReturnEquipment = (eqId: string, conditionNotes: string) => {
    setEquipments(
      equipments.map((e) =>
        e.id === eqId
          ? {
              ...e,
              status: 'available',
              currentBorrower: undefined,
              currentProject: undefined,
              returnExpectedDate: undefined
            }
          : e
      )
    );

    setEquipmentLogs(
      equipmentLogs.map((log) =>
        log.equipmentId === eqId && log.status === 'active'
          ? {
              ...log,
              status: 'returned',
              returnDate: new Date().toISOString().slice(0, 10),
              conditionNotes: conditionNotes
            }
          : log
      )
    );
  };

  const handleUpdateCandidate = (candidate: RecruitmentCandidate) => {
    setCandidates(candidates.map((c) => (c.id === candidate.id ? candidate : c)));
  };

  const handleSubmitApplication = (
    appData: Omit<RecruitmentCandidate, 'id' | 'stage' | 'scores' | 'appliedDate'>
  ) => {
    const newCand: RecruitmentCandidate = {
      ...appData,
      id: `cnd-${Date.now().toString().slice(-4)}`,
      stage: 'Applied',
      scores: { aesthetic: 7, technical: 7, culture: 7 },
      appliedDate: new Date().toISOString().slice(0, 10)
    };
    setCandidates([newCand, ...candidates]);
  };

  const handleSyncGas = () => {
    setIsSyncingGas(true);
    setTimeout(() => {
      setIsSyncingGas(false);
      setLastSyncTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 1200);
  };

  const handleImportBackup = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.clients) setClients(data.clients);
      if (data.projects) setProjects(data.projects);
      if (data.staff) setStaff(data.staff);
      if (data.attendance) setAttendance(data.attendance);
      if (data.transactions) setTransactions(data.transactions);
      if (data.letters) setLetters(data.letters);
      if (data.equipments) setEquipments(data.equipments);
      if (data.equipmentLogs) setEquipmentLogs(data.equipmentLogs);
      if (data.candidates) setCandidates(data.candidates);
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  };

  const pendingApprovalsCount = projects.filter(
    (p) => p.clientApprovalStatus === 'pending' || p.cdApprovalStatus === 'pending'
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-red-600 selection:text-white">
      {/* Dual Navigation Sidebar (Rail / Collapsed vs Expanded Desktop & Mobile Drawer) */}
      <Sidebar
        currentModule={currentModule}
        onSelectModule={(mod) => setCurrentModule(mod)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole={userRole}
        pendingApprovalsCount={pendingApprovalsCount}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Viewport Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ml-0 ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Top Bar Contract Zone */}
        <TopHeader
          currentModule={currentModule}
          userRole={userRole}
          onChangeUserRole={handleChangeRole}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenGasModal={() => setIsGasModalOpen(true)}
          onOpenSpecPdf={() => setIsSpecPdfModalOpen(true)}
          onSyncGas={handleSyncGas}
          isSyncing={isSyncingGas}
          lastSyncTime={lastSyncTime}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Content View Area */}
        <main className="flex-1 mt-16 p-3 sm:p-6 pb-24 md:pb-8 max-w-7xl w-full mx-auto">
          {currentModule === 'project_control' && (
            <ProjectControlView
              projects={projects}
              clients={clients}
              staff={staff}
              onUpdateProject={handleUpdateProject}
              onCreateProject={handleCreateProject}
            />
          )}

          {currentModule === 'crm_clients' && (
            <CrmClientsView
              clients={clients}
              onAddClient={handleAddClient}
              onUpdateClient={handleUpdateClient}
            />
          )}

          {currentModule === 'staff_hr' && (
            <StaffHrView
              staff={staff}
              attendance={attendance}
              onRecordAttendance={handleRecordAttendance}
              onUpdateStaff={handleUpdateStaff}
            />
          )}

          {currentModule === 'finance' && (
            <FinanceView
              transactions={transactions}
              clients={clients}
              onAddTransaction={handleAddTransaction}
            />
          )}

          {currentModule === 'surat' && (
            <DatabaseSuratView
              letters={letters}
              clients={clients}
              onAddLetter={handleAddLetter}
              onUpdateLetter={handleUpdateLetter}
            />
          )}

          {currentModule === 'documents' && (
            <DocumentsHubView
              onNavigate={(mod) => setCurrentModule(mod)}
              onOpenSpecPdf={() => setIsSpecPdfModalOpen(true)}
            />
          )}

          {currentModule === 'equipments' && (
            <EquipmentsHubView
              equipments={equipments}
              logs={equipmentLogs}
              staff={staff}
              clients={clients}
              onAddEquipment={handleAddEquipment}
              onLoanEquipment={handleLoanEquipment}
              onReturnEquipment={handleReturnEquipment}
            />
          )}

          {currentModule === 'packaging' && <PackagingBuilderView clients={clients} />}

          {currentModule === 'audit' && <SocialMediaAuditView />}

          {currentModule === 'recruitment_admin' && (
            <RecruitmentAdminView
              candidates={candidates}
              onUpdateCandidate={handleUpdateCandidate}
            />
          )}

          {currentModule === 'recruitment_public' && (
            <RecruitmentPublicView onSubmitApplication={handleSubmitApplication} />
          )}

          {currentModule === 'client_portal' && (
            <ClientPortalView
              projects={projects}
              clients={clients}
              onUpdateProject={handleUpdateProject}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav
        currentModule={currentModule}
        onSelectModule={(mod) => setCurrentModule(mod)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        userRole={userRole}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Connectivity & Offline Mode Indicator */}
      <OfflineIndicator />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(mod) => setCurrentModule(mod)}
        projects={projects}
        clients={clients}
      />

      {/* Google Spreadsheet (GAS V2) Settings & Backup Modal */}
      <GasConfigModal
        isOpen={isGasModalOpen}
        onClose={() => setIsGasModalOpen(false)}
        settings={gasSettings}
        onSaveSettings={(s) => setGasSettings(s)}
        onImportData={handleImportBackup}
      />

      {/* Official Web Apps Development Standard Specification PDF Modal */}
      <SpecificationPdfModal
        isOpen={isSpecPdfModalOpen}
        onClose={() => setIsSpecPdfModalOpen(false)}
      />
    </div>
  );
}
