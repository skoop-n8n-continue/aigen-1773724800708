const stores = [
    { id: 'helzberg', name: 'Helzberg Diamonds', category: 'jewelry', level: 1, x: 200, y: 600, width: 150, height: 100, color: '#e3f2fd' },
    { id: 'francescas', name: "Francesca's", category: 'fashion', level: 1, x: 400, y: 600, width: 120, height: 100, color: '#fce4ec' },
    { id: 'sunglass-hut', name: 'Sunglass Hut', category: 'fashion', level: 2, x: 450, y: 300, width: 100, height: 80, color: '#fff3e0' },
    { id: 'brighton', name: 'Brighton', category: 'jewelry', level: 1, x: 850, y: 600, width: 130, height: 100, color: '#f3e5f5' },
    { id: 'transformation', name: 'Transformation', category: 'services', level: 1, x: 550, y: 600, width: 120, height: 100, color: '#e8f5e9' },
    { id: 'imagination', name: 'Imagination Playground', category: 'services', level: 2, x: 850, y: 300, width: 150, height: 100, color: '#fff9c4' },
    { id: 'arts-o', name: 'Arts O', category: 'services', level: 1, x: 50, y: 600, width: 120, height: 100, color: '#f1f8e9' },
    { id: 'starbucks', name: 'Starbucks', category: 'dining', level: 1, x: 100, y: 400, width: 80, height: 80, color: '#e8f5e9' },
    { id: 'auntie-annes', name: "Auntie Anne's", category: 'dining', level: 1, x: 900, y: 450, width: 80, height: 80, color: '#fff3e0' },
    { id: 'apple', name: 'Apple Store', category: 'fashion', level: 1, x: 400, y: 150, width: 180, height: 120, color: '#fafafa' },
];

const kioskLocation = { x: 600, y: 450 }; // Central Park Fountain area

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    updateTime();
    setInterval(updateTime, 60000);
});

function initApp() {
    renderStoreList(stores);
    renderMap();
    setupEventListeners();
}

function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderStoreList(storesToRender) {
    const list = document.getElementById('store-list');
    list.innerHTML = '';

    storesToRender.forEach(store => {
        const li = document.createElement('li');
        li.className = 'store-item';
        li.dataset.id = store.id;
        li.innerHTML = `
            <h4>${store.name}</h4>
            <span>Level ${store.level} • ${store.category.charAt(0).toUpperCase() + store.category.slice(1)}</span>
        `;
        li.onclick = () => selectStore(store.id);
        list.appendChild(li);
    });
}

