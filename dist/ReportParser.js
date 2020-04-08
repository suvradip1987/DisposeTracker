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
const { once } = require('events');
const NonDisposedCollectedType_1 = require("./NonDisposedCollectedType");
const CallStack_1 = require("./CallStack");
const DummyNonDisposedCollectedType_1 = require("./DummyNonDisposedCollectedType");
const DummyCallStack_1 = require("./DummyCallStack");
class ReportParser {
    constructor(path) {
        this.m_filePath = path;
        this.m_ListOfNonDisposedCollectedType = [];
        this.m_CurrentNonDisposedCollectedType = new DummyNonDisposedCollectedType_1.DummyNonDisposedCollectedType();
        this.m_CurrentCallStack = new DummyCallStack_1.DummyCallStack();
    }
    Parse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readline = rl.createInterface({
                    //input: fs.createReadStream(this.m_filePath,{encoding: 'utf16le'}),
                    input: fs.createReadStream('./Portal.Profiler.Summarycopy.log', { encoding: 'utf16le' }),
                });
                readline.on('line', (line) => {
                    line = line.trim();
                    if (line.length > 0) {
                        this.LineHandler(line);
                    }
                });
                yield once(readline, 'close');
                console.log('File processed.');
                var jsonData = JSON.stringify(this.m_ListOfNonDisposedCollectedType);
                console.log(jsonData);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    LineHandler(line) {
        if (line.startsWith('Collected disposables')) {
            var collectedDisposableObject = line.substring(line.lastIndexOf("('") + 2, line.lastIndexOf("')"));
            var total = Number.parseInt(line.substring(line.lastIndexOf("(") + 1, line.lastIndexOf(")")));
            this.m_CurrentNonDisposedCollectedType = new NonDisposedCollectedType_1.NonDisposedCollectedType(collectedDisposableObject, total);
            this.m_ListOfNonDisposedCollectedType.push(this.m_CurrentNonDisposedCollectedType);
        }
        else if (line.startsWith('- hit(')) {
            var count = Number.parseInt(line.substring(line.indexOf("(") + 1, line.indexOf(")")));
            this.m_CurrentCallStack = new CallStack_1.CallStack(count);
            this.m_CurrentNonDisposedCollectedType.AddStack(this.m_CurrentCallStack);
        }
        else {
            this.m_CurrentCallStack.AddStackFrames(line);
        }
    }
    PrintItem() {
        this.m_ListOfNonDisposedCollectedType.forEach(element => {
            console.log(element.Name + ':' + element.Count);
        });
    }
}
exports.ReportParser = ReportParser;
