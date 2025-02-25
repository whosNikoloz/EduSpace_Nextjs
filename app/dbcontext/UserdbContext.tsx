import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  FC,
} from "react";
import { jwtDecode } from "jwt-decode";

enum UserRole {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}

class User {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  oauth: string;
  joinedAt: string;

  constructor(
    userId: number,
    userName: string,
    firstName: string,
    lastName: string,
    picture: string,
    email: string,
    phoneNumber: string,
    role: string,
    oauth: string,
    joinedAt: string
  ) {
    this.userId = userId;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = this.mapRole(role);
    this.oauth = oauth;
    this.joinedAt = joinedAt;
  }

  private mapRole(role: string): UserRole {
    switch (role.toLowerCase()) {
      case "admin":
        return UserRole.Admin;
      case "user":
        return UserRole.User;
      case "guest":
        return UserRole.Guest;
      default:
        throw new Error(`Invalid role: ${role}`);
    }
  }
}

interface UserContextType {
  user: User | null;
  login: (userToken: string) => void;
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

const EncodeJwtIntoUser = (userToken: string): User => {
  const decodedToken: any = jwtDecode(userToken); // Decode the JWT token
  const userData = new User(
    parseInt(
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ][0],
      10
    ),
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ][1],
    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
    ],
    decodedToken["ProfilePicture"],
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ],
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
    ],
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ],
    decodedToken["Oauth"],
    decodedToken["joinedAt"]
  );
  return userData;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userJwt = localStorage.getItem("jwt");
    const userData = userJwt ? EncodeJwtIntoUser(userJwt) : null;
    if (userData) {
      const decodedToken: any = userJwt ? jwtDecode(userJwt) : null;
      const currentTime = new Date().getTime();
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      if (currentTime < expirationTime) {
        setUser(userData);
      } else {
        localStorage.removeItem("jwt");
      }
    }
    setLoading(false);
  }, []);

  const login = (userToken: string) => {
    const userData = EncodeJwtIntoUser(userToken);
    if (userData.userId != null) {
      setUser(userData);
    }
    localStorage.setItem("jwt", userToken); // Save user data to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
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
