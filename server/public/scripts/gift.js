// Helper function to convert slug back to name for lookup
const slugToName = (slug) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const renderGift = async () => {
    // Parse slug from URL (last part of path)
    const requestedSlug = window.location.href.split('/').pop()

    // Fetch gift data from /flowers endpoint
    const response = await fetch('/flowers')
    const data = await response.json()

    // Get the gift-content element
    const giftContent = document.getElementById('gift-content')

    // Create gift variable
    let gift

    // If data exists, find the matching gift by comparing slug version of names
    if (data) {
        gift = data.find(item => {
            const itemSlug = item.name.toLowerCase().replace(/\s+/g, '-')
            return itemSlug === requestedSlug
        })
    }

    // Conditionally render based on whether gift exists
    if (gift) {
        // Set image src
        document.getElementById('image').src = gift.image
        // Set name
        document.getElementById('name').textContent = gift.name
        // Set submittedBy
        document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy
        // Set submittedOn
        document.getElementById('submittedOn').textContent = gift.submittedOn
        // Set pricePoint
        document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint
        // Set audience
        document.getElementById('audience').textContent = 'Great For: ' + gift.audience
        // Set description
        document.getElementById('description').textContent = gift.description
        // Set page title
        document.title = `Flower - ${gift.name}`
    }
    else {
        // Show no gifts message
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        giftContent.appendChild(message)
    }
}

// Call renderGift function
renderGift()
