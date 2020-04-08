"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NonDisposedCollectedType {
    constructor(name, count) {
        this.m_Name = name;
        this.m_Count = count;
        this.m_ListOfCallStacks = [];
    }
    get Name() {
        return this.m_Name;
    }
    get Count() {
        return this.m_Count;
    }
    get CallStacks() {
        return this.m_ListOfCallStacks;
    }
    AddStack(callStack) {
        this.m_ListOfCallStacks.push(callStack);
        return true;
    }
}
exports.NonDisposedCollectedType = NonDisposedCollectedType;
