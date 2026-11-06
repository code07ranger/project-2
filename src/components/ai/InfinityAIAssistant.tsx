import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BotMessageSquare,
  Sparkles,
  X,
  SendHorizontal,
  BrainCircuit,
  User,
  ExternalLink,
  ChevronRight,
  Zap,
  CalendarDays,
  Ticket,
  HelpCircle,
  Award,
  RefreshCw,
} from 'lucide-react';
import BorderBeam from '../motion/BorderBeam';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import type { Event } from '../../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  source?: string;
  timestamp: string;
}

interface KnowledgePattern {
  id: string;
  patterns: RegExp[];
  answer: string | ((events: Event[]) => string);
  source: string;
}

const KNOWLEDGE_BASE: KnowledgePattern[] = [
  // Greetings & Identity
  {
    id: 'greetings',
    patterns: [
      /\b(hi|hello|hey|hola|greetings|good\s*(morning|afternoon|evening)|who are you|what can you do|help)\b/i,
    ],
    answer:
      'Hello! I am Infinity AI, the official student intelligence assistant for **Infinity – The Tech Society of SGGSCC, University of Delhi**. Grounded strictly in college records and verified annual reports.\n\nI can answer questions regarding:\n• Verified society milestones & annual reports (Graphista, WAGMI/Mudrex, CBDC)\n• The 5 technical pillars (AI, Cyber, Web3, Creative Tech, Gaming)\n• Upcoming workshops, hackathons & agendas\n• Digital event passes & verified certificate generation\n• Core team recruitment & membership guidelines\n\nWhat would you like to explore?',
    source: 'Verified SGGSCC Knowledge Base',
  },

  // About Infinity & SGGSCC
  {
    id: 'about',
    patterns: [
      /\b(what is infinity|about infinity|who created|sggscc|where is|college|history|background|founded|institution|pitampura|delhi university|du)\b/i,
    ],
    answer:
      '**Infinity** is the official student-led academic technology society of **Sri Guru Gobind Singh College of Commerce (SGGSCC)**, University of Delhi, located in Pitampura, New Delhi.\n\nGuided by our working motto *"Beyond Limits. Beyond Technology."*, we operate under the Department of Computer Science. The society is dedicated to practical engineering, digital literacy, UI/UX systems, competitive gaming, and emerging tech innovation outside the traditional classroom curriculum.',
    source: 'Official SGGSCC Academic Society Charter',
  },

  // Verified Annual Report Milestones
  {
    id: 'milestones',
    patterns: [
      /\b(milestone|achievement|graphista|report|annual report|2023|record|numbers|stats|history|accomplishment)\b/i,
    ],
    answer:
      'According to the **Official SGGSCC Annual Report (2023–24)**, Infinity achieved the following landmark milestones:\n\n1. **Graphista (National Creative Design Competition)**: Over 400+ registrations representing 50+ colleges across India.\n2. **Web3.0 & Decentralized Tech Workshop**: Masterclass conducted in partnership with industry leader WAGMI (Mudrex).\n3. **National Webinar on Digital Economy**: 100+ active attendees analyzing India’s fintech stack and the Central Bank Digital Currency (Digital Rupee).\n4. **Data Privacy & Cybersecurity Drive**: Campus-wide CTF drills and security awareness quizzes.\n5. **Monthly AI Tools Series**: Hands-on workshops on generative AI, prompt engineering, and annual TechTonics fest competitions.',
    source: 'SGGSCC Annual Report 2023–24 (Verified College Archives)',
  },

  // Dynamic Events Query
  {
    id: 'events',
    patterns: [
      /\b(event|workshop|hackathon|seminar|session|upcoming|schedule|calendar|fest|techtonics|when is|next event)\b/i,
    ],
    answer: (events: Event[]) => {
      const published = events.filter((e) => e.status === 'published');
      if (published.length === 0) {
        return 'There are currently no scheduled events in the active registry. Check back soon or follow @infinity.sggscc for updates!';
      }
      const list = published
        .map(
          (e) =>
            `• **${e.title}**\n  📅 ${new Date(e.startAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} | 📍 ${e.venue} (${e.mode.toUpperCase()})\n  ${e.capacity ? `Seats: ${e.registrationCount}/${e.capacity} booked` : 'Open Capacity'}`
        )
        .join('\n\n');
      return `Here are the active society events currently open for registration:\n\n${list}\n\nYou can view details and secure your instant QR pass directly on the **Events** page.`;
    },
    source: 'Live Infinity Society Event Registry',
  },

  // AI & Emerging Tech Track
  {
    id: 'ai-domain',
    patterns: [
      /\b(ai|artificial intelligence|machine learning|ml|deep learning|llm|neural|pytorch|langchain|rag|computer vision)\b/i,
    ],
    answer:
      '**Pillar 1: AI & Emerging Technology**\nFocuses on practical machine learning, deep learning, Large Language Models (LLMs), retrieval-augmented generation (RAG), and computer vision pipelines.\n\n• **Core Stack**: Python, PyTorch, Hugging Face, LangChain, FastAPI, ONNX.\n• **Signature Initiatives**: Monthly AI Tools for Students, Neural Frontiers Hands-on Workshop, Cognition AI Hackathon.\n• **Philosophy**: Moving students from prompt consumers to production model builders.',
    source: 'Infinity Curriculum: AI & Emerging Tech',
  },

  // Cybersecurity Track
  {
    id: 'cyber-domain',
    patterns: [
      /\b(cyber|cybersecurity|security|ctf|wireshark|burp|hack|ethical hacking|forensics|privacy|hygiene)\b/i,
    ],
    answer:
      '**Pillar 2: Cybersecurity & Digital Awareness**\nFocuses on ethical hacking, defensive hardening, network packet inspection, and digital privacy awareness.\n\n• **Core Stack**: Wireshark, Burp Suite, Kali Linux, Metasploit, Cryptography.\n• **Signature Initiatives**: CyberShield Awareness Week, Campus Digital Privacy Quizzes, Inter-College CTF Tournaments.\n• **Mission**: Instilling responsible digital hygiene and offensive/defensive competencies.',
    source: 'Infinity Curriculum: Cybersecurity',
  },

  // Design Track
  {
    id: 'design-domain',
    patterns: [
      /\b(design|creative|ui|ux|figma|framer|illustrator|graphic|visual|graphista contest)\b/i,
    ],
    answer:
      '**Pillar 3: Design & Creative Technology**\nBridges design intuition with engineering systems. We champion design thinking, design systems in Figma, motion design, and product psychology.\n\n• **Core Stack**: Figma, Framer, Adobe Illustrator, After Effects, Spline 3D.\n• **Signature Initiatives**: Graphista National Design Contest (400+ entries across 50+ colleges), PixelCraft Design Sprint, Pass The Pixel speed challenge.',
    source: 'Infinity Curriculum: Design & Creative Tech',
  },

  // Gaming Track
  {
    id: 'gaming-domain',
    patterns: [
      /\b(game|gaming|esports|bgmi|tournament|code colosseum|competitive programming|speed coding)\b/i,
    ],
    answer:
      '**Pillar 4: Gaming & Competitions**\nFosters squad coordination, tactical teamwork, and high-speed algorithmic agility through esports leagues and competitive programming.\n\n• **Core Stack**: C++, Python, Unity Engine, Discord API, HackerRank.\n• **Signature Initiatives**: BGMI Arena Showdown 2.0, Code Colosseum 5-Hour Speed Contest, TechTonics Esports Tournaments.',
    source: 'Infinity Curriculum: Gaming & Competitions',
  },

  // Web3 Track
  {
    id: 'web3-domain',
    patterns: [
      /\b(web3|crypto|blockchain|solidity|ethereum|smart contract|cbdc|digital rupee|fintech|mudrex|wagmi|defi)\b/i,
    ],
    answer:
      '**Pillar 5: Web3 & Digital Economy**\nExplores decentralized architectures, smart contracts, decentralized finance (DeFi), and India’s fintech stack (UPI, CBDC Digital Rupee).\n\n• **Core Stack**: Solidity, Ethereum/EVM, Hardhat, Ethers.js, Web3.js.\n• **Signature Initiatives**: Web3.0 Masterclass with Mudrex (WAGMI), National Webinar on Digital Rupee & Fintech, DeFi Decoded Sessions.',
    source: 'Infinity Curriculum: Web3 & Digital Economy',
  },

  // 5 Domains Overview
  {
    id: 'domains-overview',
    patterns: [
      /\b(domains|pillars|tracks|what tracks|what domains|specializations)\b/i,
    ],
    answer:
      'Infinity operates across **5 specialized technical pillars**:\n\n1. **AI & Emerging Tech** (LLMs, PyTorch, RAG, Vision)\n2. **Cybersecurity & Awareness** (CTFs, Wireshark, Digital Hygiene)\n3. **Design & Creative Tech** (UI/UX, Figma Systems, Graphista)\n4. **Gaming & Competitions** (Esports, Code Colosseum, Unity)\n5. **Web3 & Digital Economy** (Solidity, CBDC, Mudrex WAGMI)\n\nExplore interactive syllabi and roadmaps on our **Explore** page!',
    source: 'Infinity 5-Pillar Architecture',
  },

  // Registration & Passes
  {
    id: 'registration',
    patterns: [
      /\b(register|registration|ticket|pass|qr|cost|price|free|fee|complimentary|how to register)\b/i,
    ],
    answer:
      'All workshops, hackathons, and technical bootcamps organized by Infinity are **100% complimentary** for students.\n\n**How to Register**:\n1. Open any event on the **Events** page.\n2. Submit your name, email, and college details in the registration panel.\n3. Receive your instant digital **Event Pass** equipped with a scannable QR code, unique Pass ID, and `.ics` calendar sync for Apple/Google Calendar.\n4. Access all your registered passes anytime in your **Student Dashboard**.',
    source: 'Infinity Event Operations & Ticketing',
  },

  // Certificates & Attendance
  {
    id: 'certificates',
    patterns: [
      /\b(certificate|cert|attendance|present|download certificate|verify|accreditation)\b/i,
    ],
    answer:
      'Participation certificates are digitally verified!\n\n• **Attendance**: When you attend an in-person or online workshop, the society administration checks you in on the console, marking your status as **Present**.\n• **Issuance**: Once marked Present, your officially formatted Certificate of Participation unlocks immediately in your **Student Dashboard**.\n• **Verification**: Each certificate includes a unique verification hash matching SGGSCC records and can be downloaded or printed in 1 click.',
    source: 'Accreditation & Certificate Issuance System',
  },

  // Recruitment / Joining
  {
    id: 'recruitment',
    patterns: [
      /\b(join|recruitment|recruit|apply|interview|membership|member|eligibility|first year|selection|how to join)\b/i,
    ],
    answer:
      'Undergraduate students from all departments and years at SGGSCC are eligible to join Infinity! No prior software engineering experience is required.\n\n**The 4-Step Recruitment Process**:\n1. **Online Application**: Submit your candidate statement on our **Join** page.\n2. **Domain Skill Sprint**: Complete a practical starter challenge in your chosen track (Code, Design, Cyber, Gaming, or Content/Logistics).\n3. **Council Interview**: A friendly conversation with the society council leads to assess passion and teamwork.\n4. **Squad Induction**: Official onboarding into an active technical squad.\n\nAnnouncements are posted annually via Instagram (@infinity.sggscc) and SGGSCC notice boards.',
    source: 'Recruitment Regulations & Onboarding',
  },

  // Council / Leadership
  {
    id: 'council',
    patterns: [
      /\b(president|vice president|vp|council|lead|leads|faculty|convenor|who runs|team structure)\b/i,
    ],
    answer:
      'Infinity operates under the academic guidance of the **Department of Computer Science faculty convenor** at SGGSCC.\n\n**Student Representative Council Structure**:\n• **President**: Strategy, institutional relations, and academic alignment.\n• **Vice President**: Operations, outreach, and member experience.\n• **Technical Lead**: Open-source repositories and code bootcamps.\n• **Design Lead**: Visual identity and UI/UX design systems.\n• **Cybersecurity Lead**: CTF squad and security research.\n• **Events & Logistics Lead**: Venue management and hackathon operations.',
    source: 'SGGSCC Infinity Council Charter',
  },

  // Contact & Socials
  {
    id: 'contact',
    patterns: [
      /\b(contact|instagram|linkedin|email|social|page|handle|reach out|where are you)\b/i,
    ],
    answer:
      'Connect with Infinity across our official channels:\n\n• **Instagram**: [@infinity.sggscc](https://www.instagram.com/infinity.sggscc/)\n• **LinkedIn**: [Infinity SGGSCC](https://www.linkedin.com/company/infinitysggscc/)\n• **College Portal**: [sggscc.ac.in/societies/academicsocieties/infinity](https://www.sggscc.ac.in/societies/academicsocieties/infinity)\n• **Campus Venue**: Seminar Hall / Lab 4, Sri Guru Gobind Singh College of Commerce, Pitampura, Delhi 110034.',
    source: 'Verified Society Directory',
  },
];

