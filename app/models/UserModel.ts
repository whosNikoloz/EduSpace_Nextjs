export class User {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    picture: string | null;
    passwordHash: string;
    passwordSalt: string;
    verificationToken: string | null;
    verifiedAt: Date | null;
    passwordResetToken: string | null;
    resetTokenExpires: Date | null;
    role: string;
    enrollments: Array<string> | null;
    notifications: Array<string> | null;
    posts: Array<Post> | null;
    comments: Array<Comment> | null;
    progress: Array<Progress> | null;
    lastActivity: Date | null;
  
    constructor(data: any) {
      this.userId = data.userId;
      this.userName = data.userName;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.picture = data.picture;
      this.passwordHash = data.passwordHash;
      this.passwordSalt = data.passwordSalt;
      this.verificationToken = data.verificationToken;
      this.verifiedAt = data.verifiedAt;
      this.passwordResetToken = data.passwordResetToken;
      this.resetTokenExpires = data.resetTokenExpires;
      this.role = data.role;
      this.enrollments = data.enrollments;
      this.notifications = data.notifications;
      this.posts = data.posts;
      this.comments = data.comments;
      this.progress = data.progress;
      this.lastActivity = data.lastActivity;
    }
  }