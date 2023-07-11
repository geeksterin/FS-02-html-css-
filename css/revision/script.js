const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const profile = document.getElementById("profile");

searchButton.addEventListener("click", getUser);

function getUser() {
  const username = searchInput.value;

  if (username.trim() === "") {
    alert("Please enter a GitHub username");
    return;
  }

  profile.innerHTML = "Loading...";

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("User not found");
      }
    })
    .then((data) => {console.log(data);displayUser(data)})
    .catch((error) => {
      profile.innerHTML = `<p>${error.message}</p>`;
    });
}

function displayUser(user) {
  const html = `
    <div>
      <img src="${user.avatar_url}" alt="Avatar" style="width: 100px;">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    </div>
  `;
  profile.innerHTML = html;
}
