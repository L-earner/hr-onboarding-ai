import { useState } from 'react';
import { ArrowLeft, Heart, Coffee, MessageCircle, Sparkles } from 'lucide-react';
import { teamMembers } from '../data/teamData';
import './TeamMatcher.css';

interface TeamMatcherProps {
  onBack: () => void;
}

function TeamMatcher({ onBack }: TeamMatcherProps) {
  const [currentStep, setCurrentStep] = useState('interests');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  const interestOptions = [
    { emoji: '🎨', label: 'Art & Design', keywords: ['art', 'design', 'photography', 'painting'] },
    { emoji: '🏃', label: 'Sports & Fitness', keywords: ['running', 'hiking', 'yoga', 'biking', 'basketball', 'tennis', 'surfing'] },
    { emoji: '📚', label: 'Reading & Learning', keywords: ['reading', 'books', 'learning', 'education'] },
    { emoji: '🎮', label: 'Gaming', keywords: ['games', 'gaming', 'strategy'] },
    { emoji: '🍜', label: 'Food & Cooking', keywords: ['cooking', 'cuisine', 'sushi', 'baking', 'ramen', 'restaurants'] },
    { emoji: '🎵', label: 'Music', keywords: ['music', 'guitar', 'bass'] },
    { emoji: '🧘', label: 'Wellness & Mindfulness', keywords: ['yoga', 'meditation', 'mindfulness', 'wellness'] },
    { emoji: '✈️', label: 'Travel & Exploration', keywords: ['travel', 'exploration', 'camping'] },
    { emoji: '🔬', label: 'Tech & Science', keywords: ['data', 'automation', 'astronomy', 'analytics'] },
    { emoji: '🎭', label: 'Arts & Culture', keywords: ['theater', 'films', 'galleries', 'documentary'] },
    { emoji: '🌱', label: 'Sustainability', keywords: ['sustainable', 'environment', 'plants'] },
    { emoji: '☕', label: 'Coffee & Cafes', keywords: ['coffee', 'cafe'] }
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const findMatches = () => {
    const scored = teamMembers.map(member => {
      let score = 0;

      selectedInterests.forEach(interest => {
        const matchingKeywords = interestOptions.find(opt => opt.label === interest)?.keywords || [];
        member.interests.forEach(memberInterest => {
          const lowerInterest = memberInterest.toLowerCase();
          if (matchingKeywords.some(keyword => lowerInterest.includes(keyword))) {
            score++;
          }
        });
      });

      return { ...member, matchScore: score };
    });

    const filtered = scored
      .filter(m => m.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    setMatches(filtered);
    setCurrentStep('results');
  };

  const restart = () => {
    setCurrentStep('interests');
    setSelectedInterests([]);
    setMatches([]);
  };

  if (currentStep === 'results') {
    return (
      <div className="team-matcher">
        <div className="game-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back to Games</span>
          </button>
        </div>

        <div className="matcher-results">
          <div className="results-header">
            <Sparkles size={48} className="sparkle-icon" />
            <h1>Your Matches!</h1>
            <p>We found {matches.length} teammate{matches.length !== 1 ? 's' : ''} with similar interests</p>
          </div>

          {matches.length === 0 ? (
            <div className="no-matches">
              <p>😊 No matches found with these interests.</p>
              <p>Try selecting different interests or explore the directory to meet everyone!</p>
              <button className="game-button primary" onClick={restart}>
                Try Different Interests
              </button>
            </div>
          ) : (
            <div className="matches-grid">
              {matches.map(match => (
                <div key={match.id} className="match-card">
                  <div className="match-avatar">{match.avatar}</div>
                  <div className="match-info">
                    <h3>{match.name}</h3>
                    <p className="match-role">{match.role}</p>
                    <div className="match-score">
                      <Heart size={16} />
                      <span>{match.matchScore} shared interest{match.matchScore !== 1 ? 's' : ''}</span>
                    </div>

                    <div className="shared-interests">
                      {match.interests.slice(0, 3).map((interest: string, idx: number) => (
                        <span key={idx} className="interest-tag-small">{interest}</span>
                      ))}
                    </div>

                    <div className="match-actions">
                      <button className="match-action-btn">
                        <MessageCircle size={16} />
                        <span>Message</span>
                      </button>
                      <button className="match-action-btn">
                        <Coffee size={16} />
                        <span>Coffee Chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="results-actions">
            <button className="game-button secondary" onClick={restart}>
              Find New Matches
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
    <div className="team-matcher">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Games</span>
        </button>
      </div>

      <div className="matcher-container">
        <div className="matcher-intro">
          <h1>🎯 Find Your Team Match</h1>
          <p>Select your interests and we'll match you with teammates who share similar hobbies!</p>
        </div>

        <div className="interests-selection">
          <h2>What are you interested in?</h2>
          <p className="selection-hint">Select at least one interest</p>

          <div className="interests-grid">
            {interestOptions.map(interest => (
              <button
                key={interest.label}
                className={`interest-card ${selectedInterests.includes(interest.label) ? 'selected' : ''}`}
                onClick={() => toggleInterest(interest.label)}
              >
                <span className="interest-emoji">{interest.emoji}</span>
                <span className="interest-label">{interest.label}</span>
                {selectedInterests.includes(interest.label) && (
                  <div className="selected-check">✓</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="matcher-footer">
          <p className="selected-count">
            {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
          </p>
          <button
            className="game-button primary"
            onClick={findMatches}
            disabled={selectedInterests.length === 0}
          >
            Find My Matches ✨
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamMatcher;
