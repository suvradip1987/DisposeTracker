import { INonDisposedCollectedType } from "../Interfaces/INonDisposedCollectedType";
import { ICallStack } from "../Interfaces/ICallStack";

export class DummyNonDisposedCollectedType implements INonDisposedCollectedType
{
    AddStack(callStack: ICallStack): boolean {
        throw new Error("Method not implemented.");
    }
    get Name(): string {
        throw new Error("Method not implemented.");
    }

    get CallStacks() : ICallStack[]
    {
        throw new Error("Method not implemented.");
    }

    get Count(): Number {
        throw new Error("Method not implemented.");
    }       
}