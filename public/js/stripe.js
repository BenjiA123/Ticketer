const stripe = Stripe('pk_test_51HcFuQD88wUJ9rzciF5ESyngbDa7swRheC3fckddEH6rk2XtF3GQjz24WU943bQrU8cnc4rk3WFbEZWDBNaPCvYW00m1msyuuF')
import { showAlert } from './alert';

export const bookTour = async (tourId) =>{

    try {
        
    // Get checkout session from API
    const session = await axios(`http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`);

    // Create Checkout form
    await stripe.redirectToCheckout(
        {
            sessionId:session.data.session.id
        }
    )

    console.log(session.data.session.id)
    } catch (error) {
        showAlert('error',error)
        console.log(error)
        
    }
}