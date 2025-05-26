# ClanTagSwitcher

**Animate your Discord Clan Tags with style**

**ClanTagSwitcher** is a Vencord plugin that allows you to rotate through your Clan Tag list.

---

> [!WARNING]  
> This tool automates actions only on your own Discord account. It is intended for personal use, educational purposes, or with the account owner's explicit permission. Misuse of this tool may violate Discord's Terms of Service. Use responsibly. The developer is not liable for any consequences resulting from its use.

## Configuration

The default timeout is 60 seconds. In my experience, 5 seconds works better — it's faster and less likely to hit Discord's rate limits. Feel free to change it, but tweak carefully depending on what you're doing.

In `index.ts`, make sure to load your Discord Clan Tag Server IDs:

```ts
var guilds: Array<any> = [];
```
> [!TIP]
> https://nelly.tools/tags is a great place to find servers with clan tags.

## Installation
Learn how to install this custom plugin @ https://docs.vencord.dev/installing/

> [!note]
> I will not provide support for installing this plugin.
