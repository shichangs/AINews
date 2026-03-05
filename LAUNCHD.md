# AINews launchd notes

This project uses a macOS LaunchAgent to run content sync on a schedule.

## Job identity

- Label: `com.ainews.sync`
- Installed plist: `~/Library/LaunchAgents/com.ainews.sync.plist`
- Template plist: `/Users/sc-claw/Desktop/Github/ai-news/launchd/com.ainews.sync.plist`

## What it runs

```bash
/usr/bin/env node /Users/sc-claw/Desktop/Github/ai-news/scripts/auto-sync-and-publish.js
```

## Schedule

- Run once at login (`RunAtLoad`)
- Run every 30 minutes (`StartInterval = 1800`)
- Only regenerate and publish when the source markdown content has actually changed
- Only commits and pushes `data/site-data.json`

## Logs

- Stdout: `/tmp/ai-news-sync.log`
- Stderr: `/tmp/ai-news-sync.error.log`

## Common commands

Load the job:

```bash
cp /Users/sc-claw/Desktop/Github/ai-news/launchd/com.ainews.sync.plist ~/Library/LaunchAgents/com.ainews.sync.plist
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.ainews.sync.plist
```

Run it immediately:

```bash
launchctl kickstart -k gui/$(id -u)/com.ainews.sync
```

Unload it:

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.ainews.sync.plist
```

Inspect status:

```bash
launchctl print gui/$(id -u)/com.ainews.sync
```

Watch logs:

```bash
tail -f /tmp/ai-news-sync.log
tail -f /tmp/ai-news-sync.error.log
```

## Notes

- The Mac must be powered on for the job to run.
- This is a user LaunchAgent, so your user session must be logged in.
- If the machine is shut down or asleep, scheduled runs do not happen.
- If your repo is not at `/Users/sc-claw/Desktop/Github/ai-news`, update that absolute path inside `launchd/com.ainews.sync.plist` before loading.
