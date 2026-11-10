const chipClass = (s) => (s === "Critical" ? "crit" : s === "Improving" ? "ok" : "");

// 病人列表：用 map 把每位病人画成一行
export default function PatientList({ patients, total, selectedId, onSelect }) {
  return (
    <nav className="list" aria-label="Patients">
      <h2>Patients (demo data)</h2>
      <p className="count" aria-live="polite">
        {patients.length} of {total} patients
      </p>

      {patients.length === 0 ? (
        <p className="nores">No patients match. Try a different name, ID or department.</p>
      ) : (
        patients.map((p) => (
          <button
            key={p.id}
            className="patient"
            aria-current={p.id === selectedId}
            onClick={() => onSelect(p.id)}
          >
            <span className="avatar" aria-hidden="true">{p.name[0]}</span>
            <span className="who">
              <b>{p.name}</b>
              <small>{p.age}{p.sex} · Bed {p.bed} · {p.dx}</small>
              <small>{p.pid} · {p.dept}</small>
            </span>
            <span className={`chip ${chipClass(p.status)}`}>{p.status}</span>
          </button>
        ))
      )}
    </nav>
  );
}
