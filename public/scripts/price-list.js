const opinionsMain = document.querySelector('.section-priceOffers > .main');

const cardsSlider = opinionsMain.querySelector('.main-cards');
const cardsSliderBtn_left = opinionsMain.querySelector('.btn-slider-left');
const cardsSliderBtn_right = opinionsMain.querySelector('.btn-slider-right');

const offerCards = cardsSlider.querySelectorAll('.priceOffer-card');
const firstCard = offerCards[0];

if(firstCard) {    
    
    cardsSliderBtn_left.addEventListener('click', () => {
        let cardWidth = firstCard.offsetWidth + parseInt(window.getComputedStyle(cardsSlider).getPropertyValue('gap'));
        let cardHeight = firstCard.offsetHeight + parseInt(window.getComputedStyle(cardsSlider).getPropertyValue('gap'));

        cardsSlider.scrollLeft -= cardWidth;
        cardsSlider.scrollLeft = cardsSlider.scrollLeft - cardsSlider.scrollLeft%cardWidth;
        cardsSlider.scrollTop -= cardHeight;
        cardsSlider.scrollTop = cardsSlider.scrollTop - cardsSlider.scrollTop%cardHeight;
    })
    cardsSliderBtn_right.addEventListener('click', () => {
        let cardWidth = firstCard.offsetWidth + parseInt(window.getComputedStyle(cardsSlider).getPropertyValue('gap'));
        let cardHeight = firstCard.offsetHeight + parseInt(window.getComputedStyle(cardsSlider).getPropertyValue('gap'));

        cardsSlider.scrollLeft = cardsSlider.scrollLeft - cardsSlider.scrollLeft%cardWidth + cardWidth;
        cardsSlider.scrollTop = cardsSlider.scrollTop - cardsSlider.scrollTop%cardHeight + cardHeight;
    })
    
    
    
    const findCardIndexByScroll = () => {
    
        let horizontal = true;
        if (window.getComputedStyle(cardsSlider).getPropertyValue('overflow-y') == "overlay") {
            horizontal = false;
        }
    
        let halfCardWidth = firstCard.offsetWidth + parseInt(window.getComputedStyle(cardsSlider).getPropertyValue('gap'));
        halfCardWidth *= 0.5;
        let halfCardHeight = firstCard.offsetHeight + parseInt(window.getComputedStyle(cardsSlider).getPropertyValue('gap'));
        halfCardHeight *= 0.5;
    
    
        for (let i = 0; i < offerCards.length; i++) {
            let card = offerCards[i];
    
            let cardsSliderPaddingLeft = parseInt(window.getComputedStyle(cardsSlider).getPropertyValue('padding-left'));
            let cardsSliderPaddingTop = parseInt(window.getComputedStyle(cardsSlider).getPropertyValue('padding-top'));
            
    
            let scrollPositionLeft = cardsSlider.scrollLeft;
            let scrollPositionTop = cardsSlider.scrollTop;
    
            let cardOffsetLeft = card.offsetLeft - cardsSlider.offsetLeft - cardsSliderPaddingLeft;
            let cardOffsetTop = card.offsetTop - cardsSlider.offsetTop - cardsSliderPaddingTop;
    
            if (horizontal) {
                
                if (scrollPositionLeft > cardOffsetLeft - halfCardWidth && scrollPositionLeft < cardOffsetLeft + halfCardWidth) {
                    return i;
                }
            }
            else {
                if (scrollPositionTop > cardOffsetTop - halfCardHeight && scrollPositionTop < cardOffsetTop + halfCardHeight) {
                    return i;
                }
            }
    
        }
    }
    const setCardSize = () => {
        let currentCardIndex = findCardIndexByScroll();
        
        if(currentCardIndex != undefined) {
            for (let i = 0; i < offerCards.length; i++) {
            
                if(i == currentCardIndex) {
                    offerCards[i].classList.add('offer-card-active');
                }
                else {
                    offerCards[i].classList.remove('offer-card-active');
                }
            }
        }
    }
    if(window.innerWidth <= 750) {
        setCardSize();
    }
    
    cardsSlider.addEventListener('scroll', () => {
        setCardSize();
    })
    window.addEventListener('resize', () => {
        if(window.innerWidth >= 750) {

            for (let i = 0; i < offerCards.length; i++) {
               
                offerCards[i].classList.remove('offer-card-active');
                
            }

        }
        else {
            setCardSize();
        }
    })
}
