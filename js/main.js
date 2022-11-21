const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search cities.json and filter it
const searchCities = async searchText => {
    const res = await fetch("../data/cities.json");
    const cities = await res.json();

    // Get matches to current text input
    let matches = cities.filter(city => {
        // gi = global & case-insensitive
        const regex = new RegExp(`^${searchText}`, "gi");
        return city.name.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
}

// Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} <span class="text-primary"></h4>
                <small>State: ${match.state} </small>
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener("input", () => searchCities(search.value));