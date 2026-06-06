import React from 'react';

const Result = ({ exam, answers, score, onHome }) => {
  const totalQuestions = exam.questions.length;
  const percentage = Math.round((score.correct / totalQuestions) * 100);
  const empty = totalQuestions - (score.correct + score.incorrect);

  return (
    <div className="result-container">
      <div className="glass-panel" style={{ padding: '3rem 2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>{exam.title} - Sonuçlar</h2>
        
        <div className="score-circle" style={{ '--score-pct': percentage }}>
          <div className="score-text">{percentage}</div>
        </div>
        
        <div className="result-stats">
          <div className="stat-item">
            <span className="stat-value stat-correct">{score.correct}</span>
            <span className="stat-label">Doğru</span>
          </div>
          <div className="stat-item">
            <span className="stat-value stat-incorrect">{score.incorrect}</span>
            <span className="stat-label">Yanlış</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--text-muted)' }}>{empty}</span>
            <span className="stat-label">Boş</span>
          </div>
        </div>
        
        <button className="btn" onClick={onHome} style={{ marginTop: '1rem' }}>
          Ana Sayfaya Dön
        </button>
      </div>

      <h3 style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Detaylı Cevaplar</h3>
      
      <div className="answers-list" style={{ textAlign: 'left' }}>
        {exam.questions.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.answer;
          const isUnanswered = !userAnswer;
          
          let borderColor = 'var(--surface-border)';
          if (isCorrect) borderColor = 'var(--success)';
          else if (!isUnanswered) borderColor = 'var(--error)';
          
          return (
            <div key={q.id} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem', borderLeft: `4px solid ${borderColor}` }}>
              <p style={{ fontWeight: 600, marginBottom: '1rem' }}>{q.id}. {q.text}</p>
              
              <div className="options-grid">
                {Object.entries(q.options).map(([key, text]) => {
                  const isUserSelection = userAnswer === key;
                  const isCorrectAnswer = q.answer === key;
                  
                  let className = 'option-btn';
                  if (isCorrectAnswer) className += ' correct';
                  else if (isUserSelection && !isCorrectAnswer) className += ' incorrect';
                  
                  return (
                    <div key={key} className={className} style={{ padding: '0.75rem', pointerEvents: 'none' }}>
                      <span className="option-letter" style={{ width: '24px', height: '24px', fontSize: '0.8rem', marginRight: '0.75rem' }}>{key}</span>
                      <span className="option-text" style={{ fontSize: '0.9rem' }}>{text}</span>
                    </div>
                  );
                })}
              </div>
              
              {isUnanswered && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                  Boş bıraktınız. Doğru cevap: <strong style={{ color: 'var(--success)' }}>{q.answer}</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;
