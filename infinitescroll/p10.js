async function getInitialPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        displayError('There was an error fetching the initial posts.');
        console.error("Fetching posts failed:", error);
    }
}

function displayPosts(posts) {
    const postContainer = document.getElementById('posts');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        `;
        postContainer.appendChild(postElement);
    });
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        loadMorePosts();
    }
});

async function loadMorePosts() {
    showLoader();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_start=5&_limit=5');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayPosts(data);
    } catch (error) {
        displayError('Error loading more posts.');
        console.error("Fetching more posts failed:", error);
    } finally {
        hideLoader();
    }
}

// Load initial posts on page load
getInitialPosts().then(posts => {
    if (posts) displayPosts(posts);
});
