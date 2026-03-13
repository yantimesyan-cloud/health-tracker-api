// Food Diary - Standalone Version with Advanced Features

// State
let currentDate = new Date();
let uploadedPhotos = [];
const MAX_PHOTOS = 9;
let foodDiary = {};

// Load saved data from localStorage
function loadDiaryData() {
    const saved = localStorage.getItem('foodDiary');
    if (saved) {
        foodDiary = JSON.parse(saved);
    }
}

// Save data to localStorage
function saveDiaryData() {
    localStorage.setItem('foodDiary', JSON.stringify(foodDiary));
}

// Get date string (YYYY-MM-DD)
function getDateString(date) {
    return date.toISOString().split('T')[0];
}

// Initialize
loadDiaryData();

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const photoGrid = document.getElementById('photoGrid');
const photoGridSection = document.getElementById('photoGridSection');
const photoCount = document.getElementById('photoCount');
const generateBtn = document.getElementById('generateBtn');
const collageSection = document.getElementById('collageSection');
const foodCollageCanvas = document.getElementById('foodCollage');
const clearAllBtn = document.getElementById('clearAllBtn');
const downloadBtn = document.getElementById('downloadBtn');
const saveBtn = document.getElementById('saveBtn');
const shareBtn = document.getElementById('shareBtn');

// Date navigation
const dateNumber = document.getElementById('dateNumber');
const dateMonth = document.getElementById('dateMonth');
const dateWeekday = document.getElementById('dateWeekday');
const prevDayBtn = document.getElementById('prevDayBtn');
const nextDayBtn = document.getElementById('nextDayBtn');

// History modal
const historyBtn = document.getElementById('historyBtn');
const historyModal = document.getElementById('historyModal');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const calendarGrid = document.getElementById('calendarGrid');
const calendarMonth = document.getElementById('calendarMonth');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const historyList = document.getElementById('historyList');

// Update date display
function updateDateDisplay() {
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[currentDate.getDay()];
    
    dateNumber.textContent = day;
    dateMonth.textContent = `${month}月`;
    dateWeekday.textContent = weekday;
    
    // Load photos for this date
    loadPhotosForDate();
}

// Load photos for current date
function loadPhotosForDate() {
    const dateStr = getDateString(currentDate);
    const savedData = foodDiary[dateStr];
    
    if (savedData && savedData.photos) {
        uploadedPhotos = savedData.photos;
        renderPhotoGrid();
        if (uploadedPhotos.length > 0) {
            photoGridSection.classList.add('show');
            generateBtn.classList.add('show');
        }
        
        if (savedData.collage) {
            // Load and display saved collage
            const img = new Image();
            img.onload = () => {
                const canvas = foodCollageCanvas;
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                collageSection.classList.add('show');
            };
            img.src = savedData.collage;
        }
    } else {
        uploadedPhotos = [];
        photoGridSection.classList.remove('show');
        generateBtn.classList.remove('show');
        collageSection.classList.remove('show');
    }
}

// Date navigation
prevDayBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDateDisplay();
});

nextDayBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDateDisplay();
});

// Upload Area - Click
uploadArea.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = (e) => {
        handleFiles(Array.from(e.target.files));
    };
    
    input.click();
});

// Upload Area - Drag & Drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
    );
    
    handleFiles(files);
});

// Handle uploaded files
function handleFiles(files) {
    if (uploadedPhotos.length + files.length > MAX_PHOTOS) {
        alert(`最多只能上传 ${MAX_PHOTOS} 张照片哦！`);
        return;
    }
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedPhotos.push({
                data: event.target.result,
                timestamp: Date.now()
            });
            renderPhotoGrid();
            photoGridSection.classList.add('show');
            generateBtn.classList.add('show');
        };
        reader.readAsDataURL(file);
    });
}

