/**
 * cardTransition.ts
 *
 * Simple sessionStorage-based bridge between ServicesList (click source)
 * and ServicePageReveal (destination). Stores the card's bounding rect
 * and accent color so the page can animate from the card's position.
 */

export interface CardTransitionData {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const KEY = 'mv_card_transition';

export function saveCardTransition(data: CardTransitionData) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function readCardTransition(): CardTransitionData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY); // consume once
    return JSON.parse(raw) as CardTransitionData;
  } catch {
    return null;
  }
}
