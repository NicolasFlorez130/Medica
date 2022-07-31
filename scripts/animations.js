window.alert(`DISCLAIMER: This website is NOT a final product, it has been created for only learning purposes. It's a complete non-functional rebuild from a Webflow template. If you're interested in the original template here's the link: https://medicatemplate.webflow.io`)

//functions
const animateImages = nodes => {

    const imagesObserver = new IntersectionObserver(entry => {
        if (entry[0].isIntersecting) {
            entry[0].target.style.transform = 'translateX(-100%)';
        }
    }, {
        threshold: .2,
    })

    nodes.forEach(node => imagesObserver.observe(node));
}

const animateSections = nodes => {
    let aesthetics = 0;

    nodes.forEach(node => {
        const welcomeTitlesObserver = new IntersectionObserver(entry => {
            const node = entry[0];
            let effect;

            if (node.target.parentNode.classList.contains('aestheticElements')) {
                effect = `appear 1s ${aesthetics/4}s forwards`;
                aesthetics++;
            }

            switch (node.target.nodeName) {
                case 'H1':
                case 'H2':
                    effect = `leftToMidAndAppear 1s 0s forwards`
                    break;
                case 'H3':
                case 'H4':
                    effect = `topToMidAndAppear 1s .2s forwards`
                    break;
                case 'BUTTON':
                    effect = `appear 1s ${node.target.id == 'lateButton' ? '.4s' : '.2s'} forwards`;
                    break;
                case 'P':
                    effect = `leftToMidAndAppear 1s .2s forwards`
                    break;
            }

            if (node.isIntersecting && window.matchMedia("(min-width: 1000px)").matches) {
                node.target.style.animation = effect;
            }

        }, {
            threshold: .2,
        })

        welcomeTitlesObserver.observe(node);

    });
}

const animateColumns = nodes => {

    nodes.forEach((node, i) => {
        let welcomeDataObserver = new IntersectionObserver(entry => {
            let node = entry[0];

            if (node.isIntersecting && window.matchMedia("(min-width: 1000px)").matches) {
                node.target.style.animation = `botToMidAndAppear 1s ${.1 * i}s forwards`
            }

        }, {
            threshold: .2,
        });

        welcomeDataObserver.observe(node);
    });
}

const animateCards = nodes => {
    nodes.forEach(node => {
        const welcomeTitlesObserver = new IntersectionObserver(entry => {
            const node = entry[0];
            let effect;

            switch (node.target.nodeName) {
                case 'H2':
                    effect = `botToMidAndAppear 1s 0s forwards`
                    break;
                case 'H4':
                    effect = `topToMidAndAppear 1s .5s forwards`
                    break;
                case 'P':
                    effect = `botToMidAndAppear 1s .3s forwards`
                    break;
                case 'BUTTON':
                    effect = `appear 1s .1s forwards`;
                    break;
                case 'DIV':
                    effect = `appear 1s .1s forwards`;
                    break;
            }

            if (node.isIntersecting && window.matchMedia("(min-width: 1000px)").matches) {
                node.target.style.animation = effect;
            }

        }, {
            threshold: .2,
        })

        welcomeTitlesObserver.observe(node);

    });
}

const animateForms = nodes => {
    let subTitles = 0;

    nodes.forEach(node => {
        const contactObserver = new IntersectionObserver(entry => {
            const node = entry[0];
            let effect;

            switch (node.target.nodeName) {
                case 'H3':
                    effect = `botToMidAndAppear 1s 0s forwards`
                    break;
                case 'FORM':
                    effect = `leftToMidAndAppear 1s 0s forwards`
                    break;
                case 'H4':
                    effect = `leftToMidAndAppear 1s ${.3 * subTitles++}s forwards`
                    break;
                case 'DIV':
                    effect = `${node.target.classList.contains('buttons') ? 'appear' : 'botToMidAndAppear'} 1s ${node.target.classList.contains('latePlace') ? '.2' : '0'}s forwards`;
                    break;
            }

            if (node.isIntersecting && window.matchMedia("(min-width: 1000px)").matches) {
                node.target.style.animation = effect;
            }
        }, {
            threshold: .2,
        })

        contactObserver.observe(node);

    })
}

const animateFooterTop = nodes => {
    nodes.forEach(node => {
        const footerTopObserver = new IntersectionObserver(entry => {
            if (entry[0].isIntersecting && window.matchMedia("(min-width: 1000px)").matches) {
                entry[0].target.style.animation = `${node.nodeName == 'IMG' ? 'rightToMidAndAppearBouncy' : 'leftToMidAndAppearBouncy'} 1s 0s forwards`;
            }
        })

        footerTopObserver.observe(node);
    })
}

window.onload = () => {

    //header

    const openButton = document.querySelector('.openButton');
    openButton.parentNode.onclick = () => {
        document.querySelector('.phoneNavBar').classList.toggle('opened');
        openButton.classList.toggle('buttonClicked1');
        openButton.classList.toggle('buttonClicked2');
    }

    const headerObserver = new IntersectionObserver(entry => {
        if (entry[0].isIntersecting && window.matchMedia("(min-width: 1000px)").matches) {
            entry[0].target.style.animation = `appear 1s forwards`
        }
    })

    //elements

    const imageCovers = Array.from(document.querySelectorAll('.imageCover')),
        welcomeNodes = Array.from(document.querySelectorAll('.welcome .animate > *')).filter(node => node.nodeName != 'SPAN'),
        welcomeRows = Array.from(document.querySelectorAll('.welcome > .thirdCont > div > span')),
        aboutUsNodes = Array.from(document.querySelectorAll('.aboutUs .animate > *')),
        whyUsNodes = Array.from(document.querySelectorAll('.whyUs .animate > *')),
        bookingNodes = Array.from(document.querySelectorAll('.booking .animate > *')).filter(node => node.nodeName != 'DIV'),
        servicesNodes = Array.from(document.querySelectorAll('.services .animate > *:not(.excent)')),
        newsNodes = Array.from(document.querySelectorAll('.news .animate > *:not(.excent)')),
        contactNodes = Array.from(document.querySelectorAll('.contact .animate > *:not(.excent)')),
        footerTopNodes = Array.from(document.querySelectorAll('footer .top.animate > *:not(.excent)')),
        footerBotNodes = Array.from(document.querySelectorAll('footer .bot.animate > *:not(.excent)'));

    servicesNodes.push(document.querySelector('.services.animate > *:not(.excent)'));

    //execute

    const animateAll = () => {

        headerObserver.observe(document.querySelector('header'));

        animateImages(imageCovers);

        animateSections(welcomeNodes);
        animateColumns(welcomeRows);

        animateSections(aboutUsNodes);

        animateSections(whyUsNodes);

        animateSections(bookingNodes);

        animateCards(servicesNodes);

        animateCards(newsNodes);

        animateForms(contactNodes);

        animateColumns(footerBotNodes);

        animateFooterTop(footerTopNodes);

    }

    setTimeout(() => {
        animateAll();
    }, 100);

    window.onresize = () => {
        animateAll();
    }
}