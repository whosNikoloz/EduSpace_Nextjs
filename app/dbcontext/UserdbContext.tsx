import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  FC,
} from "react";
import { jwtDecode } from "jwt-decode";

class User {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  phoneNumber: string;
  role: string;
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
    joinedAt: string
  ) {
    this.userId = userId;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.joinedAt = joinedAt;
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

const EncodeJwtIntoUser = (userToken: string) => {
  const decodedToken: any = jwtDecode(userToken); // Decode the JWT token
  const userData = {
    userId:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ][0],
    userName:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ][1],
    firstName:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ],
    lastName:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
      ],
    picture: decodedToken["ProfilePicture"],
    email:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    phoneNumber:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
      ],
    role: decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ],
    joinedAt: decodedToken["joinedAt"],
  };
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
