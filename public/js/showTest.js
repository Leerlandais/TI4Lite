// un bouton pour basculer tests et un endroit pour montrer le setting courant
const changeTestSetting = document.getElementById("changeTestSetting"),
      currentTestSetting = document.getElementById("currentTestSetting");

let showTests = JSON.parse(localStorage.getItem("TESTS"));
if (showTests === undefined || showTests === null) {
    showTests = confirm("Run with tests?");
    localStorage.setItem("TESTS", JSON.stringify(showTests));
}

currentTestSetting.textContent = showTests;
changeTestSetting.addEventListener("click", (e) => {
    showTests = !showTests;
    localStorage.setItem("TESTS", JSON.stringify(showTests));
    currentTestSetting.textContent = showTests;
})