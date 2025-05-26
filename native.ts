/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { IpcMainInvokeEvent } from "electron";

export async function makeHttpRequest(_: IpcMainInvokeEvent, token: string, GuildID: string) {
    try {
        const res = await fetch("https://discord.com/api/v9/users/@me/clan", {
            method: "PUT",
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,ja;q=0.9",
                "authorization": token,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Not:A-Brand\";v=\"24\", \"Chromium\";v=\"134\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-US",
                "x-discord-timezone": "America/Los_Angeles",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: JSON.stringify({
                identity_guild_id: GuildID,
                identity_enabled: true
            })
        });

        const data = await res.text();
        return { status: res.status, data };
    } catch (e) {
        return { status: -1, data: String(e) };
    }
}
