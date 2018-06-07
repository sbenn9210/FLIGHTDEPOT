let tableData = document.getElementById('sharp')
let priceData = document.getElementById('price')

function flightInfo(data) {
  let price = `
<table class="table table-hover">
  <tbody id="table_body">

  </tbody>
</table>

  `
  priceData.innerHTML += price
}

flightInfo()
