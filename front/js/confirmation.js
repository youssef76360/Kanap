var url = new URL(window.location.href);
var orderId = url.searchParams.get("orderId");
console.log(orderId);

document.getElementById("orderId").innerText = orderId;
