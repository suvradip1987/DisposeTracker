import { ICallStack } from "../Interfaces/ICallStack";

export class CallStack implements ICallStack
{
    m_stackFrames:string[];
    m_nbrOfExecution:Number;
    constructor(count : number)
    {   
        this.m_stackFrames=[];
        this.m_nbrOfExecution=count;
    }

    AddStackFrames(stackFrames:string)
    {
        this.m_stackFrames.push(stackFrames);
    }

    get StackFrames(): string[] {
        return this.m_stackFrames;
    }

    get Count(): Number {
        return this.m_nbrOfExecution;
    }
}