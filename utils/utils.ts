import {ReactNode} from "react";

export interface Tappable<T extends unknown> {
    onClick?: (...args: T[]) => void;
}

export interface hasChildren {
    children?: ReactNode;
}

export const LocalGet = (key: string) => localStorage.getItem(key);
export const LocalStore = (key: string, value: string) => localStorage.setItem(key, value);
export const LocalDelete = (key: string) => localStorage.removeItem(key);
export const LocalClear = () => localStorage.clear();
export const LocalKey = (index: number) => localStorage.key(index);

export type Nullable<T> = T | null
export type NullablePromise<T> = Promise<Nullable<T>>

export const wait = (ms: number) => { const timeout = Date.now() + ms; while (Date.now() < timeout) {} };
export const waitAsync = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export type Optional<T> = { [P in keyof T]?: T[P] }