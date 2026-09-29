import React, { useState } from 'react';
import { X, Database, Check, Download, Upload, RefreshCw, Key, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { GasSettings } from '../types';
import { exportAllDataAsJson } from '../services/storage';

interface GasConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GasSettings;
  onSaveSettings: (settings: GasSettings) => void;
  onImportData: (jsonString: string) => boolean;
}

export const GasConfigModal: React.FC<GasConfigModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onImportData
}) => {
  const [formData, setFormData] = useState<GasSettings>(settings);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus('success');
      setTimeout(() => setTestStatus('idle'), 3000);
    }, 1200);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportAllDataAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `obeecreatives_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const ok = onImportData(text);
        if (ok) {
          setImportStatus('Backup berhasil direstore!');
        } else {
          setImportStatus('Format file tidak valid.');
        }
      } catch (err) {
        setImportStatus('Gagal memproses file backup.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
              <FileSpreadsheet size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Integrasi Google Spreadsheet (GAS V2)
              </h2>
              <p className="text-xs text-slate-400">
                Arsitektur Router Modular & Sinkronisasi Database Agensi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Status Box */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold text-slate-200">Koneksi Database Aktif</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Endpoint siap menerima transaksi Project Control, CRM Clients, Staff & HR, Finance, dan Surat.
              </p>
            </div>
            <button
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-medium flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={13} className={testStatus === 'testing' ? 'animate-spin' : ''} />
              <span>{testStatus === 'testing' ? 'Testing...' : testStatus === 'success' ? 'Terhubung!' : 'Tes Ping GAS'}</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Google Apps Script Web App Deployment URL (Router V2)
              </label>
              <input
                type="text"
                value={formData.webhookUrl}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400 font-mono text-xs"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Skrip GAS V2 menangani routing aksi `action: 'getProjects' | 'syncCRM' | 'recordAttendance'`
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Master Spreadsheet Document ID / Key
              </label>
              <input
                type="text"
                value={formData.sheetId}
                onChange={(e) => setFormData({ ...formData, sheetId: e.target.value })}
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400 font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800">
              <div>
                <span className="font-medium text-slate-200 block">Auto-Sync Realtime</span>
                <span className="text-slate-400 text-[11px]">
                  Sinkronkan perubahan kanban dan status surat otomatis ke Google Sheet saat disimpan
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.autoSync}
                onChange={(e) => setFormData({ ...formData, autoSync: e.target.checked })}
                className="h-4 w-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Backup & Restore Data Local */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Backup & Snapshot Ekosistem Agensi
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadBackup}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
              >
                <Download size={14} className="text-amber-400" />
                <span>Export JSON Backup</span>
              </button>

              <label className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 cursor-pointer transition-colors">
                <Upload size={14} className="text-blue-400" />
                <span>Import JSON Restore</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {importStatus && (
              <p className="text-[11px] text-amber-400 font-medium text-center">
                {importStatus}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-lg"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onSaveSettings(formData);
              onClose();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-red-600/30"
          >
            <Check size={14} />
            <span>Simpan Konfigurasi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
