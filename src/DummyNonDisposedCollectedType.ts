import { INonDisposedCollectedType } from "./Interfaces/INonDisposedCollectedType";
import { CallStack } from "./CallStack";

export class DummyNonDisposedCollectedType implements INonDisposedCollectedType
{
    AddStack(callStack: CallStack): boolean {
        throw new Error("Method not implemented.");
    }
    get Name(): string {
        throw new Error("Method not implemented.");
    }

    get CallStacks() : CallStack[]
    {
        throw new Error("Method not implemented.");
    }

    get Count(): Number {
        throw new Error("Method not implemented.");
    }       
}