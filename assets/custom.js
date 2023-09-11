window.addEventListener('load', function() {
    const currentState = history.state;
    if(currentState !== null){
        let gridItem = document.querySelectorAll(`.grid-item__link[data-productHandle="${currentState.path}"]`);
        gridItem.forEach((productCard) => {
            console.log(productCard)
            productCard.scrollIntoView({behavior: "smooth"});
        });   
    }
})

document.querySelectorAll('.grid-item-link').forEach((productCards) => {
    productCards.addEventListener('click', (event) => {
        let $this = event.currentTarget,
            historyPath = $this.dataset.producthandle;
        window.history.replaceState({path: historyPath}, '', '')
    });
});