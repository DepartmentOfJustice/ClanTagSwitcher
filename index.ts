/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType, PluginNative } from "@utils/types";

const Native = VencordNative.pluginHelpers.ClanTagSwitcher as PluginNative<typeof import("./native")>;

var cooldown: number | null = null;
var guilds: string[] = [];

const settings = definePluginSettings({
    servers: {
        type: OptionType.STRING,
        default: "",
        description: "Comma-separated list of Clan Tag Server IDs (e.g., 123,456,789)"
    },
    cooldown: {
        type: OptionType.SLIDER,
        description: "The cooldown (in seconds) between clan tag switches. Anything below 5 seconds might be too fast and could trigger rate limits.",
        stickToMarkers: false,
        default: 5,
        markers: [5, 10, 20, 30, 40, 50, 60, 70]
    }
});

export default definePlugin({
    name: "ClanTagSwitcher",
    description: "Easily switch and show off your Discord clan tags in a stylish and safe way",
    authors: [{ name: "Yamato", id: 174314237823287296n }],
    settings,

    getDiscordToken(): string | null {
        try {
            let token: string | null = null;

            const __webpack_require__ = (window as any).webpackChunkdiscord_app.push([
                [Math.random()],
                {},
                (req: any) => req
            ]);

            const modules = Object.values(__webpack_require__.c);

            for (const m of modules) {
                const exp = (m as any)?.exports?.default;
                if (exp && typeof exp.getToken === "function") {
                    const possibleToken = exp.getToken();
                    if (typeof possibleToken === "string" && possibleToken.length > 30) {
                        token = possibleToken;
                        break;
                    }
                }
            }

            return token;
        } catch (err) {
            return null;
        }
    },

    async SwitchClanTag() {
        const authToken = this.getDiscordToken();

        if (!authToken) {
            console.error("Failed to retrieve Discord token.");
            return;
        }

        const timeout = settings.store.cooldown * 1000;

        const request = async () => {
            try {
                const randomGuild = guilds[Math.floor(Math.random() * guilds.length)];
                if (!randomGuild) {
                    console.warn("No valid guilds provided in settings.");
                    return;
                }

                await Native.makeHttpRequest(authToken, randomGuild);
            } catch (error) {
                console.error("[-] Request failed:", error);
            }
        };

        await request();

        cooldown = window.setInterval(() => {
            request();
        }, timeout);
    },

    async start() {

        guilds = settings.store.servers
            .split(",")
            .map(id => id.trim())
            .filter(id => id.length > 0);

        if (guilds.length === 0) {
            console.warn("[ClanTagSwitcher] No server IDs provided.");
            return;
        }

        await this.SwitchClanTag();
    },

    stop() {
        if (cooldown !== null) {
            clearInterval(cooldown);
            cooldown = null;
        }
    }
});
