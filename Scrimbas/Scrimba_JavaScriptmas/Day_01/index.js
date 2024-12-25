/*
    I didn't grasp it how some javascript codes used semicolons and others don't
    Then I read this article: https://web.archive.org/web/20190308200819/http://inimino.org/~inimino/blog/javascript_semicolons

    Now I'm aware of JavaScript automatic semicolon insertion, or ASI.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input')
const addItemButton = document.getElementById('add-item-button')
const shoppingList = document.getElementById('shopping-list')
const listArr = []

// Function to check item is not duplicate
function checkDuplicate() {
    const itemText = sanitazeInput(itemInput.value)

    let alreadyExists = listArr.some(item => item.toLowerCase() === itemText.toLowerCase())
    let emptyItem = itemText.length === 0

    if (emptyItem || alreadyExists) {
        renderList()
        return
    }

    listArr.push(itemText)
    renderList()
}

// Function to add an item to the shopping list
function renderList() {
    shoppingList.innerHTML = ''
    listArr.forEach((gift) => {
        const listItem = document.createElement('li')
        listItem.textContent = gift
        shoppingList.appendChild(listItem)
    })
    itemInput.value = ''; // Clear the input field
}

// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate)

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate()
    }
})

// Function to sanitize user input
function sanitazeInput(input) {
    input = input.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    return input.trim()
}