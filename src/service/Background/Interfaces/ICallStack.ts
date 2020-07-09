export interface ICallStack
{
    AddStackFrames(stackFrame:string):void;
    readonly StackFrames: string[];
    readonly Count: Number;
}