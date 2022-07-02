import { Nullable } from "@utils/utils";
import { IApplicationWindow } from "@components/Window";
import {CreateAtom} from "./Global";

export interface ApplicationInstance {
    titles: string;
    window: Nullable<IApplicationWindow>;
    instanceId: number;
    states: unknown;
}

export interface IApplication {
    appId: string;
    iconURL?: string;
    instances: ApplicationInstance[];
}

export const TaskManager = {
    CurrentApplication: CreateAtom<Nullable<string>>(null),
    Applications: CreateAtom<Map<string, unknown>>(new Map()),
}