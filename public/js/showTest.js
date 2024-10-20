const changeTestSetting = document.getElementById("changeTestSetting");
const currentTestSetting = document.getElementById("currentTestSetting");

let showTests = JSON.parse(localStorage.getItem("TESTS"));
if (showTests === undefined || showTests === null) {
    showTests = confirm("Run with tests?");
    localStorage.setItem("TESTS", JSON.stringify(showTests));
}

currentTestSetting.textContent = showTests;
changeTestSetting.addEventListener("click", (e) => {
    showTests = !showTests;
    console.log(showTests);
    localStorage.setItem("TESTS", JSON.stringify(showTests));
    currentTestSetting.textContent = showTests;
})