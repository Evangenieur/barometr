import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Barometr — World socio-economic indicators as weather scores';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A0F16 0%, #111927 50%, #0A0F16 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundSize: '40px 40px',
            backgroundImage:
              'linear-gradient(to right, #3D8EF0 1px, transparent 1px), linear-gradient(to bottom, #3D8EF0 1px, transparent 1px)',
          }}
        />

        {/* Weather icons row */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginBottom: '40px',
            fontSize: '48px',
          }}
        >
          <span>⛈️</span>
          <span>🌧️</span>
          <span>⛅️</span>
          <span>🌤️</span>
          <span>☀️</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: '#E2EBF5',
            letterSpacing: '-2px',
            marginBottom: '16px',
          }}
        >
          Barometr
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: '#8899AA',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          World socio-economic indicators visualized as weather scores
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '48px',
            padding: '16px 32px',
            borderRadius: '12px',
            border: '1px solid #253447',
            background: 'rgba(17, 25, 39, 0.8)',
          }}
        >
          {[
            { value: '18', label: 'Domains' },
            { value: '73', label: 'Indicators' },
            { value: '150+', label: 'Countries' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#3D8EF0',
                  fontFamily: 'monospace',
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: '16px', color: '#8899AA' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Color bar at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            display: 'flex',
          }}
        >
          <div style={{ flex: 1, background: '#EF4444' }} />
          <div style={{ flex: 1, background: '#F97316' }} />
          <div style={{ flex: 1, background: '#EAB308' }} />
          <div style={{ flex: 1, background: '#84CC16' }} />
          <div style={{ flex: 1, background: '#22C55E' }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
