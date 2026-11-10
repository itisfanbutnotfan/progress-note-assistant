import { useState } from "react";
import Icon from "./Icon";
import SummarySection from "./SummarySection";
import { findSource } from "../utils";

const chipClass = (s) => (s === "Critical" ? "crit" : s === "Improving" ? "ok" : "");

export default function PatientDetail({ patient, note, onRegenerate, onUpdateSection, onCopy }) {
  const [focus, setFocus] = useState(null);   // 被点击的句子：{ key, i }

  if (!patient) {
    return (
      <div className="card empty">
        <h2>Select a patient</h2>
        <p>A progress note is generated automatically from their records.</p>
      </div>
    );
  }

  const state = note ? note.state : "loading";

  // 被点击句子对应的原始记录下标，用来在下方的 Source records 里高亮
  let hl = [];
  if (focus && state === "ready") {
    const s = note.sections.find((x) => x.key === focus.key);
    const f = s && findSource(s, focus.i);
    if (f && f.src) hl = f.src;
  }

  const copyAll = () =>
    onCopy(
      `${patient.name}, ${patient.age}${patient.sex} · Bed ${patient.bed}\nProgress note, Day ${patient.day}\n\n` +
        note.sections.map((s) => `${s.title.toUpperCase()}\n${s.text}`).join("\n\n")
    );
  const regenerate = () => { setFocus(null); onRegenerate(); };

  return (
    <>
      <div className="card head">
        <div>
          <h2>{patient.name}</h2>
          <p>{patient.age}{patient.sex} · Bed {patient.bed} · {patient.dx} · Day {patient.day}</p>
        </div>
        <span className={`chip ${chipClass(patient.status)}`}>{patient.status}</span>
      </div>

      <div className="banner">
        <Icon name="ai" />
        <span><b>AI-generated draft.</b> Clinician review required before use. All data in this demo is fictional.</span>
      </div>

      {state === "loading" && (
        <div className="card" role="status" aria-busy="true">
          <b>Generating progress note…</b>
          {[1, 2, 3, 4, 5].map((n) => <div key={n} className="skel" />)}
        </div>
      )}

      {state === "error" && (
        <div className="card" role="alert">
          <b style={{ color: "var(--err)" }}>Could not generate the note.</b>
          <p>The AI service did not respond. Your records are unchanged.</p>
          <button className="btn filled" onClick={regenerate}><Icon name="refresh" />Try again</button>
        </div>
      )}

      {state === "ready" && (
        <>
          <div className="toolbar">
            <span>Generated at {note.time} · Click a sentence to see its source</span>
            <div>
              <button className="btn outlined" onClick={copyAll}><Icon name="copy" />Copy all</button>
              <button className="btn" onClick={regenerate}><Icon name="refresh" />Regenerate</button>
            </div>
          </div>
          {note.sections.map((s) => (
            <SummarySection
              key={s.key}
              section={s}
              records={patient.records}
              focus={focus}
              onFocus={setFocus}
              onCopy={onCopy}
              onSave={onUpdateSection}
            />
          ))}
          <details open>
            <summary>Source records ({patient.records.length})</summary>
            <ul>
              {patient.records.map((r, j) => <li key={j} className={hl.includes(j) ? "hit" : undefined}>{r}</li>)}
            </ul>
          </details>
        </>
      )}
    </>
  );
}
