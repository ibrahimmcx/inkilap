import React from 'react';

const Home = ({ exams, onSelectExam }) => {
  return (
    <div className="home-container">
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2>Deneme Sınavları</h2>
        <p className="text-muted">
          Aşağıdaki deneme sınavlarından birini seçerek İnkılap Tarihi ve Türk Dili konularındaki bilginizi test edebilirsiniz. 
          Sonuçlarınızı anında görebilirsiniz.
        </p>
      </div>
      
      <div className="exam-grid">
        {exams.map((exam) => (
          <div 
            key={exam.id} 
            className="glass-panel exam-card"
            onClick={() => onSelectExam(exam.id)}
          >
            <h3>{exam.title}</h3>
            <p>{exam.questions.length} Soru</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
