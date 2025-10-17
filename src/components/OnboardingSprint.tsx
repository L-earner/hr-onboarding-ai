import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Target, Zap, Star, Clock } from 'lucide-react';
import './OnboardingSprint.css';

const sprintTasks = [
  { id: 1, title: 'Complete your profile', points: 50, time: 5 },
  { id: 2, title: 'Join #general on Slack', points: 25, time: 2 },
  { id: 3, title: 'Read the company handbook', points: 100, time: 15 },
  { id: 4, title: 'Set up your development environment', points: 150, time: 30 },
  { id: 5, title: 'Meet 3 team members', points: 75, time: 20 },
  { id: 6, title: 'Complete a training module', points: 200, time: 30 },
  { id: 7, title: 'Add yourself to team directory', points: 50, time: 5 },
  { id: 8, title: 'Schedule 1-on-1 with manager', points: 75, time: 10 },
  { id: 9, title: 'Review team projects in Notion', points: 100, time: 20 },
  { id: 10, title: 'Complete your first code review', points: 250, time: 45 }
];

interface OnboardingSprintProps {
  onBack: () => void;
}

function OnboardingSprint({ onBack }: OnboardingSprintProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, gameOver]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(300);
    setCompletedTasks([]);
    setTotalPoints(0);
    setGameOver(false);
    setCurrentStreak(0);
  };

  const completeTask = (task: typeof sprintTasks[0]) => {
    if (completedTasks.includes(task.id)) return;

    const newCompleted = [...completedTasks, task.id];
    setCompletedTasks(newCompleted);

    const bonus = currentStreak >= 3 ? Math.floor(task.points * 0.5) : 0;
    setTotalPoints(totalPoints + task.points + bonus);
    setCurrentStreak(currentStreak + 1);

    // Simulate task time passing
    setTimeLeft(Math.max(0, timeLeft - task.time));
  };

  const restartGame = () => {
    setGameStarted(false);
    setTimeLeft(300);
    setCompletedTasks([]);
    setTotalPoints(0);
    setGameOver(false);
    setCurrentStreak(0);
  };

  const getRank = () => {
    if (totalPoints >= 800) return { title: '🏆 Sprint Champion', message: 'Outstanding performance!' };
    if (totalPoints >= 500) return { title: '⭐ Speed Demon', message: 'Impressive speed!' };
    if (totalPoints >= 300) return { title: '🚀 Quick Starter', message: 'Great effort!' };
    return { title: '💪 Getting Started', message: 'Keep going!' };
  };

  if (!gameStarted) {
    return (
      <div className="sprint-game">
        <div className="game-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back to Games</span>
          </button>
        </div>

        <div className="sprint-intro">
          <div className="intro-icon">🏃</div>
          <h1>Onboarding Sprint Challenge</h1>
          <p className="intro-tagline">Race against the clock to complete onboarding tasks!</p>

          <div className="game-rules">
            <h2>How to Play</h2>
            <div className="rules-grid">
              <div className="rule-card">
                <Clock size={32} />
                <h3>5 Minutes</h3>
                <p>Complete as many tasks as possible before time runs out</p>
              </div>
              <div className="rule-card">
                <Star size={32} />
                <h3>Earn Points</h3>
                <p>Each task is worth different points based on complexity</p>
              </div>
              <div className="rule-card">
                <Zap size={32} />
                <h3>Streak Bonus</h3>
                <p>Complete 3+ tasks in a row for 50% bonus points!</p>
              </div>
            </div>

            <div className="leaderboard-preview">
              <h3>🏆 Top Scores Today</h3>
              <div className="top-scores">
                <div className="score-item">
                  <span className="rank">#1</span>
                  <span className="name">Sarah J.</span>
                  <span className="score">1,150 pts</span>
                </div>
                <div className="score-item">
                  <span className="rank">#2</span>
                  <span className="name">Michael C.</span>
                  <span className="score">975 pts</span>
                </div>
                <div className="score-item">
                  <span className="rank">#3</span>
                  <span className="name">Alex R.</span>
                  <span className="score">850 pts</span>
                </div>
              </div>
            </div>
          </div>

          <button className="game-button primary large" onClick={startGame}>
            Start Sprint! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const rank = getRank();

    return (
      <div className="sprint-game">
        <div className="game-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back to Games</span>
          </button>
        </div>

        <div className="sprint-results">
          <div className="results-badge">{rank.title.split(' ')[0]}</div>
          <h1>{rank.title.split(' ').slice(1).join(' ')}</h1>
          <p className="results-message">{rank.message}</p>

          <div className="final-stats">
            <div className="stat-box">
              <div className="stat-value">{totalPoints}</div>
              <div className="stat-label">Total Points</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{completedTasks.length}</div>
              <div className="stat-label">Tasks Completed</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{currentStreak}</div>
              <div className="stat-label">Best Streak</div>
            </div>
          </div>

          <div className="completed-tasks-summary">
            <h3>Completed Tasks</h3>
            <div className="tasks-list-summary">
              {sprintTasks.filter(t => completedTasks.includes(t.id)).map(task => (
                <div key={task.id} className="task-summary-item">
                  <span className="task-check">✓</span>
                  <span className="task-name">{task.title}</span>
                  <span className="task-points">+{task.points} pts</span>
                </div>
              ))}
            </div>
          </div>

          <div className="results-actions">
            <button className="game-button primary" onClick={restartGame}>
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
    <div className="sprint-game">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Games</span>
        </button>
        <div className="game-stats">
          <div className="stat-item">
            <Trophy size={20} />
            <span>{totalPoints} pts</span>
          </div>
          <div className="stat-item timer">
            <Clock size={20} />
            <span>{formatTime(timeLeft)}</span>
          </div>
          {currentStreak >= 3 && (
            <div className="stat-item streak">
              <Zap size={20} />
              <span>{currentStreak}x Streak!</span>
            </div>
          )}
        </div>
      </div>

      <div className="sprint-container">
        <div className="sprint-progress">
          <span>{completedTasks.length} / {sprintTasks.length} tasks completed</span>
        </div>

        <div className="tasks-grid">
          {sprintTasks.map(task => {
            const isCompleted = completedTasks.includes(task.id);

            return (
              <div key={task.id} className={`sprint-task ${isCompleted ? 'completed' : ''}`}>
                <div className="task-header">
                  <div className="task-icon">
                    {isCompleted ? <Target className="completed-icon" /> : <Target />}
                  </div>
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    <div className="task-meta">
                      <span className="task-points">{task.points} pts</span>
                      <span className="task-time">{task.time}s</span>
                    </div>
                  </div>
                </div>
                <button
                  className="complete-task-btn"
                  onClick={() => completeTask(task)}
                  disabled={isCompleted}
                >
                  {isCompleted ? 'Completed ✓' : 'Complete'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OnboardingSprint;
