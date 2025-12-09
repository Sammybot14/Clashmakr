// Clash Royale Cards Database
const cards = {
    // Win Conditions
    hogRider: { name: "Hog Rider", cost: 4, type: "Troop", icon: "🐗", category: "win-condition", tags: ["fast", "aggressive", "building-targeting"] },
    giant: { name: "Giant", cost: 5, type: "Troop", icon: "🗿", category: "win-condition", tags: ["tank", "beatdown", "building-targeting"] },
    golem: { name: "Golem", cost: 8, type: "Troop", icon: "🪨", category: "win-condition", tags: ["tank", "beatdown", "building-targeting", "heavy"] },
    royalGiant: { name: "Royal Giant", cost: 6, type: "Troop", icon: "👑", category: "win-condition", tags: ["ranged", "building-targeting"] },
    xBow: { name: "X-Bow", cost: 6, type: "Building", icon: "🏹", category: "win-condition", tags: ["siege", "defensive"] },
    balloon: { name: "Balloon", cost: 5, type: "Troop", icon: "🎈", category: "win-condition", tags: ["air", "building-targeting"] },
    miner: { name: "Miner", cost: 3, type: "Troop", icon: "⛏️", category: "win-condition", tags: ["cycle", "chip"] },
    ramRider: { name: "Ram Rider", cost: 5, type: "Troop", icon: "🐏", category: "win-condition", tags: ["building-targeting", "control"] },
    
    // Support Troops
    musketeer: { name: "Musketeer", cost: 4, type: "Troop", icon: "🔫", category: "support", tags: ["ranged", "anti-air"] },
    wizard: { name: "Wizard", cost: 5, type: "Troop", icon: "🧙", category: "support", tags: ["ranged", "splash", "anti-air"] },
    minions: { name: "Minions", cost: 3, type: "Troop", icon: "🦇", category: "support", tags: ["air", "fast", "cycle"] },
    megaMinion: { name: "Mega Minion", cost: 3, type: "Troop", icon: "🦇", category: "support", tags: ["air", "tanky"] },
    babyDragon: { name: "Baby Dragon", cost: 4, type: "Troop", icon: "🐲", category: "support", tags: ["air", "splash"] },
    electroWizard: { name: "Electro Wizard", cost: 4, type: "Troop", icon: "⚡", category: "support", tags: ["stun", "anti-air"] },
    iceWizard: { name: "Ice Wizard", cost: 3, type: "Troop", icon: "❄️", category: "support", tags: ["slow", "defensive"] },
    valkyrie: { name: "Valkyrie", cost: 4, type: "Troop", icon: "⚔️", category: "support", tags: ["splash", "tanky"] },
    knight: { name: "Knight", cost: 3, type: "Troop", icon: "🛡️", category: "support", tags: ["tanky", "cycle"] },
    
    // Spells
    fireball: { name: "Fireball", cost: 4, type: "Spell", icon: "🔥", category: "spell", tags: ["damage", "knockback"] },
    zap: { name: "Zap", cost: 2, type: "Spell", icon: "⚡", category: "spell", tags: ["stun", "cycle", "reset"] },
    log: { name: "The Log", cost: 2, type: "Spell", icon: "🪵", category: "spell", tags: ["knockback", "cycle"] },
    arrows: { name: "Arrows", cost: 3, type: "Spell", icon: "➡️", category: "spell", tags: ["anti-swarm"] },
    lightning: { name: "Lightning", cost: 6, type: "Spell", icon: "⚡", category: "spell", tags: ["heavy", "reset"] },
    rocket: { name: "Rocket", cost: 6, type: "Spell", icon: "🚀", category: "spell", tags: ["heavy", "chip"] },
    poison: { name: "Poison", cost: 4, type: "Spell", icon: "☠️", category: "spell", tags: ["slow", "area-denial"] },
    freeze: { name: "Freeze", cost: 4, type: "Spell", icon: "🧊", category: "spell", tags: ["stun", "combo"] },
    
    // Defensive Buildings
    cannon: { name: "Cannon", cost: 3, type: "Building", icon: "💥", category: "building", tags: ["defensive", "cycle"] },
    tesla: { name: "Tesla", cost: 4, type: "Building", icon: "🔋", category: "building", tags: ["defensive", "anti-air"] },
    inferno: { name: "Inferno Tower", cost: 5, type: "Building", icon: "🔥", category: "building", tags: ["tank-killer", "defensive"] },
    bombTower: { name: "Bomb Tower", cost: 4, type: "Building", icon: "💣", category: "building", tags: ["splash", "defensive"] },
    
    // Swarm/Cycle Cards
    skeletons: { name: "Skeletons", cost: 1, type: "Troop", icon: "💀", category: "cycle", tags: ["cycle", "distraction"] },
    iceSpirit: { name: "Ice Spirit", cost: 1, type: "Troop", icon: "❄️", category: "cycle", tags: ["cycle", "freeze"] },
    goblins: { name: "Goblins", cost: 2, type: "Troop", icon: "👺", category: "cycle", tags: ["fast", "cycle"] },
    spearGoblins: { name: "Spear Goblins", cost: 2, type: "Troop", icon: "🗡️", category: "cycle", tags: ["ranged", "cycle"] },
    skeletonArmy: { name: "Skeleton Army", cost: 3, type: "Troop", icon: "💀", category: "swarm", tags: ["swarm", "defensive"] },
    goblinGang: { name: "Goblin Gang", cost: 3, type: "Troop", icon: "👺", category: "swarm", tags: ["swarm", "versatile"] },
    
    // Tanks
    pekka: { name: "P.E.K.K.A", cost: 7, type: "Troop", icon: "🤖", category: "tank", tags: ["heavy", "tank-killer"] },
    megaKnight: { name: "Mega Knight", cost: 7, type: "Troop", icon: "👹", category: "tank", tags: ["splash", "heavy"] },
    prince: { name: "Prince", cost: 5, type: "Troop", icon: "🤴", category: "tank", tags: ["charge", "heavy"] },
    darkPrince: { name: "Dark Prince", cost: 4, type: "Troop", icon: "🖤", category: "tank", tags: ["charge", "splash"] },
};

