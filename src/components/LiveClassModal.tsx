import { useState, useEffect } from 'react';
import type React from 'react';
import { X, Send, Users, MessageSquare, Download, FileText, Sparkles, Video, Volume2, ThumbsUp } from 'lucide-react';
import { Course } from '../types';


interface LiveClassModalProps {
  course: Course;
  onClose: () => void;
}

export default function LiveClassModal({ course, onClose }: LiveClassModalProps) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Rafid Ahmed', text: 'Sir, please explain the vector cross product rule again!', time: '8:02 PM', isTeacher: false },
    { id: 2, sender: 'Redwan Sir (Instructor)', text: 'Sure Rafid! Right hand thumb rule gives the direction perpendicular to the plane of vectors.', time: '8:03 PM', isTeacher: true },
    { id: 3, sender: 'Sumaiya', text: 'Thank you Sir! Crystal clear now.', time: '8:04 PM', isTeacher: false },
    { id: 4, sender: 'Tanzim', text: 'Will this lecture sheet be updated in portal after class?', time: '8:05 PM', isTeacher: false },
    { id: 5, sender: 'Redwan\'s Method Mod', text: 'Yes, PDF notes and recording will be posted in 30 mins.', time: '8:05 PM', isTeacher: true },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'qa'>('chat');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You (Student)',
        text: inputMsg,
        time: 'Just now',
        isTeacher: false,
      },
    ]);
    setInputMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-950 text-white rounded-3xl max-w-5xl w-full h-[90vh] overflow-hidden shadow-2xl border border-slate-800 flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Top Class Header */}
        <div className="bg-slate-900 px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-red-600 px-2 py-0.5 rounded text-white">
                  LIVE NOW
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {course.title} — Lecture Masterclass
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Instructor: {course.instructors[0]?.name} • 1,248 students watching
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Classroom Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Main Video Stream Player */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative">
            <div className="w-full h-full flex items-center justify-center relative aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${course.demoVideos[0]?.youtubeId || 'WO1KcxKmgYk'}?autoplay=1`}
                title={course.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right Live Interaction Sidebar */}
          <div className="lg:col-span-4 bg-slate-900 border-l border-slate-800 flex flex-col justify-between">
            
            {/* Interaction Tabs */}
            <div className="flex border-b border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-center border-b-2 ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-400 bg-slate-800/50'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 text-center border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-blue-500 text-blue-400 bg-slate-800/50'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Lecture Sheets
              </button>
            </div>

            {/* Tab: Live Chat */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-xl text-xs ${
                        msg.isTeacher
                          ? 'bg-blue-950/70 border border-blue-800/60 text-blue-100'
                          : 'bg-slate-800/60 border border-slate-700/40 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`font-bold ${msg.isTeacher ? 'text-amber-400' : 'text-blue-400'}`}>
                          {msg.sender}
                        </span>
                        <span className="text-[10px] text-slate-500">{msg.time}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Input form */}
                <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Ask doubt or comment live..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}

            {/* Tab: Notes & PDF Sheets */}
            {activeTab === 'notes' && (
              <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
                <h4 className="font-bold text-slate-300 mb-2">Class Materials &amp; Annotations</h4>
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="font-bold text-white">Lecture 01 - Smart Sheet.pdf</p>
                      <p className="text-[10px] text-slate-400">4.2 MB • Teacher Annotated</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Lecture sheet downloaded!')}
                    className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="font-bold text-white">Chapter Formula Matrix.pdf</p>
                      <p className="text-[10px] text-slate-400">1.8 MB • Quick Revision</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Formula matrix downloaded!')}
                    className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
