import { router, usePage } from "@inertiajs/react";
import { PortfolioImage } from "~/types/portfolio";
import Card from "../ui/card";
import { css } from "~/styled-system/css";
import { Button } from "../ui/button";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import Image from "~/assets/icons/image.svg?react"
import Bin from "~/assets/icons/bin.svg?react"
import { User } from "~/types";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";

interface Props {
  portfolioImage: PortfolioImage;
  isEditionMode?: boolean;
  // onDelete: (portfolioImageId: string) => void;
};

export function PortfolioImageCard({
  portfolioImage,
  isEditionMode = false,
}: Props) {
  const { addItem } = useSnackbarStore(state => state)
  const { props: { user } } = usePage()

  function onDelete(id: string) {
    router.delete(`/portfolio/images/${id}`, {
      preserveScroll: true,
      onSuccess: () => {
        addItem({ type: "success", message: "L'image a correctement été supprimé."})
      }
    })
  }

  function setIllustration(id :string) {
    router.post(`/creatives/thumbnail/${id}`, {}, {
      preserveScroll: true,
      onSuccess: () => {
        addItem({ type: "success", message: "L'image a correctement été modifié."})
      }
    })
  }

  // const setIllustrationPortfolioFolder = usePortfolioFolderIllustration(
  //   user.id,
  // );

  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  const buttonStyle = useSpring({
    opacity: isCardHovered ? "1" : "0",
    transform: isCardHovered ? "scale(1)" : "scale(0)",
  });

  return (
    <Card
      css={{ h: "18rem", pos: "relative", cursor: "pointer", w: "100%" }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div
        className={css({
          pos: "absolute",
          display: "flex",
          right: 0,
          p: ".5rem",
          gap: ".5rem",
        })}
      >
        {isEditionMode && (user as User).id === portfolioImage.userId && (
          <>
            <animated.div style={buttonStyle}>
              <Button
                variant="warning"
                onClick={() => setIllustration(portfolioImage.id)}
              >
                <Image />
              </Button>
            </animated.div>
            <animated.div style={buttonStyle}>
              <Button
                variant="danger"
                onClick={() => onDelete(portfolioImage.id)}
              >
                <Bin />
              </Button>
            </animated.div>
          </>
        )}
      </div>
      <img
        className={css({
          objectFit: "cover",
          h: "100%",
          w: "100%",
        })}
        src={'http://localhost:3333' + portfolioImage?.image}
        alt={portfolioImage.title}
      />
    </Card>
  );
};
