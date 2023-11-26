import {
  createContext,
  useContext,
  ReactNode,
  useState,
  FC,
  useEffect,
} from "react";

class User {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  oauth: boolean;
  role: string;
  posts: Array<{
    postId: number;
    title: string;
    subject: string;
    content: string;
    video: string;
    picture: string;
    createDate: string;
    comments: Array<string>;
  }>;

  notification: Array<{
    notificationId: number;
    message: string;
    isRead: boolean;
    createdAt: string;
    commentAuthorUsername: string;
    commentAuthorPicture: string;
    userId: number;
  }>;
  joinedAt: string;

  constructor(
    userId: number,
    userName: string,
    firstName: string,
    lastName: string,
    picture: string,
    email: string,
    oauth: boolean,
    role: string,
    posts: {
      postId: number;
      title: string;
      subject: string;
      content: string;
      video: string;
      picture: string;
      createDate: string;
      comments: string[];
    }[],
    notification: {
      notificationId: number;
      message: string;
      isRead: boolean;
      createdAt: string;
      commentAuthorUsername: string;
      commentAuthorPicture: string;
      userId: number;
    }[],
    joinedAt: string
  ) {
    this.userId = userId;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.email = email;
    this.oauth = oauth;
    this.role = role;
    this.posts = posts;
    this.notification = notification;
    this.joinedAt = joinedAt;
  }
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user data from local storage when the component initializes
  useEffect(() => {
    // Load user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      const data = JSON.parse(userData);

      // Check if the user data is still valid (within one hour)
      const currentTime = new Date().getTime();
      const savedTime = new Date(data.timestamp).getTime();
      const timeDifference = currentTime - savedTime;

      if (timeDifference < 3600000) {
        setUser(data.user);
      } else {
        // Data is older than an hour, remove it from local storage
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);

    // Save user data with a timestamp to local storage
    const data = {
      user: userData,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);

    // Remove user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("jwt_token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
