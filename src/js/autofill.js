const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

const id = params.id;
const reason = params.reason;

if(id) {
    document.getElementById("id").value = `${id}`;
}

if(reason) {
    const elements = document.getElementsByTagName("input");

    for(i = 0; i < elements.length; i++) {
        if(elements[i].type == "radio" && elements[i].value == reason) {
            elements[i].checked = true;
        }
    }
}
