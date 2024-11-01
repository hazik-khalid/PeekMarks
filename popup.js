document.addEventListener('DOMContentLoaded', () => {
    const bookmarkContainer = document.getElementById('bookmark-container');
    const saveButton = document.getElementById('save-bookmark');

    // Load bookmarks on popup open
    loadBookmarks();

    // Save the current page as a bookmark with thumbnail
    saveButton.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const title = tab.title;
        const url = tab.url;
        const thumbnailUrl = `https://www.google.com/s2/favicons?sz=64&domain=${url}`; // Basic favicon thumbnail

        const bookmark = { title, url, thumbnailUrl };
        saveBookmark(bookmark);
    });

    // Function to load bookmarks from storage and display them
    function loadBookmarks() {
        chrome.storage.local.get(['bookmarks'], (result) => {
            const bookmarks = result.bookmarks || [];
            bookmarkContainer.innerHTML = '';
            bookmarks.forEach(bookmark => displayBookmark(bookmark));
        });
    }

    // Function to save a bookmark to local storage
    function saveBookmark(bookmark) {
        chrome.storage.local.get(['bookmarks'], (result) => {
            const bookmarks = result.bookmarks || [];
            bookmarks.push(bookmark);
            chrome.storage.local.set({ bookmarks }, loadBookmarks);
        });
    }

    // Function to display a bookmark
    function displayBookmark(bookmark) {
        const bookmarkDiv = document.createElement('div');
        bookmarkDiv.className = 'bookmark';

        const img = document.createElement('img');
        img.src = bookmark.thumbnailUrl;
        img.alt = `${bookmark.title} thumbnail`;
        img.className = 'thumbnail';

        const title = document.createElement('p');
        title.textContent = bookmark.title;
        title.className = 'title';

        bookmarkDiv.appendChild(img);
        bookmarkDiv.appendChild(title);
        bookmarkContainer.appendChild(bookmarkDiv);
    }
});
