// --- LENNIS
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  //console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


// --- PROJECTS PAGES

function openProjectPage(project) {
    console.log(project);
    window.open('./project.html',"_self");
}

window.addEventListener('DOMContentLoaded', async () => {
    let response = await fetch('./assets/projects_info/projectsInfo.json')
    let projectList = await response.json();

    const projectsPreviewsContainer = document.getElementById('projects');
    if (projectsPreviewsContainer) {
        const projectPreviewsElements = await projectList.map((project) => {
            let newDiv = document.createElement('div');
            newDiv.className = "project-preview";
            newDiv.id = `project-${project.id}`;
            newDiv.setAttribute('data-cursor', 'pointer2');
            newDiv.onclick = () => {openProjectPage(project)} 
            
            newDiv.innerHTML = 
            `
                <p class="project-number">0${project.id}</p>
                <div class="project-title-div" data-cursor="pointer2">
                    <h3 class="project-title">${project.projectName}</h3>
                    <div class="tools-div" id="${project.id}-tools-div">
                       
                    </div>
                </div>
                <img class="open-project-icon" src="assets/icons/icon-upload.svg">
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
        console.log(projectsPreviewsContainer)
    }
   
    

})

// --- ANIMATIONS FUNCTIONS

function textDropMain(mainId, duration) {
    let elementToSplit = document.getElementById(mainId);
    console.log(elementToSplit)
    const contentText = elementToSplit.innerText;
    if (contentText) {
        elementToSplit.innerHTML = contentText.split("").map((el)=>`<span class="single-letter">${el}</span>`).join("");
    }
    let timeline = gsap.timeline({defaults: {ease: "power4.in", duration: duration}})
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
        let timeline = gsap.timeline({defaults: {ease: "power4.in", duration: duration}})
        timeline.to('.single-letter2', {
            //y: 20,
            top: 0,
            stagger: 0.075,
            scrollTrigger: {
                trigger: viewSectionId, 
                start: "top bottom",
                end: "=+300 bottom",
                scrub: true,
                markers: false,
            }
        })
    }
}

function projectPreviewSlide(className, duration, viewSectionId) {
    //let projectElements = document.getElementsByClassName(className);
    gsap.from(className, {
        ease: "power4.inOut",
        duration: duration,
        xPercent: -100,
        stagger: 0.5,
        opacity: 0,
        scrollTrigger: {
            trigger: viewSectionId, 
            start: "top bottom",
            end: "bottom bottom",
            scrub: false,
            markers: false,
        }
    })
}

// function mainTitleHorRotation(textId) {
//     gsap.fromTo(textId, 
//         {
//             xPercent: -100,
//         },
//         {   
//             repeat: -1,
//             duration: 12,
//             xPercent: 200,
//         }
//         )
// }
function horizontalLoop(textClass, direction) {
    const elementWidth = document.querySelectorAll(textClass)[0].offsetWidth;
    const screenWidth = window.screen.width;
    const speed = 100;
    const percentageMovement = direction * (-100)

    let tween = gsap.to(textClass, 
        {
            xPercent: percentageMovement, 
            repeat: -1, 
            duration: 10, 
            ease: "linear"}
            ).totalProgress(0.5);

    //gsap.set(".outline-text-div", {xPercent: -50});

    // tl = gsap.timeline();
    // tl.fromTo(textClass, 
    //     { // intro (from far right edge)
    //         xPercent: 0,
    //     }, 
    //     {
    //         xPercent: -100,
    //         duration: 5,
    //         ease: "none",
    //         repeat: -1
    //     })
    //     .to(textClass, 
    //         { // loop
    //             xPercent: 200,
    //             ease: "none",
    //             duration: 5,
    //             repeat: -1
    //       });

        // gsap.to(textClass, {
        //         xPercent: -100,
        //         repeat: -1,
        //         duration: 10,
        //         ease: "linear"
        //     })
        //     .totalProgress(0.5)
    }

// --- APPLYING ANIMATIONS --- //
window.addEventListener('DOMContentLoaded', () => {
    textDropMain('main-title', 1);
    textDrop('projects-title', 1, '#projects-title');
    textDrop('skills-title', 1, '#skills-title');
    projectPreviewSlide('.project-preview', 2, '#projects');
   //mainTitleHorRotation('#outline-fname-01');
   horizontalLoop(".outline-container", 1)
   horizontalLoop(".outline-container2", -1)
});


// --- CURSOR --- //
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
});
