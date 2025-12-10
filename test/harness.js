// Smoke-test harness for Clashmakr deck builder
// Loads script.js into a Node VM and calls selected functions.
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const scriptPath = path.resolve(__dirname, '..', 'script.js');
const code = fs.readFileSync(scriptPath, 'utf8');

// Create a sandbox with minimal browser-like globals for script.js
const sandbox = {
  console: console,
  window: {},
  // Minimal document stub used by script.js
  document: {
    addEventListener: (event, cb) => { if (event === 'DOMContentLoaded') { try { cb(); } catch(e) { console.error('DOM ready handler error', e); } } },
    querySelector: () => ({ addEventListener: () => {}, removeEventListener: () => {}, appendChild: () => {}, style: {} }),
    getElementById: () => ({ addEventListener: () => {}, removeEventListener: () => {}, value: '', appendChild: () => {}, style: {} }),
    createElement: () => ({ appendChild: () => {}, setAttribute: () => {}, style: {} }),
    body: { appendChild: () => {} },
    querySelectorAll: () => []
  },
  navigator: {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  gameKnowledge: {
    metaDecks: { decks: [] }
  },
  clashRoyaleCards: []
};

vm.createContext(sandbox);

try {
  // Run the code in the sandbox
  vm.runInContext(code, sandbox, { filename: scriptPath });
} catch (err) {
  console.error('Error while loading script.js:', err && err.stack ? err.stack : err);
  process.exit(2);
}

// Helper to pretty print results
function printResult(name, value) {
  console.log('---', name, '---');
  try {
    console.log(JSON.stringify(value, null, 2));
  } catch (e) {
    console.log(value);
  }
}

// Prepare a small card database if not present
if (!Array.isArray(sandbox.clashRoyaleCards) || sandbox.clashRoyaleCards.length === 0) {
  sandbox.clashRoyaleCards = [
    { name: 'Mini P.E.K.K.A', elixir: 4, role: 'wincon', type: 'troop', rarity: 'epic' },
    { name: 'P.E.K.K.A', elixir: 7, role: 'tank', type: 'troop', rarity: 'legendary' },
    { name: 'Goblin Machine', elixir: 4, role: 'support', type: 'troop', rarity: 'rare' },
    { name: 'Fireball', elixir: 4, role: 'spell', type: 'spell', rarity: 'rare' }
  ];
}

// Attach some proven decks for testing
sandbox.gameKnowledge = sandbox.gameKnowledge || {};
sandbox.gameKnowledge.metaDecks = sandbox.gameKnowledge.metaDecks || { decks: [] };
sandbox.gameKnowledge.metaDecks.decks.push({
  name: 'Test Deck 1',
  cards: ['Mini P.E.K.K.A','Fireball','Goblin Machine','P.E.K.K.A','Fireball','Fireball','Mini P.E.K.K.A','Goblin Machine'],
  winRate: '61.2',
  useRate: '3.5',
  source: 'TestSource',
  usedBy: ['ProA']
});

// Run smoke tests
try {
  // buildDeckFromRequest
  if (typeof sandbox.buildDeckFromRequest === 'function') {
    const deck = sandbox.buildDeckFromRequest(['mini pekka', 'Goblin Machine']);
    printResult('buildDeckFromRequest(["mini pekka","Goblin Machine"])', deck && deck.map ? deck.map(c => c.name) : deck);
  } else {
    console.warn('buildDeckFromRequest not defined in sandbox');
  }

  // buildOptimalDeck
  if (typeof sandbox.buildOptimalDeck === 'function') {
    const deck2 = sandbox.buildOptimalDeck(['Mini P.E.K.K.A']);
    printResult('buildOptimalDeck(["Mini P.E.K.K.A"])', deck2 && deck2.map ? deck2.map(c => c.name) : deck2);
  } else {
    console.warn('buildOptimalDeck not defined in sandbox');
  }

  // findBestProvenDeck
  if (typeof sandbox.findBestProvenDeck === 'function') {
    console.log('Available proven decks:', JSON.stringify(sandbox.gameKnowledge.metaDecks.decks, null, 2));
    console.log('\n--- findBestProvenDeck function source ---\n', sandbox.findBestProvenDeck.toString());
    const provenDot = sandbox.findBestProvenDeck(['Mini P.E.K.K.A']);
    printResult('findBestProvenDeck(["Mini P.E.K.K.A"])', provenDot && provenDot.map ? provenDot.map(c => c.name) : provenDot);
    const provenNoDot = sandbox.findBestProvenDeck(['Mini PEKKA']);
    printResult('findBestProvenDeck(["Mini PEKKA"])', provenNoDot && provenNoDot.map ? provenNoDot.map(c => c.name) : provenNoDot);
    // Local check: replicate matching logic to verify deck contents
    const localCheck = (requested) => {
      const allProvenDecks = sandbox.gameKnowledge.metaDecks.decks || [];
      return allProvenDecks.filter(md => {
        const deckCards = md.cards || [];
        return requested.every(r => deckCards.some(dc => dc === r));
      });
    };
    printResult('local matching decks for ["Mini P.E.K.K.A"]', localCheck(['Mini P.E.K.K.A']).map(d=>d.name));
    printResult('local matching decks for ["Mini PEKKA"]', localCheck(['Mini PEKKA']).map(d=>d.name));
  } else {
    console.warn('findBestProvenDeck not defined in sandbox');
  }

  console.log('Smoke tests completed');
} catch (err) {
  console.error('Error during smoke tests:', err && err.stack ? err.stack : err);
  process.exit(3);
}
