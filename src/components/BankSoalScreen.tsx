import { useState } from 'react';
import {
  ArrowLeft,
  FileQuestion,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Brain,
  Globe,
  BookOpenCheck,
  Calculator,
  Languages,
  Type,
  Sigma,
  Play,
} from 'lucide-react';
import { PracticeQuestion } from '@/types';
import QuestionImage from '@/components/QuestionImage';

interface BankSoalScreenProps {
  practiceQuestions: PracticeQuestion[];
  onBackHome: () => void;
}

interface SubtestCard {
  id: string;
  shortName: string;
  name: string;
  description: string;
  estimatedQuestions: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  accent: string;
}

const UTBK_SUBTESTS: SubtestCard[] = [
  {
    id: 'PU',
    shortName: 'PU',
    name: 'Penalaran Umum',
    description: 'Soal logika, penalaran analitis, dan pemecahan masalah umum.',
    estimatedQuestions: 20,
    icon: <Brain className="w-6 h-6" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    accent: 'from-blue-500 to-blue-600',
  },
  {
    id: 'PPU',
    shortName: 'PPU',
    name: 'Pengetahuan & Pemahaman Umum',
    description: 'Pengetahuan umum, sejarah, geografi, dan wawasan kontemporer.',
    estimatedQuestions: 20,
    icon: <Globe className="w-6 h-6" />,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
    accent: 'from-teal-500 to-teal-600',
  },
  {
    id: 'PBM',
    shortName: 'PBM',
    name: 'Pemahaman Bacaan & Menulis',
    description: 'Pemahaman teks, menyimpulkan ide, dan evaluasi tulisan.',
    estimatedQuestions: 30,
    icon: <BookOpenCheck className="w-6 h-6" />,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    accent: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'PK',
    shortName: 'PK',
    name: 'Pengetahuan Kuantitatif',
    description: 'Pemahaman dan penerapan konsep kuantitatif dasar.',
    estimatedQuestions: 20,
    icon: <Calculator className="w-6 h-6" />,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
    accent: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 'LBI',
    shortName: 'LBI',
    name: 'Literasi dalam Bahasa Indonesia',
    description: 'Pemahaman teks bahasa Indonesia dan analisis informasi.',
    estimatedQuestions: 30,
    icon: <Languages className="w-6 h-6" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    accent: 'from-green-500 to-green-600',
  },
  {
    id: 'LBE',
    shortName: 'LBE',
    name: 'Literasi dalam Bahasa Inggris',
    description: 'Pemahaman reading dan tata bahasa Inggris.',
    estimatedQuestions: 30,
    icon: <Type className="w-6 h-6" />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
    accent: 'from-orange-500 to-orange-600',
  },
  {
    id: 'PM',
    shortName: 'PM',
    name: 'Penalaran Matematika',
    description: 'Penalaran untuk menyelesaikan masalah matematis.',
    estimatedQuestions: 20,
    icon: <Sigma className="w-6 h-6" />,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
    accent: 'from-rose-500 to-rose-600',
  },
];

