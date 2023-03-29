const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

if(params.id) {
    document.getElementById("id").value = `${params.id}`;
}

if(params.reason) {
    const elements = document.getElementsByTagName("input");

    for(i = 0; i < elements.length; i++) {
        if(elements[i].type == "radio" && elements[i].value == params.reason) {
            elements[i].checked = true;
        }
    }
}
