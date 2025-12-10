// Professional Deck Builder Enhancement Module
// Inspired by DeckShop.pro, StatsRoyale, RoyaleAPI

// Advanced Deck Analysis Engine
const deckAnalysisEngine = {
    // Card synergy database (inspired by DeckShop.pro)
    synergies: {
        'Hog Rider': ['Earthquake', 'Fireball', 'Freeze', 'Ice Spirit', 'Skeletons', 'Ice Golem', 'Cannon', 'Musketeer'],
        'Balloon': ['Lava Hound', 'Freeze', 'Arrows', 'Mega Minion', 'Skeleton Dragons', 'Lumberjack', 'Miner'],
        'Golem': ['Night Witch', 'Baby Dragon', 'Lightning', 'Tornado', 'Lumberjack', 'Mega Minion'],
        'X-Bow': ['Tesla', 'Archers', 'Ice Spirit', 'Skeletons', 'Knight', 'Fireball', 'The Log'],
        'Graveyard': ['Freeze', 'Poison', 'Knight', 'Barbarian Barrel', 'Ice Wizard', 'Tornado', 'Baby Dragon'],
        'Miner': ['Poison', 'Bats', 'Spear Goblins', 'Wall Breakers', 'Skeleton Army', 'Goblin Gang'],
        'Royal Giant': ['Lightning', 'Fisherman', 'Hunter', 'Earthquake', 'Fire Spirit', 'Mother Witch'],
        'Giant': ['Graveyard', 'Sparky', 'Mini P.E.K.K.A', 'Musketeer', 'Electro Wizard', 'Zap'],
        'Pekka': ['Battle Ram', 'Bandit', 'Magic Archer', 'Electro Wizard', 'Poison', 'Zap', 'Dark Prince'],
        'Lava Hound': ['Balloon', 'Mega Minion', 'Skeleton Dragons', 'Fireball', 'Arrows', 'Tombstone'],
        'Three Musketeers': ['Battle Ram', 'Elixir Collector', 'Ice Golem', 'Heal Spirit', 'Bandit'],
        'Mortar': ['Skeleton King', 'Archers', 'Knight', 'Skeletons', 'Arrows', 'The Log', 'Spear Goblins'],
        'Goblin Barrel': ['Princess', 'Rocket', 'Knight', 'Goblin Gang', 'Inferno Tower', 'The Log', 'Ice Spirit'],
        'Sparky': ['Giant', 'Goblin Gang', 'Zap', 'Tornado', 'Electro Wizard', 'Dark Prince']
    },

    // Counter relationships (inspired by RoyaleAPI)
    counters: {
        'Mega Knight': ['P.E.K.K.A', 'Mini P.E.K.K.A', 'Knight', 'Valkyrie', 'Prince', 'Inferno Dragon', 'Inferno Tower'],
        'Balloon': ['Mega Minion', 'Musketeer', 'Wizard', 'Inferno Dragon', 'Bats', 'Minions', 'Electro Wizard'],
        'Hog Rider': ['Cannon', 'Tesla', 'Mini P.E.K.K.A', 'Skeleton Army', 'Tombstone', 'Goblin Cage'],
        'Golem': ['Inferno Tower', 'Inferno Dragon', 'P.E.K.K.A', 'Mini P.E.K.K.A', 'Skeleton Army'],
        'Sparky': ['Electro Wizard', 'Zap', 'Lightning', 'Rocket', 'Electro Spirit'],
        'X-Bow': ['Earthquake', 'Lightning', 'Mega Knight', 'Royal Giant', 'Rocket'],
        'Elite Barbarians': ['Skeleton Army', 'Guards', 'Valkyrie', 'Bowler', 'Mega Knight'],
        'Witch': ['Valkyrie', 'Dark Prince', 'Poison', 'Fireball + small spell'],
        'Wizard': ['Lightning', 'Fireball', 'Rocket', 'Mini P.E.K.K.A'],
        'Three Musketeers': ['Fireball', 'Lightning', 'Rocket', 'Poison', 'Mega Knight'],
        'Goblin Barrel': ['The Log', 'Zap', 'Arrows', 'Barbarian Barrel', 'Snowball'],
        'Graveyard': ['Poison', 'Valkyrie', 'Wizard', 'Bomber', 'Arrows'],
        'Skeleton Army': ['The Log', 'Zap', 'Arrows', 'Barbarian Barrel', 'Fire Spirit', 'Electro Spirit']
    },

    // Archetype definitions
    archetypes: {
        cycle: { 
            avgElixir: [2.4, 3.2], 
            required: ['wincon', 'building'], 
            recommended: ['cheap spell', 'cycle card'],
            description: 'Fast cycling deck that overwhelms opponent by quickly returning to win condition'
        },
        beatdown: { 
            avgElixir: [4.0, 5.0], 
            required: ['tank', 'support'], 
            recommended: ['heavy spell', 'swarm clear'],
            description: 'Build massive pushes behind tank, overwhelm with combined firepower'
        },
        bridgespam: { 
            avgElixir: [3.5, 4.2], 
            required: ['fast unit', 'medium spell'], 
            recommended: ['dual threats'],
            description: 'Apply relentless pressure both lanes, force opponent to split elixir'
        },
        control: { 
            avgElixir: [3.0, 3.8], 
            required: ['defensive building', 'spell'], 
            recommended: ['versatile troops'],
            description: 'Defend efficiently, chip damage with Miner or spell cycle'
        },
        bait: { 
            avgElixir: [2.9, 3.5], 
            required: ['bait cards', 'spell'], 
            recommended: ['multiple targets for same spell'],
            description: 'Bait opponent spells, then punish with unbaitied threats'
        },
        siege: { 
            avgElixir: [2.8, 3.5], 
            required: ['siege building', 'defensive cards'], 
            recommended: ['cycle cards'],
            description: 'Lock siege building on tower, defend all counterattacks'
        }
    },

    // Analyze deck composition
    analyzeDeckComposition(deck) {
        if (!deck || deck.length === 0) return null;

        const composition = {
            winConditions: [],
            spells: [],
            buildings: [],
            tanks: [],
            antiAir: [],
            swarm: [],
            splash: [],
            cycleCards: [],
            avgElixir: 0,
            totalElixir: 0
        };

        deck.forEach(card => {
            if (!card) return;

            composition.totalElixir += card.elixir;

            if (card.role === 'wincon') composition.winConditions.push(card.name);
            if (card.type === 'spell') composition.spells.push(card.name);
            if (card.type === 'building') composition.buildings.push(card.name);
            if (card.role === 'tank') composition.tanks.push(card.name);
            if (card.targetType === 'both' || card.targetType === 'air') composition.antiAir.push(card.name);
            if (card.role === 'swarm') composition.swarm.push(card.name);
            if (card.role === 'splash') composition.splash.push(card.name);
            if (card.elixir <= 2) composition.cycleCards.push(card.name);
        });

        composition.avgElixir = deck.length > 0 ? (composition.totalElixir / deck.length).toFixed(1) : 0;

        return composition;
    },

    // Determine deck archetype
    identifyArchetype(deck, composition) {
        if (!composition) return 'Unknown';

        const avgElixir = parseFloat(composition.avgElixir);

        // Siege check
        if (deck.some(c => c && (c.name === 'X-Bow' || c.name === 'Mortar'))) {
            return 'Siege';
        }

        // Bait check
        const baitCards = ['Goblin Barrel', 'Princess', 'Goblin Gang', 'Skeleton Army'];
        const baitCount = deck.filter(c => c && baitCards.includes(c.name)).length;
        if (baitCount >= 3) return 'Bait';

        // Cycle check
        if (avgElixir <= 3.2 && composition.cycleCards.length >= 4) {
            return 'Cycle';
        }

        // Beatdown check
        const beatdownTanks = ['Golem', 'Lava Hound', 'Elixir Golem', 'Three Musketeers'];
        if (deck.some(c => c && beatdownTanks.includes(c.name))) {
            return 'Beatdown';
        }

        // Bridge Spam check
        const spamCards = ['Battle Ram', 'Bandit', 'Dark Prince', 'Ram Rider', 'Royal Hogs'];
        const spamCount = deck.filter(c => c && spamCards.includes(c.name)).length;
        if (spamCount >= 2 && avgElixir <= 4.2) return 'Bridge Spam';

        // Control check
        if (composition.buildings.length >= 1 && composition.spells.length >= 2) {
            return 'Control';
        }

        // Default to midrange
        if (avgElixir >= 3.3 && avgElixir <= 4.0) return 'Midrange';

        return 'Hybrid';
    },

    // Find card synergies in deck
    findDeckSynergies(deck) {
        const synergies = [];
        
        for (let i = 0; i < deck.length; i++) {
            if (!deck[i]) continue;
            
            for (let j = i + 1; j < deck.length; j++) {
                if (!deck[j]) continue;

                const card1 = deck[i].name;
                const card2 = deck[j].name;

                // Check if cards synergize
                if (this.synergies[card1]?.includes(card2) || this.synergies[card2]?.includes(card1)) {
                    synergies.push({
                        cards: [card1, card2],
                        type: this.getSynergyType(card1, card2),
                        strength: 'Strong'
                    });
                }
            }
        }

        return synergies;
    },

    getSynergyType(card1, card2) {
        const combos = {
            'Hog Rider+Earthquake': 'Building Destroyer',
            'Balloon+Lava Hound': 'Air Beatdown',
            'Balloon+Freeze': 'Freeze Combo',
            'Miner+Poison': 'Chip Control',
            'Goblin Barrel+Princess': 'Log Bait',
            'X-Bow+Tesla': 'Defensive Lock',
            'Golem+Night Witch': 'Death Damage',
            'Pekka+Battle Ram': 'Dual Threat',
            'Graveyard+Freeze': 'Spell Combo',
            'Royal Giant+Lightning': 'Building Clear'
        };

        const key1 = `${card1}+${card2}`;
        const key2 = `${card2}+${card1}`;

        return combos[key1] || combos[key2] || 'Support';
    },

    // Predict matchups
    predictMatchups(deck, composition) {
        const archetype = this.identifyArchetype(deck, composition);
        
        const matchups = {
            'Cycle': {
                good: ['Beatdown', 'Heavy decks', 'Golem', 'Lava'],
                bad: ['Earthquake decks', 'Spell cycle', 'Fast beatdown'],
                description: 'Strong vs slow decks, weak vs building destruction'
            },
            'Beatdown': {
                good: ['Siege', 'Light cycle', 'Chip decks'],
                bad: ['Inferno decks', 'Tank killers', 'Heavy spells'],
                description: 'Overwhelms light defenses, struggles vs high DPS'
            },
            'Bridge Spam': {
                good: ['Beatdown', 'Slow decks', 'Elixir Collector'],
                bad: ['Splash units', 'Swarm', 'Valkyrie decks'],
                description: 'Punishes slow plays, vulnerable to area damage'
            },
            'Bait': {
                good: ['One spell decks', 'Log only', 'Heavy decks'],
                bad: ['Multi-spell', 'Triple spell', 'Arrows+Log'],
                description: 'Dominates single spell, destroyed by spell variety'
            },
            'Siege': {
                good: ['No tank decks', 'Light cycle', 'Spell bait'],
                bad: ['Earthquake', 'Lightning', 'Rocket', 'Mega Knight'],
                description: 'Controls vs cycle, destroyed by building counters'
            },
            'Control': {
                good: ['Beatdown', 'Bridge spam', 'Aggressive decks'],
                bad: ['Spell cycle', 'Rocket decks', 'Siege'],
                description: 'Defends everything, struggles vs passive play'
            }
        };

        return matchups[archetype] || {
            good: ['Depends on execution'],
            bad: ['Depends on opponent'],
            description: 'Matchups vary based on player skill'
        };
    },

    // Check for critical problems
    findCriticalProblems(deck, composition) {
        const problems = [];

        if (composition.winConditions.length === 0) {
            problems.push({
                severity: 'critical',
                issue: 'No Win Condition',
                description: 'Deck has no reliable way to damage towers',
                fix: 'Add Hog Rider, Balloon, Royal Giant, Miner, or similar'
            });
        }

        if (composition.spells.length === 0) {
            problems.push({
                severity: 'critical',
                issue: 'No Spells',
                description: 'Cannot deal with swarms or finish low-health towers',
                fix: 'Add Fireball, Zap, Log, Arrows, or Poison'
            });
        }

        if (composition.antiAir.length === 0) {
            problems.push({
                severity: 'critical',
                issue: 'No Air Defense',
                description: 'Helpless against Balloon, Lava Hound, Minions',
                fix: 'Add Mega Minion, Musketeer, Wizard, Arrows, or similar'
            });
        }

        if (composition.winConditions.length > 3) {
            problems.push({
                severity: 'warning',
                issue: 'Too Many Win Conditions',
                description: 'Deck lacks defensive support',
                fix: 'Replace one win condition with defensive card'
            });
        }

        if (parseFloat(composition.avgElixir) > 4.5) {
            problems.push({
                severity: 'warning',
                issue: 'Too Heavy',
                description: 'Will struggle to defend and cycle',
                fix: 'Replace heavy cards with cheaper alternatives'
            });
        }

        if (parseFloat(composition.avgElixir) < 2.8) {
            problems.push({
                severity: 'warning',
                issue: 'Too Light',
                description: 'May lack stopping power vs tanks',
                fix: 'Add a medium-cost defensive card'
            });
        }

        if (composition.splash.length === 0 && composition.spells.length < 2) {
            problems.push({
                severity: 'warning',
                issue: 'Weak vs Swarms',
                description: 'No area damage to stop Skeleton Army, Goblin Gang',
                fix: 'Add Valkyrie, Wizard, or area damage spell'
            });
        }

        return problems;
    },

    // Generate pro player recommendations
    getProPlayerRecommendations(deck, archetype) {
        const proDecks = {
            'Cycle': {
                players: ['Oyassuu', 'Mohamed Light', 'Lucas XGamer'],
                tips: 'Perfect elixir counting, minimal defensive investment, constant pressure'
            },
            'Beatdown': {
                players: ['JackSparrow', 'Boss CR', 'Denisito'],
                tips: 'Build elixir advantage, support pushes heavily, sacrifice tower damage for elixir trades'
            },
            'Bridge Spam': {
                players: ['Morten', 'Ian77', 'Sergio Ramos'],
                tips: 'Punish every elixir commit, dual lane pressure, never let opponent build'
            },
            'Bait': {
                players: ['Javi LC', 'Surgical Goblin', 'B-Rad'],
                tips: 'Track opponent spells, vary Barrel placement, defend with swarms'
            },
            'Siege': {
                players: ['Lemontree68', 'BestNA', 'Jack'],
                tips: 'Lock when opponent low elixir, perfect defensive placements, spell cycle finish'
            },
            'Control': {
                players: ['Mugi', 'AzliNR', 'Yossi'],
                tips: 'Make positive trades, patience is key, spell cycle for wins'
            }
        };

        return proDecks[archetype] || {
            players: ['Various Top Players'],
            tips: 'Focus on elixir advantage, adapt to opponent, practice placement'
        };
    },

    // Calculate predicted win rate based on composition
    predictWinRate(deck, composition, problems) {
        let baseRate = 50;

        // Win condition bonus
        if (composition.winConditions.length === 1) baseRate += 5;
        if (composition.winConditions.length === 2) baseRate += 8;
        if (composition.winConditions.length >= 3) baseRate -= 5;

        // Spell bonus
        if (composition.spells.length >= 2) baseRate += 5;
        if (composition.spells.length === 0) baseRate -= 15;

        // Anti-air bonus
        if (composition.antiAir.length >= 2) baseRate += 5;
        if (composition.antiAir.length === 0) baseRate -= 20;

        // Elixir optimization
        const avgElixir = parseFloat(composition.avgElixir);
        if (avgElixir >= 3.0 && avgElixir <= 4.2) baseRate += 10;
        if (avgElixir > 5.0 || avgElixir < 2.5) baseRate -= 10;

        // Building bonus
        if (composition.buildings.length >= 1) baseRate += 5;

        // Critical problems penalty
        problems.forEach(p => {
            if (p.severity === 'critical') baseRate -= 15;
            if (p.severity === 'warning') baseRate -= 5;
        });

        // Ensure rate is in valid range
        return Math.max(30, Math.min(70, baseRate));
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = deckAnalysisEngine;
}
