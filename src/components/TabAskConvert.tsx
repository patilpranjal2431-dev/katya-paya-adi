import React, { useState } from 'react';
import { Check, Copy, Eraser, Keyboard } from 'lucide-react';
import {
  DECODER_PRESETS,
  DecodeResult,
  decodeKatapayadi,
} from '../lib/katapayadi';

const QUICK_DEVANAGARI_KEYS = [
  'क', 'ख', 'ग', 'घ', 'ङ',
  'च', 'छ', 'ज', 'झ', 'ञ',
  'ट', 'ठ', 'ड', 'ढ', 'ण',
  'त', 'थ', 'द', 'ध', 'न',
  'प', 'फ', 'ब', 'भ', 'म',
  'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
  '्', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ो',
];

export const TabAskConvert: React.FC = () => {
  const [inputText, setInputText] = useState<string>('राम');
  const [keralaMode, setKeralaMode] = useState<boolean>(false);
  const [result, setResult] = useState<DecodeResult>(() =>
    decodeKatapayadi('राम', { keralaChronogramMode: false })
  );
  const [showKeypad, setShowKeypad] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleDecode = (textOverride?: string, modeOverride?: boolean) => {
    const targetText = textOverride !== undefined ? textOverride : inputText;
    const targetMode = modeOverride !== undefined ? modeOverride : keralaMode;
    setResult(decodeKatapayadi(targetText, { keralaChronogramMode: targetMode }));
  };

  const handleSelectPreset = (text: string, presetKeralaMode = false) => {
    setInputText(text);
    setKeralaMode(presetKeralaMode);
    handleDecode(text, presetKeralaMode);
  };

  const handleCopyNumber = async () => {
    if (!result.reversedNumber) return;
    try {
      await navigator.clipboard.writeText(result.reversedNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const insertChar = (ch: string) => {
    const next = inputText + ch;
    setInputText(next);
  };

  return (
    <section className="animate-tab-enter space-y-8" aria-labelledby="decoder-heading">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
          Sanskrit Parser · Devanagari &amp; IAST
        </p>
        <h2 id="decoder-heading" className="text-3xl sm:text-4xl text-[#F5E6C8] text-balance">
          Ask &amp; Convert: Text to Number Decoder
        </h2>
        <p className="text-sm sm:text-base text-[#F5E6C8]/80 max-w-2xl">
          Enter any Sanskrit word, name, or chronogram verse in Devanagari or Romanized IAST. The
          parser drops vowels, resolves conjuncts to their final consonant, and reverses the digits.
        </p>
      </div>

      {/* Presets Strip */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-[#D4AF37]">
          Load Classical Examples
        </p>
        <div className="flex flex-wrap gap-2">
          {DECODER_PRESETS.map((preset) => (
            <button
              key={preset.title}
              type="button"
              onClick={() => handleSelectPreset(preset.text, Boolean(preset.keralaMode))}
              title={preset.description}
              className="px-3.5 py-2 text-sm rounded-md border border-[#D4AF37]/40 bg-[#140903]/80 text-[#F5E6C8] hover:border-[#F1D06B] hover:bg-[#D4AF37]/15 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="text-[#F1D06B] font-semibold">{preset.title}:</span>{' '}
              <span className="font-[family-name:var(--font-devanagari)]">
                {preset.text.length > 16 ? `${preset.text.slice(0, 14)}…` : preset.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Zone Decoder Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Input Form */}
        <div className="lg:col-span-6 carved-subpanel rounded-lg p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="katapayadi-decoder-input"
                className="text-sm font-semibold text-[#F1D06B]"
              >
                Sanskrit Word or Verse (Devanagari / IAST)
              </label>
              <button
                type="button"
                onClick={() => setShowKeypad((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F1D06B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Keyboard className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{showKeypad ? 'Hide Devanagari Pad' : 'Devanagari Pad'}</span>
              </button>
            </div>

            <textarea
              id="katapayadi-decoder-input"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type e.g. राम, rāma, कृष्ण, kṛṣṇa, or भद्राम्बुधि..."
              className="w-full rounded-md border border-[#D4AF37]/50 bg-[#120702] px-4 py-3 text-lg text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 font-[family-name:var(--font-devanagari)] focus:outline-none focus:border-[#F1D06B] focus:ring-1 focus:ring-[#F1D06B]"
            />

            {showKeypad && (
              <div className="p-3 rounded border border-[#D4AF37]/30 bg-[#120702]/95 space-y-2">
                <p className="text-[11px] text-[#F5E6C8]/65">
                  Click any Devanagari character or virama (<span className="font-[family-name:var(--font-devanagari)]">्</span>) to append:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_DEVANAGARI_KEYS.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => insertChar(ch)}
                      className="w-8 h-8 rounded border border-[#D4AF37]/30 bg-[#1E0F05] hover:bg-[#D4AF37]/25 text-[#F5E6C8] font-[family-name:var(--font-devanagari)] text-base flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <label className="flex items-start gap-2.5 pt-1 text-xs text-[#F5E6C8]/80 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={keralaMode}
                onChange={(e) => {
                  const next = e.target.checked;
                  setKeralaMode(next);
                  handleDecode(inputText, next);
                }}
                className="mt-0.5 accent-[#D4AF37] cursor-pointer"
              />
              <span>
                <strong className="text-[#F1D06B]">Kerala Chronogram Mode:</strong> Treat an
                initial standalone vowel (e.g. <span className="font-[family-name:var(--font-devanagari)]">आ</span>) as{' '}
                <span className="tabular-nums">0</span> and ignore unvocalized trailing{' '}
                <span className="italic">halanta</span> consonants (e.g. final{' '}
                <span className="font-[family-name:var(--font-devanagari)]">म्</span> in{' '}
                <span className="italic">āyurārogyasaukhyam</span>).
              </span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleDecode()}
              className="px-6 py-2.5 rounded-md bg-[#D4AF37] text-[#1E0F05] font-semibold text-sm hover:bg-[#F1D06B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1D06B] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Decode to Number
            </button>
            <button
              type="button"
              onClick={() => {
                setInputText('');
                setResult(decodeKatapayadi('', { keralaChronogramMode: keralaMode }));
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-[#D4AF37]/40 text-[#F5E6C8]/85 text-sm hover:bg-[#D4AF37]/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Eraser className="w-4 h-4" aria-hidden="true" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Right: Glowing Output Panel */}
        <div className="lg:col-span-6 carved-subpanel rounded-lg p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3">
            <span className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
              Decoded Integer Output
            </span>
            {result.reversedNumber && (
              <button
                type="button"
                onClick={handleCopyNumber}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#D4AF37]/40 text-xs text-[#F1D06B] hover:bg-[#D4AF37]/15 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Number</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="py-4 text-center space-y-3">
            {result.reversedNumber ? (
              <>
                <p className="font-display text-5xl sm:text-6xl text-[#F1D06B] gold-text-glow tabular-nums break-all">
                  {result.reversedNumber}
                </p>
                <p className="text-xs sm:text-sm text-[#F5E6C8]/85 leading-relaxed">
                  {result.summaryLine}
                </p>
              </>
            ) : (
              <p className="text-base text-[#F5E6C8]/55 py-6">
                Enter Sanskrit text and click <strong className="text-[#F1D06B]">Decode to Number</strong> to inspect the extracted digits.
              </p>
            )}
          </div>

          {/* Pipeline Summary Bar */}
          {result.reversedNumber && (
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#D4AF37]/25 text-center text-xs">
              <div className="p-2.5 rounded bg-[#140903]/80 border border-[#D4AF37]/20">
                <span className="block text-[#D4AF37] uppercase tracking-wider mb-0.5">
                  Consonants
                </span>
                <span className="text-base font-semibold text-[#F5E6C8] tabular-nums">
                  {result.extractedDigits.length}
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#140903]/80 border border-[#D4AF37]/20">
                <span className="block text-[#D4AF37] uppercase tracking-wider mb-0.5">
                  Left → Right
                </span>
                <span className="text-base font-semibold text-[#F5E6C8] tabular-nums break-all">
                  {result.extractedDigits}
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#140903]/80 border border-[#D4AF37]/40">
                <span className="block text-[#D4AF37] uppercase tracking-wider mb-0.5">
                  Reversed
                </span>
                <span className="text-base font-semibold text-[#F1D06B] tabular-nums break-all">
                  {result.reversedNumber}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Token-by-Token Step Breakdown */}
      {result.tokens.length > 0 && (
        <div className="carved-subpanel rounded-lg p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl text-[#F5E6C8]">Syllable &amp; Token Breakdown</h3>
            <span className="text-xs text-[#F5E6C8]/70">
              Script detected: <span className="capitalize text-[#F1D06B]">{result.scriptType}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {result.tokens.map((token, idx) => {
              const isCounted = token.kind === 'consonant' && token.digit !== null;
              return (
                <div
                  key={idx}
                  className={`px-3.5 py-2.5 rounded-md border text-center min-w-[76px] ${
                    isCounted
                      ? 'border-[#D4AF37]/55 bg-[#1b0e06]'
                      : 'border-[#D4AF37]/15 bg-[#120702]/60 opacity-65'
                  }`}
                >
                  <div className="font-[family-name:var(--font-devanagari)] text-xl text-[#F5E6C8]">
                    {token.rawSegment}
                  </div>
                  {isCounted ? (
                    <>
                      <div className="text-[11px] text-[#D4AF37] mt-0.5">
                        {token.droppedConjuncts.length > 0
                          ? `dropped ${token.droppedConjuncts.join('+')}`
                          : token.keptIast}
                      </div>
                      <div className="mt-1.5 inline-flex items-center justify-center w-7 h-7 rounded bg-[#D4AF37] text-[#1E0F05] font-display text-base tabular-nums">
                        {token.digit}
                      </div>
                    </>
                  ) : (
                    <div className="text-[11px] text-[#F5E6C8]/65 mt-1">
                      {token.kind === 'ignored-halanta' ? 'halanta (ignored)' : 'vowel (ignored)'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
