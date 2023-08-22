export const enum RestrictChar {
    
// completteString = '`;\*?~<>^{}$\r',
// ` ; * % _ = & \ | ? ~ < > ^ ( ) [ ] { } $ \n \r
        backtick='`',
        semicolon=';',
        slashChar='\*',
        questionMark='?',
        opposite='~',
        lessThan='<',
        greaterThan='>',
        power='^',
        openCurlyBraces='{',
        closedCurlyBraces='}',
        dollarSign='$',
        slashR='\r',
        pipe='|',
        ampersand='&',
        equalTo='=',
        underscore='_',
        forwardSlash='\\',
        openSquareBracket='[',
        closeSquareBracket=']',
        openParentheses='(',
        closeParentheses=')',
        backslashN='\n',
        atSign='@',
        backwardSlash='/',
        doubleQuotationMark='"',
        singleQuotationMark="'",
        colon=':',
        hyphen='-',

        // textField=["`",";","*","?","~","<",">","^","{","}","$","\r","|","&","=","\\","[","]","\n","/",":"]
}
//  export const blockChar =["@",",","`",";","*","?","~","<",">","^","{","}","$","\r","|","&","=","\\","[","]","\n","/",":"]
//  export const blockChar =["`",";","*","~","<",">","^","%","[","]","{","}","^","&","(",")","|"];
 export const blockChar = ["`", ";", "*", "%", "&", "|", "~", "<", ">", "^", "(", ")", "[", "]", "{", "}", "$", "\n", "\r"];
 export const name = ["(",")","%"]
 export const kpiName = ["(",")","%"];
 export const address =["\n","(",")","," ,";"];
 export const gallary = ["(", ")", "%"];
 export const projectObjective =["\n","(",")","\"","`",";" ]
 export const projectName = ['(', ')', '&']
 export const vendorName =  ['(', ')', '&']
 export const ngoVision  =['\n', '(', ')', '`']
 export const esopDescription = ["(",")"] 
 export const budgetHead = ["(",")",","] 
 export const projectDataDescription = ['(', ')', '%'];
// `;\*?~<>^{}$\r
// \n()' " ` ;