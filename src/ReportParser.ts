import * as fs from 'fs';
import * as rl from 'readline';
import * as EventEmitter from 'events';
import { NonDisposedCollectedType } from "./Types/NonDisposedCollectedType";
import { INonDisposedCollectedType } from "./Interfaces/INonDisposedCollectedType";
import { CallStack } from './Types/CallStack';
import { DummyNonDisposedCollectedType } from './Types/DummyNonDisposedCollectedType';
import { ICallStack } from './Interfaces/ICallStack';
import { DummyCallStack } from './Types/DummyCallStack';

export class ReportParser {
    m_fileName: string;
    m_ListOfNonDisposedCollectedType: INonDisposedCollectedType[];
    m_CurrentNonDisposedCollectedType: INonDisposedCollectedType;
    m_CurrentCallStack: ICallStack;
    m_isErrorOccurred: boolean = false;
    m_readline: rl.Interface | undefined;

    constructor(name: string) {
        this.m_fileName = name;
        this.m_ListOfNonDisposedCollectedType = [];
        this.m_CurrentNonDisposedCollectedType = new DummyNonDisposedCollectedType();
        this.m_CurrentCallStack = new DummyCallStack();
    }

    async Parse(): Promise<string> {
        try {            
            this.m_readline = rl.createInterface({
                //input: fs.createReadStream(this.m_filePath,{encoding: 'utf16le'}),
                input: fs.createReadStream('./temp/'+this.m_fileName, { encoding: 'utf16le' }),
            });

            this.m_readline.on('line',
                (line) => {
                    this.ExtractLine(line)
                }
            );

            await EventEmitter.once(this.m_readline, 'close');
            // let jsonData = JSON.stringify(this.m_ListOfNonDisposedCollectedType);
            // let listofCollectedItems = JSON.parse(jsonData);                    
            //return !this.m_isErrorOccurred;
        }
        catch (error) {
            console.error(error);
            //return false;
            return '';            
        }
        return JSON.stringify(this.m_ListOfNonDisposedCollectedType);
    }

    private ExtractLine(currentLine: string) {
        currentLine = currentLine.trim();
        if (currentLine.length > 0) {
            try {
                if (currentLine.startsWith('Collected disposables')) {
                    var collectedDisposableObject = currentLine.substring(
                        currentLine.lastIndexOf("('") + 2,
                        currentLine.lastIndexOf("')")
                    );
                    var total = Number.parseInt(currentLine.substring(
                        currentLine.lastIndexOf("(") + 1,
                        currentLine.lastIndexOf(")"))
                    );
                    this.m_CurrentNonDisposedCollectedType = new NonDisposedCollectedType(collectedDisposableObject, total);
                    this.m_ListOfNonDisposedCollectedType.push(this.m_CurrentNonDisposedCollectedType);
                }
                else if (currentLine.startsWith('- hit(')) {
                    var count = Number.parseInt(currentLine.substring(
                        currentLine.indexOf("(") + 1,
                        currentLine.indexOf(")")
                    ));
                    this.m_CurrentCallStack = new CallStack(count);
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
                this.m_readline?.close();
                //this will ensure in case of error further readline.line events will not fire. 
                this.m_readline?.removeAllListeners();
            }
        }
    }

    PrintItem(): void {
        this.m_ListOfNonDisposedCollectedType.forEach(element => {
            console.log(element.Name + ':' + element.Count);
        });
    }
}
