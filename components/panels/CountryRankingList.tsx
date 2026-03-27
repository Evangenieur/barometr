import { getFlagUrl } from '@/lib/utils/flags';
import { getScoreColor } from '@/lib/scoring';
import { cn } from '@/lib/utils/cn';

interface RankEntry {
  geoCode: string;
  geoName: string;
  score: number;
  rank: number;
  rawValue?: number;
}

interface CountryRankingListProps {
  entries: RankEntry[];
  activeCountryCode: string | null;
  onCountrySelect: (geoCode: string, geoName: string) => void;
  /** Unit label to display next to raw values (e.g. "ans", "% GDP") */
  rawUnit?: string;
}

export function CountryRankingList({
  entries,
  activeCountryCode,
  onCountrySelect,
  rawUnit,
}: CountryRankingListProps) {

  return (
    <div className="space-y-1">
      {entries.map((entry) => {
        const isActive = entry.geoCode === activeCountryCode;
        return (
          <button
            key={entry.geoCode}
            onClick={() => onCountrySelect(entry.geoCode, entry.geoName)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors duration-100',
              isActive
                ? 'bg-accent-blue-dim/20 border border-border-accent/30'
                : 'hover:bg-elevated',
            )}
          >
            {/* Rank */}
            <span className="font-mono text-2xs text-text-muted w-5 text-right flex-shrink-0">
              {entry.rank}
            </span>
            {/* Flag + name */}
            <img src={getFlagUrl(entry.geoCode)} alt={entry.geoCode} className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm border border-white/10 flex-shrink-0" />
            <span className={cn('flex-1 text-xs truncate', isActive ? 'text-text-primary' : 'text-text-secondary')}>
              {entry.geoName}
            </span>
            {entry.rawValue !== undefined ? (
              /* Indicator mode: raw value only, colored by score */
              <span
                className="font-mono tabular-nums flex-shrink-0"
                style={{ color: getScoreColor(entry.score), fontSize: '8px' }}
              >
                {entry.rawValue.toFixed(entry.rawValue % 1 !== 0 ? 1 : 0)}
                {rawUnit ? ` ${rawUnit}` : ''}
              </span>
            ) : (
              /* Domain mode: score */
              <span
                className="font-mono text-2xs font-semibold tabular-nums flex-shrink-0"
                style={{ color: getScoreColor(entry.score) }}
              >
                {entry.score}
              </span>
            )}
          </button>
        );
      })}

    </div>
  );
}
