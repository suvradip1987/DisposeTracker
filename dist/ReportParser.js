"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const rl = __importStar(require("readline"));
const NonDisposedCollectedType_1 = require("./Types/NonDisposedCollectedType");
const CallStack_1 = require("./Types/CallStack");
const DummyNonDisposedCollectedType_1 = require("./Types/DummyNonDisposedCollectedType");
const DummyCallStack_1 = require("./Types/DummyCallStack");
//const {once} = require('events');
const EventEmitter = __importStar(require("events"));
class ReportParser {
    constructor(path) {
        this.m_isErrorOccurred = false;
        this.m_filePath = path;
        this.m_ListOfNonDisposedCollectedType = [];
        this.m_CurrentNonDisposedCollectedType = new DummyNonDisposedCollectedType_1.DummyNonDisposedCollectedType();
        this.m_CurrentCallStack = new DummyCallStack_1.DummyCallStack();
    }
    Parse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!fs.existsSync(this.m_filePath)) {
                    //throw new Error('File path doesot exist:' + this.m_filePath);
                    console.log('File does not exist. File path:' + this.m_filePath);
                }
                this.m_readline = rl.createInterface({
                    //input: fs.createReadStream(this.m_filePath,{encoding: 'utf16le'}),
                    input: fs.createReadStream('./temp/Portal.Profiler.Summarycopy.log', { encoding: 'utf16le' }),
                });
                this.m_readline.on('line', (line) => {
                    this.ExtractLine(line);
                });
                yield EventEmitter.once(this.m_readline, 'close');
                console.log(JSON.stringify(this.m_ListOfNonDisposedCollectedType));
                // let jsonData = JSON.stringify(this.m_ListOfNonDisposedCollectedType);
                // let listofCollectedItems = JSON.parse(jsonData);                    
                return !this.m_isErrorOccurred;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    ExtractLine(currentLine) {
        var _a, _b;
        currentLine = currentLine.trim();
        if (currentLine.length > 0) {
            try {
                if (currentLine.startsWith('Collected disposables')) {
                    var collectedDisposableObject = currentLine.substring(currentLine.lastIndexOf("('") + 2, currentLine.lastIndexOf("')"));
                    var total = Number.parseInt(currentLine.substring(currentLine.lastIndexOf("(") + 1, currentLine.lastIndexOf(")")));
                    this.m_CurrentNonDisposedCollectedType = new NonDisposedCollectedType_1.NonDisposedCollectedType(collectedDisposableObject, total);
                    this.m_ListOfNonDisposedCollectedType.push(this.m_CurrentNonDisposedCollectedType);
                }
                else if (currentLine.startsWith('- hit(')) {
                    var count = Number.parseInt(currentLine.substring(currentLine.indexOf("(") + 1, currentLine.indexOf(")")));
                    this.m_CurrentCallStack = new CallStack_1.CallStack(count);
                    this.m_CurrentNonDisposedCollectedType.AddStack(this.m_CurrentCallStack);
                }
                else {
                    this.m_CurrentCallStack.AddStackFrames(currentLine);
                }
            }
            catch (error) {
                console.log(error);
                this.m_isErrorOccurred = true;
                // this will ensure readline.close event will fire. 
                (_a = this.m_readline) === null || _a === void 0 ? void 0 : _a.close();
                //this will ensure in case of error further readline.line events will not fire. 
                (_b = this.m_readline) === null || _b === void 0 ? void 0 : _b.removeAllListeners();
            }
        }
    }
    PrintItem() {
        this.m_ListOfNonDisposedCollectedType.forEach(element => {
            console.log(element.Name + ':' + element.Count);
        });
    }
    TimepassWork() {
        return new Promise((resolve, reject) => {
            var c = this.PrintItem();
            if (c instanceof CallStack_1.CallStack) {
                resolve();
            }
            else {
                reject();
            }
        });
    }
}
exports.ReportParser = ReportParser;
