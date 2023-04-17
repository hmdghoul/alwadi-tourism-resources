    let siteLoaded = new Promise(function(resolve, reject) {
        $.ajax({
            url: "https://evisa.rop.gov.om/eVisaSponsoredUnsponsored/maintainUserRecords",
            data: {
                tabId: window.name
            },
            xhrFields: {
                withCredentials: true
            },
            type: "GET",
            dataType: "html",
            success: function (html) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;
                let allow = false;
                $(tempDiv).find("#sponsorCombobox option").each(function(index, option) {
                    if (option.value.trim() != "" && JSON.parse(option.value).sponsorPk == "7E7215565DFCE6ACE05382A40A0A4A49") {
                        allow = true;
                    }
                });
                resolve(allow);
            }
        });
    });
    siteLoaded.then((result) => {
        if (result) {
            let extra = {
                visaType: -1
            };
            let container = $(".container").eq(0);
            var buttonVisa6A = document.createElement("button");
            buttonVisa6A.innerText = "Visa 6A";
            buttonVisa6A.onclick = function() {
                extra.visaType = 1;
                const extraBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(extra))));
                document.getElementById("applySubmit").action = document.getElementById("applySubmit").action + "&_=" + extraBase64;
                $("#applybutton").click();
                return false;
            };
            container.append(buttonVisa6A, container.firstChild);

            var buttonVisa6B = document.createElement("button");
            buttonVisa6B.innerText = "Visa 6B";
            buttonVisa6B.onclick = function() {
                extra.visaType = 2;
                const extraBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(extra))));
                document.getElementById("applySubmit").action = document.getElementById("applySubmit").action + "&_=" + extraBase64;
                $("#applybutton").click();
                return false;
            };
            container.append(buttonVisa6B, container.firstChild);
        }
    });
