//node index.js to run

/**
  How the formatting in devices.json works

{
    "cpu generation": {
        "default_rwLegacy": false, //null = EOL (display red EOL message), true = supported (display checkbox), false = not supported
        "default_fullrom": true, //true = supported, false = not supported.
        "default_wpmethod": ""<a rel=\"nofollow noopener noreferrer\" class=\"external text\" href=\"https://web.archive.org/web/20231009064928/https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices/hp-pavilion-14-chromebook\" target=\"_blank\">switch</a>", //default wp method link.
        "devices": [ //This is an array
            {
                "device": [
                    "Array of chromebook models",
                    "that this boardname",
                    "is known by."
                ],
                "boardname": "BOARDNAME"
            },
            {
                "device": [
                    "Coolio chromebook name"
                ],
                "boardname": "BOARDNAME",
                "rwLegacy": null,
                "wpMethod": "Different wp method link/method"
            },
        ]
    }

*/


function generateHTML(chromebooks) {
    let html = `
<table style="font-size: 14px !important;">
    <tbody>`;
    let first = true;
    for (const generation in chromebooks) {
        let devices = chromebooks[generation];
        devices.devices.forEach(device => {
            //set defaults
            if (device.wpMethod === undefined) device.wpMethod = devices.default_wpmethod;
            if (device.fullrom === undefined) device.fullrom = devices.default_fullrom;
            if (device.rwLegacy === undefined) device.rwLegacy = devices.default_rwLegacy;
        })
        if (first) {
            first = false;
        } else {
            html += `
        <tr>
            <td colspan="8"></td>
        </tr>`;
        }
        html += `
        <tr>
            <th colspan="8" style="text-align:left;"> <i>${generation}</i></th>
        </tr>
        <tr>
            <th scope="col"> Device Name</th>
            <th scope="col"> HWID/Board Name</th>
            <th scope="col"> RW_LEGACY <br> Firmware</th>
            <th scope="col"> UEFI Firmware <br>(Full ROM)</th>
            <th scope="col"> WP Method</th>
        </tr>`;

        devices.devices.forEach((device, index) => {
            let devicename = device.device.join("<br>");
            let rw_legacy = "";
            if (device.rwLegacy === null) {
                rw_legacy = "<span style=\"color:#ff0000\"><b>EOL</b></span>";
            } else if (device.rwLegacy === true) {
                rw_legacy = "✅";
            }
            let full_rom = device.fullrom ? "✅" : "";


            html += `
        <tr>
            <td>${devicename}</td>
            <td style="text-align:center;"> ${device.boardname}</td>
            <td style="text-align:center;"> ${rw_legacy}</td>
            <td style="text-align:center;"> ${full_rom}</td>
            <td style="text-align:center;"> ${device.wpMethod}</td>
        </tr>`;

        })
    }
    html += `
    </tbody>
</table>`;
    return html;
}

const path = require("path");

console.log("Loading...");
const fs = require("fs");
let data = fs.readFileSync(path.join(__dirname, "template.md"), "utf8");
data = data.replace("${{TABLE}}", generateHTML(require('./devices.json')));

//Putting this in the template file causes the template be be showed in the listing
fs.writeFileSync(path.join(__dirname, "../docs/supported-devices.md"), data);

//Dont question the function.toString.... Javascript is funny
fs.writeFileSync(path.join(__dirname, "../.vuepress/public/supported-devices.js"), fs.readFileSync(path.join(__dirname, "search.js"), "utf-8").replace("{{script}}", generateHTML.toString()));
fs.copyFileSync(path.join(__dirname, "devices.json"), path.join(__dirname, "../.vuepress/public/devices.json"));

console.log("Done!");
