const changeTestSetting = document.getElementById("changeTestSetting");
const currentTestSetting = document.getElementById("currentTestSetting");

let showTests = false;
console.log(showTests)
if (showTests === undefined || showTests === null) {
    showTests = confirm("Run with tests?");
}

currentTestSetting.textContent = showTests;
changeTestSetting.addEventListener("click", (e) => {
    showTests = !showTests;
    currentTestSetting.textContent = showTests;
})