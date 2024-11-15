import { useState } from 'react';
import { useLti } from '../contexts/LtiContext';

export function useLtiGrade() {
  const { token } = useLti();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitGrade = async (score: number, activityId: string) => {
    if (!token) {
      setError('No LTI session');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/lti/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score, activityId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit grade');
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit grade');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitGrade,
    submitting,
    error,
  };
}