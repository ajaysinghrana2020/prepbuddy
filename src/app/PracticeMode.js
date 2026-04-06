"use client";

import { useState } from "react";

export default function PracticeMode({ questions, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentIndex(randomIndex);
    setShowAnswer(false);
    setUserAnswer("");
    setAiFeedback("");
  };

  const handleEvaluate = async () => {
    if (userAnswer.trim() === "") return;
    setLoading(true);
    setAiFeedback("");

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          topic: currentQuestion.topic,
          answer: userAnswer,
        }),
      });

      const data = await response.json();
      setAiFeedback(data.feedback);
    } catch (error) {
      setAiFeedback("Error getting feedback. Check your API key and try again.");
    }

    setLoading(false);
  };

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Practice Mode</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm"
          >
            ✕ Close
          </button>
        </div>

        <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
          {currentQuestion.topic}
        </span>

        <p className="text-xl text-white mt-4 mb-6">{currentQuestion.question}</p>

        <textarea
          className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 text-sm focus:outline-none focus:border-blue-500 resize-none mb-4"
          placeholder="Think about it... then type your answer here"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />

        {/* AI Feedback */}
        {aiFeedback && (
          <div className="bg-gray-800 border border-purple-500/30 rounded-lg p-4 mb-4">
            <p className="text-xs text-purple-400 mb-2 font-semibold">AI Feedback:</p>
            <p className="text-gray-300 text-sm whitespace-pre-line">{aiFeedback}</p>
          </div>
        )}

        {/* Saved Answer Reveal */}
        {showAnswer && currentQuestion.answer && (
          <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4 mb-4">
            <p className="text-xs text-green-400 mb-2 font-semibold">Your saved answer:</p>
            <p className="text-gray-300 text-sm">{currentQuestion.answer}</p>
          </div>
        )}

        {showAnswer && !currentQuestion.answer && (
          <div className="bg-gray-800 border border-yellow-500/30 rounded-lg p-4 mb-4">
            <p className="text-yellow-400 text-sm">No saved answer yet. Go back and write one!</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleEvaluate}
            disabled={loading || userAnswer.trim() === ""}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? "Evaluating..." : "AI Evaluate"}
          </button>
          {!showAnswer && (
            <button
              onClick={() => setShowAnswer(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Reveal Answer
            </button>
          )}
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Next Random Question →
          </button>
        </div>
      </div>
    </div>
  );
}