var productName = document.getElementById("proName");

var productPrice = document.getElementById("proPrice");
var productTaxes = document.getElementById("proTaxes");
var productDiscount = document.getElementById("proDiscount");

var productCount = document.getElementById("proCount");
var productCategory = document.getElementById("proCategory");
var productWebsite = document.getElementById("proWebsite");

var create = document.getElementById("create");
var update = document.getElementById("update");
update.style = "display:none";

var search = document.getElementById("search");

var table = document.getElementById("table");
var diV = document.getElementById("divs");

var show = false;
var category = false;
var x;
var products = [];
var validation = /^https:\/\/www\.[a-zA-Z0-9_-]+(\.[a-zA-Z]{2,})+$/;

if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  showData();
}

function getData() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    taxes: productTaxes.value,
    discount: productDiscount.value,
    count: productCount.value,
    category: productCategory.value,
    website: productWebsite.value,
  };

  if (product.name === "") {
    return Swal.fire({
      title: "Wrong Information",
      icon: "info",
      html: `
        You Should Enter Product Name
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
      cancelButtonAriaLabel: "Thumbs down",
    });
  }
  if (product.price <= 0) {
    return Swal.fire({
      title: "Wrong Information",
      icon: "info",
      html: `
      Sorry You can't set price 0 for Product
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
      cancelButtonAriaLabel: "Thumbs down",
    });
  }
  if (product.website === "") {
    return Swal.fire({
      title: "Wrong Information",
      icon: "info",
      html: `
      Product website Is Required
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
      cancelButtonAriaLabel: "Thumbs down",
    });
  }
  if (!validation.test(product.website)) {
    return Swal.fire({
      title: "Wrong Information",
      icon: "info",
      html: `
      Site Name or Url is not valid, Please Enter a Valid URL
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
      cancelButtonAriaLabel: "Thumbs down",
    });
  }

  for (var i = 0; i < products.length; i++) {
    if (product.name === products[i].name) {
      return Swal.fire({
        title: "Wrong Information",
        icon: "info",
        html: `
      You Already Has Product With This Name
      `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
        cancelButtonAriaLabel: "Thumbs down",
      });
    }
  }

  clearInput();

  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  showData();
}

function showData() {
  if (!show) {
    var cartona = ``;

    for (var i = 0; i < products.length; i++) {
      cartona += `
      <tr>
      <td>${i + 1}</td>
      <td>${products[i].name}</td>
      <td>${products[i].count}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].discount}</td>
      <td>${
        (products[i].price - products[i].taxes - products[i].discount) *
        products[i].count
      }</td>
  
      <td>${products[i].category}</td>
      <td>
      <button class="btn btn-warning">
        <a href="${products[i].website}" target="_blank">Visit</a>
      </button>
      </td>
      <td><button class="btn btn-primary" onclick="edit(${i})">Update</button></td>
      <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
    </tr>
      `;
    }

    document.getElementById("tBody").innerHTML = cartona;
  } else {
    var cartona = ``;
    for (var i = 0; i < products.length; i++) {
      cartona += `
      <div class="col-md-4 text-white text-start">
      <div class="bg-success">
        <h3>Product Name: ${products[i].name}</h3>
        <h5>Product Number: ${i + 1}</h5>
        <h5>Product Count: ${products[i].count}</h5>
        <h5>Product Price: ${products[i].price}</h5>
        <h5>Product Texas: ${products[i].taxes}</h5>
        <h5>Product Discount: ${products[i].discount}</h5>
        <h5>Net Income: ${
          (products[i].price - products[i].taxes - products[i].discount) *
          products[i].count
        }</h5>
        <h5>Catergory: ${products[i].category}</h5>
        <span>
          <button class="btn btn-warning">
            <a href="${products[i].website}" target="_blank">Visit</a>
          </button>
        </span>
        <span><button class="btn btn-primary" onclick="edit(${i})">Update</button></span>
        <span><button class="btn btn-danger" onclick="del(${i})">Delete</button></span>
      </div>
    </div> `;
    }

    document.getElementById("divss").innerHTML = cartona;
  }
}

