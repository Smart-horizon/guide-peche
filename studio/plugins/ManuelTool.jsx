export function ManuelTool() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#101214',
      gap: '1.25rem',
      padding: '2rem',
      boxSizing: 'border-box',
    }}>
      <div style={{ fontSize: '3rem', lineHeight: 1 }}>📖</div>
      <h2 style={{
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '1.35rem',
        margin: 0,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      }}>
        Manuel des sections
      </h2>
      <p style={{
        color: 'rgba(255,255,255,0.4)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '0.88rem',
        margin: 0,
        textAlign: 'center',
        maxWidth: '380px',
        lineHeight: 1.65,
      }}>
        Guide visuel des 37 templates de section — aperçu du rendu et liste
        complète des champs à remplir dans Sanity.
      </p>
      <a
        href="https://guide-peche.smart-horizon.workers.dev/manuel-sections-sanity.html"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#1B5E8A',
          color: 'white',
          padding: '0.85rem 2.5rem',
          borderRadius: '6px',
          textDecoration: 'none',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 600,
          fontSize: '0.97rem',
          marginTop: '0.25rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        Ouvrir le manuel
        <span style={{ fontSize: '1rem', opacity: 0.8 }}>↗</span>
      </a>
      <p style={{
        color: 'rgba(255,255,255,0.18)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '0.7rem',
        margin: 0,
      }}>
        S'ouvre dans un nouvel onglet
      </p>
    </div>
  )
}
