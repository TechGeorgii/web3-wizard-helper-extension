import jwt_decode from "jwt-decode";
import { logger } from "../common/logger";

export async function executeGraphQl(body: string, getExecution = false): Promise<any> {
    return ensureTokenUpdated()
        .then((_) => {
            const tokenData = (window as any).DuneHelperExtTokenData;
            return fetch(
                getExecution ? "https://app-api.dune.com/v1/graphql" : "https://core-hsr.dune.com/v1/graphql",
                {
                    "headers": {
                        "accept": "*/*",
                        "authorization": `Bearer ${tokenData.token}`,
                        "content-type": "application/json",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "x-dune-access-token": tokenData.accessToken
                    },
                    "referrer": "https://dune.com/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": body,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": getExecution ? "same-origin" : "include"
                });
        })
        .then((resp) => resp.json());
}

async function ensureTokenUpdated(): Promise<void> {
    let needTokenUpdate: boolean;
    let tokenData = (window as any).DuneHelperExtTokenData;
    if (typeof tokenData !== "undefined") {
        var decoded = jwt_decode((window as any).DuneHelperExtTokenData.token);
        var expires = (decoded as any).exp as number;

        let secondsToExp = expires - Date.now() / 1000;
        needTokenUpdate = secondsToExp < 30;    // less than 30 seconds left till expiration then let's update
    } else needTokenUpdate = true;

    return needTokenUpdate ?
        fetch("https://dune.com/api/auth/session", {
            "headers": {
                "accept": "*/*",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://dune.com",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        })
            .then(resp => {
                if (!resp.ok) {
                    return new Promise(async function (_, reject) {
                        reject(await resp.text());
                    });
                }
                return resp.json();
            })
            .then(data => {
                (window as any).DuneHelperExtTokenData = data;
                logger.log("success getting session token")
            })
            .catch(err => {
                logger.error("error getting session token: " + err.toString());
                throw "cannot authenticate. Probably you need to log in";
            })

        : Promise.resolve()
        ;
}
