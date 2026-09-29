import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Layers,
  Sparkles,
  Download,
  Printer,
  Copy,
  Check,
  Palette,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { PackagingSpec, ClientItem } from '../types';

interface PackagingBuilderViewProps {
  clients: ClientItem[];
}

export const PackagingBuilderView: React.FC<PackagingBuilderViewProps> = ({ clients }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [spec, setSpec] = useState<PackagingSpec>({
    clientName: clients[0]?.company || 'Kopi Kenangan Mantan',
    productName: 'Signature Cold Brew Roasted Beans Box',
    boxType: 'Tuck-End Box',
    dimensions: {
      width: 120, // mm
      depth: 60,  // mm
      height: 180 // mm
    },
    material: 'Ivory 310gsm',
    coating: 'Matte Doff Lamination',
    specialFinishing: ['Hot Foil Gold Stamping', 'Emboss Logo Timbal Balik'],
    pantoneCodes: 'PANTONE 187 C (Rich Red), PANTONE 871 C (Gold)',
    cmykValues: { c: 15, m: 100, y: 90, k: 10 },
    quantityOrder: 5000,
    dieLineUnit: 'mm'
  });

  const [copied, setCopied] = useState(false);

  // Render 3D Wireframe / Isometric Box on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Scaling factors based on mm
    const scale = 0.8;
    const boxW = (spec.dimensions.width / 1.5) * scale;
    const boxD = (spec.dimensions.depth / 1.5) * scale;
    const boxH = (spec.dimensions.height / 1.5) * scale;

    const centerX = width / 2 - boxW / 4;
    const centerY = height / 2 + boxH / 4;

    // Isometric isometric angles
    const isoAngle = Math.PI / 6; // 30 deg

    // Coordinates of box corners
    // Front Face (p0: bottom-left, p1: bottom-right, p2: top-right, p3: top-left)
    const p0 = { x: centerX, y: centerY };
    const p1 = { x: centerX + boxW * Math.cos(isoAngle), y: centerY + boxW * Math.sin(isoAngle) };
    const p2 = { x: p1.x, y: p1.y - boxH };
    const p3 = { x: p0.x, y: p0.y - boxH };

    // Right Face (from p1 going back: p4: bottom-back-right, p5: top-back-right)
    const p4 = { x: p1.x - boxD * Math.cos(isoAngle), y: p1.y + boxD * Math.sin(isoAngle) }; // back right
    const p5 = { x: p4.x, y: p4.y - boxH };

    // Top Face: p3, p2, p6 (back center)
    const p6 = { x: p3.x - boxD * Math.cos(isoAngle), y: p3.y + boxD * Math.sin(isoAngle) };

    // Draw Front Panel
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Top Panel
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(p3.x, p3.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p5.x, p5.y);
    ctx.lineTo(p6.x, p6.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label Front
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${spec.productName.slice(0, 18)}...`, (p0.x + p1.x) / 2, (p0.y + p3.y) / 2 - 10);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`${spec.dimensions.width} × ${spec.dimensions.height} mm`, (p0.x + p1.x) / 2, (p0.y + p3.y) / 2 + 10);

    // Dimension lines
    ctx.strokeStyle = '#64748B';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    // Width line
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y + 15);
    ctx.lineTo(p1.x, p1.y + 15);
    ctx.stroke();
    // Height line
    ctx.beginPath();
    ctx.moveTo(p0.x - 15, p0.y);
    ctx.lineTo(p3.x - 15, p3.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [spec]);

  const toggleFinishing = (item: string) => {
    if (spec.specialFinishing.includes(item)) {
      setSpec({ ...spec, specialFinishing: spec.specialFinishing.filter((f) => f !== item) });
    } else {
      setSpec({ ...spec, specialFinishing: [...spec.specialFinishing, item] });
    }
  };

  const handleCopySpecText = () => {
    const text = `SPESIFIKASI CETAK PACKAGING - OBEECREATIVES
Brand Klien: ${spec.clientName}
Produk: ${spec.productName}
Jenis Box: ${spec.boxType}
Dimensi: ${spec.dimensions.width} mm (Lebar) × ${spec.dimensions.depth} mm (Kedalaman) × ${spec.dimensions.height} mm (Tinggi)
Material Kertas: ${spec.material}
Finishing Laminasi: ${spec.coating}
Finishing Khusus: ${spec.specialFinishing.join(', ')}
Pantone / CMYK: ${spec.pantoneCodes} (CMYK: ${spec.cmykValues.c}, ${spec.cmykValues.m}, ${spec.cmykValues.y}, ${spec.cmykValues.k})
Estimasi Oplag Cetak: ${spec.quantityOrder.toLocaleString('id-ID')} pcs
Prepared by: Obeecreatives Packaging Lab`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100">
            Logo & Packaging Specification Builder
          </h2>
          <p className="text-xs text-slate-400">
            Kalkulator die-line, perancangan mockup box kemasan & lembar spesifikasi percetakan
          </p>
        </div>

        <button
          onClick={handleCopySpecText}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-red-600/30 self-start"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Spec Tersalin!' : 'Copy Lembar Spek Vendor'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Parameter Controls */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 text-xs border-l-4 border-l-red-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Brand / Klien</label>
              <select
                value={spec.clientName}
                onChange={(e) => setSpec({ ...spec, clientName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.company}>
                    {c.company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Nama Varian Produk</label>
              <input
                type="text"
                value={spec.productName}
                onChange={(e) => setSpec({ ...spec, productName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Model Bentuk Box</label>
              <select
                value={spec.boxType}
                onChange={(e) => setSpec({ ...spec, boxType: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              >
                <option value="Tuck-End Box">Tuck-End Box (Kemasan Retail)</option>
                <option value="Corrugated Mailer">Corrugated Mailer (E-Commerce)</option>
                <option value="Rigid Luxury Box">Rigid Luxury Box (Hardbox Mewah)</option>
                <option value="Pouch / Sachet">Standing Pouch / Sachet Foil</option>
                <option value="Coffee Bean Bag">Gusset Bag (Biji Kopi)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Bahan Baku (Paper Material)</label>
              <select
                value={spec.material}
                onChange={(e) => setSpec({ ...spec, material: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              >
                <option value="Ivory 310gsm">Ivory 310gsm (Standar Premium Putih)</option>
                <option value="Kraft Paper 350gsm">Kraft Paper 350gsm (Eco / Cokelat Natural)</option>
                <option value="Art Carton 260gsm">Art Carton 260gsm (Ringan & Ekonomis)</option>
                <option value="Duplex 350gsm">Duplex 350gsm (Sisi Dalam Abu)</option>
              </select>
            </div>
          </div>

          {/* Dieline Dimensions Sliders */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <span className="font-bold text-slate-200 block">
              Ukuran Dimensi Die-Line (Milimeter)
            </span>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Lebar (W):</span>
                  <span className="font-mono text-amber-400 font-bold">{spec.dimensions.width} mm</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={300}
                  step={5}
                  value={spec.dimensions.width}
                  onChange={(e) =>
                    setSpec({
                      ...spec,
                      dimensions: { ...spec.dimensions, width: Number(e.target.value) }
                    })
                  }
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Tebal/Kedalaman (D):</span>
                  <span className="font-mono text-amber-400 font-bold">{spec.dimensions.depth} mm</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={200}
                  step={5}
                  value={spec.dimensions.depth}
                  onChange={(e) =>
                    setSpec({
                      ...spec,
                      dimensions: { ...spec.dimensions, depth: Number(e.target.value) }
                    })
                  }
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Tinggi (H):</span>
                  <span className="font-mono text-amber-400 font-bold">{spec.dimensions.height} mm</span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={400}
                  step={5}
                  value={spec.dimensions.height}
                  onChange={(e) =>
                    setSpec({
                      ...spec,
                      dimensions: { ...spec.dimensions, height: Number(e.target.value) }
                    })
                  }
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Finishing and Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Laminasi Dasar</label>
              <select
                value={spec.coating}
                onChange={(e) => setSpec({ ...spec, coating: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden"
              >
                <option value="Matte Doff Lamination">Matte Doff Lamination (Elegan & Anti-Silau)</option>
                <option value="Glossy Lamination">Glossy Lamination (Mengkilap Cerah)</option>
                <option value="Soft Touch Velvet">Soft Touch Velvet (Tekstur Beludru Mewah)</option>
                <option value="Varnish Waterbased">Varnish Waterbased (Eco Friendly)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Oplag / Kuantitas Produksi</label>
              <input
                type="number"
                value={spec.quantityOrder}
                onChange={(e) => setSpec({ ...spec, quantityOrder: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Special Finishing Checkboxes */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Finishing Tambahan Percetakan
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Hot Foil Gold Stamping',
                'Hot Foil Silver Stamping',
                'Spot UV Glossy (Logo Highlight)',
                'Emboss Logo Timbal Balik',
                'Window Mika PVC Transparan',
                'Pita Tarik Satin'
              ].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFinishing(f)}
                  className={`p-2 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    spec.specialFinishing.includes(f)
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="truncate">{f}</span>
                  {spec.specialFinishing.includes(f) && (
                    <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview: 3D Canvas Box Mockup & Spec Summary */}
        <div className="lg:col-span-5 space-y-4">
          {/* Canvas Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="w-full flex justify-between items-center text-xs pb-2 border-b border-slate-800 mb-2">
              <span className="font-bold text-slate-200">Wireframe Mockup 3D</span>
              <span className="font-mono text-amber-400 text-[11px]">{spec.boxType}</span>
            </div>

            <canvas
              ref={canvasRef}
              width={380}
              height={260}
              className="w-full max-w-[380px] h-[260px] rounded-lg bg-slate-950 border border-slate-800/80 shadow-inner"
            />

            <span className="text-[11px] text-slate-500 mt-2 font-mono">
              Perspektif isometrik proporsional W × D × H
            </span>
          </div>

          {/* Technical Spec Sheet Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-100">Lembar Spesifikasi Percetakan</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                Ready for Print
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300 font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">Brand:</span>
                <span className="font-semibold text-slate-100">{spec.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Box Dimensions:</span>
                <span className="text-amber-400">
                  {spec.dimensions.width} × {spec.dimensions.depth} × {spec.dimensions.height} mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Material:</span>
                <span>{spec.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Laminasi:</span>
                <span>{spec.coating}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Special Finish:</span>
                <span className="text-slate-200">{spec.specialFinishing.length} Fitur Terpasang</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Min Oplag:</span>
                <span className="font-bold text-emerald-400">{spec.quantityOrder.toLocaleString('id-ID')} pcs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
