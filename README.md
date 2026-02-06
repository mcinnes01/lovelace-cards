# Lovelace Cards

Control panel cards for Home Assistant with proper entity selection UI. Includes light control, blinds control, climate control, and media player control panels.

## Installation

### Using HACS (recommended)
1. Go to HACS > Frontend
2. Click the three dots menu
3. Select "Custom repositories"
4. Add: `https://github.com/mcinnes01/lovelace-cards`
5. Search for "Lovelace Cards" and install

### Manual Installation
1. Download the latest release
2. Extract `panel-cards.js` to `config/www/`
3. Add to your dashboard YAML:
```yaml
resources:
  - url: /local/panel-cards.js
    type: module
```

## Available Cards

### Light Panel Card
```yaml
type: custom:light-panel-card
area: Lounge  # Select lights by area
```

### Blinds Panel Card
```yaml
type: custom:blinds-panel-card
area: Lounge
```

### Climate Panel Card
```yaml
type: custom:climate-panel-card
entity: climate.lounge
```

### Media Panel Card
```yaml
type: custom:media-panel-card
entity: media_player.lounge
```

## Configuration

Each card supports entity selection UI in the dashboard editor - just click to select your area or specific entities.
