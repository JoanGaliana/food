import { Dispatch, SetStateAction } from "react";

type SetState<S> = Dispatch<SetStateAction<S>>;

export default SetState;