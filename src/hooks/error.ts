import { updateError as updateErrorState } from "../modules/features/error/errorSlice";
import { useAppDispatch } from "./redux";

export const useError = () => {
  const dispatch = useAppDispatch();

  const updateError = ({ message }: { message: string }) => {
    dispatch(updateErrorState(message));
  };

  return { updateError };
};
