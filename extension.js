const vscode = require('vscode')

function randomConsolLogIcon () {
  const iconArray = [
    '📄',
    '🗒️',
    '📝',
    '📃',
    '📑',
    '🧾',
    '📜',
    '📋',
    '📇',
    '📰',
    '📓',
    '📔',
    '📒',
    '📕',
    '📗',
    '📘',
    '📙',
    '📚',
    '📖',
    '🗞️',
    '📑',
    '🔖',
    '🏷️'
  ]
  const randomIcon = iconArray[Math.floor(Math.random() * iconArray.length)]

  return randomIcon
}

async function addLazyDebugging (
  editor,
  selection,
  text,
  language,
  currentLine,
  currentLineText,
  currentLineIdentation
) {
  const newLine = currentLine + 1
  const icon = randomConsolLogIcon()
  // create a map object with the language and the console log text and the need for identation or not
  const languageMap = {
    javascript: {
      defaultStatement: 'console.log',
      consoleLogText: `console.log(\`${icon} LazyLogX Lazy Debugging for: ${text}  =>  \${${text}}\`);\n`,
      extraIdentation: false,
      controlFlowStatements: [
        'if',
        'else',
        'for',
        'while',
        'try',
        'catch',
        'finally',
        'with',
        'function',
        'class'
      ]
    },
    typescript: {
      defaultStatement: 'console.log',
      consoleLogText: `console.log(\`${icon} LazyLogX Lazy Debugging for: ${text}  =>  \${${text}}\`);\n`,
      extraIdentation: false,
      identationLength: null,
      controlFlowStatements: [
        'if',
        'else',
        'for',
        'while',
        'try',
        'catch',
        'finally',
        'with',
        'function',
        'class'
      ]
    },
    typescriptreact: {
      defaultStatement: 'console.log',
      consoleLogText: `console.log(\`${icon} LazyLogX Lazy Debugging for: ${text}  =>  \${${text}}\`);\n`,
      extraIdentation: false,
      identationLength: null,
      controlFlowStatements: [
        'if',
        'else',
        'for',
        'while',
        'try',
        'catch',
        'finally',
        'with',
        'function',
        'class'
      ]
    },
    python: {
      defaultStatement: 'print',
      consoleLogText: `print(\"${icon} LazyLogX Lazy Debugging for: ${text}  => \" + str(${text}))\n`,
      extraIdentation: true,
      identationLength: 4,
      controlFlowStatements: [
        'if',
        'elif',
        'else',
        'for',
        'while',
        'try',
        'except',
        'finally',
        'with',
        'def',
        'class'
      ]
    },
    go: {
      defaultStatement: 'fmt.Println',
      consoleLogText: `fmt.Println(\"${icon} LazyLogX Lazy Debugging for: ${text}  => \" + ${text})\n`,
      extraIdentation: true,
      identationLength: 4,
      controlFlowStatements: [
        'if',
        'else',
        'for',
        'switch',
        'select',
        'range',
        'func',
        'struct',
        'interface',
        'map',
        'chan'
      ]
    },
    shellscript: {
      defaultStatement: 'echo',
      consoleLogText: `echo \"${icon} LazyLogX Lazy Debugging for: \\${text}  => \" ${text}\n`,
      extraIdentation: true,
      identationLength: 4,
      controlFlowStatements: [
        'if',
        'else',
        'for',
        'while',
        'case',
        'function',
        'select'
      ]
    }
  }

  // if text is contain a space then print a warning message
  if (text.includes(' ')) {
    vscode.window.showWarningMessage(
      'Sorry, the selected text contains a space 😔'
    )
    return
  }

  // check if the language is on the list of the languageMap, if it is not return a warning message saying that the language is not supported
  if (!languageMap[language]) {
    vscode.window.showWarningMessage(
      `Sorry, this language (${language}) is not supported yet 😔`
    )
    return
  }
  // if the current line text contains the default statement then delete the line and move one line up
  if (currentLineText.includes(languageMap[language].defaultStatement)) {
    editor.edit((editBuilder) => {
      editBuilder.delete(
        new vscode.Range(
          new vscode.Position(currentLine, 0),
          new vscode.Position(currentLine + 1, 0)
        )
      )
    })
  }
  // else if if the current line text doesnt contains the console log text then check if there is a selection or not
  else if (!currentLineText.includes(languageMap[language].consoleLogText)) {
    // if there is not a selection return an error
    if (selection.isEmpty) {
      vscode.window.showErrorMessage('Cmon now, select something first! 😅')
      return
    }
  }

  // check if the language is supported
  // if the language is supoprted then check if it requires extra identation
  let languageSpecificConsoleLog = ''
  if (languageMap[language]) {
    // check if the current line text contains any of the control flow statements
    // if it does add the idendationLength spaces to the console log text
    // if it doesn't contain any of the control flow statements then just add the console log text
    if (
      languageMap[language].controlFlowStatements.some((statement) =>
        currentLineText.includes(statement)
      )
    ) {
      // add the identation length to the console log text as many times as the identation length
      // create a string with as many spaces as specified on the identationLength and do it smart
      let identationString = ''
      for (let i = 0; i < languageMap[language].identationLength; i++) {
        identationString += ' '
      }
      languageSpecificConsoleLog =
        identationString + languageMap[language].consoleLogText
    } else {
      languageSpecificConsoleLog = languageMap[language].consoleLogText
    }
  }
  // create the new line text
  const newLineText = currentLineIdentation + languageSpecificConsoleLog
  // insert the new line text
  editor.edit((editBuilder) => {
    editBuilder.insert(new vscode.Position(newLine, 0), newLineText)
  })
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {
  console.log('Congratulations, your extension "lazylogx" is now active!')
  try {
    const disposable = vscode.commands.registerCommand(
      'lazylogx.addLazyDebugging',
      function () {
        // get the sellected text from the editor
        const editor = vscode.window.activeTextEditor
        if (!editor) throw new Error('No editor found')
        const selection = editor.selection
        const text = editor.document.getText(selection)

        // detect what is the language of the file
        const language = editor.document.languageId
        const currentLine = editor.selection.active.line
        // get the current line text and the current line identation
        const currentLineText = editor.document.lineAt(currentLine).text
        const currentLineIdentation = currentLineText.substring(
          0,
          currentLineText.indexOf(currentLineText.trim())
        )

        addLazyDebugging(
          editor,
          selection,
          text,
          language,
          currentLine,
          currentLineText,
          currentLineIdentation
        )
      }
    )

    context.subscriptions.push(disposable)
  } catch (error) {}
}

function deactivate () {}

module.exports = {
  activate,
  deactivate
}
