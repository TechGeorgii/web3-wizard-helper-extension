import { Editor } from "./Editor";

export function schemaCommand(editor: Editor) {
    const lexem = editor.getSelectedLexem();
    if (lexem == "")
        return;
}

export function returnSame(x: string) {
    return x;
}
