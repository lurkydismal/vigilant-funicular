import { ReactElement } from "react";

export interface Step {
    title: string;
    item: ReactElement;
}

export type MoveNext = () => void;

export interface FormProps {
    moveNext: MoveNext;
}
