/**
 * Q-AGENTIC FORGE - NEURAL NETWORK VISUALIZATION
 * Simulates autonomous AI agents forming consensus networks.
 */

const canvas = document.getElementById('swarmCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
let width, height;
let nodes = [];

// Mouse interaction tracking
const mouse = {
    x: null,
    y: null,
    radius: 150 // Connection radius for the user's cursor
};

// Handle window resize dynamically
function resizeCanvas() {
    const wrapper = document.getElementById('canvas-3d-wrapper');
    width = wrapper.clientWidth;
    height = wrapper.clientHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);

// Track mouse position
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// AI Agent Node Class
class AgentNode {
    constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.baseColor = '#38bdf8'; // Cyan
        this.activeColor = '#8b5cf6'; // Purple
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.baseColor;
        ctx.fill();
    }

    update() {
        // Bounce off walls
        if (this.x > width || this.x < 0) this.dx = -this.dx;
        if (this.y > height || this.y < 0) this.dy = -this.dy;

        // Move node
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

// Initialize the Network
function initNetwork() {
    nodes = [];
    resizeCanvas();
    
    // Create 70 autonomous nodes
    let numberOfNodes = (width * height) / 9000; 
    if(numberOfNodes < 40) numberOfNodes = 40;
    if(numberOfNodes > 100) numberOfNodes = 100;

    for (let i = 0; i < numberOfNodes; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (width - size * 2) + size;
        let y = Math.random() * (height - size * 2) + size;
        let dx = (Math.random() - 0.5) * 1.5; // Velocity X
        let dy = (Math.random() - 0.5) * 1.5; // Velocity Y
        
        nodes.push(new AgentNode(x, y, dx, dy, size));
    }
}

// Connect the Nodes (Draw Synapses)
function connectNodes() {
    let opacityValue = 1;
    for (let a = 0; a < nodes.length; a++) {
        for (let b = a; b < nodes.length; b++) {
            // Calculate distance between two nodes
            let dx = nodes[a].x - nodes[b].x;
            let dy = nodes[a].y - nodes[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Connect nodes if they are close
            if (distance < 100) {
                opacityValue = 1 - (distance / 100);
                ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(nodes[a].x, nodes[a].y);
                ctx.lineTo(nodes[b].x, nodes[b].y);
                ctx.stroke();
            }
        }

        // Connect node to mouse cursor to simulate user input mapping
        if (mouse.x != null && mouse.y != null) {
            let dxMouse = nodes[a].x - mouse.x;
            let dyMouse = nodes[a].y - mouse.y;
            let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distanceMouse < mouse.radius) {
                ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distanceMouse/mouse.radius})`; // Purple user connection
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(nodes[a].x, nodes[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animateNetwork() {
    requestAnimationFrame(animateNetwork);
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
    }
    connectNodes();
}

// Start Engine
initNetwork();
animateNetwork();

/**
 * UI INTERACTION LOGIC (The PoC Demo Button)
 */
const generateBtn = document.getElementById('generate-btn');
const swarmStatus = document.getElementById('swarm-status');
const outputProposal = document.getElementById('output-proposal');
const proposalText = document.getElementById('proposal-text');
const stepMsg = document.getElementById('step-msg');

generateBtn.addEventListener('click', () => {
    const clientNeeds = document.getElementById('client-needs').value;
    if(!clientNeeds) return alert("Please input client requirements first.");

    generateBtn.classList.add('hidden');
    swarmStatus.classList.remove('hidden');
    outputProposal.classList.add('hidden');

    // Simulate Agent Swarm Processing
    setTimeout(() => { stepMsg.innerText = "Deploying Q-Agentic Architecture..."; }, 1000);
    setTimeout(() => { stepMsg.innerText = "Synthesizing compliance frameworks..."; }, 2500);
    setTimeout(() => { stepMsg.innerText = "Generating enterprise proposal draft..."; }, 4000);

    setTimeout(() => {
        swarmStatus.classList.add('hidden');
        outputProposal.classList.remove('hidden');
        generateBtn.classList.remove('hidden');
        generateBtn.innerText = "Regenerate Proposal";
        
        proposalText.innerHTML = `
            <strong>Executive Summary:</strong> Based on the provided parameters, Q-Agentic Forge has structured a multi-tenant cloud migration protocol.<br><br>
            <strong>Execution Timeline:</strong> 14 Days to phase-one completion.<br>
            <strong>Security Protocol:</strong> Tier-4 Regional Compliance standard applied.<br><br>
            <em>[System Note: This is a v1.0 local prototype output. Full agent swarm connection required for complete document generation.]</em>
        `;
    }, 5500);
});
/**
 * ROI CALCULATOR ENGINE
 * Assumes Q-Agentic Forge reduces proposal creation time by 90%
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Grab all the slider inputs
    const propSlider = document.getElementById('prop-slider');
    const hoursSlider = document.getElementById('hours-slider');
    const rateSlider = document.getElementById('rate-slider');

    // 2. Grab the text spans where the current slider values are displayed
    const propVal = document.getElementById('prop-val');
    const hoursVal = document.getElementById('hours-val');
    const rateVal = document.getElementById('rate-val');

    // 3. Grab the big output displays
    const timeSavedEl = document.getElementById('time-saved');
    const moneySavedEl = document.getElementById('money-saved');

    // 4. The main calculation function
    function calculateROI() {
        // Get the current number from each slider
        const p = parseFloat(propSlider.value);
        const h = parseFloat(hoursSlider.value);
        const r = parseFloat(rateSlider.value);

        // Update the small blue numbers next to the sliders
        propVal.textContent = p;
        hoursVal.textContent = h;
        rateVal.textContent = r;

        // The Math: Assuming AI saves 90% of manual effort
        const totalHours = p * h;
        const timeSaved = totalHours * 0.9;
        const moneySaved = timeSaved * r;

        // Update the big outputs and add commas for large numbers (e.g., 13,500)
        timeSavedEl.textContent = Math.round(timeSaved).toLocaleString() + ' hrs';
        moneySavedEl.textContent = '$' + Math.round(moneySaved).toLocaleString();
        
        // Bonus: Update the slider fill track dynamically (creates that purple fill effect)
        updateSliderFill(propSlider);
        updateSliderFill(hoursSlider);
        updateSliderFill(rateSlider);
    }

    // Helper function to color the slider track to the left of the thumb
    function updateSliderFill(slider) {
        const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--accent-p) ${value}%, rgba(255, 255, 255, 0.1) ${value}%)`;
    }

    // 5. Listen for any movement on the sliders and run the calculation
    propSlider.addEventListener('input', calculateROI);
    hoursSlider.addEventListener('input', calculateROI);
    rateSlider.addEventListener('input', calculateROI);

    // Run it once when the page loads to set the initial state
    calculateROI();
});