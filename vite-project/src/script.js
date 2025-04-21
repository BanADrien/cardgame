// Création des particules
import './game/cards.js';
import './game/collection.js';

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Position aléatoire
        const xPos = Math.random() * 100;
        const size = Math.random() * 8 + 3;
        const duration = Math.random() * 15 + 5;
        const delay = Math.random() * 5;

        particle.style.left = xPos + 'vw';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        particlesContainer.appendChild(particle);
    }
}

// Gestionnaire de modals
function setupModals() {
    const modals = {
        'play-button': 'play-modal',
        'collection-button': 'collection-modal',
        'settings-button': 'settings-modal',
        'contact-button': 'contact-modal',
        'credits-button': 'credits-modal'
    };

    // Ouvrir les modals
    for (const [buttonId, modalId] of Object.entries(modals)) {
        const button = document.getElementById(buttonId);
        const modal = document.getElementById(modalId);

        button.addEventListener('click', () => {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.querySelector('.modal-content').style.opacity = '1';
            }, 10);
        });
    }

    // Fermer les modals
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Fermer en cliquant en dehors
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}
import { openCollection } from './game/collection.js';

document.getElementById('collection-button').addEventListener('click', () => {
    // Hide modal if using your existing modal system
    document.getElementById('collection-modal').style.display = 'none';
    
    // Open collection interface
    openCollection();
});
// Effets sonores pour les boutons
function setupSoundEffects() {
    const buttons = document.querySelectorAll('.menu-button, .footer-button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Ici vous pourriez ajouter un son de survol
            // const hoverSound = new Audio('hover.mp3');
            // hoverSound.play();
        });

        button.addEventListener('click', () => {
            // Ici vous pourriez ajouter un son de clic
            // const clickSound = new Audio('click.mp3');
            // clickSound.play();
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupModals();
    setupSoundEffects();
});
