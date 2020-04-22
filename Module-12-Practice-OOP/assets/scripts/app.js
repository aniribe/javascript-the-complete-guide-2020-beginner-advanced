!(function (t) {
  var e = {};
  function n(s) {
    if (e[s]) return e[s].exports;
    var o = (e[s] = { i: s, l: !1, exports: {} });
    return t[s].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, s) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: s });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var s = Object.create(null);
      if (
        (n.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          n.d(
            s,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return s;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = "assets/scripts/"),
    n((n.s = 0));
})([
  function (t, e, n) {
    "use strict";
    n.r(e);
    class s {
      static clearEventListeners(t) {
        const e = t.cloneNode(!0);
        return t.replaceWith(e), e;
      }
      static moveElement(t, e) {
        const n = document.getElementById(t);
        document.querySelector(e).append(n),
          n.scrollIntoView({ behavior: "smooth" });
      }
    }
    class o extends class {
      constructor(t, e = !1) {
        (this.hostElement = t ? document.getElementById(t) : document.body),
          (this.insertBefore = e);
      }
      detach() {
        this.element && this.element.remove();
      }
      attach() {
        this.hostElement.insertAdjacentElement(
          this.insertBefore ? "afterbegin" : "beforeend",
          this.element
        );
      }
    } {
      constructor(t, e, n) {
        super(n),
          (this.closeNotifierHandler = t),
          (this.text = e),
          (this.closeTooltip = () => {
            this.detach(), this.closeNotifierHandler();
          }),
          this.create();
      }
      create() {
        const t = document.createElement("div");
        t.className = "card";
        const e = document.getElementById("tooltip"),
          n = document.importNode(e.content, !0);
        (n.querySelector("p").textContent = this.text), t.append(n);
        const s = this.hostElement.offsetLeft + 20,
          o =
            this.hostElement.offsetTop +
            this.hostElement.clientHeight -
            this.hostElement.parentElement.scrollTop -
            10;
        (t.style.position = "absolute"),
          (t.style.left = s + "px"),
          (t.style.top = o + "px"),
          t.addEventListener("click", this.closeTooltip),
          (this.element = t);
      }
    }
    class i {
      constructor(t, e, n) {
        (this.id = t),
          (this.hasActiveTooltip = !1),
          (this.updateProjectListsHandler = e),
          this.connectMoreInfoButton(),
          this.connectSwitchButton(n),
          this.connectDrag();
      }
      showMoreInfoHandler() {
        if (this.hasActiveTooltip) return;
        const t = document.getElementById(this.id).dataset.extraInfo;
        new o(
          () => {
            this.hasActiveTooltip = !1;
          },
          t,
          this.id
        ).attach(),
          (this.hasActiveTooltip = !0);
      }
      connectDrag() {
        document.getElementById(this.id).addEventListener("dragstart", (t) => {
          t.dataTransfer.setData("text/plain", this.id),
            (t.dataTransfer.effectAllowed = "move");
        });
      }
      connectMoreInfoButton() {
        document
          .getElementById(this.id)
          .querySelector("button:first-of-type")
          .addEventListener("click", this.showMoreInfoHandler.bind(this));
      }
      connectSwitchButton(t) {
        let e = document
          .getElementById(this.id)
          .querySelector("button:last-of-type");
        (e = s.clearEventListeners(e)),
          (e.textContent = "active" === t ? "Finish" : "Activate"),
          e.addEventListener(
            "click",
            this.updateProjectListsHandler.bind(null, this.id)
          );
      }
      update(t, e) {
        (this.updateProjectListsHandler = t), this.connectSwitchButton(e);
      }
    }
    class r {
      constructor(t) {
        (this.type = t), (this.projects = []);
        const e = document.querySelectorAll(`#${t}-projects li`);
        for (const t of e)
          this.projects.push(
            new i(t.id, this.switchProject.bind(this), this.type)
          );
        this.connectDroppable();
      }
      connectDroppable() {
        const t = document.querySelector(`#${this.type}-projects ul`);
        t.addEventListener("dragenter", (e) => {
          "text/plain" == e.dataTransfer.types[0] &&
            (e.preventDefault(), t.parentElement.classList.add("droppable"));
        }),
          t.addEventListener("dragover", (t) => {
            t.preventDefault();
          }),
          t.addEventListener("dragleave", (e) => {
            e.relatedTarget.closest(`#${this.type}-projects ul`) !== t &&
              t.parentElement.classList.remove("droppable");
          }),
          t.addEventListener("drop", (e) => {
            const n = e.dataTransfer.getData("text/plain");
            this.projects.find((t) => t.id === n) ||
              (document
                .getElementById(n)
                .querySelector("button:last-of-type")
                .click(),
              t.parentElement.classList.remove("droppable"));
          });
      }
      setSwitchHandlerFunction(t) {
        this.switchHandler = t;
      }
      addProject(t) {
        this.projects.push(t),
          s.moveElement(t.id, `#${this.type}-projects ul`),
          t.update(this.switchProject.bind(this), this.type);
      }
      switchProject(t) {
        this.switchHandler(this.projects.find((e) => e.id === t)),
          (this.projects = this.projects.filter((e) => e.id !== t));
      }
    }
    (class {
      static init() {
        const t = new r("active"),
          e = new r("finished");
        t.setSwitchHandlerFunction(e.addProject.bind(e)),
          e.setSwitchHandlerFunction(t.addProject.bind(t)),
          setTimeout(this.startAnalytics, 3e3);
      }
      static startAnalytics() {
        const t = document.createElement("script");
        (t.src = "assets/scripts/sizes.js"),
          (t.defer = !0),
          document.head.append(t);
      }
    }.init());
  },
]);
//# sourceMappingURL=app.js.map
