import { ICallStack } from "./Interfaces/ICallStack";

export class DummyCallStack implements ICallStack
{
    AddStackFrames(stackFrames:string)
    {
        throw new Error("Method not implemented.");
    }

    get StackFrames(): string[] {
        throw new Error("Method not implemented.");
    }

    get Count(): Number {
        throw new Error("Method not implemented.");
    }
}