function motivationPage(){
    const quote = document.querySelector('.quote > p');
    const author = document.querySelector('.quote-author > h3 > span')
    const refreshBtn = document.querySelector('.quote-author > button')
    const motivationSection = document.querySelector('.motivation');

    async function fetchQuote(){
        const rawData = await fetch(`https://motivational-spark-api.vercel.app/api/quotes/random`);
        const data  = await rawData.json();

        return data;
    }

    async function showQuote(){
        const newQuote = await fetchQuote();
        quote.textContent = newQuote.quote;
        author.textContent = newQuote.author;
    }

    motivationSection.addEventListener('click' , ()=>{
        showQuote();    
    })

    refreshBtn.addEventListener('click' , ()=>{
        showQuote();    
    })

    showQuote()
}

motivationPage();