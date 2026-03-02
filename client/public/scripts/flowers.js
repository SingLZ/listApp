// Helper function to create URL slug from name
const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-')
}


const renderGifts = async () => {
    
    const response = await fetch('/flowers')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

    if (data) {

        data.map(gift => {
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
            link.setAttribute('role', 'button')
            link.href = `/flowers/${createSlug(gift.name)}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer) 
            mainContent.appendChild(card)
        })
    }
    else {
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
    renderGifts()
}
