// Create variable ID for func del and edit
var selectedId = null;

// Tao function render product list
var productList = [];

function renderProductList(productArr) {
  var contentHTML = "";
  for (var product of productArr) {
    console.log(
      "🚀 ~ file: index.js:7 ~ renderProductList ~ product:",
      product.avatar
    );

    var trString = `<tr>
               <td>${product.id}</td>
               <td>${product.name}</td>
               <td>${product.price}</td>
               <td>${product.image}</td>
               <td>${product.desc}</td>
                        <td>
                            <button class='btn btn-warning'
                            onclick=editProduct(${product.id})
                            >Edit
                            </button>
                            <button onclick=deleteProduct(${product.id}) class='btn btn-danger'>Delete</button>
                        </td>
                     </tr>`;
    contentHTML += trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

// Goi API product có ds từ server
function fetchFoodList() {
  turnOffLoading();
  // gọi api lấy danh sách sản phẩm đang có từ server
  axios({
    url: "https://633ec05b0dbc3309f3bc5455.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      // api trả data về thành công
      renderProductList(res.data.reverse());
      console.log(
        "🚀 ~ file: index.js:59 ~ res.data.reverse():",
        res.data.reverse()
      );
    })
    .catch(function (err) {
      console.log("😀 - err", err);
    });
}

fetchFoodList();

// DELETE PRODUCT

function deleteProduct(id) {
  axios({
    url: `https://633ec05b0dbc3309f3bc5455.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (response) {
      alert("Xóa thành công");
      fetchFoodList();
    })
    .catch(function (error) {
      console.log("Error");
    });
}

// EDIT PRODUCT = SELECT PRODUCT + UPDATE PRODUCT

function editProduct(id) {
  selectedId = id;
  axios({
    url: `https://633ec05b0dbc3309f3bc5455.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      // Call Modal for editing
      $("#myModal").modal("show");
      showData(res.data);
    })
    .catch(function (err) {
      alert("Error: Editing " + `${err.message}`);
    });
}

function updateProduct() {
  turnOnLoading();
  var product = getData();
  axios({
    url: `https://633ec05b0dbc3309f3bc5455.mockapi.io/product/${selectedId}`,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
      getData();
      $("#myModal").modal("hide");
      fetchFoodList();
    })
    .catch(function (err) {
      turnOffLoading();
      console.log("Error:");
    });
}

// THÊM PRODUCT
function addProduct() {
  var newProduct = getData();
  axios({
    url: `https://633ec05b0dbc3309f3bc5455.mockapi.io/product`,
    method: "POST",
    data: newProduct,
  })
    .then(function (res) {
      $("#myModal").modal("hide");
      fetchFoodList();
    })
    .catch(function (err) {
      console.log("Error:");
    });
}
