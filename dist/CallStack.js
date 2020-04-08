"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CallStack {
    constructor(count) {
        this.m_stackFrames = [];
        this.m_nbrOfExecution = count;
    }
    AddStackFrames(stackFrames) {
        this.m_stackFrames.push(stackFrames);
    }
    get StackFrames() {
        return this.m_stackFrames;
    }
    get Count() {
        return this.m_nbrOfExecution;
    }
}
exports.CallStack = CallStack;
