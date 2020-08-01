const sections = document.querySelectorAll('section');

const swoosh = document.querySelector('.swoosh');

const gradients = [
    "linear-gradient(to left top, #22B9C4,  #203A43)",
    "linear-gradient(to left top, #22C45C, #203A43)",
    " linear-gradient(to left top, #B7C422, #203A43)",
    " linear-gradient(to left top, #C44922, #203A43)"
];

const options = {
    // at what point it needs to check
    threshold: 0.7
};

let observer = new IntersectionObserver(navChecker, options);

function navChecker(entries) {

    entries.forEach(entry => {
        //shows section class in console
        const className = entry.target.className;
        console.log(className);
        //which anchor is active - also remember backticks `` when using $
        const activeAnchor = document.querySelector(`[data-x=${className}]`);
        //what is the gradient index, from data index on sections
        const gradientIndex = entry.target.getAttribute("data-index");
        //gives access to height with and position of each tag
        const coords = activeAnchor.getBoundingClientRect();
        // using the above access, make sure swoosh bubble encompasses whole text regardless of size
        const directions = {
            height: coords.height,
            width: coords.width,
            top: coords.top,
            left: coords.left
        };

        //check/make visibility
        if (entry.isIntersecting) {
            swoosh.style.setProperty('left', `${directions.left}px`);
            swoosh.style.setProperty('top', `${directions.top}px`);
            swoosh.style.setProperty('width', `${directions.width}px`);
            swoosh.style.setProperty('height', `${directions.height}px`);
            // so gradient changes to each section's colours
            swoosh.style.background = gradients[gradientIndex];
        }

    });
}

//telling it to check
sections.forEach(section => {
    observer.observe(section);
}); 