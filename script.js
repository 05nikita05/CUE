function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();
var tl = gsap.timeline();
tl.to("#cover", {
  top: "-100%",
  duration: 1,
});
tl.from(".center-img-div img", {
  scale: 1,
  ease: "none",
});
var nav = tl.from("#nav", {
  top: "-4rem",
  duration: 1,
});

tl.from(".center-img-div", {
  scale: 1.2,
  duration: 4.5,
  ease: "none",
  y: -900,
  stagger: 0.2,
  top: "25%",
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    start: "top 90%",
    end: "top 0",
    scrub: 3,
    onEnter: () => {
      gsap.to(".center-img-div img", {
        scale: 1,
        duration: 2,
        ease: "none",
        pin:true
      });
    },
  },
});
tl.from("#center-left",{
  delay:1,
  y:"100%",
  duration:1.5,
  opacity:0,
  scrollTrigger:{
    trigger:"#page3",
    scroller:"#main",
    markers:true,
    scrub:3,
    pin:true,
    start:"top 160%",
    end:"top 160%"
  }
},)
tl.from("#center-right",{
  delay:1,
  y:"-100%",
  duration:1.5,
  opacity:0,
  scrollTrigger:{
    trigger:"#page3",
    scroller:"#main",
    markers:true,
    scrub:3,
    pin:true,
    start:"top 160%",
    end:"top 160%"
  }
})
var page3Elements = document.querySelector(".page3-centerElement")
// function move(){
  tl.from(page3Elements.childNodes[1],{
    x:600,
    duration:5,
  },"move")
  tl.from(page3Elements.childNodes[3],{
    x:-400,
    duration:5,
    
  },"move")
  tl.from(page3Elements.childNodes[5],{
    x:400,
    duration:5,
    
  },"move")
// }