export const InfinityAIAssistant: React.FC = () => {
  const { events } = useEvents();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hi, I am Infinity AI Assistant. Need any assistance?',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const qClean = textToSend.trim();

      // Check knowledge patterns
      let matched = KNOWLEDGE_BASE.find((item) =>
        item.patterns.some((pattern) => pattern.test(qClean))
      );

      let responseText = '';
      let responseSource = '';

      if (matched) {
        responseText =
          typeof matched.answer === 'function' ? matched.answer(events) : matched.answer;
        responseSource = matched.source;
      } else {
        responseText =
          'I am grounded strictly in official SGGSCC archives and society records. I can provide verified details on:\n\n• **Graphista & 2023–24 Report Milestones**\n• **The 5 Technology Pillars** (AI, Cyber, Web3, Design, Gaming)\n• **Active Society Events & Agendas**\n• **Complimentary Passes & Certificate Verification**\n• **Core Team Recruitment & Joining Process**\n\nTry clicking one of the quick prompts below or ask about any of these topics!';
        responseSource = 'SGGSCC Infinity Guidelines';
      }

      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        source: responseSource,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 400);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: 'Hi, I am Infinity AI Assistant. Need any assistance?',
        timestamp: 'Just now',
      },
    ]);
  };

  const quickPrompts = [
    'What are Infinity\'s verified milestones?',
    'Show upcoming society events',
    'Explain the 5 core domains',
    'How do I register for events?',
    'How does recruitment work?',
  ];

  return (
    <>
      {/* Floating Toggle Button with Neo-Brutalist Palette & Purple-to-Cyan Aura */}
      <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex items-center justify-center w-12 h-12 rounded-full font-heading font-black select-none cursor-pointer transition-all border-2 border-neo-border dark:border-neo-dark-border bg-neo-yellow text-neo-border shadow-neo hover:shadow-neo-lg dark:bg-neo-dark-card dark:text-neo-yellow dark:shadow-neo-dark group"
          aria-label={isOpen ? 'Close Assistant' : 'Infinity AI'}
          title={isOpen ? 'Close Assistant' : 'Infinity AI Assistant'}
        >
          {/* Subtle Ambient Purple-to-Cyan Glow */}
          <div
            className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none -z-10"
            style={{
              background: 'linear-gradient(90deg, #5E33AD 0%, #388FC7 46%, #08CFE0 100%)',
            }}
          />

          {isOpen ? (
            <X className="w-5 h-5 text-neo-border dark:text-neo-yellow relative z-10" />
          ) : (
            <BotMessageSquare className="w-5 h-5 text-neo-border dark:text-neo-yellow relative z-10" />
          )}
        </motion.button>
      </div>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-[60] w-[92vw] sm:w-[420px] max-h-[580px] h-[75vh] flex flex-col bg-white dark:bg-neo-dark-card border-[3px] border-neo-border dark:border-neo-dark-border rounded-neo-xl shadow-neo-lg dark:shadow-neo-dark-lg overflow-hidden"
          >
            {/* Top illuminated hairline using user gradient */}
            <div
              className="w-full h-[3px] relative z-20 shrink-0 border-b border-neo-border"
              style={{
                background: 'linear-gradient(90deg, #5E33AD 0%, #388FC7 46%, #08CFE0 100%)',
              }}
            />

            {/* Chat Window Header */}
            <div className="p-4 bg-neo-yellow dark:bg-neo-dark-bg border-b-2 border-neo-border dark:border-neo-dark-border flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-neo-sm bg-white dark:bg-neo-dark-card border-2 border-neo-border dark:border-neo-dark-border flex items-center justify-center text-neo-border dark:text-neo-yellow shadow-neo-sm">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-neo-border dark:text-neo-dark-text">
                    Infinity AI Assistant
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-neo-sm bg-white/80 hover:bg-white dark:bg-neo-dark-card dark:hover:bg-neo-dark-bg border border-neo-border dark:border-neo-dark-border text-neo-border dark:text-neo-dark-text shadow-neo-sm transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-1.5 rounded-neo-sm bg-white/80 hover:bg-neo-pink hover:text-white dark:bg-neo-dark-card dark:hover:bg-neo-pink border border-neo-border dark:border-neo-dark-border text-neo-border dark:text-neo-dark-text shadow-neo-sm transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-body scrollbar-thin bg-neo-bg/60 dark:bg-neo-dark-bg/60 relative z-10">
              {messages.map((m) => {
                const isAi = m.sender === 'ai';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-neo-md whitespace-pre-line leading-relaxed border-2 border-neo-border dark:border-neo-dark-border shadow-neo-sm ${
                        isAi
                          ? 'bg-white dark:bg-neo-dark-card text-neo-text dark:text-neo-dark-text rounded-tl-none'
                          : 'bg-neo-blue text-neo-border font-semibold rounded-tr-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-neo-md bg-white dark:bg-neo-dark-card border-2 border-neo-border dark:border-neo-dark-border shadow-neo-sm max-w-xs">
                  <span className="w-2 h-2 rounded-full bg-neo-yellow border border-neo-border animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-neo-blue border border-neo-border animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-neo-pink border border-neo-border animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Chips */}
            <div className="px-3 py-2 border-t-2 border-neo-border dark:border-neo-dark-border bg-white dark:bg-neo-dark-card flex items-center gap-1.5 overflow-x-auto scrollbar-none relative z-10 shrink-0">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(qp)}
                  className="px-2.5 py-1 rounded-neo-sm bg-neo-bg dark:bg-neo-dark-bg border border-neo-border dark:border-neo-dark-border text-[11px] font-mono font-bold text-neo-text dark:text-neo-dark-text hover:bg-neo-yellow hover:text-neo-border shadow-neo-sm whitespace-nowrap transition-all cursor-pointer"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-neo-dark-card border-t-2 border-neo-border dark:border-neo-dark-border flex items-center gap-2 relative z-10 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about events, domains, verified records…"
                className="flex-1 bg-neo-bg dark:bg-neo-dark-bg border-2 border-neo-border dark:border-neo-dark-border rounded-neo-md px-3.5 py-2 text-xs font-mono font-medium text-neo-text dark:text-neo-dark-text placeholder:text-neo-text/50 focus:outline-none focus:ring-2 focus:ring-neo-yellow shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-neo-md bg-neo-yellow hover:bg-yellow-300 text-neo-border border-2 border-neo-border shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all font-black cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <SendHorizontal className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InfinityAIAssistant;
