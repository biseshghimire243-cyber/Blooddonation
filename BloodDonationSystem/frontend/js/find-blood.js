const searchForm =
    document.getElementById("searchForm");

const donorContainer =
    document.getElementById("donorContainer");

const loading =
    document.getElementById("loading");

const noResults =
    document.getElementById("noResults");

const resultCount =
    document.getElementById("resultCount");


// ========================================
// SEARCH DONORS
// ========================================

searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const bloodGroup =
        document
            .getElementById("blood_group")
            .value;

    const location =
        document
            .getElementById("location")
            .value
            .trim();


    // Clear previous results

    donorContainer.innerHTML = "";

    noResults.style.display = "none";

    loading.style.display = "block";

    resultCount.textContent =
        "Searching...";


    try {

        // Build URL

        const params = new URLSearchParams();


        if (bloodGroup) {

            params.append(
                "blood_group",
                bloodGroup
            );

        }


        if (location) {

            params.append(
                "location",
                location
            );

        }


        const url =
            `/api/donors?${params.toString()}`;


        const response =
            await fetch(url);


        const data =
            await response.json();


        loading.style.display = "none";


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to find donors."
            );

        }


        // ================================
        // NO DONORS
        // ================================

        if (
            !data.donors ||
            data.donors.length === 0
        ) {

            resultCount.textContent =
                "0 Donors Found";

            noResults.style.display =
                "block";

            return;

        }


        // ================================
        // DISPLAY COUNT
        // ================================

        resultCount.textContent =
            `${data.donors.length} Donor${
                data.donors.length !== 1
                    ? "s"
                    : ""
            } Found`;


        // ================================
        // DISPLAY DONORS
        // ================================

        data.donors.forEach(donor => {

            createDonorCard(donor);

        });


    } catch (error) {

        console.error(
            "Search Error:",
            error
        );

        loading.style.display =
            "none";

        resultCount.textContent =
            "Search Failed";

        noResults.style.display =
            "block";

        noResults.querySelector("h3")
            .textContent =
            "Unable to connect to server";

        noResults.querySelector("p")
            .textContent =
            "Please make sure your backend server is running.";

    }

});


// ========================================
// CREATE DONOR CARD
// ========================================

function createDonorCard(donor) {

    const card =
        document.createElement("div");

    card.className =
        "donor-card";


    card.innerHTML = `

        <div class="donor-top">

            <div class="donor-avatar">

                <i class="fa-solid fa-user"></i>

            </div>

            <div>

                <div class="donor-name">
                    ${escapeHTML(
                        donor.fullname
                    )}
                </div>

                <div class="available">

                    <i class="fa-solid fa-circle"></i>

                    Available

                </div>

            </div>

        </div>


        <div class="donor-info">

            <div class="info-row">

                <span>
                    Blood Group
                </span>

                <span class="blood-badge">
                    ${escapeHTML(
                        donor.blood_group
                    )}
                </span>

            </div>


            <div class="info-row">

                <span>
                    <i class="fa-solid fa-location-dot"></i>
                    Location
                </span>

                <span>
                    ${escapeHTML(
                        donor.address
                    )}
                </span>

            </div>


            <div class="info-row">

                <span>
                    <i class="fa-solid fa-phone"></i>
                    Phone
                </span>

                <span>
                    ${escapeHTML(
                        donor.phone
                    )}
                </span>

            </div>


            <button
                class="contact-btn"
                onclick="contactDonor('${encodeURIComponent(
                    donor.phone
                )}')"
            >

                <i class="fa-solid fa-phone"></i>

                Contact Donor

            </button>

        </div>

    `;


    donorContainer.appendChild(card);

}


// ========================================
// CONTACT DONOR
// ========================================

function contactDonor(phone) {

    phone =
        decodeURIComponent(phone);


    if (!phone) {

        alert(
            "Phone number is not available."
        );

        return;

    }


    window.location.href =
        `tel:${phone}`;

}


// ========================================
// SECURITY
// ========================================

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


// ========================================
// LOAD ALL AVAILABLE DONORS
// ========================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        searchForm.dispatchEvent(
            new Event("submit")
        );

    }
);