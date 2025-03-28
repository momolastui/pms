// app.ts
// 商品数据库
var productDatabase = [];
// 示例数据
productDatabase = [
    {
        id: '001',
        name: 'Laptop',
        category: '电子产品',
        quantity: 10,
        price: 1200,
        supplier: 'Supplier A',
        stockStatus: 'inStock',
        isFeatured: true,
    },
    {
        id: '002',
        name: 'Chair',
        category: '家具',
        quantity: 5,
        price: 100,
        supplier: 'Supplier B',
        stockStatus: 'lowStock',
        isFeatured: false,
    },
];
// 添加商品
function addProduct(product) {
    // 检查是否存在相同商品编号
    var exists = productDatabase.some(function (p) { return p.id === product.id; });
    if (exists) {
        displayMessage('商品编号已存在，无法添加');
        return;
    }
    productDatabase.push(product);
    displayProducts(); // 更新商品展示
}
// 更新商品信息（按商品名称）
function updateProduct(name, updatedProduct) {
    var product = productDatabase.find(function (p) { return p.name === name; });
    if (product) {
        Object.assign(product, updatedProduct);
        displayProducts(); // 更新商品展示
    }
    else {
        displayMessage('商品未找到');
    }
}
// 删除商品
function deleteProduct(name) {
    var product = productDatabase.find(function (p) { return p.name === name; });
    if (product && confirm("\u786E\u5B9A\u8981\u5220\u9664\u5546\u54C1 \"".concat(name, "\" \u5417\uFF1F"))) {
        productDatabase = productDatabase.filter(function (p) { return p.name !== name; });
        displayProducts(); // 更新商品展示
    }
    else {
        displayMessage('商品未找到或取消删除');
    }
}
// 搜索商品
function searchProduct(query) {
    var results = productDatabase.filter(function (p) { return p.name.toLowerCase().includes(query.toLowerCase()); });
    displayProducts(results);
}
// 显示特色商品
function displayFeaturedProducts() {
    var featuredProducts = productDatabase.filter(function (p) { return p.isFeatured; });
    displayProducts(featuredProducts);
}
// 显示商品列表
function displayProducts(products) {
    if (products === void 0) { products = productDatabase; }
    var productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = ''; // 清空列表
        products.forEach(function (product) {
            var productItem = document.createElement('li');
            productItem.textContent = "".concat(product.name, " (").concat(product.category, ") - ").concat(product.stockStatus);
            productList.appendChild(productItem);
        });
    }
}
// 显示提示信息
function displayMessage(message) {
    var messageBox = document.getElementById('message-box');
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.style.display = 'block';
        setTimeout(function () {
            messageBox.style.display = 'none';
        }, 3000); // 3秒后隐藏提示信息
    }
}
