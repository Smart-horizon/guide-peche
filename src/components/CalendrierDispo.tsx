import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { useState } from 'react'

const STATUS_COLORS: Record<string, { bg: string; border: string; label: string }> = {
  disponible:   { bg: '#22c55e', border: '#16a34a', label: 'Disponible' },
  reserve:      { bg: '#ef4444', border: '#dc2626', label: 'Réservé' },
  option:       { bg: '#f59e0b', border: '#d97706', label: 'Option' },
  indisponible: { bg: '#6b7280', border: '#4b5563', label: 'Indisponible' },
}

interface Dispo {
  _id: string
  titre: string
  statut: string
  dateDebut: string
  dateFin?: string
  note?: string
  confidentiel?: boolean
}

interface Props {
  disponibilites: Dispo[]
}

function addOneDay(dateStr: string): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function CalendrierDispo({ disponibilites }: Props) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  const events = disponibilites.map((d) => {
    const couleur = STATUS_COLORS[d.statut] || STATUS_COLORS.disponible
    const fin = d.dateFin && d.dateFin !== d.dateDebut ? addOneDay(d.dateFin) : addOneDay(d.dateDebut)
    return {
      id: d._id,
      title: d.confidentiel ? (STATUS_COLORS[d.statut]?.label || d.statut) : d.titre,
      start: d.dateDebut,
      end: fin,
      backgroundColor: couleur.bg,
      borderColor: couleur.border,
      extendedProps: { note: d.note, statut: d.statut, confidentiel: d.confidentiel, original: d },
    }
  })

  return (
    <div style={{ position: 'relative' }}>
      {/* Légende */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {Object.entries(STATUS_COLORS).map(([key, val]) => (
          <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: val.bg, display: 'inline-block', flexShrink: 0 }} />
            {val.label}
          </span>
        ))}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={frLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listMonth',
        }}
        buttonText={{ today: "Aujourd'hui", month: 'Mois', list: 'Liste' }}
        events={events}
        height="auto"
        eventMouseEnter={(info) => {
          const note = info.event.extendedProps.note
          if (note) {
            const rect = info.el.getBoundingClientRect()
            setTooltip({ text: note, x: rect.left + window.scrollX, y: rect.bottom + window.scrollY + 4 })
          }
        }}
        eventMouseLeave={() => setTooltip(null)}
        eventClassNames={() => 'fc-event-dispo'}
      />

      {tooltip && (
        <div style={{
          position: 'absolute',
          left: tooltip.x,
          top: tooltip.y,
          background: '#1a1a1f',
          color: '#fff',
          padding: '0.4rem 0.75rem',
          borderRadius: 6,
          fontSize: '0.8rem',
          zIndex: 9999,
          maxWidth: 280,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          pointerEvents: 'none',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          {tooltip.text}
        </div>
      )}

      <style>{`
        .fc { font-family: 'DM Sans', sans-serif; }
        .fc .fc-toolbar-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; }
        .fc .fc-button { background: #1B5E8A !important; border-color: #1B5E8A !important; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; padding: 0.35rem 0.75rem; }
        .fc .fc-button:hover { background: #0d2b3e !important; border-color: #0d2b3e !important; }
        .fc .fc-button-active { background: #0d2b3e !important; border-color: #0d2b3e !important; }
        .fc .fc-today-button:disabled { opacity: 0.5; }
        .fc-event-dispo { cursor: default; border-radius: 4px; font-size: 0.78rem; font-weight: 500; padding: 1px 4px; }
        .fc-daygrid-event-dot { display: none; }
        .fc th { background: #f0eff0; font-weight: 600; font-size: 0.8rem; color: #444; }
        .fc-day-today { background: rgba(27, 94, 138, 0.06) !important; }
        .fc-list-event-title { font-size: 0.875rem; }
      `}</style>
    </div>
  )
}
