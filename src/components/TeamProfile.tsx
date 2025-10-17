import { ArrowLeft, Mail, MessageCircle, Calendar, MapPin, Clock, Award, Briefcase, Heart, Coffee } from 'lucide-react';
import './TeamProfile.css';

interface TeamProfileProps {
  member: any;
  onBack: () => void;
}

function TeamProfile({ member, onBack }: TeamProfileProps) {
  const handleSlackMessage = () => {
    // In a real app, this would open Slack
    alert(`Opening Slack to message ${member.slackId}`);
  };

  const handleScheduleMeeting = () => {
    // In a real app, this would open calendar
    alert(`Opening calendar to schedule a catch-up with ${member.name}`);
  };

  const handleEmail = () => {
    // In a real app, this would open email client
    window.location.href = `mailto:${member.email}`;
  };

  return (
    <div className="team-profile">
      <div className="profile-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Directory</span>
        </button>
      </div>

      <div className="profile-container">
        <div className="profile-main">
          <div className="profile-hero">
            <div className="profile-avatar-large">{member.avatar}</div>
            <div className="profile-hero-info">
              <h1>{member.name}</h1>
              <p className="profile-role">{member.role}</p>
              <p className="profile-team">{member.team} Team</p>

              <div className="profile-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{member.location}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{member.timezone}</span>
                </div>
                <div className="meta-item">
                  <Briefcase size={16} />
                  <span>Since {member.startDate}</span>
                </div>
              </div>

              <div className="profile-actions">
                <button className="action-button primary" onClick={handleSlackMessage}>
                  <MessageCircle size={20} />
                  <span>Send Slack Message</span>
                </button>
                <button className="action-button secondary" onClick={handleScheduleMeeting}>
                  <Calendar size={20} />
                  <span>Schedule Catch-up</span>
                </button>
                <button className="action-button secondary" onClick={handleEmail}>
                  <Mail size={20} />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>About {member.name.split(' ')[0]}</h2>
            <p className="bio-text">{member.bio}</p>
          </div>

          <div className="profile-section">
            <h2>
              <Heart size={20} />
              Interests & Hobbies
            </h2>
            <div className="interests-grid">
              {member.interests.map((interest: string, index: number) => (
                <div key={index} className="interest-tag">
                  {interest}
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>
              <Award size={20} />
              Skills & Expertise
            </h2>
            <div className="skills-container">
              <div className="skills-column">
                <h3>Core Skills</h3>
                <div className="skills-list">
                  {member.skills.map((skill: string, index: number) => (
                    <span key={index} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skills-column">
                <h3>Areas of Expertise</h3>
                <div className="skills-list">
                  {member.expertise.map((exp: string, index: number) => (
                    <span key={index} className="skill-badge expertise">{exp}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Recent Projects</h2>
            <div className="projects-list">
              {member.recentProjects.map((project: any, index: number) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                  </div>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>
              <Coffee size={20} />
              Fun Facts
            </h2>
            <ul className="fun-facts-list">
              {member.funFacts.map((fact: string, index: number) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="sidebar-card">
            <h3>Contact Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MessageCircle size={18} />
                <div>
                  <span className="contact-label">Slack</span>
                  <span className="contact-value">{member.slackId}</span>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{member.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Availability</h3>
            <div className="availability-info">
              <Clock size={20} className="availability-icon" />
              <p>{member.availability}</p>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Best Way to Reach</h3>
            <p className="communication-pref">{member.preferredCommunication}</p>
          </div>

          <div className="sidebar-card tips-card">
            <h3>💡 Tips for Working Together</h3>
            <ul className="tips-list">
              <li>Check their Slack status before messaging</li>
              <li>Respect their timezone and working hours</li>
              <li>Schedule meetings in advance when possible</li>
              <li>Use their preferred communication channels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamProfile;
