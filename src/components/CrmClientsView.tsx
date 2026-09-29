import React, { useState } from 'react';
import {
  Users2,
  Plus,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  MessageSquare,
  Edit3,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { ClientItem } from '../types';

interface CrmClientsViewProps {
  clients: ClientItem[];
  onAddClient: (client: ClientItem) => void;
  onUpdateClient: (client: ClientItem) => void;
}

export const CrmClientsView: React.FC<CrmClientsViewProps> = ({
  clients,
  onAddClient,
  onUpdateClient
}) => {
  const [filterDivision, setFilterDivision] = useState<'smm_only' | 'all'>('smm_only');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);

  // Form State
  const [formCompany, setFormCompany] = useState('');
  const [formContactName, setFormContactName] = useState('');
  const [formPhone, setFormPhone] = useState('+62 ');
  const [formEmail, setFormEmail] = useState('');
  const [formDivision, setFormDivision] = useState<'Social Media Management' | 'Branding' | 'Commercial Video'>('Social Media Management');
  const [formRetainer, setFormRetainer] = useState(25000000);
  const [formContractStart, setFormContractStart] = useState('2026-01-01');
  const [formContractEnd, setFormContractEnd] = useState('2026-12-31');
  const [formReelsQuota, setFormReelsQuota] = useState(16);
  const [formCarouselsQuota, setFormCarouselsQuota] = useState(8);
  const [formStoriesQuota, setFormStoriesQuota] = useState(30);
  const [formBrandColor, setFormBrandColor] = useState('#E11D48');
  const [formNotes, setFormNotes] = useState('');

  const filteredClients = clients.filter((c) => {
    // Blueprint rule: Filter otomatis hanya divisi Social Media Management secara default
    if (filterDivision === 'smm_only' && c.division !== 'Social Media Management') {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      // Blueprint rule: Memprioritaskan nama perusahaan (company), cadangan nama kontak (name)
      const companyMatch = c.company.toLowerCase().includes(q);
      const contactMatch = c.contactName.toLowerCase().includes(q);
      return companyMatch || contactMatch;
    }
    return true;
  });

  const totalMonthlyRetainers = clients
    .filter(c => c.status === 'active')
    .reduce((acc, curr) => acc + curr.retainerMonthlyValue, 0);

  const openCreateModal = () => {
    setEditingClient(null);
    setFormCompany('');
    setFormContactName('');
    setFormPhone('+62 ');
    setFormEmail('');
    setFormDivision('Social Media Management');
    setFormRetainer(25000000);
    setFormNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (client: ClientItem) => {
    setEditingClient(client);
    setFormCompany(client.company);
    setFormContactName(client.contactName);
    setFormPhone(client.phone);
    setFormEmail(client.email);
    setFormDivision(client.division);
    setFormRetainer(client.retainerMonthlyValue);
    setFormContractStart(client.contractStart);
    setFormContractEnd(client.contractEnd);
    setFormReelsQuota(client.quota.reels);
    setFormCarouselsQuota(client.quota.carousels);
    setFormStoriesQuota(client.quota.stories);
    setFormBrandColor(client.brandColor);
    setFormNotes(client.notes);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      onUpdateClient({
        ...editingClient,
        company: formCompany,
        contactName: formContactName,
        phone: formPhone,
        email: formEmail,
        division: formDivision,
        retainerMonthlyValue: Number(formRetainer),
        contractStart: formContractStart,
        contractEnd: formContractEnd,
        quota: {
          reels: Number(formReelsQuota),
          carousels: Number(formCarouselsQuota),
          stories: Number(formStoriesQuota)
        },
        brandColor: formBrandColor,
        notes: formNotes
      });
    } else {
      onAddClient({
        id: `cli-${Date.now().toString().slice(-4)}`,
        company: formCompany,
        contactName: formContactName,
        phone: formPhone,
        email: formEmail,
        division: formDivision,
        retainerMonthlyValue: Number(formRetainer),
        contractStart: formContractStart,
        contractEnd: formContractEnd,
        quota: {
          reels: Number(formReelsQuota),
          carousels: Number(formCarouselsQuota),
          stories: Number(formStoriesQuota)
        },
        brandColor: formBrandColor,
        status: 'active',
        brandKitDriveUrl: 'https://drive.google.com/drive/folders/brandkit-new',
        notes: formNotes
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-400 block mb-1">Total Nilai Retainer Bulanan (MRR)</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            Rp {(totalMonthlyRetainers / 1000000).toFixed(1)} Juta / bln
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Arus kas tetap dari kontrak aktif</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-red-600">
          <span className="text-xs text-slate-400 block mb-1">Klien Social Media Management</span>
          <div className="text-2xl font-bold font-mono text-red-500">
            {clients.filter(c => c.division === 'Social Media Management').length} Brand
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Klien retainers produksi konten reguler</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-slate-700">
          <span className="text-xs text-slate-400 block mb-1">Target Kuota Konten Bulanan</span>
          <div className="text-2xl font-bold font-mono text-slate-100">
            {clients.reduce((acc, curr) => acc + (curr.quota.reels + curr.quota.carousels), 0)} Konten / bln
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Kapasitas beban kerja tim kreatif</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* SMM Filter Toggle */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setFilterDivision('smm_only')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterDivision === 'smm_only'
                  ? 'bg-red-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Social Media Management (SMM)
            </button>
            <button
              onClick={() => setFilterDivision('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterDivision === 'all'
                  ? 'bg-red-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua Divisi ({clients.length})
            </button>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama perusahaan atau PIC..."
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-red-500 w-56"
          />
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-red-600/30 self-start"
        >
          <Plus size={15} />
          <span>Tambah Klien CRM</span>
        </button>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredClients.map((client) => {
          const cleanPhone = client.phone.replace(/[^0-9]/g, '');

          return (
            <div
              key={client.id}
              className="bg-slate-900 border border-slate-800 hover:border-red-500/50 rounded-xl p-5 space-y-4 transition-all border-l-4 border-l-red-600 shadow-xs"
            >
              {/* Header: Company Name prioritised */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: client.brandColor || '#DC2626' }}
                    ></span>
                    <h3 className="text-base font-bold text-slate-100 leading-tight">
                      {client.company}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>PIC: {client.contactName}</span>
                    <span>·</span>
                    <span className="font-mono text-red-400 text-[11px]">{client.division}</span>
                  </div>
                </div>

                <button
                  onClick={() => openEditModal(client)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Edit3 size={15} />
                </button>
              </div>

              {/* Monthly Deliverables Quota Pills */}
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Reels</span>
                  <span className="font-mono font-bold text-slate-100 text-sm">{client.quota.reels} /bln</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Carousel</span>
                  <span className="font-mono font-bold text-slate-100 text-sm">{client.quota.carousels} /bln</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Stories</span>
                  <span className="font-mono font-bold text-slate-100 text-sm">{client.quota.stories} /bln</span>
                </div>
              </div>

              {/* Retainer & Contract Validity */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Nilai Retainer:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    Rp {client.retainerMonthlyValue.toLocaleString('id-ID')} /bln
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>Masa Kontrak:</span>
                  <span className="font-mono text-slate-300">
                    {client.contractStart} s/d {client.contractEnd}
                  </span>
                </div>
              </div>

              {/* Brief / Strategic Notes */}
              {client.notes && (
                <p className="text-xs text-slate-400 bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/60 line-clamp-2">
                  {client.notes}
                </p>
              )}

              {/* Action Buttons: WhatsApp & Brand Kit */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp PIC</span>
                </a>

                {client.brandKitDriveUrl && (
                  <a
                    href={client.brandKitDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <span>Brand Kit GDrive</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD / EDIT CLIENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSave}
            className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
              <h2 className="text-base font-bold text-slate-100">
                {editingClient ? 'Edit Profil Klien CRM' : 'Registrasi Klien Resmi Baru'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Nama Perusahaan / Brand (Prioritas)
                  </label>
                  <input
                    required
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="Contoh: Kopi Kenangan Mantan"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Nama Kontak PIC (Cadangan)
                  </label>
                  <input
                    required
                    type="text"
                    value={formContactName}
                    onChange={(e) => setFormContactName(e.target.value)}
                    placeholder="Contoh: Rian Pratama (Marketing Lead)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nomor WhatsApp PIC</label>
                  <input
                    required
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="corp@brand.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Divisi Layanan</label>
                  <select
                    value={formDivision}
                    onChange={(e) => setFormDivision(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  >
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Branding">Branding & Visual Identity</option>
                    <option value="Commercial Video">Commercial Video TVC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Retainer Bulanan (IDR)</label>
                  <input
                    type="number"
                    value={formRetainer}
                    onChange={(e) => setFormRetainer(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kuota Reels / Bln</label>
                  <input
                    type="number"
                    value={formReelsQuota}
                    onChange={(e) => setFormReelsQuota(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kuota Carousel</label>
                  <input
                    type="number"
                    value={formCarouselsQuota}
                    onChange={(e) => setFormCarouselsQuota(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kuota Stories</label>
                  <input
                    type="number"
                    value={formStoriesQuota}
                    onChange={(e) => setFormStoriesQuota(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Brief Strategis Brand</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Arahan tone of voice, USP produk, atau target audiens brand..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                {editingClient ? 'Perbarui Klien' : 'Simpan Klien'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
