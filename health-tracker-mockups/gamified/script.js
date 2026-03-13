// Calendar data
const calendarData = {
    '2026-03-01': true, '2026-03-02': true, '2026-03-04': true,
    '2026-03-05': true, '2026-03-06': true, '2026-03-08': true,
    '2026-03-09': true, '2026-03-10': true, '2026-03-11': true,
    '2026-03-13': true, '2026-03-15': true, '2026-03-16': true,
    '2026-03-17': true, '2026-03-18': true, '2026-03-20': true,
    '2026-03-22': true, '2026-03-23': true, '2026-03-24': true,
    '2026-03-25': true,
};

// Generate Island Calendar
function generateIslandCalendar() {
    const calendar = document.getElementById('islandCalendar');
    const today = new Date(2026, 2, 25);
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    let html = '';
    
    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day" style="opacity: 0.3;">${prevMonthDays - i}</div>`;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = day === today.getDate();
        const isCompleted = calendarData[dateStr];
        
        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (isCompleted) classes += ' completed';
        
        html += `<div class="${classes}">${day}</div>`;
    }
    
    calendar.innerHTML = html;
}

// Confetti effect
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#667EEA', '#764BA2'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// XP gain animation
function gainXP(amount) {
    const currentXP = 1250;
    const newXP = currentXP + amount;
    const maxXP = 2000;
    
    const fill = document.querySelector('.xp-fill');
    const text = document.querySelector('.xp-text');
    
    const percentage = (newXP / maxXP) * 100;
    fill.style.width = percentage + '%';
    text.textContent = `${newXP.toLocaleString()} / ${maxXP.toLocaleString()} XP`;
    
    // Show toast
    showToast(`🎉 获得 +${amount} XP！`);
    
    // Confetti
    createConfetti();
}

// Show toast message
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Quest click handlers
function setupQuestInteractions() {
    const quests = document.querySelectorAll('.quest-card');
    
    quests.forEach(quest => {
        quest.addEventListener('click', function() {
            if (!this.classList.contains('completed')) {
                // Mark as completed
                this.classList.add('completed');
                this.classList.add('quest-complete');
                
                // Update icon
                const reward = this.querySelector('.quest-reward');
                reward.innerHTML = `
                    <div class="check-mark">✅</div>
                    <div class="xp-earned">+15 XP</div>
                `;
                
                // Gain XP
                setTimeout(() => gainXP(15), 300);
                
                // Remove animation class
                setTimeout(() => {
                    this.classList.remove('quest-complete');
                }, 1000);
            }
        });
    });
}

// Achievement hover effect
function setupAchievementInteractions() {
    const achievements = document.querySelectorAll('.achievement-item.unlocked');
    
    achievements.forEach(achievement => {
        achievement.addEventListener('click', function() {
            this.classList.add('bounce');
            setTimeout(() => {
                this.classList.remove('bounce');
            }, 1000);
        });
    });
}

// Quick record button
function setupQuickRecord() {
    const btn = document.getElementById('quickRecordBtn');
    
    btn.addEventListener('click', function() {
        this.classList.add('bounce');
        showToast('⚡ 快速记录功能开发中...');
        
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 1000);
    });
}

// Calendar day click
function setupCalendarInteractions() {
    setTimeout(() => {
        const days = document.querySelectorAll('.calendar-day:not([style*="opacity"])');
        
        days.forEach(day => {
            day.addEventListener('click', function() {
                if (!this.classList.contains('completed')) {
                    this.classList.add('completed');
                    
                    // Update streak
                    const streakText = document.querySelector('.streak-text strong');
                    const currentStreak = parseInt(streakText.textContent);
                    streakText.textContent = currentStreak + 1;
                    
                    showToast('✅ 打卡成功！');
                    gainXP(5);
                }
            });
        });
    }, 100);
}

// Tab switching in leaderboard
function setupLeaderboard() {
    const items = document.querySelectorAll('.leaderboard-item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    generateIslandCalendar();
    setupQuestInteractions();
    setupAchievementInteractions();
    setupQuickRecord();
    setupCalendarInteractions();
    setupLeaderboard();
    
    // Welcome animation
    setTimeout(() => {
        showToast('🎮 欢迎回来！继续你的健康之旅吧！');
    }, 500);
});

// Random floating particles effect
setInterval(() => {
    if (Math.random() > 0.7) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}, 2000);
