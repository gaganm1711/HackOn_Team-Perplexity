// user.js

// User object to store information related to users in the GamifyHistory project
const user = {
    id: null, // User ID from database or session
    name: "",
    email: "",
    role: "student", // Can be "student", "teacher", "admin"
    preferences: {
      language: "English", // Default language preference
      notifications: true, // Enable/disable notifications
      theme: "light", // Theme: "light" or "dark"
    },
    progress: {
      completedLessons: 0, // Tracks the number of lessons completed
      quizScores: [], // Array to store quiz scores
      streak: 0, // Streak of consecutive days of activity
      rewards: 0, // Points or rewards accumulated through quizzes or activities
    },
    social: {
      friendsList: [], // Array to store friend IDs for peer-to-peer learning
      sharedContent: [], // Content shared between users (e.g., notes, quizzes)
    },
    
    // Method to set user data
    setUserData(id, name, email, role) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
    },
  
    // Method to update user preferences
    updatePreferences(language, notifications, theme) {
      this.preferences.language = language;
      this.preferences.notifications = notifications;
      this.preferences.theme = theme;
    },
  
    // Method to update user progress
    updateProgress(completedLessons, quizScores, streak, rewards) {
      this.progress.completedLessons = completedLessons;
      this.progress.quizScores = quizScores;
      this.progress.streak = streak;
      this.progress.rewards = rewards;
    },
  
    // Method to manage social features like friends and shared content
    manageSocial(friendsList, sharedContent) {
      this.social.friendsList = friendsList;
      this.social.sharedContent = sharedContent;
    },
  
    // Method to add quiz score and update streak
    addQuizScore(score) {
      this.progress.quizScores.push(score);
      // Example: Update streak based on quiz completion
      if (score >= 80) {
        this.progress.streak += 1;
      } else {
        this.progress.streak = 0;
      }
    },
  
    // Method to add reward points
    addRewards(points) {
      this.progress.rewards += points;
    },
  };
  
  // Example usage:
  
  // Setting user data (usually retrieved from database/session)
  user.setUserData(1, "John Doe", "john.doe@example.com", "student");
  
  // Updating preferences
  user.updatePreferences("Spanish", true, "dark");
  
  // Updating user progress
  user.updateProgress(10, [90, 85, 88], 5, 100);
  
  // Managing social features
  user.manageSocial(["friend1", "friend2"], ["sharedContent1", "sharedContent2"]);
  
  // Adding a new quiz score and updating streak
  user.addQuizScore(90);
  
  // Adding reward points
  user.addRewards(50);
  
  console.log(user);
  