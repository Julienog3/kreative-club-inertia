import { Button } from "./../../ui/button";
import LoginForm from "./forms/login-form";
import { Modal, modalTransitionConfig } from "./../../ui/modal/modal";
import { useStoreAuthModal } from "./auth-modal.store";
import { useTransition } from "@react-spring/web";
import SignUpForm from "./forms/signup-form";

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
            {isOpened && <Modal onClose={closeModal} style={{ ...style }} title="Connexion">
              <LoginForm />
              <Button onClick={(): void => changeModalType(AuthModalType.SIGNUP)}>
                Sign up
              </Button>
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
          {isOpened && <Modal onClose={closeModal} style={{ ...style }} title="Inscription">
            <SignUpForm />
            <Button onClick={(): void => changeModalType(AuthModalType.LOGIN)}>
              Login
            </Button>
          </Modal>}
        </>
        ))}
     </>
    );
  }

  return;
};

export default AuthModal;
