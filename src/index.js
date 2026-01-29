document.addEventListener("DOMContentLoaded", () => {
    let selectedDate;
    let investmentAmount;
    let currentDate = new Date().toISOString().split('T')[0];
    const stockButtons = document.querySelectorAll(".button-container button");
    stockButtons.forEach(button => {
        button.classList.add("hide"); // Initially hide all stock buttons
    });

    createGraph("GOOGL", "2023-01-01", currentDate, 5000);

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var closeBtn = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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

    let final_num_shares;
    const calculateInvestedProfit = (investmentAmount, buySellPoints) => {
        let grossRevenueFromInvestment = investmentAmount;
        final_num_shares = 0;
        let netProfit;
        for (let a=0; a<buySellPoints.length; a++) {
            final_num_shares = grossRevenueFromInvestment/buySellPoints[a].buy.price;
            grossRevenueFromInvestment = final_num_shares*buySellPoints[a].sell.price;
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

    function removeExistingGraph() {
        const existingGraph = document.querySelector('#chart-container svg');
        if (existingGraph) {
            existingGraph.remove();
        }
    }

    function createGraph(stockTicker, selectedDate, currentDate, investmentAmount) {
        removeExistingGraph();
        removeExistingGraph();

        // fetch(`https://api.stockdata.org/v1/data/eod?symbols=${stockTicker}&api_token=Bc9kdoAsBS9RinZk1vqXCzh5owpQenRGf4UrSJl6&date_from=${selectedDate}&date_to=${currentDate}`)
        fetch(`https://api.marketstack.com/v1/eod?access_key=a102fb3f246cfc748eabb0cbafd35e2b&symbols=${stockTicker}&date_from=${selectedDate}&date_to=${currentDate}`)
        .then(response => response.json())
        .then(data => {
            const closingPrices = data.data.map(day => day.close);
            const dates = data.data.map(date => date.date.slice(0,10));
            const maxPrice = Math.max(...closingPrices);
            const adjustedMaxPrice = maxPrice * 1.35;
            const minPrice = Math.min(...closingPrices);

            const margin = { top: 60, right: 20, bottom: 50, left: 50 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;
            const buySellPoints = findBuySellPoints(closingPrices);

            const svg = d3.select('#chart-container')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


            const parseDate = d3.timeParse('%Y-%m-%d');

            const x = d3.scaleBand().range([0, width]).padding(0.1);
            const y = d3.scaleLinear().domain([0, adjustedMaxPrice]).nice().range([height, 0]);

            const yPlot = d3.scaleLinear().domain([0, maxPrice]).range([height, 0]);

            // const info = closingPrices.map((price, index) => ({ date: `Day ${index + 1}`, price: price }));
            const dates_prices = dates.map((date, index) => ({ date: date, price: closingPrices[index] })).sort((a, b) => new Date(a.date) - new Date(b.date));
            x.domain(dates_prices.map(d => d.date));
            y.domain([0, adjustedMaxPrice]);

            svg.append('g')
            .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Price ($)");

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

            svg.append('text')
                .attr('x', width / 2)
                .attr('y', 0 - margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '18px')
                .style('font-weight', 'bold')
                .text(stockTicker.toUpperCase());

            const line = d3.line()
                .x(d => x(d.date) + x.bandwidth() / 2) // Position the line in the middle of the band
                .y(d => y(d.price))
                .curve(d3.curveBasis); // Use curveMonotoneX for smooth interpolation

                svg.append('path')
                .datum(dates_prices)
                .attr('class', 'line')
                .attr('d', line)
                .attr('stroke', 'steelblue') // Set line color
                .attr('stroke-width', 5)      // Set line width
                .attr('fill', 'none')
                .attr('stroke-dasharray', function() {
                    const totalLength = this.getTotalLength();
                    return totalLength + " " + totalLength;
                })
                .attr('stroke-dashoffset', function() {
                    return this.getTotalLength();
                })
                .transition()
                .duration(2000)  // Set transition duration in milliseconds
                .attr('stroke-dashoffset', 0);

                const bisect = d3.bisector(d => d.date).left;

                svg.select('.line')
                    .on('mousemove', function (event) {
                        const [mouseX, mouseY] = d3.pointer(event);
                        // Calculate the index of the closest band based on the mouse position
                        const index = Math.floor((mouseX - margin.left) / x.bandwidth());
                        // Ensure the index is within valid bounds
                        const validIndex = Math.max(0, Math.min(index, dates_prices.length - 1));
                        const closestDataPoint = dates_prices[validIndex];

                        const tooltip = d3.select('#tooltip');
                        const offsetX = 100;
                        const offsetY = 150;

                        tooltip.style('left', mouseX + offsetX + 'px')
                        .style('top', mouseY + offsetY + 'px')
                        .style('opacity', .8)
                        .style('box-shadow', '2px 2px 5px rgba(0, 0, 0, 0.5)')
                        .html(`Price: $${closestDataPoint.price.toFixed(2)}`)

                        tooltip.transition()
                        .duration(200)
                        .style('opacity', 1)
                    })

                    .on('mouseout', function(event, d) {
                        // Set a timeout to hide the tooltip after 1000 milliseconds (1 second)
                        tooltip.node().timeout = setTimeout(() => {
                            tooltip.transition()
                                .duration(200)
                                .style('opacity', 0); // Set final opacity after transition
                        }, 1000);
                    })

                    // .on('mouseout', function () {
                    //     d3.select('#tooltip').style('opacity', 0);
                    // });


            let reversed_buySellPoints = buySellPoints.reverse();
            // Create a transition for the buy circles after the line has been created
// Create a transition for the buy circles after the line has been created
svg.selectAll('.buy-circle')
    .data(reversed_buySellPoints)
    .enter().append('circle')
    .attr('class', 'buy-circle')
    .attr('r', 0) // Start with radius 0 for initial hidden state
    .attr('cx', d => x(dates[d.buy.day]))
    .attr('cy', d => y(closingPrices[d.buy.day]))
    .style('fill', '#359d2f')
    .transition() // Apply transition to circles
    .delay((d, i) => i * 70) // Delay each circle by 500 milliseconds times its index
    .duration(1000) // Transition duration 1000 milliseconds (or adjust as needed)
    .attr('r', 2); // End with radius 5 for visible state

// Create a transition for the sell circles after the buy circles transition is completed
svg.selectAll('.sell-circle')
    .data(reversed_buySellPoints)
    .enter().append('circle')
    .attr('class', 'sell-circle')
    .attr('r', 0) // Start with radius 0 for initial hidden state
    .attr('cx', d => x(dates[d.sell.day]))
    .attr('cy', d => y(closingPrices[d.sell.day]))
    .style('fill', 'red')
    .transition() // Apply transition to circles
    .delay((d, i) => i * 70) // Delay each circle by 500 milliseconds times its index
    .duration(1000) // Transition duration 1000 milliseconds (or adjust as needed)
    .attr('r', 2); // End with radius 5 for visible state
            const svgElements = document.querySelectorAll("svg");

            // Iterate over each SVG element and set the height
            svgElements.forEach(svgElement => {
                svgElement.style.height = height + margin.top + margin.bottom + 'px'; // Set the height including top and bottom margins
            });

            //Display max and min prices in the browser
            const maxPriceElement = document.getElementById('max-price');
            const minPriceElement = document.getElementById('min-price');
            // maxPriceElement.textContent = `Maximum Price: $${maxPrice}`;
            // minPriceElement.textContent = `Minimum Price: $${minPrice}`;

            //Display multiple buy and sell points in the browser
            const buySellPointsElement = document.getElementById('buy-sell-points');
            // buySellPointsElement.textContent = `Buy and Sell Points:\n`;
            buySellPoints.forEach(({ buy, sell }) => {
                // buySellPointsElement.textContent += `Buy at Day ${buy.day + 1} ($${buy.price.toFixed(2)})\nSell at Day ${sell.day + 1} ($${sell.price.toFixed(2)})\n\n`;
            });


            //Calculate and display net profit
            const profitElement = document.getElementById('profit');
            // profitElement.textContent = "Net Profit: ";
            const netProfit = calculateInvestedProfit(investmentAmount, buySellPoints);
            // profitElement.textContent += `$${netProfit.toFixed(2)}`;

            let currentProfit = 0;
            let profitArray = [];
            for (let i = 0; i < buySellPoints.length; i++) {
                // grossRevenueFromInvestment = (grossRevenueFromInvestment / buySellPoints[i].buy.price) * buySellPoints[i].sell.price;
                // grossRevenues.push(grossRevenueFromInvestment);
                currentProfit += buySellPoints[i].sell.price - buySellPoints[i].buy.price;
                profitArray.push(currentProfit);
                profitArray[i] *= final_num_shares;

            }

            const formattedDates = [];

            for (let i = 0; i < buySellPoints.length; i++) {
                // const buyDate = dates_prices[buySellPoints[i].buy.day - 1].date;
                const buyDate = dates_prices[buySellPoints[i].buy.day].date;
                // const sellDate = dates_prices[buySellPoints[i].sell.day - 1].date;
                const sellDate = dates_prices[buySellPoints[i].sell.day].date;
                formattedDates.push(`Buy: ${buyDate}, Sell: ${sellDate}`);

            }

            // Set the dimensions of the canvas
            var bpmargin = { top: 60, right: 20, bottom: 50, left: 50 };
            var bpwidth = 600 - bpmargin.left - bpmargin.right;
            var bpheight = 400 - bpmargin.top - bpmargin.bottom;

            // Create an SVG element and append it to the body
            var bpsvg = d3.select("#chart-container")
            .append("svg")
            .style("overflow", "visible")
            .attr("width", bpwidth + bpmargin.left + bpmargin.right)
            .attr("height", bpheight + bpmargin.top + bpmargin.bottom)
            .append("g")
            .attr("transform", "translate(" + bpmargin.left + "," + bpmargin.top + ")");

            // Create x and y scales
            var bpx = d3.scaleBand()
            .domain(d3.range(profitArray.length))
            .range([0, width])
            .padding(0.1);

            var bpy = d3.scaleLinear()
            .domain([0, d3.max(profitArray)])
            .nice()
            .range([height, 0]);

            // Create bars
            bpsvg.selectAll(".bar")
            .data(profitArray)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("class", "bar bar-transition")
            .attr("data-index", function(d, i) { return i; }) // Set data-index attribute
            .attr("x", function(d, i) { return bpx(i); })
            .attr("width", bpx.bandwidth())
            .attr("y", function(d) { return bpy(d); })
            .attr("height", function(d) { return height - bpy(d); })
            .on('mouseover', function(event) {
                const index = d3.select(this).attr('data-index');
                const tooltip = d3.select('#tooltip');
                tooltip.transition().duration(200).style('opacity', 0.8);
                tooltip.html(`Trade Dates: ${formattedDates[index]}`)
                    .style('left', event.pageX + 'px')
                    .style('top', event.pageY - 28 + 'px');
            })
            .on('mouseout', function() {
                d3.select('#tooltip').transition().duration(500).style('opacity', 0);
            });

            // Apply transition effect only to bars with the class 'bar-transition'
            bpsvg.selectAll(".bar-transition")
            .transition() // Apply transition effect
            .duration(1000) // Set the duration of the transition in milliseconds
            .attr("y", function(d) { return bpy(d); })
            .attr("height", function(d) { return height - bpy(d); });


            // Create x-axis
            bpsvg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(bpx).tickSize(0).tickFormat(""));


            // Create y-axis
            bpsvg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(bpy))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - bpmargin.left)
            .attr("x", 0 - (bpheight / 2))
            .attr("dy", ".5em")
            .style("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", "16px")
            .text("Accumulated Profit ($)");

            bpsvg.append('text')
            .attr('x', width / 2)
            .attr('y', 0 - margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('font-weight', 'bold')
            .text("Net Accumulated Profit");
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
