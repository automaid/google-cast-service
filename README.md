# cast-service
Expose Chromecasts as a http api

# Configuration
Available Event Types:

- play
- pause
- idle
- buffering
- volume
- mute
- unmute
- launch
- exit

```yaml
port: 8080
devices:
    My Chromecast:
        -   events:
                - play
            applications:
                - Netflix
            urls:
                - http://google.com
        -   events:
                - pause
            applications:
                - Netflix
            urls:
                - http://google.com
        -   events:
                - launch
            applications:
                - Netflix
            urls:
                - http://google.com
        -   events:
                - play:
            applications:
                - Google Play Music
                - SoundCloud
            urls:
                - http://google.com
        -   events:
                - pause
            urls:
                - http://google.com
        -   events:
                - mute
                - unmute
                - volume
            urls:
                - http://google.com

```
