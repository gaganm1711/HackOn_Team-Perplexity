document.addEventListener("DOMContentLoaded", () => {
    const leaderboardTable = document.getElementById("leaderboard-body");
    const searchInput = document.getElementById("search-player");

    // Sample leaderboard data
    let players = [
        { name: "Aryan Sharma", points: 2500, image: "profile1.jpg" },
        { name: "Meera Patel", points: 2300, image: "profile2.jpg" },
        { name: "Kabir Gupta", points: 2100, image: "profile3.jpg" },
        { name: "Neha Verma", points: 1800, image: "profile4.jpg" },
        { name: "Rohan Das", points: 1600, image: "profile5.jpg" }
    ];

    // Function to get badge based on rank
    function getBadge(rank) {
        switch (rank) {
            case 1: return '<span class="badge gold">Gold</span>';
            case 2: return '<span class="badge silver">Silver</span>';
            case 3: return '<span class="badge bronze">Bronze</span>';
            default: return '<span class="badge participant">Participant</span>';
        }
    }

    // Function to render leaderboard
    function renderLeaderboard() {
        leaderboardTable.innerHTML = "";
        players.sort((a, b) => b.points - a.points);
        players.forEach((player, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td class="rank">#${index + 1}</td>
                <td class="user">
                    <img src="${player.image}" class="profile-img"> 
                    ${player.name}
                </td>
                <td>${player.points}</td>
                <td>${getBadge(index + 1)}</td>
            `;
            leaderboardTable.appendChild(row);
        });
    }

    // Function to filter leaderboard by search
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();
        let filteredPlayers = players.filter(player => player.name.toLowerCase().includes(searchText));
        leaderboardTable.innerHTML = "";
        filteredPlayers.forEach((player, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td class="rank">#${index + 1}</td>
                <td class="user">
                    <img src="${player.image}" class="profile-img"> 
                    ${player.name}
                </td>
                <td>${player.points}</td>
                <td>${getBadge(index + 1)}</td>
            `;
            leaderboardTable.appendChild(row);
        });
    });

    // Initial render
    renderLeaderboard();
});
