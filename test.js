
    // Load bookmarks on popup open
    loadBookmarks();

    // Save the current page as a bookmark with thumbnail


    // Function to load bookmarks from storage and display them



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

