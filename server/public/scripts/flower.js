// Helper function to create URL slug from name
const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-')
}


const renderGift = async () => {
    // parse ID from URL
    const requestedID = parseInt(window.location.href.split('/').pop())

    // fetch all gifts
    const response = await fetch('/flowers')
    const data = await response.json()

    const giftContent = document.getElementById('gift-content')

    let gift
    if (data) {
        gift = data.find(g => g.id === requestedID)
    }

    if (gift) {
        document.getElementById('image').src = gift.image
        document.getElementById('name').textContent = gift.name
        document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy
        document.getElementById('submittedOn').textContent = gift.submittedOn
        document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint
        document.getElementById('audience').textContent = 'Great For: ' + gift.audience
        document.getElementById('description').textContent = gift.description
        document.title = `FLowers - ${gift.name}`
    } else {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        giftContent.appendChild(message)
    }
}

renderGift()
