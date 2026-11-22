import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeftRight, Check, Copy, RefreshCw } from 'lucide-react';
import {
  VOWEL_OPTIONS,
  decodeKatapayadi,
  prepareSemiAutoEncode,
} from '../lib/katapayadi';

interface SlotSelection {
  consonantIndex: number;
  vowelId: string;
}

export const TabEncodeDecode: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  // Encoder State
  const [numberInput, setNumberInput] = useState<string>('1188');
  const [selections, setSelections] = useState<SlotSelection[]>([]);
  const [copiedEncode, setCopiedEncode] = useState<boolean>(false);

  // Decoder State
  const [decodeInput, setDecodeInput] = useState<string>('जदकप');
  const [copiedDecode, setCopiedDecode] = useState<boolean>(false);

  const encodePlan = useMemo(() => prepareSemiAutoEncode(numberInput), [numberInput]);

  // Synchronize slot selections array length when numberInput changes
  useEffect(() => {
    setSelections((prev) =>
      encodePlan.slots.map((_, idx) => {
        if (prev[idx]) return prev[idx];
        return { consonantIndex: 0, vowelId: 'a' };
      })
    );
  }, [encodePlan.slots]);

  const composedWord = useMemo(() => {
    if (encodePlan.slots.length === 0) return { devanagari: '', iast: '' };

    let dev = '';
    let iast = '';

    encodePlan.slots.forEach((slot, idx) => {
      const sel = selections[idx] || { consonantIndex: 0, vowelId: 'a' };
      const consonant = slot.candidates[sel.consonantIndex] || slot.candidates[0];
      const vowel = VOWEL_OPTIONS.find((v) => v.id === sel.vowelId) || VOWEL_OPTIONS[0];
      if (!consonant) return;

      const baseIast = consonant.iast.endsWith('a')
        ? consonant.iast.slice(0, -1)
        : consonant.iast;

      dev += consonant.devanagari + vowel.matra;
      iast += baseIast + vowel.iastSuffix;
    });

    return { devanagari: dev, iast };
  }, [encodePlan.slots, selections]);

  const roundTripCheck = useMemo(
    () => decodeKatapayadi(composedWord.devanagari),
    [composedWord.devanagari]
  );

  const decodeResult = useMemo(() => decodeKatapayadi(decodeInput), [decodeInput]);

  const updateSlotConsonant = (slotIdx: number, consonantIndex: number) => {
    setSelections((prev) =>
      prev.map((item, idx) => (idx === slotIdx ? { ...item, consonantIndex } : item))
    );
  };

  const updateSlotVowel = (slotIdx: number, vowelId: string) => {
    setSelections((prev) =>
      prev.map((item, idx) => (idx === slotIdx ? { ...item, vowelId } : item))
    );
  };

  const handleRandomizeConsonants = () => {
    setSelections(
      encodePlan.slots.map((slot) => ({
        consonantIndex: Math.floor(Math.random() * Math.max(1, slot.candidates.length)),
        vowelId: VOWEL_OPTIONS[Math.floor(Math.random() * 6)].id,
      }))
    );
  };

  const handleLoadRamaRecipe = () => {
    setNumberInput('52');
    // 52 reversed is 2, 5. Digit 2 -> index 3 is र (ra); Digit 5 -> index 2 is म (ma)
    setTimeout(() => {
      setSelections([
        { consonantIndex: 3, vowelId: 'aa' },
        { consonantIndex: 2, vowelId: 'a' },
      ]);
    }, 0);
  };

  const copyText = async (text: string, which: 'encode' | 'decode') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (which === 'encode') {
        setCopiedEncode(true);
        setTimeout(() => setCopiedEncode(false), 1800);
      } else {
        setCopiedDecode(true);
        setTimeout(() => setCopiedDecode(false), 1800);
      }
    } catch {
      // Clipboard API fallback omitted
    }
  };

  return (
    <section className="animate-tab-enter space-y-8" aria-labelledby="calc-heading">
      {/* Header + Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
            Bidirectional Chronogram Lab
          </p>
          <h2 id="calc-heading" className="text-3xl sm:text-4xl text-[#F5E6C8] text-balance">
            Encode &amp; Decode Interactive Calculator
          </h2>
          <p className="text-sm sm:text-base text-[#F5E6C8]/80 max-w-2xl">
            Switch between decoding existing Sanskrit text or composing your own Sanskrit
            chronogram from any number using candidate consonants and vowels.
          </p>
        </div>

        {/* Mode Segmented Control */}
        <div
          className="inline-flex items-center p-1 rounded-md bg-[#140903] border border-[#D4AF37]/40 shrink-0"
          role="group"
          aria-label="Calculator Mode"
        >
          <button
            type="button"
            onClick={() => setMode('encode')}
            className={`px-4 py-2 text-sm rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'encode'
                ? 'bg-[#D4AF37] text-[#1E0F05] font-semibold'
                : 'text-[#F5E6C8]/80 hover:text-[#F1D06B]'
            }`}
          >
            Encoder Mode
          </button>
          <button
            type="button"
            onClick={() => setMode('decode')}
            className={`px-4 py-2 text-sm rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'decode'
                ? 'bg-[#D4AF37] text-[#1E0F05] font-semibold'
                : 'text-[#F5E6C8]/80 hover:text-[#F1D06B]'
            }`}
          >
            Decoder Mode
          </button>
        </div>
      </div>

      {mode === 'encode' ? (
        <div className="space-y-6">
          {/* Number Input + Live Assembled Word Result */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 carved-subpanel rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="encoder-number-input"
                  className="text-sm font-semibold text-[#F1D06B]"
                >
                  Target Integer
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLoadRamaRecipe}
                    className="text-xs text-[#D4AF37] hover:text-[#F1D06B] underline cursor-pointer whitespace-nowrap"
                  >
                    Try 52 (राम)
                  </button>
                </div>
              </div>

              <input
                id="encoder-number-input"
                type="text"
                inputMode="numeric"
                maxLength={14}
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 1188"
                className="w-full rounded-md border border-[#D4AF37]/50 bg-[#120702] px-4 py-3 font-display text-3xl text-[#F1D06B] tabular-nums tracking-wider focus:outline-none focus:border-[#F1D06B] focus:ring-1 focus:ring-[#F1D06B]"
              />

              {encodePlan.cleanedNumber && (
                <div className="p-3.5 rounded bg-[#120702]/90 border border-[#D4AF37]/25 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#F5E6C8]/80">
                    <span>Original Digits:</span>
                    <span className="font-semibold tabular-nums text-[#F5E6C8]">
                      {encodePlan.cleanedNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#F5E6C8]/80">
                    <span>Reversed Order (Vāmato Gatiḥ):</span>
                    <span className="font-semibold tabular-nums text-[#F1D06B]">
                      {encodePlan.reversedDigits.join(' · ')}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleRandomizeConsonants}
                  disabled={encodePlan.slots.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#D4AF37]/45 text-xs text-[#F5E6C8] hover:bg-[#D4AF37]/15 disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Vary Syllable Choices</span>
                </button>
              </div>
            </div>

            {/* Live Candidate Word Preview */}
            <div className="lg:col-span-7 carved-subpanel rounded-lg p-6 flex flex-col justify-between space-y-5">
              <div className="flex items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
                <span className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
                  Composed Candidate Sanskrit Word
                </span>
                {composedWord.devanagari && (
                  <button
                    type="button"
                    onClick={() =>
                      copyText(`${composedWord.devanagari} (${composedWord.iast})`, 'encode')
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#D4AF37] text-[#1E0F05] font-semibold text-xs hover:bg-[#F1D06B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedEncode ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copied Result</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Result</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {composedWord.devanagari ? (
                <div className="py-2 text-center space-y-2">
                  <p className="font-[family-name:var(--font-devanagari)] text-4xl sm:text-5xl text-[#F1D06B] gold-text-glow break-words">
                    {composedWord.devanagari}
                  </p>
                  <p className="text-lg italic text-[#F5E6C8]/90">{composedWord.iast}</p>
                </div>
              ) : (
                <p className="text-center text-sm text-[#F5E6C8]/60 py-6">
                  Enter digits above to generate reversed syllable slots.
                </p>
              )}

              {composedWord.devanagari && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#D4AF37]/25 text-xs">
                  <span className="text-[#F5E6C8]/80">
                    Round-trip verification:{' '}
                    <strong className="text-[#F1D06B] tabular-nums">
                      {roundTripCheck.reversedNumber}
                    </strong>
                  </span>
                  <span className="text-[#F1D06B]">
                    {roundTripCheck.reversedNumber === encodePlan.cleanedNumber
                      ? 'Exact match'
                      : 'Check selection'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Consonant & Vowel Picker Per Reversed Digit */}
          {encodePlan.slots.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl text-[#F5E6C8]">
                  Select Consonants &amp; Vowels (Left-to-Right Syllables)
                </h3>
                <p className="text-xs text-[#F5E6C8]/70">
                  Syllable 1 encodes the rightmost digit of your target number.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {encodePlan.slots.map((slot, slotIdx) => {
                  const sel = selections[slotIdx] || { consonantIndex: 0, vowelId: 'a' };
                  return (
                    <div
                      key={`${slot.positionIndex}-${slot.digit}`}
                      className="carved-subpanel rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-[#D4AF37]/20 pb-2">
                        <span className="text-xs uppercase tracking-wider text-[#D4AF37] tabular-nums">
                          Syllable {slotIdx + 1} · Digit {slot.digit}
                        </span>
                        <span className="text-xs text-[#F5E6C8]/65 tabular-nums">
                          {slot.candidates.map((c) => c.devanagari).join(', ')}
                        </span>
                      </div>

                      {/* Consonant Candidates */}
                      <div className="flex flex-wrap gap-2">
                        {slot.candidates.map((cand, cIdx) => {
                          const isSelected = sel.consonantIndex === cIdx;
                          return (
                            <button
                              key={cand.devanagari}
                              type="button"
                              onClick={() => updateSlotConsonant(slotIdx, cIdx)}
                              className={`px-3 py-2 rounded border text-sm transition-colors cursor-pointer flex items-baseline gap-1.5 ${
                                isSelected
                                  ? 'border-[#F1D06B] bg-[#D4AF37] text-[#1E0F05] font-semibold'
                                  : 'border-[#D4AF37]/30 bg-[#120702] text-[#F5E6C8] hover:border-[#D4AF37]'
                              }`}
                            >
                              <span className="font-[family-name:var(--font-devanagari)] text-lg">
                                {cand.devanagari}
                              </span>
                              <span className="text-xs opacity-85 italic">{cand.iast}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Vowel / Mātrā Selector */}
                      <div className="flex items-center gap-2 pt-1">
                        <label
                          htmlFor={`vowel-select-${slotIdx}`}
                          className="text-xs text-[#F5E6C8]/75 shrink-0"
                        >
                          Vowel:
                        </label>
                        <select
                          id={`vowel-select-${slotIdx}`}
                          value={sel.vowelId}
                          onChange={(e) => updateSlotVowel(slotIdx, e.target.value)}
                          className="flex-1 rounded border border-[#D4AF37]/35 bg-[#120702] px-2.5 py-1.5 text-xs text-[#F5E6C8] focus:outline-none focus:border-[#F1D06B] cursor-pointer"
                        >
                          {VOWEL_OPTIONS.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Decoder Mode inside Calculator */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 carved-subpanel rounded-lg p-6 space-y-4">
            <label htmlFor="calc-decode-input" className="block text-sm font-semibold text-[#F1D06B]">
              Live Sanskrit Word Decoder (Devanagari or IAST)
            </label>
            <textarea
              id="calc-decode-input"
              rows={4}
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              placeholder="Type any Devanagari or IAST word..."
              className="w-full rounded-md border border-[#D4AF37]/50 bg-[#120702] px-4 py-3 text-lg text-[#F5E6C8] font-[family-name:var(--font-devanagari)] focus:outline-none focus:border-[#F1D06B] focus:ring-1 focus:ring-[#F1D06B]"
            />
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#F5E6C8]/70">
              <span>Quick load:</span>
              {['जदकप', 'राम', 'kṛṣṇa', 'māyāmālavagauḷa'].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setDecodeInput(sample)}
                  className="px-2.5 py-1 rounded border border-[#D4AF37]/30 hover:border-[#F1D06B] text-[#F1D06B] transition-colors cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 carved-subpanel rounded-lg p-6 flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between gap-2 border-b border-[#D4AF37]/25 pb-3">
              <span className="text-xs uppercase tracking-[0.18em] text-[#D4AF37] inline-flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Live Decoded Number</span>
              </span>
              {decodeResult.reversedNumber && (
                <button
                  type="button"
                  onClick={() => copyText(decodeResult.reversedNumber, 'decode')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#D4AF37] text-[#1E0F05] font-semibold text-xs hover:bg-[#F1D06B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedDecode ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copied Result</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Result</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="py-4 text-center space-y-2">
              {decodeResult.reversedNumber ? (
                <>
                  <p className="font-display text-5xl sm:text-6xl text-[#F1D06B] gold-text-glow tabular-nums break-all">
                    {decodeResult.reversedNumber}
                  </p>
                  <p className="text-xs sm:text-sm text-[#F5E6C8]/85">{decodeResult.summaryLine}</p>
                </>
              ) : (
                <p className="text-sm text-[#F5E6C8]/55 py-6">
                  Start typing Sanskrit consonants to see the decoded integer immediately.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
