import { useState } from 'react';
import type React from 'react';
import { Search, Award, CheckCircle2, FileText, Download, Printer, ShieldCheck } from 'lucide-react';


export default function ResultLookup() {
  const [examType, setExamType] = useState('HSC');
  const [board, setBoard] = useState('Dhaka');
  const [rollNo, setRollNo] = useState('108520');
  const [regNo, setRegNo] = useState('19102488');
  const [year, setYear] = useState('2025');
  const [resultFound, setResultFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResultFound(true);
    }, 600);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-slate-50/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Online Verification
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Redwan&apos;s Method Academic &amp; Board Result Portal
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Search, verify and download official result transcripts for Redwan&apos;s Method Central Model Tests and HSC/SSC board exams.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-8">
          <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Examination
                </label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option value="HSC">HSC / Alim / Equivalent</option>
                  <option value="SSC">SSC / Dakhil / Equivalent</option>
                  <option value="RM-CENTRAL">Redwan&apos;s Method Central Grand Test</option>
                  <option value="ADMISSION">BUET &amp; Medical Foundation Mock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Year
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

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Board / Zone
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

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Roll Number
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

              <div className="sm:col-span-2">
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
                onClick={() => setResultFound(false)}
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
                  Redwan&apos;s Method Academic Performance Record
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Examination: {examType} {year} • Board: {board}
                </p>
              </div>

              <div className="bg-emerald-500/20 border border-emerald-400/40 px-4 py-2.5 rounded-2xl text-center">
                <span className="text-[10px] text-emerald-300 uppercase tracking-wider block font-bold">
                  GPA Achieved
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  5.00 (Golden)
                </span>
              </div>
            </div>

            {/* Student Info Bar */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-slate-400">Student Name</p>
                <p className="font-bold text-slate-800 text-sm">MD. TANVIR MAHMUD</p>
              </div>
              <div>
                <p className="text-slate-400">Roll No</p>
                <p className="font-bold text-slate-800 text-sm font-mono">{rollNo}</p>
              </div>
              <div>
                <p className="text-slate-400">Reg No</p>
                <p className="font-bold text-slate-800 text-sm font-mono">{regNo}</p>
              </div>
              <div>
                <p className="text-slate-400">Institution</p>
                <p className="font-bold text-slate-800 text-sm">Notre Dame College</p>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="p-6 sm:p-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
                Subject-Wise Grade Sheet
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 font-bold">Subject Code</th>
                      <th className="py-2.5 font-bold">Subject Name</th>
                      <th className="py-2.5 font-bold text-center">Marks</th>
                      <th className="py-2.5 font-bold text-center">Letter Grade</th>
                      <th className="py-2.5 font-bold text-right">Grade Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    <tr>
                      <td className="py-3 font-mono text-slate-500">174</td>
                      <td className="py-3 font-semibold">Physics (1st &amp; 2nd Paper)</td>
                      <td className="py-3 text-center font-bold text-blue-600">194 / 200</td>
                      <td className="py-3 text-center text-emerald-600 font-black">A+</td>
                      <td className="py-3 text-right font-bold">5.00</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-slate-500">176</td>
                      <td className="py-3 font-semibold">Chemistry (1st &amp; 2nd Paper)</td>
                      <td className="py-3 text-center font-bold text-blue-600">191 / 200</td>
                      <td className="py-3 text-center text-emerald-600 font-black">A+</td>
                      <td className="py-3 text-right font-bold">5.00</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-slate-500">265</td>
                      <td className="py-3 font-semibold">Higher Mathematics</td>
                      <td className="py-3 text-center font-bold text-blue-600">198 / 200</td>
                      <td className="py-3 text-center text-emerald-600 font-black">A+</td>
                      <td className="py-3 text-right font-bold">5.00</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-slate-500">178</td>
                      <td className="py-3 font-semibold">Biology (Botany &amp; Zoology)</td>
                      <td className="py-3 text-center font-bold text-blue-600">188 / 200</td>
                      <td className="py-3 text-center text-emerald-600 font-black">A+</td>
                      <td className="py-3 text-right font-bold">5.00</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-slate-500">275</td>
                      <td className="py-3 font-semibold">Information &amp; Communication Tech (ICT)</td>
                      <td className="py-3 text-center font-bold text-blue-600">96 / 100</td>
                      <td className="py-3 text-center text-emerald-600 font-black">A+</td>
                      <td className="py-3 text-right font-bold">5.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">Status: Passed Successfully</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => alert('Transcript PDF downloaded successfully!')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Transcript</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
