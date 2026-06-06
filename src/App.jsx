import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Exam from './components/Exam';
import Result from './components/Result';
import questionsData from './questions.json';

function App() {
  const [theme, setTheme] = useState('dark');
  const [view, setView] = useState('home'); // 'home', 'exam', 'result'
  const [selectedExam, setSelectedExam] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const startExam = (examId) => {
    const exam = questionsData.find(e => e.id === examId);
    setSelectedExam(exam);
    setUserAnswers({});
    setView('exam');
  };

  const finishExam = (answers) => {
    setUserAnswers(answers);
    
    // Calculate score
    let correct = 0;
    let incorrect = 0;
    
    selectedExam.questions.forEach(q => {
      if (answers[q.id] === q.answer) {
        correct++;
      } else if (answers[q.id]) {
        incorrect++;
      }
    });
    
    setScore({ correct, incorrect });
    setView('result');
  };

  const goHome = () => {
    setSelectedExam(null);
    setView('home');
  };

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="app-container">
        <header>
          <h1>İnkılap Tarihi ve Türk Dili Sınavları</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Aydınlık' : '🌙 Karanlık'}
          </button>
        </header>
        
        <main>
          {view === 'home' && (
            <Home exams={questionsData} onSelectExam={startExam} />
          )}
          
          {view === 'exam' && selectedExam && (
            <Exam 
              exam={selectedExam} 
              onFinish={finishExam} 
              onCancel={goHome} 
            />
          )}
          
          {view === 'result' && selectedExam && (
            <Result 
              exam={selectedExam} 
              answers={userAnswers} 
              score={score} 
              onHome={goHome} 
            />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
