import { Button } from "./../../ui/button";
import LoginForm from "./forms/login-form";
import { Modal, modalTransitionConfig } from "./../../ui/modal/modal";
import { useStoreAuthModal } from "./auth-modal.store";
import { useTransition } from "@react-spring/web";
import SignUpForm from "./forms/signup-form";
import { vstack } from "~/styled-system/patterns";
import { css } from "~/styled-system/css";

export enum AuthModalType {
  LOGIN = 0,
  SIGNUP = 1,
}

export function AuthModal() {
  const { type, closeModal, changeModalType, isShowed } = useStoreAuthModal(
    (store) => store,
  );

  const modalTransition = useTransition(isShowed, modalTransitionConfig);

  if (type === AuthModalType.LOGIN) {
    return (
      <>
        {modalTransition((style, isOpened) => (
          <>
            {isOpened && <Modal onClose={closeModal} style={{ ...style }} title="Connexion" description="Bon retour parmi nous !">
              <div className={vstack({ justifyItems: "center", width: "100%" })}>
                <LoginForm />
                <p className={css({ textStyle: "body", textAlign: "center" })}>Vous n'avez pas de compte ? <span className={css({ color: "purple", cursor: "pointer" })} onClick={(): void => changeModalType(AuthModalType.SIGNUP)}>Créez en un</span></p>
              </div>
            </Modal>}
          </>
        ))}
      </>
    );
  }

  if (type === AuthModalType.SIGNUP) {
    return (<>
      {modalTransition((style, isOpened) => (
        <> 
          {isOpened && <Modal 
            onClose={closeModal} 
            style={{ ...style }} 
            title="Inscription" 
            description="Bienvenue dans le club !"
          >
            <div className={vstack({ justifyItems: "center", width: "100%" })}>
              <SignUpForm />
              <p className={css({ textStyle: "body", textAlign: "center" })}>Vous avez déjà un compte ? <span className={css({ color: "purple", cursor: "pointer" })} onClick={(): void => changeModalType(AuthModalType.LOGIN)}>Connectez vous</span></p>
            </div>
          </Modal>}
        </>
        ))}
     </>
    );
  }

  return;
};

export default AuthModal;
