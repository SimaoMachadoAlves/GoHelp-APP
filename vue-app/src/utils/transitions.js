import anime from "animejs/lib/anime.es.js";
import { setPreviousRoute } from "@/utils/previousRoute";

export function beforeEnter(el, transitionType) {
  if (transitionType === "slide-left") {
    el.style.transform = "translateX(100%)";
  } else if (transitionType === "fade") {
    el.style.opacity = 0;
  } else if (transitionType === "slide-up-home") {
    el.style.transform = "translateY(100%)";
  } else if (transitionType === "slide-down") {
    el.style.transform = "translateY(-100%)";
  } else if (transitionType === "slide-right") {
    el.style.transform = "translateX(-100%)";
  }
}

export function enter(el, done, transitionType) {
  if (transitionType === "slide-left") {
    anime({
      targets: el,
      translateX: ["100%", "0%"],
      duration: 500,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "fade") {
    anime({
      targets: el,
      opacity: [0, 1],
      duration: 400,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "slide-up-home") {
    anime({
      targets: el,
      translateY: ["100%", "0%"],
      duration: 1100,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "slide-down") {
    anime({
      targets: el,
      translateY: ["-100%", "0%"],
      duration: 1100,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "slide-right") {
    anime({
      targets: el,
      translateX: ["-100%", "0%"],
      duration: 1000,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "slide-up") {
    anime({
      targets: el,
      translateY: ["100", "0%"],
      duration: 500,
      easing: "easeInOutQuad",
      complete: done,
    });
  }
}

export function leave(el, done, transitionType) {
  if (transitionType === "slide-left") {
    anime({
      targets: el,
      translateX: ["0%", "-100%"],
      duration: 500,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "fade") {
    anime({
      targets: el,
      opacity: [1, 0],
      duration: 400,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "slide-up-home") {
    anime({
      targets: el,
      translateY: ["0%", "-200%"],
      duration: 500,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "slide-down") {
    anime({
      targets: el,
      translateY: ["0%", "100%"],
      duration: 500,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "slide-right") {
    anime({
      targets: el,
      translateX: ["0%", "100%"],
      duration: 500,
      easing: "easeInOutQuad",
      complete: done,
    });
  } else if (transitionType === "slide-up") {
    anime({
      targets: el,
      translateY: ["0%", "-100%"],
      duration: 500,
      easing: "easeInOutQuad",
      complete: done,
    });
  }
}

export function getTransitionName(route) {
  const customTransition = route.meta.customTransition;

  if (customTransition) {
    return customTransition;
  }

  return route.meta.transition || "fade";
}
