var scene = document.querySelector('a-scene');

function appendBanner(url) {
    var obj = document.createElement('a-curvedimage');
    obj.setAttribute('src', url);
    obj.setAttribute('radius', '20');
    obj.setAttribute('theta-length', '360');
    obj.setAttribute('height', '20');
    scene.appendChild(obj);
}

function appendCover(url) {
    var obj = document.createElement('a-curvedimage');
    obj.setAttribute('src', url);
    obj.setAttribute('radius', `15`);
    obj.setAttribute('theta-length', `30`);
    obj.setAttribute('rotation', `0 ${30 * i} 0`);
    obj.setAttribute('height', `10`);
    scene.appendChild(obj);
}

function appendTitle(id, width, index) {
    const length = width - 3;

    var obj = document.createElement('a-entity');
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
    obj.setAttribute('src', `assets/${id}.png`);
    obj.setAttribute('radius', '15');
    obj.setAttribute('theta-length', length);
    obj.setAttribute('rotation', `0 ${width * index} 0`);
    obj.setAttribute('height', `6`);
    obj.setAttribute('opacity', '.75');
    obj.setAttribute('crossorigin', 'anonymous'); // doesn't work :/
    // obj.setAttribute('cursor', 'fuse: true;');
    obj.addEventListener('click', function () {
        console.log(`assets/${id}.png`)
        obj.setAttribute('opacity','1');
        obj.emit('do_scale');
    });
    obj.appendChild(animation1);
    obj.appendChild(animation2);
    scene.appendChild(obj);
}

var scene = document.querySelector('a-scene');
if (scene.hasLoaded) {
    run();
} else {
    scene.addEventListener('loaded', run);
}
function run () {
    appendBanner(categories[0].image);

    const width = 360 / categories.length;
    categories.forEach((category, index) => {
        appendTitle(category.id, width, index);
    });
}
