const checkAppealForm = document.getElementById("check-appeal-form");
const uuid = document.getElementById("uuid");
const checkBtn = document.getElementById("check-btn");

async function checkAppeal() {
    event.preventDefault();

    checkBtn.setAttribute("disabled", true);
    checkBtn.innerHTML = "Checking Appeal...";

    fetch("https://gc-api.wdh.gg/appeal/user/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uuid: uuid.value
        })
    }).then(res => res.json()).then(data => {
        checkAppealForm.reset();

        checkAppealForm.className += " hidden";

        checkBtn.removeAttribute("disabled");
        checkBtn.innerHTML = "Check Appeal";

        if(data.code === "NOT_FOUND") {
            document.getElementById("not-found").removeAttribute("class", "hidden");

            setTimeout(() => {
                document.getElementById("not-found").className += " hidden";
                checkAppealForm.removeAttribute("class", "hidden");
            }, 5000);
            return;
        }

        if(data.status === "NOT_REVIEWED") {
            document.getElementById("not-reviewed").removeAttribute("class", "hidden");

            setTimeout(() => {
                document.getElementById("not-reviewed").className += " hidden";
                checkAppealForm.removeAttribute("class", "hidden");
            }, 5000);
            return;
        }

        if(data.status === "DENIED") {
            document.getElementById("denied-reason").innerHTML = `<span class="font-semibold text-lg">Reason</span>: <code class="bg-gray-700 rounded-lg p-1 pl-2 pr-2">${data.reason}</code>`;
            document.getElementById("denied").removeAttribute("class", "hidden");

            setTimeout(() => {
                document.getElementById("denied").className += " hidden";
                document.getElementById("denied-reason").innerHTML = "";
                checkAppealForm.removeAttribute("class", "hidden");
            }, 5000);
            return;
        }

        if(data.status === "APPROVED") {
            document.getElementById("approved-reason").innerHTML = `<span class="font-semibold text-lg">Reason</span>: <code class="bg-gray-700 rounded-lg p-1 pl-2 pr-2">${data.reason}</code>`;
            document.getElementById("approved").removeAttribute("class", "hidden");

            setTimeout(() => {
                document.getElementById("approved").className += " hidden";
                document.getElementById("approved-reason").innerHTML = "";
                checkAppealForm.removeAttribute("class", "hidden");
            }, 5000);
            return;
        }

        document.getElementById("check-error").removeAttribute("class", "hidden");

        setTimeout(() => {
            document.getElementById("check-error").className += " hidden";
            checkAppealForm.removeAttribute("class", "hidden");
        }, 5000);
    })
}