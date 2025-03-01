// SCORM Integration
let scormConnected = false;
function initSCORM() {
    scormConnected = pipwerks.SCORM.init();
    if (!scormConnected) {
        console.log('SCORM not detected. Progress may not be saved.');
    } else {
        pipwerks.SCORM.set("cmi.core.lesson_status", "incomplete");
        pipwerks.SCORM.save();
    }
}

function commitSCORM(score = null) {
    if (scormConnected) {
        if (score !== null) {
            pipwerks.SCORM.set("cmi.core.score.raw", score);
            pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
        }
        pipwerks.SCORM.save();
        // pipwerks.SCORM.quit();
    }
}

// Dynamic Rendering
const content = document.getElementById('content');
const nav = document.querySelector('.profile-bar');
const bannerPhoto = document.getElementById('banner-photo');
const avatarPhoto = document.getElementById('avatar-photo');
const profileName = document.getElementById('profile-name');
const badge = document.getElementById('badge');
const postCount = document.getElementById('post-count');

function applyTheme() {
    const theme = data.theme || {};
    document.documentElement.style.setProperty('--title-color', theme.titleColor || '#000');
    document.documentElement.style.setProperty('--text-color', theme.textColor || '#333');
    document.documentElement.style.setProperty('--button-bg', theme.buttonBg || '#ccc');
    document.documentElement.style.setProperty('--button-text', theme.buttonText || '#000');
    document.documentElement.style.setProperty('--header-bg', data.headerBgColor || '#f8f8f8');
    document.documentElement.style.setProperty('--badge-text-color', data.badgeTextColor || '#000'); // New badge text color
}

function renderHeader() {
    bannerPhoto.src = data.bannerUrl || 'https://via.placeholder.com/800x200';
    bannerPhoto.style.objectPosition = `${data.bannerX || '50%'} ${data.bannerY || '50%'}`;
    avatarPhoto.src = data.avatarUrl || 'https://via.placeholder.com/100';
    profileName.textContent = data.name || 'Jane';
    badge.textContent = data.badgeText || 'Expert';
    badge.style.backgroundColor = data.badgeColor || '#ccc';
    postCount.textContent = data.sections.length;
}

function renderNav() {
    nav.innerHTML = `<ul>${data.sections.map((section, i) => `
        <li><a href="#section-${i}" data-index="${i}">${section.title}</a></li>
    `).join('')}</ul>`;
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(`section-${link.dataset.index}`);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', () => {
        const navRect = nav.getBoundingClientRect();
        if (navRect.top <= 60) {
            nav.classList.add('stuck');
            avatarPhoto.style.display = 'none';
        } else {
            nav.classList.remove('stuck');
            avatarPhoto.style.display = 'block';
        }
    });
}

function renderContent() {
    if (!data.sections || !Array.isArray(data.sections)) {
        content.innerHTML = '<p>No content available.</p>';
        return;
    }
    content.innerHTML = data.sections.map((section, index) => {
        let html = `<section id="section-${index}" class="post" aria-labelledby="section-title-${index}">`;
        switch (section.type) {
            case 'title-text':
                html += `<h1 id="section-title-${index}">${section.title}</h1>`;
                html += `<p>${section.text}</p>`;
                break;
            case 'image-text':
                html += `<h1 id="section-title-${index}">${section.title}</h1>`;
                html += `<p>${section.text}</p>`;
                if (section.mediaUrl) {
                    html += section.mediaUrl.endsWith('.mp4') 
                        ? `<video controls src="${section.mediaUrl}" aria-label="${section.alt || ''}"></video>`
                        : `<img src="${section.mediaUrl}" alt="${section.alt || ''}">`;
                }
                break;
            case 'video-embed':
                html += `<h1 id="section-title-${index}">${section.title}</h1>`;
                html += `<p>${section.text}</p>`;
                if (section.embedUrl) {
                    html += `<div class="video-embed-container"><iframe src="${section.embedUrl}" frameborder="0" allowfullscreen aria-label="${section.alt || 'Embedded video'}"></iframe></div>`;
                }
                break;
            case 'quiz':
                html += `
                    <h1 id="section-title-${index}">${section.title}</h1>
                    <form data-index="${index}">
                        ${section.questions.map((q, i) => `
                            <fieldset>
                                <legend>${q.question}</legend>
                                ${q.options.map((opt, j) => `
                                    <label>
                                        <input type="radio" name="q${index}-${i}" value="${j}">
                                        ${opt}
                                    </label>
                                `).join('')}
                            </fieldset>
                        `).join('')}
                        <button type="button" onclick="checkQuiz(${index})">Submit</button>
                    </form>
                    <p id="quiz-feedback-${index}"></p>`;
                break;
            case 'summary':
                html += `<h1 id="section-title-${index}">${section.title}</h1>`;
                html += `<p>${section.text}</p>`;
                break;
            default:
                html += `<p>No content type defined.</p>`;
        }
        html += `</section>`;
        return html;
    }).join('');
}

function checkQuiz(sectionIndex) {
    const section = data.sections[sectionIndex];
    let score = 0;
    section.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${sectionIndex}-${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) score++;
    });
    const total = section.questions.length;
    const percentage = Math.round((score / total) * 100);
    document.getElementById(`quiz-feedback-${sectionIndex}`).textContent = `Jane approves! You got ${score}/${total} (${percentage}%).`;
    commitSCORM(percentage);
}

function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            avatarPhoto.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

function handleBannerDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            bannerPhoto.src = reader.result;
            const rect = bannerPhoto.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width * 100;
            const y = (event.clientY - rect.top) / rect.height * 100;
            bannerPhoto.style.objectPosition = `${x}% ${y}%`;
        };
        reader.readAsDataURL(file);
    }
}

// Exit Button
document.getElementById('exit-btn').addEventListener('click', () => {
    commitSCORM();
    window.close();
});

// Initialize
window.onload = () => {
    initSCORM();
    applyTheme();
    renderHeader();
    renderNav();
    renderContent();
};