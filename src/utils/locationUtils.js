export function filterNameFromURL() {
    const hash = window.location.hash;
    if(!hash) {
        return "all";
    } else {
        const contents = hash.split("/")[1];
        if(contents==="") {
            return "all";
        } else {
            return contents;
        }
    }
}