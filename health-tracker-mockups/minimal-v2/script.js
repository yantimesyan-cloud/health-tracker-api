// ===== Calendar Data =====
const calendarData = {
    '2026-03-01': true,
    '2026-03-02': true,
    '2026-03-04': true,
    '2026-03-05': true,
    '2026-03-06': true,
    '2026-03-08': true,
    '2026-03-09': true,
    '2026-03-10': true,
    '2026-03-11': true,
    '2026-03-13': true,
    '2026-03-15': true,
    '2026-03-16': true,
    '2026-03-17': true,
    '2026-03-18': true,
    '2026-03-20': true,
    '2026-03-22': true,
    '2026-03-23': true,
    '2026-03-24': true,
    '2026-03-25': true,
};

// ===== Weight Data =====
const weightData = [
    70.5, 70.2, 69.8, 70.0, 69.5, 69.3, 69.0, 68.8, 68.5, 68.7,
    68.3, 68.0, 67.8, 67.5, 67.3, 67.0, 66.8, 66.5, 66.3, 66.0,
    65.8, 65.5, 65.7, 65.4, 65.2, 65.0, 65.2, 65.0, 64.8, 65.2
];

// ===== Generate Calendar =====
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date(2026, 2, 25); // March 25, 2026
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    let html = '<div class="calendar-header">';
    ['日', '一', '二', '三', '四', '五', '六'].forEach(day => {
        html += `<div class="calendar-day-name">${day}</div>`;
    });
    html += '</div><div class="calendar-grid">';

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${prevMonthDays - i}</div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = day === today.getDate();
        const isCompleted = calendarData[dateStr];

        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (isCompleted) classes += ' completed';

        html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
    }

    // Next month days
    const totalCells = startDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainingCells; i++) {
        html += `<div class="calendar-day other-month">${i}</div>`;
    }

    html += '</div>';
    calendar.innerHTML = html;

    // Add click listeners with animation
    document.querySelectorAll('.calendar-day:not(.other-month)').forEach(day => {
        day.addEventListener('click', function() {
            // Remove active class from all days
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
            const date = this.dataset.date;
            showToast(`📅 ${formatDate(date)}`);
        });
    });
}

// ===== Format Date =====
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
}

// ===== Initialize Weight Chart =====
function initWeightChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(123, 104, 238, 0.3)');
    gradient.addColorStop(1, 'rgba(123, 104, 238, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
            datasets: [{
                label: '体重 (kg)',
                data: weightData,
                borderColor: '#7B68EE',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#7B68EE',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(45, 55, 72, 0.95)',
                    padding: 12,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 15,
                        weight: '700'
                    },
                    borderColor: '#7B68EE',
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return `3月 ${context[0].label}日`;
                        },
                        label: function(context) {
                            return `${context.parsed.y} kg`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 64,
                    max: 71,
                    ticks: {
                        color: '#A0AEC0',
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 8
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.04)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#A0AEC0',
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ===== Mood Selector =====
function initMoodSelector() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    moodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all
            moodButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            // Optional: Add animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'moodPulse 0.5s ease';
            }, 10);
        });
    });
}

// ===== Update Total Calories =====
function updateTotalCalories() {
    const mealInputs = document.querySelectorAll('.meal-input');
    let total = 0;
    
    mealInputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });
    
    const totalElement = document.querySelector('.total-value');
    totalElement.textContent = `${total.toLocaleString()} kcal`;
    
    // Add pulse animation
    totalElement.style.animation = 'none';
    setTimeout(() => {
        totalElement.style.animation = 'pulse 0.3s ease';
    }, 10);
}

// ===== Update Steps Progress =====
function updateStepsProgress() {
    const stepsInput = document.getElementById('steps');
    const goal = 10000;
    const steps = parseInt(stepsInput.value) || 0;
    const percentage = Math.min((steps / goal) * 100, 100);
    
    // Update progress ring
    const progressFill = document.querySelector('.progress-ring-fill');
    const progressPercent = document.querySelector('.progress-percent');
    
    if (progressFill && progressPercent) {
        const circumference = 2 * Math.PI * 36; // r = 36
        const offset = circumference - (percentage / 100) * circumference;
        progressFill.style.strokeDashoffset = offset;
        progressPercent.textContent = `${Math.round(percentage)}%`;
    }
}

// ===== Toast Notification =====
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastContent = toast.querySelector('span:last-child');
    
    if (toastContent) {
        toastContent.textContent = message;
    } else {
        toast.innerHTML = `<span class="toast-icon">✓</span><span>${message}</span>`;
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ===== Save Button =====
function initSaveButton() {
    const saveBtn = document.getElementById('saveBtn');
    
    saveBtn.addEventListener('click', function() {
        // Add loading animation
        this.style.transform = 'translateX(-50%) scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = 'translateX(-50%) scale(1)';
            showToast('保存成功！');
        }, 200);
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', function() {
    // Generate calendar
    generateCalendar();
    
    // Initialize chart
    initWeightChart();
    
    // Initialize mood selector
    initMoodSelector();
    
    // Initialize save button
    initSaveButton();
    
    // Add input listeners for calories
    const mealInputs = document.querySelectorAll('.meal-input');
    mealInputs.forEach(input => {
        input.addEventListener('input', updateTotalCalories);
    });
    
    // Add input listener for steps
    const stepsInput = document.getElementById('steps');
    stepsInput.addEventListener('input', updateStepsProgress);
    
    // Add SVG gradient for progress ring
    const svg = document.querySelector('.progress-ring svg');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'purpleGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:#7B68EE;stop-opacity:1');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:#6C63FF;stop-opacity:1');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);
    }
    
    // Initial update
    updateStepsProgress();
});

// ===== CSS Animations =====
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes moodPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);
