import { useState } from 'react';
import {
  ArrowLeft,
  FileQuestion,
  ChevronRight,
  BookOpen,
  Brain,
  Globe,
  BookOpenCheck,
  Calculator,
  Languages,
  Type,
  Sigma,
  Play,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { PracticeQuestion, Subtest, SubtestResult } from '@/types';
import QuestionImage from '@/components/QuestionImage';
import { insertPracticeSession } from '@/lib/practiceHistoryStore';

interface BankSoalScreenProps {
  practiceQuestions: PracticeQuestion[];
  onBackHome: () => void;
  userId: string | null;
  onSessionSaved?: () => void | Promise<void>;
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

export default function BankSoalScreen({ practiceQuestions, onBackHome, userId, onSessionSaved }: BankSoalScreenProps) {
  const [selectedSubtest, setSelectedSubtest] = useState<SubtestCard | null>(null);

  if (selectedSubtest) {
    return (
      <SubtestPracticeView
        subtest={selectedSubtest}
        practiceQuestions={practiceQuestions}
        onBack={() => setSelectedSubtest(null)}
        onBackHome={onBackHome}
        userId={userId}
        onSessionSaved={onSessionSaved}
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

// ---- Subtest practice view (quiz flow) ----
function SubtestPracticeView({
  subtest,
  practiceQuestions,
  onBack,
  onBackHome,
  userId,
  onSessionSaved,
}: {
  subtest: SubtestCard;
  practiceQuestions: PracticeQuestion[];
  onBack: () => void;
  onBackHome: () => void;
  userId: string | null;
  onSessionSaved?: () => void | Promise<void>;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);

  const q = practiceQuestions[currentIdx];

  const handleSubmit = () => {
    if (!userAnswer || !q) return;
    setSubmitted(true);
    setAnswers((prev) => ({ ...prev, [q.id]: userAnswer }));
  };

  const handleNext = () => {
    if (currentIdx < practiceQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserAnswer('');
      setSubmitted(false);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setFinished(true);
    if (!userId || saved || saving) return;
    setSaving(true);
    setSaveError('');
    const total = practiceQuestions.length;
    let correct = 0;
    let wrong = 0;
    practiceQuestions.forEach((p) => {
      const ans = answers[p.id];
      if (!ans || !ans.trim()) return;
      if (ans.trim().toLowerCase() === p.correctAnswer.trim().toLowerCase()) correct++;
      else wrong++;
    });
    const subtests: Subtest[] = [{
      id: 1,
      name: subtest.name,
      shortName: subtest.shortName,
      description: subtest.description,
      durationMinutes: 0,
      questions: practiceQuestions as unknown as Subtest['questions'],
    }];
    try {
      await insertPracticeSession(userId, subtest.id, subtest.name, total, correct, wrong, answers, subtests);
      setSaved(true);
      if (onSessionSaved) await onSessionSaved();
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Gagal menyimpan riwayat latihan.');
    } finally {
      setSaving(false);
    }
  };

  const isCorrect =
    submitted &&
    userAnswer.trim().toLowerCase() === q?.correctAnswer.trim().toLowerCase();

  const isWrong = submitted && !isCorrect;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
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
                Soal {currentIdx + 1} dari {practiceQuestions.length}
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

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${((currentIdx + 1) / practiceQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        ) : !q || finished ? (
          (() => {
            if (finished) {
              let correct = 0;
              let wrong = 0;
              practiceQuestions.forEach((p) => {
                const ans = answers[p.id];
                if (!ans || !ans.trim()) return;
                if (ans.trim().toLowerCase() === p.correctAnswer.trim().toLowerCase()) correct++;
                else wrong++;
              });
              const total = practiceQuestions.length;
              const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
              return (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-slate-800 font-bold text-lg mb-1">Latihan Selesai!</p>
                  <p className="text-slate-500 text-sm mb-5">Kamu telah menyelesaikan semua soal di subtes {subtest.name}.</p>
                  <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-2xl font-bold text-slate-800">{total}</p>
                      <p className="text-slate-500 text-xs mt-1">Total Soal</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-2xl font-bold text-green-600">{correct}</p>
                      <p className="text-green-600 text-xs mt-1">Benar</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4">
                      <p className="text-2xl font-bold text-red-500">{wrong}</p>
                      <p className="text-red-500 text-xs mt-1">Salah</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 max-w-md mx-auto mb-6">
                    <p className="text-sm text-blue-700 font-semibold">Akurasi: {accuracy}%</p>
                  </div>
                  {saveError && (
                    <p className="text-red-500 text-xs mb-4">{saveError}</p>
                  )}
                  {saved && (
                    <p className="text-green-600 text-xs mb-4">Riwayat latihan tersimpan ke dashboard.</p>
                  )}
                  {saving && (
                    <p className="text-slate-500 text-xs mb-4 flex items-center justify-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Menyimpan...
                    </p>
                  )}
                  <button
                    onClick={onBack}
                    className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl transition"
                  >
                    Kembali ke Daftar Subtes
                  </button>
                </div>
              );
            }
            return (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileQuestion className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium mb-1">Belum ada soal latihan</p>
                <p className="text-slate-400 text-sm">
                  Soal untuk subtes {subtest.name} akan muncul di sini setelah ditambahkan oleh admin.
                </p>
              </div>
            );
          })()
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Question */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                  {currentIdx + 1}
                </span>
                <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  {q.type === 'multiple_choice' ? 'Pilihan Ganda' : 'Isian Singkat'}
                </span>
                {submitted && (
                  <span
                    className={`ml-auto inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Salah
                      </>
                    )}
                  </span>
                )}
              </div>

              <p className="text-slate-800 text-base font-medium leading-relaxed mb-4">{q.question}</p>
              {q.image && <QuestionImage src={q.image} />}

              {/* Multiple choice options */}
              {q.type === 'multiple_choice' && q.options && (
                <div className="space-y-2.5 mt-5">
                  {q.options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    const isKey = letter === q.correctAnswer;
                    const isStudent = userAnswer === letter;

                    let stateClasses = 'border-slate-200 bg-white';
                    let letterClasses = 'bg-slate-100 text-slate-600';

                    if (!submitted) {
                      if (isStudent) {
                        stateClasses = 'border-blue-400 bg-blue-50';
                        letterClasses = 'bg-blue-600 text-white';
                      }
                    } else {
                      if (isKey) {
                        stateClasses = 'border-green-300 bg-green-50';
                        letterClasses = 'bg-green-600 text-white';
                      } else if (isStudent) {
                        stateClasses = 'border-red-300 bg-red-50';
                        letterClasses = 'bg-red-500 text-white';
                      }
                    }

                    return (
                      <button
                        key={letter}
                        onClick={() => !submitted && setUserAnswer(letter)}
                        disabled={submitted}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-sm transition text-left ${stateClasses} ${
                          !submitted ? 'hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${letterClasses}`}
                        >
                          {letter}
                        </span>
                        <span className="text-slate-700 flex-1">{opt}</span>
                        {submitted && isKey && (
                          <span className="text-xs text-green-600 font-medium">Kunci</span>
                        )}
                        {submitted && isStudent && !isKey && (
                          <span className="text-xs text-red-500 font-medium">Jawabanmu</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric input */}
              {q.type === 'numeric' && (
                <div className="mt-5">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => !submitted && setUserAnswer(e.target.value)}
                    disabled={submitted}
                    placeholder="Ketik jawabanmu di sini..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition ${
                      submitted
                        ? isCorrect
                          ? 'border-green-300 bg-green-50 text-green-700'
                          : 'border-red-300 bg-red-50 text-red-700'
                        : 'border-slate-200 bg-white text-slate-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {submitted && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="bg-white border border-slate-200 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Jawaban Kamu</p>
                        <p
                          className={`font-bold text-sm ${
                            !userAnswer ? 'text-slate-400' : isCorrect ? 'text-green-600' : 'text-red-500'
                          }`}
                        >
                          {userAnswer || '(kosong)'}
                        </p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-xs text-green-600 mb-1">Kunci Jawaban</p>
                        <p className="font-bold text-sm text-green-700">{q.correctAnswer}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit / Next button */}
              <div className="mt-6 flex items-center justify-end gap-3">
                {!submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="px-6 py-3 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition flex items-center gap-2"
                  >
                    Cek Jawaban
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl transition flex items-center gap-2"
                  >
                    {currentIdx >= practiceQuestions.length - 1 ? 'Selesaikan Latihan' : 'Soal Selanjutnya'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Explanation — only after submit */}
            {submitted && (
              <div className="border-t border-slate-100 bg-slate-50 p-6 sm:p-8">
                {/* Correct answer banner for multiple choice */}
                {q.type === 'multiple_choice' && isWrong && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-green-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {q.correctAnswer}
                    </span>
                    <p className="text-sm text-green-700 font-medium">
                      Kunci jawaban: {q.correctAnswer}
                    </p>
                  </div>
                )}

                {/* Status banner */}
                <div
                  className={`flex items-center gap-2 mb-4 ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <p className="font-semibold text-sm">
                    {isCorrect ? 'Jawaban benar!' : 'Jawaban kurang tepat.'}
                  </p>
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-700 mb-3">
                    <BookOpen className="w-4 h-4" />
                    Pembahasan
                  </h4>
                  <div className="space-y-3">
                    {q.explanation.map((step, i) => (
                      <div key={i} className="flex gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-blue-600">{step.label}</p>
                          <p className="text-sm text-slate-700 leading-relaxed mt-0.5">{step.content}</p>
                          {step.formula && (
                            <div className="mt-1.5 bg-slate-100 rounded px-2.5 py-1.5 font-mono text-xs text-slate-800 overflow-x-auto">
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
        )}
      </main>
    </div>
  );
}
