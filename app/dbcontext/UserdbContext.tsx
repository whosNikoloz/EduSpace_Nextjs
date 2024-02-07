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
  phoneNumber: string;
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
    phoneNumber: string,
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
    this.phoneNumber = phoneNumber;
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
  const [loading, setLoading] = useState(true); // Add loading state

  // Load user data from local storage when the component initializes
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const data = JSON.parse(userData);
      const currentTime = new Date().getTime();
      const savedTime = new Date(data.timestamp).getTime();
      const timeDifference = currentTime - savedTime;

      if (timeDifference < 3600000) {
        setUser(data.user);
      } else {
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // Set loading to false once user data is loaded or not
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    const data = {
      user: userData,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwt_token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {loading ? ( // Render loading state
        <div className="h-screen bg-black"></div>
      ) : (
        children // Render children when loading is finished
      )}
    </UserContext.Provider>
  );
};
