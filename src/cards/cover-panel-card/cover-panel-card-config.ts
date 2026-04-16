export interface TargetSelectorValue {
  entity_id?: string | string[];
  area_id?: string | string[];
  label_id?: string | string[];
}

export interface CoverBlindConfig {
  /** Direct entity_id of the cover entity, or use targets */
  entity?: string;
  /** HA target selector (entity, area, label) */
  targets?: TargetSelectorValue;
  /** Friendly label override */
  label?: string;
  /** Tilt percentage for "Angled Down" preset (default 25) */
  tilt_down_pct?: number;
  /** Tilt percentage for "Angled Up" preset (default 75) */
  tilt_up_pct?: number;
}

export interface CoverPanelCardConfig {
  type: string;
  title?: string;
  /** One or more blind configs */
  blinds?: CoverBlindConfig[];
  /** Optional illuminance sensor entity for the room */
  illuminance_entity?: string;
}
