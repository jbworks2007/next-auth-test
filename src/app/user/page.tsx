"use client";
import React from "react";
import Image from "next/image";
import img from "../../../public/image.jpg";
import { useSession, signOut, signIn } from "next-auth/react";

export default function page() {
  const { data: session, status } = useSession();
  console.log("session data :", session);

  if (status === "authenticated")
    return (
      <>
        <div className="container px-2">
          <h1>User Route</h1>
          <h3>{session?.user?.role}</h3>
          {/* <div className="lg:columns-4 md:columns-2 sm:columns-1">
						<Image src={img} alt='image' />
						<Image src={img} alt='image' />
						<Image src={img} alt='image' />
						<Image src={img} alt='image' />
					</div> */}
          <button
            className="mt-5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            onClick={() => signOut()}
          >
            LogOut
          </button>
        </div>
      </>
    );

  if (status === "unauthenticated")
    return (
      <>
        <h1>You are not authorize to view this page</h1>
        <button
          className="mt-5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
          onClick={() => signIn()}
        >
          Back to Login
        </button>
      </>
    );
}
