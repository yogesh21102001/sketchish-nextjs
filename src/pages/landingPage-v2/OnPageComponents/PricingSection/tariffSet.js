const tariffSet = [
    {
        sort: 0,
        name: 'basic',
        price: 0,
        perIconCost: 0,
        features: [
            '15 pro SVG static + 2 pro animated icons',
            'Access to free emojis',
            'Attribution required',
            'Ads',
        ],
        discount: 0,
        mod: 'light'
    },
    {
        sort: 1,
        name: 'advance',
        price: 40,
        priceYearly: 30,
        perIconCost: 0.20,
        perIconCostYearly: 0.15,
        features: [
            '100 pro + animated svg icons /mo.',
            'Access to pro emojis',
            'Royalty—free assets',
            'No ads',
        ],
        discount: 50,
        mod: 'dark'
    },
    {
        sort: 2,
        name: 'pro',
        price: 30,
        priceYearly: 25,
        perIconCost: 0.30,
        perIconCostYearly: 0.25,
        features: [
            '50 pro icons + animated svg /mo.',
            'Access to pro emojis',
            'Royalty—free assets',
            'No ads',
        ],
        discount: 50,
        mod: 'light'
    },
]

export default tariffSet