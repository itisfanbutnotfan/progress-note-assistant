import { useState } from "react";
import Icon from "./Icon";
import { sentences, findSource } from "../utils";

function highlight(text) {
  return text.split(/(\[Not documented:[^\]]*\])/g).map((part, i) =>
    part.startsWith("[Not documented") ? <mark key={i}>{part}</mark> : part
  );
}

// 点击句子后，句子下方显示的来源说明
function Trace({ found, records }) {
  if (found.src === null) return <div className="trace warn" role="status">Edited by clinician. No source link.</div>;
  if (found.src.length)
    return (
      <div className="trace" role="status">
        <b>Source{found.src.length > 1 ? "s" : ""}:</b> {found.src.map((j) => records[j]).join(" · ")}
      </div>
    );
  return (
    <div className="trace warn" role="status">
      {found.text.startsWith("[")
        ? "Flagged by AI: missing from the records."
        : "No direct source in the records. AI suggestion, please verify."}
    </div>
  );
}

export default function SummarySection({ section, records, focus, onFocus, onCopy, onSave }) {
  // 是否在编辑、编辑框里的草稿：只有这一段自己关心，所以放在这里，不放进 App
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  function startEdit() {
    setDraft(section.text);
    setEditing(true);
    onFocus(null);
  }
  function save() {
    const v = draft.trim();
    if (v && v !== section.ai) onSave(section.key, { text: v, edited: true });
    else onSave(section.key, { text: section.ai, edited: false });
    setEditing(false);
  }
  function restore() {
    onSave(section.key, { text: section.ai, edited: false });
    setEditing(false);
  }

  const head = (
    <div className="sec-head">
      <h3>{section.title}</h3>
      <span className={"chip" + (section.edited ? "" : " ai")}>{section.edited ? "Edited" : "AI draft"}</span>
      <button className="icon-btn" aria-label={`Copy ${section.title}`} onClick={() => onCopy(section.text)}><Icon name="copy" /></button>
      <button className="icon-btn" aria-label={`Edit ${section.title}`} onClick={startEdit}><Icon name="edit" /></button>
    </div>
  );

  if (editing) {
    return (
      <div className="card">
        {head}
        <textarea
          autoFocus
          aria-label={`Edit ${section.title}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setEditing(false);
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) save();
          }}
        />
        <div className="actions">
          <button className="btn filled sm" onClick={save}>Save</button>
          <button className="btn sm" onClick={() => setEditing(false)}>Cancel</button>
          {section.edited && <button className="btn sm" onClick={restore}>Restore AI text</button>}
        </div>
        <small style={{ color: "var(--text-2)" }}>Ctrl+Enter to save · Esc to cancel</small>
      </div>
    );
  }

  const mine = focus && focus.key === section.key;
  const found = mine ? findSource(section, focus.i) : null;
  let i = 0;

  return (
    <div className="card">
      {head}
      <div className="sec-body" onDoubleClick={startEdit}>
        {sentences(section.text).map((t, k) => {
          if (k % 2) return t;
          const idx = i++;
          const on = mine && focus.i === idx;
          const toggle = () => onFocus(on ? null : { key: section.key, i: idx });
          return (
            <span
              key={k}
              className={"sent" + (on ? " on" : "")}
              tabIndex={0}
              role="button"
              aria-pressed={!!on}
              onClick={toggle}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
            >
              {highlight(t)}
            </span>
          );
        })}
      </div>
      {found && <Trace found={found} records={records} />}
    </div>
  );
}
