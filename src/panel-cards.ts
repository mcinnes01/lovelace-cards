import "./cards/light-panel-card/light-panel-card";
import "./cards/light-panel-card/light-panel-card-editor";

console.info("%c🎚️ Lovelace Cards loaded", "color: #ff6b6b; font-weight: bold;");

window.customCards = window.customCards || [];
window.customCards.push({
	type: "light-panel-card",
	name: "Light Panel Card",
	description: "Light control panel card",
});
