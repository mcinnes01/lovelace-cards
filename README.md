# Lovelace Panel Cards

Custom Lovelace cards for Home Assistant panel dashboards.

## Cards

### Light Panel Card (`light-panel-card`)

A feature-rich light control panel that provides:

- **Section Tabs** – Toggle between All / Lights / Lamps / Accents with animated amber-glow buttons
- **Brightness Slider** – Warm orange gradient slider with real-time control
- **Color Temperature Slider** – Warm-to-cool gradient slider (2700K–6500K)
- **Color Temperature Presets** – Quick buttons for Cool, Daylight, White, Warm
- **RGB Color Presets** – Quick buttons for Orange, Blue, Green, Pink, Purple
- **Scene Buttons** – Activate scenes with large icon buttons

![Light Panel Card](https://via.placeholder.com/400x300?text=Light+Panel+Card)

#### Installation

1. Install via [HACS](https://hacs.xyz/) as a custom repository
2. Add this repository URL: `https://github.com/mcinnes01/lovelace-cards`
3. Install the "Lovelace Cards" integration
4. Clear browser cache and reload

#### Configuration

Add the card to your dashboard:

```yaml
type: custom:light-panel-card
title: Light Control Panel
lights:
  targets:
    entity_id: light.living_room_light
lamps:
  targets:
    area_id: living_room
accents:
  targets:
    label_id: accent_lights
scenes:
  targets:
    entity_id:
      - scene.movie_night
      - scene.bright
```

#### Configuration Options

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | string | `"Light Control Panel"` | Card title |
| `lights` | object | `{}` | Light section target selector |
| `lamps` | object | `{}` | Lamp section target selector |
| `accents` | object | `{}` | Accent section target selector |
| `scenes` | object | `{}` | Scene section target selector |
| `show_section_tabs` | boolean | `true` | Show/hide section tab bar |
| `show_brightness` | boolean | `true` | Show/hide brightness slider |
| `show_color_temp` | boolean | `true` | Show/hide color temperature slider |
| `show_temp_presets` | boolean | `true` | Show/hide temperature preset buttons |
| `show_color_presets` | boolean | `true` | Show/hide RGB color preset buttons |
| `color_temp_presets` | array | *(built-in)* | Custom temperature presets |
| `color_presets` | array | *(built-in)* | Custom RGB color presets |

#### Custom Presets

Override the default color presets:

```yaml
type: custom:light-panel-card
title: My Lights
lights:
  targets:
    entity_id: light.main
color_temp_presets:
  - name: Candle
    kelvin: 2200
    color: "rgba(255, 120, 50, 0.7)"
  - name: Reading
    kelvin: 4500
    color: "rgba(255, 230, 180, 0.6)"
    text_color: "#000"
color_presets:
  - name: Red
    color: [255, 0, 0]
    background: "rgba(255, 0, 0, 0.6)"
  - name: Teal
    color: [0, 200, 200]
    background: "rgba(0, 200, 200, 0.6)"
```

#### Target Selectors

Each section (lights, lamps, accents, scenes) supports Home Assistant's target selector:

- **`entity_id`** – Directly select specific entities
- **`area_id`** – Select all matching entities in an area
- **`label_id`** – Select all entities with a specific label

These can be configured via the visual editor or YAML.

## Dependencies

This card is self-contained and does **not** require any third-party custom cards. It renders all UI elements natively using:

- Home Assistant's built-in `ha-card` and `ha-icon` web components
- Native HTML range sliders with custom CSS gradients
- Lit 3.x for reactive rendering

No additional HACS integrations are needed.

## Development

```bash
# Clone
git clone https://github.com/mcinnes01/lovelace-cards.git
cd lovelace-cards

# Install dependencies
npm install

# Build
npm run build

# Deploy to HA (adjust path as needed)
cp dist/lovelace-cards.js /config/www/community/lovelace-cards/
```

## License

MIT
