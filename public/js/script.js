const stripe = Stripe("pk_test_51IpsnMDeGgyClkDT8sTocyvdkFuBPdbZwqRxdqZ32SYxoybvMRnhO8ZkQrb6gxUggqhKoOvaKCT9COMs29v8WfSO008m5wevZC");
const checkoutButton = document.getElementById("checkoutButton");


if(checkoutButton){
checkoutButton.addEventListener("click", function (e) {
    const {ticketId} = e.target.dataset
    // Remove the url during production  http://localhost:1200
  fetch(`/api/v1/booking/checkout-session/${ticketId}`, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
        console.log(session)
      return stripe.redirectToCheckout({ sessionId: session.session.id });
    })
    .then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});}