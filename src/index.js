document.addEventListener("DOMContentLoaded", () => {
    let selectedDate;
    let investmentAmount;
    let currentDate = new Date().toISOString().split('T')[0];
    const stockButtons = document.querySelectorAll(".button-container button");
    stockButtons.forEach(button => {
        button.classList.add("hide"); // Initially hide all stock buttons
    });

    createGraph("GOOGL", "2023-01-01", currentDate, 5000);

    // createEmptyGraph();

    // function createEmptyGraph() {
    //     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    //     const width = 600 - margin.left - margin.right;
    //     const height = 400 - margin.top - margin.bottom;

    //     const svg = d3.select('#chart-container')
    //         .append('svg')
    //         .attr('width', width + margin.left + margin.right)
    //         .attr('height', height + margin.top + margin.bottom)
    //         .append('g')
    //         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //     // Define X and Y scales
    //     const xScale = d3.scaleBand().range([0, width]).padding(0.1);
    //     const yScale = d3.scaleLinear().range([height, 0]);

    //     // Add X and Y axis elements
    //     const xAxis = d3.axisBottom(xScale);
    //     const yAxis = d3.axisLeft(yScale);

    //     // Append X and Y axes to the graph
    //     svg.append('g')
    //         .attr('class', 'x-axis')
    //         .attr('transform', 'translate(0,' + height + ')')
    //         .call(xAxis);

    //     svg.append('g')
    //         .attr('class', 'y-axis')
    //         .call(yAxis);

    //     // Add labels for X and Y axes (if needed)
    //     svg.append('text')
    //         .attr('transform', 'translate(' + (width / 2) + ' ,' + (height + margin.top + 20) + ')')
    //         .style('text-anchor', 'middle')
    //         .text('Date');

    //     svg.append('text')
    //         .attr('transform', 'rotate(-90)')
    //         .attr('y', 0 - margin.left)
    //         .attr('x', 0 - (height / 2))
    //         .attr('dy', '1em')
    //         .style('text-anchor', 'middle')
    //         .text('Price ($)');

    //     const svgElements = document.querySelectorAll("svg");

    //     // Iterate over each SVG element and set the height
    //     svgElements.forEach(svgElement => {
    //         svgElement.style.height = "500px";
    //     });
    // }




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

    function removeExistingGraph() {
        const existingGraph = document.querySelector('#chart-container svg');
        if (existingGraph) {
            existingGraph.remove();
        }
    }

    function createGraph(stockTicker, selectedDate, currentDate, investmentAmount) {
        // const existingGraph = document.querySelector('#chart-container svg:nth-child(2)');
        // const svg = d3.select('#chart-container svg');
        // svg.selectAll('*').remove();
        // if (existingGraph) {
        //     existingGraph.remove();
        // }

        removeExistingGraph();

        fetch(`http://api.marketstack.com/v1/eod?access_key=a102fb3f246cfc748eabb0cbafd35e2b&symbols=${stockTicker}&date_from=${selectedDate}&date_to=${currentDate}`)
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
                .text(stockTicker);

            const line = d3.line()
                .x(d => x(d.date) + x.bandwidth() / 2) // Position the line in the middle of the band
                .y(d => y(d.price))
                .curve(d3.curveBasis); // Use curveMonotoneX for smooth interpolation

                svg.append('path')
                .datum(dates_prices)
                .attr('class', 'line')
                .attr('d', line)
                .attr('stroke', 'steelblue') // Set line color
                .attr('stroke-width', 3)      // Set line width
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

                const bisect = d3.bisector(d => d.date).left; // Create a bisector to find the closest data point

                svg.select('.line')
                .on('mousemove', function (event) {
                    const [mouseX, mouseY] = d3.pointer(event);
                    const index = bisect(dates_prices, mouseX - margin.left, 1);
                    const closestDataPoint = dates_prices[index];

                    const tooltip = d3.select('#tooltip');
                    const offsetX = 400;
                    const offsetY = 140;

                    tooltip.style('left', mouseX + offsetX + 'px')
                        .style('top', mouseY + offsetY + 'px')
                        .style('opacity', 1)
                        .html(`Price: $${closestDataPoint.price.toFixed(2)}`);
                })
                .on('mouseout', function () {
                    d3.select('#tooltip').style('opacity', 0);
                });

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
            // svg.selectAll('.dot')
            // .data(dates_prices)
            // .enter().append('circle')
            // .attr('class', 'dot')
            // .attr('cx', d => x(d.date) + x.bandwidth() / 2)
            // .attr('cy', d => y(d.price))
            // .attr('r', 0)  // Initial radius set to 0
            // .transition()
            // .delay(function(d, i) {
            //     return i * 100;  // Add delay based on index to transition circles chronologically
            // })
            // .duration(500)  // Transition duration in milliseconds
            // .attr('r', 5)  // Final radius set to 5;
            // .on('mouseover', function(d) {
            //     const mousePrice = d.price;
            //     const tooltip = d3.select('#tooltip');
            //     tooltip.transition().duration(200).style('opacity', 0.9);
            //     tooltip.html(`Price: $${mousePrice}`)
            //         .style('left', d3.event.pageX + 'px')  // Use d3.event.pageX instead of event.pageX
            //         .style('top', d3.event.pageY - 28 + 'px');  // Use d3.event.pageY instead of event.pageY
            // })

            // .on('mouseout', function() {
            //     // Hide tooltip on mouseout
            //     d3.select('#tooltip').transition().duration(500).style('opacity', 0);
            // });

            const svgElements = document.querySelectorAll("svg");

            // Iterate over each SVG element and set the height
            svgElements.forEach(svgElement => {
                svgElement.style.height = height + margin.top + margin.bottom + 'px'; // Set the height including top and bottom margins
            });

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
