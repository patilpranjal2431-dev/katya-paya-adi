/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Calculator, Compass, Grid3X3, History, Sparkles } from 'lucide-react';
import { MandalaDivider } from './components/MandalaDivider';
import { TabAskConvert } from './components/TabAskConvert';
import { TabDailyUses } from './components/TabDailyUses';
import { TabEncodeDecode } from './components/TabEncodeDecode';
import { TabHistory } from './components/TabHistory';
import { TabTheory } from './components/TabTheory';
import { TabVisualExamples } from './components/TabVisualExamples';

type TabId = 'theory' | 'examples' | 'decoder' | 'calculator' | 'history' | 'daily';

interface TabConfig {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: React.FC<{ className?: string }>;
}

const TABS: TabConfig[] = [
  { id: 'theory', label: 'Theory', shortLabel: 'Theory', icon: BookOpen },
  { id: 'examples', label: 'Visual Examples', shortLabel: 'Examples', icon: Grid3X3 },
  { id: 'decoder', label: 'Ask & Convert', shortLabel: 'Convert', icon: Sparkles },
  { id: 'calculator', label: 'Encode & Decode', shortLabel: 'Calculator', icon: Calculator },
  { id: 'history', label: 'History & Timeline', shortLabel: 'History', icon: History },
  { id: 'daily', label: 'Daily Uses', shortLabel: 'Daily Uses', icon: Compass },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('theory');

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen temple-backdrop text-[#F5E6C8] flex flex-col">
      {/* Three-Zone Top Bar */}
      <header className="border-b border-[#D4AF37]/30 bg-[#140903]/85 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => handleSelectTab('theory')}
            className="font-display text-xl sm:text-2xl text-[#F1D06B] tracking-wide whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1D06B]"
          >
            Kaṭapayādi
          </button>

          <nav
            aria-label="Primary sections"
            className="hidden lg:flex items-center gap-5 text-sm text-[#F5E6C8]/85"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-[#D4AF37] text-[#F1D06B] font-semibold'
                      : 'border-transparent hover:text-[#F1D06B] hover:border-[#D4AF37]/40'
                  }`}
                >
                  {tab.shortLabel}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => handleSelectTab('decoder')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded bg-[#D4AF37] text-[#1E0F05] hover:bg-[#F1D06B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1D06B]"
          >
            Decode Text
          </button>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* Ceremonial Title Banner */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="font-[family-name:var(--font-devanagari)] text-lg sm:text-xl text-[#D4AF37] tracking-widest">
            कटपयादि संख्या प्रणाली
          </p>
          <h1 className="text-3xl sm:text-5xl text-[#F5E6C8] leading-tight text-balance">
            The Kaṭapayādi Encoding System
          </h1>
          <p className="text-sm sm:text-base text-[#F5E6C8]/80 leading-relaxed">
            Ancient Indian alphasyllabic notation transforming numbers into Sanskrit poetry,
            astronomical constants, and musical classification.
          </p>
        </div>

        <MandalaDivider className="my-4" />

        {/* Central Carved Temple Stone Panel with Responsive Tabbed Interface */}
        <div className="carved-panel rounded-xl overflow-hidden">
          {/* Responsive 6-Tab Bar */}
          <div
            role="tablist"
            aria-label="Kaṭapayādi Learning Modules"
            className="flex flex-col sm:flex-row sm:overflow-x-auto border-b-2 border-[#D4AF37]/45 bg-[#140903]/90"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex items-center justify-start sm:justify-center gap-2 px-4 py-3.5 text-sm transition-colors whitespace-nowrap shrink-0 flex-1 border-b sm:border-b-0 sm:border-r border-[#D4AF37]/20 last:border-b-0 last:border-r-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F1D06B] ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#1E0F05] font-semibold'
                      : 'text-[#F5E6C8]/85 hover:bg-[#D4AF37]/12 hover:text-[#F1D06B]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Viewport */}
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            key={activeTab}
            className="p-5 sm:p-8 lg:p-10"
          >
            {activeTab === 'theory' && <TabTheory onNavigateTab={handleSelectTab} />}
            {activeTab === 'examples' && <TabVisualExamples />}
            {activeTab === 'decoder' && <TabAskConvert />}
            {activeTab === 'calculator' && <TabEncodeDecode />}
            {activeTab === 'history' && <TabHistory />}
            {activeTab === 'daily' && <TabDailyUses />}
          </div>
        </div>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#D4AF37]/25 bg-[#120702]/90 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5E6C8]/65">
          <p>
            Kaṭapayādi Encoding System · Educational Archive of Classical Indian Alphanumeric Notation
          </p>
          <p className="font-[family-name:var(--font-devanagari)] text-[#D4AF37]/85">
            अङ्कानां वामतो गतिः
          </p>
        </div>
      </footer>
    </div>
  );
}
