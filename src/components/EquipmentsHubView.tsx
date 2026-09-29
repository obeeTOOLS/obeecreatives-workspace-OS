import React, { useState } from 'react';
import {
  Camera,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRightLeft,
  Search,
  Filter,
  UserCheck,
  Package
} from 'lucide-react';
import { EquipmentItem, EquipmentLoanLog, StaffItem, ClientItem } from '../types';

interface EquipmentsHubViewProps {
  equipments: EquipmentItem[];
  logs: EquipmentLoanLog[];
  staff: StaffItem[];
  clients: ClientItem[];
  onAddEquipment: (eq: EquipmentItem) => void;
  onLoanEquipment: (eqId: string, borrower: string, project: string, returnDate: string) => void;
  onReturnEquipment: (eqId: string, conditionNotes: string) => void;
}

export const EquipmentsHubView: React.FC<EquipmentsHubViewProps> = ({
  equipments,
  logs,
  staff,
  clients,
  onAddEquipment,
  onLoanEquipment,
  onReturnEquipment
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Loan Modal
  const [loaningGear, setLoaningGear] = useState<EquipmentItem | null>(null);
  const [borrowerName, setBorrowerName] = useState(staff[0]?.name || '');
  const [projectName, setProjectName] = useState(clients[0]?.company ? `Shooting ${clients[0].company}` : 'Shooting Studio');
  const [expectedReturn, setExpectedReturn] = useState('2026-10-02');

  // Return Modal
  const [returningGear, setReturningGear] = useState<EquipmentItem | null>(null);
  const [conditionNotes, setConditionNotes] = useState('Kondisi alat baik, bersih, dan lengkap.');

  // Add Equipment Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<any>('Camera');
  const [newSerial, setNewSerial] = useState('SN-');

  const filteredEquipments = equipments.filter((eq) => {
    if (filterCategory !== 'all' && eq.category !== filterCategory) return false;
    if (filterStatus !== 'all' && eq.status !== filterStatus) return false;
    if (search && !eq.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const availableCount = equipments.filter((e) => e.status === 'available').length;
  const borrowedCount = equipments.filter((e) => e.status === 'borrowed').length;
  const maintenanceCount = equipments.filter((e) => e.status === 'maintenance').length;

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loaningGear) return;
    onLoanEquipment(loaningGear.id, borrowerName, projectName, expectedReturn);
    setLoaningGear(null);
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returningGear) return;
    onReturnEquipment(returningGear.id, conditionNotes);
    setReturningGear(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEquipment({
      id: `eq-${Date.now().toString().slice(-4)}`,
      name: newName,
      category: newCategory,
      serialNumber: newSerial,
      condition: 'Good',
      status: 'available'
    });
    setIsAddOpen(false);
    setNewName('');
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-400 block mb-1">Peralatan Tersedia di Studio</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {availableCount} Unit
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Siap digunakan untuk jadwal shooting</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-red-600">
          <span className="text-xs text-slate-400 block mb-1">Sedang Dipinjam / Di Lapangan</span>
          <div className="text-2xl font-bold font-mono text-red-500">
            {borrowedCount} Unit
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">On-location production shoot</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-slate-700">
          <span className="text-xs text-slate-400 block mb-1">Dalam Pemeliharaan / Servis</span>
          <div className="text-2xl font-bold font-mono text-slate-400">
            {maintenanceCount} Unit
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Pembersihan sensor & kalibrasi</span>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kamera, lensa, lighting..."
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-red-500 w-56"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="all">Semua Kategori</option>
            <option value="Camera">Kamera</option>
            <option value="Lens">Lensa</option>
            <option value="Lighting">Lighting & Grip</option>
            <option value="Audio">Audio & Mic</option>
            <option value="Grip & Drone">Gimbal & Drone</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="all">Semua Status</option>
            <option value="available">Tersedia (Studio)</option>
            <option value="borrowed">Sedang Dipinjam</option>
            <option value="maintenance">Perawatan</option>
          </select>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-red-600/30 self-start"
        >
          <Plus size={14} />
          <span>Tambah Alat Studio</span>
        </button>
      </div>

      {/* Equipments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredEquipments.map((gear) => (
          <div
            key={gear.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between space-y-4 transition-all"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-amber-400 uppercase font-semibold">{gear.category}</span>
                <span className="text-slate-400">{gear.serialNumber}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-100 leading-snug">{gear.name}</h4>

              {/* Status Indicator */}
              <div className="pt-1">
                {gear.status === 'available' && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span>Tersedia di Studio</span>
                  </span>
                )}
                {gear.status === 'borrowed' && (
                  <div className="text-xs text-amber-400 space-y-0.5">
                    <div className="inline-flex items-center gap-1.5 font-medium">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                      <span>Dipinjam: {gear.currentBorrower}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      Project: {gear.currentProject}
                    </div>
                  </div>
                )}
                {gear.status === 'maintenance' && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <span className="h-2 w-2 rounded-full bg-slate-500"></span>
                    <span>Dalam Perawatan</span>
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-800">
              {gear.status === 'available' ? (
                <button
                  onClick={() => setLoaningGear(gear)}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowRightLeft size={13} />
                  <span>Check-Out (Pinjam)</span>
                </button>
              ) : gear.status === 'borrowed' ? (
                <button
                  onClick={() => setReturningGear(gear)}
                  className="w-full py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={13} />
                  <span>Check-In (Kembalikan)</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-1.5 bg-slate-950 text-slate-600 text-xs font-medium rounded-lg cursor-not-allowed"
                >
                  Sedang Diservis
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RECENT LOAN LOGS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-100">Riwayat Peminjaman & Pemakaian Studio</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Nama Alat</th>
                <th className="py-3 px-4">Peminjam</th>
                <th className="py-3 px-4">Keperluan Project</th>
                <th className="py-3 px-4">Tanggal Pinjam</th>
                <th className="py-3 px-4">Catatan Kondisi</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-slate-100">{log.equipmentName}</td>
                  <td className="py-3 px-4">{log.borrowerName}</td>
                  <td className="py-3 px-4 text-amber-400">{log.projectName}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{log.borrowDate}</td>
                  <td className="py-3 px-4 text-slate-400 max-w-xs truncate">{log.conditionNotes}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                        log.status === 'active'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {log.status === 'active' ? 'Sedang Dipakai' : 'Dikembalikan'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LOAN MODAL */}
      {loaningGear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleLoanSubmit}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">Check-Out Peminjaman Alat</h3>
              <button
                type="button"
                onClick={() => setLoaningGear(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Alat yang dipinjam:</span>
              <span className="font-bold text-amber-400 text-sm">{loaningGear.name}</span>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Nama Peminjam</label>
              <select
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              >
                {staff.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Keperluan Project / Klien</label>
              <input
                required
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Contoh: Shooting Reels Somethinc di Studio"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Estimasi Tanggal Kembali</label>
              <input
                type="date"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLoaningGear(null)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors"
              >
                Konfirmasi Pinjam
              </button>
            </div>
          </form>
        </div>
      )}

      {/* RETURN MODAL */}
      {returningGear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleReturnSubmit}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">Check-In Pengembalian Alat</h3>
              <button
                type="button"
                onClick={() => setReturningGear(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Alat yang dikembalikan:</span>
              <span className="font-bold text-emerald-400 text-sm">{returningGear.name}</span>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Catatan Pemeriksaan Fisik Alat</label>
              <textarea
                rows={3}
                value={conditionNotes}
                onChange={(e) => setConditionNotes(e.target.value)}
                placeholder="Sensor bersih, lensa tidak ada goresan, baterai terisi penuh..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReturningGear(null)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg transition-colors"
              >
                Simpan & Tandai Kembali
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD GEAR MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleAddSubmit}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">Registrasi Inventaris Alat Baru</h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Nama Alat & Seri Lengkap</label>
              <input
                required
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Contoh: Sony FE 85mm f/1.4 GM Lens"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                >
                  <option value="Camera">Kamera</option>
                  <option value="Lens">Lensa</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Audio">Audio</option>
                  <option value="Grip & Drone">Grip & Drone</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Serial Number (SN)</label>
                <input
                  required
                  type="text"
                  value={newSerial}
                  onChange={(e) => setNewSerial(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors"
              >
                Simpan ke Database
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
