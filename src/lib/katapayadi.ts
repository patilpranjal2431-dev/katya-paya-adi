export interface ConsonantEntry {
  devanagari: string;
  iast: string;
  varga: string;
}

export interface DigitMapping {
  digit: number;
  consonants: ConsonantEntry[];
  mnemonicNote?: string;
}

export const DIGIT_MAPPINGS: DigitMapping[] = [
  {
    digit: 1,
    consonants: [
      { devanagari: 'क', iast: 'ka', varga: 'Ka-varga' },
      { devanagari: 'ट', iast: 'ṭa', varga: 'Ṭa-varga' },
      { devanagari: 'प', iast: 'pa', varga: 'Pa-varga' },
      { devanagari: 'य', iast: 'ya', varga: 'Ya-varga' },
    ],
  },
  {
    digit: 2,
    consonants: [
      { devanagari: 'ख', iast: 'kha', varga: 'Ka-varga' },
      { devanagari: 'ठ', iast: 'ṭha', varga: 'Ṭa-varga' },
      { devanagari: 'फ', iast: 'pha', varga: 'Pa-varga' },
      { devanagari: 'र', iast: 'ra', varga: 'Ya-varga' },
    ],
  },
  {
    digit: 3,
    consonants: [
      { devanagari: 'ग', iast: 'ga', varga: 'Ka-varga' },
      { devanagari: 'ड', iast: 'ḍa', varga: 'Ṭa-varga' },
      { devanagari: 'ब', iast: 'ba', varga: 'Pa-varga' },
      { devanagari: 'ल', iast: 'la', varga: 'Ya-varga' },
    ],
  },
  {
    digit: 4,
    consonants: [
      { devanagari: 'घ', iast: 'gha', varga: 'Ka-varga' },
      { devanagari: 'ढ', iast: 'ḍha', varga: 'Ṭa-varga' },
      { devanagari: 'भ', iast: 'bha', varga: 'Pa-varga' },
      { devanagari: 'व', iast: 'va', varga: 'Ya-varga' },
    ],
  },
  {
    digit: 5,
    consonants: [
      { devanagari: 'ङ', iast: 'ṅa', varga: 'Ka-varga' },
      { devanagari: 'ण', iast: 'ṇa', varga: 'Ṭa-varga' },
      { devanagari: 'म', iast: 'ma', varga: 'Pa-varga' },
      { devanagari: 'श', iast: 'śa', varga: 'Ya-varga' },
    ],
  },
  {
    digit: 6,
    consonants: [
      { devanagari: 'च', iast: 'ca', varga: 'Ka-varga' },
      { devanagari: 'त', iast: 'ta', varga: 'Ṭa-varga' },
      { devanagari: 'ष', iast: 'ṣa', varga: 'Ya-varga' },
    ],
  },
  {
    digit: 7,
    consonants: [
      { devanagari: 'छ', iast: 'cha', varga: 'Ka-varga' },
      { devanagari: 'थ', iast: 'tha', varga: 'Ṭa-varga' },
      { devanagari: 'स', iast: 'sa', varga: 'Ya-varga' },
    ],
  },
  {
    digit: 8,
    consonants: [
      { devanagari: 'ज', iast: 'ja', varga: 'Ka-varga' },
      { devanagari: 'द', iast: 'da', varga: 'Ṭa-varga' },
      { devanagari: 'ह', iast: 'ha', varga: 'Ya-varga' },
    ],
  },
  {
    digit: 9,
    consonants: [
      { devanagari: 'झ', iast: 'jha', varga: 'Ka-varga' },
      { devanagari: 'ध', iast: 'dha', varga: 'Ṭa-varga' },
    ],
    mnemonicNote: 'In South Indian/Vedic orthography, ळ (ḷa) is also occasionally assigned to 9.',
  },
  {
    digit: 0,
    consonants: [
      { devanagari: 'ञ', iast: 'ña', varga: 'Ka-varga' },
      { devanagari: 'न', iast: 'na', varga: 'Ṭa-varga' },
    ],
    mnemonicNote: 'Per na-ñāv-achas-cha: ञ (ña), न (na) denote 0; vowels carry no value.',
  },
];

export interface VowelOption {
  id: string;
  label: string;
  matra: string;
  iastSuffix: string;
}