function del(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));

  showData();
}

function edit(index) {
  productName.value = `${products[index].name}`;
  productPrice.value = `${products[index].price}`;
  productTaxes.value = `${products[index].taxes}`;
  productDiscount.value = `${products[index].discount}`;
  productCount.value = `${products[index].count}`;
  productCategory.value = `${products[index].category}`;
  productWebsite.value = `${products[index].website}`;

  x = index;

  create.style = "display:none";
  update.style = "display:block";
}

function updateButton() {
  for (var i = 0; i < products.length; i++) {
    if (
      productName.value === products[i].name &&
      productName.value != products[x].name
    ) {
      return Swal.fire({
        title: "Wrong Information",
        icon: "info",
        html: `
        You Already Has Product With This Name
        `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Great!
        `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
          <i class="fa fa-thumbs-down"></i>
        `,
        cancelButtonAriaLabel: "Thumbs down",
      });
    }
  }

  products[x].name = productName.value;
  products[x].price = productPrice.value;
  products[x].taxes = productTaxes.value;
  products[x].discount = productDiscount.value;
  products[x].count = productCount.value;
  products[x].category = productCategory.value;
  products[x].website = productWebsite.value;

  localStorage.setItem("products", JSON.stringify(products));

  showData();
  create.style = "display:block";
  update.style = "display:none";
  clearInput();
}

function clearInput() {
  productName.value = "";
  productPrice.value = "";
  productTaxes.value = "";
  productDiscount.value = "";
  productCount.value = "";
  productCategory.value = "";
  productWebsite.value = "";
}

function getSearchValue() {
  var cartona = "";
  if (category == false) {
    for (var i = 0; i < products.length; i++) {
      if (
        products[i].name.toLowerCase().includes(search.value.toLowerCase()) &&
        show == false
      ) {
        cartona += `
    <tr>
    <td>${i + 1}</td>
    <td>${products[i].name}</td>
    <td>${products[i].count}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].discount}</td>
    <td>${
      (products[i].price - products[i].taxes - products[i].discount) *
      products[i].count
    }</td>
    <td>${products[i].category}</td>
    <td>
    <button class="btn btn-warning">
      <a href="${products[i].website}" target="_blank">Visit</a>
    </button>
    </td>
    <td><button class="btn btn-primary" onclick="edit(${i})">Update</button></td>
    <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
  </tr>
    `;
      } else if (
        products[i].name.toLowerCase().includes(search.value.toLowerCase()) &&
        show == true
      ) {
        cartona += `
        <div class="col-md-4 text-white text-start">
        <div class="bg-success">
          <h3>Product Name: ${products[i].name}</h3>
          <h5>Product Number: ${i + 1}</h5>
          <h5>Product Count: ${products[i].count}</h5>
          <h5>Product Price: ${products[i].price}</h5>
          <h5>Product Texas: ${products[i].taxes}</h5>
          <h5>Product Discount: ${products[i].discount}</h5>
          <h5>Net Income: ${
            (products[i].price - products[i].taxes - products[i].discount) *
            products[i].count
          }</h5>
          <h5>Catergory: ${products[i].category}</h5>
          <span>
            <button class="btn btn-warning">
              <a href="${products[i].website}" target="_blank">Visit</a>
            </button>
          </span>
          <span><button class="btn btn-primary" onclick="edit(${i})">Update</button></span>
          <span><button class="btn btn-danger" onclick="del(${i})">Delete</button></span>
        </div>
      </div> 
    `;
      }
    }
    if (show == false) {
      document.getElementById("tBody").innerHTML = cartona;
    } else {
      document.getElementById("divss").innerHTML = cartona;
    }
  } else {
    for (var i = 0; i < products.length; i++) {
      if (
        products[i].category
          .toLowerCase()
          .includes(search.value.toLowerCase()) &&
        show == false
      ) {
        cartona += `
    <tr>
    <td>${i + 1}</td>
    <td>${products[i].name}</td>
    <td>${products[i].count}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].discount}</td>
    <td>${
      (products[i].price - products[i].taxes - products[i].discount) *
      products[i].count
    }</td>
    <td>${products[i].category}</td>
    <td>
    <button class="btn btn-warning">
      <a href="${products[i].website}" target="_blank">Visit</a>
    </button>
    </td>
    <td><button class="btn btn-primary" onclick="edit(${i})">Update</button></td>
    <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
  </tr>
    `;
      } else if (
        products[i].category
          .toLowerCase()
          .includes(search.value.toLowerCase()) &&
        show == true
      ) {
        cartona += `
        <div class="col-md-4 text-white text-start">
        <div class="bg-success">
          <h3>Product Name: ${products[i].name}</h3>
          <h5>Product Number: ${i + 1}</h5>
          <h5>Product Count: ${products[i].count}</h5>
          <h5>Product Price: ${products[i].price}</h5>
          <h5>Product Texas: ${products[i].taxes}</h5>
          <h5>Product Discount: ${products[i].discount}</h5>
          <h5>Net Income: ${
            (products[i].price - products[i].taxes - products[i].discount) *
            products[i].count
          }</h5>
          <h5>Catergory: ${products[i].category}</h5>
          <span>
            <button class="btn btn-warning">
              <a href="${products[i].website}" target="_blank">Visit</a>
            </button>
          </span>
          <span><button class="btn btn-primary" onclick="edit(${i})">Update</button></span>
          <span><button class="btn btn-danger" onclick="del(${i})">Delete</button></span>
        </div>
      </div> 
    `;
      }
    }
    if (show == false) {
      document.getElementById("tBody").innerHTML = cartona;
    } else {
      document.getElementById("divss").innerHTML = cartona;
    }
  }
}

