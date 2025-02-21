// quest.js

// Quest object to store and manage quests in the GamifyHistory project
const quest = {
    id: null, // Unique Quest ID
    title: "", // Title of the quest
    description: "", // Description of the quest
    type: "educational", // Type can be "educational", "fun", "challenge", etc.
    difficulty: "medium", // Difficulty can be "easy", "medium", "hard"
    points: 0, // Points awarded on quest completion
    status: "incomplete", // Status can be "incomplete", "completed", or "in-progress"
    rewards: [], // Array to store rewards (e.g., badges, certificates)
    startDate: null, // Quest start date
    endDate: null, // Quest end date (if any)
  
    // Method to initialize a quest
    initQuest(id, title, description, type, difficulty, points, rewards) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.type = type;
      this.difficulty = difficulty;
      this.points = points;
      this.rewards = rewards;
      this.status = "incomplete";
      this.startDate = new Date();
      this.endDate = null;
    },
  
    // Method to update quest status to completed
    completeQuest() {
      this.status = "completed";
      this.endDate = new Date();
    },
  
    // Method to update quest progress
    updateProgress(progress) {
      if (progress >= 100) {
        this.completeQuest();
      } else {
        this.status = "in-progress";
      }
    },
  
    // Method to track quest rewards
    trackRewards(user) {
      user.addRewards(this.points);
      // Logic to award additional rewards like badges or achievements
      this.rewards.forEach(reward => {
        console.log(`Awarded: ${reward}`);
      });
    },
  
    // Method to check if the quest is available based on type and difficulty
    isQuestAvailable(user) {
      // Example logic: A user may have to complete certain lessons before they can access the quest
      if (user.progress.completedLessons >= 5 && this.difficulty !== "hard") {
        return true;
      }
      return false;
    },
  };
  
  // Example usage:
  
  // Initialize a new quest
  const historyQuest = Object.create(quest);
  historyQuest.initQuest(1, "The Rise of Empires", "Complete lessons on the history of empires.", "educational", "medium", 100, ["History Master Badge", "100 XP"]);
  
  // Checking if the quest is available for the user
  if (historyQuest.isQuestAvailable(user)) {
    console.log("Quest Available!");
    // Update progress based on user actions (e.g., completing lessons or quizzes)
    historyQuest.updateProgress(50); // 50% progress
  }
  
  // Completing the quest
  historyQuest.updateProgress(100); // 100% progress
  historyQuest.trackRewards(user); // Adding rewards and points to the user
  
  console.log(historyQuest); // Display quest information
  