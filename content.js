/**
 * I Hate The Algorithm 2.0 - Surgical Strike Version
 * Fixes: The "Blocked Everything" bug.
 */

let blockedCount = 0;

chrome.storage.local.get(['blockedCount'], (result) => {
    if (result.blockedCount) blockedCount = result.blockedCount;
});

// الكلمات التي تجعلنا نتأكد أن هذا المحتوى "دخيل"
const DANGER_BUTTONS = ['Follow', 'Join', 'متابعة', 'انضمام', 'Suggested', 'مقترح'];

function isTrash(post) {
    // 1. هل يحتوي على زر "متابعة" أو "انضمام"؟ (هذا أقوى دليل للمقترحات)
    const buttons = post.querySelectorAll('[role="button"]');
    let hasFollowButton = false;
    for (let btn of buttons) {
        const text = btn.innerText.trim();
        if (DANGER_BUTTONS.includes(text)) {
            hasFollowButton = true;
            break;
        }
    }

    // 2. هل يحتوي على كلمة "Sponsored" أو "ممول" (حتى لو كانت مبعثرة)؟
    // سنبحث في رأس البوست فقط (Header)
    const header = post.querySelector('h3, h4, [dir="auto"]');
    let hasSponsoredText = false;
    if (header) {
        const headText = header.innerText.toLowerCase();
        // الكشف عن "Sponsored" المبعثرة (مثل s p o n s o r e d)
        if (headText.includes('sponsored') || headText.includes('ممول') || 
            headText.includes('مُروَّج') || headText.includes('partnership')) {
            hasSponsoredText = true;
        }
        
        // فحص الـ Canvas (طريقة فيسبوك لرسم كلمة Sponsored)
        if (header.querySelector('canvas')) hasSponsoredText = true;
    }

    // القاعدة: لا نحذف إلا إذا وجدنا أحد الدليلين القاطعين
    return hasFollowButton || hasSponsoredText;
}

function scanAndRemove() {
    // استهداف البوستات فقط
    const posts = document.querySelectorAll('.x1n2onr6:not([data-ihta-handled]), div[role="article"]:not([data-ihta-handled])');

    posts.forEach(post => {
        // صمام أمان للأحجام (البوست الحقيقي لا يكون ضخماً جداً)
        if (post.offsetHeight > 2500) return;

        if (isTrash(post)) {
            post.style.setProperty('display', 'none', 'important');
            post.dataset.ihtaHandled = "true";
            
            blockedCount++;
            chrome.storage.local.set({ blockedCount: blockedCount });
        } else {
            // نضع علامة أنه تم فحصه وهو سليم (حتى لا نكرر الفحص في نفس الدورة)
            post.dataset.ihtaHandled = "false";
        }
    });
}

const observer = new MutationObserver(() => scanAndRemove());
if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
}

setInterval(scanAndRemove, 2000);
scanAndRemove();
