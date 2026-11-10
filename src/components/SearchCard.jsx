// 搜索卡片：自己不存数据，数据和修改的函数都由父组件（App）通过 props 传进来
export default function SearchCard({ query, onQueryChange, dept, onDeptChange, departments }) {
  return (
    <section className="filters" aria-label="Find patients">
      <h2>Find patients</h2>

      <div className="field">
        <label htmlFor="q">Search by name or ID</label>
        <input
          id="q"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="e.g. Ward or MRN-100231"
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="dept">Department</label>
        <select id="dept" value={dept} onChange={(e) => onDeptChange(e.target.value)}>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All departments" : d}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
