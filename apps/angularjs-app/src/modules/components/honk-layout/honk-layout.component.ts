import template from "./honk-layout.template.html?raw";

const HonkLayoutComponent = {
	template,
	bindings: {},
	transclude: {
		header: "?slotHeader",
		main: "slotMain",
	},
};

export default ["honkLayout", HonkLayoutComponent] as const;
