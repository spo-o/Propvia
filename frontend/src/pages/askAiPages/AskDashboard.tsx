import React, { useState } from "react";
import SearchQuery from "./SearchQuery";

export default function AskDashboard() {
  const [tab, setTab] = useState<"savedList" | "query">("query");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 my-10">
      <div className="px-6 py-4">
        {tab === "query" ? (
          <SearchQuery changeTab={() => setTab("savedList")} />
        ) : (
          // TODO render list of saved queries
          <></>
        )}
      </div>
    </div>
  );
}
