export interface TargetSelectorValue {
  entity_id?: string[];
  area_id?: string[];
  label_id?: string[];
}

export interface LightPanelSectionConfig {
  targets?: TargetSelectorValue;
  entities?: string[];
  area?: string;
}

export interface LightPanelCardConfig {
  type: string;
  title?: string;
  lights?: LightPanelSectionConfig;
  lamps?: LightPanelSectionConfig;
  accents?: LightPanelSectionConfig;
  scenes?: LightPanelSectionConfig;
}
