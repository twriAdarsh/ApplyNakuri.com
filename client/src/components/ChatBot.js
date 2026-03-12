import React, { useState, useRef, useEffect } from 'react';
import 'boxicons';

const qnaData = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    question: 'Hello / Hi',
    answer: 'Hello! 👋 Welcome to ApplyNaukri ATS. How can I help you today? You can ask about job postings, applications, roles, or how to use the platform.'
  },
  {
    keywords: ['post job', 'create job', 'add job', 'new job posting'],
    question: 'How do I post a job?',
    answer: 'To post a job:\n1. Log in as an **Employer**\n2. Click **"Post Job"** in the navigation bar\n3. Fill in the Job Title, Employment Type, Location, Salary, and Description\n4. Optionally add candidate screening questions\n5. Click **"Create Job Post"**'
  },
  {
    keywords: ['apply', 'application', 'apply for job', 'submit application'],
    question: 'How do I apply for a job?',
    answer: 'To apply for a job:\n1. Log in as a **Candidate**\n2. Go to **"All Jobs"** from the navigation\n3. Click on a job to view its details\n4. Click **"Apply"** and fill out the application form\n5. Submit your application!'
  },
  {
    keywords: ['login', 'sign in', 'log in', 'access account'],
    question: 'How do I log in?',
    answer: 'Click the **"Login"** button on the top-right of the page. Enter your registered email and password. If you don\'t have an account yet, click **"Sign Up"** to create one.'
  },
  {
    keywords: ['register', 'sign up', 'create account', 'new account'],
    question: 'How do I create an account?',
    answer: 'Click **"Sign Up"** on the top-right corner. Fill in your name, email, password, and select your role (Candidate, Employer, Coordinator, or Recruiter). Then click Register.'
  },
  {
    keywords: ['role', 'roles', 'user types', 'employer', 'candidate', 'coordinator', 'recruiter'],
    question: 'What are the different user roles?',
    answer: 'There are 4 roles in this system:\n• **Employer** — Posts jobs, manages listings, views candidates\n• **Candidate** — Browses and applies for jobs\n• **Coordinator** — Reviews applications, assigns recruiters\n• **Recruiter** — Reviews assigned candidates, manages hiring pipeline'
  },
  {
    keywords: ['delete job', 'remove job', 'delete posting'],
    question: 'How do I delete a job posting?',
    answer: 'As an Employer, go to the **Dashboard (All Jobs)** page. Find the job you want to remove, and click the **trash icon** (🗑️) next to it. The job will be permanently deleted.'
  },
  {
    keywords: ['edit job', 'update job', 'modify job', 'change job'],
    question: 'How do I edit/update a job?',
    answer: 'As an Employer, go to the **Dashboard** page. Click the **edit icon** (✏️) next to the job you want to update. Modify the fields and click **"Update Job Post"**.'
  },
  {
    keywords: ['shortlist', 'shortlisted', 'selected candidates'],
    question: 'How do I view shortlisted candidates?',
    answer: 'Navigate to **"Candidates"** from the navigation bar. You\'ll see a list of all shortlisted candidates with their details. Click on a candidate to view their full profile.'
  },
  {
    keywords: ['dashboard', 'my dashboard', 'overview'],
    question: 'What can I see on my Dashboard?',
    answer: 'Your Dashboard depends on your role:\n• **Employer** — View all your posted jobs with edit/delete options\n• **Candidate** — Track your applied jobs and status\n• **Coordinator** — Review pending applications and assign recruiters\n• **Recruiter** — View assigned candidates for review'
  },
  {
    keywords: ['salary', 'pay', 'compensation', 'lpa'],
    question: 'How is salary displayed?',
    answer: 'Salaries are displayed in **LPA (Lakhs Per Annum)**. When posting a job, enter the expected salary as a number (e.g., "20" for 20 LPA).'
  },
  {
    keywords: ['contact', 'support', 'help', 'assistance'],
    question: 'How do I get support?',
    answer: 'For any issues or queries, you can:\n• Use this chatbot for quick answers\n• Email us at **support@applynaukri.com**\n• Visit our website for more resources'
  },
  {
    keywords: ['status', 'application status', 'track', 'my jobs'],
    question: 'How do I track my application status?',
    answer: 'As a Candidate, go to **"Dashboard"** (My Jobs). You\'ll see all jobs you\'ve applied for along with their current status — Pending, Reviewed, Shortlisted, or Rejected.'
  },
  {
    keywords: ['assign recruiter', 'recruiter assignment'],
    question: 'How does recruiter assignment work?',
    answer: 'As a **Coordinator**, go to your Dashboard and review applications. For each application, you can click **"Assign Recruiter"** to assign a recruiter who will handle the candidate\'s hiring process.'
  }
];

function findAnswer(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  if (!msg) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const item of qnaData) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (msg.includes(keyword)) {
        score += keyword.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch) {
    return bestMatch.answer;
  }

  return "I'm sorry, I didn't quite understand that. Try asking about:\n• Posting or applying for jobs\n• User roles (Employer, Candidate, Coordinator, Recruiter)\n• Dashboard features\n• Account login/signup\n• Application tracking";
}

const suggestedQuestions = [
  'How do I post a job?',
  'How do I apply for a job?',
  'What are the user roles?',
  'How do I track my application?',
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 I\'m the ApplyNaukri Assistant. Ask me anything about the platform!' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    const newMessages = [...messages, { from: 'user', text: userMsg }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const botReply = findAnswer(userMsg);
      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='chatbot-toggle'
        aria-label='Toggle chatbot'
      >
        {isOpen ? (
          <box-icon name='x' color='white' size='28px'></box-icon>
        ) : (
          <box-icon name='chat' type='solid' color='white' size='28px'></box-icon>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className='chatbot-window'>
          {/* Header */}
          <div className='chatbot-header'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'>
                <box-icon name='bot' color='white' size='20px'></box-icon>
              </div>
              <div>
                <h3 className='font-bold text-sm'>ApplyNaukri Assistant</h3>
                <span className='text-xs opacity-80'>Always online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className='hover:bg-white/10 rounded-lg p-1 transition-colors'>
              <box-icon name='minus' color='white' size='20px'></box-icon>
            </button>
          </div>

          {/* Messages */}
          <div className='chatbot-messages'>
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.from === 'user' ? 'chatbot-msg-user' : 'chatbot-msg-bot'}`}>
                <div className={`chatbot-bubble ${msg.from === 'user' ? 'chatbot-bubble-user' : 'chatbot-bubble-bot'}`}>
                  {msg.text.split('\n').map((line, j) => (
                    <p key={j} className='text-sm leading-relaxed'>
                      {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                        part.startsWith('**') && part.endsWith('**')
                          ? <strong key={k}>{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Suggested questions after first bot message */}
            {messages.length === 1 && (
              <div className='flex flex-wrap gap-2 px-1 mt-2'>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className='chatbot-suggestion'
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className='chatbot-input-area'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Type your question...'
              className='chatbot-input'
            />
            <button
              onClick={() => handleSend()}
              className='chatbot-send-btn'
              disabled={!input.trim()}
            >
              <box-icon name='send' color='white' size='18px'></box-icon>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