export const VOWEL_OPTIONS: VowelOption[] = [
  { id: 'a', label: 'a (inherent)', matra: '', iastSuffix: 'a' },
  { id: 'aa', label: 'ā (ा)', matra: 'ा', iastSuffix: 'ā' },
  { id: 'i', label: 'i (ि)', matra: 'ि', iastSuffix: 'i' },
  { id: 'ii', label: 'ī (ी)', matra: 'ी', iastSuffix: 'ī' },
  { id: 'u', label: 'u (ु)', matra: 'ु', iastSuffix: 'u' },
  { id: 'uu', label: 'ū (ू)', matra: 'ू', iastSuffix: 'ū' },
  { id: 'e', label: 'e (े)', matra: 'े', iastSuffix: 'e' },
  { id: 'o', label: 'o (ो)', matra: 'ो', iastSuffix: 'o' },
];

const DEVANAGARI_CONSONANT_MAP: Record<string, { digit: number; iast: string }> = {
  क: { digit: 1, iast: 'k' },
  ख: { digit: 2, iast: 'kh' },
  ग: { digit: 3, iast: 'g' },
  घ: { digit: 4, iast: 'gh' },
  ङ: { digit: 5, iast: 'ṅ' },
  च: { digit: 6, iast: 'c' },
  छ: { digit: 7, iast: 'ch' },
  ज: { digit: 8, iast: 'j' },
  झ: { digit: 9, iast: 'jh' },
  ञ: { digit: 0, iast: 'ñ' },
  ट: { digit: 1, iast: 'ṭ' },
  ठ: { digit: 2, iast: 'ṭh' },
  ड: { digit: 3, iast: 'ḍ' },
  ढ: { digit: 4, iast: 'ḍh' },
  ण: { digit: 5, iast: 'ṇ' },
  त: { digit: 6, iast: 't' },
  थ: { digit: 7, iast: 'th' },
  द: { digit: 8, iast: 'd' },
  ध: { digit: 9, iast: 'dh' },
  न: { digit: 0, iast: 'n' },
  प: { digit: 1, iast: 'p' },
  फ: { digit: 2, iast: 'ph' },
  ब: { digit: 3, iast: 'b' },
  भ: { digit: 4, iast: 'bh' },
  म: { digit: 5, iast: 'm' },
  य: { digit: 1, iast: 'y' },
  र: { digit: 2, iast: 'r' },
  ल: { digit: 3, iast: 'l' },
  व: { digit: 4, iast: 'v' },
  श: { digit: 5, iast: 'ś' },
  ष: { digit: 6, iast: 'ṣ' },
  स: { digit: 7, iast: 's' },
  ह: { digit: 8, iast: 'h' },
  ळ: { digit: 9, iast: 'ḷ' },
  // Nukta variants mapped to base consonants
  क़: { digit: 1, iast: 'q' },
  ख़: { digit: 2, iast: 'khh' },
  ग़: { digit: 3, iast: 'ghh' },
  ज़: { digit: 8, iast: 'z' },
  ड़: { digit: 3, iast: 'ṛ' },
  ढ़: { digit: 4, iast: 'ṛh' },
  फ़: { digit: 2, iast: 'f' },
};

const DEVANAGARI_INDEPENDENT_VOWELS = new Set([
  'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ', 'ऑ', 'ऎ', 'ऒ',
]);

const DEVANAGARI_VOWEL_SIGNS_AND_MODIFIERS = new Set([
  'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॅ', 'े', 'ै', 'ॉ', 'ो', 'ौ', 'ं', 'ः', 'ँ', 'ऽ', 'ॣ', 'ॢ',
]);

const VIRAMA = '्';

interface IastConsonantToken {
  pattern: string;
  devanagari: string;
  digit: number;
}

