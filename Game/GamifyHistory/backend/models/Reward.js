// reward.js

// Reward object to store and manage rewards in the GamifyHistory project
const rewardSystem = {
    rewards: [], // Array to store all available rewards (badges, points, etc.)
  
    // Method to create a new reward (badge, XP, or other)
    createReward(id, type, name, description, pointsRequired) {
      const newReward = {
        id: id,
        type: type, // Type could be "badge", "XP", "achievement"
        name: name,
        description: description,
        pointsRequired: pointsRequired, // Points required to earn this reward
      };
      this.rewards.push(newReward);
      console.log(`New reward created: ${name}`);
      return newReward;
    },
  
    // Method to award rewards to a user based on their actions
    awardReward(user, rewardId) {
      const reward = this.rewards.find((r) => r.id === rewardId);
      if (!reward) {
        console.log("Reward not found.");
        return;
      }
  
      // Add reward points or badges to user profile
      if (reward.type === "XP") {
        user.addRewards(reward.pointsRequired);
        console.log(`Awarded ${reward.pointsRequired} XP to ${user.name}`);
      } else if (reward.type === "badge") {
        user.addBadge(reward.name);
        console.log(`Awarded badge: ${reward.name} to ${user.name}`);
      } else if (reward.type === "achievement") {
        user.addAchievement(reward.name);
        console.log(`Awarded achievement: ${reward.name} to ${user.name}`);
      }
    },
  
    // Method to display available rewards
    displayRewards() {
      console.log("Available Rewards:");
      this.rewards.forEach((reward) => {
        console.log(`Reward: ${reward.name} | Type: ${reward.type} | Points Required: ${reward.pointsRequired}`);
        console.log(`Description: ${reward.description}`);
        console.log("---------------------------------");
      });
    },
  
    // Method to track user progress and trigger rewards
    trackUserProgress(user) {
      // Example: If user accumulates 500 points, award a specific achievement
      if (user.progress.rewards >= 500) {
        this.awardReward(user, 1); // Award a reward with ID 1 (e.g., "History Master Badge")
      }
    },
  };
  
  // Example usage:
  
  // Sample user
  const user1 = { 
    id: 1, 
    name: "John Doe", 
    progress: { rewards: 0 }, 
    badges: [], 
    achievements: [],
    
    addRewards(points) {
      this.progress.rewards += points;
    },
    
    addBadge(badgeName) {
      this.badges.push(badgeName);
    },
    
    addAchievement(achievementName) {
      this.achievements.push(achievementName);
    }
  };
  
  // Create new rewards
  const xpReward = rewardSystem.createReward(1, "XP", "History Master XP", "Earn 500 XP points by completing history quizzes", 500);
  const badgeReward = rewardSystem.createReward(2, "badge", "History Expert Badge", "Awarded for completing all history lessons", 0);
  const achievementReward = rewardSystem.createReward(3, "achievement", "Top Scorer Achievement", "Awarded to top scorer in monthly quiz competition", 0);
  
  // Award a reward based on user actions
  rewardSystem.awardReward(user1, xpReward.id); // Awarding XP reward
  
  // Track user progress and trigger rewards
  rewardSystem.trackUserProgress(user1);
  
  // Display all rewards
  rewardSystem.displayRewards();
  
  console.log(user1); // Display user profile with rewards and badges
  