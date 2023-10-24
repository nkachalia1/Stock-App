document.addEventListener("DOMContentLoaded", () => {
    let selectedDate;
    let investmentAmount;
    let currentDate;
    const stockButtons = document.querySelectorAll(".button-container button");
    stockButtons.forEach(button => {
        button.classList.add("hide"); // Initially hide all stock buttons
    });

    const findBuySellPoints = (prices) => {
        let n = prices.length;
        let buySellPoints = [];

        let i = 0;
        while (i < n - 1) {
            // Find local minima as potential buy point
            while (i < n - 1 && prices[i] >= prices[i + 1]) {
                i++;
            }

            if (i === n - 1) {
                break;
            }

            let buy = i;

            // Find local maxima as potential sell point
            while (i < n - 1 && prices[i] <= prices[i + 1]) {
                i++;
            }

            let sell = i;

            // Add buy and sell points to the result array
            buySellPoints.push({ buy: { day: buy, price: prices[buy] }, sell: { day: sell, price: prices[sell] } });
        }

        return buySellPoints;

    };

    const calculateInvestedProfit = (investmentAmount, buySellPoints) => {
        let grossRevenueFromInvestment = investmentAmount;
        let numShares = 0;
        let netProfit;
        for (let a=0; a<buySellPoints.length; a++) {
            numShares = grossRevenueFromInvestment/buySellPoints[a].buy.price;
            grossRevenueFromInvestment = numShares*buySellPoints[a].sell.price;
        }

        netProfit = grossRevenueFromInvestment - investmentAmount;
        return netProfit;
    }

    var appleStock = document.getElementById("apple");
    appleStock.addEventListener("click", function() {
        createGraph("AAPL", selectedDate, currentDate, investmentAmount);
    });

    var msftStock = document.getElementById("microsoft");
    msftStock.addEventListener("click", function() {
        createGraph("MSFT", selectedDate, currentDate, investmentAmount);
    });

    var pltrStock = document.getElementById("palantir");
    pltrStock.addEventListener("click", function() {
        createGraph("PLTR", selectedDate, currentDate, investmentAmount);
    });

    var tslaStock = document.getElementById("tesla");
    tslaStock.addEventListener("click", function() {
        createGraph("TSLA", selectedDate, currentDate, investmentAmount);
    });

    function createGraph(stockTicker, selectedDate, currentDate, investmentAmount) {
        const existingGraph = document.querySelector('#chart-container svg:nth-child(2)');
        if (existingGraph) {
            existingGraph.remove();
        }

        fetch(`http://api.marketstack.com/v1/eod?access_key=f45d23e96f5b1cceed74bcf23257fdac&symbols=${stockTicker}&date_from=${selectedDate}&date_to=${currentDate}`)
        .then(response => response.json())
        .then(data => {
            const closingPrices = data.data.map(day => day.close);
            const dates = data.data.map(date => date.date.slice(0,10));
            const maxPrice = Math.max(...closingPrices);
            const minPrice = Math.min(...closingPrices);

            const margin = { top: 20, right: 20, bottom: 30, left: 50 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;
            const buySellPoints = findBuySellPoints(closingPrices);

            //Build the line graph
            const svg = d3.select('#chart-container')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            const parseDate = d3.timeParse('%Y-%m-%d');

            const x = d3.scaleBand().range([0, width]).padding(0.1);
            const y = d3.scaleLinear().range([height, 0]);

            // const info = closingPrices.map((price, index) => ({ date: `Day ${index + 1}`, price: price }));
            const dates_prices = dates.map((date, index) => ({ date: date, price: closingPrices[index] }));
            x.domain(dates_prices.map(d => d.date));
            y.domain([0, d3.max(dates_prices, d => d.price)]);

            svg.append('g')
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Price ($)");

            // Inside your createGraph function
            // Inside your createGraph function
            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x))
                .selectAll('.tick text') // Select all x-axis text elements
                .attr('class', 'x-axis-label')
                .attr('transform', function(d, i) {
                    if (x.domain().length > 15) {
                        // If there are more than 15 dates, display only the first and last labels
                        if (i === 0 || i === x.domain().length - 1) {
                            return 'rotate(-45)';
                        } else {
                            // Hide other labels by making them transparent and setting text-anchor to middle
                            return 'rotate(0)';
                        }
                    } else {
                        // If there are 15 or fewer dates, rotate all labels
                        return 'rotate(-45)';
                    }
                })
                .style('text-anchor', function(d, i) {
                    // Align the rotated text to the end for first and last labels; middle for others
                    if (x.domain().length > 15) {
                        if (i === 0 || i === x.domain().length - 1) {
                            return 'end';
                        } else {
                            return 'middle';
                        }
                    } else {
                        return 'end';
                    }
                })
                .style('fill-opacity', function(d, i) {
                    // Set fill-opacity to 0 for labels that should be hidden
                    if (x.domain().length > 15) {
                        if (i === 0 || i === x.domain().length - 1) {
                            return 1; // Show first and last labels
                        } else {
                            return 0; // Hide other labels
                        }
                    } else {
                        return 1; // Show all labels if there are 15 or fewer dates
                    }
                });

            const line = d3.line()
                .x(d => x(d.date) + x.bandwidth() / 2) // Position the line in the middle of the band
                .y(d => y(d.price));

            svg.append('path')
                .datum(dates_prices)
                .attr('class', 'line')
                .attr('d', line);

            //Add circles for buy points
            // svg.selectAll('.buy-circle')
            //     .data(buySellPoints)
            //     .enter().append('circle')
            //     .attr('class', 'buy-circle')
            //     .attr('cx', d => x(`Day ${d.buy.day + 1}`) + x.bandwidth() / 2) // Access the correct date from info array
            //     .attr('cy', d => y(closingPrices[d.buy.day]))
            //     .attr('r', 5)
            //     .style('fill', 'green')

            //Add circles for sell points
            // svg.selectAll('.sell-circle')
            //     .data(buySellPoints)
            //     .enter().append('circle')
            //     .attr('class', 'sell-circle')
            //     .attr('cx', d => x(`Day ${d.sell.day + 1}`) + x.bandwidth() / 2) // Access the correct date from info array
            //     .attr('cy', d => y(closingPrices[d.sell.day]))
            //     .attr('r', 5)
            //     .style('fill', 'red')

            // Add circles for data points
            svg.selectAll('.dot')
            .data(dates_prices)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(d.date) + x.bandwidth() / 2)
            .attr('cy', d => y(d.price))
            .attr('r', 5)
            .on('mouseover', function(d) {
                const mousePrice = d.price;
                const tooltip = d3.select('#tooltip');
                tooltip.transition().duration(200).style('opacity', 0.9);
                tooltip.html(`Price: $${mousePrice}`)
                    .style('left', event.pageX + 'px')
                    .style('top', event.pageY - 28 + 'px');
            })
            .on('mouseout', function() {
                // Hide tooltip on mouseout
                d3.select('#tooltip').transition().duration(500).style('opacity', 0);
            });

            document.querySelectorAll("svg").style.height="500px";

            //Display max and min prices in the browser
            const maxPriceElement = document.getElementById('max-price');
            const minPriceElement = document.getElementById('min-price');
            maxPriceElement.textContent = `Maximum Price: $${maxPrice}`;
            minPriceElement.textContent = `Minimum Price: $${minPrice}`;

            //Display multiple buy and sell points in the browser
            const buySellPointsElement = document.getElementById('buy-sell-points');
            buySellPointsElement.textContent = `Buy and Sell Points:\n`;
            buySellPoints.forEach(({ buy, sell }) => {
                buySellPointsElement.textContent += `Buy at Day ${buy.day + 1} ($${buy.price.toFixed(2)})\nSell at Day ${sell.day + 1} ($${sell.price.toFixed(2)})\n\n`;
            });


            //Calculate and display net profit
            const profitElement = document.getElementById('profit');
            profitElement.textContent = "Net Profit: ";
            const netProfit = calculateInvestedProfit(investmentAmount, buySellPoints);
            profitElement.textContent += `$${netProfit.toFixed(2)}`;

        })

        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handletickerSubmit = (e) => {
        e.preventDefault();
        stockButtons.forEach(button => {
            button.classList.remove("hide");
        });

        const tickerInput = document.querySelector(".ticker-input");
        const dateInput = document.querySelector(".date-input");
        const investmentInput = document.querySelector(".investment-input");
        let stockTicker = tickerInput.value;
        selectedDate = dateInput.value;
        investmentAmount = parseFloat(investmentInput.value);
        currentDate = new Date().toISOString().split('T')[0];

        createGraph(stockTicker, selectedDate, currentDate, investmentAmount);

    };

    const listSubmitButton = document.querySelector(".ticker-submit");
    listSubmitButton.addEventListener("click", handletickerSubmit);
});