export default function BankSoalScreen({ practiceQuestions, onBackHome }: BankSoalScreenProps) {
  const [selectedSubtest, setSelectedSubtest] = useState<SubtestCard | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (selectedSubtest) {
    return (
      <SubtestPracticeView
        subtest={selectedSubtest}
        practiceQuestions={practiceQuestions}
        onBack={() => setSelectedSubtest(null)}
        onBackHome={onBackHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackHome}
              className="p-2 rounded-lg bg-blue-800/60 hover:bg-blue-800 text-blue-100 transition shrink-0"
              aria-label="Kembali ke Beranda"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-11 h-11 bg-yellow-400 rounded-xl flex items-center justify-center text-blue-900 shrink-0">
              <FileQuestion className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-base leading-tight">Bank Soal</p>
              <p className="text-blue-300 text-xs">7 subtes UTBK resmi untuk latihan mandiri</p>
            </div>
          </div>
          <button
            onClick={onBackHome}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold text-sm rounded-lg transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Beranda
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-950 mb-2">Pilih Subtes untuk Latihan</h1>
          <p className="text-slate-500 text-sm">
            Kerjakan soal latihan mandiri tanpa tekanan waktu. Pilih salah satu subtes UTBK di bawah untuk memulai.
          </p>
        </div>

        {/* Subtest grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {UTBK_SUBTESTS.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition group flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 ${st.iconBg} rounded-2xl flex items-center justify-center ${st.iconColor} group-hover:scale-110 transition`}
                >
                  {st.icon}
                </div>
                <span className={`text-xs font-bold text-white bg-gradient-to-r ${st.accent} px-2.5 py-1 rounded-full`}>
                  {st.shortName}
                </span>
              </div>
              <h3 className="font-bold text-blue-950 text-lg mb-1.5 leading-snug">{st.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{st.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400">Estimasi soal</span>
                <span className="text-lg font-bold text-blue-950">{st.estimatedQuestions}</span>
              </div>
              <button
                onClick={() => setSelectedSubtest(st)}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-900 text-blue-700 hover:text-white font-medium text-sm rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4" />
                Mulai Latihan
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ---- Subtest practice view ----
function SubtestPracticeView({
  subtest,
  practiceQuestions,
  onBack,
  onBackHome,
}: {
  subtest: SubtestCard;
  practiceQuestions: PracticeQuestion[];
  onBack: () => void;
  onBackHome: () => void;
}) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-blue-800/60 hover:bg-blue-800 text-blue-100 transition shrink-0"
              aria-label="Kembali ke daftar subtes"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div
              className={`w-11 h-11 ${subtest.iconBg} rounded-xl flex items-center justify-center ${subtest.iconColor} shrink-0`}
            >
              {subtest.icon}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-base leading-tight">{subtest.name}</p>
              <p className="text-blue-300 text-xs">
                {practiceQuestions.length > 0
                  ? `${practiceQuestions.length} soal tersedia`
                  : `Estimasi ${subtest.estimatedQuestions} soal`}
              </p>
            </div>
          </div>
          <button
            onClick={onBackHome}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold text-sm rounded-lg transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Beranda
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {practiceQuestions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileQuestion className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium mb-1">Belum ada soal latihan</p>
            <p className="text-slate-400 text-sm">
              Soal untuk subtes {subtest.name} akan muncul di sini setelah ditambahkan oleh admin.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {practiceQuestions.map((q, idx) => {
              const isOpen = expandedId === q.id;
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition hover:border-blue-200"
                >
                  <button
                    onClick={() => setExpandedId(isOpen ? null : q.id)}
                    className="w-full p-5 flex items-start gap-4 text-left group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                          {q.type === 'multiple_choice' ? 'Pilihan Ganda' : 'Isian Singkat'}
                        </span>
                      </div>
                      <p className="text-slate-800 text-sm font-medium leading-relaxed line-clamp-2">
                        {q.question}
                      </p>
                    </div>
                    <div className="shrink-0 mt-1">
                      {isOpen ? (
                        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
                      <div>
                        <p className="text-slate-800 text-sm leading-relaxed">{q.question}</p>
                        {q.image && <QuestionImage src={q.image} />}
                      </div>

                      {q.type === 'multiple_choice' && q.options && (
                        <div className="space-y-2">
                          {q.options.map((opt, i) => {
                            const letter = String.fromCharCode(65 + i);
                            const isKey = letter === q.correctAnswer;
                            return (
                              <div
                                key={letter}
                                className={`flex items-center gap-2 p-2.5 rounded-lg border text-sm ${
                                  isKey ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'
                                }`}
                              >
                                <span
                                  className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                                    isKey ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {letter}
                                </span>
                                <span className="text-slate-700">{opt}</span>
                                {isKey && (
                                  <span className="ml-auto text-xs text-green-600 font-medium">Kunci</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {q.type === 'numeric' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-xs text-green-600 mb-1">Kunci Jawaban</p>
                          <p className="font-bold text-sm text-green-700">{q.correctAnswer}</p>
                        </div>
                      )}

                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <h4 className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-2">
                          <BookOpen className="w-3.5 h-3.5" />
                          Pembahasan
                        </h4>
                        <div className="space-y-2">
                          {q.explanation.map((step, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <div className="flex-1">
                                <p className="text-[11px] font-semibold text-blue-600">{step.label}</p>
                                <p className="text-xs text-slate-700 leading-relaxed">{step.content}</p>
                                {step.formula && (
                                  <div className="mt-1 bg-slate-100 rounded px-2 py-1 font-mono text-xs text-slate-800 overflow-x-auto">
                                    {step.formula}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
