(async() => {
    const filterBtn = document.querySelector('#filter');
    const productsByGame = document.querySelector('#productsByGame');
    const from = document.querySelector('#from');
    const to = document.querySelector('#to');
    const total = document.querySelector('#total');
    const average = document.querySelector('#average');
    const bestSellers = document.querySelector('#bestSellers');
    const host = document.querySelector('#host');
    const errorParagraph = document.querySelector('#error-paragraph');
    const medianGraphContainer = document.querySelector('#median-graph-container')
    const canvas = document.createElement('canvas');
    let partialTotals = 0,
        minSale = 0,
        maxSale = 0
    let gameProduct = [],
        gameCounters={}
    let ownerProduct=[],
        ownerCounters={}
    let response = await fetch(
        `${host.value}/admin/data?from=${from.value}&to=${to.value}`
    );
    let data = await response.json();
    data.sales.forEach((sale) => {
        partialTotals += sale.total;
        if (minSale === 0 || sale.total < minSale) {
            minSale = sale.total;
        }
        if (maxSale === 0 || sale.total > maxSale) {
            maxSale = sale.total;
        }
        sale.products.forEach(product=>{
            if (!gameProduct.includes(product.game)) {
                gameProduct=[...gameProduct,product.game]
                gameCounters[`${product.game}`]=1
            }else{
                gameCounters[`${product.game}`]+=1
            }
        })
        sale.sellers.forEach(seller=>{
            if(!ownerProduct.includes(seller.username)){
                ownerProduct=[...ownerProduct,seller.username]
                ownerCounters[`${seller.username}`]=1
            }else{
                ownerCounters[`${seller.username}`]+=1
            }
        })
    });
    average.innerHTML = `${(maxSale + minSale) / 2} USD`;
    total.innerHTML = `${partialTotals} USD`;
    let productsByGameChart = new Chart(productsByGame, {
        type: 'pie',
        data: {
            labels: gameProduct,
            datasets: [
                {
                    label: '# de ventas por juego',
                    data:Object.values(gameCounters) ,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color:'#ffffff',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
    let mostSellers = new Chart(bestSellers, {
        type: 'pie',
        data: {
            labels: ownerProduct,
            datasets: [
                {
                    label: 'vendedor destacado',
                    data:Object.values(ownerCounters),
                    borderWidth: 1,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color:'#ffffff',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
    canvas.className='col-8 mh-75'
    canvas.id ='median-graph'
    let medianGraph = new Chart(canvas,{
        data:{
            labels: [],
            datasets:[{
                type:'line',
                label:'Mediana Ventas Por Mes',
                data:[],
                borderColor:'#ffffff'
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color:'#ffffff',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales:{
                y:{
                    ticks:{
                        color:'#ffffff',
                    },
                    grid:{
                        color:'rgba(255,255,255,0.2)'
                    }
                },
                x:{
                    ticks:{
                        color:'#ffffff',
                        align:'start'
                    },
                    grid:{
                        color:'rgba(255,255,255,0.2)'
                    }
                }
            }
        }
    })
    filterBtn.addEventListener('click', async () => {
        let partialTotals = 0,
        minSale = 0,
        maxSale = 0,
        ownerProduct=[],
        ownerCounters={},
        gameProduct=[],
        gameCounters={}
        if (from.value === '' && to.value === '') {
            errorParagraph.innerHTML='Por favor seleccione fechas validas'
            return
        }
        const fromDate = new Date(from.value).valueOf()
        const toDate = new Date(to.value).valueOf()
        const differenceDate = toDate - fromDate
        if (differenceDate > 15778800000 || differenceDate <0){
            errorParagraph.innerHTML = 'La diferencia maxima entre las fechas es de 6 meses'
            return;
        }
        errorParagraph.innerHTML = ''
        response = await fetch(
            `${host.value}/admin/data?from=${from.value}&to=${to.value}`
        );
        data = await response.json();
        data.sales.forEach((sale) => {
            partialTotals += sale.total;
            if (minSale === 0 || sale.total < minSale) {
                minSale = sale.total;
            }
            if (maxSale === 0 || sale.total > maxSale) {
                maxSale = sale.total;
            }
            sale.products.forEach(product=>{
                if (!gameProduct.includes(product.game)) {
                    gameProduct=[...gameProduct,product.game]
                    gameCounters[`${product.game}`]=1
                }else{
                    gameCounters[`${product.game}`]+=1
                }
            })
            sale.sellers.forEach(seller=>{
                if(!ownerProduct.includes(seller.username)){
                    ownerProduct=[...ownerProduct,seller.username]
                    ownerCounters[`${seller.username}`]=1
                }else{
                    ownerCounters[`${seller.username}`]+=1
                }
            })
        });
        dataPerMonth =[]
        Object.values(data.perMonth).forEach(month=>{
            let salesSortedByTotal = month.sort((a,b)=>b.sale.total - a.sale.total)
            dataPerMonth = [...dataPerMonth, (salesSortedByTotal[0].sale.total+salesSortedByTotal[salesSortedByTotal.length-1].sale.total)/2]
            salesSortedByTotal=[]
        })
        average.innerHTML = `${(maxSale + minSale) / 2} USD`;
        total.innerHTML = `${partialTotals} USD`;
        productsByGameChart.data.labels = gameProduct;
        productsByGameChart.data.datasets[0].data = Object.values(gameCounters)
        mostSellers.data.labels = ownerProduct;
        mostSellers.data.datasets[0].data = Object.values(ownerCounters)
        medianGraph.data.labels=Object.keys(data.perMonth)
        medianGraph.data.datasets[0].data = dataPerMonth
        if (Object.keys(data.perMonth).length !== 1) {
            medianGraphContainer.appendChild(canvas)
        }else{
            if (document.getElementById('median-graph')) {
                medianGraphContainer.removeChild(canvas)
            }
        }
        productsByGameChart.update();
        mostSellers.update();
        medianGraph.update();
    });
})();
