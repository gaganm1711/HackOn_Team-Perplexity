// Open modal for adding a new quiz or editing an existing one
function openModal(quizId = null) {
    const modal = document.getElementById('quiz-modal');
    const form = document.getElementById('quiz-form');
    const titleInput = document.getElementById('quiz-title');
    const descriptionInput = document.getElementById('quiz-description');
    const eraSelect = document.getElementById('quiz-era');
    const statusSelect = document.getElementById('quiz-status');

    if (quizId) {
        // If editing, populate the form with existing data
        const quizRow = document.getElementById(`quiz-row-${quizId}`);
        const title = quizRow.querySelector('.quiz-title').innerText;
        const description = quizRow.querySelector('.quiz-description').innerText;
        const era = quizRow.querySelector('.quiz-era').innerText;
        const status = quizRow.querySelector('.quiz-status').innerText;

        titleInput.value = title;
        descriptionInput.value = description;
        eraSelect.value = era.toLowerCase();
        statusSelect.value = status.toLowerCase();
    } else {
        // Clear form for adding new quiz
        form.reset();
    }

    // Show modal
    modal.style.display = 'flex';
}

// Close the modal
function closeModal() {
    document.getElementById('quiz-modal').style.display = 'none';
}

// Handle quiz form submission (for both adding and editing)
function saveQuiz(event) {
    event.preventDefault();

    const title = document.getElementById('quiz-title').value;
    const description = document.getElementById('quiz-description').value;
    const era = document.getElementById('quiz-era').value;
    const status = document.getElementById('quiz-status').value;

    if (!title || !description || !era || !status) {
        alert('Please fill in all fields');
        return;
    }

    const quizId = document.getElementById('quiz-id') ? document.getElementById('quiz-id').value : null;
    if (quizId) {
        // Edit quiz
        editQuizInTable(quizId, title, description, era, status);
    } else {
        // Add new quiz
        addQuizToTable(title, description, era, status);
    }

    // Close the modal
    closeModal();
}

// Add a new quiz to the table
function addQuizToTable(title, description, era, status) {
    const quizList = document.getElementById('quiz-list');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="quiz-title">${title}</td>
        <td class="quiz-description">${description}</td>
        <td class="quiz-era">${era}</td>
        <td class="quiz-status">${status}</td>
        <td>
            <button class="edit" onclick="openModal(${Date.now()})">Edit</button>
            <button class="delete" onclick="deleteQuiz(${Date.now()})">Delete</button>
        </td>
    `;
    quizList.appendChild(newRow);
}

// Edit a quiz in the table
function editQuizInTable(quizId, title, description, era, status) {
    const quizRow = document.getElementById(`quiz-row-${quizId}`);
    quizRow.querySelector('.quiz-title').innerText = title;
    quizRow.querySelector('.quiz-description').innerText = description;
    quizRow.querySelector('.quiz-era').innerText = era;
    quizRow.querySelector('.quiz-status').innerText = status;
}

// Delete a quiz from the table
function deleteQuiz(quizId) {
    const quizRow = document.getElementById(`quiz-row-${quizId}`);
    quizRow.remove();
}

// Search quiz function
function searchQuiz() {
    const searchInput = document.getElementById('quiz-search').value.toLowerCase();
    const quizRows = document.querySelectorAll('#quiz-list tr');

    quizRows.forEach(row => {
        const title = row.querySelector('.quiz-title').innerText.toLowerCase();
        const description = row.querySelector('.quiz-description').innerText.toLowerCase();

        if (title.includes(searchInput) || description.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
