import React, { useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Compass, Music, ScrollText, ShieldCheck } from 'lucide-react';
import { decodeKatapayadi } from '../lib/katapayadi';
import { MandalaDivider } from './MandalaDivider';

type DailyScenarioId = 'chronograms' | 'panchanga' | 'music' | 'geometry' | 'checksums';

interface ScenarioNav {
  id: DailyScenarioId;
  number: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const SCENARIOS: ScenarioNav[] = [
  { id: 'chronograms', number: '01', label: 'Chronograms & Dates', icon: Calendar },
  { id: 'panchanga', number: '02', label: 'Pañchāṅga Almanac', icon: Compass },
  { id: 'music', number: '03', label: 'Carnatic Rāga Index', icon: Music },
  { id: 'geometry', number: '04', label: 'Sine & π Geometry', icon: ScrollText },
  { id: 'checksums', number: '05', label: 'Oral Checksums', icon: ShieldCheck },
];

// Scenario 1: Chronograms
interface ChronogramCase {
  id: string;
  title: string;
  phrase: string;
  iast: string;
  meaning: string;
  context: string;
  keralaMode: boolean;
  decodedLabel: string;
  yearNote: string;
}

const CHRONOGRAM_CASES: ChronogramCase[] = [
  {
    id: 'narayaniyam',
    title: 'Manuscript Completion Date (Kalidina Saṅkhyā)',
    phrase: 'आयुरारोग्यसौख्यम्',
    iast: 'āyurārogyasaukhyam',
    meaning: '“Long life, health, and happiness”',
    context: 'Closing blessing of Melpathur Narayana Bhattathiri’s Nārāyaṇīyam (1587 CE)',
    keralaMode: true,
    decodedLabel: '1,712,210 days since Kali Yuga',
    yearNote: 'November 27, 1587 CE',
  },
  {
    id: 'vijayanagara',
    title: 'Royal Copper-Plate Inscription (Śaka Year)',
    phrase: 'तत्त्वलोके',
    iast: 'tattvaloke',
    meaning: '“In the realm of truth”',
    context: 'Vijayanagara copper-plate temple grant embedding the Śaka era year',
    keralaMode: false,
    decodedLabel: 'Śaka 1346',
    yearNote: '1424 CE (1346 + 78)',
  },
];

// Scenario 2: Panchanga Chandravakyas (Selected opening lunar days from Vararuci's 248 phrases)
const CHANDRAVAKYA_SAMPLES = [
  { day: 1, phrase: 'गीर्णः श्रेयः', iast: 'gīrṇaḥ śreyaḥ', digits: '12° 53′', arcDeg: 12.88 },
  { day: 2, phrase: 'धेनवः श्रीः', iast: 'dhenavaḥ śrīḥ', digits: '24° 09′', arcDeg: 24.15 },
  { day: 3, phrase: 'रुद्रस्तु नम्यः', iast: 'rudras tu namyaḥ', digits: '36° 02′', arcDeg: 36.03 },
  { day: 7, phrase: 'भवो हि याज्यः', iast: 'bhavo hi yājyaḥ', digits: '88° 14′', arcDeg: 88.23 },
  { day: 14, phrase: 'जयन्तसेना', iast: 'jayantasenā', digits: '176° 18′', arcDeg: 176.3 },
  { day: 21, phrase: 'गौरीसखः', iast: 'gaurīsakhah', digits: '262° 33′', arcDeg: 262.55 },
];

// Scenario 3: Melakarta Ragas
interface MelakartaExample {
  name: string;
  devanagari: string;
  syllable1: string;
  digit1: number;
  syllable2: string;
  digit2: number;
  number: number;
}

const MELAKARTA_EXAMPLES: MelakartaExample[] = [
  {
    name: 'Kanakāṅgī',
    devanagari: 'कनकाङ्गी',
    syllable1: 'क (Ka)',
    digit1: 1,
    syllable2: 'न (Na)',
    digit2: 0,
    number: 1,
  },
  {
    name: 'Māyāmālavagauḷa',
    devanagari: 'मायामालवगौळ',
    syllable1: 'मा (Mā)',
    digit1: 5,
    syllable2: 'या (Yā)',
    digit2: 1,
    number: 15,
  },
  {
    name: 'Kharaharapriyā',
    devanagari: 'खरहरप्रिया',
    syllable1: 'ख (Kha)',
    digit1: 2,
    syllable2: 'र (Ra)',
    digit2: 2,
    number: 22,
  },
  {
    name: 'Harikāmbhoji',
    devanagari: 'हरिकाम्भोजि',
    syllable1: 'ह (Ha)',
    digit1: 8,
    syllable2: 'रि (Ri)',
    digit2: 2,
    number: 28,
  },
  {
    name: 'Dhīraśaṅkarābharaṇam',
    devanagari: 'धीरशङ्कराभरणम्',
    syllable1: 'धी (Dhī)',
    digit1: 9,
    syllable2: 'र (Ra)',
    digit2: 2,
    number: 29,
  },
  {
    name: 'Mechakalyāṇī',
    devanagari: 'मेचकल्याणी',
    syllable1: 'मे (Me)',
    digit1: 5,
    syllable2: 'च (Ca)',
    digit2: 6,
    number: 65,
  },
];

const PURVANGA_PAIRS = [
  { ri: 'R₁', ga: 'G₁', label: 'Śuddha Ri · Śuddha Ga', semitones: [1, 2] },
  { ri: 'R₁', ga: 'G₂', label: 'Śuddha Ri · Sādhāraṇa Ga', semitones: [1, 3] },
  { ri: 'R₁', ga: 'G₃', label: 'Śuddha Ri · Antara Ga', semitones: [1, 4] },
  { ri: 'R₂', ga: 'G₂', label: 'Chatuśśruti Ri · Sādhāraṇa Ga', semitones: [2, 3] },
  { ri: 'R₂', ga: 'G₃', label: 'Chatuśśruti Ri · Antara Ga', semitones: [2, 4] },
  { ri: 'R₃', ga: 'G₃', label: 'Ṣaṭśruti Ri · Antara Ga', semitones: [3, 4] },
];

const UTTARANGA_PAIRS = [
  { da: 'D₁', ni: 'N₁', label: 'Śuddha Dha · Śuddha Ni', semitones: [8, 9] },
  { da: 'D₁', ni: 'N₂', label: 'Śuddha Dha · Kaiśiki Ni', semitones: [8, 10] },
  { da: 'D₁', ni: 'N₃', label: 'Śuddha Dha · Kākalī Ni', semitones: [8, 11] },
  { da: 'D₂', ni: 'N₂', label: 'Chatuśśruti Dha · Kaiśiki Ni', semitones: [9, 10] },
  { da: 'D₂', ni: 'N₃', label: 'Chatuśśruti Dha · Kākalī Ni', semitones: [9, 11] },
  { da: 'D₃', ni: 'N₃', label: 'Ṣaṭśruti Dha · Kākalī Ni', semitones: [10, 11] },
];

const TWELVE_SVARASTHANAS = [
  { index: 0, label: 'S', name: 'Ṣaḍja' },
  { index: 1, label: 'R₁', name: 'Śuddha Ri' },
  { index: 2, label: 'R₂/G₁', name: 'Chatuśśruti Ri / Śuddha Ga' },
  { index: 3, label: 'R₃/G₂', name: 'Ṣaṭśruti Ri / Sādhāraṇa Ga' },
  { index: 4, label: 'G₃', name: 'Antara Ga' },
  { index: 5, label: 'M₁', name: 'Śuddha Ma' },
  { index: 6, label: 'M₂', name: 'Prati Ma' },
  { index: 7, label: 'P', name: 'Pañcama' },
  { index: 8, label: 'D₁', name: 'Śuddha Dha' },
  { index: 9, label: 'D₂/N₁', name: 'Chatuśśruti Dha / Śuddha Ni' },
  { index: 10, label: 'D₃/N₂', name: 'Ṣaṭśruti Dha / Kaiśiki Ni' },
  { index: 11, label: 'N₃', name: 'Kākalī Ni' },
];

function computeMelakartaScale(melaNumber: number) {
  const clamped = Math.max(1, Math.min(72, melaNumber));
  const isPratiMa = clamped > 36;
  const halfOffset = isPratiMa ? clamped - 36 : clamped;
  const chakra = Math.ceil(halfOffset / 6); // 1..6 within half
  const overallChakra = Math.ceil(clamped / 6); // 1..12
  const posInChakra = ((halfOffset - 1) % 6) + 1; // 1..6

  const purvanga = PURVANGA_PAIRS[chakra - 1];
  const uttaranga = UTTARANGA_PAIRS[posInChakra - 1];
  const maSemitone = isPratiMa ? 6 : 5;
  const maLabel = isPratiMa ? 'M₂' : 'M₁';

  const activeSemitones = new Set([
    0,
    ...purvanga.semitones,
    maSemitone,
    7,
    ...uttaranga.semitones,
  ]);

  return {
    clamped,
    overallChakra,
    posInChakra,
    notes: ['S', purvanga.ri, purvanga.ga, maLabel, 'P', uttaranga.da, uttaranga.ni],
    activeSemitones,
  };
}

// Scenario 4: Madhava Sine Table (24 intervals of 3.75 deg, R = 3438 arcminutes)
const SADRATNAMALA_PI = 'भद्राम्बुधिसिद्धजन्मगणितश्रद्धास्मयद्भूपगिः';

export const TabDailyUses: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<DailyScenarioId>('chronograms');

