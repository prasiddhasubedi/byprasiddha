// Interaction.js
// This script handles client-side features for likes, comments, and view tracking using localStorage.

// Utility function to get data from localStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || {};
}

// Utility function to save data to localStorage
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Likes functionality
function handleLike(contentId) {
    const likes = getData("likes");
    likes[contentId] = (likes[contentId] || 0) + 1;
    setData("likes", likes);
    updateLikesDisplay(contentId);
}

function updateLikesDisplay(contentId) {
    const likes = getData("likes");
    document.getElementById(`likes-count-${contentId}`).textContent = likes[contentId] || 0;
}

// Comments functionality
function handleComment(contentId, comment) {
    const comments = getData("comments");
    if (!comments[contentId]) comments[contentId] = [];
    comments[contentId].push(comment);
    setData("comments", comments);
    updateCommentsDisplay(contentId);
}

function updateCommentsDisplay(contentId) {
    const comments = getData("comments")[contentId] || [];
    const commentList = document.getElementById(`comments-list-${contentId}`);
    commentList.innerHTML = ""; // Clear existing comments
    comments.forEach((comment) => {
        const commentItem = document.createElement("li");
        commentItem.textContent = comment;
        commentList.appendChild(commentItem);
    });
}

// View tracking functionality
function trackView(contentId) {
    const views = getData("views");
    const lastViewed = views[`${contentId}-timestamp`];
    const now = Date.now();

    // Only count a view if it's been more than 1 minute (60000 ms) since the last view
    if (!lastViewed || now - lastViewed > 60000) {
        views[contentId] = (views[contentId] || 0) + 1;
        views[`${contentId}-timestamp`] = now;
        setData("views", views);
    }

    updateViewsDisplay(contentId);
}

function updateViewsDisplay(contentId) {
    const views = getData("views");
    document.getElementById(`views-count-${contentId}`).textContent = views[contentId] || 0;
}

// Initialize all displays for a given contentId
function initializeContent(contentId) {
    updateLikesDisplay(contentId);
    updateCommentsDisplay(contentId);
    updateViewsDisplay(contentId);
}

// Example usage:
// Add this script in your HTML and call initializeContent(contentId) onload.
// Example HTML Elements:
// <button onclick="handleLike('content1')">Like</button>
// <div id="likes-count-content1">0</div>
// <input type="text" id="comment-input-content1" />
// <button onclick="handleComment('content1', document.getElementById('comment-input-content1').value)">Comment</button>
// <ul id="comments-list-content1"></ul>
// <div id="views-count-content1">0</div>

// Track view example: Add this call on page load for the content.
// trackView('content1');