// Deck archetypes and their characteristics
const archetypes = {
    aggressive: {
        winConditions: ["hogRider", "ramRider", "balloon", "miner"],
        support: ["musketeer", "valkyrie", "minions", "megaMinion"],
        spells: ["fireball", "zap", "log"],
        buildings: ["cannon", "tesla"],
        cycle: ["iceSpirit", "skeletons", "goblins"],
        avgElixir: 3.5
    },
    beatdown: {
        winConditions: ["golem", "giant", "royalGiant"],
        support: ["babyDragon", "wizard", "megaMinion", "electroWizard"],
        spells: ["lightning", "zap", "arrows"],
        buildings: [],
        cycle: ["skeletons", "goblins"],
        avgElixir: 4.2
    },
    cycle: {
        winConditions: ["miner", "hogRider"],
        support: ["musketeer", "knight", "iceWizard"],
        spells: ["fireball", "log", "poison"],
        buildings: ["cannon", "tesla"],
        cycle: ["skeletons", "iceSpirit", "goblins"],
        avgElixir: 2.8
    },
    defensive: {
        winConditions: ["royalGiant", "xBow", "miner"],
        support: ["musketeer", "valkyrie", "megaMinion", "iceWizard"],
        spells: ["fireball", "log", "arrows"],
        buildings: ["tesla", "inferno", "cannon"],
        cycle: ["skeletons", "iceSpirit"],
        avgElixir: 3.6
    },
    siege: {
        winConditions: ["xBow"],
        support: ["musketeer", "knight", "iceWizard", "electroWizard"],
        spells: ["fireball", "log", "arrows"],
        buildings: ["tesla", "cannon"],
        cycle: ["skeletons", "iceSpirit"],
        avgElixir: 3.3
    },
    spellHeavy: {
        winConditions: ["miner", "hogRider"],
        support: ["musketeer", "wizard", "valkyrie"],
        spells: ["fireball", "rocket", "lightning", "poison", "zap"],
        buildings: ["inferno"],
        cycle: ["skeletons"],
        avgElixir: 4.0
    }
};
