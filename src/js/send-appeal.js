const appealForm = document.getElementById("appeal-form");
const id = document.getElementById("id");
const unbanReason = document.getElementById("unbanreason");
const appealBtn = document.getElementById("appeal-btn");

async function sendAppeal() {
    event.preventDefault();

    const banReason = document.querySelector('input[name="banreason"]:checked');

    appealBtn.setAttribute("disabled", true);
    appealBtn.innerHTML = "Sending Appeal...";

    fetch("https://gc-api.wdh.gg/appeal/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id.value,
            banreason: banReason.value,
            unbanreason: unbanReason.value,
        })
    }).then(res => res.json()).then(data => {
        appealForm.reset();

        appealForm.className += " hidden";

        if(data.code === "NOT_BANNED") {
            document.getElementById("not-banned").removeAttribute("class", "hidden");
            return;
        }

        if(data.code === "APPEAL_EXISTS") {
            document.getElementById("appeal-exists").removeAttribute("class", "hidden");
            return;
        }

        if(data.code === "APPEAL_CREATED") {
            document.getElementById("appeal-id").innerHTML = `<p class="font-semibold mb-2">Appeal ID</p><code class="bg-gray-700 rounded-lg p-1 pl-2 pr-2">${data.id}</code>`;
            document.getElementById("appeal-created").removeAttribute("class", "hidden");
            return;
        }

        document.getElementById("appeal-error").removeAttribute("class", "hidden");
    })
}