function renderMap() {
    const canvas = document.getElementById('map-canvas');
    const width = 1200;
    const height = 800;

    let svgContent = `
        <svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" id="mall-svg">
            <defs>
                <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                    <feOffset dx="2" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.2" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient id="oasis-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#81c784;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#4caf50;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#e0e0e0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="store-shine" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
                </linearGradient>
            </defs>

            <!-- Mall Background -->
            <rect x="0" y="0" width="${width}" height="${height}" fill="#fdfbf7" />

            <g id="map-viewport">
                <!-- Curved Organic Paths -->
                <path d="M100,450 Q300,480 600,450 Q900,420 1100,450" fill="none" stroke="url(#path-grad)" stroke-width="80" stroke-linecap="round" />
                <path d="M600,100 Q650,300 600,450 Q550,600 600,750" fill="none" stroke="url(#path-grad)" stroke-width="80" stroke-linecap="round" />
                <path d="M200,650 Q400,600 600,450 Q800,300 1000,150" fill="none" stroke="url(#path-grad)" stroke-width="60" stroke-linecap="round" opacity="0.6" />

                <!-- Greenery Patches -->
                <path d="M150,550 Q180,530 220,550 Q250,580 200,600 Q140,590 150,550" fill="#e8f5e9" opacity="0.8" />
                <path d="M850,250 Q880,230 920,250 Q950,280 900,300 Q840,290 850,250" fill="#e8f5e9" opacity="0.8" />

                <!-- Central Organic Oasis Area -->
                <g id="central-oasis" filter="url(#soft-shadow)">
                    <!-- Organic Outer Shape -->
                    <path d="M600,330 Q720,330 720,450 Q720,570 600,570 Q480,570 480,450 Q480,330 600,330" fill="url(#oasis-grad)" />
                    <!-- Circular Bench/Structure -->
                    <circle cx="600" cy="450" r="80" fill="#a1887f" stroke="#8d6e63" stroke-width="4" />
                    <!-- Water Fountain -->
                    <circle cx="600" cy="450" r="50" fill="#e1f5fe" stroke="#b3e5fc" stroke-width="2" />
                    <g id="fountain-rings">
                        <circle cx="600" cy="450" r="10" fill="none" stroke="#fff" stroke-width="2" opacity="0.5">
                            <animate attributeName="r" values="10;40" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="600" cy="450" r="10" fill="none" stroke="#fff" stroke-width="2" opacity="0.5">
                            <animate attributeName="r" values="10;40" dur="2s" begin="1s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.5;0" dur="2s" begin="1s" repeatCount="indefinite" />
                        </circle>
                    </g>
                </g>

                <!-- Tree Landmarks -->
                <g class="tree-structure" transform="translate(450, 420)">
                    <path d="M0,0 Q10,-60 30,-100 Q50,-60 60,0" fill="none" stroke="#8d6e63" stroke-width="3" opacity="0.4" />
                    <path d="M10,0 Q20,-50 40,-90 Q60,-50 70,0" fill="none" stroke="#8d6e63" stroke-width="3" opacity="0.4" />
                    <circle cx="30" cy="-90" r="30" fill="#4caf50" opacity="0.6" />
                </g>
                <g class="tree-structure" transform="translate(700, 480)">
                    <path d="M0,0 Q-10,-60 -30,-100 Q-50,-60 -60,0" fill="none" stroke="#8d6e63" stroke-width="3" opacity="0.4" />
                    <path d="M-10,0 Q-20,-50 -40,-90 Q-60,-50 -70,0" fill="none" stroke="#8d6e63" stroke-width="3" opacity="0.4" />
                    <circle cx="-30" cy="-90" r="30" fill="#4caf50" opacity="0.6" />
                </g>

                <!-- Stores -->
                <g id="stores-layer">
                    ${stores.map(store => `
                        <g class="store-group" id="svg-${store.id}" transform="translate(${store.x}, ${store.y})" filter="url(#soft-shadow)" onclick="selectStore('${store.id}')">
                            <rect width="${store.width}" height="${store.height}" rx="16" fill="${store.color}" stroke="#e0e0e0" stroke-width="1.5" />
                            <rect x="0" y="0" width="${store.width}" height="${store.height}" rx="16" fill="url(#store-shine)" opacity="0.1" pointer-events="none" />
                            <text x="${store.width/2}" y="${store.height/2 + 6}" font-size="13" text-anchor="middle" font-weight="600" fill="#3e2723">${store.name}</text>
                            ${store.level === 2 ? '<text x="12" y="24" font-size="11" font-weight="bold" fill="#7d7572" opacity="0.6">L2</text>' : ''}
                        </g>
                    `).join('')}
                </g>

                <!-- Wayfinding Path Layer -->
                <path id="wayfinding-path" d="" fill="none" stroke="#4caf50" stroke-width="10" stroke-dasharray="1,15" stroke-linecap="round" class="hidden">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
                </path>

                <!-- Kiosk Marker -->
                <g id="kiosk-marker" transform="translate(${kioskLocation.x}, ${kioskLocation.y})" filter="url(#soft-shadow)">
                    <circle r="18" fill="rgba(76, 175, 80, 0.2)" />
                    <circle r="10" fill="#4caf50" stroke="#fff" stroke-width="3" />
                    <circle r="4" fill="#fff" />
                </g>
            </g>
        </svg>
    `;

    canvas.innerHTML = svgContent;
    setupMapInteractions();
}

