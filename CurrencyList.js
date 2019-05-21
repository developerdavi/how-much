var CurrencyList = [
    {
        name: 'Bitcoin',
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        value: async () => {
            let val = 0
            await fetch(this.url, (response) => {
                val = response
            })
            return val
        }
    },
    {
        name: 'Dollar',
        url: ''
    }
]

export default CurrencyList