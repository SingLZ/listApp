const header = document.querySelector('header')

const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'

const headerLogo = document.createElement('img')
headerLogo.src = '/logo.png'


const headerTitle = document.createElement('h1')
headerTitle.textContent = 'Flowers'

const headerLeft = document.createElement('div')
headerLeft.className = 'header-left'

headerLeft.appendChild(headerLogo)
headerLeft.appendChild(headerTitle)

const headerRight = document.createElement('div')
headerRight.className = 'header-right'

const searchInput = document.createElement('input')
searchInput.type = 'text'
searchInput.placeholder = 'Search flowers...'
searchInput.className = 'search-input'
searchInput.id = 'search-input'

const headerButton = document.createElement('button')
headerButton.textContent = 'Home'
    
headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/'
})

headerRight.appendChild(searchInput)
headerRight.appendChild(headerButton)

headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)

header.appendChild(headerContainer)