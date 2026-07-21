import { useMemo, useEffect, useState } from "react";

const GITHUB_USERNAME = "Ali-elnopy";
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const LEVEL_COLORS = [
  "bg-[#2d2d38]",        // 0 - empty
  "bg-[#3d4455]",        // 1 - low
  "bg-[#536175]",        // 2 - medium
  "bg-[#6b7f95]",        // 3 - high
  "bg-[#839cb5]", 
];

const LEVEL_COLORS_HEX = ["#2d2d38", "#3d4455", "#536175", "#6b7f95", "#839cb5"];

function buildGrid(contributions) {
  const weeks = [];
  let week = [];
  contributions.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) weeks.push(week);
  return weeks;
}

function getMonthLabels(grid) {
  const labels = [];
  let lastMonth = null;
  grid.forEach((week, wi) => {
    if (!week[0]) return;
    const month = new Date(week[0].date).getMonth();
    if (month !== lastMonth) {
      labels.push({ index: wi, label: MONTHS[month] });
      lastMonth = month;
    }
  });
  return labels;
}

export default function GithubHeatmap() {
  const [contributions, setContributions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setContributions(data.contributions);
        setTotal(data.total?.lastYear ?? data.contributions.reduce((s, d) => s + d.count, 0));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const grid = useMemo(() => buildGrid(contributions), [contributions]);
  const monthLabels = useMemo(() => getMonthLabels(grid), [grid]);

  const shell = "w-full max-w-6xl mx-auto px-4 py-8 overflow-hidden";

  if (loading) {
    return (
      <section className={shell}>
        <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 flex items-center justify-center h-40">
          <span className="text-[#8b949e] text-sm animate-pulse">Loading contributions...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={shell}>
        <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 flex items-center justify-center h-40">
          <span className="text-red-400 text-sm">Failed to load contributions.</span>
        </div>
      </section>
    );
  }

  return (
    <section className={shell}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-semibold tracking-tight">
          GitHub Activity
        </h2>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="text-[#388bfd] text-sm hover:text-[#58a6ff] transition-colors"
        >
          @{GITHUB_USERNAME} ↗
        </a>
      </div>

      {/* Graph container — scrollable on small screens */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 w-full overflow-x-auto">
        <div className="min-w-[640px]">

          {/* Month labels */}
          <div className="relative flex mb-2 pl-8 h-4">
            {monthLabels.map(({ index, label }) => (
              <span
                key={`${label}-${index}`}
                className="absolute text-[11px] text-[#8b949e]"
                style={{ left: `${32 + index * 18}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-1 mt-[1px]">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <div key={i} className="h-[14px] text-[10px] text-[#8b949e] leading-none flex items-center pr-1 w-6">
                  {d}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={day.date ?? di}
                    className={`w-[14px] h-[14px] rounded-sm ${LEVEL_COLORS[day.level ?? 0]} transition-all duration-150 hover:ring-1 hover:ring-white/30 cursor-default`}
                    title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#21262d]">
          <span className="text-[#8b949e] text-xs">
            <span className="text-white font-semibold">{total.toLocaleString()}</span> contributions in the last year
          </span>
          <div className="flex items-center gap-1.5 text-[#8b949e] text-xs">
            <span>Less</span>
            {LEVEL_COLORS_HEX.map((color, i) => (
              <div key={i} className="w-[12px] h-[12px] rounded-sm" style={{ backgroundColor: color }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}