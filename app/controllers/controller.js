function getData() {
  var TenSP = document.getElementById("TenSP").value;
  var GiaSP = document.getElementById("GiaSP").value;
  var HinhSP = document.getElementById("HinhSP").value;
  var MoTaSP = document.getElementById("MoTaSP").value;
  return {
    name: TenSP,
    price: GiaSP,
    img: HinhSP,
    desc: MoTaSP,
  };
}

function showData(product) {
  document.getElementById("TenSP").value = product.name;
  document.getElementById("GiaSP").value = product.price;
  document.getElementById("MoTaSP").value = product.img;
  document.getElementById("MoTaSP").value = product.desc;
}

function turnOnLoading() {
  document.querySelector("#spinner").style.display = "block";
}

function turnOffLoading() {
  document.querySelector("#spinner").style.display = "none";
}
