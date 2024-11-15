import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { Quiz as QuizType } from '../types';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number) => void;
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  
  const isAnswerCorrect = (questionId: string, selectedOptionId: string) => {
    const question = quiz.questions.find(q => q.id === questionId);
    return question?.correctOptionId === selectedOptionId;
  };

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswers[currentQuestion.id]) return;
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const score = calculateScore();
      setQuizCompleted(true);
      onComplete(score);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(question => {
      if (isAnswerCorrect(question.id, selectedAnswers[question.id])) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  if (quizCompleted) {
    const score = calculateScore();
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz Complete!</h3>
        <div className="mb-6">
          <p className="text-lg mb-2">Your score:</p>
          <p className="text-4xl font-bold text-indigo-600">{score}%</p>
        </div>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setSelectedAnswers({});
            setShowFeedback(false);
            setQuizCompleted(false);
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </h3>
          <span className="text-sm text-gray-500">
            Progress: {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg text-gray-900 mb-4">{currentQuestion.text}</p>
        <div className="space-y-3">
          {currentQuestion.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                selectedAnswers[currentQuestion.id] === option.id
                  ? showFeedback
                    ? isAnswerCorrect(currentQuestion.id, option.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <span className="flex-grow">{option.text}</span>
                {showFeedback && selectedAnswers[currentQuestion.id] === option.id && (
                  isAnswerCorrect(currentQuestion.id, option.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-lg mb-6 ${
          isAnswerCorrect(currentQuestion.id, selectedAnswers[currentQuestion.id])
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          <p className="font-medium mb-2">
            {isAnswerCorrect(currentQuestion.id, selectedAnswers[currentQuestion.id])
              ? 'Correct!'
              : 'Not quite right'}
          </p>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!showFeedback ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswers[currentQuestion.id]}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 inline-flex items-center"
          >
            {currentQuestionIndex + 1 === totalQuestions ? (
              'Complete Quiz'
            ) : (
              <>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}