function updateUI() {
    chrome.storage.local.get(['blockedCount'], (result) => {
        document.getElementById('counter').innerText = result.blockedCount || 0;
    });
}

// تحديث عند الفتح
updateUI();

// تحديث مباشر عند الحجب
chrome.storage.onChanged.addListener((changes) => {
    if (changes.blockedCount) {
        document.getElementById('counter').innerText = changes.blockedCount.newValue;
    }
});

// زر التصفير
document.getElementById('reset').addEventListener('click', () => {
    if (confirm("هل تريد إعادة تصفير عداد الحجب؟")) {
        chrome.storage.local.set({ blockedCount: 0 }, () => {
            updateUI();
        });
    }
});
