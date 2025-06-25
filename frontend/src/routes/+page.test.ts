import { render } from '@testing-library/svelte';
import Page from './+page.svelte';
import { vi, describe, it, expect } from 'vitest';

// Mock du store pour le test
vi.mock('$lib/stores/recetteStore', () => ({
  filteredRecettes: {
    subscribe: (run: any) => {
      run([
        { id: '1', nom: 'Tarte', description: 'Délicieuse', tempsPreparation: 30 },
        { id: '2', nom: 'Pizza', description: 'Italienne', tempsPreparation: 20 }
      ]);
      return () => {};
    }
  }
}));

describe('Page +page.svelte', () => {
  it('affiche le titre et les cartes de recettes', () => {
    const { getByText, getAllByRole } = render(Page);

    // Vérifie le titre
    expect(getByText('Nos Recettes')).toBeTruthy();

    // Vérifie les cartes
    expect(getByText('Tarte')).toBeTruthy();
    expect(getByText('Pizza')).toBeTruthy();

    // Vérifie les liens
    const links = getAllByRole('link');
    expect(links[0].getAttribute('href')).toBe('/recettes/1');
    expect(links[1].getAttribute('href')).toBe('/recettes/2');
  });
});