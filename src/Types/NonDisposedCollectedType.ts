import {CallStack} from "../Types/CallStack"
import {INonDisposedCollectedType} from "../Interfaces/INonDisposedCollectedType"

export class NonDisposedCollectedType implements INonDisposedCollectedType
{
    private m_Name:string;
    private m_Count : Number;
    private m_ListOfCallStacks: CallStack[];

    get Name(): string {
        return this.m_Name;
    }

    get Count(): Number {
        return this.m_Count;
    }

    get CallStacks() : CallStack[]
    {
        return this.m_ListOfCallStacks;
    }
    
    constructor(name : string,count :Number)
    {
        this.m_Name=name;
        this.m_Count=count;
        this.m_ListOfCallStacks= [];        
    }    

    AddStack(callStack: CallStack):boolean
    {
        this.m_ListOfCallStacks.push(callStack);
        return true;
    }

}