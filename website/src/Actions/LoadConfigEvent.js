const LoadConfigEventType = {
  configLoad: "CONFIG-LOAD",
};

const LoadConfigActionCreator = {
  dataRef: (jsonData) => ({
    type: LoadConfigEventType.configLoad,
    jsonData,
  }),
};

export { LoadConfigActionCreator, LoadConfigEventType };
