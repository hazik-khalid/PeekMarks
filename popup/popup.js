

const browserAPI = window.browser || window.chrome;
document.addEventListener("DOMContentLoaded", () => {
  const bookmarkContainer = document.getElementById("bookmark-container");
  const saveButton = document.getElementById("save-bookmark");

  // Load bookmarks on popup open
  loadBookmarks();

  // Save the current page as a bookmark with thumbnail
  saveButton.addEventListener("click", async () => {
    const [tab] = await browserAPI.tabs.query({
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
    browserAPI.storage.local.get(['bookmarks'], (result) => {
      const bookmarks = result.bookmarks || [];
      bookmarkContainer.innerHTML = ''; // Clear the container before loading
      bookmarks.forEach(bookmark => displayBookmark(bookmark));
    });
  }

  // Function to save a bookmark to local storage
  function saveBookmark(bookmark) {
    // Retrieve existing bookmarks
    browserAPI.storage.local.get(["bookmarks"], (result) => {
      if (browserAPI.runtime.lastError) {
        console.error("Error retrieving bookmarks:", browserAPI.runtime.lastError);
        return;
      }
      const bookmarks = result.bookmarks || [];
      
      // Add the new bookmark
      bookmarks.push(bookmark);
      
      // Save updated bookmarks
      browserAPI.storage.local.set({ bookmarks }, () => {
        if (browserAPI.runtime.lastError) {
          console.error("Error saving bookmarks:", browserAPI.runtime.lastError);
          return;
        }
        loadBookmarks(); // Reload the bookmarks after saving
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
    img.onerror = () => {
      img.src = "icons/def.png"; // Set a default thumbnail if loading fails
    };

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
      browserAPI.storage.local.get(["bookmarks"], (result) => {
        const bookmarks = result.bookmarks || [];
        const updatedBookmarks = bookmarks.filter(
          (b) => b.url !== bookmark.url
        );
        browserAPI.storage.local.set({ bookmarks: updatedBookmarks }, () => {
          if (browserAPI.runtime.lastError) {
            console.error("Error deleting bookmark:", browserAPI.runtime.lastError);
          }
        });
      });
    });

    bookmarkDiv.appendChild(img);
    bookmarkDiv.appendChild(title);
    bookmarkDiv.appendChild(deleteButton);
    bookmarkContainer.appendChild(bookmarkDiv);
  }
});


// firebase

document.getElementById("save-bookmark-button").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;

  // Send a message to the background script for saving the bookmark
  chrome.runtime.sendMessage({ action: "saveBookmark", title, url }, (response) => {
      const messageDiv = document.getElementById("response-message");
      if (response.success) {
          messageDiv.textContent = "Bookmark saved successfully!";
          console.log("Bookmark saved:", response.data);
      } else {
          messageDiv.textContent = `Error: ${response.error}`;
          console.error("Error saving bookmark:", response.error);
      }
  });
});