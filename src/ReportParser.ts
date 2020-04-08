import * as fs from 'fs';
import * as rl from 'readline';
const { once } = require('events');
import { NonDisposedCollectedType } from "./NonDisposedCollectedType";
import { INonDisposedCollectedType } from "./Interfaces/INonDisposedCollectedType"
import { CallStack } from './CallStack';
import { DummyNonDisposedCollectedType } from './DummyNonDisposedCollectedType';
import { ICallStack } from './Interfaces/ICallStack';
import { DummyCallStack } from './DummyCallStack';


export class ReportParser {
    m_filePath: string;
    m_ListOfNonDisposedCollectedType: INonDisposedCollectedType[];
    m_CurrentNonDisposedCollectedType: INonDisposedCollectedType;
    m_CurrentCallStack:ICallStack;

    constructor(path: string) {
        this.m_filePath = path;
        this.m_ListOfNonDisposedCollectedType = [];       
        this.m_CurrentNonDisposedCollectedType= new DummyNonDisposedCollectedType();
        this.m_CurrentCallStack= new DummyCallStack();
    }

    async Parse() {
        try {
            const readline = rl.createInterface({
                //input: fs.createReadStream(this.m_filePath,{encoding: 'utf16le'}),
                input: fs.createReadStream('./Portal.Profiler.Summarycopy.log', { encoding: 'utf16le' }),
            });

            readline.on('line',
                (line) => {
                    line = line.trim();
                    if (line.length > 0) {                       
                        this.LineHandler(line);
                    }
                });
            await once(readline, 'close');            
            console.log('File processed.');
            var jsonData= JSON.stringify(this.m_ListOfNonDisposedCollectedType);
            console.log(jsonData);
        }
        catch (error) {
            console.error(error);
        }
    }

    LineHandler(line: string) {
        if (line.startsWith('Collected disposables')) {
            var collectedDisposableObject = line.substring(
                line.lastIndexOf("('") + 2,
                line.lastIndexOf("')")
            );
            var total = Number.parseInt(line.substring(
                line.lastIndexOf("(") + 1,
                line.lastIndexOf(")"))
            );  
            this.m_CurrentNonDisposedCollectedType = new NonDisposedCollectedType(collectedDisposableObject, total);          
            this.m_ListOfNonDisposedCollectedType.push(this.m_CurrentNonDisposedCollectedType);
        }
        else if (line.startsWith('- hit(')) {
            var count = Number.parseInt(line.substring(
                line.indexOf("(") + 1,
                line.indexOf(")")
            ));        
            this.m_CurrentCallStack= new CallStack(count);
            this.m_CurrentNonDisposedCollectedType.AddStack(this.m_CurrentCallStack);            
        }
        else {             
            this.m_CurrentCallStack.AddStackFrames(line);
        }
    }

    PrintItem(): void {       
        this.m_ListOfNonDisposedCollectedType.forEach(element => {
            console.log(element.Name + ':' + element.Count);
        });
    }
}
