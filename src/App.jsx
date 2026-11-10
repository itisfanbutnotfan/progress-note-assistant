import { useState, useEffect } from "react";
import { patients, titles } from "./data";
import { sentenceList } from "./utils";
import Icon from "./components/Icon";
import SearchCard from "./components/SearchCard";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/PatientDetail";

const departments = ["All", ...new Set(patients.map((p) => p.dept))];
const tried = new Set();   // 记录"已经失败过一次"的病人（演示错误状态用）

export default function App() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [notes, setNotes] = useState({});
  const [snack, setSnack] = useState("");
  const [dark, setDark] = useState(() => matchMedia("(prefers-color-scheme: dark)").matches);

  // useEffect：画好页面之后，做一件"页面之外"的事：给 <html> 标签设置主题
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);   // 只在 dark 变化时执行

  const q = query.trim().toLowerCase();
  const visible = patients.filter(
    (p) =>
      (dept === "All" || p.dept === dept) &&
      (!q || p.name.toLowerCase().includes(q) || p.pid.toLowerCase().includes(q))
  );
  const selected = patients.find((p) => p.id === selectedId);

  function generate(id) {
    setNotes((prev) => ({ ...prev, [id]: { state: "loading" } }));
    setTimeout(() => {
      const p = patients.find((x) => x.id === id);
      let result;
      if (p.failOnce && !tried.has(id)) {
        tried.add(id);
        result = { state: "error" };
      } else {
        result = {
          state: "ready",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sections: Object.keys(titles).map((key) => ({
            key,
            title: titles[key],
            ai: p.sections[key],          // AI 原文，用于"恢复"
            text: p.sections[key],        // 当前文字，医生可以改
            edited: false,
            sents: sentenceList(p.sections[key]).map((t, i) => ({ text: t, src: (p.src[key] || [])[i] || [] })),
          })),
        };
      }
      setNotes((prev) => ({ ...prev, [id]: result }));
    }, 1400);
  }

  function handleSelect(id) {
    setSelectedId(id);
    if (!notes[id] || notes[id].state === "error") generate(id);
  }

  // 修改某位病人的某一段：造新数组，只替换被改的那一段
  function updateSection(id, key, changes) {
    setNotes((prev) => ({
      ...prev,
      [id]: { ...prev[id], sections: prev[id].sections.map((s) => (s.key === key ? { ...s, ...changes } : s)) },
    }));
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); } catch (e) { /* 忽略 */ }
    setSnack("Copied to clipboard");
    setTimeout(() => setSnack(""), 2200);
  }

  return (
    <>
      <header className="appbar">
        <Icon name="logo" />
        <h1>Progress Note Assistant</h1>
        <button
          className="icon-btn"
          style={{ marginLeft: "auto" }}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setDark(!dark)}
        >
          <Icon name={dark ? "sun" : "moon"} />
        </button>
      </header>

      <div className="layout">
        <aside className="side">
          <SearchCard query={query} onQueryChange={setQuery} dept={dept} onDeptChange={setDept} departments={departments} />
          <PatientList patients={visible} total={patients.length} selectedId={selectedId} onSelect={handleSelect} />
        </aside>

        <main className="detail">
          <PatientDetail
            key={selected ? selected.id : "none"}   // 换病人时重新创建，高亮状态自动清空
            patient={selected}
            note={selected ? notes[selected.id] : null}
            onRegenerate={() => generate(selected.id)}
            onUpdateSection={(key, changes) => updateSection(selected.id, key, changes)}
            onCopy={copy}
          />
        </main>
      </div>

      <div className={"snack" + (snack ? " show" : "")} role="status" aria-live="polite">{snack}</div>
    </>
  );
}
