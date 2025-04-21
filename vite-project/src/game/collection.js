// collection.js - Card Collection Interface

// Import card definitions
import { DECKS, getDeckById, getMasterCardById } from './cards.js';

// DOM Elements and State Management
let currentDeck = null;
let currentMasterCard = null;

// Collection Interface Initialization
function initializeCollection() {
    createCollectionInterface();
    loadDecks();
    setupEventListeners();
}
function createCollectionInterface() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="collection-container full-width">
            <div class="collection-header">
                <h1>Card Collection</h1>
                <button id="back-to-menu" class="navigation-button">Return to Menu</button>
            </div>
            
            <div class="deck-selection">
                <h2>Your Decks</h2>
                <div id="deck-list" class="deck-list"></div>
            </div>
            
            <div class="deck-viewer hidden">
                <div class="deck-header">
                    <h2 id="deck-name">Deck Name</h2>
                    <button id="back-to-decks" class="navigation-button">Back to Decks</button>
                </div>
                
                <div class="master-cards-container">
                    <h3>Master Cards</h3>
                    <div id="master-cards" class="card-grid"></div>
                </div>
                
                <div class="master-card-details hidden">
                    <div class="master-card-header">
                        <h3 id="master-card-name">Master Card Name</h3>
                        <button id="back-to-masters" class="navigation-button">Back to Masters</button>
                    </div>
                    
                    <div class="cards-showcase">
                        <div class="showcase-section">
                            <h4>Master Card</h4>
                            <div id="selected-master"></div>
                        </div>
                        
                        <div class="showcase-section">
                            <h4>Location Card</h4>
                            <div id="location-card"></div>
                        </div>
                        
                        <div class="showcase-section">
                            <h4>Basic Cards</h4>
                            <div id="basic-cards" class="basic-cards-grid"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // S'assurer que le conteneur parent occupe également toute la largeur
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100%';
    document.body.style.overflow = 'hidden';
    
    // Appliquer des styles en ligne pour forcer la pleine largeur
    const collectionContainer = document.querySelector('.collection-container');
    collectionContainer.style.maxWidth = '100%';
    collectionContainer.style.width = '100vw';
    collectionContainer.style.boxSizing = 'border-box';
    collectionContainer.style.margin = '0';
    collectionContainer.style.padding = '20px';
}

// Load Deck Data
function loadDecks() {
    renderDeckList(DECKS);
}

// Render Deck List
function renderDeckList(decks) {
    const deckListElement = document.getElementById('deck-list');
    deckListElement.innerHTML = '';
    
    decks.forEach(deck => {
        const deckElement = document.createElement('div');
        deckElement.classList.add('deck-item');
        deckElement.dataset.deckId = deck.id;
        
        deckElement.innerHTML = `
            <div class="deck-image">
                <img src="${deck.image}" alt="${deck.name}" onerror="this.src='/cards/dragon/placeholder.jpg'">
            </div>
            <div class="deck-info">
                <h3>${deck.name}</h3>
                <p>${deck.masterCards.length} Master Cards</p>
            </div>
        `;
        
        deckListElement.appendChild(deckElement);
        
        // Add click event
        deckElement.addEventListener('click', () => {
            currentDeck = deck;
            showDeckDetails(deck);
        });
    });
    
    // Add particle effects to deck items
    addParticleEffectsToDeckItems();
}

// Show Deck Details
function showDeckDetails(deck) {
    document.querySelector('.deck-selection').classList.add('hidden');
    document.querySelector('.deck-viewer').classList.remove('hidden');
    document.querySelector('.master-card-details').classList.add('hidden');
    
    document.getElementById('deck-name').textContent = deck.name;
    
    const masterCardsElement = document.getElementById('master-cards');
    masterCardsElement.innerHTML = '';
    
    deck.masterCards.forEach(masterCard => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardId = masterCard.id;
        
        // Use the compact card preview for grid display
        cardElement.innerHTML = `
            <div class="card-preview">
                <div class="card-image">
                    <img src="${masterCard.image}" alt="${masterCard.name}" onerror="this.src='./cards/dragon/placeholder.jpg'">
                    <div class="card-glow"></div>
                </div>
                <div class="card-brief-info">
                    <div class="card-name">${masterCard.name}</div>
                    <div class="card-stats-small">
                        <span class="attack">⚔️ ${masterCard.attack}</span>
                        <span class="health">❤️ ${masterCard.health}</span>
                    </div>
                </div>
            </div>
        `;
        
        masterCardsElement.appendChild(cardElement);
        
        // Add click event
        cardElement.addEventListener('click', () => {
            currentMasterCard = masterCard;
            showMasterCardDetails(masterCard);
        });
    });
}

