import { Page } from './../page';
import { expand } from 'rxjs/operators';
export class Log extends Page{ 
    id?:string;
    logType:string;
}