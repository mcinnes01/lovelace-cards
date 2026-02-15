export interface TargetSelectorValue {
  entity_id?: string | string[];
  area_id?: string | string[];
  label_id?: string | string[];
}

export interface LightPanelSectionConfig {
  targets?: TargetSelectorValue;
  entities?: string[];
  area?: string;
}

export interface ColorTempPreset {
  name: string;
  kelvin: number;
  color: string;       // CSS background color
  text_color?: string;  // CSS text color (default white)
}

export interface RGBColorPreset {
  name: string;
  color: [number, number, number];
  background: string;  // CSS background color
}

export interface SceneConfig {
  entity: string;
  icon?: string;
  background?: string;
}

export interface LightPanelCardConfig {
  type: string;
  title?: string;
  lights?: LightPanelSectionConfig;
  lamps?: LightPanelSectionConfig;
  accents?: LightPanelSectionConfig;
  scenes?: LightPanelSectionConfig;
  show_brightness?: boolean;
  show_color_temp?: boolean;
  show_color_presets?: boolean;
  show_temp_presets?: boolean;
  show_section_tabs?: boolean;
  color_temp_presets?: ColorTempPreset[];
  color_presets?: RGBColorPreset[];
}

export const DEFAULT_TEMP_PRESETS: ColorTempPreset[] = [
  { name: "Cool", kelvin: 6500, color: "rgba(135, 206, 250, 0.6)" },
  { name: "Daylight", kelvin: 5000, color: "rgba(255, 255, 255, 0.8)", text_color: "#000" },
  { name: "White", kelvin: 4000, color: "rgba(255, 200, 100, 0.5)" },
  { name: "Warm", kelvin: 2700, color: "rgba(255, 152, 0, 0.6)" },
];

export const DEFAULT_COLOR_PRESETS: RGBColorPreset[] = [
  { name: "Orange", color: [255, 160, 120], background: "rgba(255, 160, 120, 0.7)" },
  { name: "Blue", color: [120, 180, 255], background: "rgba(120, 180, 255, 0.7)" },
  { name: "Green", color: [150, 255, 180], background: "rgba(150, 255, 180, 0.7)" },
  { name: "Pink", color: [255, 180, 220], background: "rgba(255, 180, 220, 0.7)" },
  { name: "Purple", color: [200, 150, 255], background: "rgba(200, 150, 255, 0.7)" },
];
