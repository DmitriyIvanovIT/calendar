import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RooState} from "store";

export const useTypedSelector: TypedUseSelectorHook<RooState> = useSelector;