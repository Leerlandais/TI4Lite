if (!localStorage.getItem("ITEM1")) {

for(let i = 1; i <= 12; i++) {
    const item = {id: i, sold: Math.floor(Math.random() * 20) + 1};
    localStorage.setItem('ITEM'+i, JSON.stringify(item));
}
}

