document.addEventListener("DOMContentLoaded", () => {
  const bookmarkContainer = document.getElementById("bookmark-container");
  const saveButton = document.getElementById("save-bookmark");

  // Load bookmarks on popup open
  loadBookmarks();

  // Save the current page as a bookmark with thumbnail
  saveButton.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const title = tab.title;
    const url = tab.url;
    const thumbnailUrl = `https://www.google.com/s2/favicons?sz=64&domain=${url}`; // Basic favicon thumbnail

    const bookmark = { title, url, thumbnailUrl };
    saveBookmark(bookmark);
  });

  // Function to load bookmarks from storage and display them
  function loadBookmarks() {
    chrome.storage.local.get(["bookmarks"], (result) => {
      const bookmarks = result.bookmarks || [];
      bookmarkContainer.innerHTML = "";
      bookmarks.forEach((bookmark) => displayBookmark(bookmark));
    });
  }

  // Function to save a bookmark to local storage
  function saveBookmark(bookmark) {
    chrome.storage.local.get(["bookmarks"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving bookmarks:", chrome.runtime.lastError);
        return;
      }
      const bookmarks = result.bookmarks || [];
      bookmarks.push(bookmark);
      chrome.storage.local.set({ bookmarks }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error saving bookmarks:", chrome.runtime.lastError);
          return;
        }
        loadBookmarks();
      });
    });
  }

  // Function to display a bookmark
  function displayBookmark(bookmark) {
    const bookmarkDiv = document.createElement("div");
    bookmarkDiv.className = "bookmark";

    const img = document.createElement("img");
    img.src = bookmark.thumbnailUrl;
    img.alt = `${bookmark.title} thumbnail`;
    img.className = "thumbnail";

    const title = document.createElement("a");
    title.textContent = bookmark.title;
    title.href = bookmark.url;
    title.target = "_blank";
    title.className = "title";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "icons/bin.png"; // Path to your dustbin icon
    deleteIcon.alt = "Delete";
    deleteIcon.className = "delete-icon";

    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener("click", () => {
      // Remove the bookmark from the DOM
      bookmarkDiv.remove();

      // Remove the bookmark from storage
      chrome.storage.local.get(["bookmarks"], (result) => {
        const bookmarks = result.bookmarks || [];
        const updatedBookmarks = bookmarks.filter(
          (b) => b.url !== bookmark.url
        );
        chrome.storage.local.set({ bookmarks: updatedBookmarks });
      });
    });

    bookmarkDiv.appendChild(img);
    bookmarkDiv.appendChild(title);
    bookmarkDiv.appendChild(deleteButton);
    bookmarkContainer.appendChild(bookmarkDiv);
    img.onerror = () => {
      img.src = "icons/def.png"; // Set a default thumbnail
    };
  }
});