// Render photo grid
function renderPhotoGrid() {
    photoCount.textContent = uploadedPhotos.length;
    
    photoGrid.innerHTML = uploadedPhotos.map((photo, index) => `
        <div class="photo-item" draggable="true" data-index="${index}">
            <img src="${photo.data}" alt="Food photo ${index + 1}">
            <button class="photo-remove" onclick="removePhoto(${index})">×</button>
            <div class="photo-index">${index + 1}</div>
        </div>
    `).join('');
    
    // Add drag and drop for reordering
    const items = photoGrid.querySelectorAll('.photo-item');
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}

// Drag and drop handlers
let draggedIndex = null;

function handleDragStart(e) {
    draggedIndex = parseInt(e.target.dataset.index);
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const targetIndex = parseInt(e.currentTarget.dataset.index);
    
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
        // Swap photos
        const temp = uploadedPhotos[draggedIndex];
        uploadedPhotos[draggedIndex] = uploadedPhotos[targetIndex];
        uploadedPhotos[targetIndex] = temp;
        renderPhotoGrid();
    }
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedIndex = null;
}

// Remove photo
window.removePhoto = function(index) {
    uploadedPhotos.splice(index, 1);
    renderPhotoGrid();
    
    if (uploadedPhotos.length === 0) {
        photoGridSection.classList.remove('show');
        generateBtn.classList.remove('show');
        collageSection.classList.remove('show');
    }
};

// Clear all photos
clearAllBtn.addEventListener('click', () => {
    if (confirm('确定要清空所有照片吗？')) {
        uploadedPhotos = [];
        photoGridSection.classList.remove('show');
        generateBtn.classList.remove('show');
        collageSection.classList.remove('show');
    }
});

// Generate collage
generateBtn.addEventListener('click', async () => {
    await generateCollage(uploadedPhotos);
    collageSection.classList.add('show');
    
    // Scroll to collage
    setTimeout(() => {
        collageSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
});

// Get layout based on photo count
function getLayout(count) {
    if (count <= 1) return { cols: 1, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    return { cols: 4, rows: Math.ceil(count / 4) };
}

// Calculate position
function calculatePosition(index, layout, canvasSize, gap) {
    const col = index % layout.cols;
    const row = Math.floor(index / layout.cols);
    const cellWidth = (canvasSize - gap * (layout.cols + 1)) / layout.cols;
    const cellHeight = (canvasSize - gap * (layout.rows + 1)) / layout.rows;
    
    return {
        x: gap + col * (cellWidth + gap),
        y: gap + row * (cellHeight + gap),
        width: cellWidth,
        height: cellHeight
    };
}

// Draw rounded rectangle
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// Draw rounded image
function drawRoundedImage(ctx, imageData, x, y, width, height, radius) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            ctx.save();
            drawRoundedRect(ctx, x, y, width, height, radius);
            ctx.clip();
            
            const imgAspect = img.width / img.height;
            const cellAspect = width / height;
            let drawWidth, drawHeight, drawX, drawY;
            
            if (imgAspect > cellAspect) {
                drawHeight = height;
                drawWidth = height * imgAspect;
                drawX = x - (drawWidth - width) / 2;
                drawY = y;
            } else {
                drawWidth = width;
                drawHeight = width / imgAspect;
                drawX = x;
                drawY = y - (drawHeight - height) / 2;
            }
            
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            ctx.restore();
            resolve();
        };
        img.src = imageData;
    });
}

// Get meal time label
function getMealTimeLabel(timestamp) {
    const hour = new Date(timestamp).getHours();
    if (hour >= 6 && hour < 10) return '🌅 早餐';
    if (hour >= 10 && hour < 14) return '☀️ 午餐';
    if (hour >= 14 && hour < 18) return '🌤️ 下午茶';
    if (hour >= 18 && hour < 22) return '🌙 晚餐';
    return '🌃 夜宵';
}