const IAST_CONSONANT_TOKENS: IastConsonantToken[] = [
  { pattern: 'kh', devanagari: 'ख', digit: 2 },
  { pattern: 'gh', devanagari: 'घ', digit: 4 },
  { pattern: 'ch', devanagari: 'छ', digit: 7 },
  { pattern: 'jh', devanagari: 'झ', digit: 9 },
  { pattern: 'ṭh', devanagari: 'ठ', digit: 2 },
  { pattern: 'ḍh', devanagari: 'ढ', digit: 4 },
  { pattern: 'th', devanagari: 'थ', digit: 7 },
  { pattern: 'dh', devanagari: 'ध', digit: 9 },
  { pattern: 'ph', devanagari: 'फ', digit: 2 },
  { pattern: 'bh', devanagari: 'भ', digit: 4 },
  { pattern: 'sh', devanagari: 'श', digit: 5 },
  { pattern: 'k', devanagari: 'क', digit: 1 },
  { pattern: 'g', devanagari: 'ग', digit: 3 },
  { pattern: 'ṅ', devanagari: 'ङ', digit: 5 },
  { pattern: 'c', devanagari: 'च', digit: 6 },
  { pattern: 'j', devanagari: 'ज', digit: 8 },
  { pattern: 'ñ', devanagari: 'ञ', digit: 0 },
  { pattern: 'ṭ', devanagari: 'ट', digit: 1 },
  { pattern: 'ḍ', devanagari: 'ड', digit: 3 },
  { pattern: 'ṇ', devanagari: 'ण', digit: 5 },
  { pattern: 't', devanagari: 'त', digit: 6 },
  { pattern: 'd', devanagari: 'द', digit: 8 },
  { pattern: 'n', devanagari: 'न', digit: 0 },
  { pattern: 'p', devanagari: 'प', digit: 1 },
  { pattern: 'b', devanagari: 'ब', digit: 3 },
  { pattern: 'm', devanagari: 'म', digit: 5 },
  { pattern: 'y', devanagari: 'य', digit: 1 },
  { pattern: 'r', devanagari: 'र', digit: 2 },
  { pattern: 'l', devanagari: 'ल', digit: 3 },
  { pattern: 'v', devanagari: 'व', digit: 4 },
  { pattern: 'w', devanagari: 'व', digit: 4 },
  { pattern: 'ś', devanagari: 'श', digit: 5 },
  { pattern: 'ṣ', devanagari: 'ष', digit: 6 },
  { pattern: 's', devanagari: 'स', digit: 7 },
  { pattern: 'h', devanagari: 'ह', digit: 8 },
  { pattern: 'ḷ', devanagari: 'ळ', digit: 9 },
];

const IAST_VOWEL_TOKENS = ['ai', 'au', 'a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḹ', 'e', 'o', 'ṃ', 'ṁ', 'ḥ'];

export interface DecodedToken {
  rawSegment: string;
  keptConsonant: string;
  keptIast: string;
  droppedConjuncts: string[];
  digit: number | null;
  kind: 'consonant' | 'ignored-vowel' | 'ignored-halanta';
  note?: string;
}

export interface DecodeResult {
  input: string;
  scriptType: 'devanagari' | 'iast' | 'mixed' | 'empty';
  tokens: DecodedToken[];
  extractedDigits: string;
  reversedNumber: string;
  summaryLine: string;
}

export interface DecodeOptions {
  keralaChronogramMode?: boolean;
}

function isDevanagariChar(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= 0x0900 && code <= 0x097f;
}

