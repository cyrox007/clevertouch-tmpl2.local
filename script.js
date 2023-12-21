let impact = {
    data: {
        slider: document.getElementById('impact-slider-block'),
        slider_list: document.getElementById('impact-slider-list'),
        slider_next: document.getElementById('slider-next'),
        slider_prev: document.getElementById('slider-prev'),
        slider_items: document.querySelectorAll('.impact-list__item'),
        slider_current_item: 1,
        sliderOpacityProgress: 1,
    },
    handler: {
        animSlider: (callback) => {
            function visible() {
                impact.data.sliderOpacityProgress = impact.data.sliderOpacityProgress + 0.01;
                impact.data.slider.style.opacity = impact.data.sliderOpacityProgress;
                if (impact.data.sliderOpacityProgress < 1) {
                    requestAnimationFrame(visible);
                }
            }
            function hidden () {
                let finish = false;
                impact.data.sliderOpacityProgress = impact.data.sliderOpacityProgress - 0.01;
                impact.data.slider.style.opacity = impact.data.sliderOpacityProgress;
                if (impact.data.sliderOpacityProgress > 0) {
                    finish = false;
                    requestAnimationFrame(hidden);
                } else {
                    callback();
                    requestAnimationFrame(visible);
                }
            }
            requestAnimationFrame(hidden);
        },
                
        nextSlide: () => {
            impact.handler.animSlider(() => {
                let currentSlideID = impact.data.slider_current_item;
                let nextSlideID = impact.data.slider_current_item;

                if (nextSlideID >= impact.data.slider_items.length) {
                    nextSlideID = 1;
                } else {
                    nextSlideID = currentSlideID + 1;
                }
                
                impact.methods.setCurrentSlide(nextSlideID, currentSlideID);
                impact.data.slider_current_item = nextSlideID;
            });
        }, 
        prevSlide: () => {
            impact.handler.animSlider(() => {
                let currentSlideID = impact.data.slider_current_item;
                let nextSlideID = impact.data.slider_current_item;

                if (nextSlideID <= 1) {
                    nextSlideID = impact.data.slider_items.length;
                } else {
                    nextSlideID = currentSlideID - 1;
                }

                impact.methods.setCurrentSlide(nextSlideID, currentSlideID);
                impact.data.slider_current_item = nextSlideID;
            });
        },
        selectSlide: (selectID) => {
            impact.handler.animSlider(() => {
                let currentSlideID = impact.data.slider_current_item;
                let nextSlideID = parseInt(selectID);

                impact.methods.setCurrentSlide(nextSlideID, currentSlideID);
                impact.data.slider_current_item = nextSlideID;
            });
        } 
    },
    methods: {
        setCurrentSlide: (id, prevID) => {
            const slideEl = impact.data.slider_list.querySelector(`[data-id='${id}']`);
            const _ = impact.data.slider_list.querySelector(`[data-id='${prevID}']`);
            const img = slideEl.querySelector('img').getAttribute('src');
            const title = slideEl.querySelector('p').textContent;
            const link = slideEl.querySelector('p').dataset.link;
            slideEl.querySelector('p').style.textDecoration = 'underline';
            _.querySelector('p').style.textDecoration = 'none';

            impact.data.slider.style.backgroundImage = `url(${img})`;
            impact.data.slider.parentElement.querySelector('.impact-slider__item--title').textContent = title;
            impact.data.slider.parentElement.querySelector('.impact-slider__item--link').setAttribute('href', link);
        },
    }, 
};
(function () {
    impact.data.slider_items.forEach((element, index)=>{
        element.dataset.id = index + 1;
        element.addEventListener('click', (event)=>{
            event.preventDefault();     
            impact.handler.selectSlide(element.dataset.id);
        });
    });
    impact.data.slider_next.addEventListener('click', impact.handler.nextSlide);
    impact.data.slider_prev.addEventListener('click', impact.handler.prevSlide);

    setInterval(impact.handler.nextSlide, 10000);
})();