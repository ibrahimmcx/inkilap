import React, { useState } from 'react';

const Exam = ({ exam, onFinish, onCancel }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = exam.questions;
  const currentQuestion = questions[currentQuestionIndex];
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionKey) => {
    if (isSubmitted) return;
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionKey
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Sınavı bitirmek istediğinize emin misiniz?')) {
      onFinish(answers);
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const selectedOption = answers[currentQuestion.id];

  return (
    <div className="exam-container">
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="exam-header">
          <h2 style={{ margin: 0 }}>{exam.title}</h2>
          <button className="btn secondary" onClick={onCancel}>İptal</button>
        </div>
        
        <div style={{ padding: '0 2rem' }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p style={{ textAlign: 'right', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Soru {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        <div className="question-container">
          <div className="question-text">
            {currentQuestion.id}. {currentQuestion.text}
          </div>
          
          <div className="options-grid">
            {Object.entries(currentQuestion.options).map(([key, text]) => (
              <div 
                key={key} 
                className={`option-btn ${selectedOption === key ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(key)}
              >
                <span className="option-letter">{key}</span>
                <span className="option-text">{text}</span>
              </div>
            ))}
          </div>
          
          <div className="exam-footer">
            <button 
              className="btn secondary" 
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
            >
              Önceki
            </button>
            
            {!isLastQuestion ? (
              <button className="btn" onClick={handleNext}>
                Sonraki Soru
              </button>
            ) : (
              <button className="btn" onClick={handleSubmit} style={{ background: 'var(--success)' }}>
                Sınavı Bitir
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
