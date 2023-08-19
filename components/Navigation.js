import React from "react";
import Image from "next/image";
import { ImStatsBars } from "react-icons/im";
import { useContext } from "react";
import { authContext } from "@/libs/store/auth-context";
import Link from "next/link";

export default function Navigation() {
  const { user, logout, loading } = useContext(authContext);

  return (
    <header className="container max-w-2xl p-6 mx-auto">
      <div className="flex items-center justify-between ">
        {/* user information */}

        {user && !loading && (
          <div className="flex items-center gap-2">
            <Image
              src={user.photoURL}
              alt={user.displayName}
              referrerPolicy="no-referrer"
              width={40}
              height={40}
            />
            <small>Hello {user.displayName}!</small>
          </div>
        )}

        {/* rigth side of navigation */}

        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div>
              <ImStatsBars className="text-2xl" />
            </div>
            <div>
              <button onClick={logout} className="btn btn-sign">
                sign out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
