AOS.init();

// GlideJs
new Glide("#Glide",{
 type:'carousel',
  perView:3,
  startAt:1,
  autoplay:2000,
  gap:70,
  focusAt:1,
  animationDuration:800,
  breakpoints : {
    1998:{
      perView:3
    },
    990:{
      perView:2
    },
    800 :{
      perView:2,
    },
    766:{
      perView:1,
    }
  }
 }).mount()