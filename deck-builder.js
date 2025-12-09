// Deck Builder Logic

function setExample(text) {
    document.getElementById('deckRequest').value = text;
}

function analyzeRequest(request) {
    const lower = request.toLowerCase();
    
    // Detect archetype
    let archetype = 'aggressive'; // default
    
    if (lower.includes('spell') || lower.includes('rocket') || lower.includes('lightning')) {
        archetype = 'spellHeavy';
    } else if (lower.includes('defensive') || lower.includes('defense')) {
        archetype = 'defensive';
    } else if (lower.includes('beatdown') || lower.includes('heavy') || lower.includes('golem') || lower.includes('giant')) {
        archetype = 'beatdown';
    } else if (lower.includes('cycle') || lower.includes('fast') || lower.includes('quick')) {
        archetype = 'cycle';
    } else if (lower.includes('siege') || lower.includes('x-bow') || lower.includes('xbow')) {
        archetype = 'siege';
    } else if (lower.includes('aggressive') || lower.includes('attack') || lower.includes('hog') || lower.includes('balloon')) {
        archetype = 'aggressive';
    }
    
    // Detect specific card requests
    const requestedCards = [];
    for (const [key, card] of Object.entries(cards)) {
        if (lower.includes(card.name.toLowerCase())) {
            requestedCards.push(key);
        }
    }
    
    return { archetype, requestedCards };
}

function generateDeck() {
    const request = document.getElementById('deckRequest').value.trim();
    
    if (!request) {
        alert('Please describe what kind of deck you want!');
        return;
    }
    
    const analysis = analyzeRequest(request);
    const deck = buildDeck(analysis);
    
    displayDeck(deck, analysis.archetype, request);
}

function buildDeck(analysis) {
    const { archetype, requestedCards } = analysis;
    const template = archetypes[archetype];
    const deck = [];
    const usedCards = new Set();
    
    // Add requested cards first
    for (const cardKey of requestedCards) {
        if (deck.length < 8) {
            deck.push(cardKey);
            usedCards.add(cardKey);
        }
    }
    
    // Fill remaining slots based on archetype
    // 1. Add win condition if not present
    if (!deck.some(key => cards[key] && cards[key].category === 'win-condition')) {
        const winCond = getRandomFromArray(template.winConditions.filter(c => !usedCards.has(c)));
        if (winCond) {
            deck.push(winCond);
            usedCards.add(winCond);
        }
    }
    
    // 2. Add spells (usually 2)
    const spellsNeeded = archetype === 'spellHeavy' ? 3 : 2;
    let spellsAdded = deck.filter(key => cards[key] && cards[key].type === 'Spell').length;
    while (spellsAdded < spellsNeeded && deck.length < 8) {
        const spell = getRandomFromArray(template.spells.filter(c => !usedCards.has(c)));
        if (spell) {
            deck.push(spell);
            usedCards.add(spell);
            spellsAdded++;
        } else {
            break;
        }
    }
    
    // 3. Add building if archetype uses one
    if (template.buildings.length > 0 && !deck.some(key => cards[key] && cards[key].type === 'Building')) {
        const building = getRandomFromArray(template.buildings.filter(c => !usedCards.has(c)));
        if (building && deck.length < 8) {
            deck.push(building);
            usedCards.add(building);
        }
    }
    
    // 4. Add support troops
    while (deck.length < 8) {
        const support = getRandomFromArray(template.support.filter(c => !usedCards.has(c)));
        if (support) {
            deck.push(support);
            usedCards.add(support);
        } else {
            break;
        }
    }
    
    // 5. Add cycle cards to fill remaining slots
    while (deck.length < 8) {
        const cycle = getRandomFromArray(template.cycle.filter(c => !usedCards.has(c)));
        if (cycle) {
            deck.push(cycle);
            usedCards.add(cycle);
        } else {
            // If we run out of template cards, add any card
            const allCards = Object.keys(cards).filter(c => !usedCards.has(c));
            const anyCard = getRandomFromArray(allCards);
            if (anyCard) {
                deck.push(anyCard);
                usedCards.add(anyCard);
            } else {
                break;
            }
        }
    }
    
    return deck;
}

function getRandomFromArray(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

function displayDeck(deckKeys, archetype, request) {
    const deckSection = document.getElementById('deckSection');
    const deckDescription = document.getElementById('deckDescription');
    const deckCards = document.getElementById('deckCards');
    const deckStats = document.getElementById('deckStats');
    const deckStrategy = document.getElementById('deckStrategy');
    
    // Show section
    deckSection.style.display = 'block';
    
    // Description
    const archetypeNames = {
        aggressive: 'Aggressive',
        beatdown: 'Beatdown',
        cycle: 'Cycle',
        defensive: 'Defensive',
        siege: 'Siege',
        spellHeavy: 'Spell-Heavy'
    };
    
    deckDescription.innerHTML = `
        <h3>🎯 ${archetypeNames[archetype]} Deck</h3>
        <p>Generated based on your request: "<em>${request}</em>"</p>
    `;
    
    // Display cards
    deckCards.innerHTML = '';
    let totalElixir = 0;
    const cardsByType = { Troop: 0, Spell: 0, Building: 0 };
    
    deckKeys.forEach(key => {
        const card = cards[key];
        if (!card) return; // Skip if card doesn't exist
        
        totalElixir += card.cost;
        cardsByType[card.type]++;
        
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <div class="card-icon">${card.icon}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-cost">${card.cost} ⚡</div>
            <div class="card-type">${card.type}</div>
        `;
        deckCards.appendChild(cardDiv);
    });
    
    // Stats
    const avgElixir = (totalElixir / 8).toFixed(1);
    deckStats.innerHTML = `
        <h3>📊 Deck Statistics</h3>
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-label">Avg Elixir</div>
                <div class="stat-value">${avgElixir}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Troops</div>
                <div class="stat-value">${cardsByType.Troop}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Spells</div>
                <div class="stat-value">${cardsByType.Spell}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Buildings</div>
                <div class="stat-value">${cardsByType.Building}</div>
            </div>
        </div>
    `;
    
    // Strategy
    const strategies = {
        aggressive: "Focus on quick, aggressive pushes with your win condition. Use your cheap cards to cycle and defend efficiently. Apply pressure constantly to keep your opponent on the defensive.",
        beatdown: "Build large pushes behind your tank. Defend and build elixir advantage during single elixir, then make massive pushes in double elixir. Support your tank with splash damage and anti-air troops.",
        cycle: "Cycle your cards quickly to outcycle your opponent's counters. Play defensively and chip away at their tower. Use your cheap cards to gain elixir advantages on defense.",
        defensive: "Play solid defense and counter-push with surviving troops. Make positive elixir trades on defense, then punish your opponent when they're low on elixir.",
        siege: "Place your win condition at the bridge and defend it with buildings and troops. Control the tempo of the match and don't overcommit on offense.",
        spellHeavy: "Use spells for chip damage and to support your pushes. Get value from your spells by hitting multiple targets. Finish the game with spell cycle if needed."
    };
    
    deckStrategy.innerHTML = `
        <h3>🎮 Strategy Guide</h3>
        <p>${strategies[archetype]}</p>
    `;
    
    // Scroll to deck
    deckSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Allow Enter key to generate
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('deckRequest');
    textarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateDeck();
        }
    });
});
