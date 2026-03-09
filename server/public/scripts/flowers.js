
let allGifts = [] 

const loadGifts = async () => {
    const response = await fetch('/flowers')
    allGifts = await response.json()
    renderGifts(allGifts)
}

const filterGifts = (searchTerm) => {
    if (!searchTerm.trim()) {
        return allGifts 
    }
    
    const term = searchTerm.toLowerCase()
    return allGifts.filter(gift => 
        gift.name?.toLowerCase().includes(term) ||
        gift.audience?.toLowerCase().includes(term) ||
        gift.description?.toLowerCase().includes(term) ||
        gift.pricePoint?.toLowerCase().includes(term)
    )
}

const renderGifts = (gifts) => {

    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    if (gifts && gifts.length > 0) {

        gifts.forEach(gift => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            topContainer.style.backgroundImage = `url(${gift.image})`

            const name = document.createElement('h3')
            name.textContent = gift.name
            bottomContainer.appendChild(name)

            const pricePoint = document.createElement('p')
            pricePoint.textContent = 'Price: ' + gift.pricePoint
            bottomContainer.appendChild(pricePoint)

            const audience = document.createElement('p')
            audience.textContent = 'Great For: ' + gift.audience
            bottomContainer.appendChild(audience)

            const link = document.createElement('a')
            link.textContent = 'Read More >'
            link.href = `/flowers/${gift.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer)
            mainContent.appendChild(card)
        })
    } else {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        mainContent.appendChild(message)
    }
}

// determine whether we're on the home route or a subpath
const requestedURL = window.location.href.split('/').pop()

if (requestedURL) {
    // user navigated to something like /flowers/… directly on client
    window.location.href = '../404.html'
} else {
    loadGifts()
    
    // Add search functionality
    const searchInput = document.getElementById('search-input')
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value
            const filteredGifts = filterGifts(searchTerm)
            renderGifts(filteredGifts)
        })
    }
}
