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

  notifications: Array<{
    notificationId: number;
    message: string;
    isRead: boolean;
    createdAt: string;
    userId: number;
  }>;

  constructor(
    userId: number,
    userName: string,
    firstName: string,
    lastName: string,
    picture: string,
    email: string,
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
    notifications: {
      notificationId: number;
      message: string;
      isRead: boolean;
      createdAt: string;
      userId: number;
    }[]
  ) {
    this.userId = userId;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.email = email;
    this.role = role;
    this.posts = posts;
    this.notifications = notifications;
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
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Save user data to local storage when they log in
    //sessionStorage.setItem("userSession", JSON.stringify(userData));
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // Remove user data from local storage when they log out
    localStorage.removeItem("user");
    localStorage.removeItem("jwt_token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
