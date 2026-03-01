# AINews launchd notes

This project uses a macOS LaunchAgent to run content sync on a schedule.

## Job identity

- Label: `com.shichangliao.ainews.sync`
- Installed plist: `/Users/shichangliao/Library/LaunchAgents/com.shichangliao.ainews.sync.plist`
- Template plist: `/Users/shichangliao/Desktop/codes/MyAppStore/AINews/launchd/com.shichangliao.ainews.sync.plist`

## What it runs

```bash
/usr/local/bin/node /Users/shichangliao/Desktop/codes/MyAppStore/AINews/scripts/auto-sync-and-publish.js
```

## Schedule

- Run once at login (`RunAtLoad`)
- Run every 30 minutes (`StartInterval = 1800`)
- Only regenerate and publish when the source markdown content has actually changed
- Only commits and pushes `data/site-data.json`

## Logs

- Stdout: `/Users/shichangliao/Desktop/codes/MyAppStore/AINews/logs/sync.log`
- Stderr: `/Users/shichangliao/Desktop/codes/MyAppStore/AINews/logs/sync.error.log`

## Common commands

Load the job:

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.shichangliao.ainews.sync.plist
```

Run it immediately:

```bash
launchctl kickstart -k gui/$(id -u)/com.shichangliao.ainews.sync
```

Unload it:

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.shichangliao.ainews.sync.plist
```

Inspect status:

```bash
launchctl print gui/$(id -u)/com.shichangliao.ainews.sync
```

Watch logs:

```bash
tail -f /Users/shichangliao/Desktop/codes/MyAppStore/AINews/logs/sync.log
tail -f /Users/shichangliao/Desktop/codes/MyAppStore/AINews/logs/sync.error.log
```

## Notes

- The Mac must be powered on for the job to run.
- This is a user LaunchAgent, so your user session must be logged in.
- If the machine is shut down or asleep, scheduled runs do not happen.
