import React, { useState } from 'react';
import {
  FolderLock,
  UploadCloud,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Camera,
  FileCheck,
} from 'lucide-react';
import { mockEvidenceItems } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const EvidenceVaultPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredItems = mockEvidenceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (filter === 'approved') return item.status === 'Approved';
    return true;
  });

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Evidence Vault
            </h1>
            <Badge variant="gold" size="sm">
              Geo-Tagged & AI Verified
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tamper-proof repository of practical workplace photos, audio diagnostics, and employer affidavits for RPL verification.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleSimulateUpload}
          disabled={isUploading}
          icon={<UploadCloud className="h-4 w-4" />}
        >
          {isUploading ? 'Securing Evidence...' : 'Upload Work Proof'}
        </Button>
      </div>

      {uploadSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-4 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold">Evidence submitted successfully!</span> Metadata, GPS stamp, and photo hashing verified against NSDC standards.
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card variant="white" className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400">
              <FolderLock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Total Artifacts</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{mockEvidenceItems.length} Files</h3>
            </div>
          </div>
        </Card>

        <Card variant="white" className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Verified by Assessor</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">4 Approved</h3>
            </div>
          </div>
        </Card>

        <Card variant="white" className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Site Photos</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">3 Geo-Tagged</h3>
            </div>
          </div>
        </Card>

        <Card variant="white" className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Affidavit Docs</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">1 Certified</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card variant="white" className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by title, tag, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-gold-500 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                filter === 'all'
                  ? 'bg-gold-500 text-charcoal-950 font-bold'
                  : 'bg-stone-100 text-slate-600 dark:bg-charcoal-700 dark:text-slate-300'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                filter === 'approved'
                  ? 'bg-gold-500 text-charcoal-950 font-bold'
                  : 'bg-stone-100 text-slate-600 dark:bg-charcoal-700 dark:text-slate-300'
              }`}
            >
              Verified
            </button>
          </div>
        </div>
      </Card>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => (
          <Card key={item.id} variant="white" hoverEffect className="overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-stone-100 dark:bg-charcoal-800">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="emerald" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                    {item.status}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>ID: {item.id}</span>
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-gold-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item.gpsLocation}</span>
                </div>

                <div className="rounded-xl border border-stone-200/80 bg-stone-50 dark:border-charcoal-700 dark:bg-charcoal-800 p-2.5 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Verification Source:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.verifiedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">AI Trust Score:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.confidenceScore}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((t, i) => (
                    <span
                      key={i}
                      className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-charcoal-700 dark:text-slate-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-stone-100 dark:border-charcoal-700 p-3 px-5 flex items-center justify-between bg-stone-50/50 dark:bg-charcoal-800/50">
              <span className="text-[11px] text-slate-400">SHA-256 Hash Verified</span>
              <button className="flex items-center gap-1 text-xs font-bold text-gold-600 hover:text-gold-700 dark:text-gold-400">
                <Eye className="h-3.5 w-3.5" />
                <span>View Full Evidence</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
