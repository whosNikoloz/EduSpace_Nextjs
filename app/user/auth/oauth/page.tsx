"use client";

import { useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Authenitcation from "@/app/api/User/auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use "router" instead of "navigation"
import Styles from "@/styles/Loader.module.css";
import Image from "next/image";
import EduSpace from "@/public/EduSpaceLogo.png";

interface CustomSession extends Session {
  provider?: string;
  providerId?: string;
}

interface OAuthUserModel {
  email: string;
  name: string;
  image: string;
  provider: string;
  providerId: string;
}

export default function oauthPage() {
  const { data: session } = useSession();
  const auth = Authenitcation();
  const router = useRouter();

  useEffect(() => {
    async function oauth() {
      if (session) {
        const customSession = session as CustomSession;
        const userModel: OAuthUserModel = {
          email: session.user?.email ?? "",
          name: session.user?.name ?? "",
          image: session.user?.image ?? "",
          provider: customSession.provider ?? "",
          providerId: customSession.providerId || "",
        };

        // Add a simple check to prevent duplicate registration attempts
        if (localStorage.getItem("registrationInProgress") === "true") {
          return;
        }

        localStorage.setItem("registrationInProgress", "true");

        const checkemail = await auth.CheckeOAuthExist(
          userModel.provider,
          userModel.providerId
        );

        if (checkemail) {
          const loginoauth = await auth.handleOAuthLogin(
            userModel.provider,
            userModel.providerId
          );
          if (loginoauth) {
            try {
              await signOut({ callbackUrl: "/" });
            } catch (error) {
              console.error("Error during sign-out:", error);
            }
          }
        } else {
          const registeroauth = await auth.handleoAuthRegistration(
            userModel.email,
            userModel.name,
            userModel.image,
            userModel.provider,
            userModel.providerId
          );
          if (registeroauth) {
            const loginoauth = await auth.handleOAuthLogin(
              userModel.provider,
              userModel.providerId
            );
            if (loginoauth) {
              try {
                await signOut({ callbackUrl: "/" });
              } catch (error) {
                console.error("Error during sign-out:", error);
              }
            }
          } else {
            console.log(registeroauth);
          }
        }

        localStorage.removeItem("registrationInProgress");
      }
    }
    oauth();
  }, [session]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
      <div className={Styles.Loader}>
        <Image
          src={EduSpace}
          alt="Description of the image"
          width={100}
          height={100}
        />
      </div>
    </section>
  );
}
