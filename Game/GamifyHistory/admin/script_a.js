// Open the modal when 'Add New Quest' button is clicked
document.getElementById('add-quest-btn').addEventListener('click', function() {
    document.getElementById('quest-modal').style.display = 'flex';
    document.getElementById('quest-form').reset(); // Reset the form when modal is opened
  });
  
  // Close the modal when the close button (x) is clicked
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('quest-modal').style.display = 'none';
  });
  
  // Close the modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('quest-modal')) {
      document.getElementById('quest-modal').style.display = 'none';
    }
  });
  
  // Handle form submission for adding/editing quests
  document.getElementById('quest-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Gather form data
    const questName = document.getElementById('quest-name').value;
    const questDescription = document.getElementById('quest-description').value;
    const questStatus = document.getElementById('quest-status').value;
  
    // You can modify this part to handle saving the quest (e.g., through an API)
    console.log('Quest Data:', { questName, questDescription, questStatus });
  
    // Add the new quest to the table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${questName}</td>
      <td>${questDescription}</td>
      <td>${questStatus.charAt(0).toUpperCase() + questStatus.slice(1)}</td>
      <td>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </td>
    `;
    
    // Add the new row to the quest table
    document.querySelector('#quest-table tbody').appendChild(newRow);
  
    // Close the modal after saving the quest
    document.getElementById('quest-modal').style.display = 'none';
  });
  
  // Event delegation for editing and deleting quests
  document.querySelector('#quest-table tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
      // Delete the quest
      event.target.closest('tr').remove();
    } else if (event.target.classList.contains('edit')) {
      // Edit the quest (populate the form with the quest data)
      const row = event.target.closest('tr');
      document.getElementById('quest-name').value = row.cells[0].innerText;
      document.getElementById('quest-description').value = row.cells[1].innerText;
      document.getElementById('quest-status').value = row.cells[2].innerText.toLowerCase();
      document.getElementById('quest-modal').style.display = 'flex';
    }
  });
  
  // Search functionality for quests
  document.querySelector('#search-bar button').addEventListener('click', function() {
    const searchTerm = document.querySelector('#search-bar input').value.toLowerCase();
    const rows = document.querySelectorAll('#quest-table tbody tr');
  
    rows.forEach(row => {
      const questName = row.cells[0].innerText.toLowerCase();
      if (questName.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
  