// function getSearchValue() {
//   var cartona = "";
//   if (!category) {
//     for (var i = 0; i < products.length; i++) {
//       if (products[i].name.toLowerCase().includes(search.value.toLowerCase())) {
//         cartona += `
//       <tr>
//       <td>${i + 1}</td>
//       <td>${products[i].name}</td>
//       <td>${products[i].count}</td>
//       <td>${products[i].price}</td>
//       <td>${products[i].taxes}</td>
//       <td>${products[i].discount}</td>
//       <td>${
//         (products[i].price - products[i].taxes - products[i].discount) *
//         products[i].count
//       }</td>

//       <td>${products[i].category}</td>
//       <td>
//       <button class="btn btn-warning">
//         <a href="${products[i].website}" target="_blank">Visit</a>
//       </button>
//       </td>
//       <td><button class="btn btn-primary" onclick="edit(${i})">Update</button></td>
//       <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
//     </tr>
//       `;
//       }
//     }
//   } else {
//     for (var i = 0; i < products.length; i++) {
//       if (
//         products[i].category.toLowerCase().includes(search.value.toLowerCase())
//       ) {
//         cartona += `
//       <tr>
//       <td>${i + 1}</td>
//       <td>${products[i].name}</td>
//       <td>${products[i].count}</td>
//       <td>${products[i].price}</td>
//       <td>${products[i].taxes}</td>
//       <td>${products[i].discount}</td>
//       <td>${
//         (products[i].price - products[i].taxes - products[i].discount) *
//         products[i].count
//       }</td>

//       <td>${products[i].category}</td>
//       <td>
//       <button class="btn btn-warning">
//         <a href="${products[i].website}" target="_blank">Visit</a>
//       </button>
//       </td>
//       <td><button class="btn btn-primary" onclick="edit(${i})">Update</button></td>
//       <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
//     </tr>
//       `;
//       }
//     }
//   }
//   document.getElementById("tBody").innerHTML = cartona;
// }

function searchByCategory() {
  category = true;
}

function searchByName() {
  category = false;
}

function showTable() {
  show = false;
  diV.style = "display:none";
  table.style = "display:block";
  showData();
}

function showDivs() {
  show = true;
  diV.style = "display:block";
  table.style = "display:none";
  showData();
}

if ("") {
  console.log("test");
}
