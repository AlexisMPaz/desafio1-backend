// Clases para Manager y Producto
class ProductManager {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.products = []
    }

    addProduct(newProduct) {
        const newProductValues = Object.values(newProduct);

        if (newProductValues.includes("") || newProductValues.includes(null)) {
            console.error("Error1: No se ha podido agregar el producto ya que posee campos incompletos")

        } else {
            const product = this.products.find(prod => prod.code === newProduct.code);
            if (!product) {
                this.products.push(newProduct);
            } else {
                console.error("Error2: El producto esta repetido");
            }
        }
    }

    getProducts() {
        return this.products;
    }

    getProductByID(idProduct) {
        const product = this.products.find(prod => prod.id === idProduct);
        if (product) {
            return product;
        } else {
            return "Error3: Producto no encontrado";
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.idGenerator()
    }

    static idGenerator() {
        if (!this.generatedID) {
            this.generatedID = 1;
        } else {
            this.generatedID++;
        }
        return this.generatedID;
    }
}

// Creacion del Manager y los productos

const manager1 = new ProductManager("Alexis", "Paz", 28);

const product1 = new Product("Producto prueba", "Este es un producto de prueba", 200, "Sin Imagen", "abc123", 25);
const product2 = new Product("Producto prueba 2", "Este es el segundo producto de prueba", 500, "Sin Imagen", "abc456", 25);
const product3 = new Product("Producto prueba 3", "Este es el tercer producto de prueba", 100, "Sin Imagen", "abc789", 25);

console.log(manager1.getProducts()); //Devuelve el Array Vacio

// Cargo los productos al manager
manager1.addProduct(product1);
manager1.addProduct(product2);
manager1.addProduct(product3);

//Productos no validos para cargar (Errores por consola)
const emptyProduct = new Product("", "", "", "", "", ""); // Error 1 - Producto no valido por tener campos vacios
manager1.addProduct(emptyProduct);

const cloneProduct = { ...product1 } //Error 2 - Producto no valido por tener el mismo code que el product1
manager1.addProduct(cloneProduct);

console.log(manager1.getProducts()); //Devuelve el array con los 3 productos cargados

//Ahora probemos el getProductByID

console.log(manager1.getProductByID(4)); // Producto no encontrado (error 3 por consola)
console.log(manager1.getProductByID(2)); // Producto encontrado (product2 por consola)