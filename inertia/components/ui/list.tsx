import React, { PropsWithChildren } from "react";
import { hstack, vstack } from "~/styled-system/patterns";
import Card from "./card";
import { css } from "~/styled-system/css";

interface ListHeaderProps {
  children: React.ReactNode;
  bgColor?: string;
}

interface ListProps {}

const List = ({ children }: ListProps & PropsWithChildren): JSX.Element => {
  return <Card css={{ h: "fit-content", width: "100%" }}>{children}</Card>;
};

const Header = ({ children, bgColor = "yellow" }: ListHeaderProps) => {
  return (
    <div
      className={hstack({
        p: ".75rem",
        borderBottom: "solid 2px black",
        textStyle: "body",
        bgColor,
        height: "fit-content",
      })}
    >
      {children}
    </div>
  );
};

List.Header = Header;

const Body = ({ children }: PropsWithChildren) => {
  return (
    <ul
      className={css({
        "& li": { backgroundColor: "red" },
      })}
    >
      {children}
    </ul>
  );
};

List.Body = Body;

const Item = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <li
      className={vstack({
        alignItems: "start",
        textStyle: "body",
        transition: "all",
        borderBottom: "2px solid black",
        _hover: {
          bgColor: "gray",
        },
        _lastOfType: {
          borderBottom: 0,
        },
      })}
    >
      {children}
    </li>
  );
};

List.Item = Item;

export default List;
