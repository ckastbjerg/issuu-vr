var scene = document.querySelector('a-scene');

function appendBanner(url) {
    var obj = document.createElement('a-curvedimage');
    obj.setAttribute('src', url);
    obj.setAttribute('radius', '20');
    obj.setAttribute('theta-length', '360');
    obj.setAttribute('height', '20');
    scene.appendChild(obj);
}

function emptyCategoriesContainer() {
    categoriesContainer.querySelectorAll('a-curvedimage').forEach(element => {
        element.parentNode.removeChild(element);
    });
}

function zoomPage(e, id) {
    var animation1 = document.createElement('a-animation');
    var animation2 = document.createElement('a-animation');
    animation1.setAttribute('attribute', `radius`);
    animation1.setAttribute('to', `7`);
    animation1.setAttribute('dur', `2000`);
    animation1.setAttribute('begin', `do_scale`);
    animation2.setAttribute('attribute', `theta-length`);
    animation2.setAttribute('to', length * 2);
    animation2.setAttribute('dur', `2000`);
    animation2.setAttribute('begin', `do_scale`);
    e.target.setAttribute('opacity','1');
    e.target.emit('do_scale');
}

let offset = 0;
function showPages(e, id) {
    emptyCategoriesContainer();

    const width = 360 / 13;
    for (var i = offset; i <= offset + 13; i++) {
        let url;
        console.log(i % 13);
        if (i % 13 === 0) {
            url = '/assets/more.png';
            appendImage(id, url, width, i, showPages);
        } else {
            url = `https://image.isu.pub/${id}/jpg/page_${i}_thumb_large.jpg`;
            appendImage(id, url, width, i, zoomPage);
        }
    }
    offset += 13;
}

function appendImage(id, url, width, index, onClick) {
    const length = width - 3;

    var obj = document.createElement('a-curvedimage');
    var animation1 = document.createElement('a-animation');
    var animation2 = document.createElement('a-animation');
    animation1.setAttribute('attribute', `radius`);
    animation1.setAttribute('to', `7`);
    animation1.setAttribute('dur', `2000`);
    animation1.setAttribute('begin', `do_scale`);
    animation2.setAttribute('attribute', `theta-length`);
    animation2.setAttribute('to', length * 2);
    animation2.setAttribute('dur', `2000`);
    animation2.setAttribute('begin', `do_scale`);
    obj.setAttribute('src', url);
    obj.setAttribute('radius', '15');
    obj.setAttribute('theta-length', length);
    obj.setAttribute('rotation', `0 ${width * index} 0`);
    obj.setAttribute('height', `7.5`);
    obj.setAttribute('opacity', '.75');
    obj.setAttribute('crossorigin', 'anonymous'); // doesn't work :/
    // obj.setAttribute('cursor', 'fuse: true;');
    obj.addEventListener('click', e => { onClick(e, id) });
    obj.appendChild(animation1);
    obj.appendChild(animation2);
    categoriesContainer.appendChild(obj);
}

function showSubcategories(e, id) {
    emptyCategoriesContainer();
    const cats = categories.find(c => c.id === id );
    if (cats) {
        appendCategories(cats.subCategories);
    } else {
        fetch(`/category/${id}`)
        .then(res => res.json())
        .then(docs => {
            const magz = docs.map(doc => {
                const id = `${doc.revisionId}-${doc.publicationId}`;
                return {
                    id: id,
                    url: `https://image.isu.pub/${id}/jpg/page_1_thumb_large.jpg`
                };
            });

            const width = 360 / magz.length;
            magz.forEach((mag, index) => {
                appendImage(mag.id, mag.url, width, index, showPages);
            });
        });
    }
}

function appendLogo() {
    var obj = document.createElement('a-curvedimage');
    obj.setAttribute('src', '/assets/logo.png');
    // obj.setAttribute('radius', '15');
    // obj.setAttribute('theta-length', length);
    // obj.setAttribute('rotation', `0 0 0`);
    // obj.setAttribute('height', `7.5`);
    scene.appendChild(obj);
}

function appendCategories(categories) {
    const width = 360 / categories.length;
    categories.forEach((category, index) => {
        appendImage(category.id, `assets/${category.id}.png`, width, index, showSubcategories);
    });
}

var scene = document.querySelector('a-scene');
var categoriesContainer = document.querySelector('#categories');
if (scene.hasLoaded) {
    run();
} else {
    scene.addEventListener('loaded', run);
}
function run () {
    // appendLogo();
    appendBanner(categories[0].image);
    appendCategories(categories);
}
