document.addEventListener("DOMContentLoaded", () => {

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
            buySellPoints.push([buy, sell]);
        }

        return buySellPoints;


    };

    const handletickerSubmit = (e) => {
        e.preventDefault();
        const tickerInput = document.querySelector(".ticker-input");
        const dateInput = document.querySelector(".date-input");
        let stockTicker = tickerInput.value;
        let selectedDate = dateInput.value;
        const currentDate = new Date().toISOString().split('T')[0];

        fetch(`http://api.marketstack.com/v1/eod?access_key=f45d23e96f5b1cceed74bcf23257fdac&symbols=${stockTicker}&date_from=${selectedDate}&date_to=${currentDate}`)
        .then(response => response.json())
        .then(data => {
            const closingPrices = data.data.map(day => day.close);
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

            const info = closingPrices.map((price, index) => ({ date: `Day ${index + 1}`, price: price }));

            x.domain(info.map(d => d.date));
            y.domain([0, d3.max(info, d => d.price)]);

            svg.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x));

            svg.append('g')
                .call(d3.axisLeft(y));

            const line = d3.line()
                .x(d => x(d.date) + x.bandwidth() / 2) // Position the line in the middle of the band
                .y(d => y(d.price));

            svg.append('path')
                .datum(info)
                .attr('class', 'line')
                .attr('d', line);

            svg.selectAll('.dot')
                .data(info)
                .enter().append('circle')
                .attr('class', 'dot')
                .attr('cx', d => x(d.date) + x.bandwidth() / 2) // Position the dot in the middle of the band
                .attr('cy', d => y(d.price))
                .attr('r', 5);

            svg.selectAll('.dot')
                .data(info)
                .enter().append('circle')
                .attr('class', 'dot')
                .attr('cx', d => x(d.date) + x.bandwidth() / 2)
                .attr('cy', d => y(d.price))
                .attr('r', 5)
                .on('mouseover', function(d) {
                    // Show y-value on mouseover
                    const tooltip = d3.select('#tooltip');
                    tooltip.transition().duration(200).style('opacity', 0.9);
                    tooltip.html(`Price: ${d.price}`)
                        .style('left', (d3.event.pageX) + 'px') // position tooltip relative to the page
                        .style('top', (d3.event.pageY - 28) + 'px'); // position tooltip slightly above the cursor
                })
                .on('mouseout', function() {
                    // Hide tooltip on mouseout
                    const tooltip = d3.select('#tooltip');
                    tooltip.transition().duration(500).style('opacity', 0);
                });

            //Add circles for buy points
            svg.selectAll('.buy-circle')
                .data(buySellPoints)
                .enter().append('circle')
                .attr('class', 'buy-circle')
                .attr('cx', d => x(`Day ${d[0] + 1}`) + x.bandwidth() / 2) // Access the correct date from info array
                .attr('cy', d => y(closingPrices[d[0]]))
                .attr('r', 5)
                .style('fill', 'green')
                .on('mouseover', function() {
                    // Show "Buy" tooltip on mouseover
                    // ... (tooltip logic)
                })
                .on('mouseout', function() {
                    // Hide tooltip on mouseout
                    // ... (tooltip logic)
                });

            //Add circles for sell points
            svg.selectAll('.sell-circle')
                .data(buySellPoints)
                .enter().append('circle')
                .attr('class', 'sell-circle')
                .attr('cx', d => x(`Day ${d[1] + 1}`) + x.bandwidth() / 2) // Access the correct date from info array
                .attr('cy', d => y(closingPrices[d[1]]))
                .attr('r', 5)
                .style('fill', 'red')
                .on('mouseover', function() {
                    // Show "Sell" tooltip on mouseover
                    // ... (tooltip logic)
                })
                .on('mouseout', function() {
                    // Hide tooltip on mouseout
                    // ... (tooltip logic)
                });

            //Display max and min prices in the browser
            const maxPriceElement = document.getElementById('max-price');
            const minPriceElement = document.getElementById('min-price');
            maxPriceElement.textContent = `Maximum Price: $${maxPrice}`;
            minPriceElement.textContent = `Minimum Price: $${minPrice}`;

            //Display multiple buy and sell points in the browser
            const buySellPointsElement = document.getElementById('buy-sell-points');
            buySellPointsElement.textContent = "Buy and Sell Points:\n";
            buySellPoints.forEach(([buy, sell]) => {
            buySellPointsElement.textContent += `Buy at Day ${buy + 1} and sell at Day ${sell + 1}\n`;
            });

            //Calculate and display total profit
            const profitElement = document.getElementById('profit');
            profitElement.textContent = "Total Profit: ";
            let totalProfit = 0;
            buySellPoints.forEach(([buy, sell]) => {
                const buyPrice = closingPrices[buy];
                const sellPrice = closingPrices[sell];
                const profit = sellPrice - buyPrice;
                totalProfit += profit;
            });

            // Append the new value
            profitElement.textContent += `$${totalProfit.toFixed(2)}`;

        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const listSubmitButton = document.querySelector(".ticker-submit");
    listSubmitButton.addEventListener("click", handletickerSubmit);
});
