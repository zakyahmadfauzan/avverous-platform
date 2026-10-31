import { supabase } from '@/lib/supabase';
import { SubtestResult, Subtest } from '@/types';

export const PRACTICE_PACKAGE_ID = -1;

export interface PracticeSessionSummary {
  id: string;
  user_id: string;
  package_id: number;
  package_name: string;
  participant_name: string;
  completed_at: string;
  total_score: number;
  subtest_results: SubtestResult[];
  answers: Record<number, string>;
  subtests: Subtest[];
}

function rowToSummary(row: PracticeSessionSummary): PracticeSessionSummary {
  return { ...row };
}

export function isPracticeSession(row: { package_id?: number }): boolean {
  return row.package_id === PRACTICE_PACKAGE_ID;
}

export async function fetchMyPracticeSessions(): Promise<PracticeSessionSummary[]> {
  const { data, error } = await supabase
    .from('exam_results')
    .select('*')
    .eq('package_id', PRACTICE_PACKAGE_ID)
    .order('completed_at', { ascending: false });
  if (error) throw error;
  return (data as PracticeSessionSummary[]).map(rowToSummary);
}

export async function insertPracticeSession(
  userId: string,
  subtestCode: string,
  subtestName: string,
  totalQuestions: number,
  correctCount: number,
  wrongCount: number,
  answers: Record<number, string>,
  subtests: Subtest[],
): Promise<PracticeSessionSummary | null> {
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 1000) : 0;
  const subtestResult: SubtestResult = {
    subtestId: subtestCode,
    name: subtestName,
    total: totalQuestions,
    correct: correctCount,
    wrong: wrongCount,
    empty: 0,
    score: accuracy,
  };
  const { data, error } = await supabase
    .from('exam_results')
    .insert({
      user_id: userId,
      package_id: PRACTICE_PACKAGE_ID,
      package_name: `Latihan Bank Soal · ${subtestName}`,
      participant_name: subtestName,
      total_score: accuracy,
      subtest_results: [subtestResult],
      answers,
      subtests,
    })
    .select('*')
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return rowToSummary(data as PracticeSessionSummary);
}

export async function fetchMyPracticeTotal(): Promise<{ totalQuestions: number; correctCount: number }> {
  const sessions = await fetchMyPracticeSessions();
  const totalQuestions = sessions.reduce(
    (acc, s) => acc + (s.subtest_results ?? []).reduce((a, r) => a + (r?.total ?? 0), 0),
    0,
  );
  const correctCount = sessions.reduce(
    (acc, s) => acc + (s.subtest_results ?? []).reduce((a, r) => a + (r?.correct ?? 0), 0),
    0,
  );
  return { totalQuestions, correctCount };
}
