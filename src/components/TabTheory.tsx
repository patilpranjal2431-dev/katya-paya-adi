import React, { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { MandalaDivider } from './MandalaDivider';

interface TabTheoryProps {
  onNavigateTab: (tab: 'examples' | 'decoder' | 'calculator' | 'history' | 'daily') => void;
}

export const TabTheory: React.FC<TabTheoryProps> = ({ onNavigateTab }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="animate-tab-enter space-y-8" aria-labelledby="theory-heading">
      {/* Core Definition & Manuscript Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
              Foundations · Alphasyllabic Mathematics
            </p>
            <h2
              id="theory-heading"
              className="text-3xl sm:text-4xl text-[#F5E6C8] leading-tight text-balance"
            >
              Poetry as Memory for Numbers
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#F5E6C8]/90 max-w-prose">
              The <strong className="text-[#F1D06B] font-semibold">Kaṭapayādi system</strong>{' '}
              (<span className="font-[family-name:var(--font-devanagari)] text-[#F1D06B]">कटपयादि</span>)
              is an ancient Indian alphasyllabic numeral algorithm developed around the early first
              millennium CE. It maps Sanskrit consonants to the decimal digits{' '}
              <span className="tabular-nums text-[#F1D06B]">1–9</span> and{' '}
              <span className="tabular-nums text-[#F1D06B]">0</span>, allowing astronomers,
              mathematicians, and musicologists to embed precise numerical constants inside flowing,
              metrical Sanskrit verse.
            </p>
            <p className="text-base leading-relaxed text-[#F5E6C8]/80 max-w-prose">
              Because each digit maps to up to four distinct consonants—and vowels carry zero
              numerical weight—composers could freely choose syllables that formed meaningful words
              and devotional poetry while preserving exact astronomical tables, sine values, and
              approximations of <span className="italic">π</span> without corruption across palm-leaf
              transcriptions.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigateTab('examples')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#1E0F05] font-semibold text-sm rounded-md hover:bg-[#F1D06B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1D06B] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Inspect Consonant Matrix</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('decoder')}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#D4AF37]/60 text-[#F5E6C8] text-sm rounded-md hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Open Live Decoder</span>
            </button>
          </div>
        </div>

        {/* Archival Palm-Leaf Figure */}
        <figure className="lg:col-span-5 flex flex-col justify-between carved-subpanel rounded-lg p-4">
          <div className="relative overflow-hidden rounded border border-[#D4AF37]/30 aspect-[4/3] bg-[#140903]">
            {!imgError ? (
              <img
                src="/src/assets/images/palm_leaf_manuscript_1795326826994.jpg"
                alt="Ancient South Indian Kerala palm-leaf manuscript etched with Sanskrit verse and astronomical diagrams"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#2a1408] to-[#140903]">
                <BookOpen className="w-10 h-10 text-[#D4AF37]/70 mb-2" aria-hidden="true" />
                <p className="text-sm text-[#F5E6C8]/80">Kerala Astronomical Palm-Leaf Archive</p>
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140903]/70 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-[#F5E6C8]/75 italic">
            Fig. 1 — Etched palm-leaf astronomical treatise (<span className="not-italic">tālapatra</span>).
            Encoding numbers inside strict poetic meter prevented scribal copying errors across centuries.
          </figcaption>
        </figure>
      </div>

      <MandalaDivider />

      {/* The Mnemonic Sutra */}
      <div className="carved-subpanel rounded-lg p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#D4AF37]/25 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37] mb-1">
              Traditional Sanskrit Mnemonic
            </p>
            <h3 className="text-2xl text-[#F5E6C8]">
              Na-ñāv-achas-cha Śūnyāni
            </h3>
          </div>
          <div className="text-left md:text-right">
            <p className="font-[family-name:var(--font-devanagari)] text-2xl sm:text-3xl text-[#F1D06B] tracking-wide">
              नञावचश्च शून्यानि
            </p>
            <p className="text-xs text-[#F5E6C8]/70 mt-1">
              ka-ṭa-pa-yā-di varga-saṁkhyā-vidhiḥ
            </p>
          </div>
        </div>

        <p className="text-base leading-relaxed text-[#F5E6C8]/90 max-w-3xl">
          The classical verse defining the system begins with the four consonants{' '}
          <strong className="text-[#F1D06B]">ka (क)</strong>,{' '}
          <strong className="text-[#F1D06B]">ṭa (ट)</strong>,{' '}
          <strong className="text-[#F1D06B]">pa (प)</strong>, and{' '}
          <strong className="text-[#F1D06B]">ya (य)</strong>—each equal to{' '}
          <span className="tabular-nums text-[#F1D06B] font-semibold">1</span>—which gives{' '}
          <span className="italic">Ka-ṭa-pa-yā-di</span> its name. The closing clause{' '}
          <strong className="text-[#F1D06B]">na-ñāv-achas-cha śūnyāni</strong> establishes that the
          nasals <span className="font-[family-name:var(--font-devanagari)] text-[#F1D06B]">न</span>{' '}
          (<span className="italic">na</span>) and{' '}
          <span className="font-[family-name:var(--font-devanagari)] text-[#F1D06B]">ञ</span>{' '}
          (<span className="italic">ña</span>) denote zero, while{' '}
          <span className="italic">ac</span> (the Sanskrit technical term for all vowels) carry no
          independent digit value when shaping syllables.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm">
          <div className="p-4 rounded border border-[#D4AF37]/25 bg-[#160b04]/70">
            <p className="text-[#D4AF37] font-semibold mb-1">न · na</p>
            <p className="text-[#F5E6C8]/80">Dental nasal consonant assigned to digit 0.</p>
          </div>
          <div className="p-4 rounded border border-[#D4AF37]/25 bg-[#160b04]/70">
            <p className="text-[#D4AF37] font-semibold mb-1">ञ · ña</p>
            <p className="text-[#F5E6C8]/80">Palatal nasal consonant assigned to digit 0.</p>
          </div>
          <div className="p-4 rounded border border-[#D4AF37]/25 bg-[#160b04]/70">
            <p className="text-[#D4AF37] font-semibold mb-1">अच् · ac (Vowels)</p>
            <p className="text-[#F5E6C8]/80">
              All vowels (a, ā, i, ī, u, ū, ṛ, e, o) are null—free for poetic meter.
            </p>
          </div>
        </div>
      </div>

      {/* The Three Golden Rules */}
      <div className="space-y-5">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
            Algorithmic Specification
          </p>
          <h3 className="text-2xl sm:text-3xl text-[#F5E6C8]">
            The Three Golden Rules
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="carved-subpanel rounded-lg p-6 space-y-3">
            <p className="text-xs tracking-widest uppercase text-[#D4AF37] tabular-nums">
              Rule 01 · Svara-śūnyatā
            </p>
            <h4 className="text-xl text-[#F1D06B] font-display">
              Vowels Have No Value
            </h4>
            <p className="text-sm leading-relaxed text-[#F5E6C8]/85">
              Vowels attached to consonants (and non-consonantal modifiers like{' '}
              <span className="italic">anusvāra</span> <span className="font-[family-name:var(--font-devanagari)]">ं</span>{' '}
              or <span className="italic">visarga</span> <span className="font-[family-name:var(--font-devanagari)]">ः</span>)
              do not alter a syllable’s digit. Thus{' '}
              <span className="font-[family-name:var(--font-devanagari)] text-[#F1D06B]">क, का, कि, कु, के, को</span>{' '}
              all evaluate equally to <span className="tabular-nums font-semibold text-[#F1D06B]">1</span>.
            </p>
          </article>

          <article className="carved-subpanel rounded-lg p-6 space-y-3">
            <p className="text-xs tracking-widest uppercase text-[#D4AF37] tabular-nums">
              Rule 02 · Saṁyuktākṣara
            </p>
            <h4 className="text-xl text-[#F1D06B] font-display">
              Conjuncts: Only the Last Counts
            </h4>
            <p className="text-sm leading-relaxed text-[#F5E6C8]/85">
              When two or more consonants cluster together without an intervening vowel, only the{' '}
              <strong className="text-[#F5E6C8]">final consonant</strong> immediately preceding the
              vowel is evaluated. In{' '}
              <span className="font-[family-name:var(--font-devanagari)] text-[#F1D06B]">भद्र</span>{' '}
              (<span className="italic">bha-dra</span>), the cluster{' '}
              <span className="font-[family-name:var(--font-devanagari)]">द् + र</span> keeps only{' '}
              <span className="font-[family-name:var(--font-devanagari)] text-[#F1D06B]">र (2)</span>.
            </p>
          </article>

          <article className="carved-subpanel rounded-lg p-6 space-y-3">
            <p className="text-xs tracking-widest uppercase text-[#D4AF37] tabular-nums">
              Rule 03 · Place Value Direction
            </p>
            <h4 className="text-xl text-[#F1D06B] font-display">
              Aṅkānāṁ Vāmato Gatiḥ
            </h4>
            <p className="text-sm leading-relaxed text-[#F5E6C8]/85">
              “Numerals move from right to left.” Digits extracted from the syllables of a word are
              written in <strong className="text-[#F5E6C8]">reverse order</strong>: the first
              syllable supplies the units place, the second supplies the tens place, and so on.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