// Show Master Card Details
function showMasterCardDetails(masterCard) {
    document.querySelector('.master-cards-container').classList.add('hidden');
    document.querySelector('.master-card-details').classList.remove('hidden');
    
    document.getElementById('master-card-name').textContent = masterCard.name;
    
    // Display selected master card using the full card HTML
    const selectedMasterElement = document.getElementById('selected-master');
    selectedMasterElement.innerHTML = masterCard.createCardHTML();
    
    // Display location card
    const locationCardElement = document.getElementById('location-card');
    locationCardElement.innerHTML = masterCard.locationCard.createCardHTML();
    
    // Display basic cards
    const basicCardsElement = document.getElementById('basic-cards');
    basicCardsElement.innerHTML = '';
    
    masterCard.basicCards.forEach(basicCard => {
        // Insérer directement le HTML de la carte sans div supplémentaire
        basicCardsElement.innerHTML += basicCard.createCardHTML();
    });
    
    // Add card animations
    animateCardShowcase();
}

// Add Particle Effects to Deck Items
function addParticleEffectsToDeckItems() {
    const deckItems = document.querySelectorAll('.deck-item');
    
    deckItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const particlesContainer = document.createElement('div');
            particlesContainer.classList.add('deck-particles');
            item.appendChild(particlesContainer);
            
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.classList.add('deck-particle');
                
                const size = Math.random() * 5 + 2;
                const xPos = Math.random() * 100;
                const duration = Math.random() * 1.5 + 0.5;
                
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = xPos + '%';
                particle.style.animationDuration = duration + 's';
                
                particlesContainer.appendChild(particle);
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const particlesContainer = item.querySelector('.deck-particles');
            if (particlesContainer) {
                item.removeChild(particlesContainer);
            }
        });
    });
}

// Animate Card Showcase
function animateCardShowcase() {
    const showcaseCards = document.querySelectorAll('.card-frame');
    
    showcaseCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('card-reveal');
        }, index * 200);
    });
    
    // Animation pour les cartes de base déjà présentes dans le DOM
    const basicCards = document.querySelectorAll('#basic-cards .card-frame');
    
    basicCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('card-reveal');
        }, 600 + index * 100);
    });
}

// Setup Event Listeners for Navigation
function setupEventListeners() {
    // Back to menu button
    document.getElementById('back-to-menu').addEventListener('click', () => {
        window.location.href = 'index.html'; // Or however you navigate back to the main menu
    });
    
    // Back to decks button
    document.getElementById('back-to-decks').addEventListener('click', () => {
        document.querySelector('.deck-selection').classList.remove('hidden');
        document.querySelector('.deck-viewer').classList.add('hidden');
    });
    
    // Back to masters button
    document.getElementById('back-to-masters').addEventListener('click', () => {
        document.querySelector('.master-cards-container').classList.remove('hidden');
        document.querySelector('.master-card-details').classList.add('hidden');
    });
}

// Check if images exist and preload them
function preloadImages() {
    // Create an array of all image paths from the decks
    const imageUrls = [];
    
    DECKS.forEach(deck => {
        imageUrls.push(deck.image);
        
        deck.masterCards.forEach(masterCard => {
            imageUrls.push(masterCard.image);
            imageUrls.push(masterCard.locationCard.image);
            
            masterCard.basicCards.forEach(basicCard => {
                imageUrls.push(basicCard.image);
            });
        });
    });
    
    // Preload all images
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Export collection functionality
export function openCollection() {
    // Replace main content with collection interface
    const mainContent = document.querySelector('.menu-container');
    if (mainContent) {
        // Save the original content
        const originalContent = mainContent.innerHTML;
        
        // Store the original content in localStorage to restore it later
        localStorage.setItem('originalMenuContent', originalContent);
        
        // Initialize collection
        initializeCollection();
        
        // Preload images
        preloadImages();
    }
}