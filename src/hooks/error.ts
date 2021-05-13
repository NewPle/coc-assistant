import {
  ErrorState,
  updateError as updateErrorState,
} from "../modules/features/error/errorSlice";
import { useAppDispatch } from "./redux";

export const useError = () => {
  const dispatch = useAppDispatch();

  const updateError = ({ message, where }: ErrorState) => {
    dispatch(updateErrorState({ message, where }));
  };

  return { updateError };
};
