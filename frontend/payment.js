const stripe = Stripe("pk_test_51KTd1dCxJ8HWxsAUvHdkJU90wXuUHO4qa4bF5dq3A7kCPWLAiaPnQ4bDpvBqIVMHPdABDwVMODmDff6jl8ok59OJ00SeHORvaW");

const form = document.getElementById("payment-form")
const loadPaymentBtn = document.getElementById("loadPayment")

paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: async () => {
        const response = await fetch("http://localhost:4000/api/payments/createPayPalOrder",{
            method:"POST",
            credentials:"include"
        })
        const data = await response.json()
        return data.orderID
    },
    // Finalize the transaction after payer approval
    onApprove: (data, actions) => {
        return actions.order.capture().then(function(orderData) {
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            const transaction = orderData.purchase_units[0].payments.captures[0];
            alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
        });
    }
}).render('#paypal-buttons');


loadPaymentBtn.onclick = ()=>{
    initialize()
}

let elements;

const initialize = async ()=>{
    const response = await fetch("http://localhost:4000/api/cart/pay",{
        credentials:"include"
    })

    const data = await response.json()

    const clientSecret = data.clientSecret

    const appearance = {
        theme: 'stripe',
    };

    elements = stripe.elements({ appearance, clientSecret });

    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
}

form.onsubmit= async (event)=>{
    event.preventDefault()
    const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required'
    })
    if(result.paymentIntent?.status==="succeeded"){
        // fetch("http://localhost:4000/api/cart/paymentCompleted",{
        //     method:"POST",
        //     credentials:"include"
        // }).then(resp=>resp.json())
        // .then(console.log)
        // .catch(console.log)
    }

    console.log(result)
}