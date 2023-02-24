const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "easylogx" is now active!');

	let disposable = vscode.commands.registerCommand('easylogx.addLazyDebugging', function () {

        let consoleLogText = "📃 EasyLogX Lazy Debugging: "

		// get the sellected text from the editor
		let editor = vscode.window.activeTextEditor;
		let selection = editor.selection;

		let text = editor.document.getText(selection);

        // add the consoleLogText at the beginning of the text with double quoets also convert the text to a string
        text = '"' + consoleLogText + '" + ' +  String(text) ;


		// detect what is the language of the file
		let language = editor.document.languageId;

		let currentLine = editor.selection.active.line;

		// get the current line text
		let currentLineText = editor.document.lineAt(currentLine).text;

		// get the current line identation
		let currentLineIdentation = currentLineText.substring(0, currentLineText.indexOf(currentLineText.trim()));

		// print a console.log on the next line, with the same identation
		let newLine = currentLine + 1;

		let languageSpecificConsoleLog = '';

        // conditioanly set the language specific console log
        switch (language) {
            case 'javascript':
                languageSpecificConsoleLog = `console.log(${text});\n`;
                break;
            case 'typescript':
                languageSpecificConsoleLog = `console.log(${text});\n`;
                break;
            case 'python':
                languageSpecificConsoleLog = `print(${text})\n`;
                break;
            case 'java':
                languageSpecificConsoleLog = `System.out.println(${text});\n`;
                break;
            case 'csharp':
                languageSpecificConsoleLog = `Console.WritelanguageSpecificConsoleLog(${text});\n`;
                break;
            case 'php':
                languageSpecificConsoleLog = `echo ${text};\n`;
                break;
            case 'ruby':
                languageSpecificConsoleLog = `puts ${text}\n`;
                break;
            case 'go':
                languageSpecificConsoleLog = `fmt.Println(${text})\n`;
                break;
            case 'rust':
                languageSpecificConsoleLog = `println!(${text})\n`;
                break;
            case 'swift':
                languageSpecificConsoleLog = `print(${text})\n`;
                break;
            case 'kotlin':
                languageSpecificConsoleLog = `println(${text})\n`;
                break;
            case 'dart':
                languageSpecificConsoleLog = `print(${text})\n`;
                break;
            case 'scala':
                languageSpecificConsoleLog = `println(${text})\n`;
                break;
            case 'haskell':
                languageSpecificConsoleLog = `putStrLn ${text}\n`;
                break;
            case 'elixir':
                languageSpecificConsoleLog = `IO.puts(${text})\n`;
                break;
            case 'clojure':
                languageSpecificConsoleLog = `(println ${text})\n`;
                break;
            case 'fsharp':
                languageSpecificConsoleLog = `printfn ${text}\n`;
                break;
            case 'erlang':
                languageSpecificConsoleLog = `io:format(${text})\n`;
                break;
            case 'perl':
                languageSpecificConsoleLog = `print ${text}\n`;
                break;
            case 'lua':
                languageSpecificConsoleLog = `print(${text})\n`;
                break;
            case 'r':
                languageSpecificConsoleLog = `print(${text})\n`;
                break;
            case 'powershell':
                languageSpecificConsoleLog = `Write-Host ${text}\n`;
                break;
            case 'coffeescript':
                languageSpecificConsoleLog = `console.log(${text})\n`;
                break;
            case 'julia':
                languageSpecificConsoleLog = `println(${text})\n`;
                break;
            case 'nim':
                languageSpecificConsoleLog = `echo ${text}\n`;
                break;
            case 'crystal':
                languageSpecificConsoleLog = `puts ${text}\n`;
                break;
            case 'ocaml':
                languageSpecificConsoleLog = `print_endlanguageSpecificConsoleLog ${text}\n`;
                break;
            case 'groovy':
                languageSpecificConsoleLog = `println ${text}\n`;
                break;
            case 'pascal':
                languageSpecificConsoleLog = `writeln(${text})\n`;
                break;
            case 'racket':
                languageSpecificConsoleLog = `(display ${text})\n`;
                break;
            case 'scheme':
                languageSpecificConsoleLog = `(display ${text})\n`;
                break;
            case 'smalltalk':
                languageSpecificConsoleLog = `Transcript cr; show: ${text}.\n`;
                break;
            case 'fortran':
                languageSpecificConsoleLog = `write(*,*) ${text}\n`;
                break;
            case 'd':
                languageSpecificConsoleLog = `writeln(${text})\n`;
                break;
            case 'lisp':
                languageSpecificConsoleLog = `(print ${text})\n`;
                break;
            case 'hack':
                languageSpecificConsoleLog = `echo ${text}\n`;
                break;
            case 'matlab':
                languageSpecificConsoleLog = `disp(${text})\n`;
                break;
            case 'verilog':
                languageSpecificConsoleLog = `display ${text}\n`;
                break;
            case 'vhdl':
                languageSpecificConsoleLog = `report ${text}\n`;
                break;
            case 'ada':
                languageSpecificConsoleLog = `put_languageSpecificConsoleLog(${text})\n`;
                break;
            case 'prolog':
                languageSpecificConsoleLog = `write(${text})\n`;
                break;
            case 'sql':
                languageSpecificConsoleLog = `print ${text}\n`;
                break;
            case 'tcl':
                languageSpecificConsoleLog = `puts ${text}\n`;
                break;
            case 'visualbasic':
                languageSpecificConsoleLog = `Console.WritelanguageSpecificConsoleLog(${text})\n`;
                break;
            case 'actionscript':
                languageSpecificConsoleLog = `trace(${text})\n`;
                break;
            case 'apex':
                languageSpecificConsoleLog = `System.debug(${text})\n`;
                break;
            case 'c':
                languageSpecificConsoleLog = `printf(${text})\n`;
                break;
            case 'cpp':
                languageSpecificConsoleLog = `printf(${text})\n`;
                break;
        }

        // create the new line text
		let newLineText = currentLineIdentation + languageSpecificConsoleLog;

        // insert the new line text
		editor.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(newLine, 0), newLineText);
		}
		);





	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
