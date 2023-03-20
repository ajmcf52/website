const LoadAboutMeEventType = {
  aboutMeLoad: "ABOUTME-LOAD",
};

const LoadAboutMeActionCreator = {
  aboutMe: (aboutMeText) => ({
    type: LoadAboutMeEventType.aboutMeLoad,
    aboutMeText,
  }),
};

export { LoadAboutMeActionCreator, LoadAboutMeEventType };
