import { IonText, IonToast } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";

const ErrorToast: React.VFC = () => {
  const error = useAppSelector(({ error }) => error);
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (error.message) {
      setIsOpen(true);
    }
  }, [error]);

  if (!error.message) {
    return null;
  }

  return (
    <IonToast
      isOpen={isOpen}
      message={error.message}
      duration={2000}
      onDidDismiss={handleDismiss}
      // position="top"
      color="danger"
    />
  );
};

export default ErrorToast;
