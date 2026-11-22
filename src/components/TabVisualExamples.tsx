import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { DIGIT_MAPPINGS } from '../lib/katapayadi';
import { MandalaDivider } from './MandalaDivider';

interface BreakdownExample {
  id: string;
  word: string;
  iast: string;
  meaning: string;
  syllables: {
    glyph: string;
    iast: string;
    ruleDetail: string;
    keptConsonant: string;
    digit: number;
  }[];
  extracted: string;
  finalNumber: string;
}

const VISUAL_EXAMPLES: BreakdownExample[] = [
  {
    id: 'rama',
    word: 'राम',
    iast: 'rāma',
    meaning: 'Classic introductory example demonstrating vowel erasure and right-to-left reversal.',
    syllables: [
      {
        glyph: 'रा',
        iast: 'rā',
        ruleDetail: 'र + ा (long ā ignored)',
        keptConsonant: 'र (ra)',
        digit: 2,
      },
      {
        glyph: 'म',
        iast: 'ma',
        ruleDetail: 'म + अ (inherent a ignored)',
        keptConsonant: 'म (ma)',
        digit: 5,
      },
    ],
    extracted: '25',
    finalNumber: '52',
  },
  {
    id: 'krishna',
    word: 'कृष्ण',
    iast: 'kṛṣṇa',
    meaning: 'Demonstrates vocalic ṛ erasure and the conjunct rule (ष् + ण keeps only ण).',
    syllables: [
      {
        glyph: 'कृ',
        iast: 'kṛ',
        ruleDetail: 'क + ृ (vocalic ṛ ignored)',
        keptConsonant: 'क (ka)',
        digit: 1,
      },
      {
        glyph: 'ष्ण',
        iast: 'ṣṇa',
        ruleDetail: 'Conjunct ष् + ण → last consonant ण',
        keptConsonant: 'ण (ṇa)',
        digit: 5,
      },
    ],
    extracted: '15',
    finalNumber: '51',
  },
  {
    id: 'bhadra',
    word: 'भद्र',
    iast: 'bhadra',
    meaning: 'Shows a consonant cluster at the end (द् + र keeps only र = 2).',
    syllables: [
      {
        glyph: 'भ',
        iast: 'bha',
        ruleDetail: 'भ + अ (inherent a ignored)',
        keptConsonant: 'भ (bha)',
        digit: 4,
      },
      {
        glyph: 'द्र',
        iast: 'dra',
        ruleDetail: 'Conjunct द् + र → last consonant र',
        keptConsonant: 'र (ra)',
        digit: 2,
      },
    ],
    extracted: '42',
    finalNumber: '24',
  },
];

