// --- LENNIS --- //
const lenis = new Lenis()

lenis.on('scroll', (e) => {
//console.log(e)
})

function raf(time) {
lenis.raf(time)
requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// --- BARBA --- //
// barba.init({
//     sync: true,
//     transitions: [{
//         async leave(data) {
//             const data = this.async();
//             pageTransition();
//             await delay(1500);
//             done();
//         },
//         async enter(data) {
//             contentAnimation();
//         },
//         async once(data) {
//             contentAnimation()
//         }
//     }]
// })
// --- CURSOR --- //
//checking if device is touch
function is_touch_enabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

window.addEventListener('DOMContentLoaded', async () => {
    const cursor = document.querySelector("#cursor");
    const cursorBorder = document.querySelector("#cursor-border");
    const cursorPos = { x: 0, y: 0 };
    const cursorBorderPos = { x: 0, y: 0 };

    document.addEventListener("mousemove", (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;

    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    requestAnimationFrame(function loop() {
    const easting = 8;
    cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
    cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

    cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
    requestAnimationFrame(loop);
    });

    document.querySelectorAll("[data-cursor]").forEach((item) => {
    item.addEventListener("mouseover", (e) => {
        if (item.dataset.cursor === "pointer") {
        cursorBorder.style.backgroundColor = "rgba(255, 255, 255, .6)";
        cursorBorder.style.setProperty("--size", "30px");
        }
        if (item.dataset.cursor === "pointer2") {
        cursorBorder.style.backgroundColor = "white";
        cursorBorder.style.mixBlendMode = "difference";
        cursorBorder.style.setProperty("--size", "80px");
        }
    });
    item.addEventListener("mouseout", (e) => {
        cursorBorder.style.backgroundColor = "unset";
        cursorBorder.style.mixBlendMode = "unset";
        cursorBorder.style.setProperty("--size", "50px");
    });
    });

    //switching of cursor id touch device
    if (  is_touch_enabled() ) {
        cursor.style.display = 'none';
        cursorBorder.style.display = 'none';
    }
});


//--- MENU ICON ---//
window.addEventListener('DOMContentLoaded', () => {
    const hamMenu = document.getElementById('hamburger-1');
    const openableMenu = document.getElementById('main-menu');
    let isMenuClosed = true;
    hamMenu.onclick = function() {
        if(screen.width > 500) {
            openableMenu.style.display = "flex";
        } else if (isMenuClosed) {
            hamMenu.classList.toggle("is-active");
            openableMenu.style.display = "flex";
            isMenuClosed = false;
        } else {
            hamMenu.classList.toggle("is-active");
            openableMenu.style.display = "none";
            isMenuClosed = true;
        }
        
    };
  });

  // --- ANIMATIONS FUNCTIONS

function textDropMain(mainId, duration) {
    let elementToSplit = document.getElementById(mainId);
    if (elementToSplit) {
        const contentText = elementToSplit.innerText;
        elementToSplit.innerHTML = contentText.split("").map((el)=>`<span class="single-letter">${el}</span>`).join("");
    }
    let timeline = gsap.timeline({defaults: {duration: duration}})
    timeline.to('.single-letter', {
        top: 0,
        stagger: 0.075
    })
    
}

function textDrop(mainId, duration, viewSectionId) {
    let elementToSplit = document.getElementById(mainId);
    if (elementToSplit) {
        const contentText = elementToSplit.innerText;
        if (contentText) {
            elementToSplit.innerHTML = contentText.split("").map((el)=>`<span class="single-letter2">${el}</span>`).join("");
        }
        ScrollTrigger.batch('.single-letter2', {
            start: "-100px bottom",
            onEnter: elements => gsap.to(elements, {top: 0, stagger: 0.075}),
            //onLeaveBack: elements => gsap.set(elements, {top: 0, opacity: 0, overwrite: true})
          });
        // let timeline = gsap.timeline({defaults: {ease: "power4.in", duration: duration}})
        // timeline.to('.single-letter2', {
        //     //y: 20,
        //     top: 0,
        //     stagger: 0.075,
        //     scrollTrigger: {
        //         trigger: viewSectionId, 
        //         start: "=+200 bottom",
        //         end: "=+500 bottom",
        //         scrub: false,
        //         markers: true,
        //     }
        // })
    }
}

function projectPreviewSlide(className, duration, viewSectionId) {
    let projectElements = document.getElementsByClassName(className);
    if (projectElements) {
        ScrollTrigger.batch(`.${className}`, {
            markers: false,
            start: "top-=100px bottom",
            end: "bottom+=500px bottom",
            onEnter: elements => gsap.from(elements, {xPercent: -100, opacity:0, stagger: 0.5}),
            //onLeaveBack: elements => gsap.from(elements, {xPercent: -100, opacity:0, stagger: 0.075})
          });
        // gsap.from(className, {
        //     ease: "power4.inOut",
        //     duration: duration,
        //     xPercent: -100,
        //     stagger: 0.5,
        //     opacity: 0,
        //     scrollTrigger: {
        //         trigger: viewSectionId, 
        //         start: "top bottom",
        //         end: "bottom bottom",
        //         scrub: false,
        //         markers: false,
        //     }
        // })
    }
    
}

function horizontalLoop(textClass, direction) {
    const element = document.querySelectorAll(textClass)[0]
    if (element) {
        const elementWidth = element.offsetWidth;
        const screenWidth = window.screen.width;
        const speed = 100;
        const percentageMovement = direction * (-100)
    
        let tween = gsap.to(textClass, 
            {
                xPercent: percentageMovement, 
                repeat: -1, 
                duration: 10, 
                ease: "linear"
            }).totalProgress(0.5);
                
    }
}
function showProjectPreview(projectName) {
    const divElement = document.getElementById('preview-video');
    if (divElement) {
        divElement.innerHTML = 
        `
        <video width="100%" height="auto" autoplay loop playsinline muted>
            <source src="./assets/projects_photos/${projectName}/${projectName}_movie_short.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        `;
        divElement.style.display = 'flex'
    }
}
function hideProjectPreview(projectName) {
    const divElement = document.getElementById('preview-video');
    if (divElement) {
        divElement.innerHTML = '';
        divElement.style.display = 'none';
    }
}
function splitOnHover(divId, projectName) {
    const hoverableDiv = document.getElementById(divId);
    if (hoverableDiv) {
        //number splitting
        let numberElement = document.getElementById(`project-number-${divId}`);
        const numberContent = numberElement.innerHTML;
        const numberEl01 = `<span class="splitted-text1">${numberContent.split('')[0]}</span>`;
        const numberEl02 = `<span class="splitted-text2">${numberContent.split('')[1]}</span>`;
        numberElement.innerHTML = numberEl01 + numberEl02;
        //numberElement.innerHTML = numberContent.split('').map((el)=>`<span class="splitted-text">${el}</span>`).join("");
        
        //title splitting
        let titleElement = document.getElementById(`project-title-${divId}`);
        const splitPattern = titleElement.dataset.split;
        const nameEl01 = `<span class="splitted-text1">${splitPattern.split('.')[0]}</span>`;
        const nameEl02 = `<span class="splitted-text2">${splitPattern.split('.')[1]}</span>`;
        titleElement.innerHTML = nameEl01 + nameEl02;
        //titleElement.innerHTML = splitPattern.split('.').map((el)=>`<span class="splitted-text">${el}</span>`).join("");
        


        if (numberElement, titleElement) {
            //down to up
            gsap.set('.splitted-text1', {'clip-path': 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'})
            gsap.to('.splitted-text1', {'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.5})
            //up to down
            gsap.set('.splitted-text2', {'clip-path': 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'})
            gsap.to('.splitted-text2', {'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.5})

        }

        //previewAnimation
        showProjectPreview(projectName)
    }
        
    
}
function unsplitOnHover(divId, projectName, projectNumber) {
    let numberElement = document.getElementById(`project-number-${divId}`);
    numberElement.innerHTML = "0" + projectNumber;
    let titleElement = document.getElementById(`project-title-${divId}`);
    titleElement.innerHTML = projectName;
    //previewAnimation
    hideProjectPreview(projectName)
}


function objectSlideIn(divClass, viewSectionId) {
    const element = document.querySelector(divClass);
    console.log('slide')
    if (element) {
        gsap.from(divClass, {
            'clip-path': 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', 
            opacity: 0,
            duration: 2, 
            ease: 'power3.out', 
            stagger: 1,
            scrollTrigger: {
                        trigger: viewSectionId || none, 
                        start: "=+200 bottom",
                        end: "=+500 bottom",
                        scrub: false,
                        markers: false,
                    }
            })
    }
}

function mainObjectSlideIn(divId) {
    const element = document.querySelector(divId);
    console.log('slide')
    if (element) {
        gsap.set(divId, {
            //'clip-path': 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 0,
            yPercent: 40
        })
        gsap.to(divId, {
            //'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
            opacity: 1,
            yPercent: 0,
            duration: 4, 
            ease: 'power3.out', 
            })
    }
}

function floatUp(divId, amount, duration) {
    const element = document.querySelector(divId);
    if (element) {
        gsap.set(divId, {
            yPercent: amount
        })
        gsap.to(divId, {
            yPercent: 0,
            duration: duration, 
            ease: 'linear', 
            })
    }
}

function floatDown(divId, amount, duration) {
    const element = document.querySelector(divId);
    if (element) {
        gsap.set(divId, {
            yPercent: -amount
        })
        gsap.to(divId, {
            yPercent: 0,
            duration: duration, 
            ease: 'linear', 
            })
    }
}
function slowShowUp(divId, duration) {
    const element = document.querySelector(divId);
    if (element) {
        gsap.set(divId, {
            opacity: 0
        })
        gsap.to(divId, {
            opacity: 1,
            duration: duration, 
            ease: 'power4.in', 
            })
    }
}

function pageTransition() {
    const tl = gsap.timeline();
    tl.to('ul.transition li', {
        duration: .5,
        scaleY: 1,
        transformOrigin: "bottom left",
        stagger: .2,
    })
    tl.to('ul.transition li', {
        duration: .5,
        scaleY: 0,
        transformOrigin: "bottom left",
        stagger: .2,
        delay: .1
    })
}


// --- OPEN MAIN PAGE ---//
function openMainPage(section) {
    pageTransition()
    //if (document.getElementById('project-full-info').style.display === "flex") {
        document.getElementById('home').style.display = "flex";
        document.getElementById('projects').style.display = "flex";
        document.getElementById('skills').style.display = "flex";
        document.getElementById('contact').style.display = "flex";
        document.getElementById('project-full-info').style.display = "none";
    //};
    slowShowUp('#home', 2)
    window.scrollTo(0, 0);
    
};


// --- PROJECT DETAILED PAGE
function openProjectPage(project) {
    //const NewWindow = window.open('./project.html',"_self");
    //NewWindow.onload = () => {}
    pageTransition()
    window.scrollTo(0, 0);
    document.getElementById('home').style.display = "none";
    document.getElementById('projects').style.display = "none";
    document.getElementById('skills').style.display = "none";
    document.getElementById('contact').style.display = "none";
    
    const mainDiv = document.getElementById('project-full-info');
    mainDiv.innerHTML = '';
    mainDiv.style.display = "flex";
    window.scrollTo(0, 0);

    if (mainDiv) {
        //create Title Div
        let titleDiv = document.createElement('div');
        titleDiv.className = 'outline-text-div';
        titleDiv.innerHTML =
        `
            <div class="outline-container">
                <img class="outline-text" src="./assets/text_outlines/Text outline - ${project.projectName}.svg">
            </div>
            <div class="outline-container">
                <img class="outline-text" src="./assets/text_outlines/Text outline - ${project.projectName}.svg">
            </div>
            <div class="outline-container">
                <img class="outline-text" src="./assets/text_outlines/Text outline - ${project.projectName}.svg">
            </div>
            <div class="outline-container">
                <img class="outline-text" src="./assets/text_outlines/Text outline - ${project.projectName}.svg">
            </div>
            <div class="main-title-div">
                <p class="paragraph sub-title-number">Project 0${project.id}</p>
                <h1 class="main-title" id="main-title">${project.projectName}</h1>
            </div>
        `;
        mainDiv.appendChild(titleDiv);


        //create Project Info Div
        let projectInfoDiv = document.createElement('div');
        projectInfoDiv.className = "project-main-information";
        projectInfoDiv.innerHTML =
        `
        <div class="tools-div" id="${project.projectName}-tools">

        </div>
        <p class="paragraph">
            ${project.projectDescription}
        </p>
        <img class="project-main-image" src="./assets/projects_photos/${project.projectName}/${project.projectName}_overview.png">
        <p class="paragraph bolder">
            Main functionalities of the application:
        </p>
        <div id="functionalities-div">

        </div>
        <video class="project-main-video" width="100%" height="auto" autoplay loop playsinline muted>
            <source src="./assets/projects_photos/${project.projectName}/${project.projectName}_movie_short.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <a href=${project.projectGithubLink} class="regular-button page-visit" data-cursor="pointer2">Github source code</a>
        <button class="regular-button" data-cursor="pointer2" onclick="openMainPage('projects')" >Go back</button>
        `;
        mainDiv.appendChild(projectInfoDiv);


        //tools
        let projectToolsDiv = document.getElementById(`${project.projectName}-tools`);
        project.projectTools.map((tool) => {
            let newP = document.createElement('p');
            newP.className = "tool-name";
            newP.innerHTML =`${tool}`;
            projectToolsDiv.appendChild(newP);
        });


        //functionalities
        let functionalitiesDiv = document.getElementById('functionalities-div');
        if (project.projectFunctionalities.length === 2) {
            console.log('Flexfit functionalities - 2 types')
            //first user functionalities
            let newP01 = document.createElement('p');
            newP01.className = "paragraph";
            newP01.innerHTML = 'Main functionalities - sport user:';
            functionalitiesDiv.appendChild(newP01);
            project.projectFunctionalities[0].map((functionality) => {
                let newP = document.createElement('p');
                newP.className = "paragraph";
                newP.innerHTML =`${functionality}`;
                functionalitiesDiv.appendChild(newP);
            })
            //second user functionalities
            let newP02 = document.createElement('p');
            newP02.className = "paragraph";
            newP02.innerHTML = 'Main functionalities - studio user:';
            functionalitiesDiv.appendChild(newP02);
            project.projectFunctionalities[1].map((functionality) => {
                let newP = document.createElement('p');
                newP.className = "paragraph";
                newP.innerHTML =`${functionality}`;
                functionalitiesDiv.appendChild(newP);
            })
            
        } else {
            project.projectFunctionalities.map((functionality) => {
                let newP = document.createElement('p');
                newP.className = "paragraph";
                newP.innerHTML =`${functionality}`;
                functionalitiesDiv.appendChild(newP);
            })
        }
        
    }

    //applying animations
    horizontalLoop(".outline-container", 1)
    mainObjectSlideIn('#project-full-info')
        
    
    
    
}

// --- PROJECT PREVIEWS --- //
window.addEventListener('DOMContentLoaded', async () => {
    let response = await fetch('./assets/projects_info/projectsInfo.json')
    let projectList = await response.json();

    const projectsPreviewsContainer = document.getElementById('projects');
    if (projectsPreviewsContainer) {
        const projectPreviewsElements = await projectList.map((project) => {
            let newDiv = document.createElement('div');
            newDiv.className = "project-preview";
            newDiv.id = project.id;
            newDiv.setAttribute('data-cursor', 'pointer2');
            newDiv.onclick = () => {openProjectPage(project)}
            newDiv.onmouseenter = () => {splitOnHover(project.id, project.projectName)}
            newDiv.onmouseleave = () => {unsplitOnHover(project.id, project.projectName, project.id)}
            
            newDiv.innerHTML = 
            `
                <p class="project-number" id="project-number-${project.id}">0${project.id}</p>
                <div class="project-title-div" data-cursor="pointer2">
                    <h3 class="project-title" id="project-title-${project.id}" data-split="${project.projectNameSplitted}">${project.projectName}</h3>
                    <div class="tools-div" id="${project.id}-tools-div">
                       
                    </div>
                </div>
                <img class="open-project-icon" src="./assets/icons/icon-upload.svg">
            `
            projectsPreviewsContainer.appendChild(newDiv);
    
            //creating p elements for each tools used
            let toolDiv = document.getElementById(`${project.id}-tools-div`);
            project.projectTools.map((tool) => {
                let newP = document.createElement('p');
                newP.className = "tool-name";
                newP.innerHTML =`${tool}`;
                toolDiv.appendChild(newP);
            }
            )
    
        }
        );
    }

    //animations
    projectPreviewSlide('project-preview', 2, '#projects');
    
    

})



// --- APPLYING ANIMATIONS --- //
window.addEventListener('DOMContentLoaded', () => {
    textDropMain('main-title', 0.5);
    textDrop('projects-title', 1, '#projects-title');
    textDrop('skills-title', 1, '#skills-title');
    textDrop('contact-title', 1, '#contact-title');
    
   //mainTitleHorRotation('#outline-fname-01');
   horizontalLoop(".outline-container", 1);
   horizontalLoop(".outline-container2", -1);
   objectSlideIn('.skills-div-subgroup', '#skills');
   //scrolling events
   let lastScrollTop = document.documentElement.scrollTop;
   document.addEventListener("scroll", function(){
    const scrollTopPosition = document.documentElement.scrollTop;
    if (scrollTopPosition > lastScrollTop) {
        console.log('scrolling down');
        // floatUp('#projects', 30, 1);
        // floatUp('#skills', 30, 1);
        // floatUp('#contact', 30, 1);
      } else if (scrollTopPosition < lastScrollTop) {
        console.log('scrolling up');
        // floatDown('#projects', 30, 1);
        // floatDown('#skills', 30, 1);
        // floatDown('#contact', 30, 1);
      }
    
   })
});


