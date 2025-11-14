import React, { useState } from 'react';

interface Question {
  id: number;
  category: string;
  title: string;
  body: string;
}

interface Props {
  selectedCategory: string | null;
}

const premadeQuestions: Question[] = [
  {
    id: 1,
    category: 'CSS',
    title: 'How to center a div?',
    body: 'Ive tried margin: auto and Flexbox, but its not working on mobile. Whats the best approach?',
  },
  {
    id: 2,
    category: 'HTML',
    title: 'What does the <section> tag do?',
    body: 'How is it different from <div> and when should I use it?',
  },
  {
    id: 3,
    category: 'JavaScript',
    title: 'What are for loops?',
    body: 'Can someone explain wehat for loops are?',
  },
  {
    id: 4,
    category: 'CSS',
    title: 'Whats the difference between em and rem?',
    body: 'Im confused about when to use em vs rem for font sizing.',

  },
];

const PremadeQuestions: React.FC<Props> = ({ selectedCategory }) => {
  const [answers, setAnswers] = useState<{ [id: number]: string }>({});

  const filtered = premadeQuestions.filter(
    (q) => q.category.toLowerCase() === selectedCategory?.toLowerCase()
  );

  if (!selectedCategory) {
    return <p className="text-muted">Choose a category to view questions.</p>;
  }

  if (filtered.length === 0) {
    return <p>No premade questions for <strong>{selectedCategory}</strong>.</p>;
  }

  return (
    <div>
      <h5>Questions for {selectedCategory}</h5>
      {filtered.map((q) => (
        <div key={q.id} className="card mb-3">
          <div className="card-body">
            <h6 className="card-title">{q.title}</h6>
            <p className="card-text">{q.body}</p>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Type your answer here..."
              value={answers[q.id] || ''}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
              }
            />
            <button>Submit Response</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremadeQuestions;