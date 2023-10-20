// document.addEventListener("DOMContentLoaded", () => {
//     const main = document.getElementById("main");
//     new Example(main);
// })

document.addEventListener("DOMContentLoaded", () => {

    // let stockTicker = "";

    const handletickerSubmit = (e) => {

        let stockTicker = "MSFT";
        fetch(`https://api.stockdata.org/v1/data/quote?symbols=${stockTicker}&api_token=X52Nf4JHwEFtnmWs4BaNWYfUk9WYvVBHqBe6dPG9`)
        .then(response => response.json())
        .then(data => {
            // Do something with the retrieved data
            document.getElementById('data-container').textContent = JSON.stringify(data);
            // document.getElementById('data-container').textContent = data.day_high;
            // const dayHighAAPL = data['day_high'];
            // Log the day_high values to the console
            // console.log('AAPL Day High:');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    //     const tickerInput = document.querySelector(".ticker-input");
    //     stockTicker = tickerInput.value;
    //     fetch(`https://api.stockdata.org/v1/data/quote?symbols=MSFT&api_token=X52Nf4JHwEFtnmWs4BaNWYfUk9WYvVBHqBe6dPG9`)
    //     .then(response => {
    //         debugger;
    //         return response.json()})
    //     .then(data => {
        //         // Do something with the retrieved data
        //         document.getElementById('data-container').textContent = JSON.stringify(data);
    //         // document.getElementById('data-container').textContent = data.day_high;
    //         // const dayHighAAPL = data['day_high'];
    //         // Log the day_high values to the console
    //         // console.log('AAPL Day High:');
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    //     // tickerInput.value = "";
      };

      const listSubmitButton = document.querySelector(".ticker-submit");
      listSubmitButton.addEventListener("click", handletickerSubmit);
});









// export default Example;
