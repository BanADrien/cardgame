const BASE_IMAGE_PATH = '/cards/';

// Card Structure Definition
class Card {
    constructor(id, name, image, attack, health, effect, type = 'basic') {
        this.id = id;
        this.name = name;
        this.image = getImagePath(image);
        this.attack = attack;
        this.health = health;
        this.effect = effect;
        this.type = type; // 'master', 'location', 'basic'
    }

    // Generate HTML for card display
    createCardHTML() {
        return `
            <div class="card-frame ${this.type}-card">
                <div class="card-image">
                    <img src="${this.image}" alt="${this.name}" onerror="this.src='${BASE_IMAGE_PATH}placeholder.jpg'">
                    <div class="card-glow"></div>
                </div>
                <div class="card-header">
                    <h3 class="card-title">${this.name}</h3>
                </div>
                <div class="card-info">
                    <div class="card-effect">
                        <p>${this.effect}</p>
                    </div>
                    <div class="card-stats">
                        <div class="attack-stat">
                            <div class="attack-icon"></div>
                            <span class="attack-value">${this.attack}</span>
                        </div>
                        <div class="health-stat">
                            <span class="health-value">${this.health}</span>
                            <div class="health-icon"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Master Card extends base Card with location and basic cards
class MasterCard extends Card {
    constructor(id, name, image, attack, health, effect, locationCard, basicCards) {
        super(id, name, image, attack, health, effect, 'master');
        this.locationCard = locationCard;
        this.basicCards = basicCards;
    }
}

// Location Card variant
class LocationCard extends Card {
    constructor(id, name, image, effect) {
        // Location cards have no attack/health stats
        super(id, name, image, "-", "-", effect, 'location');
    }

    // Override the card HTML for locations
    createCardHTML() {
        return `
            <div class="card-frame ${this.type}-card">
                <div class="card-image">
                    <img src="${this.image}" alt="${this.name}" onerror="this.src='${BASE_IMAGE_PATH}placeholder.jpg'">
                    <div class="card-glow"></div>
                </div>
                <div class="card-header">
                    <h3 class="card-title">${this.name}</h3>
                </div>
                <div class="card-info">
                    <div class="card-effect location-effect">
                        <p>${this.effect}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Helper function to get correct image path
function getImagePath(imageName) {
    // Check if the path already starts with the base path
    if (imageName.startsWith(BASE_IMAGE_PATH) || imageName.startsWith('./') || imageName.startsWith('/')) {
        return imageName;
    }
    
    // Otherwise, prepend the base path
    return BASE_IMAGE_PATH + imageName;
}// Deck definitions
const DECKS = [
    {
        id: 'dragon',
        name: 'Dragon',
        image: getImagePath('dragon/dragon1.jpg'),
        masterCards: [
            new MasterCard(
                'dragon-lord',
                'Dragon Lord',
                'dragon/dragon1.jpg',
                8,
                10,
                'When played, all your dragon cards gain +1 Attack until the end of your turn.',
                new LocationCard(
                    'dragon-lair',
                    'Dragon Lair',
                    'dragon/lieux.jpg',
                    'Your dragons cost 1 less to play. Enemy spells cost 1 more.'
                ),
                [
                    new Card('fire-drake', 'Fire Drake', 'dragon/fire-drake.jpg', 5, 4, 'Deal 2 damage to an enemy when this card enters play.'),
                    new Card('wyvern', 'Wyvern', 'dragon/wyvern.jpg', 3, 6, 'Flying: This card can attack in any lane.'),
                    new Card('dragon-egg', 'Dragon Egg', 'dragon/dragon-egg.jpg', 0, 3, 'After 2 turns, transforms into a Fire Drake.'),
                    new Card('scaled-defender', 'Scaled Defender', 'dragon/scaled-defender.jpg', 2, 7, 'Taunt: Enemy cards must attack this card first.'),
                    new Card('dragon-breath', 'Dragon Breath', 'dragon/dragon-breath.jpg', 4, 2, 'When this card is destroyed, deal 1 damage to all enemy cards.')
                ]
            ),
            new MasterCard(
                'elder-dragon',
                'Elder Dragon',
                'dragon/dragon3.jpg',
                10,
                12,
                'At the start of your turn, restore 2 health to all your dragon cards.',
                new LocationCard(
                    'ancient-volcano',
                    'Ancient Volcano',
                    'dragon/ancient-volcano.jpg',
                    'At the end of each turn, deal 1 damage to all non-dragon cards.'
                ),
                [
                    new Card('lava-spawn', 'Lava Spawn', 'dragon/lava-spawn.jpg', 3, 3, 'Receives double damage from water spells.'),
                    new Card('flame-guardian', 'Flame Guardian', 'dragon/flame-guardian.jpg', 4, 5, 'Immune to fire damage.'),
                    new Card('ash-phoenix', 'Ash Phoenix', 'dragon/ash-phoenix.jpg', 2, 2, 'When this card is destroyed, it returns to play with 1 health.'),
                    new Card('molten-scales', 'Molten Scales', 'dragon/molten-scales.jpg', 1, 8, 'Reflects spell damage back to the caster.'),
                    new Card('inferno-blast', 'Inferno Blast', 'dragon/inferno-blast.jpg', 6, 3, 'Cannot attack the turn it is played.')
                ]
            ),
            new MasterCard(
                'frost-dragon',
                'Frost Dragon',
                'dragon/dragon4.jpg',
                7,
                9,
                'Freezes any card that damages it for 1 turn.',
                new LocationCard(
                    'frozen-peaks',
                    'Frozen Peaks',
                    'dragon/frozen-peaks.jpg',
                    'All non-ice cards have -1 Attack while this location is active.'
                ),
                [
                    new Card('ice-whelp', 'Ice Whelp', 'dragon/ice-whelp.jpg', 2, 3, 'When played, freeze an enemy card for 1 turn.'),
                    new Card('snow-drake', 'Snow Drake', 'dragon/snow-drake.jpg', 4, 4, 'Immune to freeze effects.'),
                    new Card('frost-wyrm', 'Frost Wyrm', 'dragon/frost-wyrm.jpg', 5, 6, 'Enemy cards that attack this card have their Attack reduced by 1.'),
                    new Card('blizzard-scales', 'Blizzard Scales', 'dragon/blizzard-scales.jpg', 3, 5, 'At the end of your turn, deal 1 damage to all frozen cards.'),
                    new Card('freezing-breath', 'Freezing Breath', 'dragon/freezing-breath.jpg', 3, 3, '50% chance to freeze any card that attacks this card.')
                ]
            )
        ]
    },
    {
        id: 'undead',
        name: 'Undead',
        image: getImagePath('undead/undead-deck.jpg'),
        masterCards: [
            new MasterCard(
                'lich-king',
                'Lich King',
                'undead/lich-king.jpg',
                7,
                8,
                'When any card is destroyed, gain +1 Attack until the end of your turn.',
                new LocationCard(
                    'cursed-throne',
                    'Cursed Throne',
                    'undead/cursed-throne.jpg',
                    'When your undead cards are destroyed, they return to your hand with 1 Health.'
                ),
                [
                    new Card('skeleton-warrior', 'Skeleton Warrior', 'undead/skeleton-warrior.jpg', 3, 2, 'Costs 1 less for each ally destroyed this game.'),
                    new Card('zombie-horde', 'Zombie Horde', 'undead/zombie-horde.jpg', 2, 6, 'When damaged, split into two 1/3 Zombies.'),
                    new Card('ghost-knight', 'Ghost Knight', 'undead/ghost-knight.jpg', 4, 3, 'Ignores Taunt. Can attack any enemy card.'),
                    new Card('soul-harvester', 'Soul Harvester', 'undead/soul-harvester.jpg', 2, 4, 'Whenever a card is destroyed, gain +1 Health.'),
                    new Card('death-magic', 'Death Magic', 'undead/death-magic.jpg', 5, 1, 'When this card attacks, heal your Master Card for the same amount.')
                ]
            ),
            new MasterCard(
                'necromancer',
                'Necromancer',
                'undead/necromancer.jpg',
                5,
                9,
                'Once per turn, resurrect a destroyed basic card with 1 Health.',
                new LocationCard(
                    'ancient-crypt',
                    'Ancient Crypt',
                    'undead/ancient-crypt.jpg',
                    'All undead cards gain +1/+1. Living cards lose -1/-1.'
                ),
                [
                    new Card('bone-collector', 'Bone Collector', 'undead/bone-collector.jpg', 2, 3, 'Gains +1/+1 for each ally destroyed this turn.'),
                    new Card('spirit-wraith', 'Spirit Wraith', 'undead/spirit-wraith.jpg', 4, 2, 'Cannot be targeted by spells or abilities.'),
                    new Card('grave-golem', 'Grave Golem', 'undead/grave-golem.jpg', 3, 7, 'Taunt. Gains +1 Attack for each enemy card destroyed.'),
                    new Card('banshee', 'Banshee', 'undead/banshee.jpg', 5, 3, 'When played, silence an enemy card (remove its effects).'),
                    new Card('reanimation', 'Reanimation', 'undead/reanimation.jpg', 1, 1, 'When destroyed, add two 1/1 Skeletons to your hand.')
                ]
            )
        ]
    }
];

// Function to get a deck by ID
function getDeckById(deckId) {
    return DECKS.find(deck => deck.id === deckId);
}

// Function to get a master card by ID within a specific deck
function getMasterCardById(deckId, cardId) {
    const deck = getDeckById(deckId);
    if (!deck) return null;
    
    return deck.masterCards.find(card => card.id === cardId);
}

// Export card definitions and functions
export {
    DECKS,
    Card,
    MasterCard,
    LocationCard,
    getDeckById,
    getMasterCardById
};