export function decodeKatapayadi(rawInput: string, options: DecodeOptions = {}): DecodeResult {
  const input = rawInput.normalize('NFC').trim();
  if (!input) {
    return {
      input: '',
      scriptType: 'empty',
      tokens: [],
      extractedDigits: '',
      reversedNumber: '',
      summaryLine: '',
    };
  }

  const keralaMode = Boolean(options.keralaChronogramMode);
  const tokens: DecodedToken[] = [];
  let hasDevanagari = false;
  let hasLatin = false;
  let i = 0;
  let isFirstMeaningfulToken = true;

  while (i < input.length) {
    const ch = input[i];

    // Skip whitespace and punctuation
    if (/[\s,.;:!?'"()\-–—|।॥\d]/.test(ch)) {
      i += 1;
      continue;
    }

    if (isDevanagariChar(ch)) {
      hasDevanagari = true;

      // Independent Devanagari vowel
      if (DEVANAGARI_INDEPENDENT_VOWELS.has(ch)) {
        const rawStart = i;
        i += 1;
        while (i < input.length && DEVANAGARI_VOWEL_SIGNS_AND_MODIFIERS.has(input[i])) {
          i += 1;
        }
        const rawSegment = input.slice(rawStart, i);
        if (keralaMode && isFirstMeaningfulToken) {
          tokens.push({
            rawSegment,
            keptConsonant: ch,
            keptIast: 'vowel→0',
            droppedConjuncts: [],
            digit: 0,
            kind: 'consonant',
            note: 'Initial standalone vowel treated as 0 (na-ñāv-achas-cha)',
          });
        } else {
          tokens.push({
            rawSegment,
            keptConsonant: ch,
            keptIast: 'vowel',
            droppedConjuncts: [],
            digit: null,
            kind: 'ignored-vowel',
            note: 'Vowel ignored',
          });
        }
        isFirstMeaningfulToken = false;
        continue;
      }

      // Devanagari consonant (potentially starting a conjunct cluster)
      if (DEVANAGARI_CONSONANT_MAP[ch]) {
        const rawStart = i;
        const clusterConsonants: string[] = [ch];
        i += 1;
        let endedWithTrailingVirama = false;

        while (i < input.length) {
          if (input[i] === VIRAMA) {
            // Check if another Devanagari consonant follows the virama
            if (i + 1 < input.length && DEVANAGARI_CONSONANT_MAP[input[i + 1]]) {
              i += 1; // skip virama
              clusterConsonants.push(input[i]);
              i += 1;
              continue;
            } else {
              // Trailing virama (halanta) with no following consonant
              i += 1;
              endedWithTrailingVirama = true;
              break;
            }
          }
          break;
        }

        // Consume any trailing vowel signs / anusvara / visarga attached to the final consonant
        while (i < input.length && DEVANAGARI_VOWEL_SIGNS_AND_MODIFIERS.has(input[i])) {
          i += 1;
        }

        const rawSegment = input.slice(rawStart, i);
        const kept = clusterConsonants[clusterConsonants.length - 1];
        const dropped = clusterConsonants.slice(0, -1);
        const mapped = DEVANAGARI_CONSONANT_MAP[kept];

        if (keralaMode && endedWithTrailingVirama && clusterConsonants.length === 1) {
          tokens.push({
            rawSegment,
            keptConsonant: kept,
            keptIast: mapped.iast,
            droppedConjuncts: [],
            digit: null,
            kind: 'ignored-halanta',
            note: 'Unvocalized final halanta consonant ignored in Kerala chronogram mode',
          });
        } else {
          tokens.push({
            rawSegment,
            keptConsonant: kept,
            keptIast: mapped.iast,
            droppedConjuncts: dropped,
            digit: mapped.digit,
            kind: 'consonant',
            note: dropped.length > 0 ? `Conjunct: kept final ${kept}` : undefined,
          });
        }
        isFirstMeaningfulToken = false;
        continue;
      }

      // Stray Devanagari modifier
      i += 1;
      continue;
    }

    // Latin / IAST parsing
    if (/[a-zA-Zāīūṛṝḹṅñṭḍṇśṣṃṁḥ]/.test(ch)) {
      hasLatin = true;
      const lowerSlice = input.slice(i).toLowerCase();

      // Check vowel first
      const matchedVowel = IAST_VOWEL_TOKENS.find((v) => lowerSlice.startsWith(v));
      if (matchedVowel) {
        const rawSegment = input.slice(i, i + matchedVowel.length);
        i += matchedVowel.length;

        if (keralaMode && isFirstMeaningfulToken && ['a', 'ā', 'i', 'ī', 'u', 'ū', 'e', 'ai', 'o', 'au', 'ṛ'].includes(matchedVowel)) {
          tokens.push({
            rawSegment,
            keptConsonant: rawSegment,
            keptIast: 'vowel→0',
            droppedConjuncts: [],
            digit: 0,
            kind: 'consonant',
            note: 'Initial standalone vowel treated as 0',
          });
        } else {
          tokens.push({
            rawSegment,
            keptConsonant: rawSegment,
            keptIast: 'vowel',
            droppedConjuncts: [],
            digit: null,
            kind: 'ignored-vowel',
            note: 'Vowel ignored',
          });
        }
        isFirstMeaningfulToken = false;
        continue;
      }

      // Consume a maximal consecutive run of IAST consonants (conjunct cluster)
      const clusterMatches: { raw: string; token: IastConsonantToken }[] = [];
      const rawStart = i;

      while (i < input.length) {
        const rem = input.slice(i).toLowerCase();
        // Stop if we hit a vowel or non-letter
        if (IAST_VOWEL_TOKENS.some((v) => rem.startsWith(v))) {
          break;
        }
        const matchedConsonant = IAST_CONSONANT_TOKENS.find((c) => rem.startsWith(c.pattern));
        if (!matchedConsonant) {
          break;
        }
        clusterMatches.push({
          raw: input.slice(i, i + matchedConsonant.pattern.length),
          token: matchedConsonant,
        });
        i += matchedConsonant.pattern.length;
      }

      if (clusterMatches.length > 0) {
        // Also absorb following vowel for cleaner syllable display? Keep vowels as explicit ignored tokens or let them flow!
        // Keeping only the consonant cluster as rawSegment makes step-by-step very clear.
        const rawSegment = input.slice(rawStart, i);
        const last = clusterMatches[clusterMatches.length - 1];
        const dropped = clusterMatches.slice(0, -1).map((m) => m.token.devanagari);

        // Check if this single consonant is at the absolute end of the word with no vowel after it in Kerala mode
        const nextChar = i < input.length ? input[i] : '';
        const atWordEnd = i === input.length || /[\s,.;:!?'"()\-–—]/.test(nextChar);

        if (keralaMode && atWordEnd && clusterMatches.length === 1) {
          tokens.push({
            rawSegment,
            keptConsonant: last.token.devanagari,
            keptIast: last.token.pattern,
            droppedConjuncts: [],
            digit: null,
            kind: 'ignored-halanta',
            note: 'Unvocalized final consonant ignored in Kerala chronogram mode',
          });
        } else {
          tokens.push({
            rawSegment,
            keptConsonant: last.token.devanagari,
            keptIast: last.token.pattern,
            droppedConjuncts: dropped,
            digit: last.token.digit,
            kind: 'consonant',
            note: dropped.length > 0 ? `Conjunct: kept final ${last.token.devanagari}` : undefined,
          });
        }
        isFirstMeaningfulToken = false;
        continue;
      }

      // Unrecognized Latin char (e.g., 'q', 'x', 'z')
      i += 1;
      continue;
    }

    i += 1;
  }

  const activeConsonants = tokens.filter((t) => t.kind === 'consonant' && t.digit !== null);
  const extractedDigits = activeConsonants.map((t) => String(t.digit)).join('');
  const reversedNumber = extractedDigits.split('').reverse().join('');

  const detectedStr = activeConsonants
    .map((t) => `${t.keptConsonant} (${t.digit})`)
    .join(', ');

  const summaryLine = activeConsonants.length
    ? `Detected: ${detectedStr} → Extracted: ${extractedDigits} → Reversed: ${reversedNumber}`
    : 'No Kaṭapayādi consonants detected yet.';

  let scriptType: DecodeResult['scriptType'] = 'empty';
  if (hasDevanagari && hasLatin) scriptType = 'mixed';
  else if (hasDevanagari) scriptType = 'devanagari';
  else if (hasLatin) scriptType = 'iast';

  return {
    input,
    scriptType,
    tokens,
    extractedDigits,
    reversedNumber,
    summaryLine,
  };
}

export interface EncodeSlot {
  positionIndex: number;
  originalDigitPositionFromRight: number;
  digit: number;
  candidates: ConsonantEntry[];
}

export function prepareSemiAutoEncode(numberStr: string): {
  cleanedNumber: string;
  reversedDigits: number[];
  slots: EncodeSlot[];
} {
  const cleanedNumber = numberStr.replace(/[^0-9]/g, '');
  if (!cleanedNumber) {
    return { cleanedNumber: '', reversedDigits: [], slots: [] };
  }

  const reversedDigits = cleanedNumber
    .split('')
    .reverse()
    .map((d) => Number(d));

  const slots: EncodeSlot[] = reversedDigits.map((digit, idx) => {
    const mapping = DIGIT_MAPPINGS.find((m) => m.digit === digit);
    return {
      positionIndex: idx,
      originalDigitPositionFromRight: idx + 1,
      digit,
      candidates: mapping ? mapping.consonants : [],
    };
  });

  return { cleanedNumber, reversedDigits, slots };
}

export interface PresetExample {
  title: string;
  text: string;
  iast: string;
  description: string;
  keralaMode?: boolean;
}

export const DECODER_PRESETS: PresetExample[] = [
  {
    title: 'Rāma',
    text: 'राम',
    iast: 'rāma',
    description: 'Classic two-syllable example: र (2), म (5) → 52.',
  },
  {
    title: 'Kṛṣṇa',
    text: 'कृष्ण',
    iast: 'kṛṣṇa',
    description: 'Demonstrates conjunct rule (ष् + ण → ण = 5): क (1), ण (5) → 51.',
  },
  {
    title: 'Sadratnamālā (π)',
    text: 'भद्राम्बुधिसिद्धजन्मगणितश्रद्धास्मयद्भूपगिः',
    iast: 'bhadrāmbudhisiddhajanmagaṇitaśraddhāsmayadbhūpagiḥ',
    description: 'Śaṅkara Varman’s 18-syllable chronogram encoding 18 digits of π (314159265358979324).',
  },
  {
    title: 'Nārāyaṇīyam (1587 CE)',
    text: 'आयुरारोग्यसौख्यम्',
    iast: 'āyurārogyasaukhyam',
    description: 'Melpathur’s chronogram for Kali Yuga day 1,712,210 (uses Kerala chronogram mode).',
    keralaMode: true,
  },
];
