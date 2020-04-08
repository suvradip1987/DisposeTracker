import { ICallStack } from "../Interfaces/ICallStack"

export interface INonDisposedCollectedType
{
    AddStack(callStacks: ICallStack):boolean;
    readonly CallStacks:ICallStack[];
    readonly Count: Number;
    readonly Name: string;

}