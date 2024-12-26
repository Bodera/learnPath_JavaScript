// thx to https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

function v4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

export { v4 }
