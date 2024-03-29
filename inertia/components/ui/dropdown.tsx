import { Link } from "@inertiajs/react";
import { animated, useTransition } from "@react-spring/web";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";

type DropdownItem = {
  label: string;
  icon: JSX.Element;
  link?: string;
  onClick?: () => void;
};

interface Props extends PropsWithChildren {
  items: DropdownItem[];
}

export function Dropdown(props: Props) {
  const { items, children } = props

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);

  const transitions = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: "translate3d(0%,-5%,0%)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0%,0%,0%)",
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0%,5%,0%)",
    },
    config: {
      duration: 250,
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !dropdownButtonRef?.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      ref={dropdownRef}
      className={css({ position: "relative", cursor: "pointer" })}
    >
      <div
        ref={dropdownButtonRef}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {children}
      </div>
      {transitions((style, isToggled) => (
        <>
          {isToggled && (
            <animated.ul
              style={style}
              className={vstack({
                zIndex: "10",
                backgroundColor: "white",
                width: "15rem",
                alignItems: "left",
                position: "absolute",
                right: 0,
                overflow: "hidden",
                marginTop: "1rem",
                gap: "0",
                rounded: "10px",
                border: "solid black 2px",
              })}
            >
              {items.map(({ label, link, icon, onClick }) => (
                <li
                  className={css({
                    textStyle: "body",
                    _hover: { bgColor: "gray" },
                  })}
                  key={label}
                >
                  {link ? (
                    <Link
                      className={hstack({
                        padding: ".75rem",
                      })}
                      href={link ?? ""}
                    >
                      {icon} {label}
                    </Link>
                  ) : (
                    <div
                      onClick={onClick}
                      className={hstack({
                        padding: ".75rem",
                      })}
                    >
                      {icon} {label}
                    </div>
                  )}
                </li>
              ))}
            </animated.ul>
          )}
        </>
      ))}
    </div>
  );
}