import { PropsWithChildren } from "react";
import { Snackbar } from "../ui/snackbar/snackbar";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { usePage } from "@inertiajs/react";
import { hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";



export function AdminLayout({ children }: PropsWithChildren) {
  const { props: { user } } = usePage() 
  // const isShowed = useStoreAuthModal(({ isShowed }) => isShowed);
  // const modalTransition = useTransition(isShowed, modalTransitionConfig);

  return (
    <>
      {/* {modalTransition((style, isOpened) => (
        <>{isOpened && <AuthModal style={{ ...style }} />}</>
      ))} */}
      <div
        className={hstack({
          backgroundColor: "background",
          gap: 0,
          alignItems: "start",
          minH: "screen",
        })}
      >
        <Snackbar />
        <Sidebar user={user as User}/>
        <div className={vstack({ w: "100%", ml: "18rem", minH: "screen" })}>
          <Header user={user as User}/>
          <div
            className={vstack({
              minHeight: "100vh",
              width: "100%",
              maxWidth: "breakpoint-xl",
              margin: "0 auto",
              p: "1.5rem",
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
