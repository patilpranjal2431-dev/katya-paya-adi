# 🕉️ Kaṭapayādi: The Ancient Indian Alphanumeric System

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

> **Kaṭapayādi** is an ancient Indian alphasyllabic numeral algorithm developed around the 7th century CE. It maps Sanskrit consonants to decimal digits (0–9), allowing massive numbers—such as astronomical constants, planetary positions, and mathematical formulas—to be encoded into memorable, poetic Sanskrit verses. 

This project is an **interactive web application** that decodes and encodes the Kaṭapayādi system, featuring a rich, immersive UI inspired by ancient Indian temple architecture.

---

## 🏛️ Project Overview

Before the advent of modern data compression or hashing, ancient Indian astronomers (like Haridatta and the Kerala School of Mathematics) needed a way to remember complex numerical data. They developed the Kaṭapayādi system, which is still actively used today to number the 72 Melakartā rāgas in Carnatic music.

This web application serves as a **digital museum and interactive tool** for exploring this ancient technology.

### ✨ Key Features
*   **📜 Theory Tab:** Understand the core rules (`aṅkānāṁ vāmato gatiḥ`), the `na-ñāv-achas-cha` mnemonic, and the three golden rules of decoding.
*   **🎨 Visual Examples:** An interactive mapping table. Hover over digits to see the corresponding Sanskrit consonants glow, along with step-by-step visual decoding (e.g., राम → 52).
*   **📝 Ask & Convert (Decoder):** Paste any Sanskrit text (Devanagari or IAST) to instantly extract its hidden numerical value.
*   **🔢 Encode & Decode (Calculator):** A dual-purpose tool. Decode words to numbers, or encode numbers into candidate consonant strings.
*   **🏛️ History & Timeline:** Trace the evolution of the system from Vararuci (4th Century CE) to the modern Melakartā rāgas, including the "Encoding Anomaly" of *Śyāmalāṅgī*.

---

## 🧠 The Core Algorithm (How it Works)

The Kaṭapayādi system is governed by three strict rules:

1.  **The Consonant Mapping:** Consonants are mapped to digits 1-9 and 0 (e.g., `ka`=1, `kha`=2, `ma`=5).
2.  **Vowels are Zero:** Vowel marks attached to consonants carry **no numerical value**. Standalone vowels at the start of a word represent **0**.
3.  **Conjunct Consonants:** When consonants cluster together (e.g., `st` in *stha*), only the **final vowel-bearing consonant** takes effect. The preceding consonants are ignored.
4.  **Right-to-Left Reading:** Classical notation places the least-significant digit on the left. The algorithm extracts the digits left-to-right, then **reverses them** to form standard modern numbers.

### Example: राम (rāma)
*   र (ra) → **2**
*   म (ma) → **5**
*   Extracted: `2, 5`
*   Reverse for place value: **52**

---

## 🚀 Getting Started

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/katapayadi-system.git