// Generate collage
async function generateCollage(photos) {
    const canvas = foodCollageCanvas;
    const ctx = canvas.getContext('2d');
    
    const canvasSize = 800;
    const gap = 8;
    const cornerRadius = 12;
    const bgColor = '#FFFFFF';
    
    const layout = getLayout(photos.length);
    
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    
    for (let i = 0; i < photos.length; i++) {
        const pos = calculatePosition(i, layout, canvasSize, gap);
        await drawRoundedImage(ctx, photos[i].data, pos.x, pos.y, pos.width, pos.height, cornerRadius);
        
        // Draw time label
        const label = getMealTimeLabel(photos[i].timestamp);
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.font = '14px Inter, sans-serif';
        const labelWidth = ctx.measureText(label).width + 16;
        drawRoundedRect(ctx, pos.x + 8, pos.y + 8, labelWidth, 28, 8);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(label, pos.x + 16, pos.y + 26);
        ctx.restore();
    }
    
    console.log('✨ Collage generated!');
}

// Download collage
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `food-diary-${getDateString(currentDate)}.jpg`;
    link.href = foodCollageCanvas.toDataURL('image/jpeg', 0.9);
    link.click();
});

// Save to diary
saveBtn.addEventListener('click', () => {
    const dateStr = getDateString(currentDate);
    foodDiary[dateStr] = {
        photos: uploadedPhotos,
        collage: foodCollageCanvas.toDataURL('image/jpeg', 0.9),
        timestamp: Date.now()
    };
    saveDiaryData();
    alert('✅ 已保存到食物日记！');
});

// Share (placeholder - can integrate with Web Share API)
shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        foodCollageCanvas.toBlob((blob) => {
            const file = new File([blob], 'food-collage.jpg', { type: 'image/jpeg' });
            navigator.share({
                title: '我的食物日记',
                text: `${getDateString(currentDate)} 的美食记录`,
                files: [file]
            }).catch(err => console.log('分享取消', err));
        }, 'image/jpeg');
    } else {
        alert('📤 您的浏览器不支持分享功能，请使用下载按钮保存图片后手动分享。');
    }
});

// History modal
historyBtn.addEventListener('click', () => {
    historyModal.classList.add('show');
    renderCalendar();
});

closeHistoryBtn.addEventListener('click', () => {
    historyModal.classList.remove('show');
});

historyModal.addEventListener('click', (e) => {
    if (e.target === historyModal) {
        historyModal.classList.remove('show');
    }
});

// Calendar functionality
let calendarDate = new Date();

function renderCalendar() {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    calendarMonth.textContent = `${year}年${month + 1}月`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let html = '';
    
    // Weekday headers
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    weekdays.forEach(day => {
        html += `<div class="calendar-day" style="font-weight: 700; color: #A0AEC0; cursor: default;">${day}</div>`;
    });
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="calendar-day"></div>`;
    }
    
    // Days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = getDateString(date);
        const isToday = date.toDateString() === today.toDateString();
        const hasEntry = foodDiary[dateStr] ? true : false;
        
        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (hasEntry) classes += ' has-entry';
        
        html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
    }
    
    calendarGrid.innerHTML = html;
    
    // Add click handlers
    calendarGrid.querySelectorAll('.calendar-day[data-date]').forEach(dayEl => {
        dayEl.addEventListener('click', () => {
            const dateStr = dayEl.dataset.date;
            showHistoryForDate(dateStr);
        });
    });
}

prevMonthBtn.addEventListener('click', () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    renderCalendar();
});

function showHistoryForDate(dateStr) {
    const entry = foodDiary[dateStr];
    if (!entry) {
        alert('这天还没有记录哦');
        return;
    }
    
    historyList.innerHTML = `
        <div class="history-item">
            <div class="history-item-date">📅 ${dateStr}</div>
            <img src="${entry.collage}" class="history-item-image" alt="Food collage for ${dateStr}">
        </div>
    `;
    historyList.classList.add('show');
}

// Initialize
updateDateDisplay();

console.log('📸 Food Diary loaded!');
