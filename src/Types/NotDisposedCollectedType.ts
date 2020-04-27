import {INonDisposedCollectedType} from "../Interfaces/INonDisposedCollectedType"
import { ICallStack } from "../Interfaces/ICallStack";

export class NotDisposedCollectedType implements INonDisposedCollectedType
{
    private m_Name:string;
    private m_Count : Number;
    private m_ListOfCallStacks: ICallStack[];

    get Name(): string {
        return this.m_Name;
    }

    get Count(): Number {
        return this.m_Count;
    }

    get CallStacks() : ICallStack[]
    {
        return this.m_ListOfCallStacks;
    }
    
    constructor(name : string,count :Number)
    {
        this.m_Name=name; 
        this.m_Count=count;
        this.m_ListOfCallStacks= [];        
    }    

    AddStack(callStack: ICallStack):boolean
    {
        this.m_ListOfCallStacks.push(callStack);
        return true;
    }

}