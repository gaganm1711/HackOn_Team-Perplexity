document.addEventListener("DOMContentLoaded", () => {
    const questList = document.getElementById("quest-list");

    // Sample quests data
    let quests = [
        { id: 1, title: "Complete 3 History Quizzes", progress: 2, goal: 3, reward: "50 Coins", completed: false },
        { id: 2, title: "Watch 5 History Videos", progress: 5, goal: 5, reward: "100 Coins", completed: true },
        { id: 3, title: "Answer 10 Forum Questions", progress: 7, goal: 10, reward: "75 Coins", completed: false },
        { id: 4, title: "Win 3 Consecutive Quiz Challenges", progress: 1, goal: 3, reward: "150 Coins", completed: false }
    ];

    // Function to render quests
    function renderQuests() {
        questList.innerHTML = "";
        quests.forEach(quest => {
            let questItem = document.createElement("div");
            questItem.classList.add("quest-item", quest.completed ? "completed" : "ongoing");

            questItem.innerHTML = `
                <h3>${quest.title}</h3>
                <p>Progress: ${quest.progress}/${quest.goal}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(quest.progress / quest.goal) * 100}%;"></div>
                </div>
                <p><strong>Reward:</strong> ${quest.reward}</p>
                ${quest.completed 
                    ? '<button class="claim-btn" disabled>Claimed</button>' 
                    : `<button class="claim-btn" onclick="claimReward(${quest.id})">Claim</button>`}
            `;

            questList.appendChild(questItem);
        });
    }

    // Function to claim rewards
    window.claimReward = function(id) {
        let quest = quests.find(q => q.id === id);
        if (quest && quest.progress >= quest.goal && !quest.completed) {
            quest.completed = true;
            alert(`🎉 Congratulations! You have earned ${quest.reward}`);
            renderQuests();
        }
    };

    // Initial render
    renderQuests();
});
