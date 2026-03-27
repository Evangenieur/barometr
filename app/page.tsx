import dynamic from 'next/dynamic';

const MapApp = dynamic(() => import('@/components/map/MapApp'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-void flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
        <span className="text-text-muted text-sm font-mono">Chargement…</span>
      </div>
    </div>
  ),
});

export default function Home() {
  return <MapApp />;
}
