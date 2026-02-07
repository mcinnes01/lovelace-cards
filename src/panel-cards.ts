import "./cards/light-panel-card/light-panel-card";
import "./cards/light-panel-card/light-panel-card-editor";

console.info("%c🎚️ Lovelace Cards loaded", "color: #ff6b6b; font-weight: bold;");

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "custom:light-panel-card")) {
  window.customCards.push({
    type: "custom:light-panel-card",
    name: "Light Panel Card",
    description: "Light control panel card",
  });
}

if (!window.customCards.some((c) => c.type === "light-panel-card")) {
  window.customCards.push({
    type: "light-panel-card",
    name: "Light Panel Card",
    description: "Light control panel card",
  });
}

window.dispatchEvent(
  new CustomEvent("ll-custom-card", {
    detail: {
      type: "custom:light-panel-card",
      name: "Light Panel Card",
      description: "Light control panel card",
    },
  })
);
