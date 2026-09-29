import React, { useState } from 'react';
import { Download, Smartphone, Monitor, Share2, PlusSquare, X, CheckCircle2, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full' | 'banner';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'compact',
  className = ''
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // If already installed as PWA standalone, no need to show the button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowManualModal(true);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      setShowManualModal(true);
    }
  };

  if (variant === 'banner') {
    return (
      <>
        <div className={`p-3.5 bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-500/30 rounded-xl flex items-center justify-between gap-3 shadow-lg ${className}`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-red-600/30 shrink-0">
              oc
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Install Obeecreatives OS</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-red-500/20 text-red-400 rounded border border-red-500/30 font-mono">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Akses instan di layar utama HP atau desktop tanpa browser bar.
              </p>
            </div>
          </div>

          <button
            onClick={handleInstallClick}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-all shrink-0 hover:scale-105 active:scale-95"
          >
            <Download size={14} />
            <span>Install</span>
          </button>
        </div>

        {/* Modals */}
        {renderModals()}
      </>
    );
  }

  function renderModals() {
    return (
      <>
        {/* iOS Safari Guide Modal */}
        {showIOSModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Install di iPhone / iPad</h3>
                    <p className="text-[11px] text-slate-400">Ikuti 2 langkah mudah di Safari</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-red-600/20 text-red-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <span>Ketuk tombol Bagikan / Share</span>
                      <Share2 size={13} className="text-red-400" />
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Ikon persegi dengan panah atas di bilah navigasi Safari.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-red-600/20 text-red-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <span>Pilih "Tambahkan ke Layar Utama"</span>
                      <PlusSquare size={13} className="text-red-400" />
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Gulir ke bawah dan ketuk <em>"Add to Home Screen"</em>.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        )}

        {/* Desktop / Android General Install Guidance Modal */}
        {showManualModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center">
                    <Monitor size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Install Obeecreatives OS</h3>
                    <p className="text-[11px] text-slate-400">Panduan Install Desktop & HP</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowManualModal(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="font-semibold text-white flex items-center gap-2 mb-1">
                    <Monitor size={14} className="text-red-400" />
                    <span>Di Google Chrome / Edge (Laptop & PC):</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Klik ikon <strong>Install Obee OS</strong> di sebelah kanan bilah alamat (URL bar) browser Anda, lalu klik <em>"Install"</em>.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="font-semibold text-white flex items-center gap-2 mb-1">
                    <Smartphone size={14} className="text-red-400" />
                    <span>Di Smartphone Android:</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Buka menu titik tiga (⋮) di Chrome, lalu pilih <strong>"Tambahkan ke Layar Utama"</strong> atau <strong>"Install Aplikasi"</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowManualModal(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Install Obeecreatives Workspace OS di HP / PC (PWA)"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-sm shadow-red-600/30 transition-all hover:scale-105 active:scale-95 border border-red-500/40 ${className}`}
      >
        <Download size={13} />
        <span className="font-medium">Install App</span>
      </button>

      {renderModals()}
    </>
  );
};
