// app.ts

interface Product {
    id: string;              // 商品编号
    name: string;            // 商品名称
    category: string;        // 商品类别
    quantity: number;        // 数量
    price: number;           // 价格
    supplier: string;        // 供应商名称
    stockStatus: 'inStock' | 'lowStock' | 'outOfStock';  // 库存状态
    isFeatured: boolean;     // 是否为特色商品
    specialNotes?: string;   // 特别备注
  }
  
  // 商品数据库
  let productDatabase: Product[] = [];
  
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
  function addProduct(product: Product): void {
    // 检查是否存在相同商品编号
    const exists = productDatabase.some((p) => p.id === product.id);
    if (exists) {
      displayMessage('商品编号已存在，无法添加');
      return;
    }
    productDatabase.push(product);
    displayProducts(); // 更新商品展示
  }
  
  // 更新商品信息（按商品名称）
  function updateProduct(name: string, updatedProduct: Partial<Product>): void {
    const product = productDatabase.find((p) => p.name === name);
    if (product) {
      Object.assign(product, updatedProduct);
      displayProducts(); // 更新商品展示
    } else {
      displayMessage('商品未找到');
    }
  }
  
  // 删除商品
  function deleteProduct(name: string): void {
    const product = productDatabase.find((p) => p.name === name);
    if (product && confirm(`确定要删除商品 "${name}" 吗？`)) {
      productDatabase = productDatabase.filter((p) => p.name !== name);
      displayProducts(); // 更新商品展示
    } else {
      displayMessage('商品未找到或取消删除');
    }
  }
  
  // 搜索商品
  function searchProduct(query: string): void {
    const results = productDatabase.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    displayProducts(results);
  }
  
  // 显示特色商品
  function displayFeaturedProducts(): void {
    const featuredProducts = productDatabase.filter((p) => p.isFeatured);
    displayProducts(featuredProducts);
  }
  
  // 显示商品列表
  function displayProducts(products: Product[] = productDatabase): void {
    const productList = document.getElementById('product-list');
    if (productList) {
      productList.innerHTML = ''; // 清空列表
      products.forEach((product) => {
        const productItem = document.createElement('li');
        productItem.textContent = `${product.name} (${product.category}) - ${product.stockStatus}`;
        productList.appendChild(productItem);
      });
    }
  }
  
  // 显示提示信息
  function displayMessage(message: string): void {
    const messageBox = document.getElementById('message-box');
    if (messageBox) {
      messageBox.textContent = message;
      messageBox.style.display = 'block';
      setTimeout(() => {
        messageBox.style.display = 'none';
      }, 3000); // 3秒后隐藏提示信息
    }
  }


