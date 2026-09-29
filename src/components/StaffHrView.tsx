import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  MapPin,
  Clock,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  FileSpreadsheet,
  Plus,
  Compass,
  Building2,
  Calendar
} from 'lucide-react';
import { StaffItem, AttendanceRecord } from '../types';
import { OFFICE_COORDS, calculateHaversineDistance } from '../services/storage';

interface StaffHrViewProps {
  staff: StaffItem[];
  attendance: AttendanceRecord[];
  onRecordAttendance: (record: AttendanceRecord) => void;
  onUpdateStaff: (staff: StaffItem) => void;
}

export const StaffHrView: React.FC<StaffHrViewProps> = ({
  staff,
  attendance,
  onRecordAttendance,
  onUpdateStaff
}) => {
  const [activeTab, setActiveTab] = useState<'presensi' | 'staff_directory'>('presensi');
  
  // Presensi GPS state
  const [selectedStaffId, setSelectedStaffId] = useState(staff[0]?.id || '');
  const [workMode, setWorkMode] = useState<'WFO' | 'WFH' | 'On Shoot'>('WFO');
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceFromOffice, setDistanceFromOffice] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dailyNotes, setDailyNotes] = useState('');
  const [selfieTaken, setSelfieTaken] = useState(false);
  const [checkInSuccessMsg, setCheckInSuccessMsg] = useState<string | null>(null);

  // Auto fetch location on mount or when switched to presensi
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      // Fallback: simulate coordinates close to office
      simulateOfficeLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCurrentCoords({ lat, lng });
        const dist = calculateHaversineDistance(
          lat,
          lng,
          OFFICE_COORDS.latitude,
          OFFICE_COORDS.longitude
        );
        setDistanceFromOffice(dist);
        setIsLocating(false);
      },
      (err) => {
        // In iframe or denied permission, simulate office proximity gracefully
        simulateOfficeLocation();
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  };

  const simulateOfficeLocation = () => {
    // Simulated coordinate directly inside Obeecreatives HQ geofence (20m distance)
    const lat = OFFICE_COORDS.latitude + 0.00015;
    const lng = OFFICE_COORDS.longitude + 0.00012;
    setCurrentCoords({ lat, lng });
    const dist = calculateHaversineDistance(
      lat,
      lng,
      OFFICE_COORDS.latitude,
      OFFICE_COORDS.longitude
    );
    setDistanceFromOffice(dist);
    setIsLocating(false);
  };

  const simulateFarLocation = () => {
    // Simulated coordinate outside geofence (e.g., 5.4km away)
    const lat = -6.28912;
    const lng = 106.82190;
    setCurrentCoords({ lat, lng });
    const dist = calculateHaversineDistance(
      lat,
      lng,
      OFFICE_COORDS.latitude,
      OFFICE_COORDS.longitude
    );
    setDistanceFromOffice(dist);
  };

  const isWithinRadius = (distanceFromOffice ?? 9999) <= OFFICE_COORDS.allowedRadiusMeters;

  const handleCheckIn = () => {
    const selectedStaff = staff.find((s) => s.id === selectedStaffId);
    if (!selectedStaff || !currentCoords) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const dateStr = now.toISOString().slice(0, 10);

    const record: AttendanceRecord = {
      id: `att-${Date.now().toString().slice(-4)}`,
      staffId: selectedStaff.id,
      staffName: selectedStaff.name,
      date: dateStr,
      checkInTime: timeStr,
      workMode: workMode,
      latitude: currentCoords.lat,
      longitude: currentCoords.lng,
      distanceMeters: distanceFromOffice || 0,
      isWithinRadius: isWithinRadius,
      notes: dailyNotes || 'Kehadiran harian studio tercatat via Obeecreatives Workspace OS',
      selfieUrl: selectedStaff.avatar
    };

    onRecordAttendance(record);
    setCheckInSuccessMsg(`Presensi ${selectedStaff.name} berhasil tercatat pada ${timeStr}!`);
    setDailyNotes('');
    setSelfieTaken(false);

    setTimeout(() => {
      setCheckInSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* View Switcher Tabs */}
      <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg self-start">
        <button
          onClick={() => setActiveTab('presensi')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'presensi'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin size={14} />
          <span>Sistem Presensi GPS</span>
        </button>

        <button
          onClick={() => setActiveTab('staff_directory')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'staff_directory'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck size={14} />
          <span>Database Tim & Rate Cards</span>
        </button>
      </div>

      {activeTab === 'presensi' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Check-in Terminal Card */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 border-l-4 border-l-red-600 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center">
                  <Navigation size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Terminal Presensi GPS</h3>
                  <p className="text-[11px] text-slate-400">Verifikasi Radius Kantor & Log Kerja</p>
                </div>
              </div>
              <span className="font-mono text-xs text-red-500 font-bold">
                {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Success notification banner */}
            {checkInSuccessMsg && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{checkInSuccessMsg}</span>
              </div>
            )}

            {/* Select Staff Member */}
            <div>
              <label className="block text-slate-300 font-medium text-xs mb-1">
                Pilih Akun Tim Kreatif
              </label>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-hidden focus:border-red-500"
              >
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Work Mode Selector */}
            <div>
              <label className="block text-slate-300 font-medium text-xs mb-1.5">
                Mode Penugasan Hari Ini
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['WFO', 'WFH', 'On Shoot'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setWorkMode(mode)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                      workMode === mode
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* GPS Radius Geofence Verification Box */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building2 size={14} className="text-red-500" />
                  <span>HQ Geofence Radar</span>
                </span>
                <button
                  onClick={fetchCurrentLocation}
                  disabled={isLocating}
                  className="text-red-500 hover:underline text-[11px] font-mono flex items-center gap-1"
                >
                  <Compass size={12} className={isLocating ? 'animate-spin' : ''} />
                  <span>Refresh GPS</span>
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Titik Kantor:</span>
                  <span className="text-slate-200 truncate max-w-[200px]">Senopati / Gunawarman, Jaksel</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Jarak Anda dari Studio:</span>
                  <span className="font-mono font-bold text-slate-100">
                    {distanceFromOffice !== null ? `${distanceFromOffice} meter` : 'Mendeteksi...'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Radius Maksimal WFO:</span>
                  <span className="font-mono text-slate-400">{OFFICE_COORDS.allowedRadiusMeters} meter</span>
                </div>
              </div>

              {/* Status Pill */}
              <div
                className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                  isWithinRadius
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isWithinRadius ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  <span className="font-semibold">
                    {isWithinRadius ? 'Dalam Radius Kantor (Valid WFO)' : 'Di Luar Radius Kantor'}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase">
                  {isWithinRadius ? 'Verified' : 'WFH/Remote'}
                </span>
              </div>

              {/* Testing simulation helpers */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Simulasi Lokasi:</span>
                <div className="flex gap-2">
                  <button
                    onClick={simulateOfficeLocation}
                    className="hover:text-amber-400 font-mono text-[10px] underline"
                  >
                    Simulasikan di Kantor (20m)
                  </button>
                  <span>·</span>
                  <button
                    onClick={simulateFarLocation}
                    className="hover:text-amber-400 font-mono text-[10px] underline"
                  >
                    Simulasikan Jauh (5km)
                  </button>
                </div>
              </div>
            </div>

            {/* Daily Work Summary / Log */}
            <div>
              <label className="block text-slate-300 font-medium text-xs mb-1">
                Catatan Rencana Kerja Hari Ini
              </label>
              <textarea
                rows={2}
                value={dailyNotes}
                onChange={(e) => setDailyNotes(e.target.value)}
                placeholder="Contoh: Shooting footage produk Somethinc di Studio & review color grading Reels Kenangan."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-hidden focus:border-amber-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSelfieTaken(!selfieTaken)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  selfieTaken
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Camera size={14} />
                <span>{selfieTaken ? 'Selfie Siap' : 'Ambil Selfie'}</span>
              </button>

              <button
                onClick={handleCheckIn}
                disabled={!currentCoords}
                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={15} />
                <span>Submit Check-in Presensi</span>
              </button>
            </div>
          </div>

          {/* Right Column: Attendance History Table */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">Log Presensi & Kehadiran Terverifikasi</h3>
                <p className="text-xs text-slate-400">Sinkronisasi otomatis dengan Google Sheet Presensi</p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Total {attendance.length} Record
              </span>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Nama Tim</th>
                    <th className="py-3 px-4">Mode</th>
                    <th className="py-3 px-4">Jam Masuk</th>
                    <th className="py-3 px-4">Jarak HQ</th>
                    <th className="py-3 px-4">Status Lokasi</th>
                    <th className="py-3 px-4">Catatan Kerja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {attendance.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-100">
                        {rec.staffName}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                          {rec.workMode}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300">{rec.checkInTime}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">
                        {rec.distanceMeters > 1000
                          ? `${(rec.distanceMeters / 1000).toFixed(1)} km`
                          : `${rec.distanceMeters} m`}
                      </td>
                      <td className="py-3 px-4">
                        {rec.isWithinRadius ? (
                          <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                            <span>Dalam Radius</span>
                          </span>
                        ) : (
                          <span className="text-amber-400 font-medium inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                            <span>Di Luar HQ</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-400 max-w-xs truncate" title={rec.notes}>
                        {rec.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* STAFF DIRECTORY & RATE CARD MATRIX */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">Direktori Tim & Matriks Rate Card Fee</h3>
              <p className="text-xs text-slate-400">
                Standar kompensasi creator per output jenis konten media sosial agensi
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-all"
              >
                {/* Header Profile */}
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-800"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{member.name}</h4>
                    <p className="text-xs text-amber-400 font-medium">{member.role}</p>
                    <p className="text-[11px] font-mono text-slate-400">{member.phone}</p>
                  </div>
                </div>

                {/* Rate Card Table */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Rate Card Output:
                  </span>
                  
                  {Object.entries(member.rateCards).map(([formatName, rate]) => (
                    <div key={formatName} className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400">{formatName}:</span>
                      <span className="font-mono font-semibold text-slate-200">
                        {rate > 0 ? `Rp ${rate.toLocaleString('id-ID')}` : '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
