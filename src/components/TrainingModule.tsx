import { useState } from 'react';
import { ArrowLeft, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import './TrainingModule.css';

interface TrainingModuleProps {
  module: any;
  onBack: () => void;
}

function TrainingModule({ module, onBack }: TrainingModuleProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completedSlides, setCompletedSlides] = useState(new Set<number>());

  const handleNext = () => {
    setCompletedSlides(prev => new Set([...prev, currentSlide]));
    if (currentSlide < module.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
  };

  const currentContent = module.slides[currentSlide];
  const progress = ((completedSlides.size / module.slides.length) * 100).toFixed(0);

  return (
    <div className="training-module">
      <div className="training-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Learning</span>
        </button>
        <div className="training-progress">
          <div className="progress-info">
            <span className="progress-text">{progress}% Complete</span>
            <span className="slide-count">{currentSlide + 1} / {module.slides.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="training-container">
        <div className="training-sidebar">
          <div className="module-info">
            <h3>{module.icon} {module.title}</h3>
            <p className="module-duration">{module.duration}</p>
          </div>

          <div className="slides-nav">
            <h4>Contents</h4>
            {module.slides.map((slide: any, index: number) => (
              <button
                key={index}
                className={`slide-nav-item ${currentSlide === index ? 'active' : ''} ${completedSlides.has(index) ? 'completed' : ''}`}
                onClick={() => handleSlideClick(index)}
              >
                <div className="slide-status">
                  {completedSlides.has(index) ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Circle size={16} />
                  )}
                </div>
                <span>{slide.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="training-content">
          <div className="content-header">
            <h1>{currentContent.title}</h1>
            {currentContent.subtitle && <p className="subtitle">{currentContent.subtitle}</p>}
          </div>

          <div className="content-body">
            {currentContent.content.map((section: any, index: number) => (
              <div key={index} className="content-section">
                {section.type === 'text' && <p>{section.text}</p>}

                {section.type === 'heading' && <h3>{section.text}</h3>}

                {section.type === 'list' && (
                  <ul className="content-list">
                    {section.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.type === 'highlight' && (
                  <div className="highlight-box">
                    <div className="highlight-icon">{section.icon}</div>
                    <div>
                      <h4>{section.title}</h4>
                      <p>{section.text}</p>
                    </div>
                  </div>
                )}

                {section.type === 'card-grid' && (
                  <div className="card-grid">
                    {section.cards.map((card: any, i: number) => (
                      <div key={i} className="info-card">
                        <div className="card-icon">{card.icon}</div>
                        <h4>{card.title}</h4>
                        <p>{card.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === 'quote' && (
                  <blockquote className="quote-box">
                    <p>"{section.text}"</p>
                    {section.author && <cite>- {section.author}</cite>}
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          <div className="content-footer">
            <button
              className="nav-button secondary"
              onClick={handlePrevious}
              disabled={currentSlide === 0}
            >
              Previous
            </button>
            <button
              className="nav-button primary"
              onClick={handleNext}
            >
              {currentSlide === module.slides.length - 1 ? 'Complete Module' : 'Next'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingModule;
