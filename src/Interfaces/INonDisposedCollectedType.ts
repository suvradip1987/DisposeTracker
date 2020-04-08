import { ICallStack } from "./ICallStack";
import { CallStack } from "../CallStack";

export interface INonDisposedCollectedType
{
    AddStack(callStacks: ICallStack):boolean;
    readonly CallStacks:CallStack[];
    readonly Count: Number;
    readonly Name: string;

}