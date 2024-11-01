//getting bookmark conatiner and add button from dom
document.addEventListener('DOMContentLoaded', ()=> {
    const bookmarkContainer = document.getElementById('bookmark-container')
    const saveButton = document.getElementById('save-bookmark')
})

//Load Bookmarks


//Save Current Page as Bookmark
saveButton.addEventListener('click', async ()=>{
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const title = tab.title;
    const url = tab.url;
    const thumbnailUrl = `https://www.google.com/s2/favicons?sz=64&domain=${url}`; 

    const bookmark = { title, url, thumbnailUrl };
    saveBookmark(bookmark);
})

//Function To Load bookmarks
function loadBookmarks(){

}

// Function to save a bookmark to local storage
function saveBookmark(bookmark) {
    chrome.storage.local.get(['bookmarks'], (result) => {
        const bookmarks = result.bookmarks || [];
        bookmarks.push(bookmark);
        chrome.storage.local.set({ bookmarks }, loadBookmarks);
    });
}
