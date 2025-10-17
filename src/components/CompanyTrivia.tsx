import { useState } from 'react';
import { ArrowLeft, Trophy, CheckCircle, XCircle } from 'lucide-react';
import './CompanyTrivia.css';

const triviaQuestions = [
  {
    question: "What is AI for Everyone's primary mission?",
    options: [
      "To build the most advanced AI models",
      "To make AI accessible and beneficial for everyone",
      "To compete with big tech companies",
      "To train professional AI researchers only"
    ],
    correct: 1,
    explanation: "Our mission is to make artificial intelligence accessible, understandable, and beneficial for everyone - from students to enterprises!"
  },
  {
    question: "Which of these is NOT one of our core values?",
    options: ["Accessibility", "Competition", "Responsible AI", "Innovation"],
    correct: 1,
    explanation: "Our core values are Accessibility, Innovation, Collaboration, and Responsible AI. We believe in democratizing AI, not competing internally!"
  },
  {
    question: "What is our annual AI learning & development budget per employee?",
    options: ["$1,000", "$2,000", "$3,000", "$5,000"],
    correct: 2,
    explanation: "Every team member gets $3,000 per year for AI courses, conferences, books, and certifications to master AI!"
  },
  {
    question: "What special time do we give employees for personal AI projects?",
    options: ["10% time", "15% time", "20% time", "No special time"],
    correct: 2,
    explanation: "We give 20% time for personal AI projects and exploration - innovation happens when people experiment!"
  },
  {
    question: "How often do we have AI Town Hall meetings?",
    options: ["Daily", "Weekly", "Monthly", "Quarterly"],
    correct: 1,
    explanation: "We have weekly AI Town Halls where leadership shares AI breakthroughs and company updates!"
  },
  {
    question: "What's our PTO (Paid Time Off) policy?",
    options: [
      "15 days per year",
      "20 days per year",
      "30 days per year",
      "Unlimited PTO"
    ],
    correct: 3,
    explanation: "We have unlimited PTO - take time when you need it, no questions asked. Well-rested minds build better AI!"
  },
  {
    question: "What AI platform do we use for model hosting and collaboration?",
    options: ["AWS SageMaker", "Hugging Face", "OpenAI", "Azure ML"],
    correct: 1,
    explanation: "We use Hugging Face for AI model hosting and collaboration - it's perfect for democratizing AI!"
  },
  {
    question: "Who is our CEO and Founder?",
    options: ["Dr. Maya Chen", "Dr. Sarah Johnson", "Dr. John Smith", "Dr. Alex Rodriguez"],
    correct: 0,
    explanation: "Dr. Maya Chen is our CEO and Founder. She believes 'The future of AI is built by well-rested, inspired minds!'"
  }
];

interface CompanyTriviaProps {
  onBack: () => void;
}

function CompanyTrivia({ onBack }: CompanyTriviaProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === triviaQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setGameComplete(false);
  };

  const currentQ = triviaQuestions[currentQuestion];
  const percentage = Math.round((score / triviaQuestions.length) * 100);

  if (gameComplete) {
    return (
      <div className="trivia-game">
        <div className="game-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back to Games</span>
          </button>
        </div>

        <div className="trivia-results">
          <div className="results-icon">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '💪'}
          </div>
          <h1>Quiz Complete!</h1>
          <div className="final-score">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {triviaQuestions.length}</span>
            </div>
            <p className="score-percentage">{percentage}% Correct</p>
          </div>

          <div className="results-message">
            {percentage === 100 && <p>🌟 Perfect score! You're a company culture expert!</p>}
            {percentage >= 80 && percentage < 100 && <p>🎉 Great job! You know the company well!</p>}
            {percentage >= 60 && percentage < 80 && <p>👍 Good effort! Keep learning about our culture!</p>}
            {percentage < 60 && <p>💪 Keep exploring! Check out the Learn section for more info!</p>}
          </div>

          <div className="results-actions">
            <button className="game-button primary" onClick={handleRestart}>
              Play Again
            </button>
            <button className="game-button secondary" onClick={onBack}>
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trivia-game">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Games</span>
        </button>
        <div className="game-score">
          <Trophy size={20} />
          <span>Score: {score}/{triviaQuestions.length}</span>
        </div>
      </div>

      <div className="trivia-container">
        <div className="question-progress">
          <span>Question {currentQuestion + 1} of {triviaQuestions.length}</span>
          <div className="progress-dots">
            {triviaQuestions.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentQuestion ? 'active' : ''} ${index < currentQuestion ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="question-card">
          <h2>{currentQ.question}</h2>

          <div className="options-grid">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correct;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  className={`option-button ${isSelected ? 'selected' : ''} ${showResult && isCorrect ? 'correct' : ''} ${showResult && isSelected && !isCorrect ? 'incorrect' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  <span className="option-text">{option}</span>
                  {showResult && isCorrect && <CheckCircle size={20} />}
                  {showResult && isSelected && !isCorrect && <XCircle size={20} />}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="explanation-box">
              <div className="explanation-header">
                {selectedAnswer === currentQ.correct ? (
                  <>
                    <CheckCircle size={24} className="success-icon" />
                    <h3>Correct! 🎉</h3>
                  </>
                ) : (
                  <>
                    <XCircle size={24} className="error-icon" />
                    <h3>Not quite!</h3>
                  </>
                )}
              </div>
              <p>{currentQ.explanation}</p>
              <button className="next-button" onClick={handleNext}>
                {currentQuestion < triviaQuestions.length - 1 ? 'Next Question' : 'See Results'} →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyTrivia;
