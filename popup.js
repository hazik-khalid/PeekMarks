//getting bookmark conatiner and add button from dom
document.addEventListener('DOMContentLoaded', ()=> {
    const bookmarkContainer = document.getElementById('bookmark-container')
    const saveButton = document.getElementById('save-bookmark')
})

//Load Bookmarks


//Save Current Page as Bookmark
saveButton.addEventListener('click', async ()=>{
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
})

//Function To Load bookmarks
function loadBookmarks(){

}