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
        const toolbarList = document.querySelector("#__next > div > main > div > section > div > div > section> div > div > div > div > div > ul");

        if (toolbarList && toolbarList.parentElement) {
            logger.log("toolbar found!");

            const parentDiv = toolbarList.parentElement;
            const helperToolbarDiv = document.createElement("div");
            helperToolbarDiv.style.setProperty("flex-grow", "1");
            helperToolbarDiv.style.setProperty("margin-left", "40px");
            parentDiv.insertAdjacentElement("afterend", helperToolbarDiv);

            for (let cmd of this.commands) {
                this.buttons.push(new CommandButton(helperToolbarDiv, cmd[0], cmd[1]));
            }
            logger.log(`${this.commands} buttons were added`)
        } else {
            logger.log("toolbar not found. Checking again in 1 second.");
            setTimeout(() => this.initAndAttachButtons(), 1000);
        }
    }
}

export { CommandToolbar }
