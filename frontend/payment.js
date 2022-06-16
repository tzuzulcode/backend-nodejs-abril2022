const stripe = Stripe("pk_test_51KTd1dCxJ8HWxsAUvHdkJU90wXuUHO4qa4bF5dq3A7kCPWLAiaPnQ4bDpvBqIVMHPdABDwVMODmDff6jl8ok59OJ00SeHORvaW");

const form = document.getElementById("payment-form")
const loadPaymentBtn = document.getElementById("loadPayment")


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
        fetch("http://localhost:4000/api/cart/paymentCompleted",{
            method:"POST",
            credentials:"include"
        }).then(resp=>resp.json())
        .then(console.log)
        .catch(console.log)
    }

    console.log(result)
}