export const TabVisualExamples: React.FC = () => {
  const [activeDigit, setActiveDigit] = useState<number | null>(1);
  const [selectedExampleId, setSelectedExampleId] = useState<string>('rama');
  const [activeStep, setActiveStep] = useState<number>(4);

  const selectedExample =
    VISUAL_EXAMPLES.find((ex) => ex.id === selectedExampleId) || VISUAL_EXAMPLES[0];

  const activeMapping = DIGIT_MAPPINGS.find((m) => m.digit === activeDigit);

  return (
    <section className="animate-tab-enter space-y-8" aria-labelledby="visual-heading">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
            Interactive Reference · Varga Matrix
          </p>
          <h2 id="visual-heading" className="text-3xl sm:text-4xl text-[#F5E6C8] text-balance">
            Digit-to-Consonant Mapping Table
          </h2>
          <p className="text-sm sm:text-base text-[#F5E6C8]/80 max-w-2xl">
            Hover or tap any digit (<span className="tabular-nums text-[#F1D06B]">1–9, 0</span>) to
            illuminate its corresponding Sanskrit consonants across all four phonetic classes.
          </p>
        </div>

        {activeMapping && (
          <div className="carved-subpanel rounded-md px-4 py-3 text-sm shrink-0">
            <span className="text-[#D4AF37] font-semibold tabular-nums">
              Digit {activeMapping.digit}:
            </span>{' '}
            <span className="font-[family-name:var(--font-devanagari)] text-[#F5E6C8]">
              {activeMapping.consonants.map((c) => `${c.devanagari} (${c.iast})`).join(' · ')}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Mapping Table */}
      <div className="carved-subpanel rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#D4AF37]/40 bg-[#140903]/85 text-xs uppercase tracking-wider text-[#D4AF37]">
                <th scope="col" className="py-3.5 px-4 w-24">
                  Digit
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Ka-varga (Guttural / Palatal)
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Ṭa-varga (Retroflex / Dental)
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Pa-varga (Labial)
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Ya-varga (Semivowels & Sibilants)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/20">
              {DIGIT_MAPPINGS.map((row) => {
                const isHighlighted = activeDigit === row.digit;
                const byVarga = {
                  ka: row.consonants.find((c) => c.varga === 'Ka-varga'),
                  ta: row.consonants.find((c) => c.varga === 'Ṭa-varga'),
                  pa: row.consonants.find((c) => c.varga === 'Pa-varga'),
                  ya: row.consonants.find((c) => c.varga === 'Ya-varga'),
                };

                return (
                  <tr
                    key={row.digit}
                    onMouseEnter={() => setActiveDigit(row.digit)}
                    onFocus={() => setActiveDigit(row.digit)}
                    onClick={() => setActiveDigit(row.digit)}
                    tabIndex={0}
                    className={`transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F1D06B] ${
                      isHighlighted ? 'bg-[#D4AF37]/14' : 'hover:bg-[#D4AF37]/8'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-md font-display text-xl tabular-nums transition-transform duration-150 ${
                          isHighlighted
                            ? 'bg-[#D4AF37] text-[#1E0F05] scale-105 shadow-[0_0_18px_rgba(212,175,55,0.5)]'
                            : 'bg-[#140903] border border-[#D4AF37]/40 text-[#F1D06B]'
                        }`}
                      >
                        {row.digit}
                      </span>
                    </td>
                    {[byVarga.ka, byVarga.ta, byVarga.pa, byVarga.ya].map((cell, idx) => (
                      <td key={idx} className="py-3.5 px-4">
                        {cell ? (
                          <div
                            className={`inline-flex items-baseline gap-2.5 px-3 py-1.5 rounded border transition-all duration-150 ${
                              isHighlighted
                                ? 'border-[#F1D06B] bg-[#2a1508] -translate-y-0.5 shadow-[0_0_14px_rgba(212,175,55,0.28)]'
                                : 'border-[#D4AF37]/20 bg-[#140903]/55'
                            }`}
                          >
                            <span
                              className={`font-[family-name:var(--font-devanagari)] text-2xl transition-colors ${
                                isHighlighted ? 'text-[#F1D06B]' : 'text-[#F5E6C8]'
                              }`}
                            >
                              {cell.devanagari}
                            </span>
                            <span className="text-sm text-[#F5E6C8]/75 italic">{cell.iast}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-[#F5E6C8]/30 select-none">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-[#D4AF37]/25 bg-[#140903]/70 text-xs text-[#F5E6C8]/75 flex flex-wrap items-center justify-between gap-2">
          <span>
            Note: In South Indian and Vedic orthography, <span className="font-[family-name:var(--font-devanagari)] text-[#F1D06B]">ळ (ḷa)</span> is occasionally mapped to <span className="tabular-nums text-[#F1D06B]">9</span>.
          </span>
          <span>Hover or select any row to inspect consonant equivalences</span>
        </div>
      </div>

      <MandalaDivider />

      {/* Step-by-Step Visual Breakdown */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
              Worked Visual Walkthrough
            </p>
            <h3 className="text-2xl sm:text-3xl text-[#F5E6C8]">
              Decoding Step by Step
            </h3>
          </div>

          {/* Example Switcher */}
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-md bg-[#140903] border border-[#D4AF37]/35">
            {VISUAL_EXAMPLES.map((ex) => {
              const active = ex.id === selectedExample.id;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => {
                    setSelectedExampleId(ex.id);
                    setActiveStep(4);
                  }}
                  className={`px-3 py-1.5 text-sm rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#D4AF37] text-[#1E0F05] font-semibold'
                      : 'text-[#F5E6C8]/80 hover:text-[#F1D06B]'
                  }`}
                >
                  <span className="font-[family-name:var(--font-devanagari)]">{ex.word}</span>{' '}
                  <span className="text-xs opacity-85">({ex.iast})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Stage Card */}
        <div className="carved-subpanel rounded-lg p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-5">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-devanagari)] text-4xl sm:text-5xl text-[#F1D06B] gold-text-glow">
                  {selectedExample.word}
                </span>
                <span className="text-lg italic text-[#F5E6C8]/80">({selectedExample.iast})</span>
              </div>
              <p className="text-sm text-[#F5E6C8]/80 mt-2">{selectedExample.meaning}</p>
            </div>

            {/* Step Selector Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {[1, 2, 3, 4].map((stepNum) => (
                <button
                  key={stepNum}
                  type="button"
                  onClick={() => setActiveStep(stepNum)}
                  className={`px-3 py-1.5 text-xs rounded border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                    activeStep >= stepNum
                      ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F1D06B]'
                      : 'border-[#D4AF37]/25 text-[#F5E6C8]/55 hover:text-[#F5E6C8]'
                  }`}
                >
                  Step {stepNum}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                title="Replay steps from Step 1"
                className="p-1.5 rounded border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors cursor-pointer"
                aria-label="Replay steps from Step 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Step 1 & 2: Letters -> Extracted Consonants -> Digits */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedExample.syllables.map((syl, index) => (
                <div
                  key={index}
                  className="p-5 rounded-md border border-[#D4AF37]/35 bg-[#140903]/85 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-[#D4AF37]">
                    <span className="uppercase tracking-wider tabular-nums">
                      Syllable {index + 1}
                    </span>
                    <span className="italic">{syl.iast}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-[family-name:var(--font-devanagari)] text-4xl text-[#F5E6C8]">
                      {syl.glyph}
                    </span>

                    {activeStep >= 2 && (
                      <>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]/70 shrink-0" aria-hidden="true" />
                        <div className="text-center">
                          <span className="block font-[family-name:var(--font-devanagari)] text-2xl text-[#F1D06B]">
                            {syl.keptConsonant.split(' ')[0]}
                          </span>
                          <span className="text-[11px] text-[#F5E6C8]/65">Consonant</span>
                        </div>
                      </>
                    )}

                    {activeStep >= 3 && (
                      <>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]/70 shrink-0" aria-hidden="true" />
                        <div className="flex flex-col items-center">
                          <span className="w-11 h-11 rounded-md bg-[#D4AF37] text-[#1E0F05] font-display text-2xl flex items-center justify-center tabular-nums shadow-[0_0_16px_rgba(212,175,55,0.4)]">
                            {syl.digit}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-[#F5E6C8]/75 pt-2 border-t border-[#D4AF37]/15">
                    {syl.ruleDetail}
                  </p>
                </div>
              ))}
            </div>

            {/* Step 3 & 4: Reversal Arrow & Final Number */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-md border border-[#D4AF37]/45 bg-[#120702]/90 text-center space-y-4">
              {activeStep < 3 ? (
                <p className="text-sm text-[#F5E6C8]/70">
                  Advance to <button type="button" onClick={() => setActiveStep(3)} className="underline text-[#F1D06B] cursor-pointer">Step 3</button> to map extracted consonants to digits.
                </p>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="px-3 py-1.5 rounded border border-[#D4AF37]/30 bg-[#1E0F05]">
                      <span className="block text-[11px] uppercase tracking-wider text-[#D4AF37]">
                        Extracted
                      </span>
                      <span className="text-xl font-semibold text-[#F5E6C8] tabular-nums tracking-widest">
                        {selectedExample.extracted}
                      </span>
                    </div>

                    <div className="flex flex-col items-center px-2" aria-label="Reversed right-to-left">
                      <span className="text-[11px] uppercase tracking-wider text-[#D4AF37]">
                        Reverse
                      </span>
                      <span className="text-xl text-[#F1D06B]">⇄</span>
                    </div>

                    <div className="px-3 py-1.5 rounded border border-[#D4AF37]/60 bg-[#D4AF37]/15">
                      <span className="block text-[11px] uppercase tracking-wider text-[#D4AF37]">
                        Vāmato Gatiḥ
                      </span>
                      <span className="text-xl font-semibold text-[#F1D06B] tabular-nums tracking-widest">
                        {selectedExample.finalNumber}
                      </span>
                    </div>
                  </div>

                  {activeStep >= 4 ? (
                    <div className="pt-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
                        Final Decoded Value
                      </p>
                      <p className="font-display text-5xl sm:text-6xl text-[#F1D06B] gold-text-glow tabular-nums">
                        {selectedExample.finalNumber}
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStep(4)}
                      className="px-4 py-2 bg-[#D4AF37] text-[#1E0F05] text-xs font-semibold rounded hover:bg-[#F1D06B] transition-colors cursor-pointer"
                    >
                      Reveal Final Output (Step 4)
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
