var url = new URL(window.location.href);
var orderId = url.searchParams.get("orderId");


document.getElementById("orderId").innerText = orderId;
