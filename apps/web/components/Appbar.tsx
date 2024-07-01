
"use client";
import { useState } from 'react';
import {  signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import userIcon from "../util/images/user.png";
import { useRouter } from 'next/navigation';

const AppBar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [openProfile, setOpenProfile] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between items-center mb-2 h-[5rem]">
      {/* Logo or Brand */}
      <div className="text-xl font-bold">
        <Link href="/" >
          LeetCode
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        <Link href="/contest">
          Contests
        </Link>
        <Link href="/problems">
          Problems
        </Link>
      </div>

      {/* Conditional Login Button */}
      {!session ? (
        <div className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md" onClick={()=>router.replace("signin")}>
          <Link href="/signin">Login</Link>
        </div>
      ) : (
        <div className="relative">
          {/* User Profile Icon */}
          <div className="relative">
            <div className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100" onClick={() => setOpenProfile(!openProfile)}>
              <Image src={userIcon} alt="User Icon" width={30} height={30} />
            </div>
            {/* Profile Dropdown */}
            {openProfile && (
              <div className="absolute right-0 mt-2 w-[15rem] bg-white text-black rounded-lg shadow-lg">
                <div className="flex items-center space-x-2 p-2">
                  <Image src={session.user?.image!} alt="User Icon" width={30} height={30} className="rounded-full" />
                  <div>
                    {session.user && (
                      <>
                      <p className="font-semibold">{session.user.name}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p></>
                    )}
                  </div>
                </div>
                <hr className="my-2" />
                <div className="text-gray-800 w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>router.push("/profile")}>My profile</div>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" onClick={handleSignOut}>
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppBar;
