console.log("Welcome to Magic Notes..");
showNotes();
const btnSave = document.querySelector("#btnSave");

btnSave.addEventListener("click", function (e) {
    // console.log(" I got clicked..");
    let txtTitle = document.querySelector("#txtTitle");
    let txtNote = document.querySelector("#txtNote");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
        // console.log(typeof notesObj);
    } else {
        notesObj = JSON.parse(notes);
    }
    let obj = {
        txtTitle: txtTitle.value,
        txtNote: txtNote.value
    }
    notesObj.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // console.log(notesObj);
    txtTitle.value = "";
    txtNote.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard card mx-4 my-3" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${index + 1} ${"."} ${element.txtTitle}</h5>
                        <p class="card-text"> ${element.txtNote}</p>
                        <button id="${index}" onclick="deleteNotes(this.id)"  class="btn btn-primary">Delete</button>
                    </div>
                </div>`;
    });
    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    } else {
        notesElement.innerHTML = `<b> Nothing to show. Use "Add a note" section above to add notes.. </b>`
    }
}

function deleteNotes(index) {
    // console.log(index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", function (e) {

    let inputTxt = searchInput.value;

    let card = document.querySelectorAll(".noteCard");
    card.forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerHTML;
        console.log(cardTxt);
        if (cardTxt.includes(inputTxt)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }


    });


});
