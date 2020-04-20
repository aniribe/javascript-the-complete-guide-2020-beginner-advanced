import { ProjectLists } from "./App/ProjectList.js";

class App {
  static init() {
    const activeProjectsList = new ProjectLists("active");
    const finishedProjectsList = new ProjectLists("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );

    setTimeout(this.startAnalytics, 3000);
  }

  static startAnalytics() {
    const analuticsScript = document.createElement("script");
    analuticsScript.src = "assets/scripts/sizes.js";
    analuticsScript.defer = true;
    document.head.append(analuticsScript);
  }
}

App.init();
