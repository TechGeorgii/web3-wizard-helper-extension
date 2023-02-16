import { CommandButton } from "./commandButton";
import { logger } from "../common/logger";

type Cmd = [string, string];

class CommandToolbar {
    commands: Cmd[] = [];
    buttons: CommandButton[] = [];

    addCommand(text: string, command: string) {
        this.commands.push([text, command]);
    }

    initAndAttachButtons() {
        const paramsForm = document.querySelector("div > main > div > section > div > div > section > div > form");

        if (paramsForm) {
            logger.log("toolbar found!");

            for (let cmd of this.commands) {
                this.buttons.push(new CommandButton(paramsForm, cmd[0], cmd[1]));
            }
            logger.log(`${this.commands} buttons were added`)
        } else {
            logger.log("toolbar not found. Checking again in 1 second.");
            setTimeout(() => this.initAndAttachButtons(), 1000);
        }
    }
}

export { CommandToolbar }
