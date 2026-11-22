import React from 'react';
import { MandalaDivider } from './MandalaDivider';

interface TimelineMilestone {
  era: string;
  title: string;
  work: string;
  detail: string;
}

const TIMELINE_EVENTS: TimelineMilestone[] = [
  {
    era: '4th Century CE',
    title: 'Early Oral & Astronomical Tradition',
    work: 'Vararuci’s Candra-vākyāni',
    detail:
      'Traditionally attributed to Vararuci, the Candra-vākyāni (“Moon Sentences”) use 248 memorable Sanskrit phrases to encode daily lunar longitudes for the Vākya astronomical tradition, though exact origins remain uncertain.',
  },
  {
    era: '683 CE',
    title: 'Earliest Dated Textual Evidence',
    work: 'Haridatta’s Grahacāraṇibandhana',
    detail:
      'The earliest securely dated treatise employing the Kaṭapayādi system. Haridatta introduced the Parahita system in Kerala, encoding planetary correction parameters directly into Sanskrit verses.',
  },
  {
    era: '869 CE (9th Century)',
    title: 'Royal Observatory Commentary',
    work: 'Śaṅkaranārāyaṇa’s Laghu-bhāskarīya-vivaraṇa',
    detail:
      'Written at the court observatory of King Ravi Varma in Mahodayapuram (Kerala), this commentary demonstrates fluent, widespread use of Kaṭapayādi numerals across South Indian astronomy.',
  },
  {
    era: '10th Century CE',
    title: 'The Northern Variant',
    work: 'Āryabhaṭa II’s Mahāsiddhānta',
    detail:
      'Āryabhaṭa II introduced an alternative alphabetical variant in the Mahāsiddhānta: digits were read left-to-right (rather than right-to-left) and every consonant in a conjunct cluster retained a value.',
  },
  {
    era: '14th–16th Century CE',
    title: 'Golden Age of the Kerala School',
    work: 'Sine Tables, π Series & Nārāyaṇīyam (1587 CE)',
    detail:
      'Scholars of the Kerala mathematical school preserved infinite-series approximations of π and trigonometric sine tables in verse. In 1587 CE, Melpathur Narayana Bhattathiri closed his Nārāyaṇīyam with the blessing “āyurārogyasaukhyam” (1,712,210 days since the start of Kali Yuga).',
  },
  {
    era: '17th Century–Present',
    title: 'Carnatic Music Classification',
    work: 'The 72 Melakartā Rāga System',
    detail:
      'Musicologists including Venkaṭamakhin and Govindācārya prefixed Kaṭapayādi syllables to rāga names so musicians could compute any scale’s exact serial number (1–72) from its first two syllables alone.',
  },
];

export const TabHistory: React.FC = () => {
  return (
    <section className="animate-tab-enter space-y-10" aria-labelledby="history-heading">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
          Chronicle · 4th Century CE to Modern Era
        </p>
        <h2 id="history-heading" className="text-3xl sm:text-4xl text-[#F5E6C8] text-balance">
          History &amp; Historical Timeline
        </h2>
        <p className="text-sm sm:text-base text-[#F5E6C8]/80 max-w-2xl">
          From early lunar tables and Kerala observatories to Carnatic musicology, trace how
          Kaṭapayādi evolved across sixteen centuries of Indian mathematical and literary culture.
        </p>
      </div>

      {/* Vertical Timeline with Gold Nodes */}
      <div className="relative pl-8 sm:pl-12 space-y-8">
        {/* Vertical Gold Axis */}
        <div
          className="absolute left-3 sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/60 to-transparent"
          aria-hidden="true"
        />

        {TIMELINE_EVENTS.map((event, idx) => (
          <article key={idx} className="relative carved-subpanel rounded-lg p-5 sm:p-6">
            {/* Gold Node */}
            <span
              className="absolute -left-[25px] sm:-left-[33px] top-6 w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-[#1E0F05] shadow-[0_0_12px_rgba(212,175,55,0.85)]"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-[0.16em] text-[#F1D06B] font-semibold tabular-nums">
                {event.era}
              </span>
              <span className="text-xs italic text-[#F5E6C8]/75">{event.work}</span>
            </div>

            <h3 className="text-xl sm:text-2xl text-[#F5E6C8] mb-2">{event.title}</h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#F5E6C8]/85 max-w-3xl">
              {event.detail}
            </p>
          </article>
        ))}
      </div>

      <MandalaDivider />

      {/* Special Section: The Melakartā Discrepancy */}
      <div className="carved-subpanel rounded-lg p-6 sm:p-8 space-y-6">
        <div className="space-y-2 border-b border-[#D4AF37]/25 pb-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
            Musicological Anomaly · Carnatic Rāga Numbering
          </p>
          <h3 className="text-2xl sm:text-3xl text-[#F1D06B]">
            The Melakartā Discrepancy
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[#F5E6C8]/85 max-w-3xl">
            In the 72-Melakartā scheme, the first two syllables of each parent rāga encode its exact
            index (<span className="tabular-nums">1–72</span>). Yet one famous rāga preserves an
            ancient orthographic anomaly that breaks the conjunct rule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Māyāmālavagauḷa */}
          <div className="p-5 rounded-md border border-[#D4AF37]/45 bg-[#120702]/90 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-xl text-[#F5E6C8]">Māyāmālavagauḷa</h4>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] tabular-nums">
                Melakartā #15 · Exact Match
              </span>
            </div>
            <p className="font-[family-name:var(--font-devanagari)] text-2xl text-[#F1D06B]">
              मायामालवगौळ
            </p>
            <div className="text-sm text-[#F5E6C8]/85 space-y-1.5 pt-1">
              <p>
                First two syllables: <strong className="text-[#F1D06B]">मा (mā) → 5</strong> and{' '}
                <strong className="text-[#F1D06B]">या (yā) → 1</strong>.
              </p>
              <p>
                Extracted: <span className="tabular-nums font-semibold">51</span> → Reversed:{' '}
                <span className="tabular-nums font-bold text-[#F1D06B]">15</span>. Matches rank #15
                precisely.
              </p>
            </div>
          </div>

          {/* Śyāmalāṅgī */}
          <div className="p-5 rounded-md border border-[#D4AF37]/45 bg-[#120702]/90 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-xl text-[#F5E6C8]">Śyāmalāṅgī</h4>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] tabular-nums">
                Melakartā #55 · Encodes 51
              </span>
            </div>
            <p className="font-[family-name:var(--font-devanagari)] text-2xl text-[#F1D06B]">
              श्यामलाङ्गी
            </p>
            <div className="text-sm text-[#F5E6C8]/85 space-y-1.5 pt-1">
              <p>
                Strict conjunct rule: <strong className="text-[#F1D06B]">श्या (śyā)</strong> drops{' '}
                <span className="font-[family-name:var(--font-devanagari)]">श्</span> and keeps{' '}
                <strong className="text-[#F1D06B]">य (ya) → 1</strong>, followed by{' '}
                <strong className="text-[#F1D06B]">म (ma) → 5</strong>, giving{' '}
                <span className="tabular-nums font-semibold text-[#F1D06B]">51</span> (occupied by{' '}
                <span className="italic">Kāmavardhanī</span>).
              </p>
              <p>
                Why is it ranked <strong className="text-[#F1D06B] tabular-nums">#55</strong>? Because
                the name was evaluated using the initial{' '}
                <span className="font-[family-name:var(--font-devanagari)]">श (śa) → 5</span> instead
                of the conjunct’s final <span className="font-[family-name:var(--font-devanagari)]">य</span>—a
                celebrated historical exception in Carnatic musicology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
