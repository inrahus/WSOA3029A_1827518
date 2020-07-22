const slide = () => {
    const menuicon = document.querySelector('.menuicon');
    const nav = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    //Toggle Nav
    menuicon.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        //Make links appear in delay (animation)
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`
            }
        });
        //menuicon animation
        menuicon.classList.toggle('toggle');
    })
}

slide();