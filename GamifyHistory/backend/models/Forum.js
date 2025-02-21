// forum.js

// Forum object to store and manage forum posts and discussions
const forum = {
    posts: [], // Array to store all forum posts
    comments: [], // Array to store comments on posts
    users: [], // Array to store users who have posted or commented
  
    // Method to create a new forum post
    createPost(user, title, content) {
      const newPost = {
        postId: this.posts.length + 1, // Generate a new post ID
        userId: user.id, // ID of the user who created the post
        title: title,
        content: content,
        timestamp: new Date(),
        comments: [], // List of comments under this post
        votes: 0, // Number of upvotes or downvotes
      };
      this.posts.push(newPost);
      console.log(`New post created by ${user.name}: ${title}`);
      return newPost;
    },
  
    // Method to comment on a forum post
    commentOnPost(user, postId, commentContent) {
      const post = this.posts.find((p) => p.postId === postId);
      if (!post) {
        console.log("Post not found.");
        return;
      }
  
      const newComment = {
        commentId: this.comments.length + 1,
        userId: user.id,
        content: commentContent,
        timestamp: new Date(),
      };
      post.comments.push(newComment);
      this.comments.push(newComment);
      console.log(`New comment by ${user.name} on post: ${post.title}`);
      return newComment;
    },
  
    // Method to upvote a post or comment
    upvote(user, postId, commentId = null) {
      const post = this.posts.find((p) => p.postId === postId);
      if (commentId) {
        const comment = post.comments.find((c) => c.commentId === commentId);
        if (comment) {
          comment.votes += 1;
          console.log(`Comment upvoted by ${user.name}`);
        } else {
          console.log("Comment not found.");
        }
      } else {
        post.votes += 1;
        console.log(`Post upvoted by ${user.name}`);
      }
    },
  
    // Method to downvote a post or comment
    downvote(user, postId, commentId = null) {
      const post = this.posts.find((p) => p.postId === postId);
      if (commentId) {
        const comment = post.comments.find((c) => c.commentId === commentId);
        if (comment) {
          comment.votes -= 1;
          console.log(`Comment downvoted by ${user.name}`);
        } else {
          console.log("Comment not found.");
        }
      } else {
        post.votes -= 1;
        console.log(`Post downvoted by ${user.name}`);
      }
    },
  
    // Method to display posts and comments
    displayForum() {
      console.log("Forum Posts:");
      this.posts.forEach((post) => {
        console.log(`Title: ${post.title} | Author: ${post.userId} | Votes: ${post.votes}`);
        console.log(`Content: ${post.content}`);
        console.log(`Comments:`);
        post.comments.forEach((comment) => {
          console.log(`- Comment by ${comment.userId}: ${comment.content} | Votes: ${comment.votes}`);
        });
        console.log("---------------------------------");
      });
    },
  };
  
  // Example usage:
  
  // Sample users
  const user1 = { id: 1, name: "John Doe" };
  const user2 = { id: 2, name: "Jane Smith" };
  
  // Creating a post
  const post1 = forum.createPost(user1, "What is the Industrial Revolution?", "Can someone explain the main aspects of the Industrial Revolution?");
  
  // Commenting on a post
  const comment1 = forum.commentOnPost(user2, post1.postId, "The Industrial Revolution was a period of major industrialization that began in the late 1700s.");
  
  // Upvoting a post and comment
  forum.upvote(user1, post1.postId); // Upvote the post
  forum.upvote(user2, post1.postId, comment1.commentId); // Upvote the comment
  
  // Display the forum
  forum.displayForum();
  