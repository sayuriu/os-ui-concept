import {atom} from "jotai";
import {LocalGet, LocalStore, Nullable} from "@utils/utils";

export const enum StateData {
    NONE,
    READ,
    WRITE
}

const enum StateAction {
    _,
    READ_ONLY,
    WRITE_ONLY,
    READ_AND_WRITE
}

type StateToStorage<T> = (fromState: T) => string;
type StorageToState<T> = (fromStorage: string) => T;

interface LocalTransform<T> {
    toState: StorageToState<T>;
    toStorage: StateToStorage<T>;
}

export function CreateAtom<T>(initValue: T) {
    const primitive = atom(initValue);
    return atom<T, T, void>(
        (get) => get(primitive),
        (get, set, newValue) => {
            set(primitive, newValue);
        }
    );
}

function LocalStorageAtom<T>(key: string, initValue: T, handshake: LocalTransform<T>) {
    const primitive = atom(initValue);
    primitive.onMount = (set) => {
        const value = LocalGet(key);
        if (value === null)
            LocalStore(key, handshake.toStorage(initValue as T))
        else set(() => handshake.toState(value) as T)
    };
    return atom<T, T, void>(
        (get) => get(primitive),
        (get, set, newValue) => {
            set(primitive, newValue);
            LocalStore(key, handshake.toStorage(newValue))
        }
    );
}

const BooleanHandshake = (matchAgainst: boolean): LocalTransform<boolean> => ({
    toState: (v) => v === matchAgainst.toString(),
    toStorage: (v) => v.toString()
});

export const SystemPref = {
    // UI: {
    //     StatusBar: {
    //         Height: LocalStorageAtom('UI.StatusBar.Height', "60px", {
    //             toState(v) {
    //
    //             }
    //         })
    //     }
    // },
    Time: {
        UseMilitary: LocalStorageAtom('System.Time.UseMilitary', true, BooleanHandshake(true)),
        GMTOffset: LocalStorageAtom('System.Time.GMTOffset', 0, {
            toState(v) {
                const offset = Number(v);
                if (isNaN(offset)) return 0;
                if (Math.abs(offset) > 12)
                    return ((offset > 0) ? -1 : 1) * (offset - 12);
                return offset;
            },
            toStorage: (v) => v.toString()
        })
    },
    Clock: {
        BlinkAnimation: LocalStorageAtom('Clock.BlinkAnimation', true, BooleanHandshake(true)),
        DefadeZerosOnHover: LocalStorageAtom('Clock.DefadeZerosOnHover', true, BooleanHandshake(true)),
    }
}
