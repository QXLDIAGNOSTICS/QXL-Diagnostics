"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  DELIVERY_TASKS,
  URL_INVENTORY,
  QA_TEST_CASES,
  GOVERNANCE_GATES,
  WEEKLY_RHYTHM,
  DeliveryTask,
  TaskStatus,
  QaTestCase,
  QaResult,
  GovernanceGate,
  ApprovalStatus,
  BLUEPRINT_ROLES,
  DESIGN_TOKENS,
  RESPONSIVE_SPECS,
  PATIENT_JOURNEYS,
  ROLLOUT_PHASES,
  KPI_METRICS,
  NON_NEGOTIABLE_GATES,
} from "../../data/deliveryControlCentreData";
import {
  ShieldAlert,
  ShieldCheck,
  Clock,
  Search,
  Download,
  ExternalLink,
  ChevronRight,
  X,
  UserCheck,
  Activity,
  Printer,
  Copy,
  Check,
  Globe,
  SlidersHorizontal,
  Layers,
  BookOpen,
  Palette,
  Smartphone,
} from "lucide-react";

type ActiveTab = "overview" | "backlog" | "qa" | "urls" | "governance" | "blueprint";

export default function DeliveryControlCentrePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // Backlog state
  const [tasks, setTasks] = useState<DeliveryTask[]>(DELIVERY_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>("ALL");
  const [selectedSprint, setSelectedSprint] = useState<string>("ALL");
  const [selectedWorkstream, setSelectedWorkstream] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [activeTaskModal, setActiveTaskModal] = useState<DeliveryTask | null>(null);

  // QA state
  const [qaCases, setQaCases] = useState<QaTestCase[]>(QA_TEST_CASES);
  const [qaPillarFilter, setQaPillarFilter] = useState<string>("ALL");
  const [qaPriorityFilter, setQaPriorityFilter] = useState<string>("ALL");
  const [qaResultFilter, setQaResultFilter] = useState<string>("ALL");
  const [qaSearchQuery, setQaSearchQuery] = useState("");

  // Governance Gates state
  const [gates, setGates] = useState<GovernanceGate[]>(GOVERNANCE_GATES);

  // Copy notification state
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const p0 = tasks.filter((t) => t.priority === "P0").length;
    const p0Done = tasks.filter((t) => t.priority === "P0" && t.status === "Done").length;
    const p1 = tasks.filter((t) => t.priority === "P1").length;
    const p2 = tasks.filter((t) => t.priority === "P2").length;
    const done = tasks.filter((t) => t.status === "Done").length;
    const blocked = tasks.filter((t) => t.status === "Blocked").length;
    const inProgress = tasks.filter((t) => t.status === "In progress").length;
    const notStarted = tasks.filter((t) => t.status === "Not started").length;

    const qaTotal = qaCases.length;
    const qaPassed = qaCases.filter((q) => q.result === "Passed").length;
    const qaFailed = qaCases.filter((q) => q.result === "Failed").length;
    const qaNotRun = qaCases.filter((q) => q.result === "Not run").length;

    const gatesTotal = gates.length;
    const gatesApproved = gates.filter((g) => g.decision === "Approved").length;

    return {
      total,
      p0,
      p0Done,
      p1,
      p2,
      done,
      blocked,
      inProgress,
      notStarted,
      completionRate: total > 0 ? Math.round((done / total) * 100) : 0,
      qaTotal,
      qaPassed,
      qaFailed,
      qaNotRun,
      qaPassRate: qaTotal > 0 ? Math.round((qaPassed / qaTotal) * 100) : 0,
      gatesTotal,
      gatesApproved,
    };
  }, [tasks, qaCases, gates]);

  // Unique workstreams
  const workstreams = useMemo(() => {
    const set = new Set(DELIVERY_TASKS.map((t) => t.workstream));
    return Array.from(set).sort();
  }, []);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((item) => {
      if (selectedPriority !== "ALL" && item.priority !== selectedPriority) return false;
      if (selectedSprint !== "ALL" && item.sprint !== selectedSprint) return false;
      if (selectedWorkstream !== "ALL" && item.workstream !== selectedWorkstream) return false;
      if (selectedStatus !== "ALL" && item.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = item.id.toLowerCase().includes(q);
        const matchTask = item.task.toLowerCase().includes(q);
        const matchOwner = item.owner.toLowerCase().includes(q);
        const matchWorkstream = item.workstream.toLowerCase().includes(q);
        const matchImpl = item.implementation.toLowerCase().includes(q);
        const matchAc = item.acceptanceCriteria.toLowerCase().includes(q);
        if (!matchId && !matchTask && !matchOwner && !matchWorkstream && !matchImpl && !matchAc) {
          return false;
        }
      }
      return true;
    });
  }, [tasks, selectedPriority, selectedSprint, selectedWorkstream, selectedStatus, searchQuery]);

  // Filtered QA
  const filteredQa = useMemo(() => {
    return qaCases.filter((item) => {
      if (qaPillarFilter !== "ALL" && item.pillar !== qaPillarFilter) return false;
      if (qaPriorityFilter !== "ALL" && item.priority !== qaPriorityFilter) return false;
      if (qaResultFilter !== "ALL" && item.result !== qaResultFilter) return false;
      if (qaSearchQuery.trim()) {
        const q = qaSearchQuery.toLowerCase();
        const matchId = item.id.toLowerCase().includes(q);
        const matchPillar = item.pillar.toLowerCase().includes(q);
        const matchScenario = item.scenario.toLowerCase().includes(q);
        const matchExpected = item.expected.toLowerCase().includes(q);
        if (!matchId && !matchPillar && !matchScenario && !matchExpected) return false;
      }
      return true;
    });
  }, [qaCases, qaPillarFilter, qaPriorityFilter, qaResultFilter, qaSearchQuery]);

  // Update task status
  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  // Update QA result
  const handleQaResultChange = (id: string, newResult: QaResult) => {
    setQaCases((prev) =>
      prev.map((q) => (q.id === id ? { ...q, result: newResult } : q))
    );
  };

  // Update Gate decision
  const handleGateDecisionChange = (id: string, newDecision: ApprovalStatus) => {
    setGates((prev) =>
      prev.map((g) => (g.id === id ? { ...g, decision: newDecision } : g))
    );
  };

  // Export Backlog to CSV
  const exportTasksToCsv = () => {
    const headers = [
      "ID",
      "Priority",
      "Sprint",
      "Workstream",
      "URL",
      "Task",
      "Implementation",
      "Acceptance Criteria",
      "Owner",
      "Dependencies",
      "Effort",
      "Status",
      "Evidence Link",
      "QXL Approval",
      "Notes",
    ];

    const rows = tasks.map((t) => [
      t.id,
      t.priority,
      t.sprint,
      `"${t.workstream.replace(/"/g, '""')}"`,
      `"${t.url}"`,
      `"${t.task.replace(/"/g, '""')}"`,
      `"${t.implementation.replace(/"/g, '""')}"`,
      `"${t.acceptanceCriteria.replace(/"/g, '""')}"`,
      `"${t.owner.replace(/"/g, '""')}"`,
      `"${t.dependencies.replace(/"/g, '""')}"`,
      t.effort,
      t.status,
      `"${t.evidenceLink}"`,
      t.qxlApproval,
      `"${t.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `QXL_Delivery_Backlog_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Full Delivery Control Centre JSON
  const exportFullJson = () => {
    const fullData = {
      exportedAt: new Date().toISOString(),
      summaryStats: stats,
      backlogTasks: tasks,
      urlInventory: URL_INVENTORY,
      qaCases: qaCases,
      governanceGates: gates,
      weeklyRhythm: WEEKLY_RHYTHM,
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(fullData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `QXL_Delivery_Control_Centre_${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy Executive Summary for Weekly Rhythms
  const copyExecutiveSummary = () => {
    const text = `QXL WEBSITE — DELIVERY CONTROL CENTRE EXECUTIVE SNAPSHOT
Date: ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
Total Actionable Tasks: ${stats.total} | Completed: ${stats.done} | In Progress: ${stats.inProgress}
P0 Release Blockers: ${stats.p0} (Closed: ${stats.p0Done} / Remaining: ${stats.p0 - stats.p0Done})
Pending QXL Approvals: ${tasks.filter((t) => t.qxlApproval === "Pending").length}
QA Cases: ${stats.qaTotal} (Passed: ${stats.qaPassed} | Failed: ${stats.qaFailed} | Remaining: ${stats.qaNotRun})
Governance Signoffs Approved: ${stats.gatesApproved} / ${stats.gatesTotal}

Weekly Rhythm:
1. Tech Lead: Backlog evidence & blocker check
2. Quality/Medical/Ops: Safety gates validation
3. QA Lead: 61 execution test cases
4. SEO/Analytics: Baseline verification
5. CEO: Review only material blockers and P0/P1 release risks.`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#071328] text-slate-100 font-sans pb-24 selection:bg-[#1055AE] selection:text-white">
      {/* Top Banner & Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#082C61]/95 backdrop-blur-md border-b border-[#1b3f7a] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1055AE] to-[#0B9B9A] flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-lg tracking-wider">QXL</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    DELIVERY CONTROL CENTRE
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D69A18]/20 text-[#D69A18] border border-[#D69A18]/30">
                    Sprint W1–W8
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Single Source of Truth • Technical Release, QA Verification & Clinical Governance
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={copyExecutiveSummary}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0E3A75] hover:bg-[#1055AE] text-white border border-[#215396] transition-colors"
                title="Copy text summary for weekly management meetings"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              <button
                onClick={exportTasksToCsv}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0B9B9A]/20 hover:bg-[#0B9B9A]/30 text-[#2dd4bf] border border-[#0B9B9A]/40 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={exportFullJson}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1055AE] hover:bg-[#156cdb] text-white shadow transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                target="_blank"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto space-x-1 border-t border-[#1b3f7a]/60 pt-2 pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-[#1055AE] text-white shadow-md"
                  : "text-slate-300 hover:bg-[#0E3A75]/60 hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Executive Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("backlog")}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === "backlog"
                  ? "bg-[#1055AE] text-white shadow-md"
                  : "text-slate-300 hover:bg-[#0E3A75]/60 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Backlog Tasks</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-[#082C61] border border-[#215396]">
                87
              </span>
            </button>

            <button
              onClick={() => setActiveTab("qa")}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === "qa"
                  ? "bg-[#1055AE] text-white shadow-md"
                  : "text-slate-300 hover:bg-[#0E3A75]/60 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>QA Matrix</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-[#082C61] border border-[#215396]">
                61
              </span>
            </button>

            <button
              onClick={() => setActiveTab("urls")}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === "urls"
                  ? "bg-[#1055AE] text-white shadow-md"
                  : "text-slate-300 hover:bg-[#0E3A75]/60 hover:text-white"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>URL Inventory</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-[#082C61] border border-[#215396]">
                27
              </span>
            </button>

            <button
              onClick={() => setActiveTab("governance")}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === "governance"
                  ? "bg-[#1055AE] text-white shadow-md"
                  : "text-slate-300 hover:bg-[#0E3A75]/60 hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Governance Gates</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-[#082C61] border border-[#215396]">
                9
              </span>
            </button>

            <button
              onClick={() => setActiveTab("blueprint")}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === "blueprint"
                  ? "bg-[#1055AE] text-white shadow-md"
                  : "text-slate-300 hover:bg-[#0E3A75]/60 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blueprint & Specs</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {/* Card 1: Total Actionable */}
          <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Actionable Tasks
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                {stats.total}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Done: {stats.done}</span>
              <span className="text-emerald-400 font-bold">{stats.completionRate}%</span>
            </div>
          </div>

          {/* Card 2: P0 Tasks */}
          <div className="bg-[#1e131d] border border-rose-900/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  P0 Go-Live Gates
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">
                {stats.p0}
              </div>
            </div>
            <div className="text-[11px] text-rose-300/80 mt-2 flex items-center justify-between">
              <span>Closed: {stats.p0Done}</span>
              <span className="font-semibold text-rose-300">Must be 100%</span>
            </div>
          </div>

          {/* Card 3: QA Test Cases */}
          <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                QA Cases
              </span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
                {stats.qaTotal}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Passed: {stats.qaPassed}</span>
              <span className="text-cyan-400 font-bold">{stats.qaPassRate}%</span>
            </div>
          </div>

          {/* Card 4: Governance Gates */}
          <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Governance Gates
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                {stats.gatesTotal}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>Approved: {stats.gatesApproved}</span>
              <span className="text-amber-300 font-semibold">{stats.gatesTotal - stats.gatesApproved} pending</span>
            </div>
          </div>

          {/* Card 5: Blocked */}
          <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Blocked Items
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-200 mt-1">
                {stats.blocked}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              <span>Escalate promptly</span>
            </div>
          </div>

          {/* Card 6: Pending Approvals */}
          <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pending Approvals
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#D69A18] mt-1">
                {tasks.filter((t) => t.qxlApproval === "Pending").length}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              <span>Medical & Ops signoffs</span>
            </div>
          </div>
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Executive Governance Notice Banner */}
            <div className="bg-gradient-to-r from-[#082C61] via-[#0E3A75] to-[#082C61] border border-[#215396] rounded-2xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#1055AE]/40 rounded-xl text-cyan-300">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Mandatory Release Governance Protocol
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    No current ranking, real-time analytics, measured Core Web Vitals, or production deployment is represented by this workbook without verified execution evidence. Every &apos;Done&apos; status requires linked documentation, medical director review, and quality sign-off.
                  </p>
                </div>
              </div>
            </div>

            {/* Two column grid: Weekly Rhythm & Priority Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weekly Management Rhythm */}
              <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-[#2dd4bf]" />
                    <h3 className="text-base font-bold text-white">Required Weekly Management Rhythm</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">5 Core Gates</span>
                </div>

                <div className="space-y-4">
                  {WEEKLY_RHYTHM.map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60 hover:border-[#1055AE] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#1055AE] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{item.role}</div>
                        <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{item.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority & Workstream Breakdown */}
              <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-2">
                      <SlidersHorizontal className="w-5 h-5 text-[#D69A18]" />
                      <h3 className="text-base font-bold text-white">Priority & Allocation Matrix</h3>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">87 Actionable Tasks</span>
                  </div>

                  {/* Priority Breakdown Cards */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3.5 rounded-xl bg-[#2a131b]/60 border border-rose-800/60 text-center">
                      <div className="text-xs font-bold text-rose-300 uppercase">P0 Tasks</div>
                      <div className="text-2xl font-black text-rose-400 mt-1">14</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Go-Live Blockers</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#112a4f]/60 border border-blue-700/60 text-center">
                      <div className="text-xs font-bold text-blue-300 uppercase">P1 Tasks</div>
                      <div className="text-2xl font-black text-blue-400 mt-1">64</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Core Features</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#152a26]/60 border border-teal-800/60 text-center">
                      <div className="text-xs font-bold text-teal-300 uppercase">P2 Tasks</div>
                      <div className="text-2xl font-black text-teal-400 mt-1">9</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Strategic / Scale</div>
                    </div>
                  </div>

                  {/* Workstream Distribution */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Workstream Distribution
                    </div>
                    {workstreams.map((ws) => {
                      const count = DELIVERY_TASKS.filter((t) => t.workstream === ws).length;
                      const p0Count = DELIVERY_TASKS.filter((t) => t.workstream === ws && t.priority === "P0").length;
                      const percentage = Math.round((count / DELIVERY_TASKS.length) * 100);

                      return (
                        <div key={ws} className="flex items-center justify-between text-xs py-1 border-b border-[#1b3f7a]/30">
                          <span className="text-slate-300 truncate max-w-[200px]">{ws}</span>
                          <div className="flex items-center space-x-2">
                            {p0Count > 0 && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                {p0Count} P0
                              </span>
                            )}
                            <span className="text-slate-400 font-medium w-8 text-right">{count}</span>
                            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#1055AE] rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1b3f7a] flex items-center justify-between text-xs">
                  <span className="text-slate-400">Target release window:</span>
                  <span className="font-semibold text-white">Week 1 through Week 8 Progressive Delivery</span>
                </div>
              </div>
            </div>

            {/* Quick Link Navigation Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab("backlog")}
                className="p-5 rounded-2xl bg-[#0b1e3d] hover:bg-[#0E3A75]/80 border border-[#1b3f7a] text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#1055AE]/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300">
                    Explore Backlog Tasks
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    All 87 requirements with criteria, effort, and owner assignments.
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-blue-400 mt-4">
                  <span>View 87 Tasks</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => setActiveTab("qa")}
                className="p-5 rounded-2xl bg-[#0b1e3d] hover:bg-[#0E3A75]/80 border border-[#1b3f7a] text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#0B9B9A]/20 text-[#2dd4bf] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300">
                    QA Verification Matrix
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    61 functional, clinical, responsive, SEO and security tests.
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-[#2dd4bf] mt-4">
                  <span>View 61 QA Cases</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => setActiveTab("urls")}
                className="p-5 rounded-2xl bg-[#0b1e3d] hover:bg-[#0E3A75]/80 border border-[#1b3f7a] text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300">
                    URL Route Inventory
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    27 canonical templates with search intent and action decisions.
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-purple-400 mt-4">
                  <span>View 27 Routes</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => setActiveTab("governance")}
                className="p-5 rounded-2xl bg-[#0b1e3d] hover:bg-[#0E3A75]/80 border border-[#1b3f7a] text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#D69A18]/20 text-[#D69A18] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300">
                    Signoff Gates
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    9 mandatory departmental gates including NABL, Medical & CEO.
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-[#D69A18] mt-4">
                  <span>View 9 Gates</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIONABLE BACKLOG (87 TASKS) */}
        {activeTab === "backlog" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter and Search Bar */}
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID (e.g. QXL-001), task, owner, or criteria..."
                    className="w-full bg-[#082C61]/60 border border-[#1b3f7a] focus:border-[#1055AE] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-300 shrink-0">
                  <span className="font-semibold text-white">Showing:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#082C61] border border-[#1b3f7a] font-bold text-cyan-300">
                    {filteredTasks.length} of {tasks.length} tasks
                  </span>
                </div>
              </div>

              {/* Filters dropdown / pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#1b3f7a]/60">
                {/* Priority */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full bg-[#082C61] border border-[#1b3f7a] text-slate-200 text-xs rounded-lg px-2.5 py-2 outline-none"
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="P0">P0 (Go-Live Blockers)</option>
                    <option value="P1">P1 (Core Quality)</option>
                    <option value="P2">P2 (Strategic/Scale)</option>
                  </select>
                </div>

                {/* Sprint */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Sprint
                  </label>
                  <select
                    value={selectedSprint}
                    onChange={(e) => setSelectedSprint(e.target.value)}
                    className="w-full bg-[#082C61] border border-[#1b3f7a] text-slate-200 text-xs rounded-lg px-2.5 py-2 outline-none"
                  >
                    <option value="ALL">All Sprints</option>
                    <option value="W1">Week 1 (W1)</option>
                    <option value="W2">Week 2 (W2)</option>
                    <option value="W3">Week 3 (W3)</option>
                    <option value="W4">Week 4 (W4)</option>
                    <option value="W5">Week 5 (W5)</option>
                    <option value="W6">Week 6 (W6)</option>
                    <option value="W8">Week 8 (W8)</option>
                  </select>
                </div>

                {/* Workstream */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Workstream
                  </label>
                  <select
                    value={selectedWorkstream}
                    onChange={(e) => setSelectedWorkstream(e.target.value)}
                    className="w-full bg-[#082C61] border border-[#1b3f7a] text-slate-200 text-xs rounded-lg px-2.5 py-2 outline-none"
                  >
                    <option value="ALL">All Workstreams</option>
                    {workstreams.map((ws) => (
                      <option key={ws} value={ws}>
                        {ws}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-[#082C61] border border-[#1b3f7a] text-slate-200 text-xs rounded-lg px-2.5 py-2 outline-none"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Backlog Tasks Table */}
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#082C61] text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-[#1b3f7a]">
                    <tr>
                      <th className="py-3 px-4 w-24">ID</th>
                      <th className="py-3 px-3 w-16">Pri</th>
                      <th className="py-3 px-3 w-16">Sprint</th>
                      <th className="py-3 px-4 w-40">Workstream</th>
                      <th className="py-3 px-4">Task & Implementation Summary</th>
                      <th className="py-3 px-3 w-28">Owner</th>
                      <th className="py-3 px-3 w-16 text-center">Effort</th>
                      <th className="py-3 px-3 w-32">Status</th>
                      <th className="py-3 px-3 w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b3f7a]/40 text-slate-200">
                    {filteredTasks.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-slate-400">
                          No tasks match the active filters or search query.
                        </td>
                      </tr>
                    ) : (
                      filteredTasks.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-[#0E3A75]/30 transition-colors cursor-pointer group"
                          onClick={() => setActiveTaskModal(item)}
                        >
                          <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                            <span className="group-hover:text-cyan-300 transition-colors">
                              {item.id}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.priority === "P0"
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  : item.priority === "P1"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                              }`}
                            >
                              {item.priority}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-300">
                            {item.sprint}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-300">
                            {item.workstream}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white group-hover:text-cyan-200 transition-colors">
                              {item.task}
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {item.implementation}
                            </div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                            {item.owner}
                          </td>
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                              {item.effort}
                            </span>
                          </td>
                          <td
                            className="py-3 px-3 whitespace-nowrap"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <select
                              value={item.status}
                              onChange={(e) =>
                                handleStatusChange(item.id, e.target.value as TaskStatus)
                              }
                              className={`text-xs rounded-md px-2 py-1 font-semibold border outline-none ${
                                item.status === "Done"
                                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/60"
                                  : item.status === "In progress"
                                  ? "bg-blue-950/80 text-blue-300 border-blue-700/60"
                                  : item.status === "Blocked"
                                  ? "bg-rose-950/80 text-rose-300 border-rose-700/60"
                                  : "bg-slate-900 text-slate-300 border-slate-700"
                              }`}
                            >
                              <option value="Not started">Not started</option>
                              <option value="In progress">In progress</option>
                              <option value="Blocked">Blocked</option>
                              <option value="Done">Done</option>
                            </select>
                          </td>
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            <button
                              onClick={() => setActiveTaskModal(item)}
                              className="text-xs text-blue-400 hover:text-blue-200 font-medium"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QA VERIFICATION MATRIX (61 CASES) */}
        {activeTab === "qa" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter and QA Controls */}
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={qaSearchQuery}
                    onChange={(e) => setQaSearchQuery(e.target.value)}
                    placeholder="Search QA test ID (e.g. QA-007), pillar, or scenario..."
                    className="w-full bg-[#082C61]/60 border border-[#1b3f7a] focus:border-[#1055AE] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                  {qaSearchQuery && (
                    <button
                      onClick={() => setQaSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-300 shrink-0">
                  <span className="font-semibold text-white">Showing:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#082C61] border border-[#1b3f7a] font-bold text-cyan-300">
                    {filteredQa.length} of {qaCases.length} QA cases
                  </span>
                </div>
              </div>

              {/* QA filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#1b3f7a]/60">
                {/* Pillar */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    QA Pillar
                  </label>
                  <select
                    value={qaPillarFilter}
                    onChange={(e) => setQaPillarFilter(e.target.value)}
                    className="w-full bg-[#082C61] border border-[#1b3f7a] text-slate-200 text-xs rounded-lg px-2.5 py-2 outline-none"
                  >
                    <option value="ALL">All Pillars</option>
                    <option value="Responsive">Responsive (QA-001 to 006)</option>
                    <option value="Booking">Booking & Commerce (QA-007 to 018)</option>
                    <option value="Prescription">Prescription Upload (QA-019 to 026)</option>
                    <option value="Reports">Patient Reports (QA-027 to 031)</option>
                    <option value="B2B">Hospital B2B (QA-032 to 036)</option>
                    <option value="SEO">Technical SEO (QA-037 to 046)</option>
                    <option value="Accessibility">Accessibility WCAG (QA-047 to 053)</option>
                    <option value="Clinical">Clinical & Governance (QA-054 to 061)</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={qaPriorityFilter}
                    onChange={(e) => setQaPriorityFilter(e.target.value)}
                    className="w-full bg-[#082C61] border border-[#1b3f7a] text-slate-200 text-xs rounded-lg px-2.5 py-2 outline-none"
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="P0">P0 (Critical Launch Tests)</option>
                    <option value="P1">P1 (Core Functional QA)</option>
                  </select>
                </div>

                {/* Result */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Execution Result
                  </label>
                  <select
                    value={qaResultFilter}
                    onChange={(e) => setQaResultFilter(e.target.value)}
                    className="w-full bg-[#082C61] border border-[#1b3f7a] text-slate-200 text-xs rounded-lg px-2.5 py-2 outline-none"
                  >
                    <option value="ALL">All Results</option>
                    <option value="Not run">Not run</option>
                    <option value="Passed">Passed</option>
                    <option value="Failed">Failed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>
            </div>

            {/* QA Table */}
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#082C61] text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-[#1b3f7a]">
                    <tr>
                      <th className="py-3 px-4 w-24">Test ID</th>
                      <th className="py-3 px-3 w-28">Pillar</th>
                      <th className="py-3 px-4">Scenario</th>
                      <th className="py-3 px-4">Expected Result</th>
                      <th className="py-3 px-3 w-16">Pri</th>
                      <th className="py-3 px-3 w-20">Device</th>
                      <th className="py-3 px-3 w-32">Execution Result</th>
                      <th className="py-3 px-4 w-40">Defect Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b3f7a]/40 text-slate-200">
                    {filteredQa.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          No QA test cases match the active filters or search query.
                        </td>
                      </tr>
                    ) : (
                      filteredQa.map((item) => (
                        <tr key={item.id} className="hover:bg-[#0E3A75]/30 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                            {item.id}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="font-semibold text-cyan-300">{item.pillar}</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-white">
                            {item.scenario}
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {item.expected}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.priority === "P0"
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              }`}
                            >
                              {item.priority}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-slate-300 font-mono text-[11px]">
                            {item.device}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <select
                              value={item.result}
                              onChange={(e) =>
                                handleQaResultChange(item.id, e.target.value as QaResult)
                              }
                              className={`text-xs rounded-md px-2 py-1 font-semibold border outline-none ${
                                item.result === "Passed"
                                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/60"
                                  : item.result === "Failed"
                                  ? "bg-rose-950/80 text-rose-300 border-rose-700/60"
                                  : item.result === "Blocked"
                                  ? "bg-amber-950/80 text-amber-300 border-amber-700/60"
                                  : "bg-slate-900 text-slate-300 border-slate-700"
                              }`}
                            >
                              <option value="Not run">Not run</option>
                              <option value="Passed">Passed</option>
                              <option value="Failed">Failed</option>
                              <option value="Blocked">Blocked</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            {item.defectLink ? (
                              <a
                                href={item.defectLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-400 hover:underline"
                              >
                                Defect Ticket
                              </a>
                            ) : (
                              <span className="text-slate-500 italic">None logged</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MASTER URL INVENTORY (27 ROUTES) */}
        {activeTab === "urls" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">27 Canonical Production Routes</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Canonical URL audit mapping template type, search intent, and required GSC review action.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-3 py-1 rounded-lg bg-[#082C61] border border-[#1b3f7a] text-slate-200">
                  <strong className="text-white">6</strong> P0 Routes
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#082C61] border border-[#1b3f7a] text-slate-200">
                  <strong className="text-white">20</strong> P1 Routes
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#082C61] border border-[#1b3f7a] text-slate-200">
                  <strong className="text-white">1</strong> P2 Route
                </span>
              </div>
            </div>

            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#082C61] text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-[#1b3f7a]">
                    <tr>
                      <th className="py-3 px-4 w-60">Path</th>
                      <th className="py-3 px-3 w-40">Template</th>
                      <th className="py-3 px-4 w-44">User Intent</th>
                      <th className="py-3 px-4">Required Action</th>
                      <th className="py-3 px-3 w-16">Pri</th>
                      <th className="py-3 px-3 w-32">Decision</th>
                      <th className="py-3 px-3 w-20 text-center">Visit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b3f7a]/40 text-slate-200">
                    {URL_INVENTORY.map((item) => (
                      <tr key={item.path} className="hover:bg-[#0E3A75]/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                          {item.path}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-slate-300 font-medium">
                          {item.template}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-medium">
                          {item.intent}
                        </td>
                        <td className="py-3 px-4 text-slate-200">
                          {item.action}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.priority === "P0"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : item.priority === "P1"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                            }`}
                          >
                            {item.priority}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="inline-flex px-2.5 py-1 rounded bg-[#082C61] border border-[#215396] text-[10px] font-bold text-amber-300">
                            {item.decision}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <Link
                            href={item.path}
                            target="_blank"
                            className="inline-flex items-center text-blue-400 hover:text-blue-200 transition-colors"
                            title={`Preview ${item.path}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GOVERNANCE SIGN-OFF GATES (9 GATES) */}
        {activeTab === "governance" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  9 Mandatory Governance Signoff Gates
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Required cross-functional approval gates across Clinical, Legal, Operations, Quality, and Tech leadership.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                  {stats.gatesApproved} of {stats.gatesTotal} Approved
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {gates.map((gate) => (
                <div
                  key={gate.id}
                  className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-[#1055AE] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        {gate.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          gate.decision === "Approved"
                            ? "bg-emerald-950/80 text-emerald-300 border-emerald-700"
                            : gate.decision === "Rejected"
                            ? "bg-rose-950/80 text-rose-300 border-rose-700"
                            : "bg-amber-950/80 text-amber-300 border-amber-700"
                        }`}
                      >
                        {gate.decision}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">{gate.gate}</h4>
                    <div className="text-xs font-semibold text-cyan-300 mb-3 flex items-center space-x-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{gate.owner}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60 text-xs text-slate-300 mb-4">
                      <strong className="text-white block mb-0.5">Required Evidence:</strong>
                      {gate.requiredEvidence}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1b3f7a]/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Decision:</span>
                    <select
                      value={gate.decision}
                      onChange={(e) =>
                        handleGateDecisionChange(gate.id, e.target.value as ApprovalStatus)
                      }
                      className="text-xs rounded-lg px-2.5 py-1 font-semibold bg-[#082C61] border border-[#1b3f7a] text-white outline-none cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: IMPLEMENTATION BLUEPRINT & SPECIFICATIONS */}
        {activeTab === "blueprint" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Decision Statement & Non-Negotiables */}
            <div className="bg-gradient-to-r from-[#082C61] via-[#0E3A75] to-[#082C61] border border-[#215396] rounded-2xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#1055AE]/40 rounded-xl text-amber-300">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                    Executive Decision Statement • 24 October 2026
                  </div>
                  <h2 className="text-lg font-bold text-white leading-snug">
                    Win patient trust and convenient booking before scaling SEO page counts.
                  </h2>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Run a separate, credible B2B conversion journey for Hospital Laboratory Management (HLM), Laboratory Management Services (LMS), and specialised reference testing. Existing LIS, CRM, payments, and report portal should be preserved and integrated rather than rebuilt.
                  </p>
                </div>
              </div>

              {/* 5 Non-Negotiable Publication Gates */}
              <div className="mt-6 pt-5 border-t border-[#1b3f7a]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#2dd4bf]" />
                  <span>5 Non-Negotiable Publication Gates</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {NON_NEGOTIABLE_GATES.map((gateText, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#082C61]/70 border border-[#1b3f7a] text-slate-200 flex items-start space-x-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#1055AE] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{gateText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 1 & 2: Developer Instructions & Ownership Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* How Developer Should Use This Package */}
              <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">
                    How Developers Should Use This Package
                  </h3>
                </div>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60">
                    <strong className="text-white block mb-0.5">1. Single Delivery Register</strong>
                    Import 87 task records from the Delivery Control Centre into Jira/ClickUp/Asana or keep this workbook as the single delivery register.
                  </div>
                  <div className="p-3 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60">
                    <strong className="text-white block mb-0.5">2. Assign Cross-Functional Accountability</strong>
                    Assign Product Owner, Quality Head, Clinical Reviewer, Operations Lead, Security, SEO, and B2B Lead to approve their scope.
                  </div>
                  <div className="p-3 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60">
                    <strong className="text-white block mb-0.5">3. Record Baseline Snapshot</strong>
                    Capture public routes, rendered HTML, performance baseline, 28-day GSC data, booking analytics, and current release backup before edits.
                  </div>
                  <div className="p-3 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60">
                    <strong className="text-white block mb-0.5">4. Staging & Feature Flags</strong>
                    Create a staging release branch. Map existing API contracts for LIS/catalogue, LeadSquared, report auth, collection slots, and payments.
                  </div>
                  <div className="p-3 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60">
                    <strong className="text-white block mb-0.5">5. Implement All P0 Gates First</strong>
                    Resolve P0 gates before publishing new trust claims or campaigns. Integrate shared tokens before cosmetic page-by-page updates.
                  </div>
                  <div className="p-3 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60">
                    <strong className="text-white block mb-0.5">6. Rigorous Multi-Device Testing</strong>
                    Test every patient and hospital form across smartphone, tablet, desktop, and keyboard-only workflows.
                  </div>
                  <div className="p-3 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a]/60">
                    <strong className="text-white block mb-0.5">7. Guarded Phased Rollout</strong>
                    Go live in guarded phases with signed test evidence, production crawl comparison, and verified rollback path.
                  </div>
                </div>
              </div>

              {/* Ownership & Accountability Matrix */}
              <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Expected Ownership & Responsibility
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#082C61] text-slate-300 font-bold uppercase text-[10px] border-b border-[#1b3f7a]">
                      <tr>
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3">Accountability / Sign-off Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1b3f7a]/40 text-slate-200">
                      {BLUEPRINT_ROLES.map((r) => (
                        <tr key={r.role} className="hover:bg-[#0E3A75]/30">
                          <td className="py-2.5 px-3 font-semibold text-white whitespace-nowrap">
                            {r.role}
                          </td>
                          <td className="py-2.5 px-3 text-slate-300 leading-relaxed">
                            {r.accountability}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Core Design System — Exact Values & Swatches */}
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="w-5 h-5 text-[#2dd4bf]" />
                <h3 className="text-base font-bold text-white">
                  Core Design System — Exact Token Palette
                </h3>
                <span className="text-xs text-slate-400 font-normal ml-2">
                  (Bundled in public/qxl-design-tokens.css)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {DESIGN_TOKENS.map((token) => (
                  <div
                    key={token.token}
                    className="p-3.5 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-3 mb-2.5">
                        <div
                          className="w-8 h-8 rounded-lg shadow-md border border-white/20 shrink-0"
                          style={{ backgroundColor: token.value }}
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{token.token}</div>
                          <div className="font-mono text-[11px] text-cyan-300 font-bold">
                            {token.value}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-[10px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800 w-fit mb-2">
                        {token.cssVar}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-300 leading-snug">
                      {token.use}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#1b3f7a] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-[#082C61]/30 border border-[#1b3f7a]/40">
                  <strong className="text-white block mb-0.5">Spacing:</strong>
                  8px increment system (8px, 16px, 24px, 32px, 48px, 64px).
                </div>
                <div className="p-3 rounded-xl bg-[#082C61]/30 border border-[#1b3f7a]/40">
                  <strong className="text-white block mb-0.5">Card Radii & Touch Targets:</strong>
                  14–20px rounded corners; minimum 44×44px interactive targets.
                </div>
                <div className="p-3 rounded-xl bg-[#082C61]/30 border border-[#1b3f7a]/40">
                  <strong className="text-white block mb-0.5">Accessibility Standard:</strong>
                  WCAG 2.2 AA verified contrast; visible focus ring; reduced-motion query.
                </div>
              </div>
            </div>

            {/* Responsive Rules & First-Screen Viewports */}
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Smartphone className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">
                  Responsive Rules & First-Screen Specifications
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {RESPONSIVE_SPECS.map((spec) => (
                  <div
                    key={spec.viewport}
                    className="p-4 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a] flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1055AE] text-white mb-2">
                        {spec.viewport}
                      </span>
                      <div className="text-xs text-slate-300 mb-3">
                        <strong className="text-white block mb-1">Layout Architecture:</strong>
                        {spec.layout}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0b1e3d] border border-[#1b3f7a]/60 text-xs">
                      <strong className="text-cyan-300 block mb-0.5">Above First Scroll:</strong>
                      <span className="text-slate-200">{spec.aboveFold}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Journeys Functional Acceptance */}
            <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-[#2dd4bf]" />
                <h3 className="text-base font-bold text-white">
                  5 Core Patient Journeys — Functional Acceptance
                </h3>
              </div>
              <div className="space-y-4">
                {PATIENT_JOURNEYS.map((j) => (
                  <div
                    key={j.title}
                    className="p-4 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{j.title}</h4>
                      <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        Functional Acceptance
                      </span>
                    </div>
                    <div className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                      {j.flow}
                    </div>
                    <div className="text-xs text-slate-300">
                      <strong className="text-amber-300">Operational Guardrail: </strong>
                      {j.guardrails}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rollout Sequence & KPI Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Rollout Sequence */}
              <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Priority Rollout Sequence & Release Gates
                  </h3>
                </div>
                <div className="space-y-3">
                  {ROLLOUT_PHASES.map((phase) => (
                    <div
                      key={phase.window}
                      className="p-3.5 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a] text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-cyan-300">{phase.window}</span>
                        <span className="text-[10px] text-slate-400">Progression Gate</span>
                      </div>
                      <div className="text-slate-200 mb-1.5 leading-relaxed">{phase.output}</div>
                      <div className="text-slate-300">
                        <strong className="text-amber-300">Release Evidence: </strong>
                        {phase.evidence}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Acceptance Table */}
              <div className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <SlidersHorizontal className="w-5 h-5 text-[#1055AE]" />
                  <h3 className="text-base font-bold text-white">
                    KPI Acceptance & Executive Reporting
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#082C61] text-slate-300 font-bold uppercase text-[10px] border-b border-[#1b3f7a]">
                      <tr>
                        <th className="py-2.5 px-3">Measure</th>
                        <th className="py-2.5 px-3">Source</th>
                        <th className="py-2.5 px-3">Definition & Guardrail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1b3f7a]/40 text-slate-200">
                      {KPI_METRICS.map((kpi) => (
                        <tr key={kpi.measure} className="hover:bg-[#0E3A75]/30">
                          <td className="py-2.5 px-3 font-semibold text-white whitespace-nowrap">
                            {kpi.measure}
                          </td>
                          <td className="py-2.5 px-3 text-cyan-300 whitespace-nowrap font-mono text-[11px]">
                            {kpi.source}
                          </td>
                          <td className="py-2.5 px-3 text-slate-300 leading-relaxed">
                            {kpi.definition}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Task Inspection Modal / Drawer */}
      {activeTaskModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setActiveTaskModal(null)}
        >
          <div
            className="bg-[#0b1e3d] border border-[#1b3f7a] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#1b3f7a] pb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-mono text-sm font-bold text-cyan-300">
                    {activeTaskModal.id}
                  </span>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                      activeTaskModal.priority === "P0"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : activeTaskModal.priority === "P1"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                    }`}
                  >
                    {activeTaskModal.priority}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#082C61] border border-[#1b3f7a] text-slate-300 font-medium">
                    Sprint {activeTaskModal.sprint}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#082C61] border border-[#1b3f7a] text-slate-300 font-medium">
                    Effort: {activeTaskModal.effort}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{activeTaskModal.task}</h3>
                <div className="text-xs text-slate-400 mt-1">
                  Workstream: <strong className="text-white">{activeTaskModal.workstream}</strong>
                </div>
              </div>
              <button
                onClick={() => setActiveTaskModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Implementation Details */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Target URL
                </label>
                <div className="p-2.5 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a] font-mono text-cyan-300 flex items-center justify-between">
                  <span className="truncate">{activeTaskModal.url}</span>
                  <a
                    href={activeTaskModal.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline shrink-0 ml-2"
                  >
                    Open URL
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Technical Implementation Requirements
                </label>
                <div className="p-3.5 rounded-xl bg-[#082C61]/40 border border-[#1b3f7a] leading-relaxed text-slate-200">
                  {activeTaskModal.implementation}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Acceptance Criteria (Definition of Done)
                </label>
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-200 leading-relaxed">
                  {activeTaskModal.acceptanceCriteria}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Assigned Owner
                  </label>
                  <div className="p-2.5 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a] font-medium text-white">
                    {activeTaskModal.owner}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Dependencies
                  </label>
                  <div className="p-2.5 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a] font-medium text-white">
                    {activeTaskModal.dependencies || "None"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Current Task Status
                  </label>
                  <select
                    value={activeTaskModal.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as TaskStatus;
                      handleStatusChange(activeTaskModal.id, newStatus);
                      setActiveTaskModal({ ...activeTaskModal, status: newStatus });
                    }}
                    className="w-full text-xs rounded-xl p-2.5 font-semibold bg-[#082C61] border border-[#1b3f7a] text-white outline-none cursor-pointer"
                  >
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    QXL Governance Approval
                  </label>
                  <div className="p-2.5 rounded-xl bg-[#082C61]/50 border border-[#1b3f7a] font-bold text-amber-300">
                    {activeTaskModal.qxlApproval}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#1b3f7a] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Changes persist dynamically in session memory.
              </span>
              <button
                onClick={() => setActiveTaskModal(null)}
                className="px-5 py-2 rounded-xl bg-[#1055AE] hover:bg-[#156cdb] text-white text-xs font-bold transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
