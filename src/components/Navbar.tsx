import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { useProgress } from '../context/ProgressContext';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Trophy,
  Volume2,
  VolumeX,
  Menu,
  X,
  PenTool,
  BrainCircuit,
  Target,
  Home,
  CheckCircle2,
  Gamepad2,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { progress, toggleSound } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'home', label: 'Home', icon: Home },
    { tab: 'learn', label: 'Learn Words', icon: BookOpen },
    { tab: 'context', label: 'In Context', icon: Target },
    { tab: 'quiz', label: 'Practice Quiz', icon: HelpCircle },
    { tab: 'sentence_builder', label: 'Sentence Builder', icon: PenTool },
    { tab: 'games', label: 'Word Games', icon: Gamepad2 },
    { tab: 'challenge', label: 'Challenge Mode', icon: BrainCircuit },
    { tab: 'progress', label: 'My Progress', icon: Trophy },
    { tab: 'instructions', label: 'Instructions', icon: HelpCircle },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <button
            id="nav-brand-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
                  Voca<span className="text-indigo-600">Play</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Grades 6–8
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Discover Words • Play &amp; Learn Vocabulary
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`nav-tab-${item.tab}`}
                  onClick={() => handleNavClick(item.tab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Learned Count, Sound Toggle, Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Word Count Pill */}
            <button
              id="nav-learned-counter-btn"
              onClick={() => handleNavClick('progress')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition cursor-pointer"
              title="Words Learned"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{progress.learnedWordIds.length}</span>
              <span className="hidden sm:inline font-medium text-emerald-600">Learned</span>
            </button>

            {/* Audio Voice / SFX Toggle */}
            <button
              id="nav-sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-sm transition cursor-pointer ${
                progress.soundEnabled
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
              title={progress.soundEnabled ? 'Mute Sounds & Pronunciations' : 'Enable Sounds & Pronunciations'}
              aria-label="Toggle Sound"
            >
              {progress.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`mobile-nav-tab-${item.tab}`}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
