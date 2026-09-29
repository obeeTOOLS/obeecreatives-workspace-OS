import React, { useState } from 'react';
import {
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  FileText,
  Printer,
  X,
  CheckCircle2,
  Calendar,
  Building
} from 'lucide-react';
import { FinanceTransaction, ClientItem } from '../types';

interface FinanceViewProps {
  transactions: FinanceTransaction[];
  clients: ClientItem[];
  onAddTransaction: (trx: FinanceTransaction) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  transactions,
  clients,
  onAddTransaction
}) => {
  const [activeTab, setActiveTab] = useState<'cashflow' | 'invoice_generator'>('cashflow');
  const [isAddTrxOpen, setIsAddTrxOpen] = useState(false);

  // New Transaction Form
  const [trxType, setTrxType] = useState<'income' | 'expense'>('income');
  const [trxCategory, setTrxCategory] = useState<any>('Client Retainer');
  const [trxDesc, setTrxDesc] = useState('');
  const [trxAmount, setTrxAmount] = useState<number>(10000000);
  const [trxDate, setTrxDate] = useState('2026-09-29');
  const [trxParty, setTrxParty] = useState('');

  // Invoice Generator State
  const [invClient, setInvClient] = useState(clients[0]?.company || 'Kopi Kenangan Mantan');
  const [invNumber, setInvNumber] = useState('INV/202610/042');
  const [invDate, setInvDate] = useState('2026-10-01');
  const [invDueDate, setInvDueDate] = useState('2026-10-15');
  const [invItems, setInvItems] = useState<{ desc: string; qty: number; rate: number }[]>([
    { desc: 'Monthly Retainer SMM (16 Reels + 8 Carousel) - Oktober 2026', qty: 1, rate: 24500000 },
    { desc: 'Add-on: Extra 2 Video Shooting Studio + Wardrobe', qty: 1, rate: 3500000 },
  ]);
  const [invPpn, setInvPpn] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const invSubtotal = invItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const invTax = invPpn ? invSubtotal * 0.11 : 0;
  const invTotal = invSubtotal + invTax;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({
      id: `trx-${Date.now().toString().slice(-4)}`,
      type: trxType,
      category: trxCategory,
      description: trxDesc,
      amount: Number(trxAmount),
      date: trxDate,
      referenceNo: `TRX/${new Date().getFullYear()}/${Date.now().toString().slice(-3)}`,
      status: 'completed',
      clientOrStaffName: trxParty
    });
    setIsAddTrxOpen(false);
    setTrxDesc('');
    setTrxParty('');
  };

  const addItemRow = () => {
    setInvItems([...invItems, { desc: 'Layanan Kreatif Tambahan', qty: 1, rate: 1000000 }]);
  };

  const removeItemRow = (idx: number) => {
    setInvItems(invItems.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {/* View Switcher Tabs */}
      <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg self-start">
        <button
          onClick={() => setActiveTab('cashflow')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'cashflow'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CircleDollarSign size={14} />
          <span>Arus Kas & Buku Kas</span>
        </button>

        <button
          onClick={() => setActiveTab('invoice_generator')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'invoice_generator'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText size={14} />
          <span>Generator Invoice Agensi</span>
        </button>
      </div>

      {activeTab === 'cashflow' ? (
        <div className="space-y-6">
          {/* Financial Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-emerald-500">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Pemasukan Agensi (Inflow)</span>
                <TrendingUp size={16} className="text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-400">
                Rp {totalIncome.toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Dari retainer klien & project TVC</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-rose-500">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Pengeluaran Operasional (Outflow)</span>
                <TrendingDown size={16} className="text-rose-400" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-400">
                Rp {totalExpense.toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Fee creator, sewa studio & gear</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-red-600">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Net Agency Margin</span>
                <span className="font-mono text-xs font-bold text-red-400">
                  {totalIncome > 0 ? `${((netProfit / totalIncome) * 100).toFixed(1)}%` : '0%'}
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">
                Rp {netProfit.toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Profit bersih agensi setelah fee</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Rekening Resmi Obeecreatives</span>
                <Building size={16} className="text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-400">
                BCA: 5410-889-102
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">A.n PT Obee Rekacipta Nusantara</span>
            </div>
          </div>

          {/* Transactions Ledger Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">Buku Kas & Transaksi Operasional</h3>
                <p className="text-xs text-slate-400">Pencatatan mutasi otomatis terhubung ke Sheet Finance</p>
              </div>

              <button
                onClick={() => setIsAddTrxOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-red-600/30"
              >
                <Plus size={14} />
                <span>Catat Transaksi</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">No. Bukti / Ref</th>
                    <th className="py-3 px-4">Deskripsi Transaksi</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Pihak Terkait</th>
                    <th className="py-3 px-4 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {transactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400">{trx.date}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{trx.referenceNo}</td>
                      <td className="py-3 px-4 font-medium text-slate-100 max-w-sm truncate">
                        {trx.description}
                      </td>
                      <td className="py-3 px-4 text-slate-400">{trx.category}</td>
                      <td className="py-3 px-4 text-slate-300">{trx.clientOrStaffName || '—'}</td>
                      <td
                        className={`py-3 px-4 font-mono font-bold text-right ${
                          trx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {trx.type === 'income' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* INVOICE GENERATOR VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">Editor Invoice Agensi</h3>
              <span className="text-xs font-mono text-amber-400 font-semibold">{invNumber}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Ditujukan Kepada (Klien)</label>
                <select
                  value={invClient}
                  onChange={(e) => setInvClient(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.company}>
                      {c.company}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Nomor Invoice</label>
                <input
                  type="text"
                  value={invNumber}
                  onChange={(e) => setInvNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tanggal Terbit</label>
                <input
                  type="date"
                  value={invDate}
                  onChange={(e) => setInvDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Jatuh Tempo (Due Date)</label>
                <input
                  type="date"
                  value={invDueDate}
                  onChange={(e) => setInvDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Item Layanan & Deskripsi Biaya</span>
                <button
                  type="button"
                  onClick={addItemRow}
                  className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>Tambah Baris</span>
                </button>
              </div>

              <div className="space-y-2">
                {invItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center text-xs">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => {
                        const copy = [...invItems];
                        copy[idx].desc = e.target.value;
                        setInvItems(copy);
                      }}
                      placeholder="Deskripsi jasa..."
                      className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                    />
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => {
                        const copy = [...invItems];
                        copy[idx].qty = Number(e.target.value);
                        setInvItems(copy);
                      }}
                      className="w-16 px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-center font-mono"
                    />
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => {
                        const copy = [...invItems];
                        copy[idx].rate = Number(e.target.value);
                        setInvItems(copy);
                      }}
                      className="w-32 px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1.5"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-300 font-medium">Kenakan PPN 11% (Faktur Pajak)</span>
              <input
                type="checkbox"
                checked={invPpn}
                onChange={(e) => setInvPpn(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 text-amber-500"
              />
            </div>

            {/* Total calculation */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-right">
              <div className="text-slate-400">
                Subtotal: <span className="font-mono text-slate-200">Rp {invSubtotal.toLocaleString('id-ID')}</span>
              </div>
              {invPpn && (
                <div className="text-slate-400">
                  PPN 11%: <span className="font-mono text-slate-200">Rp {invTax.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="text-base font-bold text-amber-400 pt-1 border-t border-slate-800/80">
                Grand Total: <span className="font-mono">Rp {invTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button
              onClick={() => setIsPreviewOpen(true)}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Printer size={15} />
              <span>Preview & Cetak Dokumen Invoice</span>
            </button>
          </div>

          {/* Printable Preview Card */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-xl p-6 shadow-xl border border-slate-200 text-xs space-y-5">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <div className="text-lg font-black tracking-tight text-slate-950">obeecreatives</div>
                <div className="text-[11px] text-slate-500">PT Obee Rekacipta Nusantara</div>
                <div className="text-[10px] text-slate-500">Senopati, Kebayoran Baru, Jakarta Selatan</div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-slate-900">INVOICE</div>
                <div className="font-mono text-[11px] text-slate-600">{invNumber}</div>
                <div className="text-[10px] text-slate-500">Tgl: {invDate}</div>
              </div>
            </div>

            {/* Client info */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tagihan Kepada:</span>
              <div className="font-bold text-slate-900 text-sm">{invClient}</div>
              <div className="text-[11px] text-slate-600">Jatuh Tempo: {invDueDate}</div>
            </div>

            {/* Table */}
            <table className="w-full text-left text-[11px]">
              <thead className="border-b border-slate-300 text-slate-500 uppercase text-[9px]">
                <tr>
                  <th className="py-1">Deskripsi</th>
                  <th className="py-1 text-center">Qty</th>
                  <th className="py-1 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5">{item.desc}</td>
                    <td className="py-1.5 text-center font-mono">{item.qty}</td>
                    <td className="py-1.5 text-right font-mono font-medium">
                      Rp {(item.qty * item.rate).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Payment Details */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-[10px] space-y-1">
              <span className="font-bold block text-slate-700">Instruksi Pembayaran:</span>
              <div>Bank Central Asia (BCA): <span className="font-mono font-semibold">5410-889-102</span></div>
              <div>A.n: PT Obee Rekacipta Nusantara</div>
            </div>

            <div className="text-right border-t border-slate-200 pt-2">
              <div className="text-sm font-black text-slate-900 font-mono">
                Total Tagihan: Rp {invTotal.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE TRANSACTION MODAL */}
      {isAddTrxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleAddSubmit}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
              <h2 className="text-base font-bold text-slate-100">Catat Transaksi Kas Agensi</h2>
              <button
                type="button"
                onClick={() => setIsAddTrxOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTrxType('income')}
                  className={`py-2 rounded-lg font-bold transition-colors ${
                    trxType === 'income' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  Pemasukan (In)
                </button>
                <button
                  type="button"
                  onClick={() => setTrxType('expense')}
                  className={`py-2 rounded-lg font-bold transition-colors ${
                    trxType === 'expense' ? 'bg-rose-500 text-white' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  Pengeluaran (Out)
                </button>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Kategori</label>
                <select
                  value={trxCategory}
                  onChange={(e) => setTrxCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                >
                  <option value="Client Retainer">Client Retainer</option>
                  <option value="Creator Fee Payout">Creator Fee Payout</option>
                  <option value="Studio & Gear Rental">Studio & Gear Rental</option>
                  <option value="Operational & Utilities">Operational & Utilities</option>
                  <option value="Software & Subscriptions">Software & Subscriptions</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Deskripsi Transaksi</label>
                <input
                  required
                  type="text"
                  value={trxDesc}
                  onChange={(e) => setTrxDesc(e.target.value)}
                  placeholder="Contoh: Pembayaran invoice retainer Somethinc Glow Lab"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nominal (IDR)</label>
                  <input
                    required
                    type="number"
                    value={trxAmount}
                    onChange={(e) => setTrxAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={trxDate}
                    onChange={(e) => setTrxDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Pihak Terkait (Klien / Vendor / Staff)</label>
                <input
                  type="text"
                  value={trxParty}
                  onChange={(e) => setTrxParty(e.target.value)}
                  placeholder="Contoh: Bima Satria / Somethinc"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddTrxOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 text-xs font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                Simpan Transaksi
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
