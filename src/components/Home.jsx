import React, { useState } from 'react';

const Home = ({ exams, onSelectExam }) => {
  const [category, setCategory] = useState(null);

  // Split exams based on ID logic
  // İnkılap exams: 1-27
  // Türk Dili exams: 28 and above
  const inkilapExams = exams.filter(e => e.id >= 1 && e.id <= 27);
  const turkdiliExams = exams.filter(e => e.id >= 28);

  if (!category) {
    return (
      <div className="home-container">
        <div className="glass-panel" style={{ padding: '3rem 2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h2>Ders Seçimi</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>
            Lütfen çözmek istediğiniz dersi seçin:
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setCategory('inkilap')}>
              İnkılap Tarihi
            </button>
            <button className="btn secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setCategory('turkdili')}>
              Türk Dili
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayedExams = category === 'inkilap' ? inkilapExams : turkdiliExams;
  const categoryTitle = category === 'inkilap' ? 'İnkılap Tarihi Sınavları' : 'Türk Dili Sınavları';

  return (
    <div className="home-container">
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>{categoryTitle}</h2>
          <button className="btn secondary" onClick={() => setCategory(null)}>Geri Dön</button>
        </div>
        <p className="text-muted" style={{ marginTop: '1rem' }}>
          Aşağıdaki deneme sınavlarından birini seçerek bilginizi test edebilirsiniz. 
          Sonuçlarınızı anında görebilirsiniz.
        </p>
      </div>
      
      <div className="exam-grid">
        {displayedExams.map((exam) => (
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
