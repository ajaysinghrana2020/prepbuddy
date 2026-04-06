"use client";

import { useState } from "react";
import PracticeMode from "./PracticeMode";

const sampleQuestions = [
  { id: 1, topic: "Java", question: "What are the new features in Java 17?", confidence: 3, answer: "" },
  { id: 2, topic: "Spring Boot", question: "Explain the difference between @Component and @Service", confidence: 2, answer: "" },
  { id: 3, topic: "SQL", question: "What is the difference between WHERE and HAVING?", confidence: 4, answer: "" },
  { id: 4, topic: "Project", question: "Explain the Card Embossing flow in your Velera project", confidence: 1, answer: "" },
  { id: 5, topic: "System Design", question: "How would you design a URL shortening service like bit.ly?", confidence: 2, answer: "" },
  { id: 6, topic: "System Design", question: "Design a scalable chat application like WhatsApp", confidence: 1, answer: "" },
  { id: 7, topic: "Java", question: "What is the difference between HashMap and TreeMap?", confidence: 3, answer: "" },
];

export default function Home() {
  const [questions, setQuestions] = useState(sampleQuestions);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newTopic, setNewTopic] = useState("Java");
  const [practiceMode, setPracticeMode] = useState(false);

  const topics = ["All", "Java", "Spring Boot", "SQL", "Project", "System Design"];

  const filtered =
    selectedTopic === "All"
      ? questions
      : questions.filter((q) => q.topic === selectedTopic);

  const handleCardClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAnswerChange = (id, newAnswer) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, answer: newAnswer } : q
      )
    );
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() === "") return;
    const newQ = {
      id: Date.now(),
      topic: newTopic,
      question: newQuestion,
      confidence: 1,
      answer: "",
    };
    setQuestions([...questions, newQ]);
    setNewQuestion("");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleConfidenceChange = (id, rating) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, confidence: rating } : q
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">PrepBuddy</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setPracticeMode(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Practice
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {showForm ? "Cancel" : "+ Add Question"}
          </button>
        </div>
      </div>
      <p className="text-gray-400 mb-6">Your interview prep companion</p>

      {/* Stats Bar */}
      <div className="flex gap-4 mb-6 text-sm">
        <span className="bg-gray-900 px-3 py-1 rounded-lg">
          Total: <span className="text-blue-400 font-semibold">{questions.length}</span>
        </span>
        <span className="bg-gray-900 px-3 py-1 rounded-lg">
          Confident (4-5★): <span className="text-green-400 font-semibold">
            {questions.filter((q) => q.confidence >= 4).length}
          </span>
        </span>
        <span className="bg-gray-900 px-3 py-1 rounded-lg">
          Weak (1-2★): <span className="text-red-400 font-semibold">
            {questions.filter((q) => q.confidence <= 2).length}
          </span>
        </span>
      </div>

      {/* Add Question Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Question</h2>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Topic</label>
            <select
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {topics.filter((t) => t !== "All").map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Question</label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your interview question..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleAddQuestion()}
            />
          </div>
          <button
            onClick={handleAddQuestion}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Add Question
          </button>
        </div>
      )}

      {/* Topic Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTopic === topic
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Question Cards */}
      <div className="grid gap-4">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer transition-all hover:border-gray-700"
            onClick={() => handleCardClick(q.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                {q.topic}
              </span>
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleConfidenceChange(q.id, star)}
                    className={`text-lg hover:scale-125 transition-transform ${
                      star <= q.confidence ? "text-yellow-400" : "text-gray-600"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <p className="text-lg mt-2">{q.question}</p>

            {expandedId === q.id && (
              <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                <textarea
                  className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Write your answer here... practice makes perfect!"
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-500 text-xs">
                    {q.answer.length > 0
                      ? `${q.answer.split(" ").filter(Boolean).length} words`
                      : "Click and start typing your answer"}
                  </p>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-red-500 hover:text-red-400 text-xs px-3 py-1 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center mt-12">
          No questions in this topic yet. Click &quot;+ Add Question&quot; to add some!
        </p>
      )}

      <p className="text-gray-600 text-sm mt-8">
        Showing {filtered.length} of {questions.length} questions
      </p>

      {/* Practice Mode Modal */}
      {practiceMode && (
        <PracticeMode
          questions={questions}
          onClose={() => setPracticeMode(false)}
        />
      )}
    </div>
  );
}