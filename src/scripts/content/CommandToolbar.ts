import { CommandButton } from "./commandButton";
import { logger } from "../common/logger";

type Cmd = [string, string, boolean];

const helperToolbarId = "web3WizHelperDiv";

class CommandToolbar {
    commands: Cmd[] = [];
    buttons: CommandButton[] = [];
    lexemBoundButtons: CommandButton[] = [];

    addCommand(text: string, command: string, lexemBound = true) {
        this.commands.push([text, command, lexemBound]);
    }

    set lexemButtonsEnabled(en: boolean) {
        this.lexemBoundButtons.map((btn) => btn.enabled = en);
    }

    initAndAttachButtons() {
        const toolbarList = document.querySelector("#__next > div > main > div > section > div > div > section> div > div > div > div > div > ul");

        if (toolbarList && toolbarList.parentElement) {
            const parentDiv = toolbarList.parentElement;
            const helperToolbarDiv = document.createElement("div");
            helperToolbarDiv.id = helperToolbarId;
            helperToolbarDiv.style.setProperty("flex-grow", "1");
            helperToolbarDiv.style.setProperty("margin-left", "40px");
            parentDiv.insertAdjacentElement("afterend", helperToolbarDiv);

            for (let cmd of this.commands) {
                const btn = new CommandButton(helperToolbarDiv, cmd[0], cmd[1]);
                this.buttons.push(btn);

                if (cmd[2])
                    this.lexemBoundButtons.push(btn);
                else
                    btn.enabled = true;
            }
            logger.log(`toolbar found! ${this.commands} buttons were added`);
            this.checkLost();
        } else {
            logger.log("toolbar not found. Checking again in 1 second.");
            setTimeout(() => this.initAndAttachButtons(), 1000);
        }
    }

    checkLost() {
        if (!document.getElementById(helperToolbarId)) {
            logger.log("toolbar lost. Trying to find it again");
            this.initAndAttachButtons();
        } else
            setTimeout(() => this.checkLost(), 1000);
    }
}

export { CommandToolbar }