  // Scenario 1 state
  const [selectedChronoId, setSelectedChronoId] = useState<string>('narayaniyam');
  const activeChrono =
    CHRONOGRAM_CASES.find((c) => c.id === selectedChronoId) || CHRONOGRAM_CASES[0];
  const chronoDecoded = useMemo(
    () =>
      decodeKatapayadi(activeChrono.phrase, {
        keralaChronogramMode: activeChrono.keralaMode,
      }),
    [activeChrono]
  );

  // Scenario 2 state
  const [selectedVakyaIdx, setSelectedVakyaIdx] = useState<number>(0);
  const activeVakya = CHANDRAVAKYA_SAMPLES[selectedVakyaIdx];

  // Scenario 3 state
  const [selectedMelaIdx, setSelectedMelaIdx] = useState<number>(0);
  const [customMelaInput, setCustomMelaInput] = useState<string>('');
  const activeMela = MELAKARTA_EXAMPLES[selectedMelaIdx];

  const customMelaNumber = useMemo(() => {
    if (!customMelaInput.trim()) return null;
    const parsed = decodeKatapayadi(customMelaInput.trim());
    if (parsed.extractedDigits.length < 2) return null;
    const firstTwo = parsed.extractedDigits.slice(0, 2);
    const reversed = Number(firstTwo.split('').reverse().join(''));
    return reversed >= 1 && reversed <= 72 ? reversed : null;
  }, [customMelaInput]);

