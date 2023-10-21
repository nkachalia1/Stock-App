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

    const handletickerSubmit = (e) => {
        e.preventDefault();
        const tickerInput = document.querySelector(".ticker-input");
        const dateInput = document.querySelector(".date-input");
        const investmentInput = document.querySelector(".investment-input");
        let stockTicker = tickerInput.value;
        let selectedDate = dateInput.value;
        let investmentAmount = parseFloat(investmentInput.value);
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

            // Add circles for data points
            svg.selectAll('.dot')
            .data(info)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(d.date) + x.bandwidth() / 2)
            .attr('cy', d => y(d.price))
            .attr('r', 5)
            .on('mouseover', function(event, d) {
                // Access the data properties directly
                const price = d.price;
                // Show y-value on mouseover
                const tooltip = d3.select('#tooltip');
                tooltip.transition().duration(200).style('opacity', 0.9);
                tooltip.html(`Price: $${price.toFixed(2)}`)
                    .style('left', event.pageX + 'px')
                    .style('top', event.pageY - 28 + 'px');
            })
            .on('mouseout', function() {
                // Hide tooltip on mouseout
                d3.select('#tooltip').transition().duration(500).style('opacity', 0);
            });

            //Add circles for buy points
            svg.selectAll('.buy-circle')
                .data(buySellPoints)
                .enter().append('circle')
                .attr('class', 'buy-circle')
                .attr('cx', d => x(`Day ${d.buy.day + 1}`) + x.bandwidth() / 2) // Access the correct date from info array
                .attr('cy', d => y(closingPrices[d.buy.day]))
                .attr('r', 5)
                .style('fill', 'green')

            //Add circles for sell points
            svg.selectAll('.sell-circle')
                .data(buySellPoints)
                .enter().append('circle')
                .attr('class', 'sell-circle')
                .attr('cx', d => x(`Day ${d.sell.day + 1}`) + x.bandwidth() / 2) // Access the correct date from info array
                .attr('cy', d => y(closingPrices[d.sell.day]))
                .attr('r', 5)
                .style('fill', 'red')

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

    };

    const listSubmitButton = document.querySelector(".ticker-submit");
    listSubmitButton.addEventListener("click", handletickerSubmit);
});
