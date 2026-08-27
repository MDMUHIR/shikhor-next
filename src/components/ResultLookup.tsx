import { useState } from "react";
import type React from "react";
import {
  Search,
  Award,
  CheckCircle2,
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ResultLookup() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"shikhor" | "board">("shikhor");
  const [examType, setExamType] = useState("RM-CENTRAL");
  const [board, setBoard] = useState("Dhaka");
  const [rollNo, setRollNo] = useState("108520");
  const [regNo, setRegNo] = useState("19102488");
  const [year, setYear] = useState("2025");
  const [resultFound, setResultFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isBoardResult = activeTab === "board";

  const handleTabChange = (tab: "shikhor" | "board") => {
    setActiveTab(tab);
    setExamType(tab === "board" ? "HSC" : "RM-CENTRAL");
    setResultFound(false);
  };

  const handleReset = () => {
    setResultFound(false);
    setExamType(isBoardResult ? "HSC" : "RM-CENTRAL");
    setBoard("Dhaka");
    setRollNo("108520");
    setRegNo("19102488");
    setYear("2025");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResultFound(true);
    }, 600);
  };

  return (
    <div className="min-h-screen rm-page-bg py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Result Portal Header */}
        <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] bg-[#071e22] px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                {t("officialPortal")}
              </div>
              <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                {t("verifiedProgress")}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {t("resultDescription")}
              </p>
            </div>
            <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:block">
              <Trophy className="h-8 w-8 text-amber-300" />
              <p className="mt-3 text-xs font-bold text-slate-300">
                Secure lookup
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Print-ready records
              </p>
            </div>
          </div>
        </section>

        {/* Result Type Tabs */}
        <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <button
            onClick={() => handleTabChange("shikhor")}
            className={`rounded-xl px-4 py-3 text-left transition-all cursor-pointer ${activeTab === "shikhor" ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <span className="block text-sm font-black sm:text-base">
              {t("shikhorExamResult")}
            </span>
            <span
              className={`mt-1 block text-[11px] font-medium ${activeTab === "shikhor" ? "text-blue-100" : "text-slate-400"}`}
            >
              {t("modelTests")}
            </span>
          </button>
          <button
            onClick={() => handleTabChange("board")}
            className={`rounded-xl px-4 py-3 text-left transition-all cursor-pointer ${activeTab === "board" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <span className="block text-sm font-black sm:text-base">
              {t("boardResult")}
            </span>
            <span
              className={`mt-1 block text-[11px] font-medium ${activeTab === "board" ? "text-emerald-100" : "text-slate-400"}`}
            >
              {t("boardExams")}
            </span>
          </button>
        </div>

        {/* Search Card */}
        <div className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
          <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
            <div
              className={`rounded-xl p-2.5 ${isBoardResult ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}
            >
              {isBoardResult ? (
                <Award className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                {isBoardResult
                  ? "Board verification"
                  : "Shikhor performance lookup"}
              </p>
              <h2 className="mt-1 text-lg font-black text-slate-900">
                Enter your result details
              </h2>
            </div>
          </div>
          <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isBoardResult ? "Examination" : "Shikhor assessment"}
                </label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  {isBoardResult ? (
                    <>
                      <option value="HSC">HSC / Alim / Equivalent</option>
                      <option value="SSC">SSC / Dakhil / Equivalent</option>
                    </>
                  ) : (
                    <>
                      <option value="RM-CENTRAL">Central Grand Test</option>
                      <option value="ADMISSION">
                        BUET &amp; Medical Foundation Mock
                      </option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isBoardResult ? "Board year" : "Exam session"}
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              {isBoardResult && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Education board
                  </label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Cumilla">Cumilla</option>
                    <option value="Jashore">Jashore</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Dinajpur">Dinajpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isBoardResult ? "Roll number" : "Student roll / ID"}
                </label>
                <input
                  type="text"
                  required
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="e.g. 108520"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-medium text-slate-800"
                />
              </div>

              <div className={isBoardResult ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registration Number
                </label>
                <input
                  type="text"
                  required
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="e.g. 19102488"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                {isLoading ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Get Result</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Search Result Transcript */}
        {resultFound && (
          <div className="bg-white rounded-3xl border border-blue-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Transcript Header */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Digital Grade Transcript
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isBoardResult
                    ? "Board Examination Result"
                    : "Shikhor Exam Result Card"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isBoardResult
                    ? `Examination: ${examType} ${year} • Board: ${board}`
                    : `Assessment: ${examType} • Session: ${year}`}
                </p>
              </div>

              <div className="bg-emerald-500/20 border border-emerald-400/40 px-4 py-2.5 rounded-2xl text-center">
                <span className="text-[10px] text-emerald-300 uppercase tracking-wider block font-bold">
                  {isBoardResult ? "GPA Achieved" : "Overall Score"}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {isBoardResult ? "5.00 (Golden)" : "24 / 25"}
                </span>
              </div>
            </div>

            {/* Student Info Bar */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-slate-400">Student Name</p>
                <p className="font-bold text-slate-800 text-sm">
                  MD. TANVIR MAHMUD
                </p>
              </div>
              <div>
                <p className="text-slate-400">Roll No</p>
                <p className="font-bold text-slate-800 text-sm font-mono">
                  {rollNo}
                </p>
              </div>
              <div>
                <p className="text-slate-400">
                  {isBoardResult ? "Reg No" : "Student ID"}
                </p>
                <p className="font-bold text-slate-800 text-sm font-mono">
                  {regNo}
                </p>
              </div>
              <div>
                <p className="text-slate-400">
                  {isBoardResult ? "Institution" : "Course / Batch"}
                </p>
                <p className="font-bold text-slate-800 text-sm">
                  {isBoardResult ? "Notre Dame College" : "HSC 28 • Science"}
                </p>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="p-6 sm:p-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
                {isBoardResult
                  ? "Subject-Wise Grade Sheet"
                  : "Exam Performance Summary"}
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                      {isBoardResult ? (
                        <>
                          <th className="py-2.5 font-bold">Subject Code</th>
                          <th className="py-2.5 font-bold">Subject Name</th>
                          <th className="py-2.5 font-bold text-center">
                            Marks
                          </th>
                          <th className="py-2.5 font-bold text-center">
                            Letter Grade
                          </th>
                          <th className="py-2.5 font-bold text-right">
                            Grade Point
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="py-2.5 font-bold">Metric</th>
                          <th className="py-2.5 font-bold">Assessment</th>
                          <th className="py-2.5 font-bold text-center">
                            Score
                          </th>
                          <th className="py-2.5 font-bold text-center">
                            Status
                          </th>
                          <th className="py-2.5 font-bold text-right">
                            Details
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {isBoardResult ? (
                      <>
                        <tr>
                          <td className="py-3 font-mono text-slate-500">174</td>
                          <td className="py-3 font-semibold">
                            Physics (1st &amp; 2nd Paper)
                          </td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            194 / 200
                          </td>
                          <td className="py-3 text-center text-emerald-600 font-black">
                            A+
                          </td>
                          <td className="py-3 text-right font-bold">5.00</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-mono text-slate-500">176</td>
                          <td className="py-3 font-semibold">
                            Chemistry (1st &amp; 2nd Paper)
                          </td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            191 / 200
                          </td>
                          <td className="py-3 text-center text-emerald-600 font-black">
                            A+
                          </td>
                          <td className="py-3 text-right font-bold">5.00</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-mono text-slate-500">265</td>
                          <td className="py-3 font-semibold">
                            Higher Mathematics
                          </td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            198 / 200
                          </td>
                          <td className="py-3 text-center text-emerald-600 font-black">
                            A+
                          </td>
                          <td className="py-3 text-right font-bold">5.00</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-mono text-slate-500">178</td>
                          <td className="py-3 font-semibold">
                            Biology (Botany &amp; Zoology)
                          </td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            188 / 200
                          </td>
                          <td className="py-3 text-center text-emerald-600 font-black">
                            A+
                          </td>
                          <td className="py-3 text-right font-bold">5.00</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-mono text-slate-500">275</td>
                          <td className="py-3 font-semibold">
                            Information &amp; Communication Tech (ICT)
                          </td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            96 / 100
                          </td>
                          <td className="py-3 text-center text-emerald-600 font-black">
                            A+
                          </td>
                          <td className="py-3 text-right font-bold">5.00</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="py-3 font-semibold">
                            Correct answers
                          </td>
                          <td className="py-3 text-slate-500">
                            MCQ performance
                          </td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            24 / 25
                          </td>
                          <td className="py-3 text-center font-black text-emerald-600">
                            Excellent
                          </td>
                          <td className="py-3 text-right font-bold">96%</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold">
                            Questions attempted
                          </td>
                          <td className="py-3 text-slate-500">
                            Complete answer sheet
                          </td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            25 / 25
                          </td>
                          <td className="py-3 text-center font-black text-emerald-600">
                            Complete
                          </td>
                          <td className="py-3 text-right font-bold">100%</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold">
                            Time management
                          </td>
                          <td className="py-3 text-slate-500">Exam duration</td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            11m 45s
                          </td>
                          <td className="py-3 text-center font-black text-emerald-600">
                            On track
                          </td>
                          <td className="py-3 text-right font-bold">
                            25m limit
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold">Batch position</td>
                          <td className="py-3 text-slate-500">
                            Merit leaderboard
                          </td>
                          <td className="py-3 text-center font-bold text-blue-600">
                            #4
                          </td>
                          <td className="py-3 text-center font-black text-emerald-600">
                            Top 5%
                          </td>
                          <td className="py-3 text-right font-bold">
                            Verified
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Status:{" "}
                {isBoardResult
                  ? "Passed Successfully"
                  : "Exam Completed • Rank #4"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() =>
                    alert("Transcript PDF downloaded successfully!")
                  }
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {isBoardResult
                      ? "Download Transcript"
                      : "Download Scorecard"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
