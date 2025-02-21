// Open modal for adding a new forum post or editing an existing one
function openModal(postId = null) {
    const modal = document.getElementById('forum-modal');
    const form = document.getElementById('forum-form');
    const titleInput = document.getElementById('post-title');
    const descriptionInput = document.getElementById('post-description');
    const dateInput = document.getElementById('post-date');
    const statusSelect = document.getElementById('post-status');
    const postIdInput = document.getElementById('post-id');

    if (postId) {
        // If editing, populate the form with existing data
        const postRow = document.getElementById(`post-row-${postId}`);
        const title = postRow.querySelector('.post-title').innerText;
        const description = postRow.querySelector('.post-description').innerText;
        const date = postRow.querySelector('.post-date').innerText;
        const status = postRow.querySelector('.post-status').innerText;

        titleInput.value = title;
        descriptionInput.value = description;
        dateInput.value = date;
        statusSelect.value = status.toLowerCase();
        postIdInput.value = postId;  // Set the postId for editing
    } else {
        // Clear form for adding new post
        form.reset();
        postIdInput.value = '';  // Clear the postId input
    }

    // Show modal
    modal.style.display = 'flex';
}

// Close the modal
function closeModal() {
    document.getElementById('forum-modal').style.display = 'none';
}

// Handle forum post form submission (for both adding and editing)
function savePost(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const description = document.getElementById('post-description').value;
    const date = document.getElementById('post-date').value;
    const status = document.getElementById('post-status').value;
    const postId = document.getElementById('post-id').value;

    if (!title || !description || !date || !status) {
        alert('Please fill in all fields');
        return;
    }

    if (postId) {
        // Edit post
        editPostInTable(postId, title, description, date, status);
    } else {
        // Add new post
        addPostToTable(title, description, date, status);
    }

    // Close the modal
    closeModal();
}

// Add a new forum post to the table
function addPostToTable(title, description, date, status) {
    const forumList = document.getElementById('forum-list').querySelector('tbody');
    const newRow = document.createElement('tr');
    const postId = Date.now();  // Use timestamp as unique ID
    newRow.id = `post-row-${postId}`;
    newRow.innerHTML = `
        <td class="post-title">${title}</td>
        <td class="post-description">${description}</td>
        <td class="post-date">${date}</td>
        <td class="post-status">${status}</td>
        <td>
            <button class="edit" onclick="openModal(${postId})">Edit</button>
            <button class="delete" onclick="deletePost(${postId})">Delete</button>
        </td>
    `;
    forumList.appendChild(newRow);
}

// Edit a forum post in the table
function editPostInTable(postId, title, description, date, status) {
    const postRow = document.getElementById(`post-row-${postId}`);
    postRow.querySelector('.post-title').innerText = title;
    postRow.querySelector('.post-description').innerText = description;
    postRow.querySelector('.post-date').innerText = date;
    postRow.querySelector('.post-status').innerText = status;
}

// Delete a forum post from the table
function deletePost(postId) {
    const postRow = document.getElementById(`post-row-${postId}`);
    postRow.remove();
}

// Search forum posts
function searchPost() {
    const searchInput = document.getElementById('forum-search').value.toLowerCase();
    const postRows = document.querySelectorAll('#forum-list tr');

    postRows.forEach(row => {
        const title = row.querySelector('.post-title').innerText.toLowerCase();
        const description = row.querySelector('.post-description').innerText.toLowerCase();

        if (title.includes(searchInput) || description.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
