# Clashmakr ⚔️

An AI-powered Clash Royale deck builder that generates custom decks based on natural language descriptions.

## Features

- 🎯 **Natural Language Input**: Describe what kind of deck you want in plain English
- 🃏 **40+ Clash Royale Cards**: Extensive card database with troops, spells, and buildings
- 🎮 **6 Deck Archetypes**: Aggressive, Beatdown, Cycle, Defensive, Siege, and Spell-Heavy
- 📊 **Deck Statistics**: See average elixir cost and card type breakdown
- 💡 **Strategy Guides**: Get gameplay tips for each generated deck
- 🎨 **Beautiful UI**: Modern, responsive design with gradient backgrounds

## How to Use

1. Open `index.html` in a web browser
2. Type what kind of deck you want (e.g., "aggressive deck with hog rider", "defensive deck", "spell-heavy deck")
3. Click "Generate Deck" or press Enter
4. View your custom deck with statistics and strategy guide

### Example Requests

- "I want an aggressive deck with hog rider"
- "Give me a defensive deck"
- "Create a deck with lots of spells"
- "Beatdown deck with golem"
- "Fast cycle deck"

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and layout
- `cards.js` - Card database and archetype definitions
- `deck-builder.js` - Deck generation logic

## Technologies

- Pure HTML5, CSS3, and JavaScript (no dependencies)
- Responsive design for mobile and desktop
- Client-side only (no server required)

## Running Locally

Simply open `index.html` in any modern web browser, or use a local server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000`

## License

MIT License - Feel free to use and modify!
