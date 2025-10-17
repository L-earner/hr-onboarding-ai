import { useState } from 'react';
import Sidebar from './components/Sidebar';
import OnboardingDashboard from './components/OnboardingDashboard';
import TrainingModule from './components/TrainingModule';
import TeamProfile from './components/TeamProfile';
import CompanyTrivia from './components/CompanyTrivia';
import TeamMatcher from './components/TeamMatcher';
import OnboardingSprint from './components/OnboardingSprint';
import { trainingModules } from './data/trainingContent';
import { teamMembers } from './data/teamData';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTraining, setActiveTraining] = useState<string | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="main-content">
        {activeSection === 'home' && <OnboardingDashboard />}

        {activeSection === 'notifications' && (
          <div className="placeholder-content">
            <h1>🔔 Notifications</h1>
            <div className="notification-list">
              <div className="notification-item">
                <div className="notification-icon">👋</div>
                <div>
                  <h3>Welcome to the team!</h3>
                  <p>Your manager has scheduled a 1-on-1 for tomorrow at 10 AM</p>
                  <span className="notification-time">2 hours ago</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon">✅</div>
                <div>
                  <h3>Task completed</h3>
                  <p>You've completed "Set up work accounts"</p>
                  <span className="notification-time">5 hours ago</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon">📚</div>
                <div>
                  <h3>New training module available</h3>
                  <p>Check out "Company Culture 101" in the Learn section</p>
                  <span className="notification-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'learn' && !activeTraining && (
          <div className="placeholder-content">
            <h1>📚 Learn & Grow</h1>
            <div className="learn-grid">
              <div className="learn-card" onClick={() => setActiveTraining('culture')}>
                <h3>🎯 Company Culture 101</h3>
                <p>Learn about our values, mission, and what makes us unique</p>
                <span className="learn-duration">30 min</span>
              </div>
              <div className="learn-card" onClick={() => setActiveTraining('tools')}>
                <h3>🛠️ Tools & Systems</h3>
                <p>Master the tools you'll use every day</p>
                <span className="learn-duration">45 min</span>
              </div>
              <div className="learn-card" onClick={() => setActiveTraining('team')}>
                <h3>👥 Working with Your Team</h3>
                <p>Communication best practices and collaboration tips</p>
                <span className="learn-duration">25 min</span>
              </div>
              <div className="learn-card" onClick={() => setActiveTraining('role')}>
                <h3>🚀 Role-Specific Training</h3>
                <p>Deep dive into your specific role and responsibilities</p>
                <span className="learn-duration">60 min</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'learn' && activeTraining && (
          <TrainingModule
            module={trainingModules[activeTraining]}
            onBack={() => setActiveTraining(null)}
          />
        )}

        {activeSection === 'bounties' && (
          <div className="placeholder-content">
            <h1>🎁 Onboarding Challenges</h1>
            <div className="bounty-list">
              <div className="bounty-item">
                <h3>🎨 Personalize Your Profile</h3>
                <p>Add a photo, bio, and fun facts about yourself</p>
                <span className="bounty-reward">+50 points</span>
              </div>
              <div className="bounty-item">
                <h3>☕ Coffee Chat Champion</h3>
                <p>Have coffee chats with 5 team members</p>
                <span className="bounty-reward">+100 points</span>
              </div>
              <div className="bounty-item">
                <h3>📝 Documentation Hero</h3>
                <p>Contribute to team documentation</p>
                <span className="bounty-reward">+75 points</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'directory' && !selectedTeamMember && (
          <div className="placeholder-content">
            <h1>👥 Team Directory</h1>
            <p style={{ marginTop: '8px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
              Get to know your teammates. Click on anyone to view their profile and connect.
            </p>
            <div className="directory-grid">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="team-member-card"
                  onClick={() => setSelectedTeamMember(member)}
                >
                  <div className="member-avatar">{member.avatar}</div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-team">{member.team}</p>
                  <button className="member-action">View Profile</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'directory' && selectedTeamMember && (
          <TeamProfile
            member={selectedTeamMember}
            onBack={() => setSelectedTeamMember(null)}
          />
        )}

        {activeSection === 'games' && !activeGame && (
          <div className="placeholder-content">
            <h1>🎮 Team Building Games</h1>
            <p style={{ marginTop: '8px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
              Have fun while learning about the company and connecting with teammates!
            </p>
            <div className="games-grid">
              <div className="game-card" onClick={() => setActiveGame('trivia')}>
                <div className="game-icon">🧩</div>
                <h3>Company Trivia</h3>
                <p>Test your knowledge about the company</p>
                <button className="game-button">Play Now</button>
              </div>
              <div className="game-card" onClick={() => setActiveGame('matcher')}>
                <div className="game-icon">🎯</div>
                <h3>Team Matcher</h3>
                <p>Find colleagues with similar interests</p>
                <button className="game-button">Start Matching</button>
              </div>
              <div className="game-card" onClick={() => setActiveGame('sprint')}>
                <div className="game-icon">🏃</div>
                <h3>Onboarding Sprint</h3>
                <p>Complete tasks faster than other new hires</p>
                <button className="game-button">Join Sprint</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'games' && activeGame === 'trivia' && (
          <CompanyTrivia onBack={() => setActiveGame(null)} />
        )}

        {activeSection === 'games' && activeGame === 'matcher' && (
          <TeamMatcher onBack={() => setActiveGame(null)} />
        )}

        {activeSection === 'games' && activeGame === 'sprint' && (
          <OnboardingSprint onBack={() => setActiveGame(null)} />
        )}
      </main>
    </div>
  );
}

export default App;
