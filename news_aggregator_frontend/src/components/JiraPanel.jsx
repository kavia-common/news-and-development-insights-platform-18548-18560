import React, { useMemo } from 'react';

function Stat({ label, value, color }) {
  return (
    <div className="surface card" style={{ borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
      <div style={{ fontWeight: 800, fontSize: 20 }}>{value}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function JiraPanel() {
  /**
   * Placeholder Jira visualization panel.
   * Reads optional env vars but does not call Jira in this version.
   */
  const jiraEnv = useMemo(() => {
    return {
      baseUrl: process.env.REACT_APP_JIRA_BASE_URL || '',
      email: process.env.REACT_APP_JIRA_EMAIL || '',
      token: process.env.REACT_APP_JIRA_API_TOKEN ? '***' : ''
    };
  }, []);

  const sample = {
    sprint: 'Sprint 42',
    stats: [
      { label: 'To Do', value: 18, color: '#6b7280' },
      { label: 'In Progress', value: 9, color: '#2563EB' },
      { label: 'In Review', value: 5, color: '#F59E0B' },
      { label: 'Done', value: 23, color: '#10B981' }
    ]
  };

  return (
    <section className="surface card" aria-label="Jira panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span aria-hidden="true">📊</span>
        <strong>Jira Overview</strong>
      </div>
      <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 8 }}>
        Placeholder visualization. Configure Jira credentials in .env to enable future integration.
      </div>

      <div style={{ fontSize: 13, marginBottom: 10 }}>
        <div><strong>Sprint:</strong> {sample.sprint}</div>
      </div>

      <div className="grid" style={{ marginBottom: 12 }}>
        {sample.stats.map((s) => (
          <div key={s.label} className="col-span-6 md:col-span-3 sm:col-span-2">
            <Stat label={s.label} value={s.value} color={s.color} />
          </div>
        ))}
      </div>

      <div className="surface card" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,.06), rgba(17,24,39,.02))' }}>
        <div style={{ fontSize: 12, color: '#6b7280' }}>Environment (optional)</div>
        <div style={{ fontSize: 12, display: 'grid', gap: 4, marginTop: 6 }}>
          <div><strong>Base URL:</strong> {jiraEnv.baseUrl || '—'}</div>
          <div><strong>Email:</strong> {jiraEnv.email || '—'}</div>
          <div><strong>API Token:</strong> {jiraEnv.token ? 'Configured' : '—'}</div>
        </div>
      </div>
    </section>
  );
}
