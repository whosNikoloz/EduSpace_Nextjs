"use client";

import { title } from "@/components/Home/primitives";
import { Hero } from "@/components/signupsuccessful/Hero";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Authenitcation from "@/app/api/User/auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Styles from "@/styles/Loader.module.css";
import Image from "next/image";
import EduSpace from "@/public/EduSpaceLogo.png";

interface CustomSession extends Session {
  provider?: string; // Add the provider property
  providerId?: string; // Add the access token property if needed
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

        const checkemail = await auth.CheckeMailExist(userModel.email);
        console.log(checkemail);
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
          } else {
            console.log(loginoauth);
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
          width={100} // Specify the width of the image
          height={100}
        />
      </div>
    </section>
  );
}
