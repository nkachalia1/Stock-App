
// class Example {
//     constructor(ele) {
//         this.ele = ele;
//         this.ele.innerHTML = "<h1>Enter stock ticker symbol:</h1>";

//         this.ele.addEventListener('click', this.handleClick.bind(this));
//     }

//     handleClick() {
//         this.ele.children[0].innerText = "ouch";
//     }

//     newMethod() {

//     }

// }

document.addEventListener("DOMContentLoaded", () => {
    const handleFavoriteSubmit = (e) => {
        e.preventDefault();

        const favoriteInput = document.querySelector(".favorite-input");
        const favorite = favoriteInput.value;
        favoriteInput.value = "";

        const newListLi = document.createElement("li");
        newListLi.textContent = favorite;

        const favoritesList = document.getElementById("sf-places");
        favoritesList.appendChild(newListLi);
      };

      const listSubmitButton = document.querySelector(".favorite-submit");
      listSubmitButton.addEventListener("click", handleFavoriteSubmit);
});



export default Example;