function setupEventListeners() {
    const searchInput = document.getElementById('store-search');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = stores.filter(s => s.name.toLowerCase().includes(term) || s.category.includes(term));
        renderStoreList(filtered);
    });

    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.category;
            const filtered = cat === 'all' ? stores : stores.filter(s => s.category === cat);
            renderStoreList(filtered);
        });
    });

    document.getElementById('clear-path').onclick = clearSelection;
    document.getElementById('reset-map').onclick = resetMapView;
}

let scale = 1;
let translateX = 0;
let translateY = 0;

function setupMapInteractions() {
    const svg = document.getElementById('mall-svg');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');

    zoomIn.onclick = () => { scale *= 1.2; applyTransform(); };
    zoomOut.onclick = () => { scale /= 1.2; applyTransform(); };

    let isDragging = false;
    let startX, startY;

    svg.onmousedown = (e) => {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
    };

    window.onmousemove = (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
    };

    window.onmouseup = () => isDragging = false;

    svg.onwheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale *= delta;
        applyTransform();
    };
}

function applyTransform() {
    const viewport = document.getElementById('map-viewport');
    if (viewport) {
        viewport.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${scale})`);
    }
}

function resetMapView() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
}

function selectStore(id) {
    const store = stores.find(s => s.id === id);
    if (!store) return;

    const items = document.querySelectorAll('.store-item');
    items.forEach(item => {
        item.style.borderColor = item.dataset.id === id ? 'var(--oasis-green)' : 'var(--oasis-light-green)';
        if (item.dataset.id === id) item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    const storeGroups = document.querySelectorAll('.store-group');
    storeGroups.forEach(g => {
        const rect = g.querySelector('rect');
        if (g.id === `svg-${id}`) {
            rect.style.stroke = 'var(--oasis-green)';
            rect.style.strokeWidth = '4';
            rect.style.fill = '#e8f5e9';
        } else {
            const originalStore = stores.find(s => `svg-${s.id}` === g.id);
            rect.style.stroke = '#e0e0e0';
            rect.style.strokeWidth = '1.5';
            rect.style.fill = originalStore.color;
        }
    });

    const path = document.getElementById('wayfinding-path');
    const startX = kioskLocation.x;
    const startY = kioskLocation.y;
    const endX = store.x + store.width / 2;
    const endY = store.y + store.height / 2;

    const cpX = (startX + endX) / 2 + (Math.random() - 0.5) * 200;
    const cpY = (startY + endY) / 2 + (Math.random() - 0.5) * 200;

    path.setAttribute('d', `M${startX},${startY} Q${cpX},${cpY} ${endX},${endY}`);
    path.classList.remove('hidden');

    const info = document.getElementById('destination-info');
    document.getElementById('dest-name').textContent = store.name;
    document.getElementById('dest-details').textContent = `Level ${store.level} • ${store.category.charAt(0).toUpperCase() + store.category.slice(1)}`;
    info.classList.remove('hidden');

    // Auto zoom to target
    scale = 1.2;
    translateX = (600 - endX * scale);
    translateY = (400 - endY * scale);
    applyTransform();
}

function clearSelection() {
    document.getElementById('destination-info').classList.add('hidden');
    document.getElementById('wayfinding-path').classList.add('hidden');

    const storeGroups = document.querySelectorAll('.store-group');
    storeGroups.forEach(g => {
        const rect = g.querySelector('rect');
        const originalStore = stores.find(s => `svg-${s.id}` === g.id);
        rect.style.stroke = '#e0e0e0';
        rect.style.strokeWidth = '1.5';
        rect.style.fill = originalStore.color;
    });

    const items = document.querySelectorAll('.store-item');
    items.forEach(item => item.style.borderColor = 'var(--oasis-light-green)');
    resetMapView();
}