  const effectiveMelaNumber = customMelaNumber ?? activeMela.number;
  const scaleDetails = useMemo(
    () => computeMelakartaScale(effectiveMelaNumber),
    [effectiveMelaNumber]
  );

  // Scenario 4 state
  const [sineIntervalIdx, setSineIntervalIdx] = useState<number>(8); // 8 * 3.75 = 30 deg
  const angleDeg = sineIntervalIdx * 3.75;
  const angleRad = (angleDeg * Math.PI) / 180;
  const madhavaRadius = 3438;
  const ardhajya = Math.round(madhavaRadius * Math.sin(angleRad));

  const piTokens = useMemo(() => decodeKatapayadi(SADRATNAMALA_PI), []);

  // Scenario 5 state
  const [checksumTitle, setChecksumTitle] = useState<string>('जय');
  const [expectedUnits, setExpectedUnits] = useState<number>(18);
  const checksumDecoded = useMemo(() => decodeKatapayadi(checksumTitle), [checksumTitle]);
  const checksumNumber = checksumDecoded.reversedNumber
    ? Number(checksumDecoded.reversedNumber)
    : null;
  const checksumMatches = checksumNumber === expectedUnits;

  return (
    <section className="animate-tab-enter space-y-8" aria-labelledby="daily-uses-heading">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
          Applied Mnemonics · Everyday &amp; Scholarly Life
        </p>
        <h2 id="daily-uses-heading" className="text-3xl sm:text-4xl text-[#F5E6C8] text-balance">
          Daily Uses in Ancient India
        </h2>
        <p className="text-sm sm:text-base text-[#F5E6C8]/80 max-w-3xl">
          Long before printed reference books, Kaṭapayādi functioned as a human-friendly hashing and
          lookup engine across temple inscriptions, daily almanacs, music theory, temple
          architecture, and oral manuscript verification.
        </p>
      </div>

      {/* Scenario Selector Strip */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5"
        role="tablist"
        aria-label="Ancient Daily Use Domains"
      >
        {SCENARIOS.map((sc) => {
          const Icon = sc.icon;
          const isActive = activeScenario === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveScenario(sc.id)}
              className={`p-3 rounded-md border text-left transition-colors cursor-pointer flex flex-col gap-1.5 ${
                isActive
                  ? 'border-[#F1D06B] bg-[#D4AF37] text-[#1E0F05]'
                  : 'border-[#D4AF37]/30 bg-[#140903]/80 text-[#F5E6C8] hover:border-[#D4AF37]/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] uppercase tracking-wider tabular-nums ${
                    isActive ? 'text-[#1E0F05]/80 font-semibold' : 'text-[#D4AF37]'
                  }`}
                >
                  {sc.number}
                </span>
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              </div>
              <span className="text-xs sm:text-sm font-semibold leading-snug">{sc.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scenario 1: Chronograms & Timestamps */}
      {activeScenario === 'chronograms' && (
        <div className="carved-subpanel rounded-lg p-6 sm:p-8 space-y-6 animate-tab-enter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#D4AF37]">
                01 · Calendars, Birthdays &amp; Timestamps
              </p>
              <h3 className="text-2xl text-[#F5E6C8]">
                Chronograms in Blessings &amp; Copper Plates
              </h3>
            </div>
            <div className="inline-flex p-1 rounded bg-[#120702] border border-[#D4AF37]/35 shrink-0">
              {CHRONOGRAM_CASES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedChronoId(c.id)}
                  className={`px-3 py-1.5 text-xs rounded transition-colors cursor-pointer whitespace-nowrap ${
                    selectedChronoId === c.id
                      ? 'bg-[#D4AF37] text-[#1E0F05] font-semibold'
                      : 'text-[#F5E6C8]/80 hover:text-[#F1D06B]'
                  }`}
                >
                  {c.id === 'narayaniyam' ? 'Nārāyaṇīyam (1587 CE)' : 'Vijayanagara Grant (1424 CE)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-md border border-[#D4AF37]/35 bg-[#120702]/90 space-y-2">
                <p className="text-xs uppercase tracking-wider text-[#D4AF37]">
                  {activeChrono.title}
                </p>
                <p className="font-[family-name:var(--font-devanagari)] text-3xl sm:text-4xl text-[#F1D06B]">
                  {activeChrono.phrase}
                </p>
                <p className="text-sm italic text-[#F5E6C8]/85">
                  {activeChrono.iast} — {activeChrono.meaning}
                </p>
                <p className="text-xs text-[#F5E6C8]/70 pt-1">{activeChrono.context}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {chronoDecoded.tokens
                  .filter((t) => t.kind === 'consonant' && t.digit !== null)
                  .map((t, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded border border-[#D4AF37]/35 bg-[#1a0d05] text-center min-w-[60px]"
                    >
                      <span className="block font-[family-name:var(--font-devanagari)] text-lg text-[#F5E6C8]">
                        {t.rawSegment}
                      </span>
                      <span className="text-xs font-semibold text-[#F1D06B] tabular-nums">
                        {t.digit}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-md border border-[#D4AF37]/50 bg-[#120702]/95 text-center space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
                Reversed Right-to-Left Timestamp
              </p>
              <p className="font-display text-4xl sm:text-5xl text-[#F1D06B] gold-text-glow tabular-nums">
                {chronoDecoded.reversedNumber}
              </p>
              <p className="text-sm font-semibold text-[#F5E6C8]">{activeChrono.decodedLabel}</p>
              <p className="text-xs text-[#F5E6C8]/70">{activeChrono.yearNote}</p>
            </div>
          </div>

          <p className="text-sm text-[#F5E6C8]/80 leading-relaxed border-t border-[#D4AF37]/20 pt-4">
            Families and astrologers also used this technique for personal birthdates—coining
            auspicious Sanskrit names or short prayers for newborns that preserved their exact{' '}
            <span className="italic">Pañchāṅga</span> birth epoch inside an everyday blessing.
          </p>
        </div>
      )}

      {/* Scenario 2: Panchanga & Chandravakyas */}
      {activeScenario === 'panchanga' && (
        <div className="carved-subpanel rounded-lg p-6 sm:p-8 space-y-6 animate-tab-enter">
          <div className="border-b border-[#D4AF37]/25 pb-4 space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-[#D4AF37]">
              02 · Daily Almanac &amp; Timekeeping
            </p>
            <h3 className="text-2xl text-[#F5E6C8]">
              Vararuci’s 248 Chandravākyas (“Moon Sentences”)
            </h3>
            <p className="text-sm text-[#F5E6C8]/80 max-w-3xl">
              Priests, navigators, and farmers needed exact daily lunar longitudes. Instead of
              carrying heavy parchment tables, astronomers memorized 248 short Sanskrit phrases and
              decoded each day’s lunar position on demand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Lunar Orbit SVG Visualization */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-md border border-[#D4AF37]/30 bg-[#120702]/90">
              <svg
                viewBox="0 0 240 240"
                className="w-56 h-56 sm:w-64 sm:h-64"
                role="img"
                aria-label={`Lunar orbital position at ${activeVakya.digits} on Day ${activeVakya.day}`}
              >
                <circle
                  cx="120"
                  cy="120"
                  r="88"
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle cx="120" cy="120" r="18" fill="rgba(212, 175, 55, 0.2)" stroke="#D4AF37" strokeWidth="1.5" />
                <text x="120" y="124" textAnchor="middle" fill="#F1D06B" fontSize="10" fontFamily="Lora, serif">
                  Earth
                </text>

                {/* Angle Line */}
                {(() => {
                  const rad = ((activeVakya.arcDeg - 90) * Math.PI) / 180;
                  const mx = 120 + 88 * Math.cos(rad);
                  const my = 120 + 88 * Math.sin(rad);
                  return (
                    <>
                      <line
                        x1="120"
                        y1="120"
                        x2={mx}
                        y2={my}
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <circle cx={mx} cy={my} r="10" fill="#F1D06B" />
                      <circle cx={mx} cy={my} r="16" fill="none" stroke="rgba(241, 208, 107, 0.4)" strokeWidth="1.5" />
                    </>
                  );
                })()}
              </svg>
              <p className="text-xs text-[#D4AF37] tabular-nums mt-2">
                Day {activeVakya.day} of 248 · Lunar Longitude {activeVakya.digits}
              </p>
            </div>

            {/* Phrase Selector */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs uppercase tracking-wider text-[#D4AF37]">
                Select a Memorized Chandravākya Phrase
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CHANDRAVAKYA_SAMPLES.map((sample, idx) => (
                  <button
                    key={sample.day}
                    type="button"
                    onClick={() => setSelectedVakyaIdx(idx)}
                    className={`p-3 rounded border text-left transition-colors cursor-pointer ${
                      selectedVakyaIdx === idx
                        ? 'border-[#F1D06B] bg-[#D4AF37]/20 text-[#F1D06B]'
                        : 'border-[#D4AF37]/25 bg-[#120702]/75 text-[#F5E6C8] hover:border-[#D4AF37]/60'
                    }`}
                  >
                    <span className="block text-[11px] uppercase tracking-wider text-[#D4AF37] tabular-nums">
                      Day {sample.day}
                    </span>
                    <span className="block font-[family-name:var(--font-devanagari)] text-base mt-0.5">
                      {sample.phrase}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded border border-[#D4AF37]/35 bg-[#120702]/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-[family-name:var(--font-devanagari)] text-2xl text-[#F1D06B]">
                    {activeVakya.phrase}
                  </p>
                  <p className="text-xs italic text-[#F5E6C8]/75">{activeVakya.iast}</p>
                </div>
                <div className="sm:text-right">
                  <span className="block text-[11px] uppercase tracking-wider text-[#D4AF37]">
                    Decoded Lunar Position
                  </span>
                  <span className="font-display text-2xl text-[#F5E6C8] tabular-nums">
                    {activeVakya.digits}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario 3: Carnatic Music Indexing */}
      {activeScenario === 'music' && (
        <div className="carved-subpanel rounded-lg p-6 sm:p-8 space-y-6 animate-tab-enter">
          <div className="border-b border-[#D4AF37]/25 pb-4 space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-[#D4AF37]">
              03 · Music Indexing &amp; Scale Lookup
            </p>
            <h3 className="text-2xl text-[#F5E6C8]">
              Carnatic 72 Melakartā Svara-Sthāna Lookup
            </h3>
            <p className="text-sm text-[#F5E6C8]/80 max-w-3xl">
              By decoding just the first two syllables of a rāga’s name, a musician instantly derives
              its serial number (1–72) and its exact seven scale notes without sheet music.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Raga Picker & Custom Input */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                {MELAKARTA_EXAMPLES.map((mela, idx) => (
                  <button
                    key={mela.name}
                    type="button"
                    onClick={() => {
                      setSelectedMelaIdx(idx);
                      setCustomMelaInput('');
                    }}
                    className={`px-3 py-2 rounded border text-xs transition-colors cursor-pointer ${
                      !customMelaInput && selectedMelaIdx === idx
                        ? 'border-[#F1D06B] bg-[#D4AF37] text-[#1E0F05] font-semibold'
                        : 'border-[#D4AF37]/30 bg-[#120702] text-[#F5E6C8] hover:border-[#D4AF37]'
                    }`}
                  >
                    <span className="tabular-nums">#{mela.number}</span> · {mela.name}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5 pt-2">
                <label
                  htmlFor="mela-custom-input"
                  className="block text-xs uppercase tracking-wider text-[#D4AF37]"
                >
                  Or Test Any Rāga Prefix (IAST / Devanagari)
                </label>
                <input
                  id="mela-custom-input"
                  type="text"
                  value={customMelaInput}
                  onChange={(e) => setCustomMelaInput(e.target.value)}
                  placeholder="e.g. kanakāṅgī, kharaharapriyā, मेचकल्याणी..."
                  className="w-full rounded border border-[#D4AF37]/40 bg-[#120702] px-3.5 py-2 text-sm text-[#F5E6C8] focus:outline-none focus:border-[#F1D06B]"
                />
              </div>
            </div>

            {/* Interactive Scale Visualization */}
            <div className="lg:col-span-7 p-5 rounded-md border border-[#D4AF37]/40 bg-[#120702]/95 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#D4AF37]">
                    {customMelaNumber ? 'Custom Rāga Lookup' : activeMela.name}
                  </p>
                  <p className="font-[family-name:var(--font-devanagari)] text-2xl text-[#F1D06B]">
                    {customMelaNumber
                      ? customMelaInput
                      : `${activeMela.syllable1} · ${activeMela.syllable2} → ${activeMela.digit1}${activeMela.digit2} ⇄ ${activeMela.number}`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] uppercase tracking-wider text-[#D4AF37]">
                    Melakartā Index
                  </span>
                  <span className="font-display text-4xl text-[#F1D06B] tabular-nums">
                    #{scaleDetails.clamped}
                  </span>
                </div>
              </div>

              {/* Derived Notes & Chakra */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#F5E6C8]/80">
                <span>
                  Chakra <strong className="text-[#F1D06B] tabular-nums">{scaleDetails.overallChakra}</strong> of 12 · Position{' '}
                  <strong className="text-[#F1D06B] tabular-nums">{scaleDetails.posInChakra}</strong> of 6
                </span>
                <span className="font-semibold text-[#F1D06B] tracking-wide">
                  {scaleDetails.notes.join(' · ')}
                </span>
              </div>

              {/* 12-Svarasthana Keyboard Strip */}
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                {TWELVE_SVARASTHANAS.map((st) => {
                  const isActive = scaleDetails.activeSemitones.has(st.index);
                  return (
                    <div
                      key={st.index}
                      title={st.name}
                      className={`py-3 px-1 rounded border text-center transition-colors ${
                        isActive
                          ? 'border-[#F1D06B] bg-[#D4AF37] text-[#1E0F05] font-semibold'
                          : 'border-[#D4AF37]/20 bg-[#1b0e06] text-[#F5E6C8]/40'
                      }`}
                    >
                      <span className="block text-xs tabular-nums">{st.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario 4: Trade, Geometry & Architecture */}
      {activeScenario === 'geometry' && (
        <div className="carved-subpanel rounded-lg p-6 sm:p-8 space-y-6 animate-tab-enter">
          <div className="border-b border-[#D4AF37]/25 pb-4 space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-[#D4AF37]">
              04 · Trade, Geometry &amp; Temple Architecture
            </p>
            <h3 className="text-2xl text-[#F5E6C8]">
              Mādhava’s 24-Sine Table &amp; π in Poetic Meter
            </h3>
            <p className="text-sm text-[#F5E6C8]/80 max-w-3xl">
              Architects and surveyors computed temple proportions and astronomical chords on-site
              by reciting Mādhava’s 24 sine phrases (in steps of 3.75°) and π verses like{' '}
              <span className="italic">Sadratnamālā</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Interactive Ardhajya (Half-Chord Sine) Visualizer */}
            <div className="lg:col-span-6 p-5 rounded-md border border-[#D4AF37]/35 bg-[#120702]/90 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="sine-angle-slider" className="text-sm font-semibold text-[#F1D06B]">
                  Angle θ: <span className="tabular-nums">{angleDeg.toFixed(2)}°</span> (Interval{' '}
                  <span className="tabular-nums">{sineIntervalIdx}/24</span>)
                </label>
                <span className="text-xs text-[#D4AF37] tabular-nums">
                  Ardhajyā (R·sin θ) = {ardhajya}′
                </span>
              </div>

              <input
                id="sine-angle-slider"
                type="range"
                min={1}
                max={24}
                step={1}
                value={sineIntervalIdx}
                onChange={(e) => setSineIntervalIdx(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />

              <div className="flex justify-center">
                <svg
                  viewBox="0 0 220 140"
                  className="w-full max-w-xs h-36"
                  role="img"
                  aria-label={`Quarter circle showing sine chord at ${angleDeg.toFixed(2)} degrees`}
                >
                  {/* Baseline & Quadrant */}
                  <line x1="25" y1="120" x2="195" y2="120" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                  <line x1="25" y1="120" x2="25" y2="15" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                  <path
                    d="M 145 120 A 120 120 0 0 0 25 0"
                    transform="translate(0, 12) scale(1, 0.9)"
                    fill="none"
                    stroke="rgba(212,175,55,0.45)"
                    strokeWidth="1.5"
                  />
                  {(() => {
                    const r = 100;
                    const px = 25 + r * Math.cos(angleRad);
                    const py = 120 - r * Math.sin(angleRad);
                    return (
                      <>
                        <line x1="25" y1="120" x2={px} y2={py} stroke="#F5E6C8" strokeWidth="1.5" />
                        <line x1={px} y1={py} x2={px} y2="120" stroke="#D4AF37" strokeWidth="3" />
                        <circle cx={px} cy={py} r="4.5" fill="#F1D06B" />
                      </>
                    );
                  })()}
                </svg>
              </div>
              <p className="text-xs text-[#F5E6C8]/75 text-center">
                Traditional unit radius R = 3438′ (1 arcminute per unit). Gold vertical segment shows
                the <span className="italic">ardhajyā</span> (half-chord sine).
              </p>
            </div>

            {/* Sadratnamala Pi Prayer */}
            <div className="lg:col-span-6 p-5 rounded-md border border-[#D4AF37]/35 bg-[#120702]/90 space-y-4">
              <p className="text-xs uppercase tracking-wider text-[#D4AF37]">
                17-Decimal π Encoded as a Royal Eulogy
              </p>
              <p className="font-[family-name:var(--font-devanagari)] text-xl sm:text-2xl text-[#F1D06B] leading-relaxed">
                {SADRATNAMALA_PI}
              </p>
              <p className="text-xs italic text-[#F5E6C8]/75">
                “bhadrāmbudhisiddhajanmagaṇitaśraddhā sma yad bhūpagīḥ”
              </p>
              <div className="p-3.5 rounded border border-[#D4AF37]/30 bg-[#1a0d05]">
                <span className="block text-[11px] uppercase tracking-wider text-[#D4AF37] mb-1">
                  Decoded Value (÷ 10¹⁷)
                </span>
                <span className="font-display text-2xl sm:text-3xl text-[#F1D06B] tabular-nums tracking-wide break-all">
                  3.{piTokens.reversedNumber.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario 5: Oral Checksums */}
      {activeScenario === 'checksums' && (
        <div className="carved-subpanel rounded-lg p-6 sm:p-8 space-y-6 animate-tab-enter">
          <div className="border-b border-[#D4AF37]/25 pb-4 space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-[#D4AF37]">
              05 · Oral Checksums &amp; Text Preservation
            </p>
            <h3 className="text-2xl text-[#F5E6C8]">
              Built-in Error Detection for Hand-Copied Texts
            </h3>
            <p className="text-sm text-[#F5E6C8]/80 max-w-3xl">
              To prevent scribes from accidentally dropping verses or books across centuries,
              authors encoded structural counts directly into a text’s title—just as{' '}
              <strong className="text-[#F1D06B]">Jaya (जय)</strong>, the original title of the{' '}
              <span className="italic">Mahābhārata</span>, hashes to{' '}
              <span className="tabular-nums text-[#F1D06B]">18</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="checksum-title-input" className="block text-xs uppercase tracking-wider text-[#D4AF37]">
                  Text Title / Checksum Word
                </label>
                <input
                  id="checksum-title-input"
                  type="text"
                  value={checksumTitle}
                  onChange={(e) => setChecksumTitle(e.target.value)}
                  className="w-full rounded border border-[#D4AF37]/45 bg-[#120702] px-4 py-2.5 text-xl font-[family-name:var(--font-devanagari)] text-[#F1D06B] focus:outline-none focus:border-[#F1D06B]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="checksum-expected-input" className="block text-xs uppercase tracking-wider text-[#D4AF37]">
                  Recited / Copied Structural Count (e.g. Parvas / Chapters)
                </label>
                <input
                  id="checksum-expected-input"
                  type="number"
                  min={0}
                  value={expectedUnits}
                  onChange={(e) => setExpectedUnits(Number(e.target.value))}
                  className="w-full rounded border border-[#D4AF37]/45 bg-[#120702] px-4 py-2.5 text-xl text-[#F5E6C8] tabular-nums focus:outline-none focus:border-[#F1D06B]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setChecksumTitle('जय');
                    setExpectedUnits(18);
                  }}
                  className="px-3 py-1.5 rounded border border-[#D4AF37]/35 text-xs text-[#F1D06B] hover:bg-[#D4AF37]/15 cursor-pointer"
                >
                  Jaya (जय) = 18 Parvas
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChecksumTitle('जय');
                    setExpectedUnits(17);
                  }}
                  className="px-3 py-1.5 rounded border border-[#D4AF37]/35 text-xs text-[#F5E6C8]/80 hover:bg-[#D4AF37]/15 cursor-pointer"
                >
                  Simulate Missing Chapter (17)
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-md border border-[#D4AF37]/45 bg-[#120702]/95 space-y-4">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37]">
                  Checksum Verification
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                    checksumMatches ? 'text-[#F1D06B]' : 'text-[#E88D67]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>{checksumMatches ? 'Integrity Verified' : 'Count Mismatch Detected'}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded bg-[#1a0d05] border border-[#D4AF37]/25">
                  <span className="block text-[11px] uppercase tracking-wider text-[#D4AF37]">
                    Title Hash
                  </span>
                  <span className="font-display text-3xl text-[#F1D06B] tabular-nums">
                    {checksumNumber ?? '—'}
                  </span>
                </div>
                <div className="p-3 rounded bg-[#1a0d05] border border-[#D4AF37]/25">
                  <span className="block text-[11px] uppercase tracking-wider text-[#D4AF37]">
                    Manuscript Count
                  </span>
                  <span className="font-display text-3xl text-[#F5E6C8] tabular-nums">
                    {expectedUnits}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#F5E6C8]/80 leading-relaxed">
                {checksumTitle === 'जय'
                  ? 'ज (Ja = 8) + य (Ya = 1) → 81 reversed = 18: matching the 18 Parvas of the Mahābhārata, 18 chapters of the Bhagavad Gītā, and 18 days of battle.'
                  : checksumDecoded.summaryLine}
              </p>
            </div>
          </div>
        </div>
      )}

      <MandalaDivider className="my-4" />
    </section>
  );
};
