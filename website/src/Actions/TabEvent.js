const TabEventType = {
	showTab: 'SHOW_TAB',
	hideTab: 'HIDE_TAB'
};

const TabEventCreator = {
	showTab: tabType => ({
		type: TabEventType.showTab,
		tabType
	}),
	hideTab: () => ({
		type: TabEventType.hideTab
	})
};

export {
	TabEventType,
	TabEventCreator
}