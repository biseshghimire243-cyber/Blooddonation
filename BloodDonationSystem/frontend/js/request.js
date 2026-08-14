const requestForm =
    document.getElementById("requestForm");

const formMessage =
    document.getElementById("formMessage");


requestForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        // ================================
        // GET FORM VALUES
        // ================================

        const patient_name =
            document
                .getElementById("patient_name")
                .value
                .trim();

        const blood_group =
            document
                .getElementById("blood_group")
                .value;

        const units =
            document
                .getElementById("units")
                .value;

        const hospital =
            document
                .getElementById("hospital")
                .value
                .trim();

        const location =
            document
                .getElementById("location")
                .value
                .trim();

        const contact_name =
            document
                .getElementById("contact_name")
                .value
                .trim();

        const phone =
            document
                .getElementById("phone")
                .value
                .trim();

        const urgency =
            document
                .getElementById("urgency")
                .value;

        const message =
            document
                .getElementById("message")
                .value
                .trim();


        // ================================
        // VALIDATION
        // ================================

        if (
            !patient_name ||
            !blood_group ||
            !units ||
            !hospital ||
            !location ||
            !contact_name ||
            !phone ||
            !urgency
        ) {

            showMessage(
                "Please fill all required fields.",
                "error"
            );

            return;
        }


        // Phone validation

        if (!/^[0-9]{10}$/.test(phone)) {

            showMessage(
                "Please enter a valid 10-digit phone number.",
                "error"
            );

            return;
        }


        // Units validation

        if (
            Number(units) < 1 ||
            Number(units) > 20
        ) {

            showMessage(
                "Required units must be between 1 and 20.",
                "error"
            );

            return;
        }


        // ================================
        // BUTTON
        // ================================

        const button =
            requestForm.querySelector(
                "button[type='submit']"
            );

        button.disabled = true;

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';


        // ================================
        // REQUEST DATA
        // ================================

        const requestData = {

            patient_name,

            blood_group,

            units: Number(units),

            hospital,

            location,

            contact_name,

            phone,

            urgency,

            message

        };


        // ================================
        // SEND TO BACKEND
        // ================================

        try {

            /*
             * IMPORTANT:
             *
             * This endpoint will work after
             * we create the blood request API
             * in your backend.
             */

            const response = await fetch(
                "/api/requests",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(
                        requestData
                    )

                }
            );


            const data =
                await response.json();


            // ================================
            // ERROR
            // ================================

            if (!response.ok) {

                showMessage(
                    data.message ||
                    "Unable to submit blood request.",
                    "error"
                );

                return;
            }


            // ================================
            // SUCCESS
            // ================================

            showMessage(
                "Blood request submitted successfully!",
                "success"
            );


            requestForm.reset();


        } catch (error) {

            console.error(
                "Request Error:",
                error
            );


            showMessage(
                "Unable to connect to the server.",
                "error"
            );


        } finally {

            button.disabled = false;

            button.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Submit Blood Request';

        }

    }
);


// ================================
// MESSAGE FUNCTION
// ================================

function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className =
        `form-message ${type}`;

}