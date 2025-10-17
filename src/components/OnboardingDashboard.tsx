import { useState } from 'react';
import { Calendar, CheckCircle, Clock, Users, BookOpen, TrendingUp } from 'lucide-react';
import ChatBot from './ChatBot';
import './OnboardingDashboard.css';

function OnboardingDashboard() {
  const [currentDay] = useState(1);
  const [showChat] = useState(true);

  const weeklyProgress = [
    {
      week: 'Week 1',
      days: '1-5',
      focus: 'Getting Started',
      tasks: [
        { id: 1, title: 'Complete HR paperwork', completed: true },
        { id: 2, title: 'Set up work accounts (Slack, Email, etc.)', completed: true },
        { id: 3, title: 'Meet your manager', completed: true },
        { id: 4, title: 'System access and tools setup', completed: false },
        { id: 5, title: 'Review company handbook', completed: false }
      ]
    },
    {
      week: 'Week 2',
      days: '6-12',
      focus: 'Team Integration',
      tasks: [
        { id: 6, title: '1-on-1s with team members', completed: false },
        { id: 7, title: 'Shadow a senior team member', completed: false },
        { id: 8, title: 'Join team meetings', completed: false },
        { id: 9, title: 'First small project assignment', completed: false },
        { id: 10, title: 'Learn team workflows', completed: false }
      ]
    },
    {
      week: 'Week 3',
      days: '13-19',
      focus: 'Skill Building',
      tasks: [
        { id: 11, title: 'Complete onboarding training modules', completed: false },
        { id: 12, title: 'Attend company culture session', completed: false },
        { id: 13, title: 'Work on first deliverable', completed: false },
        { id: 14, title: 'Technical skills workshop', completed: false },
        { id: 15, title: 'Feedback session with manager', completed: false }
      ]
    },
    {
      week: 'Week 4',
      days: '20-30',
      focus: 'Independence',
      tasks: [
        { id: 16, title: 'Own a small project end-to-end', completed: false },
        { id: 17, title: 'Present work to the team', completed: false },
        { id: 18, title: '30-day check-in with HR', completed: false },
        { id: 19, title: 'Set 90-day goals', completed: false },
        { id: 20, title: 'Connect with cross-functional teams', completed: false }
      ]
    }
  ];

  const quickStats = [
    { icon: Calendar, label: 'Day', value: currentDay, color: '#6b4fbb' },
    { icon: CheckCircle, label: 'Tasks Done', value: '3/20', color: '#10b981' },
    { icon: Users, label: 'Team Meets', value: '1/8', color: '#f59e0b' },
    { icon: TrendingUp, label: 'Progress', value: '15%', color: '#3b82f6' }
  ];

  return (
    <div className="onboarding-dashboard">
      <div className="dashboard-main">
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1>Welcome to Your First Day! 🎉</h1>
            <p>We're excited to have you on the team. Let's make your onboarding journey smooth and enjoyable.</p>
            <div className="day-indicator">
              <Clock size={20} />
              <span>Day {currentDay} of 30</span>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="journey-section">
          <div className="section-header">
            <h2>Your 30-Day Journey</h2>
            <p>Track your progress through each week of onboarding</p>
          </div>

          <div className="weeks-container">
            {weeklyProgress.map((week, index) => {
              const completedTasks = week.tasks.filter(t => t.completed).length;
              const totalTasks = week.tasks.length;
              const progress = (completedTasks / totalTasks) * 100;

              return (
                <div key={index} className={`week-card ${index === 0 ? 'active' : ''}`}>
                  <div className="week-header">
                    <div className="week-title">
                      <h3>{week.week}</h3>
                      <span className="week-days">Days {week.days}</span>
                    </div>
                    <div className="week-progress-circle">
                      <svg width="60" height="60">
                        <circle cx="30" cy="30" r="25" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                        <circle
                          cx="30"
                          cy="30"
                          r="25"
                          fill="none"
                          stroke="#6b4fbb"
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 25}`}
                          strokeDashoffset={`${2 * Math.PI * 25 * (1 - progress / 100)}`}
                          transform="rotate(-90 30 30)"
                        />
                        <text x="30" y="35" textAnchor="middle" fontSize="12" fill="#1d1d1f" fontWeight="600">
                          {Math.round(progress)}%
                        </text>
                      </svg>
                    </div>
                  </div>

                  <div className="week-focus">
                    <BookOpen size={16} />
                    <span>Focus: {week.focus}</span>
                  </div>

                  <div className="week-tasks">
                    {week.tasks.map((task) => (
                      <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <div className="task-checkbox">
                          {task.completed ? <CheckCircle size={16} /> : <div className="checkbox-empty" />}
                        </div>
                        <span className="task-title">{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="integrations-section">
          <h2>Connected Tools</h2>
          <div className="integrations-grid">
            <a 
              href="https://hr-bot-org.slack.com/archives/C09MQ5RPQP2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="integration-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="integration-icon slack">💬</div>
              <div>
                <h3>Slack</h3>
                <p>Team communication</p>
              </div>
              <span className="integration-status connected">Connected</span>
            </a>
            <div className="integration-card">
              <div className="integration-icon notion">📝</div>
              <div>
                <h3>Notion</h3>
                <p>Documentation hub</p>
              </div>
              <span className="integration-status connected">Connected</span>
            </div>
            <div className="integration-card">
              <div className="integration-icon hris">👥</div>
              <div>
                <h3>HRIS</h3>
                <p>BambooHR</p>
              </div>
              <span className="integration-status connected">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <div className="dashboard-chat">
          <ChatBot />
        </div>
      )}
    </div>
  );
}

export default OnboardingDashboard;
